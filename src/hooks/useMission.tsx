import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useStudent } from "./useStudent";

export interface Mission {
  id: string;
  week: number;
  day: number;
  day_number: number;
  phase: number;
  track: string;
  title: string;
  subtitle: string | null;
  micro_content: string;
  lab_prompt: string;
  video_url: string | null;
  estimated_minutes: number;
  artifact_type: string | null;
}

export interface MissionStep {
  id: string;
  mission_id: string;
  step_number: number;
  title: string;
  instruction: string;
  prompt_help: string | null;
  input_type: string;
  input_placeholder: string | null;
  example_output: string | null;
  is_required: boolean;
}

export interface StudentMission {
  id: string;
  student_id: string;
  mission_id: string;
  status: 'locked' | 'available' | 'in_progress' | 'completed';
  started_at: string | null;
  completed_at: string | null;
  time_spent_minutes: number | null;
}

export function useMission() {
  const { student, loading: studentLoading } = useStudent();
  const queryClient = useQueryClient();

  // Get current mission for student
  const { data: currentMission, isLoading: isLoadingMission } = useQuery({
    queryKey: ['current-mission', student?.id, student?.program],
    queryFn: async () => {
      if (!student) return null;

      // Get the track based on program
      const track = student.program === 'junior' ? 'junior' : 
                    student.program === 'teen' ? 'teen' : 'advanced';

      // Get student's mission progress
      const { data: studentMissions } = await supabase
        .from('student_missions')
        .select('*')
        .eq('student_id', student.id);

      // Get all missions for this track
      const { data: missions } = await supabase
        .from('missions')
        .select('*')
        .eq('track', track)
        .order('day_number', { ascending: true });

      if (!missions || missions.length === 0) return null;

      // Find current mission (first not completed)
      const completedIds = new Set(
        studentMissions?.filter(sm => sm.status === 'completed').map(sm => sm.mission_id) || []
      );

      const inProgressMission = studentMissions?.find(sm => sm.status === 'in_progress');
      if (inProgressMission) {
        const mission = missions.find(m => m.id === inProgressMission.mission_id);
        return mission || missions[0];
      }

      // Find first not completed
      for (const mission of missions) {
        if (!completedIds.has(mission.id)) {
          return mission;
        }
      }

      // All completed, return last one
      return missions[missions.length - 1];
    },
    enabled: !!student,
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
  });

  // Get next mission (for tomorrow preview)
  const { data: nextMission } = useQuery({
    queryKey: ['next-mission', student?.id, student?.program, currentMission?.id],
    queryFn: async () => {
      if (!student || !currentMission) return null;

      const track = student.program === 'junior' ? 'junior' : 
                    student.program === 'teen' ? 'teen' : 'advanced';

      const { data: missions } = await supabase
        .from('missions')
        .select('*')
        .eq('track', track)
        .gt('day_number', currentMission.day_number)
        .order('day_number', { ascending: true })
        .limit(1);

      return missions?.[0] || null;
    },
    enabled: !!student && !!currentMission,
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
  });

  // Get mission steps
  const { data: missionSteps, isLoading: isLoadingSteps } = useQuery({
    queryKey: ['mission-steps', currentMission?.id],
    queryFn: async () => {
      if (!currentMission) return [];

      const { data, error } = await supabase
        .from('mission_steps')
        .select('*')
        .eq('mission_id', currentMission.id)
        .order('step_number', { ascending: true });

      if (error) throw error;
      return data as MissionStep[];
    },
    enabled: !!currentMission,
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
  });

  // Get student mission status
  const { data: studentMissionStatus } = useQuery({
    queryKey: ['student-mission-status', student?.id, currentMission?.id],
    queryFn: async () => {
      if (!student || !currentMission) return null;

      const { data } = await supabase
        .from('student_missions')
        .select('*')
        .eq('student_id', student.id)
        .eq('mission_id', currentMission.id)
        .single();

      return data as StudentMission | null;
    },
    enabled: !!student && !!currentMission,
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
  });

  // Get skills for this mission
  const { data: missionSkills } = useQuery({
    queryKey: ['mission-skills', currentMission?.id],
    queryFn: async () => {
      if (!currentMission) return [];

      const { data } = await supabase
        .from('skill_mappings')
        .select('*')
        .eq('mission_id', currentMission.id);

      return data || [];
    },
    enabled: !!currentMission,
  });

  // Get student's current skill totals for level display
  const { data: skillTotals } = useQuery({
    queryKey: ['skill-totals', student?.id],
    queryFn: async () => {
      if (!student) return {};

      const { data } = await supabase
        .from('skill_scores')
        .select('skill, total_points')
        .eq('student_id', student.id);

      const totals: Record<string, number> = {};
      data?.forEach(s => {
        totals[s.skill] = s.total_points;
      });
      return totals;
    },
    enabled: !!student,
  });

  // Start mission mutation
  const startMission = useMutation({
    mutationFn: async () => {
      if (!student || !currentMission) throw new Error('No student or mission');

      const { data, error } = await supabase
        .from('student_missions')
        .upsert({
          student_id: student.id,
          mission_id: currentMission.id,
          status: 'in_progress',
          started_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['student-mission-status'] });
      queryClient.invalidateQueries({ queryKey: ['current-mission'] });
    },
  });

  // Complete mission mutation
  const completeMission = useMutation({
    mutationFn: async (timeSpentMinutes: number) => {
      if (!student || !currentMission) throw new Error('No student or mission');

      const { data, error } = await supabase
        .from('student_missions')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString(),
          time_spent_minutes: timeSpentMinutes,
        })
        .eq('student_id', student.id)
        .eq('mission_id', currentMission.id)
        .select()
        .single();

      if (error) throw error;

      // Update skill scores
      if (missionSkills && missionSkills.length > 0) {
        for (const skillMapping of missionSkills) {
          // Upsert skill score
          const { data: existingScore } = await supabase
            .from('skill_scores')
            .select('*')
            .eq('student_id', student.id)
            .eq('skill', skillMapping.skill)
            .single();

          if (existingScore) {
            await supabase
              .from('skill_scores')
              .update({
                total_points: existingScore.total_points + skillMapping.points,
                missions_completed: existingScore.missions_completed + 1,
                last_earned_at: new Date().toISOString(),
              })
              .eq('id', existingScore.id);
          } else {
            await supabase
              .from('skill_scores')
              .insert({
                student_id: student.id,
                skill: skillMapping.skill,
                total_points: skillMapping.points,
                missions_completed: 1,
                last_earned_at: new Date().toISOString(),
              });
          }
        }
      }

      // Check if all 60 missions are completed to auto-grant AI Builder Certificate
      await checkAndGrantAIBuilderCertificate(student.id);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['student-mission-status'] });
      queryClient.invalidateQueries({ queryKey: ['current-mission'] });
      queryClient.invalidateQueries({ queryKey: ['skill-scores'] });
      queryClient.invalidateQueries({ queryKey: ['skill-totals'] });
      queryClient.invalidateQueries({ queryKey: ['next-mission'] });
      queryClient.invalidateQueries({ queryKey: ['student-certifications'] });
    },
  });

  // Check and auto-grant AI Builder Certificate when 60 missions completed
  const checkAndGrantAIBuilderCertificate = async (studentId: string) => {
    // Count completed missions
    const { data: completedMissions, error: countError } = await supabase
      .from('student_missions')
      .select('id')
      .eq('student_id', studentId)
      .eq('status', 'completed');

    if (countError || !completedMissions) return;

    const completedCount = completedMissions.length;

    // Need 60 missions to earn AI Builder Certificate
    if (completedCount < 60) return;

    // Check if AI Builder Certificate already granted
    const { data: existingCert } = await supabase
      .from('student_certifications')
      .select('id')
      .eq('student_id', studentId)
      .eq('certification_id', '59605064-f965-4fd1-976a-2a79b295e3e0') // AI Builder Certificate ID
      .maybeSingle();

    if (existingCert) return; // Already has certificate

    // Grant AI Builder Certificate
    const certificateNumber = `NEXT-AB-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
    
    await supabase
      .from('student_certifications')
      .insert({
        student_id: studentId,
        certification_id: '59605064-f965-4fd1-976a-2a79b295e3e0',
        completed_at: new Date().toISOString(),
        certificate_number: certificateNumber,
      });

    console.log('🎓 AI Builder Certificate auto-granted!', certificateNumber);
  };

  // Get all missions for journey view
  const { data: allMissions } = useQuery({
    queryKey: ['all-missions', student?.program],
    queryFn: async () => {
      if (!student) return [];

      const track = student.program === 'junior' ? 'junior' : 
                    student.program === 'teen' ? 'teen' : 'advanced';

      const { data } = await supabase
        .from('missions')
        .select('*')
        .eq('track', track)
        .order('day_number', { ascending: true });

      return data || [];
    },
    enabled: !!student,
  });

  // Get all student missions for progress
  const { data: allStudentMissions } = useQuery({
    queryKey: ['all-student-missions', student?.id],
    queryFn: async () => {
      if (!student) return [];

      const { data } = await supabase
        .from('student_missions')
        .select('*')
        .eq('student_id', student.id);

      return data || [];
    },
    enabled: !!student,
  });

  const completedCount = allStudentMissions?.filter(sm => sm.status === 'completed').length || 0;
  const totalMissions = allMissions?.length || 60;
  const progressPercentage = Math.round((completedCount / totalMissions) * 100);

  return {
    currentMission,
    nextMission,
    missionSteps,
    studentMissionStatus,
    missionSkills,
    skillTotals,
    allMissions,
    allStudentMissions,
    completedCount,
    totalMissions,
    progressPercentage,
    isLoading: studentLoading || isLoadingMission || isLoadingSteps,
    startMission,
    completeMission,
  };
}
