import { useMemo } from "react";
import { Lightbulb, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PromptCard } from "./PromptCard";

interface Prompt {
  id: string;
  title: string;
  description: string;
  prompt_template: string;
  stage: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  kid_category: string;
  week_relevant: number[] | null;
}

interface SmartSuggestionsProps {
  prompts: Prompt[];
  currentWeek: number;
  currentPhase: string;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onUsePrompt: (prompt: string) => void;
  onViewAll?: () => void;
}

const phaseToStage: Record<string, string> = {
  discovery: "idea",
  validation: "validation",
  building: "mvp",
  growth: "launch",
  pitch: "scale",
};

const phaseDescriptions: Record<string, string> = {
  discovery: "Finding and defining your problem",
  validation: "Talking to customers and validating ideas",
  building: "Creating your MVP and landing page",
  growth: "Getting your first users and customers",
  pitch: "Preparing your pitch and demo day",
};

export function SmartSuggestions({
  prompts,
  currentWeek,
  currentPhase,
  favorites,
  onToggleFavorite,
  onUsePrompt,
  onViewAll,
}: SmartSuggestionsProps) {
  const suggestedPrompts = useMemo(() => {
    const targetStage = phaseToStage[currentPhase] || "idea";
    
    // First, get prompts relevant to current week
    const weekRelevant = prompts.filter((p) => p.week_relevant?.includes(currentWeek));
    
    // Then, get prompts matching current stage
    const stageMatched = prompts.filter((p) => p.stage === targetStage);
    
    // Combine and deduplicate, prioritizing week-relevant
    const combined = [...weekRelevant];
    stageMatched.forEach((p) => {
      if (!combined.find((c) => c.id === p.id)) {
        combined.push(p);
      }
    });
    
    // Sort by difficulty (beginner first for earlier weeks)
    return combined
      .sort((a, b) => {
        const diffOrder = { beginner: 0, intermediate: 1, advanced: 2 };
        return diffOrder[a.difficulty] - diffOrder[b.difficulty];
      })
      .slice(0, 4);
  }, [prompts, currentWeek, currentPhase]);

  if (suggestedPrompts.length === 0) return null;

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Smart Suggestions</CardTitle>
          </div>
          <Badge variant="secondary">Week {currentWeek}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {phaseDescriptions[currentPhase] || "Prompts perfect for where you are right now"}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestedPrompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              id={prompt.id}
              title={prompt.title}
              description={prompt.description}
              promptTemplate={prompt.prompt_template}
              difficulty={prompt.difficulty}
              kidCategory={prompt.kid_category}
              isFavorite={favorites.includes(prompt.id)}
              onToggleFavorite={onToggleFavorite}
              onUsePrompt={onUsePrompt}
            />
          ))}
        </div>
        {onViewAll && (
          <Button variant="outline" className="w-full" onClick={onViewAll}>
            View All Prompts <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}