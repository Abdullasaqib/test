import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useStudent } from "./useStudent";
import { useEffect } from "react";

export interface Team {
  id: string;
  name: string;
  join_code: string;
  program: string;
  created_by: string;
  created_at: string;
}

export interface TeamMember {
  id: string;
  team_id: string;
  student_id: string;
  role: string;
  joined_at: string;
  student?: {
    id: string;
    full_name: string;
    program: string;
  };
}

export interface TeamNote {
  id: string;
  team_id: string;
  title: string;
  content: string | null;
  created_by: string;
  created_at: string;
  creator?: {
    full_name: string;
  };
}

export interface TeamMemberProgress {
  student_id: string;
  full_name: string;
  missions_completed: number;
  total_xp: number;
  artifacts_count: number;
  pitch_attempts: number;
}

export function useTeam() {
  const { student } = useStudent();
  const queryClient = useQueryClient();

  // Get current user's team membership
  const { data: membership, isLoading: isLoadingMembership } = useQuery({
    queryKey: ['team-membership', student?.id],
    queryFn: async () => {
      if (!student) return null;

      const { data, error } = await supabase
        .from('team_members')
        .select('*, team:teams(*)')
        .eq('student_id', student.id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null;
        throw error;
      }
      return data;
    },
    enabled: !!student,
  });

  const team = membership?.team as Team | undefined;
  const hasTeam = !!team;

  // Get team members
  const { data: members, isLoading: isLoadingMembers } = useQuery({
    queryKey: ['team-members', team?.id],
    queryFn: async () => {
      if (!team) return [];

      const { data, error } = await supabase
        .from('team_members')
        .select(`
          *,
          student:students(id, full_name, program)
        `)
        .eq('team_id', team.id)
        .order('joined_at', { ascending: true });

      if (error) throw error;
      return data as TeamMember[];
    },
    enabled: !!team,
  });

  // Get team notes
  const { data: notes, isLoading: isLoadingNotes, refetch: refetchNotes } = useQuery({
    queryKey: ['team-notes', team?.id],
    queryFn: async () => {
      if (!team) return [];

      const { data, error } = await supabase
        .from('team_notes')
        .select(`
          *,
          creator:students!team_notes_created_by_fkey(full_name)
        `)
        .eq('team_id', team.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as TeamNote[];
    },
    enabled: !!team,
  });

  // Get team member progress (for viewing teammates' progress)
  const { data: memberProgress } = useQuery({
    queryKey: ['team-member-progress', team?.id],
    queryFn: async () => {
      if (!team || !members) return [];

      const memberIds = members.map(m => m.student_id);
      
      // Get missions completed
      const { data: missions } = await supabase
        .from('student_missions')
        .select('student_id, status')
        .in('student_id', memberIds);

      // Get skill scores (XP)
      const { data: skills } = await supabase
        .from('skill_scores')
        .select('student_id, total_points')
        .in('student_id', memberIds);

      // Get artifacts
      const { data: artifacts } = await supabase
        .from('artifacts')
        .select('student_id')
        .in('student_id', memberIds);

      // Get pitch attempts
      const { data: pitches } = await supabase
        .from('pitch_attempts')
        .select('student_id')
        .in('student_id', memberIds);

      // Aggregate per member
      const progress: TeamMemberProgress[] = members.map(member => {
        const studentMissions = missions?.filter(m => m.student_id === member.student_id) || [];
        const studentSkills = skills?.filter(s => s.student_id === member.student_id) || [];
        const studentArtifacts = artifacts?.filter(a => a.student_id === member.student_id) || [];
        const studentPitches = pitches?.filter(p => p.student_id === member.student_id) || [];

        return {
          student_id: member.student_id,
          full_name: member.student?.full_name || 'Unknown',
          missions_completed: studentMissions.filter(m => m.status === 'completed').length,
          total_xp: studentSkills.reduce((sum, s) => sum + s.total_points, 0),
          artifacts_count: studentArtifacts.length,
          pitch_attempts: studentPitches.length,
        };
      });

      return progress;
    },
    enabled: !!team && !!members && members.length > 0,
  });

  // Real-time subscription for team notes
  useEffect(() => {
    if (!team) return;

    const channel = supabase
      .channel(`team-notes-${team.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'team_notes',
          filter: `team_id=eq.${team.id}`,
        },
        () => {
          refetchNotes();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [team?.id, refetchNotes]);

  // Create team mutation
  const createTeam = useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      if (!student) throw new Error('Not logged in');

      // Generate unique join code
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let code = "NBL-";
      for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      // Create team
      const { data: newTeam, error: teamError } = await supabase
        .from('teams')
        .insert({
          name,
          join_code: code,
          program: student.program,
          created_by: student.id,
        })
        .select()
        .single();

      if (teamError) throw teamError;

      // Add creator as leader
      const { error: memberError } = await supabase
        .from('team_members')
        .insert({
          team_id: newTeam.id,
          student_id: student.id,
          role: 'leader',
        });

      if (memberError) throw memberError;

      return newTeam;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-membership'] });
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
    },
  });

  // Join team mutation
  const joinTeam = useMutation({
    mutationFn: async ({ joinCode }: { joinCode: string }) => {
      if (!student) throw new Error('Not logged in');

      // Find team by code
      const { data: foundTeam, error: findError } = await supabase
        .from('teams')
        .select('*')
        .eq('join_code', joinCode.toUpperCase())
        .single();

      if (findError || !foundTeam) {
        throw new Error('Invalid team code');
      }

      // Check if already a member
      const { data: existing } = await supabase
        .from('team_members')
        .select('id')
        .eq('team_id', foundTeam.id)
        .eq('student_id', student.id)
        .single();

      if (existing) {
        throw new Error('You are already a member of this team');
      }

      // Add as member
      const { error: joinError } = await supabase
        .from('team_members')
        .insert({
          team_id: foundTeam.id,
          student_id: student.id,
          role: 'member',
        });

      if (joinError) throw joinError;

      return foundTeam;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-membership'] });
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
    },
  });

  // Add note mutation
  const addNote = useMutation({
    mutationFn: async ({ title, content }: { title: string; content?: string }) => {
      if (!team || !student) throw new Error('No team or not logged in');

      const { data, error } = await supabase
        .from('team_notes')
        .insert({
          team_id: team.id,
          title,
          content,
          created_by: student.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-notes'] });
    },
  });

  // Delete note mutation
  const deleteNote = useMutation({
    mutationFn: async (noteId: string) => {
      const { error } = await supabase
        .from('team_notes')
        .delete()
        .eq('id', noteId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-notes'] });
    },
  });

  // Leave team mutation
  const leaveTeam = useMutation({
    mutationFn: async () => {
      if (!team || !student) throw new Error('No team');

      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('team_id', team.id)
        .eq('student_id', student.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-membership'] });
    },
  });

  return {
    team,
    hasTeam,
    membership,
    members: members || [],
    notes: notes || [],
    memberProgress: memberProgress || [],
    isLoading: isLoadingMembership || isLoadingMembers || isLoadingNotes,
    isLoadingMembership,
    createTeam,
    joinTeam,
    addNote,
    deleteNote,
    leaveTeam,
    isLeader: membership?.role === 'leader',
  };
}
