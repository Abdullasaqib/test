import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface SchoolAdmin {
  id: string;
  user_id: string;
  school_id: string;
  role: string;
  is_primary: boolean;
  school: {
    id: string;
    name: string;
    code: string;
    logo_url: string | null;
    max_students: number | null;
  };
}

export interface SchoolStudent {
  id: string;
  user_id: string;
  full_name: string;
  age: number;
  program: string;
  grade: string | null;
  status: string | null;
  created_at: string;
  registration_type: string;
  school_id: string | null;
}

export interface SchoolInvite {
  id: string;
  school_id: string;
  code: string;
  max_uses: number;
  uses_count: number;
  program: string;
  grade: string | null;
  expires_at: string | null;
  is_active: boolean;
  created_at: string;
}

export interface SchoolLicense {
  id: string;
  school_id: string;
  max_students: number;
  enrolled_students: number;
  license_type: string;
  status: string;
  starts_at: string | null;
  expires_at: string | null;
}

export function useSchoolAdmin() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Get school admin profile
  const { data: schoolAdmin, isLoading: isLoadingAdmin } = useQuery({
    queryKey: ['school-admin', user?.id],
    queryFn: async () => {
      if (!user) return null;

      const { data, error } = await supabase
        .from('school_admins')
        .select(`
          id,
          user_id,
          school_id,
          role,
          is_primary,
          school:schools(id, name, code, logo_url, max_students)
        `)
        .eq('user_id', user.id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null; // No rows found
        throw error;
      }
      return data as unknown as SchoolAdmin;
    },
    enabled: !!user,
  });

  // Get school's students
  const { data: students, isLoading: isLoadingStudents, refetch: refetchStudents } = useQuery({
    queryKey: ['school-students', schoolAdmin?.school_id],
    queryFn: async () => {
      if (!schoolAdmin?.school_id) return [];

      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('school_id', schoolAdmin.school_id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as SchoolStudent[];
    },
    enabled: !!schoolAdmin?.school_id,
  });

  // Get school's invites
  const { data: invites, isLoading: isLoadingInvites, refetch: refetchInvites } = useQuery({
    queryKey: ['school-invites', schoolAdmin?.school_id],
    queryFn: async () => {
      if (!schoolAdmin?.school_id) return [];

      const { data, error } = await supabase
        .from('school_invites')
        .select('*')
        .eq('school_id', schoolAdmin.school_id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as SchoolInvite[];
    },
    enabled: !!schoolAdmin?.school_id,
  });

  // Get school's license
  const { data: license, isLoading: isLoadingLicense } = useQuery({
    queryKey: ['school-license', schoolAdmin?.school_id],
    queryFn: async () => {
      if (!schoolAdmin?.school_id) return null;

      const { data, error } = await supabase
        .from('school_licenses')
        .select('*')
        .eq('school_id', schoolAdmin.school_id)
        .eq('status', 'active')
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null;
        throw error;
      }
      return data as SchoolLicense;
    },
    enabled: !!schoolAdmin?.school_id,
  });

  // Create invite code mutation
  const createInvite = useMutation({
    mutationFn: async ({
      program,
      maxUses = 100,
      grade,
      expiresAt,
    }: {
      program: string;
      maxUses?: number;
      grade?: string;
      expiresAt?: string;
    }) => {
      if (!schoolAdmin?.school_id || !user) throw new Error('No school');

      // Generate unique code
      const code = `${schoolAdmin.school.code?.toUpperCase() || 'SCH'}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

      const { data, error } = await supabase
        .from('school_invites')
        .insert({
          school_id: schoolAdmin.school_id,
          code,
          program,
          max_uses: maxUses,
          grade,
          expires_at: expiresAt,
          created_by: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['school-invites'] });
    },
  });

  // Deactivate invite mutation
  const deactivateInvite = useMutation({
    mutationFn: async (inviteId: string) => {
      const { error } = await supabase
        .from('school_invites')
        .update({ is_active: false })
        .eq('id', inviteId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['school-invites'] });
    },
  });

  // Calculate license usage
  const licenseUsage = {
    used: students?.length || 0,
    total: license?.max_students || 0,
    remaining: (license?.max_students || 0) - (students?.length || 0),
    percentage: license?.max_students 
      ? Math.round(((students?.length || 0) / license.max_students) * 100) 
      : 0,
  };

  return {
    schoolAdmin,
    students,
    invites,
    license,
    licenseUsage,
    isLoading: isLoadingAdmin || isLoadingStudents || isLoadingInvites || isLoadingLicense,
    isLoadingAdmin,
    isLoadingStudents,
    isLoadingInvites,
    isSchoolAdmin: !!schoolAdmin,
    createInvite,
    deactivateInvite,
    refetchStudents,
    refetchInvites,
  };
}
