import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSchoolAdmin } from "./useSchoolAdmin";
import { SKILL_LABELS } from "./useSkills";

export interface StudentSkillData {
  student_id: string;
  student_name: string;
  program: string;
  skills: Record<string, number>;
  total_points: number;
  missions_completed: number;
}

export interface SchoolSkillAggregate {
  skill: string;
  name: string;
  average_score: number;
  total_points: number;
  students_with_skill: number;
  color: string;
}

export function useSchoolSkills() {
  const { students, schoolAdmin } = useSchoolAdmin();
  const studentIds = students?.map(s => s.id) || [];

  // Fetch skill scores for all school students
  const { data: skillScores, isLoading } = useQuery({
    queryKey: ['school-skill-scores', schoolAdmin?.school_id],
    queryFn: async () => {
      if (studentIds.length === 0) return [];

      const { data, error } = await supabase
        .from('skill_scores')
        .select('*')
        .in('student_id', studentIds);

      if (error) throw error;
      return data;
    },
    enabled: studentIds.length > 0,
  });

  // Fetch mission completion for all school students
  const { data: missionData } = useQuery({
    queryKey: ['school-mission-data', schoolAdmin?.school_id],
    queryFn: async () => {
      if (studentIds.length === 0) return [];

      const { data, error } = await supabase
        .from('student_missions')
        .select('student_id, status')
        .in('student_id', studentIds);

      if (error) throw error;
      return data;
    },
    enabled: studentIds.length > 0,
  });

  // Fetch artifacts for all school students
  const { data: artifactData } = useQuery({
    queryKey: ['school-artifact-data', schoolAdmin?.school_id],
    queryFn: async () => {
      if (studentIds.length === 0) return [];

      const { data, error } = await supabase
        .from('artifacts')
        .select('student_id, artifact_type')
        .in('student_id', studentIds);

      if (error) throw error;
      return data;
    },
    enabled: studentIds.length > 0,
  });

  // Fetch pitch attempts for all school students
  const { data: pitchData } = useQuery({
    queryKey: ['school-pitch-data', schoolAdmin?.school_id],
    queryFn: async () => {
      if (studentIds.length === 0) return [];

      const { data, error } = await supabase
        .from('pitch_attempts')
        .select('student_id, score, total_xp_earned')
        .in('student_id', studentIds);

      if (error) throw error;
      return data;
    },
    enabled: studentIds.length > 0,
  });

  // Aggregate skills by student
  const studentSkillsMap: Record<string, StudentSkillData> = {};
  
  students?.forEach(student => {
    studentSkillsMap[student.id] = {
      student_id: student.id,
      student_name: student.full_name,
      program: student.program,
      skills: {},
      total_points: 0,
      missions_completed: 0,
    };
  });

  skillScores?.forEach(score => {
    if (studentSkillsMap[score.student_id]) {
      studentSkillsMap[score.student_id].skills[score.skill] = score.total_points;
      studentSkillsMap[score.student_id].total_points += score.total_points;
      studentSkillsMap[score.student_id].missions_completed += score.missions_completed;
    }
  });

  const studentSkillsList = Object.values(studentSkillsMap);

  // Calculate school-wide skill averages
  const schoolSkillAggregates: SchoolSkillAggregate[] = Object.entries(SKILL_LABELS).map(([key, info]) => {
    const studentsWithSkill = studentSkillsList.filter(s => (s.skills[key] || 0) > 0);
    const totalPoints = studentSkillsList.reduce((sum, s) => sum + (s.skills[key] || 0), 0);
    const avgScore = studentSkillsList.length > 0 
      ? totalPoints / studentSkillsList.length 
      : 0;

    return {
      skill: key,
      name: info.name,
      average_score: Math.round(avgScore * 10) / 10,
      total_points: totalPoints,
      students_with_skill: studentsWithSkill.length,
      color: info.color,
    };
  });

  // Get student detail data
  const getStudentDetail = (studentId: string) => {
    const student = students?.find(s => s.id === studentId);
    const skills = studentSkillsMap[studentId];
    const missions = missionData?.filter(m => m.student_id === studentId) || [];
    const artifacts = artifactData?.filter(a => a.student_id === studentId) || [];
    const pitches = pitchData?.filter(p => p.student_id === studentId) || [];

    const completedMissions = missions.filter(m => m.status === 'completed').length;
    const totalMissions = 60; // Total missions in program

    return {
      student,
      skills: skills?.skills || {},
      totalPoints: skills?.total_points || 0,
      missionsCompleted: completedMissions,
      totalMissions,
      progressPercent: Math.round((completedMissions / totalMissions) * 100),
      artifacts,
      pitchAttempts: pitches.length,
      avgPitchScore: pitches.length > 0 
        ? Math.round(pitches.reduce((sum, p) => sum + (p.score || 0), 0) / pitches.length)
        : 0,
      totalXP: pitches.reduce((sum, p) => sum + (p.total_xp_earned || 0), 0),
    };
  };

  // Top performers
  const topPerformers = [...studentSkillsList]
    .sort((a, b) => b.total_points - a.total_points)
    .slice(0, 5);

  // Program distribution
  const programDistribution = students?.reduce((acc, s) => {
    acc[s.program] = (acc[s.program] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  return {
    studentSkillsList,
    schoolSkillAggregates,
    topPerformers,
    programDistribution,
    getStudentDetail,
    isLoading,
    totalStudents: students?.length || 0,
    totalSkillPoints: studentSkillsList.reduce((sum, s) => sum + s.total_points, 0),
    avgSkillPoints: studentSkillsList.length > 0 
      ? Math.round(studentSkillsList.reduce((sum, s) => sum + s.total_points, 0) / studentSkillsList.length)
      : 0,
  };
}
