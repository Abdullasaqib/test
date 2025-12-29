import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export interface TankLevel {
  level: number;
  name: string;
  minXP: number;
  maxXP: number;
  emoji: string;
  color: string;
}

export const TANK_LEVELS: TankLevel[] = [
  { level: 1, name: "Nervous Founder", minXP: 0, maxXP: 150, emoji: "😰", color: "bg-slate-500" },
  { level: 2, name: "Warming Up", minXP: 150, maxXP: 400, emoji: "🙂", color: "bg-blue-500" },
  { level: 3, name: "Confident Closer", minXP: 400, maxXP: 800, emoji: "😎", color: "bg-purple-500" },
  { level: 4, name: "Deal Maker", minXP: 800, maxXP: 1500, emoji: "🤝", color: "bg-amber-500" },
  { level: 5, name: "Shark Tamer", minXP: 1500, maxXP: Infinity, emoji: "🦈", color: "bg-primary" },
];

export function getLevelFromXP(xp: number): TankLevel {
  for (let i = TANK_LEVELS.length - 1; i >= 0; i--) {
    if (xp >= TANK_LEVELS[i].minXP) {
      return TANK_LEVELS[i];
    }
  }
  return TANK_LEVELS[0];
}

export function getXPProgress(xp: number): { current: number; needed: number; percentage: number } {
  const level = getLevelFromXP(xp);
  const nextLevel = TANK_LEVELS.find(l => l.level === level.level + 1);
  
  if (!nextLevel) {
    return { current: xp - level.minXP, needed: 0, percentage: 100 };
  }
  
  const current = xp - level.minXP;
  const needed = nextLevel.minXP - level.minXP;
  const percentage = (current / needed) * 100;
  
  return { current, needed, percentage };
}

interface TankLevelBadgeProps {
  xp: number;
  showProgress?: boolean;
  size?: "sm" | "md" | "lg";
}

export function TankLevelBadge({ xp, showProgress = false, size = "md" }: TankLevelBadgeProps) {
  const level = getLevelFromXP(xp);
  const progress = getXPProgress(xp);
  
  const sizeClasses = {
    sm: "text-xs py-0.5 px-2",
    md: "text-sm py-1 px-3",
    lg: "text-base py-1.5 px-4",
  };

  return (
    <div className={cn("space-y-2", size === "lg" && "space-y-3")}>
      <div className="flex items-center gap-2">
        <span className={cn(
          "text-xl",
          size === "sm" && "text-base",
          size === "lg" && "text-3xl"
        )}>
          {level.emoji}
        </span>
        <Badge className={cn(level.color, "text-white", sizeClasses[size])}>
          Level {level.level}: {level.name}
        </Badge>
      </div>
      
      {showProgress && progress.needed > 0 && (
        <div className="space-y-1">
          <Progress value={progress.percentage} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {progress.current} / {progress.needed} XP to next level
          </p>
        </div>
      )}
    </div>
  );
}
