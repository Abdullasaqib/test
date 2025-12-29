import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Star, Trophy, Search, Lightbulb, Wrench, BookOpen } from "lucide-react";

interface TrackProgressCardProps {
  track: {
    id: string;
    name: string;
    icon: string;
    color_theme: string;
  };
  progress: {
    challenges_completed: number;
    discover_completed: number;
    design_completed: number;
    build_completed: number;
    explore_completed: number;
    total_xp: number;
  };
  totalChallenges?: number;
}

const colorThemes: Record<string, { bg: string; border: string; progressBg: string }> = {
  emerald: { bg: "from-emerald-500/10 to-teal-500/10", border: "border-emerald-500/30", progressBg: "bg-emerald-500" },
  green: { bg: "from-green-500/10 to-lime-500/10", border: "border-green-500/30", progressBg: "bg-green-500" },
  pink: { bg: "from-pink-500/10 to-rose-500/10", border: "border-pink-500/30", progressBg: "bg-pink-500" },
  blue: { bg: "from-blue-500/10 to-cyan-500/10", border: "border-blue-500/30", progressBg: "bg-blue-500" },
  purple: { bg: "from-purple-500/10 to-violet-500/10", border: "border-purple-500/30", progressBg: "bg-purple-500" },
  orange: { bg: "from-orange-500/10 to-amber-500/10", border: "border-orange-500/30", progressBg: "bg-orange-500" },
};

export function TrackProgressCard({ track, progress, totalChallenges = 30 }: TrackProgressCardProps) {
  const theme = colorThemes[track.color_theme] || colorThemes.orange;
  const overallProgress = Math.min(100, (progress.challenges_completed / totalChallenges) * 100);
  const isComplete = progress.challenges_completed >= totalChallenges;

  const pillars = [
    { key: 'discover', label: 'Discover', icon: Search, count: progress.discover_completed, color: 'text-blue-400' },
    { key: 'design', label: 'Design', icon: Lightbulb, count: progress.design_completed, color: 'text-amber-400' },
    { key: 'build', label: 'Build', icon: Wrench, count: progress.build_completed, color: 'text-emerald-400' },
    { key: 'explore', label: 'Explore', icon: BookOpen, count: progress.explore_completed, color: 'text-purple-400' },
  ];

  return (
    <Card className={`bg-gradient-to-br ${theme.bg} ${theme.border}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{track.icon}</span>
            <div>
              <h3 className="font-semibold text-foreground">{track.name}</h3>
              <span className="text-xs text-muted-foreground">
                {progress.challenges_completed}/{totalChallenges} challenges
              </span>
            </div>
          </div>
          {isComplete ? (
            <Badge className="bg-yellow-500/20 text-yellow-400 gap-1">
              <Trophy className="h-3 w-3" />
              Complete
            </Badge>
          ) : (
            <div className="flex items-center gap-1 text-sm text-yellow-400">
              <Star className="h-4 w-4" />
              {progress.total_xp} XP
            </div>
          )}
        </div>

        <Progress value={overallProgress} className="h-2 mb-4" />

        <div className="grid grid-cols-4 gap-2">
          {pillars.map(({ key, label, icon: Icon, count, color }) => (
            <div key={key} className="text-center">
              <div className={`flex items-center justify-center gap-1 ${color}`}>
                <Icon className="h-3 w-3" />
                <span className="text-sm font-medium">{count}</span>
              </div>
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
