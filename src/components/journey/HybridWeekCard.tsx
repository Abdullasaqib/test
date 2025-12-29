import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, CheckCircle, Play, Sparkles, BookOpen, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { HybridWeekProgress } from "@/hooks/useHybridCurriculum";

interface HybridWeekCardProps {
  week: HybridWeekProgress;
}

export function HybridWeekCard({ week }: HybridWeekCardProps) {
  const isLocked = week.status === 'locked';
  const isCompleted = week.status === 'completed';
  const isCurrent = week.status === 'current' || week.status === 'in_progress';
  
  const totalItems = week.base44Lessons.length + week.totalMissions;
  const completedItems = week.completedLessons + week.completedMissions;
  const progress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  const hasLessons = week.base44Lessons.length > 0;
  const hasMissions = week.totalMissions > 0;

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
            "w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0",
            isCompleted && "bg-green-500/10",
            isCurrent && "bg-primary/10",
            isLocked && "bg-muted"
          )}>
            {isLocked ? <Lock className="h-5 w-5 text-muted-foreground" /> : week.emoji}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
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
              "font-bold mt-1 truncate",
              isLocked && "text-muted-foreground"
            )}>
              {week.theme}
            </h3>
            <p className="text-sm text-muted-foreground truncate">{week.tagline}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-3">
        {/* Content breakdown */}
        <div className="flex gap-3 text-xs">
          {hasLessons && (
            <div className={cn(
              "flex items-center gap-1.5 px-2 py-1 rounded-md",
              week.completedLessons === week.base44Lessons.length 
                ? "bg-yellow-500/10 text-yellow-600" 
                : "bg-muted text-muted-foreground"
            )}>
              <BookOpen className="h-3 w-3" />
              <span>{week.completedLessons}/{week.base44Lessons.length} Lessons</span>
            </div>
          )}
          {hasMissions && (
            <div className={cn(
              "flex items-center gap-1.5 px-2 py-1 rounded-md",
              week.completedMissions === week.totalMissions 
                ? "bg-blue-500/10 text-blue-600" 
                : "bg-muted text-muted-foreground"
            )}>
              <Wrench className="h-3 w-3" />
              <span>{week.completedMissions}/{week.totalMissions} Labs</span>
            </div>
          )}
        </div>

        {/* Combined progress bar */}
        <div className="space-y-1">
          <div className="h-2 bg-muted rounded-full overflow-hidden flex">
            {/* Lessons progress (yellow) */}
            {hasLessons && (
              <div 
                className="h-full bg-yellow-500 transition-all duration-300"
                style={{ width: `${(week.completedLessons / totalItems) * 100}%` }}
              />
            )}
            {/* Missions progress (blue/primary) */}
            {hasMissions && (
              <div 
                className={cn(
                  "h-full transition-all duration-300",
                  isCompleted ? "bg-green-500" : "bg-primary"
                )}
                style={{ width: `${(week.completedMissions / totalItems) * 100}%` }}
              />
            )}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{completedItems}/{totalItems} complete</span>
            {!isLocked && (
              <span className={cn(
                "font-medium",
                isCompleted ? "text-green-500" : "text-primary"
              )}>
                {progress}%
              </span>
            )}
          </div>
        </div>

        {/* Base44 module indicator for weeks 1-8 */}
        {hasLessons && !isLocked && (
          <div className="flex items-center gap-2 text-xs">
            <span className={cn(
              "px-2 py-0.5 rounded-full font-medium",
              week.base44Lessons[0]?.module === 'PLAN' 
                ? "bg-emerald-500/10 text-emerald-600" 
                : "bg-purple-500/10 text-purple-600"
            )}>
              Base44 {week.base44Lessons[0]?.module} Module
            </span>
          </div>
        )}

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
