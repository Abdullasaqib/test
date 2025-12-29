import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useStudent } from "./useStudent";
import { toast } from "sonner";

export interface SkillAssessment {
  id: string;
  student_id: string;
  skill_category: string;
  current_level: 'emerging' | 'developing' | 'proficient' | 'advanced';
  behavioral_score: number;
  performance_score: number;
  combined_score: number;
  momentum: 'rising' | 'stable' | 'declining';
  momentum_change: number;
  signature_strength: boolean;
  last_assessment_at: string;
}

export interface SkillInsight {
  id: string;
  student_id: string;
  signature_strength_name: string | null;
  signature_strength_description: string | null;
  growth_tips: string[];
  weekly_recommendations: {
    type: string;
    title: string;
    description: string;
    priority: string;
  }[];
  learning_style: string | null;
  team_role_suggestion: string | null;
  engagement_score: number;
  at_risk_indicators: string[];
  updated_at: string;
}

export const SKILL_CATEGORY_INFO: Record<string, { name: string; icon: string; color: string }> = {
  CREATIVE_THINKING: { name: 'Creative Thinking', icon: '💡', color: 'hsl(var(--chart-1))' },
  CRITICAL_REASONING: { name: 'Critical Reasoning', icon: '🧠', color: 'hsl(var(--chart-2))' },
  COMMUNICATION: { name: 'Communication', icon: '🎤', color: 'hsl(var(--chart-3))' },
  ENTREPRENEURIAL_MINDSET: { name: 'Entrepreneurial Mindset', icon: '🚀', color: 'hsl(var(--chart-4))' },
  FINANCIAL_LITERACY: { name: 'Financial Literacy', icon: '💰', color: 'hsl(var(--chart-5))' },
  COLLABORATION: { name: 'Collaboration', icon: '🤝', color: 'hsl(var(--primary))' },
  PERSISTENCE_GRIT: { name: 'Persistence & Grit', icon: '💪', color: 'hsl(var(--accent))' },
  AI_FLUENCY: { name: 'AI Fluency', icon: '🤖', color: 'hsl(var(--secondary))' },
};

export function useSkillIntelligence() {
  const { student, loading: studentLoading } = useStudent();
  const queryClient = useQueryClient();

  // Fetch skill assessments
  const { data: assessments, isLoading: assessmentsLoading } = useQuery({
    queryKey: ['skill-assessments', student?.id],
    queryFn: async () => {
      if (!student) return [];
      const { data, error } = await supabase
        .from('skill_assessments')
        .select('*')
        .eq('student_id', student.id)
        .order('combined_score', { ascending: false });
      if (error) throw error;
      return data as SkillAssessment[];
    },
    enabled: !!student,
  });

  // Fetch skill insights
  const { data: insights, isLoading: insightsLoading } = useQuery({
    queryKey: ['skill-insights', student?.id],
    queryFn: async () => {
      if (!student) return null;
      const { data, error } = await supabase
        .from('skill_insights')
        .select('*')
        .eq('student_id', student.id)
        .maybeSingle();
      if (error) throw error;
      if (!data) return null;
      
      // Transform JSON fields to proper types
      return {
        ...data,
        weekly_recommendations: (data.weekly_recommendations as unknown as SkillInsight['weekly_recommendations']) || [],
        at_risk_indicators: (data.at_risk_indicators as unknown as string[]) || [],
      } as SkillInsight;
    },
    enabled: !!student,
  });

  // Analyze/refresh intelligence
  const analyzeIntelligence = useMutation({
    mutationFn: async () => {
      if (studentLoading) throw new Error('Still loading student data...');
      if (!student) throw new Error('Please complete your profile first');
      
      const { data, error } = await supabase.functions.invoke('analyze-skill-intelligence', {
        body: { student_id: student.id }
      });
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skill-assessments', student?.id] });
      queryClient.invalidateQueries({ queryKey: ['skill-insights', student?.id] });
      toast.success('Skills intelligence updated!');
    },
    onError: (error: Error) => {
      console.error('Analysis error:', error);
      toast.error(error.message || 'Failed to analyze skills');
    }
  });

  // Get heatmap data for visualization
  const getHeatmapData = () => {
    return Object.keys(SKILL_CATEGORY_INFO).map(category => {
      const assessment = assessments?.find(a => a.skill_category === category);
      return {
        category,
        ...SKILL_CATEGORY_INFO[category],
        score: assessment?.combined_score || 0,
        momentum: assessment?.momentum || 'stable',
        momentumChange: assessment?.momentum_change || 0,
        level: assessment?.current_level || 'emerging',
        isSignature: assessment?.signature_strength || false,
      };
    });
  };

  // Get signature strength
  const getSignatureStrength = () => {
    const signature = assessments?.find(a => a.signature_strength);
    if (!signature) return null;
    return {
      ...signature,
      ...SKILL_CATEGORY_INFO[signature.skill_category],
      description: insights?.signature_strength_description
    };
  };

  return {
    assessments,
    insights,
    isLoading: assessmentsLoading || insightsLoading,
    studentLoading,
    student,
    analyzeIntelligence,
    getHeatmapData,
    getSignatureStrength,
  };
}
