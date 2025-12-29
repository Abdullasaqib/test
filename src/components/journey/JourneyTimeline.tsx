import { cn } from "@/lib/utils";
import { Check, Lock, Sparkles } from "lucide-react";
import { WeekProgress } from "@/hooks/useJourney";

interface JourneyTimelineProps {
  weeks: WeekProgress[];
  currentWeek: number;
}

export function JourneyTimeline({ weeks, currentWeek }: JourneyTimelineProps) {
  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="flex items-center justify-between min-w-[600px] px-4">
        {weeks.map((week, index) => {
          const isCompleted = week.status === 'completed';
          const isCurrent = week.status === 'current' || week.status === 'in_progress';
          const isLocked = week.status === 'locked';
          
          return (
            <div key={week.week} className="flex items-center">
              {/* Week node */}
              <div className="relative flex flex-col items-center">
                {/* Current week indicator */}
                {isCurrent && (
                  <div className="absolute -top-6 text-xs font-medium text-primary flex items-center gap-1 whitespace-nowrap">
                    <Sparkles className="h-3 w-3" />
                    You're here!
                  </div>
                )}
                
                {/* Node */}
                <div 
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                    isCompleted && "bg-green-500 text-white",
                    isCurrent && "bg-primary text-primary-foreground ring-4 ring-primary/20 animate-pulse",
                    isLocked && "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : isLocked ? (
                    <Lock className="h-3 w-3" />
                  ) : (
                    week.week
                  )}
                </div>
                
                {/* Week label */}
                <span className={cn(
                  "text-xs mt-1",
                  isCurrent && "text-primary font-medium",
                  isCompleted && "text-green-500",
                  isLocked && "text-muted-foreground"
                )}>
                  {week.emoji}
                </span>
              </div>
              
              {/* Connector line */}
              {index < weeks.length - 1 && (
                <div 
                  className={cn(
                    "h-0.5 w-8 mx-1",
                    weeks[index + 1].status === 'completed' || isCompleted 
                      ? "bg-green-500" 
                      : isCurrent 
                        ? "bg-gradient-to-r from-primary to-muted" 
                        : "bg-muted"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}