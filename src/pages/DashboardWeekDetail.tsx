import { useParams, Link, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Play, 
  CheckCircle, 
  Lock,
  Clock,
  Sparkles,
  ChevronRight,
  MessageCircle
} from "lucide-react";
import { useJourney, WeekProgress } from "@/hooks/useJourney";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardWeekDetail() {
  const { weekNumber } = useParams();
  const navigate = useNavigate();
  const { weekProgress, currentWeek, isLoading, weekThemes } = useJourney();
  
  const weekNum = parseInt(weekNumber || "1");
  const week = weekProgress.find(w => w.week === weekNum);
  const theme = weekThemes[weekNum];

  // Get encouraging progress message
  const getProgressMessage = (week: WeekProgress) => {
    const { completedMissions, totalMissions } = week;
    if (completedMissions === 0) return "Ready to start? Let's find your big idea! 💡";
    if (completedMissions === 1) return "Great start! One down, let's keep going! 🔥";
    if (completedMissions === 2) return "You're on a roll! 🎯";
    if (completedMissions === 3) return "Halfway through the week! ⚡";
    if (completedMissions === 4) return "Almost there! One more mission! 🌟";
    if (completedMissions >= totalMissions) return "WEEK COMPLETE! You crushed it! 🎉";
    return "Keep going, you've got this! 💪";
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-32 w-full" />
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!week || !theme) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Week not found</p>
          <Button variant="outline" className="mt-4" asChild>
            <Link to="/dashboard/curriculum">Back to Journey</Link>
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const isLocked = week.status === 'locked';

  return (
    <DashboardLayout currentWeek={currentWeek} totalWeeks={12}>
      <div className="space-y-6">
        {/* Back Button */}
        <Link 
          to="/dashboard/curriculum"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Journey
        </Link>

        {/* Week Header */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 via-background to-primary/5 p-6 border">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl">
              {theme.emoji}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-primary">Week {weekNum}</span>
                {week.status === 'completed' && (
                  <span className="bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full text-xs font-medium">
                    Completed! ✓
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {theme.theme}
              </h1>
              <p className="text-muted-foreground mt-1">{theme.tagline}</p>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                {week.completedMissions}/{week.totalMissions} missions
              </span>
              <span className="text-sm font-medium text-primary">
                {getProgressMessage(week)}
              </span>
            </div>
            <div className="flex gap-1.5">
              {Array.from({ length: week.totalMissions }).map((_, i) => (
                <div 
                  key={i}
                  className={cn(
                    "h-2 flex-1 rounded-full transition-colors",
                    i < week.completedMissions 
                      ? "bg-green-500" 
                      : "bg-muted"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Locked Week Message */}
        {isLocked && (
          <Card className="border-dashed">
            <CardContent className="py-8 text-center">
              <Lock className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="font-semibold text-lg mb-2">This week isn't unlocked yet</h3>
              <p className="text-muted-foreground mb-4">
                Complete Week {weekNum - 1} first to unlock this adventure! 🔮
              </p>
              <Button variant="outline" onClick={() => navigate(`/dashboard/curriculum/week/${weekNum - 1}`)}>
                Go to Week {weekNum - 1}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Daily Missions */}
        {!isLocked && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Your 5 Missions This Week
            </h2>
            
            {week.missions.map((mission, index) => {
              const isCompleted = mission.status === 'completed';
              const isInProgress = mission.status === 'in_progress';
              const isAvailable = mission.status === 'available';
              const isMissionLocked = mission.status === 'locked';
              const isFirstAvailable = isAvailable && week.missions.slice(0, index).every(m => m.status === 'completed');

              return (
                <Card 
                  key={mission.id}
                  className={cn(
                    "transition-all",
                    isFirstAvailable && "ring-2 ring-primary shadow-md",
                    isCompleted && "border-green-500/30 bg-green-500/5",
                    isMissionLocked && "opacity-60"
                  )}
                >
                  <CardContent className="py-4">
                    <div className="flex items-center gap-4">
                      {/* Day indicator */}
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0",
                        isCompleted && "bg-green-500/10 text-green-500",
                        (isAvailable || isInProgress) && "bg-primary/10 text-primary",
                        isMissionLocked && "bg-muted text-muted-foreground"
                      )}>
                        {isCompleted ? (
                          <CheckCircle className="h-6 w-6" />
                        ) : isMissionLocked ? (
                          <Lock className="h-5 w-5" />
                        ) : (
                          <>
                            <span className="text-xs font-medium">Day</span>
                            <span className="text-lg font-bold leading-none">{mission.day}</span>
                          </>
                        )}
                      </div>

                      {/* Mission info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={cn(
                            "font-semibold truncate",
                            isMissionLocked && "text-muted-foreground"
                          )}>
                            {mission.title}
                          </h3>
                          {isFirstAvailable && (
                            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0">
                              Start Here! ⭐
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {mission.estimated_minutes} min
                          </span>
                          {mission.subtitle && (
                            <span className="truncate">{mission.subtitle}</span>
                          )}
                        </div>
                      </div>

                      {/* Action */}
                      <div className="flex-shrink-0">
                        {isCompleted ? (
                          <Button variant="ghost" size="sm" asChild>
                            <Link to={`/dashboard/mission`}>
                              Review
                            </Link>
                          </Button>
                        ) : (isAvailable || isInProgress) ? (
                          <Button 
                            variant={isFirstAvailable ? "default" : "outline"} 
                            size="sm"
                            asChild
                          >
                            <Link to={`/dashboard/mission`}>
                              {isInProgress ? "Continue" : "Start"}
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                          </Button>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            🔒 Locked
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Help Card */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-primary" />
              Stuck or confused?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              No worries! Your AI Coach is here to help you through any mission.
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link to="/dashboard/coach">
                Chat with AI Coach →
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}