import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, TrendingUp, Sparkles, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface Scores {
  communication: number;
  confidence: number;
  persuasion: number;
  resilience: number;
  business_thinking: number;
}

interface Feedback {
  opening: string;
  strengths: string[];
  improvements: string[];
  overallComment: string;
}

interface ScoreBreakdownProps {
  scores: Scores;
  totalScore: number;
  xpEarned: number;
  verdict: "DEAL" | "NO_DEAL" | "MAYBE";
  feedback: Feedback;
  nextTip: string;
  investorName: string;
  onContinue: () => void;
}

const SKILL_INFO = {
  communication: { label: "Communication", color: "bg-blue-500", icon: "🎯" },
  confidence: { label: "Confidence", color: "bg-purple-500", icon: "💪" },
  persuasion: { label: "Persuasion", color: "bg-pink-500", icon: "✨" },
  resilience: { label: "Resilience", color: "bg-green-500", icon: "🔥" },
  business_thinking: { label: "Business Thinking", color: "bg-amber-500", icon: "💡" },
};

export function ScoreBreakdown({
  scores,
  totalScore,
  xpEarned,
  verdict,
  feedback,
  nextTip,
  investorName,
  onContinue,
}: ScoreBreakdownProps) {
  const [animatedScores, setAnimatedScores] = useState<Scores>({
    communication: 0,
    confidence: 0,
    persuasion: 0,
    resilience: 0,
    business_thinking: 0,
  });
  const [showVerdict, setShowVerdict] = useState(false);
  const [animatedXP, setAnimatedXP] = useState(0);

  useEffect(() => {
    // Animate scores one by one
    const keys = Object.keys(scores) as (keyof Scores)[];
    keys.forEach((key, index) => {
      setTimeout(() => {
        setAnimatedScores(prev => ({ ...prev, [key]: scores[key] }));
      }, index * 200);
    });

    // Show verdict after scores
    setTimeout(() => setShowVerdict(true), keys.length * 200 + 500);

    // Animate XP
    const duration = 1500;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setAnimatedXP(Math.floor(progress * xpEarned));
      if (progress < 1) requestAnimationFrame(animate);
    };
    setTimeout(animate, keys.length * 200 + 800);
  }, [scores, xpEarned]);

  const getVerdictStyle = () => {
    switch (verdict) {
      case "DEAL":
        return "bg-green-500/20 text-green-500 border-green-500";
      case "NO_DEAL":
        return "bg-red-500/20 text-red-500 border-red-500";
      default:
        return "bg-amber-500/20 text-amber-500 border-amber-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with verdict */}
      <AnimatePresence>
        {showVerdict && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="text-center"
          >
            <div className={cn(
              "inline-flex items-center gap-3 px-8 py-4 rounded-2xl border-2 text-2xl font-bold",
              getVerdictStyle()
            )}>
              {verdict === "DEAL" && <Trophy className="h-8 w-8" />}
              {verdict === "DEAL" ? "🎉 DEAL! 🎉" : verdict === "MAYBE" ? "🤔 MAYBE..." : "❌ NO DEAL"}
            </div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 text-lg text-muted-foreground italic"
            >
              "{feedback.opening}"
              <span className="block text-sm mt-1">— {investorName}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* XP Earned Banner */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="bg-gradient-to-r from-primary/20 to-primary/5 rounded-xl p-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="font-medium">XP Earned</span>
        </div>
        <span className="text-3xl font-bold text-primary">+{animatedXP}</span>
      </motion.div>

      {/* Score breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="h-5 w-5" />
            Skill Scores
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(SKILL_INFO).map(([key, info], index) => {
            const score = animatedScores[key as keyof Scores];
            const maxScore = 15;
            const percentage = (score / maxScore) * 100;
            
            return (
              <motion.div
                key={key}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="flex items-center gap-2 text-sm font-medium">
                    <span>{info.icon}</span>
                    {info.label}
                  </span>
                  <span className="text-sm font-bold">{score}/{maxScore}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className={cn("h-full rounded-full", info.color)}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  />
                </div>
              </motion.div>
            );
          })}
          
          <div className="pt-4 border-t flex items-center justify-between">
            <span className="font-semibold">Total Score</span>
            <span className="text-2xl font-bold text-primary">{totalScore}/75</span>
          </div>
        </CardContent>
      </Card>

      {/* Feedback */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="border-green-500/30 bg-green-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-green-600 flex items-center gap-2">
              ✅ Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {feedback.strengths.map((strength, i) => (
                <motion.li
                  key={i}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.5 + i * 0.1 }}
                  className="text-sm flex items-start gap-2"
                >
                  <span className="text-green-500">•</span>
                  {strength}
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-amber-500/30 bg-amber-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-amber-600 flex items-center gap-2">
              💡 Areas to Improve
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {feedback.improvements.map((improvement, i) => (
                <motion.li
                  key={i}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.8 + i * 0.1 }}
                  className="text-sm flex items-start gap-2"
                >
                  <span className="text-amber-500">•</span>
                  {improvement}
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Next tip */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4 flex items-start gap-3">
          <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <p className="font-medium text-sm mb-1">Next Pitch Tip</p>
            <p className="text-sm text-muted-foreground">{nextTip}</p>
          </div>
        </CardContent>
      </Card>

      {/* Continue button */}
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.5 }}
        onClick={onContinue}
        className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
      >
        Continue to Q&A Round →
      </motion.button>
    </div>
  );
}
