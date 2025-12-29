import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Clock, Sparkles, BookOpen, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface LearningObjective {
  id: string;
  objective: string;
  measurable_outcome: string;
  bloom_level: string;
  skill_category: string;
}

interface LessonPreviewCardProps {
  lessonId: string;
  lessonTitle: string;
  lessonDescription?: string;
  estimatedMinutes?: number;
  sprintCount?: number;
  onStart: () => void;
  isLoading?: boolean;
}

const BLOOM_LEVELS: Record<string, { label: string; color: string; icon: string }> = {
  remember: { label: "Remember", color: "bg-blue-500/20 text-blue-400", icon: "📚" },
  understand: { label: "Understand", color: "bg-green-500/20 text-green-400", icon: "💡" },
  apply: { label: "Apply", color: "bg-amber-500/20 text-amber-400", icon: "⚡" },
  analyze: { label: "Analyze", color: "bg-purple-500/20 text-purple-400", icon: "🔍" },
  evaluate: { label: "Evaluate", color: "bg-pink-500/20 text-pink-400", icon: "⚖️" },
  create: { label: "Create", color: "bg-orange-500/20 text-orange-400", icon: "🎨" },
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

export function LessonPreviewCard({
  lessonId,
  lessonTitle,
  lessonDescription,
  estimatedMinutes = 30,
  sprintCount = 5,
  onStart,
  isLoading = false,
}: LessonPreviewCardProps) {
  const { data: objectives, isLoading: objectivesLoading } = useQuery({
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

  const skillCategories = [...new Set(objectives?.map((o) => o.skill_category) || [])];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="border-primary/30 bg-card/50 backdrop-blur-sm overflow-hidden">
        {/* Header */}
        <CardHeader className="pb-4 border-b border-border/50">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <Badge variant="outline" className="mb-2 text-xs">
                <BookOpen className="h-3 w-3 mr-1" />
                Lesson Preview
              </Badge>
              <CardTitle className="text-xl md:text-2xl">{lessonTitle}</CardTitle>
              {lessonDescription && (
                <p className="text-muted-foreground text-sm mt-2">{lessonDescription}</p>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-3 mt-4">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 text-primary" />
              <span>{estimatedMinutes} minutes</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span>{sprintCount} sprints</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          {/* What You'll Learn */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              What You'll Learn
            </h3>

            {objectivesLoading ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-muted/50 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {objectives?.slice(0, 4).map((objective, index) => {
                  const bloom = BLOOM_LEVELS[objective.bloom_level] || BLOOM_LEVELS.understand;
                  const skillIcon = SKILL_ICONS[objective.skill_category] || "📌";

                  return (
                    <motion.div
                      key={objective.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/50"
                    >
                      <span className="text-lg">{skillIcon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{objective.objective}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          ✓ {objective.measurable_outcome}
                        </p>
                      </div>
                      <Badge variant="secondary" className={`text-xs shrink-0 ${bloom.color}`}>
                        {bloom.icon} {bloom.label}
                      </Badge>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Skills You'll Gain */}
          {skillCategories.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Skills You'll Build</h3>
              <div className="flex flex-wrap gap-2">
                {skillCategories.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {SKILL_ICONS[skill] || "📌"} {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Start Button */}
          <div className="pt-4">
            <Button
              onClick={onStart}
              disabled={isLoading}
              className="w-full h-12 text-base font-medium"
              size="lg"
            >
              {isLoading ? (
                "Loading..."
              ) : (
                <>
                  Start Learning
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-2">
              Complete sprints and quizzes to earn your certificate
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
