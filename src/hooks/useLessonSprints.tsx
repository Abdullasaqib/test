import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface LessonSprint {
  id: string;
  lesson_id: string;
  sprint_order: number;
  title: string;
  content: string;
  estimated_seconds: number;
  quiz_questions: Array<{
    question: string;
    options: string[];
    correct: number;
  }>;
}

export function useLessonSprints(lessonId: string | null, studentId: string | null) {
  const [sprints, setSprints] = useState<LessonSprint[]>([]);
  const [completedSprintIds, setCompletedSprintIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!lessonId) {
      setSprints([]);
      setLoading(false);
      return;
    }

    const fetchSprints = async () => {
      setLoading(true);
      
      // Fetch sprints for this lesson
      const { data: sprintData, error } = await supabase
        .from("lesson_sprints")
        .select("*")
        .eq("lesson_id", lessonId)
        .order("sprint_order");

      if (!error && sprintData) {
        setSprints(sprintData.map(s => ({
          ...s,
          quiz_questions: (s.quiz_questions as any) || []
        })));
      }

      // Fetch completed sprints for this student
      if (studentId && sprintData) {
        const sprintIds = sprintData.map(s => s.id);
        const { data: progressData } = await supabase
          .from("sprint_progress")
          .select("sprint_id")
          .eq("student_id", studentId)
          .in("sprint_id", sprintIds);

        if (progressData) {
          setCompletedSprintIds(progressData.map(p => p.sprint_id));
        }
      }

      setLoading(false);
    };

    fetchSprints();
  }, [lessonId, studentId]);

  const completeSprint = async (sprintId: string, quizScore?: number) => {
    if (!studentId) return;

    const { error } = await supabase
      .from("sprint_progress")
      .upsert({
        student_id: studentId,
        sprint_id: sprintId,
        quiz_score: quizScore,
        completed_at: new Date().toISOString()
      }, { onConflict: "student_id,sprint_id" });

    if (!error) {
      setCompletedSprintIds(prev => [...prev, sprintId]);
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
    allSprintsCompleted
  };
}