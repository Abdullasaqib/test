import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, Target, Trophy, AlertCircle, RefreshCw, BookOpen, Wrench } from "lucide-react";
import { useHybridCurriculum } from "@/hooks/useHybridCurriculum";
import { HybridWeekCard, JourneyTimeline } from "@/components/journey";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function DashboardCurriculum() {
  const navigate = useNavigate();
  const {
    weekProgress,
    currentWeek,
    totalCompletedMissions,
    totalMissions,
    totalCompletedLessons,
    totalLessons,
    overallProgress,
    isLoading
  } = useHybridCurriculum();
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setLoadingTimeout(true), 10000);
      return () => clearTimeout(timer);
    } else {
      setLoadingTimeout(false);
    }
  }, [isLoading]);

  // Get encouraging message based on progress
  const getEncouragingMessage = () => {
    if (totalCompletedMissions + totalCompletedLessons === 0) {
      return "Ready to start your adventure? Your first lesson is waiting! 🌟";
    }
    if (overallProgress < 25) {
      return "Great start! You're building the foundation of something amazing! 💪";
    }
    if (overallProgress < 50) {
      return "You're crushing it! Keep that momentum going! 🔥";
    }
    if (overallProgress < 75) {
      return "More than halfway there! Your startup is taking shape! 🚀";
    }
    if (overallProgress < 100) {
      return "The finish line is in sight! You're almost a real founder! ⭐";
    }
    return "YOU DID IT! You've completed the entire journey! 🏆";
  };

  // Get phase based on current week
  const getPhase = () => {
    if (currentWeek <= 4) return { name: "PLAN Module", emoji: "📋", color: "text-emerald-500" };
    if (currentWeek <= 8) return { name: "PROMPT Module", emoji: "🎯", color: "text-purple-500" };
    return { name: "Launch Phase", emoji: "🚀", color: "text-primary" };
  };

  const phase = getPhase();

  // Show timeout message if loading takes too long
  if (isLoading && loadingTimeout) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Taking longer than expected...</h3>
          <p className="text-muted-foreground mb-4">
            Please make sure you're logged in and have a student profile set up.
          </p>
          <Button onClick={() => navigate(0)} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Page
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-16 w-full" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-48" />
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-accent/10 via-background to-accent/5 p-6 border border-accent/20">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Rocket className="h-6 w-6 text-accent" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  AI Builder Certificate
                </h1>
                <p className="text-sm text-accent font-medium">Base44 PLAN + PROMPT Curriculum</p>
              </div>
            </div>
            <p className="text-muted-foreground max-w-xl mt-2">
              {getEncouragingMessage()}
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-3 mt-4">
              <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm rounded-lg px-3 py-2">
                <Target className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Week {currentWeek} of 12</span>
              </div>
              <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm rounded-lg px-3 py-2">
                <BookOpen className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">{totalCompletedLessons}/{totalLessons} lessons</span>
              </div>
              <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm rounded-lg px-3 py-2">
                <Wrench className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">{totalCompletedMissions}/{totalMissions} labs</span>
              </div>
              <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm rounded-lg px-3 py-2">
                <Trophy className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">{overallProgress}% complete</span>
              </div>
            </div>
          </div>

          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
        </div>

        {/* Curriculum Structure Explainer */}
        <Card className="border-dashed">
          <CardContent className="pt-4 pb-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span><strong>Lessons:</strong> Base44 structured learning</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span><strong>Labs:</strong> Hands-on practice missions</span>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <span className={phase.color}>{phase.emoji} {phase.name}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Journey Timeline */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-sm font-medium text-muted-foreground mb-4 text-center">
              Your 12-Week Adventure
            </h2>
            <JourneyTimeline weeks={weekProgress as any} currentWeek={currentWeek} />
          </CardContent>
        </Card>

        {/* Week Cards Grid */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            {currentWeek <= 4 ? "📋 PLAN Module (Weeks 1-4)" :
              currentWeek <= 8 ? "🎯 PROMPT Module (Weeks 5-8)" :
                "🚀 Launch Phase (Weeks 9-12)"}
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {weekProgress.map((week) => (
              <HybridWeekCard
                key={week.week}
                week={week}
                isActiveWeek={week.week === currentWeek}
              />
            ))}
          </div>
        </div>

        {/* Encouragement footer */}
        <div className="text-center py-6">
          <p className="text-sm text-muted-foreground">
            Every great founder started exactly where you are. <br />
            <span className="text-primary font-medium">You've got this! 👊</span>
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
