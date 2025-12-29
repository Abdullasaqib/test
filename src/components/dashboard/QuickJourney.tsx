import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ChevronRight, MapPin } from "lucide-react";
import { useDemoMode } from "@/contexts/DemoContext";
import { DemoActionBlocker } from "@/components/demo/DemoActionBlocker";

interface QuickJourneyProps {
  currentWeek: number;
  totalWeeks?: number;
}

export function QuickJourney({ currentWeek, totalWeeks = 12 }: QuickJourneyProps) {
  const { isDemoMode } = useDemoMode();

  const phases = [
    { name: "Discovery", weeks: [1, 2], emoji: "🔍" },
    { name: "Validation", weeks: [3, 4], emoji: "💬" },
    { name: "Building", weeks: [5, 6, 7, 8], emoji: "🛠️" },
    { name: "Growth", weeks: [9, 10], emoji: "📈" },
    { name: "Pitch", weeks: [11, 12], emoji: "🎤" },
  ];

  const getCurrentPhase = () => {
    for (const phase of phases) {
      if (phase.weeks.includes(currentWeek)) {
        return phase;
      }
    }
    return phases[0];
  };

  const currentPhase = getCurrentPhase();

  const FullMapLink = isDemoMode ? (
    <DemoActionBlocker action="view the full curriculum map">
      <span className="text-sm text-primary hover:underline flex items-center gap-1 cursor-pointer">
        Full Map
        <ChevronRight className="h-4 w-4" />
      </span>
    </DemoActionBlocker>
  ) : (
    <Link 
      to="/dashboard/curriculum" 
      className="text-sm text-primary hover:underline flex items-center gap-1"
    >
      Full Map
      <ChevronRight className="h-4 w-4" />
    </Link>
  );

  return (
    <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
      <CardContent className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Your Journey</h3>
          </div>
          {FullMapLink}
        </div>

        {/* Week dots */}
        <div className="flex items-center justify-between gap-1 mb-4">
          {Array.from({ length: totalWeeks }, (_, i) => i + 1).map((week) => (
            <div
              key={week}
              className={`h-3 w-3 rounded-full transition-all ${
                week < currentWeek
                  ? "bg-primary"
                  : week === currentWeek
                    ? "bg-primary ring-4 ring-primary/30 scale-125"
                    : "bg-muted"
              }`}
              title={`Week ${week}`}
            />
          ))}
        </div>

        {/* Phase indicator */}
        <div className="flex items-center justify-between text-sm">
          {phases.map((phase, index) => {
            const isComplete = phase.weeks[phase.weeks.length - 1] < currentWeek;
            const isCurrent = phase === currentPhase;
            
            return (
              <div
                key={phase.name}
                className={`text-center flex-1 ${
                  isCurrent 
                    ? "text-primary font-semibold" 
                    : isComplete
                      ? "text-muted-foreground"
                      : "text-muted-foreground/50"
                }`}
              >
                <span className="text-lg">{phase.emoji}</span>
                <p className="text-xs mt-1 hidden sm:block">{phase.name}</p>
                {isCurrent && (
                  <p className="text-[10px] text-primary mt-0.5 hidden sm:block">YOU'RE HERE!</p>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
