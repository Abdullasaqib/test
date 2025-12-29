import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, CheckCircle, Play, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { WeekProgress } from "@/hooks/useJourney";

interface WeekCardProps {
  week: WeekProgress;
}

export function WeekCard({ week }: WeekCardProps) {
  const isLocked = week.status === 'locked';
  const isCompleted = week.status === 'completed';
  const isCurrent = week.status === 'current' || week.status === 'in_progress';
  const progress = week.totalMissions > 0 
    ? Math.round((week.completedMissions / week.totalMissions) * 100) 
    : 0;

  return (
    <Card 
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        isLocked && "opacity-60",
        isCurrent && "ring-2 ring-primary shadow-lg",
        isCompleted && "border-green-500/30"
      )}
    >
      {/* Current week indicator */}
      {isCurrent && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/50" />
      )}
      
      {/* Completed badge */}
      {isCompleted && (
        <div className="absolute top-2 right-2">
          <div className="bg-green-500/10 text-green-500 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Done!
          </div>
        </div>
      )}

      <CardHeader className="pb-2">
        <div className="flex items-start gap-3">
          {/* Week emoji */}
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center text-2xl",
            isCompleted && "bg-green-500/10",
            isCurrent && "bg-primary/10",
            isLocked && "bg-muted"
          )}>
            {isLocked ? <Lock className="h-5 w-5 text-muted-foreground" /> : week.emoji}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className={cn(
                "text-xs font-semibold px-2 py-0.5 rounded-full",
                isCompleted && "bg-green-500/10 text-green-600",
                isCurrent && "bg-primary/10 text-primary",
                isLocked && "bg-muted text-muted-foreground"
              )}>
                Week {week.week}
              </span>
              {isCurrent && (
                <span className="text-xs text-primary font-medium flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  You're here!
                </span>
              )}
            </div>
            <h3 className={cn(
              "font-bold mt-1",
              isLocked && "text-muted-foreground"
            )}>
              {week.theme}
            </h3>
            <p className="text-sm text-muted-foreground">{week.tagline}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Progress dots */}
        <div className="flex gap-1.5 mb-3">
          {Array.from({ length: week.totalMissions }).map((_, i) => (
            <div 
              key={i}
              className={cn(
                "h-2 flex-1 rounded-full transition-colors",
                i < week.completedMissions 
                  ? isCompleted ? "bg-green-500" : "bg-primary" 
                  : "bg-muted"
              )}
            />
          ))}
        </div>

        {/* Progress text */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-muted-foreground">
            {week.completedMissions}/{week.totalMissions} missions
          </span>
          {!isLocked && (
            <span className={cn(
              "text-xs font-medium",
              isCompleted ? "text-green-500" : "text-primary"
            )}>
              {progress}%
            </span>
          )}
        </div>

        {/* Action button */}
        {isLocked ? (
          <div className="text-center py-2">
            <span className="text-xs text-muted-foreground">
              Complete Week {week.week - 1} first 🔮
            </span>
          </div>
        ) : (
          <Button 
            variant={isCurrent ? "default" : "outline"} 
            className="w-full"
            asChild
          >
            <Link to={`/dashboard/curriculum/week/${week.week}`}>
              {isCompleted ? (
                <>Look Back 👀</>
              ) : isCurrent ? (
                <><Play className="mr-2 h-4 w-4" /> Let's Go!</>
              ) : (
                <>Continue</>
              )}
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}