import { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useStudent } from "@/hooks/useStudent";
import { useStudentPricingTier } from "@/hooks/useStudentPricingTier";
import { useDemoMode } from "@/contexts/DemoContext";
import { toast } from "sonner";
import {
  DEMO_STREAK,
  DEMO_SPRINT_ACCESS,
  DEMO_TRACK_PROGRESS,
  DEMO_INDUSTRY_TRACKS,
  DEMO_RECENT_ATTEMPTS,
  DEMO_DAILY_CHALLENGE,
} from "@/data/demoData";

export interface IndustryTrack {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  color_theme: string;
  skill_focus_areas: string[];
  target_age_range?: string;
  is_active?: boolean;
}

export interface MCOption {
  id: string;
  text: string;
  reasoning_prompt?: string;
}

export interface RoleMetadata {
  role_title: string;
  role_description: string;
  role_emoji: string;
  typical_decisions: string[];
}

export interface Challenge {
  id: string;
  title: string;
  scenario: string;
  question: string;
  success_criteria: string[];
  category: 'decision' | 'scenario' | 'thought';
  pillar?: 'discover' | 'design' | 'build' | 'explore';
  difficulty_level: 'easy' | 'medium' | 'hard';
  estimated_minutes: number;
  age_range: string;
  skills_developed: string[];
  xp_reward: number;
  industry_track_id?: string;
  real_world_context?: {
    fun_facts?: string[];
    career_connections?: string[];
    company_examples?: string[];
    did_you_know?: string;
  };
  track?: IndustryTrack;
  // Multiple choice support
  response_type?: 'freeform' | 'multiple_choice' | 'hybrid';
  response_options?: { options: MCOption[] } | null;
  // Role-based simulations
  role_type?: 'CEO' | 'CMO' | 'CFO' | 'CTO' | 'COO' | null;
  role_metadata?: RoleMetadata | null;
}

export interface ChallengeAttempt {
  id: string;
  challenge_id: string;
  response: string;
  score: number | null;
  ai_feedback: string | null;
  skills_awarded: string[];
  xp_earned: number;
  time_spent_seconds: number | null;
  completed_at: string;
  archetype?: string;
  role_feedback?: string;
  challenge?: Challenge;
}

export interface StudentStreak {
  current_streak: number;
  longest_streak: number;
  last_challenge_date: string | null;
  total_challenges_completed: number;
  total_xp_earned: number;
  streak_freezes_available: number;
}

export interface TrackProgress {
  track_id: string;
  challenges_completed: number;
  discover_completed: number;
  design_completed: number;
  build_completed: number;
  explore_completed: number;
  total_xp: number;
}

interface StructuredFeedback {
  praise: string;
  insight: string;
  next_challenge: string;
}

interface EvaluationResult {
  success: boolean;
  attempt: {
    id: string;
    score: number;
    feedback: StructuredFeedback | string;
    skills_awarded: string[];
    xp_earned: number;
    archetype?: string;
    roleFeedback?: string;
  };
  streak: StudentStreak;
  challenge?: {
    xp_reward: number;
  };
}

export interface SprintAccess {
  hasAccess: boolean;
  isUnlimited: boolean;
  sprintsRemaining: number;
  sprintsUsedThisMonth: number;
  monthlyLimit: number;
}

