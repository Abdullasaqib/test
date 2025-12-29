import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Lightbulb, 
  Users, 
  Code, 
  Rocket, 
  Presentation
} from "lucide-react";

interface JourneyProgressProps {
  currentWeek: number;
  totalWeeks?: number;
  completedMissions: number;
  totalMissions: number;
}

const PHASES = [
  { name: "Discovery", weeks: [1, 2], icon: Lightbulb, color: "text-blue-500" },
  { name: "Validation", weeks: [3, 4], icon: Users, color: "text-purple-500" },
  { name: "Building", weeks: [5, 6, 7, 8], icon: Code, color: "text-green-500" },
  { name: "Growth", weeks: [9, 10], icon: Rocket, color: "text-orange-500" },
  { name: "Pitch", weeks: [11, 12], icon: Presentation, color: "text-red-500" },
];

export function JourneyProgress({ 
  currentWeek, 
  totalWeeks = 12, 
  completedMissions, 
  totalMissions
}: JourneyProgressProps) {
  const currentPhase = PHASES.find(p => p.weeks.includes(currentWeek)) || PHASES[0];
  const progressPercentage = Math.round((completedMissions / totalMissions) * 100);

  return (
    <div className="p-4 bg-muted/30 rounded-lg border border-border space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-foreground text-sm">Your Journey</h4>
        <Badge variant="secondary" className="text-xs">
          Week {currentWeek}/{totalWeeks}
        </Badge>
      </div>

      {/* Current Phase */}
      <div className="flex items-center gap-2">
        <div className={`p-1.5 rounded-full bg-muted ${currentPhase.color}`}>
          <currentPhase.icon className="h-4 w-4" />
        </div>
        <span className="text-sm text-foreground font-medium">{currentPhase.name}</span>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{completedMissions} missions done</span>
          <span>{progressPercentage}%</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      {/* Phase Timeline */}
      <div className="flex items-center justify-between gap-1">
        {PHASES.map((phase, i) => {
          const phaseMaxWeek = Math.max(...phase.weeks);
          const isComplete = currentWeek > phaseMaxWeek;
          const isCurrent = phase.weeks.includes(currentWeek);
          
          return (
            <div
              key={phase.name}
              className={`flex-1 h-1.5 rounded-full transition-colors ${
                isComplete 
                  ? "bg-primary" 
                  : isCurrent 
                    ? "bg-primary/50" 
                    : "bg-muted"
              }`}
              title={`${phase.name} (Weeks ${phase.weeks[0]}-${phase.weeks[phase.weeks.length - 1]})`}
            />
          );
        })}
      </div>

    </div>
  );
}