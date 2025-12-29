import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

type AgeTrack = 'explorer' | 'creator' | 'founder';

interface CertificationSprint {
  id: string;
  lesson_id: string;
  sprint_order: number;
  title: string;
  content: string;
  age_track: string;
  estimated_seconds: number;
  quiz_questions: Array<{
    question: string;
    options: string[];
    correct: number;
  }>;
  is_advanced_technique: boolean;
}

function getAgeTrack(age: number | null): AgeTrack {
  if (!age || age <= 0) return 'creator'; // Default to creator if no age or invalid
  if (age >= 9 && age <= 11) return 'explorer';
  if (age >= 12 && age <= 14) return 'creator';
  return 'founder'; // 15+
}

export function useCertificationSprints(lessonId: string | null, studentAge: number | null) {
  const [sprints, setSprints] = useState<CertificationSprint[]>([]);
  const [completedSprintIds, setCompletedSprintIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [ageTrack, setAgeTrack] = useState<AgeTrack>('creator');

  useEffect(() => {
    if (!lessonId) {
      setSprints([]);
      setLoading(false);
      return;
    }

    const calculatedTrack = getAgeTrack(studentAge);
    setAgeTrack(calculatedTrack);

    const fetchSprints = async () => {
      setLoading(true);
      
      // Fetch sprints for this lesson, filtering by age track
      // We want sprints where age_track is 'all' OR matches the student's track
      const { data: sprintData, error } = await supabase
        .from("certification_lesson_sprints")
        .select("*")
        .eq("lesson_id", lessonId)
        .or(`age_track.eq.all,age_track.eq.${calculatedTrack}`)
        .order("sprint_order");

      if (error) {
        console.error("Error fetching certification sprints:", error);
        setLoading(false);
        return;
      }

      if (sprintData) {
        // Deduplicate by sprint_order - prefer age-specific over 'all'
        const sprintMap = new Map<number, CertificationSprint>();
        
        for (const sprint of sprintData) {
          const existing = sprintMap.get(sprint.sprint_order);
          // If no existing sprint for this order, or this one is age-specific (not 'all'), use it
          if (!existing || sprint.age_track !== 'all') {
            sprintMap.set(sprint.sprint_order, {
              ...sprint,
              quiz_questions: (sprint.quiz_questions as any) || [],
              is_advanced_technique: sprint.is_advanced_technique || false
            });
          }
        }
        
        // Convert map to sorted array
        const sortedSprints = Array.from(sprintMap.values())
          .sort((a, b) => a.sprint_order - b.sprint_order);
        
        setSprints(sortedSprints);
      }

      setLoading(false);
    };

    fetchSprints();
  }, [lessonId, studentAge]);

  const completeSprint = async (sprintId: string, studentId: string, quizScore?: number) => {
    if (!studentId) return;

    try {
      const { error } = await supabase
        .from("sprint_progress")
        .upsert({
          student_id: studentId,
          sprint_id: sprintId,
          quiz_score: quizScore,
          completed_at: new Date().toISOString()
        }, { onConflict: "student_id,sprint_id" });

      if (error) {
        console.error("Error saving sprint progress:", error);
        // Don't crash - just log and continue, progress won't persist but page works
        return;
      }

      setCompletedSprintIds(prev => [...prev, sprintId]);
    } catch (err) {
      console.error("Unexpected error saving sprint progress:", err);
      // Gracefully handle - page continues working
    }
  };

  const hasSprints = sprints.length > 0;
  const allSprintsCompleted = sprints.length > 0 && 
    sprints.every(s => completedSprintIds.includes(s.id));

  return {
    sprints,
    completedSprintIds,
    loading,
    completeSprint,
    hasSprints,
    allSprintsCompleted,
    ageTrack
  };
}

export type { CertificationSprint, AgeTrack };