export function useSprints() {
  const { student } = useStudent();
  const { tier, isLoading: tierLoading } = useStudentPricingTier();
  const { isDemoMode } = useDemoMode();
  const [loading, setLoading] = useState(!isDemoMode);
  const [dailyChallenge, setDailyChallenge] = useState<Challenge | null>(isDemoMode ? DEMO_DAILY_CHALLENGE as Challenge : null);
  const [bonusChallenge, setBonusChallenge] = useState<Challenge | null>(null);
  const [todayCompleted, setTodayCompleted] = useState(false);
  const [streak, setStreak] = useState<StudentStreak | null>(isDemoMode ? DEMO_STREAK as StudentStreak : null);
  const [recentAttempts, setRecentAttempts] = useState<ChallengeAttempt[]>(isDemoMode ? DEMO_RECENT_ATTEMPTS as ChallengeAttempt[] : []);
  const [submitting, setSubmitting] = useState(false);
  const [monthlyAttemptCount, setMonthlyAttemptCount] = useState(isDemoMode ? 15 : 0);
  const [industryTracks, setIndustryTracks] = useState<IndustryTrack[]>(isDemoMode ? DEMO_INDUSTRY_TRACKS as IndustryTrack[] : []);
  const [studentTrackInterests, setStudentTrackInterests] = useState<string[]>(isDemoMode ? [DEMO_INDUSTRY_TRACKS[0].id] : []);
  const [trackProgress, setTrackProgress] = useState<TrackProgress[]>(isDemoMode ? DEMO_TRACK_PROGRESS as TrackProgress[] : []);
  const [hasSelectedTracks, setHasSelectedTracks] = useState(isDemoMode);

  // Calculate sprint access based on tier
  const sprintAccess = useMemo((): SprintAccess => {
    if (isDemoMode) {
      return DEMO_SPRINT_ACCESS as SprintAccess;
    }
    const sprintDaily = tier?.features?.sprint_daily ?? 0;
    const isUnlimited = sprintDaily === -1;
    const monthlyLimit = isUnlimited ? Infinity : sprintDaily;
    const sprintsRemaining = isUnlimited ? Infinity : Math.max(0, monthlyLimit - monthlyAttemptCount);
    
    return {
      hasAccess: sprintDaily !== 0,
      isUnlimited,
      sprintsRemaining,
      sprintsUsedThisMonth: monthlyAttemptCount,
      monthlyLimit: isUnlimited ? -1 : monthlyLimit,
    };
  }, [tier, monthlyAttemptCount, isDemoMode]);

  const fetchIndustryTracks = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('industry_tracks')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (error) throw error;
      
      // Map database columns to our interface, ensuring skill_focus_areas is always an array
      const mappedTracks: IndustryTrack[] = (data || []).map(t => ({
        id: t.id,
        name: t.name,
        slug: t.slug,
        icon: t.icon,
        description: t.description,
        color_theme: t.color_theme,
        skill_focus_areas: (t.skill_focus_areas as string[]) || [],
        target_age_range: t.target_age_range || undefined,
        is_active: t.is_active ?? true,
      }));
      setIndustryTracks(mappedTracks);
    } catch (error) {
      console.error('Error fetching industry tracks:', error);
    }
  }, []);

  const fetchStudentTrackInterests = useCallback(async () => {
    if (!student) return;

    try {
      const { data, error } = await supabase
        .from('student_track_interests')
        .select('track_id')
        .eq('student_id', student.id);

      if (error) throw error;
      const trackIds = (data || []).map(d => d.track_id);
      setStudentTrackInterests(trackIds);
      setHasSelectedTracks(trackIds.length > 0);
    } catch (error) {
      console.error('Error fetching track interests:', error);
    }
  }, [student]);

  const fetchTrackProgress = useCallback(async () => {
    if (!student) return;

    try {
      const { data, error } = await supabase
        .from('student_track_progress')
        .select('*')
        .eq('student_id', student.id);

      if (error) throw error;
      
      // Map database columns to our interface
      const mappedProgress: TrackProgress[] = (data || []).map(p => ({
        track_id: p.track_id,
        challenges_completed: p.challenges_completed,
        discover_completed: p.discover_completed,
        design_completed: p.design_completed,
        build_completed: p.build_completed,
        explore_completed: p.explore_completed,
        total_xp: p.total_xp,
      }));
      setTrackProgress(mappedProgress);
    } catch (error) {
      console.error('Error fetching track progress:', error);
    }
  }, [student]);

  const saveTrackInterests = async (trackIds: string[]) => {
    if (!student) return false;

    try {
      // Delete existing interests
      await supabase
        .from('student_track_interests')
        .delete()
        .eq('student_id', student.id);

      // Insert new interests
      if (trackIds.length > 0) {
        const { error } = await supabase
          .from('student_track_interests')
          .insert(trackIds.map(trackId => ({
            student_id: student.id,
            track_id: trackId,
          })));

        if (error) throw error;
      }

      setStudentTrackInterests(trackIds);
      setHasSelectedTracks(trackIds.length > 0);
      toast.success('Interests saved!');
      return true;
    } catch (error) {
      console.error('Error saving track interests:', error);
      toast.error('Failed to save interests');
      return false;
    }
  };

  const fetchMonthlyAttemptCount = useCallback(async () => {
    if (!student) return;

    try {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
      
      const { count, error } = await supabase
        .from('challenge_attempts')
        .select('*', { count: 'exact', head: true })
        .eq('student_id', student.id)
        .gte('completed_at', startOfMonth);

      if (error) throw error;
      setMonthlyAttemptCount(count || 0);
    } catch (error) {
      console.error('Error fetching monthly attempt count:', error);
    }
  }, [student]);

  const fetchDailyChallenge = useCallback(async () => {
    if (!student) return;

    try {
      // Check if already completed today
      const today = new Date().toISOString().split('T')[0];
      const { data: todayAttempts } = await supabase
        .from('challenge_attempts')
        .select('id, challenge_id')
        .eq('student_id', student.id)
        .gte('completed_at', `${today}T00:00:00`)
        .lte('completed_at', `${today}T23:59:59`);

      if (todayAttempts && todayAttempts.length > 0) {
        setTodayCompleted(true);
        const { data: completedChallenge } = await supabase
          .from('challenges')
          .select('*, track:industry_tracks(*)')
          .eq('id', todayAttempts[0].challenge_id)
          .single();
        
        if (completedChallenge) {
          setDailyChallenge(completedChallenge as unknown as Challenge);
        }
        return;
      }

      setTodayCompleted(false);

      // Get all completed challenge IDs
      const { data: completedAttempts } = await supabase
        .from('challenge_attempts')
        .select('challenge_id')
        .eq('student_id', student.id);

      const completedIds = completedAttempts?.map(a => a.challenge_id) || [];

      // Build base query
      let query = supabase
        .from('challenges')
        .select('*, track:industry_tracks(*)')
        .eq('is_active', true)
        .eq('is_daily_eligible', true);

      if (completedIds.length > 0) {
        query = query.not('id', 'in', `(${completedIds.join(',')})`);
      }

      // Try to get challenges from selected tracks first (if any)
      if (studentTrackInterests.length > 0) {
        const { data: trackChallenges, error } = await query
          .in('industry_track_id', studentTrackInterests);

        if (!error && trackChallenges && trackChallenges.length > 0) {
          const randomIndex = Math.floor(Math.random() * trackChallenges.length);
          setDailyChallenge(trackChallenges[randomIndex] as unknown as Challenge);
          return;
        }
      }

      // No track selection or no challenges in selected tracks - get ANY challenge
      // This is the key change: no gating, just pick a random challenge
      const { data: allChallenges, error } = await supabase
        .from('challenges')
        .select('*, track:industry_tracks(*)')
        .eq('is_active', true)
        .eq('is_daily_eligible', true)
        .not('id', 'in', completedIds.length > 0 ? `(${completedIds.join(',')})` : '(00000000-0000-0000-0000-000000000000)');

      if (error) throw error;

      if (allChallenges && allChallenges.length > 0) {
        const randomIndex = Math.floor(Math.random() * allChallenges.length);
        setDailyChallenge(allChallenges[randomIndex] as unknown as Challenge);
      }
    } catch (error) {
      console.error('Error fetching daily challenge:', error);
    }
  }, [student, studentTrackInterests]);

  const fetchStreak = useCallback(async () => {
    if (!student) return;

    try {
      const { data, error } = await supabase
        .from('student_streaks')
        .select('*')
        .eq('student_id', student.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setStreak(data as StudentStreak);
      } else {
        setStreak({
          current_streak: 0,
          longest_streak: 0,
          last_challenge_date: null,
          total_challenges_completed: 0,
          total_xp_earned: 0,
          streak_freezes_available: 1,
        });
      }
    } catch (error) {
      console.error('Error fetching streak:', error);
    }
  }, [student]);

  const fetchRecentAttempts = useCallback(async () => {
    if (!student) return;

    try {
      const { data, error } = await supabase
        .from('challenge_attempts')
        .select(`*, challenge:challenges(*, track:industry_tracks(*))`)
        .eq('student_id', student.id)
        .order('completed_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setRecentAttempts((data || []) as unknown as ChallengeAttempt[]);
    } catch (error) {
      console.error('Error fetching recent attempts:', error);
    }
  }, [student]);

  // Fetch a random bonus challenge (different from recent ones)
  const fetchBonusChallenge = useCallback(async () => {
    if (!student) return null;

    try {
      // Get recent challenge IDs to exclude
      const recentIds = recentAttempts.map(a => a.challenge_id);
      
      // Build query for active challenges, excluding recent ones
      let query = supabase
        .from('challenges')
        .select('*, track:industry_tracks(*)')
        .eq('is_active', true);

      if (recentIds.length > 0) {
        query = query.not('id', 'in', `(${recentIds.join(',')})`);
      }

      // Prefer challenges from selected tracks
      if (studentTrackInterests.length > 0) {
        const { data: trackChallenges, error } = await query
          .in('industry_track_id', studentTrackInterests)
          .limit(20);

        if (!error && trackChallenges && trackChallenges.length > 0) {
          const randomIndex = Math.floor(Math.random() * trackChallenges.length);
          const challenge = trackChallenges[randomIndex] as unknown as Challenge;
          setBonusChallenge(challenge);
          return challenge;
        }
      }

      // Fallback to any challenge
      const { data: allChallenges, error } = await supabase
        .from('challenges')
        .select('*, track:industry_tracks(*)')
        .eq('is_active', true)
        .not('id', 'in', recentIds.length > 0 ? `(${recentIds.join(',')})` : '(00000000-0000-0000-0000-000000000000)')
        .limit(20);

      if (error) throw error;

      if (allChallenges && allChallenges.length > 0) {
        const randomIndex = Math.floor(Math.random() * allChallenges.length);
        const challenge = allChallenges[randomIndex] as unknown as Challenge;
        setBonusChallenge(challenge);
        return challenge;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching bonus challenge:', error);
      return null;
    }
  }, [student, recentAttempts, studentTrackInterests]);

  const submitResponse = async (
    challengeId: string,
    response: string,
    timeSpentSeconds?: number,
    isBonus: boolean = false
  ): Promise<EvaluationResult | null> => {
    if (!student) {
      toast.error('Please log in to submit');
      return null;
    }

    // Check access (demo mode returns early in the hook, so this only runs for real users)
    if (!sprintAccess.hasAccess) {
      toast.error('Your plan does not include Daily Sprints. Upgrade to unlock!');
      return null;
    }

    if (!sprintAccess.isUnlimited && sprintAccess.sprintsRemaining <= 0) {
      toast.error(`You've used all ${sprintAccess.monthlyLimit} sprints this month. Upgrade to FULL FOUNDATION for unlimited access!`);
      return null;
    }

    setSubmitting(true);

    // Create timeout promise (45 seconds)
    const TIMEOUT_MS = 45000;
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('TIMEOUT')), TIMEOUT_MS);
    });

    try {
      // Race between the actual request and the timeout
      const result = await Promise.race([
        supabase.functions.invoke('evaluate-sprint-response', {
          body: {
            challengeId,
            studentId: student.id,
            response,
            timeSpentSeconds,
          },
        }),
        timeoutPromise,
      ]);

      const { data, error } = result as { data: any; error: any };

      if (error) {
        // Handle FunctionsHttpError with status codes
        const status = (error as any)?.status;
        if (status === 429) {
          toast.error('Our AI mentor is busy!', {
            description: 'Please wait a moment and try again.',
            duration: 5000,
          });
          return null;
        }
        if (status === 402) {
          toast.error('AI evaluation is temporarily unavailable.', {
            description: 'Please try again later.',
            duration: 5000,
          });
          return null;
        }
        throw error;
      }

      // Check for error responses in data (edge function returned error JSON)
      if (data?.error) {
        if (data.error === 'rate_limit') {
          toast.error('Our AI mentor is busy!', {
            description: data.message || 'Please wait a moment and try again.',
            duration: 5000,
          });
          return null;
        }
        if (data.error === 'credits_depleted') {
          toast.error('AI evaluation is temporarily unavailable.', {
            description: data.message || 'Please try again later.',
            duration: 5000,
          });
          return null;
        }
        throw new Error(data.message || data.error || 'Failed to evaluate response');
      }

      if (data.success) {
        if (!isBonus) {
          setTodayCompleted(true);
        }
        setStreak(data.streak);
        setMonthlyAttemptCount(prev => prev + 1);
        await fetchRecentAttempts();
        await fetchTrackProgress();
        return data as EvaluationResult;
      } else {
        throw new Error(data.error || 'Failed to evaluate response');
      }
    } catch (error: any) {
      console.error('Error submitting response:', error);
      if (error?.message === 'TIMEOUT') {
        toast.error('Response is taking too long. Please try again.', {
          description: 'If this keeps happening, try a shorter response or check your connection.',
          duration: 6000,
        });
      } else {
        toast.error('Failed to submit your response. Please try again.');
      }
      return null;
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (isDemoMode) return;
    fetchIndustryTracks();
  }, [fetchIndustryTracks, isDemoMode]);

  useEffect(() => {
    if (isDemoMode) return;
    
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchStudentTrackInterests(),
        fetchTrackProgress(),
        fetchStreak(),
        fetchRecentAttempts(),
        fetchMonthlyAttemptCount(),
      ]);
      setLoading(false);
    };

    if (student && !tierLoading) {
      loadData();
    } else if (!student && !tierLoading) {
      setLoading(false);
    }
  }, [student, tierLoading, isDemoMode, fetchStudentTrackInterests, fetchTrackProgress, fetchStreak, fetchRecentAttempts, fetchMonthlyAttemptCount]);

  // Fetch daily challenge immediately - no track gate required
  useEffect(() => {
    if (isDemoMode) return;
    if (student && !tierLoading) {
      fetchDailyChallenge();
    }
  }, [student, tierLoading, isDemoMode, fetchDailyChallenge]);

  return {
    loading,
    dailyChallenge,
    bonusChallenge,
    todayCompleted,
    streak,
    recentAttempts,
    submitting,
    submitResponse,
    refreshChallenge: fetchDailyChallenge,
    fetchBonusChallenge,
    sprintAccess,
    industryTracks,
    studentTrackInterests,
    trackProgress,
    hasSelectedTracks,
    saveTrackInterests,
  };
}