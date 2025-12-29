import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useStudent } from "@/hooks/useStudent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Brain, TrendingUp, Target, Sparkles, Award } from "lucide-react";
import { SkillsRadarChart } from "./SkillsRadarChart";
import { motion } from "framer-motion";

interface LearningObjective {
  id: string;
  objective: string;
  measurable_outcome: string;
  bloom_level: string;
  skill_category: string;
  lesson_id: string;
}

interface CompletedLesson {
  lesson_id: string;
}

const SKILL_CATEGORIES = [
  { key: "AI Fluency", icon: "🤖", color: "hsl(var(--chart-1))" },
  { key: "Critical Thinking", icon: "🧠", color: "hsl(var(--chart-2))" },
  { key: "Communication", icon: "🎤", color: "hsl(var(--chart-3))" },
  { key: "Problem Solving", icon: "🧩", color: "hsl(var(--chart-4))" },
  { key: "Research Skills", icon: "🔬", color: "hsl(var(--chart-5))" },
  { key: "Real-World Application", icon: "🌍", color: "hsl(var(--primary))" },
  { key: "Entrepreneurial Mindset", icon: "🚀", color: "hsl(var(--accent))" },
  { key: "Creative Thinking", icon: "💡", color: "hsl(var(--secondary))" },
];

const BLOOM_LEVELS = ["remember", "understand", "apply", "analyze", "evaluate", "create"];

export function SkillsProgressDashboard() {
  const { student, loading: studentLoading } = useStudent();

  // Fetch all learning objectives
  const { data: allObjectives, isLoading: objectivesLoading } = useQuery({
    queryKey: ["all-learning-objectives"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("learning_objectives")
        .select("*")
        .eq("is_active", true);
      if (error) throw error;
      return data as LearningObjective[];
    },
  });

  // Fetch completed lessons for student
  const { data: completedLessons, isLoading: progressLoading } = useQuery({
    queryKey: ["completed-lessons", student?.id],
    queryFn: async () => {
      if (!student) return [];
      const { data, error } = await supabase
        .from("certification_progress")
        .select("lesson_id")
        .eq("student_id", student.id);
      if (error) throw error;
      return data as CompletedLesson[];
    },
    enabled: !!student,
  });

  const isLoading = studentLoading || objectivesLoading || progressLoading;

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-[300px] w-full" />
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-20" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Calculate mastered objectives based on completed lessons
  const completedLessonIds = new Set(completedLessons?.map((l) => l.lesson_id) || []);
  const masteredObjectives = allObjectives?.filter((obj) =>
    completedLessonIds.has(obj.lesson_id)
  ) || [];

  // Group by skill category
  const skillProgress = SKILL_CATEGORIES.map((category) => {
    const categoryObjectives = allObjectives?.filter(
      (obj) => obj.skill_category === category.key
    ) || [];
    const masteredInCategory = masteredObjectives.filter(
      (obj) => obj.skill_category === category.key
    );

    const totalPoints = categoryObjectives.length * 10;
    const earnedPoints = masteredInCategory.length * 10;
    const percentage = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;

    // Calculate highest bloom level achieved
    const highestBloom = masteredInCategory.reduce((highest, obj) => {
      const currentIndex = BLOOM_LEVELS.indexOf(obj.bloom_level);
      const highestIndex = BLOOM_LEVELS.indexOf(highest);
      return currentIndex > highestIndex ? obj.bloom_level : highest;
    }, "remember");

    return {
      ...category,
      total: categoryObjectives.length,
      mastered: masteredInCategory.length,
      percentage,
      highestBloom,
    };
  });

  // Prepare radar chart data
  const radarData = skillProgress.map((skill) => ({
    name: skill.key.split(" ")[0], // Shortened name for radar
    value: skill.percentage,
    fullMark: 100,
  }));

  // Overall stats
  const totalObjectives = allObjectives?.length || 0;
  const totalMastered = masteredObjectives.length;
  const overallProgress = totalObjectives > 0 
    ? Math.round((totalMastered / totalObjectives) * 100) 
    : 0;

  // Find signature strength (highest category)
  const signatureStrength = skillProgress.reduce((best, current) =>
    current.percentage > best.percentage ? current : best
  );

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold">{totalMastered}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Skills Mastered</p>
          </CardContent>
        </Card>

        <Card className="bg-amber-500/5 border-amber-500/20">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-amber-500" />
              <span className="text-2xl font-bold">{overallProgress}%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Overall Progress</p>
          </CardContent>
        </Card>

        <Card className="bg-green-500/5 border-green-500/20">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-green-500" />
              <span className="text-2xl font-bold">{completedLessonIds.size}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Lessons Complete</p>
          </CardContent>
        </Card>

        <Card className="bg-purple-500/5 border-purple-500/20">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              <span className="text-lg font-bold truncate">{signatureStrength.key.split(" ")[0]}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Signature Strength</p>
          </CardContent>
        </Card>
      </div>

      {/* Radar Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Skills Radar
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Your competency across 8 skill categories
          </p>
        </CardHeader>
        <CardContent>
          {totalMastered > 0 ? (
            <SkillsRadarChart data={radarData} />
          ) : (
            <div className="h-[300px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Brain className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p className="text-sm font-medium">Complete lessons to see your skills radar</p>
                <p className="text-xs mt-1">Each lesson unlocks new competencies</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Skill Category Breakdown */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Skill Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {skillProgress.map((skill, index) => (
              <motion.div
                key={skill.key}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{skill.icon}</span>
                    <span className="text-sm font-medium">{skill.key}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {skill.mastered}/{skill.total}
                    </span>
                    {skill.mastered > 0 && (
                      <Badge variant="secondary" className="text-xs capitalize">
                        {skill.highestBloom}
                      </Badge>
                    )}
                  </div>
                </div>
                <Progress
                  value={skill.percentage}
                  className="h-2"
                  style={
                    {
                      "--progress-foreground": skill.color,
                    } as React.CSSProperties
                  }
                />
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mastered Objectives List */}
      {masteredObjectives.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Recently Mastered
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {masteredObjectives.slice(0, 6).map((obj) => {
                const category = SKILL_CATEGORIES.find((c) => c.key === obj.skill_category);
                return (
                  <div
                    key={obj.id}
                    className="flex items-start gap-3 p-2 rounded-lg bg-muted/30"
                  >
                    <span className="text-lg">{category?.icon || "📌"}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{obj.objective}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        ✓ {obj.measurable_outcome}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
