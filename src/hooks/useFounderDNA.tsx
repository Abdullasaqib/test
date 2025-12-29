import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useStudent } from "./useStudent";
import { useToast } from "./use-toast";

export interface StrengthProfile {
  id: string;
  student_id: string;
  founder_type: string;
  founder_type_description: string | null;
  superpowers: string[];
  growth_edges: string[];
  role_fit: {
    ceo: number;
    cto: number;
    cmo: number;
    coo: number;
  };
  personalized_insight: string | null;
  recommended_focus: string | null;
  analysis_data: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface StrengthHistoryEntry {
  id: string;
  student_id: string;
  week_number: number;
  skill_snapshot: Record<string, number>;
  founder_type: string | null;
  role_fit: Record<string, number>;
  total_xp: number;
  missions_completed: number;
  created_at: string;
}

export function useFounderDNA() {
  const { student } = useStudent();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch current strength profile
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['strength-profile', student?.id],
    queryFn: async () => {
      if (!student) return null;

      const { data, error } = await supabase
        .from('strength_profiles')
        .select('*')
        .eq('student_id', student.id)
        .maybeSingle();

      if (error) throw error;
      
      // Transform the data to match our interface
      if (data) {
        return {
          ...data,
          superpowers: data.superpowers || [],
          growth_edges: data.growth_edges || [],
          role_fit: (data.role_fit as { ceo: number; cto: number; cmo: number; coo: number }) || { ceo: 0, cto: 0, cmo: 0, coo: 0 },
          analysis_data: (data.analysis_data as Record<string, unknown>) || {},
        } as StrengthProfile;
      }
      return null;
    },
    enabled: !!student,
  });

  // Fetch strength history
  const { data: history, isLoading: historyLoading } = useQuery({
    queryKey: ['strength-history', student?.id],
    queryFn: async () => {
      if (!student) return [];

      const { data, error } = await supabase
        .from('strength_history')
        .select('*')
        .eq('student_id', student.id)
        .order('week_number', { ascending: true });

      if (error) throw error;
      return (data || []).map(entry => ({
        ...entry,
        skill_snapshot: (entry.skill_snapshot as Record<string, number>) || {},
        role_fit: (entry.role_fit as Record<string, number>) || {},
      })) as StrengthHistoryEntry[];
    },
    enabled: !!student,
  });

  // Analyze/refresh DNA mutation
  const analyzeDNA = useMutation({
    mutationFn: async () => {
      if (!student) throw new Error('No student');

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-student-strengths`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ studentId: student.id }),
        }
      );

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Analysis failed' }));
        const errorMessage = error.error || error.message || 'Analysis failed. Please try again.';
        throw new Error(errorMessage);
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['strength-profile'] });
      toast({
        title: "DNA Analyzed!",
        description: "Your Founder DNA profile has been updated.",
      });
    },
    onError: (error: any) => {
      const errorMessage = error?.message || 'Analysis failed. Please ensure you have completed some missions and try again.';
      toast({
        title: "Analysis Failed",
        description: errorMessage.includes('not found') ? 'Student profile not found. Please contact support.' : errorMessage,
        variant: "destructive",
      });
    },
  });

  // Get founder type color
  const getFounderTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'The Creative': 'from-purple-500 to-pink-500',
      'The Analyst': 'from-blue-500 to-cyan-500',
      'The Hustler': 'from-orange-500 to-red-500',
      'The Builder': 'from-green-500 to-emerald-500',
      'The Strategist': 'from-indigo-500 to-violet-500',
    };
    return colors[type] || 'from-primary to-primary/80';
  };

  // Get founder type icon name
  const getFounderTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      'The Creative': 'Palette',
      'The Analyst': 'BarChart3',
      'The Hustler': 'Rocket',
      'The Builder': 'Hammer',
      'The Strategist': 'Target',
    };
    return icons[type] || 'Star';
  };

  return {
    profile,
    history,
    isLoading: profileLoading || historyLoading,
    analyzeDNA,
    getFounderTypeColor,
    getFounderTypeIcon,
  };
}
