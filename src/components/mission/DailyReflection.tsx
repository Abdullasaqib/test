import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Brain, Lightbulb, Compass, Smile, Meh, Frown, Check, Sparkles, History } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useStudent } from "@/hooks/useStudent";
import { motion } from "framer-motion";

interface DailyReflectionProps {
  missionTitle: string;
  onSubmit: (reflection: {
    whatLearned: string;
    whatSurprised: string;
    whatNext: string;
    mood: number;
  }) => void;
}

interface PastReflection {
  what_next: string | null;
  what_learned: string | null;
  created_at: string;
}

const MOOD_OPTIONS = [
  { value: 1, icon: Frown, label: "Struggling", color: "text-red-500" },
  { value: 2, icon: Meh, label: "Okay", color: "text-yellow-500" },
  { value: 3, icon: Smile, label: "Great!", color: "text-green-500" },
];

export function DailyReflection({ missionTitle, onSubmit }: DailyReflectionProps) {
  const { student } = useStudent();
  const [whatLearned, setWhatLearned] = useState("");
  const [whatSurprised, setWhatSurprised] = useState("");
  const [whatNext, setWhatNext] = useState("");
  const [mood, setMood] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastReflection, setLastReflection] = useState<PastReflection | null>(null);

  // Fetch last reflection for context
  useEffect(() => {
    async function fetchLastReflection() {
      if (!student) return;
      
      const { data } = await supabase
        .from("reflections")
        .select("what_next, what_learned, created_at")
        .eq("student_id", student.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();
      
      if (data) {
        setLastReflection(data);
      }
    }
    
    fetchLastReflection();
  }, [student]);

  const canSubmit = whatLearned.trim() && mood !== null;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    
    setIsSubmitting(true);
    await onSubmit({
      whatLearned,
      whatSurprised,
      whatNext,
      mood: mood!,
    });
    setIsSubmitting(false);
  };

  return (
    <Card className="border-2 border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-transparent">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-purple-500/10">
            <Sparkles className="h-6 w-6 text-purple-500" />
          </div>
          <div>
            <CardTitle className="text-xl">Daily Reflection</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Take 5 minutes to reflect on "{missionTitle}"
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Past Reflection Context */}
        {lastReflection?.what_next && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4"
          >
            <div className="flex items-start gap-3">
              <History className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  Last time you wanted to explore:
                </p>
                <p className="text-sm text-foreground/80 mt-1 italic">
                  "{lastReflection.what_next}"
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Mood Check */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            How are you feeling about today's mission?
            <Badge variant="outline" className="text-xs">Required</Badge>
          </label>
          <div className="flex gap-3">
            {MOOD_OPTIONS.map((option) => (
              <Button
                key={option.value}
                variant={mood === option.value ? "default" : "outline"}
                className={cn(
                  "flex-1 flex-col h-auto py-4 gap-2 transition-all",
                  mood === option.value && "bg-primary scale-105"
                )}
                onClick={() => setMood(option.value)}
              >
                <option.icon className={cn("h-6 w-6", mood !== option.value && option.color)} />
                <span className="text-xs">{option.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* What I Learned */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Brain className="h-4 w-4 text-blue-500" />
            What did I learn today?
            <Badge variant="outline" className="text-xs">Required</Badge>
          </label>
          <Textarea
            value={whatLearned}
            onChange={(e) => setWhatLearned(e.target.value)}
            placeholder="Today I learned that..."
            className="min-h-[80px]"
          />
          <p className="text-xs text-muted-foreground">
            {whatLearned.length} characters
          </p>
        </div>

        {/* What Surprised Me */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-yellow-500" />
            What surprised me?
            <Badge variant="outline" className="text-xs text-muted-foreground">Optional</Badge>
          </label>
          <Textarea
            value={whatSurprised}
            onChange={(e) => setWhatSurprised(e.target.value)}
            placeholder="I was surprised that..."
            className="min-h-[60px]"
          />
        </div>

        {/* What's Next */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Compass className="h-4 w-4 text-green-500" />
            What do I want to explore next?
            <Badge variant="outline" className="text-xs text-muted-foreground">Optional</Badge>
          </label>
          <Textarea
            value={whatNext}
            onChange={(e) => setWhatNext(e.target.value)}
            placeholder="Tomorrow I want to..."
            className="min-h-[60px]"
          />
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={!canSubmit || isSubmitting}
          size="lg"
          className="w-full"
        >
          <Check className="h-4 w-4 mr-2" />
          {isSubmitting ? "Saving..." : "Complete Today's Mission"}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Your reflections help you track your founder journey and identify patterns in your learning.
        </p>
      </CardContent>
    </Card>
  );
}
