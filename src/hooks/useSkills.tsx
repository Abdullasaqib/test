import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useStudent } from "./useStudent";
import { useDemoMode } from "@/contexts/DemoContext";

export const SKILL_LABELS: Record<string, { name: string; description: string; color: string }> = {
  PROBLEM_ANALYSIS: {
    name: "Problem Analysis",
    description: "Identifying and defining problems clearly",
    color: "hsl(var(--chart-1))",
  },
  AI_COLLABORATION: {
    name: "AI Collaboration",
    description: "Working effectively with AI tools",
    color: "hsl(var(--chart-2))",
  },
  CUSTOMER_RESEARCH: {
    name: "Customer Research",
    description: "Understanding customer needs",
    color: "hsl(var(--chart-3))",
  },
  DIGITAL_LITERACY: {
    name: "Digital Literacy",
    description: "Building digital products",
    color: "hsl(var(--chart-4))",
  },
  ENTREPRENEURSHIP: {
    name: "Entrepreneurship",
    description: "Building viable businesses",
    color: "hsl(var(--chart-5))",
  },
  COMMUNICATION: {
    name: "Communication",
    description: "Expressing ideas clearly",
    color: "hsl(var(--primary))",
  },
  RESILIENCE: {
    name: "Resilience",
    description: "Handling setbacks and iterating",
    color: "hsl(var(--accent))",
  },
  SELF_MANAGEMENT: {
    name: "Self Management",
    description: "Planning and executing consistently",
    color: "hsl(var(--secondary))",
  },
};

export interface SkillScore {
  id: string;
  student_id: string;
  skill: string;
  total_points: number;
  missions_completed: number;
  last_earned_at: string | null;
}

export function useSkills() {
  const { student } = useStudent();
  const { isDemoMode, demoSkillScores } = useDemoMode();

  const { data: skillScores, isLoading } = useQuery({
    queryKey: ['skill-scores', student?.id, isDemoMode],
    queryFn: async () => {
      // Return demo data if in demo mode
      if (isDemoMode) {
        return demoSkillScores as SkillScore[];
      }

      if (!student) return [];

      const { data, error } = await supabase
        .from('skill_scores')
        .select('*')
        .eq('student_id', student.id);

      if (error) throw error;
      return data as SkillScore[];
    },
    enabled: !!student || isDemoMode,
  });

  // Get skill score by type
  const getSkillScore = (skillType: string): number => {
    const score = skillScores?.find(s => s.skill === skillType);
    return score?.total_points || 0;
  };

  // Get all skills with scores for radar chart
  const getSkillsForRadar = () => {
    return Object.entries(SKILL_LABELS).map(([key, info]) => ({
      skill: key,
      name: info.name,
      score: getSkillScore(key),
      maxScore: 100, // Max possible score
      color: info.color,
    }));
  };

  // Get total points across all skills
  const totalPoints = skillScores?.reduce((acc, s) => acc + s.total_points, 0) || 0;

  // Get total missions completed (unique)
  const totalMissionsWithSkills = skillScores?.reduce((acc, s) => acc + s.missions_completed, 0) || 0;

  return {
    skillScores,
    isLoading,
    getSkillScore,
    getSkillsForRadar,
    totalPoints,
    totalMissionsWithSkills,
  };
}
