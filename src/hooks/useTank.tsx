import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useStudent } from "./useStudent";
import { useDemoMode } from "@/contexts/DemoContext";
import { toast } from "sonner";
import { sanitizeInput, sanitizeAIMessage } from "@/utils/security";

// Tank level names mapped to numeric levels
const TANK_LEVEL_NAMES = [
  "Nervous Founder",
  "Confident Closer", 
  "Prepared Founder",
  "Experienced Pitcher",
  "Seasoned Founder",
  "Shark Tamer"
];

export interface PitchAttempt {
  id: string;
  student_id: string;
  mission_id: string | null;
  video_url: string | null;
  transcript: string | null;
  duration_seconds: number | null;
  investor_persona: string | null;
  score: number | null;
  scores: {
    communication: number;
    confidence: number;
    persuasion: number;
    resilience: number;
    business_thinking: number;
  } | null;
  questions_asked: { question: string; category: string }[] | null;
  total_xp_earned: number | null;
  ai_feedback: any;
  created_at: string | null;
  is_public: boolean;
}

export interface PitchEvaluation {
  scores: {
    communication: number;
    confidence: number;
    persuasion: number;
    resilience: number;
    business_thinking: number;
  };
  totalScore: number;
  verdict: "DEAL" | "NO_DEAL" | "MAYBE";
  feedback: {
    opening: string;
    strengths: string[];
    improvements: string[];
    overallComment: string;
  };
  questions: { question: string; category: string }[];
  nextTip: string;
  xpEarned: number;
  investor: {
    name: string;
    style: string;
    difficulty: number;
  };
}

export function useTank() {
  const { student } = useStudent();
  const { isDemoMode, demoPitchAttempts, demoTankXP, demoTankLevel } = useDemoMode();
  const queryClient = useQueryClient();

  // Fetch pitch attempts
  const { data: pitchAttempts, isLoading: loadingAttempts } = useQuery({
    queryKey: ["pitch-attempts", student?.id, isDemoMode],
    queryFn: async () => {
      // Return demo data if in demo mode
      if (isDemoMode) {
        return demoPitchAttempts as PitchAttempt[];
      }

      if (!student) return [];
      
      const { data, error } = await supabase
        .from("pitch_attempts")
        .select("*")
        .eq("student_id", student.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as PitchAttempt[];
    },
    enabled: !!student || isDemoMode,
  });

  // Get student's pitch level and XP (demo or real)
  const pitchTotalXP = isDemoMode ? demoTankXP : ((student as any)?.pitch_total_xp || 0);
  const pitchLevel = isDemoMode ? 3 : ((student as any)?.pitch_level || 1);

  // Submit pitch for evaluation
  const submitPitch = useMutation({
    mutationFn: async ({
      transcript,
      persona,
    }: {
      transcript: string;
      persona: string;
    }) => {
      if (!student) throw new Error("No student found");

      // SECURITY: Validate and sanitize inputs
      const sanitizedTranscript = sanitizeAIMessage(transcript);
      if (!sanitizedTranscript || sanitizedTranscript.length < 50) {
        throw new Error("Pitch transcript must be at least 50 characters");
      }

      const sanitizedPersona = sanitizeInput(persona, 100);
      if (!sanitizedPersona) {
        throw new Error("Invalid investor persona");
      }

      // SECURITY: Sanitize student context
      const sanitizedContext = {
        name: sanitizeInput(student.full_name || "", 100),
        age: Math.max(9, Math.min(18, student.age || 13)),
        idea: sanitizeAIMessage(student.idea_summary || ""),
        stage: "early",
      };

      // Call edge function for AI evaluation
      const { data: evaluation, error: evalError } = await supabase.functions.invoke<PitchEvaluation>(
        "pitch-practice",
        {
          body: {
            transcript: sanitizedTranscript,
            persona: sanitizedPersona,
            studentContext: sanitizedContext,
          },
        }
      );

      if (evalError) {
        // Handle specific error status codes
        const status = (evalError as any)?.status;
        if (status === 429) {
          throw new Error("rate_limit");
        }
        if (status === 402) {
          throw new Error("credits_depleted");
        }
        throw evalError;
      }
      
      // Check for error responses in data (edge function returned error JSON)
      if ((evaluation as any)?.error) {
        const errorData = evaluation as any;
        if (errorData.error === 'rate_limit') {
          throw new Error("rate_limit");
        }
        if (errorData.error === 'credits_depleted') {
          throw new Error("credits_depleted");
        }
        throw new Error(errorData.message || errorData.error);
      }
      
      if (!evaluation || !evaluation.scores) {
        throw new Error("No evaluation returned");
      }

      // Save pitch attempt to database
      const { data: attempt, error: saveError } = await supabase
        .from("pitch_attempts")
        .insert({
          student_id: student.id,
          transcript,
          investor_persona: persona,
          score: evaluation.totalScore,
          scores: evaluation.scores,
          questions_asked: evaluation.questions,
          total_xp_earned: evaluation.xpEarned,
          ai_feedback: evaluation.feedback,
        })
        .select()
        .single();

      if (saveError) throw saveError;

      // Update student's total XP
      const newTotalXP = pitchTotalXP + evaluation.xpEarned;
      const { error: updateError } = await supabase
        .from("students")
        .update({
          pitch_total_xp: newTotalXP,
          pitch_level: calculateLevel(newTotalXP),
        })
        .eq("id", student.id);

      if (updateError) {
        console.error("Failed to update student XP:", updateError);
      }

      return { attempt, evaluation };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pitch-attempts", student?.id] });
      queryClient.invalidateQueries({ queryKey: ["student"] });
    },
    onError: (error: Error) => {
      console.error("Pitch submission error:", error);
      if (error.message === "rate_limit") {
        toast.error("Our AI investor is busy!", {
          description: "Please wait a moment and try again.",
          duration: 5000,
        });
      } else if (error.message === "credits_depleted") {
        toast.error("AI evaluation is temporarily unavailable.", {
          description: "Please try again later.",
          duration: 5000,
        });
      } else {
        toast.error("Failed to submit pitch. Please try again.");
      }
    },
  });

  // Get level name from numeric level (1-6 maps to index 0-5)
  const pitchLevelName = TANK_LEVEL_NAMES[Math.min(Math.max(pitchLevel - 1, 0), 5)];

  return {
    pitchAttempts: pitchAttempts || [],
    loadingAttempts,
    pitchTotalXP,
    pitchLevel: pitchLevelName, // Now returns string level name
    pitchLevelNumber: pitchLevel, // Keep numeric level available if needed
    submitPitch,
    isSubmitting: submitPitch.isPending,
  };
}

function calculateLevel(xp: number): number {
  if (xp >= 1500) return 5;
  if (xp >= 800) return 4;
  if (xp >= 400) return 3;
  if (xp >= 150) return 2;
  return 1;
}
