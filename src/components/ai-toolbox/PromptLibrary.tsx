import { useState, useMemo } from "react";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PromptCard } from "./PromptCard";
import { cn } from "@/lib/utils";

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

interface PromptLibraryProps {
  prompts: Prompt[];
  favorites: string[];
  currentWeek?: number;
  onToggleFavorite: (id: string) => void;
  onUsePrompt: (prompt: string) => void;
}

const categories = [
  { id: "all", label: "All", icon: "📚" },
  { id: "design_help", label: "Design", icon: "🎨" },
  { id: "customer_conversations", label: "Customers", icon: "💬" },
  { id: "content_creation", label: "Content", icon: "📝" },
  { id: "technical_help", label: "Tech", icon: "🛠️" },
  { id: "business_model", label: "Business", icon: "💰" },
  { id: "marketing", label: "Marketing", icon: "📢" },
];

const stages = [
  { id: "all", label: "All Stages" },
  { id: "idea", label: "Idea" },
  { id: "validation", label: "Validation" },
  { id: "mvp", label: "MVP" },
  { id: "launch", label: "Launch" },
  { id: "scale", label: "Scale" },
];

const difficulties = [
  { id: "all", label: "All Levels" },
  { id: "beginner", label: "⭐ Beginner" },
  { id: "intermediate", label: "⭐⭐ Intermediate" },
  { id: "advanced", label: "⭐⭐⭐ Advanced" },
];

export function PromptLibrary({
  prompts,
  favorites,
  currentWeek = 1,
  onToggleFavorite,
  onUsePrompt,
}: PromptLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStage, setSelectedStage] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Get relevant prompts for current week
  const relevantPrompts = useMemo(() => {
    return prompts.filter(
      (p) => p.week_relevant?.includes(currentWeek)
    );
  }, [prompts, currentWeek]);

  const filteredPrompts = useMemo(() => {
    return prompts.filter((prompt) => {
      const matchesSearch =
        searchQuery === "" ||
        prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || prompt.kid_category === selectedCategory;

      const matchesStage =
        selectedStage === "all" || prompt.stage === selectedStage;

      const matchesDifficulty =
        selectedDifficulty === "all" || prompt.difficulty === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesStage && matchesDifficulty;
    });
  }, [prompts, searchQuery, selectedCategory, selectedStage, selectedDifficulty]);

  return (
    <div className="space-y-6">
      {/* Relevant for current week */}
      {relevantPrompts.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎯</span>
            <h3 className="font-semibold text-foreground">
              Perfect for Week {currentWeek}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relevantPrompts.slice(0, 3).map((prompt) => (
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
        </div>
      )}

      {/* Search and filters */}
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat.id)}
              className="gap-1"
            >
              <span>{cat.icon}</span>
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Advanced filters */}
        {showFilters && (
          <div className="flex flex-wrap gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="space-y-2">
              <label className="text-sm font-medium">Stage</label>
              <div className="flex flex-wrap gap-2">
                {stages.map((stage) => (
                  <Badge
                    key={stage.id}
                    variant={selectedStage === stage.id ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedStage(stage.id)}
                  >
                    {stage.label}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Difficulty</label>
              <div className="flex flex-wrap gap-2">
                {difficulties.map((diff) => (
                  <Badge
                    key={diff.id}
                    variant={selectedDifficulty === diff.id ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedDifficulty(diff.id)}
                  >
                    {diff.label}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          {filteredPrompts.length} prompts found
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPrompts.map((prompt) => (
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
      </div>
    </div>
  );
}