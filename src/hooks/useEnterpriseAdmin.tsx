import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface EnterpriseOrganization {
  id: string;
  name: string;
  slug: string;
  industry: string | null;
  logo_url: string | null;
  primary_contact_name: string | null;
  primary_contact_email: string | null;
  primary_contact_phone: string | null;
  max_seats: number;
  license_start_date: string | null;
  license_end_date: string | null;
  is_active: boolean;
  settings: Record<string, unknown>;
}

export interface EnterpriseLearner {
  id: string;
  organization_id: string;
  student_id: string | null;
  email: string;
  full_name: string | null;
  department: string | null;
  job_title: string | null;
  enrolled_at: string;
  completed_at: string | null;
  status: 'invited' | 'active' | 'completed' | 'inactive';
}

export function useEnterpriseAdmin() {
  const { user } = useAuth();

  const { data: organizations, isLoading: orgsLoading } = useQuery({
    queryKey: ['enterprise-organizations', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('enterprise_organizations')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as EnterpriseOrganization[];
    },
    enabled: !!user,
  });

  const currentOrg = organizations?.[0];

  const { data: learners, isLoading: learnersLoading } = useQuery({
    queryKey: ['enterprise-learners', currentOrg?.id],
    queryFn: async () => {
      if (!currentOrg) return [];
      const { data, error } = await supabase
        .from('enterprise_learners')
        .select('*')
        .eq('organization_id', currentOrg.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as EnterpriseLearner[];
    },
    enabled: !!currentOrg,
  });

  const { data: adminRole } = useQuery({
    queryKey: ['enterprise-admin-role', user?.id, currentOrg?.id],
    queryFn: async () => {
      if (!currentOrg || !user) return null;
      const { data, error } = await supabase
        .from('enterprise_admins')
        .select('role')
        .eq('user_id', user.id)
        .eq('organization_id', currentOrg.id)
        .single();
      
      if (error) return null;
      return data.role as 'owner' | 'admin' | 'manager';
    },
    enabled: !!currentOrg && !!user,
  });

  const stats = {
    totalLearners: learners?.length || 0,
    activeLearners: learners?.filter(l => l.status === 'active').length || 0,
    completedLearners: learners?.filter(l => l.status === 'completed').length || 0,
    invitedLearners: learners?.filter(l => l.status === 'invited').length || 0,
    seatsRemaining: (currentOrg?.max_seats || 0) - (learners?.length || 0),
  };

  return {
    organizations,
    currentOrg,
    learners,
    adminRole,
    stats,
    isLoading: orgsLoading || learnersLoading,
    isEnterpriseAdmin: !!currentOrg,
  };
}
