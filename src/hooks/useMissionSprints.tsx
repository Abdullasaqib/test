import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface MissionSprint {
  id: string;
  mission_id: string;
  sprint_order: number;
  sprint_type: 'content' | 'quiz' | 'lab' | 'reflection';
  title: string;
  content: string;
  estimated_seconds: number;
  quiz_questions: Array<{
    question: string;
    options: string[];
    correctIndex: number;
  }>;
  lab_instructions?: string;
}

export function useMissionSprints(missionId: string | null, studentId: string | null) {
  const queryClient = useQueryClient();

  // Fetch sprints for this mission
  const { data: sprints = [], isLoading: sprintsLoading } = useQuery({
    queryKey: ['mission-sprints', missionId],
    queryFn: async () => {
      if (!missionId) return [];

      const { data: sprintsData, error: sprintsError } = await supabase
        .from('mission_sprints')
        .select('*')
        .eq('mission_id', missionId)
        .order('sprint_order');

      if (sprintsError) {
        console.error('Error fetching mission sprints:', sprintsError);
        return [];
      }

      // Parse quiz_questions from JSON
      return (sprintsData || []).map(sprint => ({
        ...sprint,
        sprint_type: sprint.sprint_type as MissionSprint['sprint_type'],
        quiz_questions: Array.isArray(sprint.quiz_questions) 
          ? sprint.quiz_questions as MissionSprint['quiz_questions']
          : []
      }));
    },
    enabled: !!missionId,
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
  });

  // Fetch completed sprints for this student
  const { data: completedSprintIds = [] } = useQuery({
    queryKey: ['mission-sprint-progress', studentId, missionId],
    queryFn: async () => {
      if (!studentId || !missionId || sprints.length === 0) return [];

      const sprintIds = sprints.map(s => s.id);
      const { data: progressData } = await supabase
        .from('mission_sprint_progress')
        .select('sprint_id')
        .eq('student_id', studentId)
        .in('sprint_id', sprintIds);

      return (progressData || []).map(p => p.sprint_id);
    },
    enabled: !!studentId && !!missionId && sprints.length > 0,
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
  });

  const completeSprint = async (sprintId: string, quizScore?: number, timeSpent?: number) => {
    if (!studentId) return;

    const { error } = await supabase
      .from('mission_sprint_progress')
      .upsert({
        student_id: studentId,
        sprint_id: sprintId,
        quiz_score: quizScore,
        time_spent_seconds: timeSpent,
        completed_at: new Date().toISOString()
      }, {
        onConflict: 'student_id,sprint_id'
      });

    if (!error) {
      // Optimistically update the cache
      queryClient.setQueryData(
        ['mission-sprint-progress', studentId, missionId],
        (old: string[] | undefined) => [...(old || []), sprintId]
      );
    }
  };

  return {
    sprints,
    completedSprintIds,
    loading: sprintsLoading,
    completeSprint,
    hasSprints: sprints.length > 0,
    allSprintsCompleted: sprints.length > 0 && sprints.every(s => completedSprintIds.includes(s.id))
  };
}
