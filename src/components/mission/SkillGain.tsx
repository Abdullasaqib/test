import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Star, Zap, ChevronRight, Rocket } from "lucide-react";
import { SKILL_LABELS } from "@/hooks/useSkills";
import { motion } from "framer-motion";
import { Mission } from "@/hooks/useMission";

interface SkillGainProps {
  skills: { skill: string; points: number }[];
  totalPointsEarned: number;
  streakDays?: number;
  nextMission?: Mission | null;
  skillTotals?: Record<string, number>;
}

// Skill level thresholds
const SKILL_LEVELS = [
  { name: "Beginner", minPoints: 0, maxPoints: 50, color: "text-muted-foreground" },
  { name: "Intermediate", minPoints: 50, maxPoints: 150, color: "text-blue-500" },
  { name: "Advanced", minPoints: 150, maxPoints: 300, color: "text-purple-500" },
  { name: "Expert", minPoints: 300, maxPoints: Infinity, color: "text-amber-500" },
];

function getSkillLevel(totalPoints: number) {
  for (let i = SKILL_LEVELS.length - 1; i >= 0; i--) {
    if (totalPoints >= SKILL_LEVELS[i].minPoints) {
      const level = SKILL_LEVELS[i];
      const nextLevel = SKILL_LEVELS[i + 1];
      const pointsInLevel = totalPoints - level.minPoints;
      const pointsToNext = nextLevel ? nextLevel.minPoints - level.minPoints : 100;
      const progressPercent = nextLevel ? Math.min((pointsInLevel / pointsToNext) * 100, 100) : 100;
      const pointsRemaining = nextLevel ? nextLevel.minPoints - totalPoints : 0;
      
      return {
        ...level,
        progress: progressPercent,
        pointsToNext: pointsRemaining,
        nextLevelName: nextLevel?.name || "Mastery",
      };
    }
  }
  return { ...SKILL_LEVELS[0], progress: 0, pointsToNext: 50, nextLevelName: "Intermediate" };
}

export function SkillGain({ 
  skills, 
  totalPointsEarned, 
  streakDays = 0, 
  nextMission,
  skillTotals = {},
}: SkillGainProps) {
  return (
    <Card className="border-2 border-green-500/20 bg-gradient-to-br from-green-500/5 to-transparent overflow-hidden">
      <CardContent className="p-6">
        {/* Celebration Header */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4"
          >
            <Star className="h-8 w-8 text-green-500" />
          </motion.div>
          <h3 className="text-2xl font-bold text-foreground">Mission Complete!</h3>
          <p className="text-muted-foreground mt-1">You earned skills today</p>
        </div>

        {/* Points Earned */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Badge className="text-lg px-4 py-2 bg-primary/10 text-primary border-primary/20">
            <TrendingUp className="h-4 w-4 mr-2" />
            +{totalPointsEarned} XP
          </Badge>
          {streakDays > 0 && (
            <Badge className="text-lg px-4 py-2 bg-orange-500/10 text-orange-500 border-orange-500/20">
              <Zap className="h-4 w-4 mr-2" />
              {streakDays} Day Streak
            </Badge>
          )}
        </div>

        {/* Skills Gained with Level Progress */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Skills Developed
          </h4>
          
          {skills.map((skillGain, index) => {
            const skillInfo = SKILL_LABELS[skillGain.skill];
            if (!skillInfo) return null;

            const totalForSkill = (skillTotals[skillGain.skill] || 0) + skillGain.points;
            const levelInfo = getSkillLevel(totalForSkill);

            return (
              <motion.div
                key={skillGain.skill}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                    style={{ backgroundColor: `${skillInfo.color}20`, color: skillInfo.color }}
                  >
                    +{skillGain.points}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-foreground truncate">{skillInfo.name}</span>
                      <Badge variant="outline" className={`text-xs ${levelInfo.color}`}>
                        {levelInfo.name}
                      </Badge>
                    </div>
                    <Progress value={levelInfo.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {levelInfo.pointsToNext > 0 
                        ? `${levelInfo.pointsToNext} pts to ${levelInfo.nextLevelName}`
                        : "Max level reached!"
                      }
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tomorrow Preview */}
        {nextMission && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <Rocket className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-primary font-medium uppercase tracking-wider">
                  Coming Tomorrow
                </p>
                <p className="font-semibold text-foreground truncate">
                  {nextMission.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  Week {nextMission.week}, Day {nextMission.day}
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
            </div>
          </motion.div>
        )}

        {/* Motivational Message */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg text-center">
          <p className="text-sm text-foreground/80">
            {streakDays >= 7 
              ? "🔥 You're on fire! A whole week of consistent building!"
              : streakDays >= 3
              ? "💪 Great momentum! Keep shipping every day!"
              : "🚀 Every mission brings you closer to your goal!"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
