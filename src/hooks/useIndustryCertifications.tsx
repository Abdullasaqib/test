import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useStudent } from './useStudent';

export interface IndustryCertification {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string;
  color_theme: string;
  modules_count: number;
  estimated_hours: number | null;
  skill_focus_areas: string[];
  career_paths: string[];
  real_world_companies: string[];
  is_active: boolean;
}

export interface IndustryModule {
  id: string;
  certification_id: string;
  module_number: number;
  title: string;
  description: string | null;
  learning_objectives: string[];
  bloom_levels: string[];
  sprints_count: number;
  estimated_minutes: number;
  case_study_company: string | null;
  case_study_description: string | null;
}

export interface IndustrySprint {
  id: string;
  module_id: string;
  sprint_number: number;
  title: string;
  content: string;
  bloom_level: string | null;
  learning_framework: string | null;
  quiz_questions: any[];
  reflection_prompt: string | null;
  real_world_example: string | null;
  estimated_seconds: number;
}

export interface StudentIndustryProgress {
  id: string;
  student_id: string;
  certification_id: string;
  modules_completed: number;
  sprints_completed: number;
  current_module_id: string | null;
  started_at: string;
  completed_at: string | null;
  certificate_number: string | null;
}

export function useIndustryCertifications() {
  const { student } = useStudent();
  const [certifications, setCertifications] = useState<IndustryCertification[]>([]);
  const [progress, setProgress] = useState<StudentIndustryProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertifications();
  }, []);

  useEffect(() => {
    if (student?.id) {
      fetchProgress();
    }
  }, [student?.id]);

  const fetchCertifications = async () => {
    try {
      const { data, error } = await supabase
        .from('industry_certifications')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (error) throw error;
      
      setCertifications((data || []).map(cert => ({
        ...cert,
        skill_focus_areas: cert.skill_focus_areas as string[] || [],
        career_paths: cert.career_paths as string[] || [],
        real_world_companies: cert.real_world_companies as string[] || [],
      })));
    } catch (error) {
      console.error('Error fetching industry certifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProgress = async () => {
    if (!student?.id) return;

    try {
      const { data, error } = await supabase
        .from('student_industry_progress')
        .select('*')
        .eq('student_id', student.id);

      if (error) throw error;
      setProgress(data || []);
    } catch (error) {
      console.error('Error fetching industry progress:', error);
    }
  };

  const startCertification = async (certificationId: string) => {
    if (!student?.id) return null;

    try {
      // Get first module
      const { data: modules } = await supabase
        .from('industry_modules')
        .select('id')
        .eq('certification_id', certificationId)
        .order('module_number')
        .limit(1);

      const firstModuleId = modules?.[0]?.id || null;

      const { data, error } = await supabase
        .from('student_industry_progress')
        .insert({
          student_id: student.id,
          certification_id: certificationId,
          current_module_id: firstModuleId,
        })
        .select()
        .single();

      if (error) throw error;
      
      setProgress(prev => [...prev, data]);
      return data;
    } catch (error) {
      console.error('Error starting certification:', error);
      return null;
    }
  };

  const getProgressForCertification = (certificationId: string) => {
    return progress.find(p => p.certification_id === certificationId);
  };

  return {
    certifications,
    progress,
    loading,
    startCertification,
    getProgressForCertification,
    refetchProgress: fetchProgress,
  };
}

export function useIndustryModules(certificationId: string | null) {
  const [modules, setModules] = useState<IndustryModule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reset state when certificationId changes
    if (!certificationId) {
      setModules([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchModules();
  }, [certificationId]);

  const fetchModules = async () => {
    if (!certificationId) {
      setLoading(false);
      return;
    }

    try {
      console.log('[useIndustryModules] Fetching modules for certification:', certificationId);
      const { data, error } = await supabase
        .from('industry_modules')
        .select('*')
        .eq('certification_id', certificationId)
        .order('module_number');

      if (error) throw error;
      
      console.log('[useIndustryModules] Fetched modules:', data?.length);
      setModules((data || []).map(mod => ({
        ...mod,
        learning_objectives: mod.learning_objectives || [],
        bloom_levels: mod.bloom_levels || [],
      })));
    } catch (error) {
      console.error('Error fetching modules:', error);
    } finally {
      setLoading(false);
    }
  };

  return { modules, loading };
}

export function useIndustrySprints(moduleId: string | null) {
  const { student } = useStudent();
  const [sprints, setSprints] = useState<IndustrySprint[]>([]);
  const [completedSprintIds, setCompletedSprintIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (moduleId) {
      fetchSprints();
    }
  }, [moduleId]);

  useEffect(() => {
    if (student?.id && sprints.length > 0) {
      fetchCompletedSprints();
    }
  }, [student?.id, sprints]);

  const fetchSprints = async () => {
    if (!moduleId) return;

    try {
      const { data, error } = await supabase
        .from('industry_sprints')
        .select('*')
        .eq('module_id', moduleId)
        .order('sprint_number');

      if (error) throw error;
      
      setSprints((data || []).map(sprint => ({
        ...sprint,
        quiz_questions: Array.isArray(sprint.quiz_questions) ? sprint.quiz_questions : [],
      })));
    } catch (error) {
      console.error('Error fetching sprints:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompletedSprints = async () => {
    if (!student?.id) return;

    const sprintIds = sprints.map(s => s.id);
    if (sprintIds.length === 0) return;

    try {
      const { data, error } = await supabase
        .from('student_industry_sprint_progress')
        .select('sprint_id')
        .eq('student_id', student.id)
        .in('sprint_id', sprintIds);

      if (error) throw error;
      setCompletedSprintIds((data || []).map(d => d.sprint_id));
    } catch (error) {
      console.error('Error fetching completed sprints:', error);
    }
  };

  const completeSprint = async (sprintId: string, quizScore?: number) => {
    if (!student?.id) return;

    try {
      const { error } = await supabase
        .from('student_industry_sprint_progress')
        .upsert({
          student_id: student.id,
          sprint_id: sprintId,
          quiz_score: quizScore,
        });

      if (error) throw error;
      setCompletedSprintIds(prev => [...prev, sprintId]);
    } catch (error) {
      console.error('Error completing sprint:', error);
    }
  };

  return {
    sprints,
    completedSprintIds,
    loading,
    completeSprint,
    allCompleted: sprints.length > 0 && completedSprintIds.length >= sprints.length,
  };
}
