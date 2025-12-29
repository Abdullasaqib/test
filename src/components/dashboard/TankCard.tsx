import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Waves, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { useDemoMode } from "@/contexts/DemoContext";

interface TankCardProps {
  founderLevel?: string;
  totalXP?: number;
  lastScore?: number;
}

export function TankCard({ founderLevel = "Nervous Founder", totalXP = 0, lastScore }: TankCardProps) {
  const { isDemoMode } = useDemoMode();
  
  // Calculate progress to next level
  const levelThresholds = [0, 100, 300, 600, 1000, 1500];
  const levels = ["Nervous Founder", "Confident Closer", "Prepared Founder", "Experienced Pitcher", "Seasoned Founder", "Shark Tamer"];
  
  const currentLevelIndex = levels.indexOf(founderLevel);
  const nextLevelXP = levelThresholds[currentLevelIndex + 1] || levelThresholds[levelThresholds.length - 1];
  const currentLevelXP = levelThresholds[currentLevelIndex] || 0;
  const progressToNext = Math.min(100, Math.round(((totalXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100));

  const getMotivation = () => {
    if (totalXP === 0) return "Pitch what the world doesn't know it needs yet 🦈";
    if (lastScore && lastScore >= 85) return "You're pitching like a founder who changed everything! 🔥";
    if (lastScore && lastScore >= 70) return "Getting closer to that breakthrough pitch!";
    return "Every great founder practiced. Keep going!";
  };

  // Use demo route when in demo mode
  const tankRoute = isDemoMode ? "/demo/tank" : "/dashboard/tank";

  return (
    <Card className="overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-background to-purple-500/5 shadow-lg shadow-primary/5">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-primary/90 to-purple-600 px-4 md:px-5 py-2.5 md:py-3">
        <div className="flex items-center gap-2">
          <Waves className="h-4 w-4 md:h-5 md:w-5 text-primary-foreground" />
          <span className="text-xs md:text-sm font-bold text-primary-foreground uppercase tracking-wider">
            🦈 THE TANK
          </span>
        </div>
      </div>

      <CardContent className="p-4 md:p-5">
        <div className="space-y-4">
          {/* Founder Level */}
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs md:text-sm text-muted-foreground">Your Level</p>
              <p className="text-lg md:text-xl font-bold text-foreground truncate">{founderLevel}</p>
            </div>
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Trophy className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress to next level</span>
              <span className="font-medium text-foreground">{totalXP} XP</span>
            </div>
            <Progress value={progressToNext} className="h-2" />
            {currentLevelIndex < levels.length - 1 && (
              <p className="text-xs text-muted-foreground">
                {nextLevelXP - totalXP} XP to {levels[currentLevelIndex + 1]}
              </p>
            )}
          </div>

          {/* Last score badge */}
          {lastScore !== undefined && (
            <Badge 
              variant="secondary" 
              className={`w-full justify-center py-1.5 ${
                lastScore >= 85 
                  ? "bg-green-500/20 text-green-600 border-green-500/30" 
                  : lastScore >= 70 
                    ? "bg-yellow-500/20 text-yellow-600 border-yellow-500/30"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              Last pitch: {lastScore}% {lastScore >= 85 ? "🎉" : lastScore >= 70 ? "👍" : ""}
            </Badge>
          )}

          {/* Motivation text */}
          <p className="text-center text-xs md:text-sm text-muted-foreground font-medium">
            {getMotivation()}
          </p>

          {/* CTA */}
          <Button 
            className="w-full" 
            asChild
          >
            <Link to={tankRoute}>
              Enter THE TANK
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
