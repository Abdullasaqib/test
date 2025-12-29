import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Sparkles, ArrowRight, CheckCircle2, Brain, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface LearningObjective {
  id: string;
  objective: string;
  measurable_outcome: string;
  bloom_level: string;
  skill_category: string;
}

interface LessonCompleteSummaryProps {
  lessonId: string;
  lessonTitle: string;
  lessonOrder: number;
  totalLessons: number;
  nextLessonTitle?: string;
  onContinue: () => void;
  onViewCertificate?: () => void;
  isLastLesson?: boolean;
}

const BLOOM_LEVELS: Record<string, { label: string; color: string }> = {
  remember: { label: "Remember", color: "text-blue-400" },
  understand: { label: "Understand", color: "text-green-400" },
  apply: { label: "Apply", color: "text-amber-400" },
  analyze: { label: "Analyze", color: "text-purple-400" },
  evaluate: { label: "Evaluate", color: "text-pink-400" },
  create: { label: "Create", color: "text-orange-400" },
};

const SKILL_ICONS: Record<string, string> = {
  "AI Fluency": "🤖",
  "Critical Thinking": "🧠",
  "Communication": "🎤",
  "Problem Solving": "🧩",
  "Research Skills": "🔬",
  "Real-World Application": "🌍",
  "Entrepreneurial Mindset": "🚀",
  "Creative Thinking": "💡",
};

const ENCOURAGEMENTS = [
  "You're building real skills!",
  "One step closer to mastery!",
  "Your AI fluency is growing!",
  "Keep the momentum going!",
  "You're on fire! 🔥",
];

export function LessonCompleteSummary({
  lessonId,
  lessonTitle,
  lessonOrder,
  totalLessons,
  nextLessonTitle,
  onContinue,
  onViewCertificate,
  isLastLesson = false,
}: LessonCompleteSummaryProps) {
  const [showConfetti, setShowConfetti] = useState(true);

  const { data: objectives } = useQuery({
    queryKey: ["lesson-objectives", lessonId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("learning_objectives")
        .select("*")
        .eq("lesson_id", lessonId)
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as LearningObjective[];
    },
    enabled: !!lessonId,
  });

  useEffect(() => {
    if (showConfetti) {
      const duration = isLastLesson ? 4000 : 2000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: isLastLesson ? 5 : 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b"],
        });
        confetti({
          particleCount: isLastLesson ? 5 : 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b"],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
      setShowConfetti(false);
    }
  }, [showConfetti, isLastLesson]);

  const progressPercent = Math.round((lessonOrder / totalLessons) * 100);
  const skillCategories = [...new Set(objectives?.map((o) => o.skill_category) || [])];
  const encouragement = ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="border-primary/30 bg-card/50 backdrop-blur-sm overflow-hidden">
        {/* Celebration Header */}
        <CardHeader className="text-center pb-4 border-b border-border/50">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="mx-auto mb-4"
          >
            {isLastLesson ? (
              <div className="relative">
                <Trophy className="h-16 w-16 text-amber-500" />
                <Sparkles className="h-6 w-6 text-amber-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
            ) : (
              <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-primary" />
              </div>
            )}
          </motion.div>

          <CardTitle className="text-2xl md:text-3xl">
            {isLastLesson ? "🎉 Certificate Complete!" : "Lesson Complete!"}
          </CardTitle>

          <p className="text-muted-foreground mt-2">{lessonTitle}</p>

          <Badge variant="secondary" className="mt-3 text-sm">
            <Star className="h-3 w-3 mr-1 text-amber-500" />
            {encouragement}
          </Badge>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          {/* Progress */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Certificate Progress</span>
              <span className="font-medium text-primary">
                {lessonOrder} of {totalLessons} lessons
              </span>
            </div>
            <Progress value={progressPercent} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1 text-right">{progressPercent}% complete</p>
          </div>

          {/* Skills Unlocked */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Brain className="h-4 w-4 text-primary" />
              Skills Unlocked
            </h3>

            <div className="space-y-2">
              <AnimatePresence>
                {objectives?.slice(0, 4).map((objective, index) => {
                  const bloom = BLOOM_LEVELS[objective.bloom_level] || BLOOM_LEVELS.understand;
                  const skillIcon = SKILL_ICONS[objective.skill_category] || "📌";

                  return (
                    <motion.div
                      key={objective.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.15 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20"
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {skillIcon} {objective.objective}
                        </p>
                        <p className={`text-xs ${bloom.color}`}>
                          Level: {bloom.label}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Skill Badges */}
            {skillCategories.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {skillCategories.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <Badge variant="outline" className="text-xs bg-background">
                      {SKILL_ICONS[skill] || "📌"} {skill} +1
                    </Badge>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Next Lesson Preview */}
          {!isLastLesson && nextLessonTitle && (
            <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
              <p className="text-xs text-muted-foreground mb-1">Up Next</p>
              <p className="text-sm font-medium text-foreground">{nextLessonTitle}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            {isLastLesson ? (
              <>
                <Button onClick={onViewCertificate} className="w-full h-12 text-base" size="lg">
                  <Trophy className="h-4 w-4 mr-2" />
                  View Your Certificate
                </Button>
                <Button variant="outline" onClick={onContinue} className="w-full">
                  Explore More Courses
                </Button>
              </>
            ) : (
              <Button onClick={onContinue} className="w-full h-12 text-base" size="lg">
                Continue to Next Lesson
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
