import { TrendingUp, TrendingDown, Minus, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SkillData {
  category: string;
  name: string;
  icon: string;
  color: string;
  score: number;
  momentum: 'rising' | 'stable' | 'declining';
  momentumChange: number;
  level: string;
  isSignature: boolean;
}

interface SkillHeatmapProps {
  data: SkillData[];
}

const levelColors: Record<string, string> = {
  emerging: 'bg-muted text-muted-foreground',
  developing: 'bg-blue-500/20 text-blue-500',
  proficient: 'bg-green-500/20 text-green-500',
  advanced: 'bg-primary/20 text-primary',
};

export function SkillHeatmap({ data }: SkillHeatmapProps) {
  const getMomentumIcon = (momentum: string, change: number) => {
    if (momentum === 'rising') {
      return <TrendingUp className="w-4 h-4 text-green-500" />;
    } else if (momentum === 'declining') {
      return <TrendingDown className="w-4 h-4 text-red-500" />;
    }
    return <Minus className="w-4 h-4 text-muted-foreground" />;
  };

  const getMomentumText = (momentum: string, change: number) => {
    if (momentum === 'rising') {
      return <span className="text-green-500">+{change}%</span>;
    } else if (momentum === 'declining') {
      return <span className="text-red-500">{change}%</span>;
    }
    return <span className="text-muted-foreground">stable</span>;
  };

  return (
    <div className="space-y-4">
      {data.map((skill) => (
        <div key={skill.category} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">{skill.icon}</span>
              <span className="font-medium">{skill.name}</span>
              {skill.isSignature && (
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              )}
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className={cn("text-xs", levelColors[skill.level])}>
                {skill.level}
              </Badge>
              <div className="flex items-center gap-1 min-w-[60px] justify-end">
                {getMomentumIcon(skill.momentum, skill.momentumChange)}
                <span className="text-sm">
                  {getMomentumText(skill.momentum, skill.momentumChange)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Progress 
              value={skill.score} 
              className="h-2 flex-1"
            />
            <span className="text-sm font-semibold min-w-[40px] text-right">
              {skill.score}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
