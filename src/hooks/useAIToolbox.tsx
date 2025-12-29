import { useState, useEffect, useMemo } from "react";
import { useStudent } from "@/hooks/useStudent";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { differenceInWeeks } from "date-fns";

interface Prompt {
  id: string;
  title: string;
  description: string;
  prompt_template: string;
  stage: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  kid_category: string;
  week_relevant: number[] | null;
  usage_count: number;
}

interface HistoryItem {
  id: string;
  prompt: {
    id: string;
    title: string;
    prompt_template: string;
    kid_category: string;
  };
  used_at: string;
  context?: string;
}

export function useAIToolbox() {
  const { student } = useStudent();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch prompts
  useEffect(() => {
    const fetchPrompts = async () => {
      const { data, error } = await supabase
        .from("prompts")
        .select("*")
        .order("usage_count", { ascending: false });

      if (error) {
        console.error("Error fetching prompts:", error);
        return;
      }

      setPrompts(data as Prompt[]);
    };

    fetchPrompts();
  }, []);

  // Fetch favorites
  useEffect(() => {
    if (!student?.id) return;

    const fetchFavorites = async () => {
      const { data, error } = await supabase
        .from("student_prompt_favorites")
        .select("prompt_id")
        .eq("student_id", student.id);

      if (error) {
        console.error("Error fetching favorites:", error);
        return;
      }

      setFavorites(data.map((f) => f.prompt_id));
    };

    fetchFavorites();
  }, [student?.id]);

  // Fetch history
  useEffect(() => {
    if (!student?.id) {
      setLoading(false);
      return;
    }

    const fetchHistory = async () => {
      const { data, error } = await supabase
        .from("student_prompt_history")
        .select(`
          id,
          used_at,
          context,
          prompt:prompts(id, title, prompt_template, kid_category)
        `)
        .eq("student_id", student.id)
        .order("used_at", { ascending: false })
        .limit(20);

      if (error) {
        console.error("Error fetching history:", error);
        setLoading(false);
        return;
      }

      setHistory(data as unknown as HistoryItem[]);
      setLoading(false);
    };

    fetchHistory();
  }, [student?.id]);

  const toggleFavorite = async (promptId: string) => {
    if (!student?.id) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to save favorites",
        variant: "destructive",
      });
      return;
    }

    const isFavorite = favorites.includes(promptId);

    if (isFavorite) {
      // Remove favorite
      const { error } = await supabase
        .from("student_prompt_favorites")
        .delete()
        .eq("student_id", student.id)
        .eq("prompt_id", promptId);

      if (error) {
        toast({
          title: "Error",
          description: "Couldn't remove from favorites",
          variant: "destructive",
        });
        return;
      }

      setFavorites((prev) => prev.filter((id) => id !== promptId));
      toast({ title: "Removed from favorites" });
    } else {
      // Add favorite
      const { error } = await supabase
        .from("student_prompt_favorites")
        .insert({ student_id: student.id, prompt_id: promptId });

      if (error) {
        toast({
          title: "Error",
          description: "Couldn't add to favorites",
          variant: "destructive",
        });
        return;
      }

      setFavorites((prev) => [...prev, promptId]);
      toast({ title: "Added to favorites ⭐" });
    }
  };

  const recordUsage = async (promptId: string, context?: string) => {
    if (!student?.id) return;

    // Record in history
    await supabase
      .from("student_prompt_history")
      .insert({
        student_id: student.id,
        prompt_id: promptId,
        context,
      });

    // Increment usage count
    const prompt = prompts.find((p) => p.id === promptId);
    if (prompt) {
      await supabase
        .from("prompts")
        .update({ usage_count: (prompt.usage_count || 0) + 1 })
        .eq("id", promptId);
    }
  };

  const favoritePrompts = prompts.filter((p) => favorites.includes(p.id));

  // Calculate current week from enrolled_at date
  const currentWeek = useMemo(() => {
    if (!student?.enrolled_at) return 1;
    const enrolledDate = new Date(student.enrolled_at);
    const weeks = differenceInWeeks(new Date(), enrolledDate) + 1;
    return Math.min(Math.max(weeks, 1), 12); // Clamp between 1-12
  }, [student?.enrolled_at]);

  return {
    prompts,
    favorites,
    favoritePrompts,
    history,
    loading,
    toggleFavorite,
    recordUsage,
    studentContext: {
      currentWeek,
      program: student?.program || "teen",
      ideaSummary: student?.idea_summary || undefined,
    },
  };
}