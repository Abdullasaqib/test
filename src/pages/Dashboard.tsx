import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useStudent } from "@/hooks/useStudent";
import { useMission } from "@/hooks/useMission";
import { useSkills } from "@/hooks/useSkills";
import { useTank } from "@/hooks/useTank";
import { useCertificationProgress } from "@/hooks/useCertificationProgress";
import { useStudentPricingTier } from "@/hooks/useStudentPricingTier";
import { supabase } from "@/integrations/supabase/client";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { HeroWelcome } from "@/components/dashboard/HeroWelcome";
import { NextStepCard } from "@/components/dashboard/NextStepCard";
import { TankCard } from "@/components/dashboard/TankCard";
import { SkillsRadar } from "@/components/dashboard/SkillsRadar";
import { CertificationProgressCard } from "@/components/dashboard/CertificationProgressCard";
import { UpcomingClassCard } from "@/components/dashboard/UpcomingClassCard";
import { SprintCard } from "@/components/dashboard/SprintCard";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { student, loading: studentLoading } = useStudent();
  const { completedCount, currentMission } = useMission();
  const { totalPoints } = useSkills();
  const { pitchTotalXP, pitchLevel, pitchAttempts } = useTank();
  const { getProgress } = useCertificationProgress();
  const { tier, canAccess } = useStudentPricingTier();

  // Redirect to profile completion if demographics are missing (only if onboarding is complete)
  useEffect(() => {
    if (!studentLoading && student?.onboarding_completed && (!student.country || !student.grade)) {
      navigate("/dashboard/profile-complete", { replace: true });
    }
  }, [student, studentLoading, navigate]);

  // Real-time subscriptions for dashboard data
  useEffect(() => {
    if (!student?.id) return;

    const channel = supabase
      .channel('student-dashboard-realtime')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'student_missions', filter: `student_id=eq.${student.id}` },
        () => {
          queryClient.invalidateQueries({ queryKey: ['current-mission'] });
          queryClient.invalidateQueries({ queryKey: ['all-student-missions'] });
        }
      )
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'skill_scores', filter: `student_id=eq.${student.id}` },
        () => {
          queryClient.invalidateQueries({ queryKey: ['skill-scores'] });
        }
      )
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'pitch_attempts', filter: `student_id=eq.${student.id}` },
        () => {
          queryClient.invalidateQueries({ queryKey: ['pitch-attempts'] });
        }
      )
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'certification_progress', filter: `student_id=eq.${student.id}` },
        () => {
          queryClient.invalidateQueries({ queryKey: ['certification-progress'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [student?.id, queryClient]);

  const firstName = student?.full_name?.split(" ")[0] ||
    user?.user_metadata?.full_name?.split(" ")[0] ||
    "Builder";

  const currentWeek = currentMission?.week || 1;
  const totalWeeks = 12;

  // Get last pitch score if available
  const lastPitchScore = pitchAttempts?.[0]?.score;

  // Certification status - use AI Foundations cert ID
  // ID for: Prompt Engineering Fundamentals (AI Foundations)
  const AI_FOUNDATIONS_ID = "761a157d-a1e0-4423-99b8-a58f5ddad129";
  const aiFoundationsProgress = getProgress(AI_FOUNDATIONS_ID);

  const isEnrolled = aiFoundationsProgress?.isEnrolled || false;
  const isCompleted = aiFoundationsProgress?.isCompleted || false;
  const lessonsCompleted = aiFoundationsProgress?.completedLessons || 0;
  const totalLessons = 10; // AI Foundations has 10 lessons mapped in certification_lessons

  // Get tier display name
  const getTierBadge = () => {
    if (!tier) return null;
    if (tier.slug === 'live-cohort') return { name: 'ACCELERATOR', color: 'bg-amber-500/20 text-amber-600 border-amber-500/30' };
    if (tier.slug === 'yearly-founder') return { name: 'FULL FOUNDATION', color: 'bg-primary/20 text-primary border-primary/30' };
    if (tier.slug === 'revolution-start') return { name: 'FIRST STEP', color: 'bg-green-500/20 text-green-600 border-green-500/30' };
    return null;
  };

  const tierBadge = getTierBadge();
  const hasLiveClasses = canAccess('live_classes');

  // Progressive feature reveal
  const showTank = currentWeek >= 2 || pitchTotalXP > 0;
  const showSkills = totalPoints > 0;

  return (
    <DashboardLayout currentWeek={currentWeek} totalWeeks={totalWeeks}>
      <div className="space-y-6">
        {/* Simplified Hero Welcome */}
        <HeroWelcome
          firstName={firstName}
          tierBadge={tierBadge}
        />

        {/* Primary Action Card - THE main focus */}
        <NextStepCard
          isEnrolled={isEnrolled}
          isCompleted={isCompleted}
          lessonsCompleted={lessonsCompleted}
          totalLessons={totalLessons}
          currentMission={currentMission}
          completedCount={completedCount}
        />

        {/* Daily Sprint Challenge - Engagement driver */}
        <SprintCard />

        {/* Upcoming Live Class Card - ACCELERATOR only */}
        {hasLiveClasses && <UpcomingClassCard />}

        {/* Progress Row: Certification + Tank (if unlocked) + Skills (if earned) */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Certification Progress - Always show */}
          <CertificationProgressCard
            lessonsCompleted={lessonsCompleted}
            totalLessons={totalLessons}
            isEnrolled={isEnrolled}
            isCompleted={isCompleted}
          />

          {/* THE TANK - Show from Week 2+ or if has XP */}
          {showTank && (
            <TankCard
              founderLevel={pitchLevel}
              totalXP={pitchTotalXP}
              lastScore={lastPitchScore}
            />
          )}

          {/* Skills - Show only if they've earned skills */}
          {showSkills && <SkillsRadar />}
        </div>

        {/* Simple Help Card */}
        <Card className="border-muted">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-foreground">Need help?</p>
                <p className="text-sm text-muted-foreground">Chat with your AI Coach anytime</p>
              </div>
            </div>
            <Link
              to="/dashboard/coach"
              className="flex items-center gap-1 text-sm text-primary font-medium hover:underline"
            >
              Open Coach
              <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
