import { useState } from "react";
import { Heart, Copy, Check, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface PromptCardProps {
  id: string;
  title: string;
  description: string;
  promptTemplate: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  kidCategory: string;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  onUsePrompt?: (prompt: string) => void;
}

const categoryIcons: Record<string, string> = {
  design_help: "🎨",
  customer_conversations: "💬",
  content_creation: "📝",
  technical_help: "🛠️",
  business_model: "💰",
  marketing: "📢",
};

const categoryLabels: Record<string, string> = {
  design_help: "Design Help",
  customer_conversations: "Customer Conversations",
  content_creation: "Content Creation",
  technical_help: "Technical Help",
  business_model: "Business Model",
  marketing: "Marketing",
};

const difficultyStars: Record<string, number> = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
};

export function PromptCard({
  id,
  title,
  description,
  promptTemplate,
  difficulty,
  kidCategory,
  isFavorite = false,
  onToggleFavorite,
  onUsePrompt,
}: PromptCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(promptTemplate);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Prompt copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUse = () => {
    onUsePrompt?.(promptTemplate);
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 border-border/50 hover:border-primary/30">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">{categoryIcons[kidCategory]}</span>
            <h3 className="font-semibold text-foreground line-clamp-1">{title}</h3>
          </div>
          {onToggleFavorite && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0"
              onClick={() => onToggleFavorite(id)}
            >
              <Heart
                className={cn(
                  "h-4 w-4 transition-colors",
                  isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"
                )}
              />
            </Button>
          )}
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>

        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {categoryLabels[kidCategory]}
          </Badge>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 3 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3 w-3",
                  i < difficultyStars[difficulty]
                    ? "fill-amber-400 text-amber-400"
                    : "text-muted-foreground/30"
                )}
              />
            ))}
          </div>
        </div>

        <div className="bg-muted/50 rounded-md p-2 max-h-20 overflow-hidden">
          <p className="text-xs text-muted-foreground font-mono line-clamp-3">
            {promptTemplate}
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 mr-1" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 mr-1" />
                Copy
              </>
            )}
          </Button>
          <Button
            size="sm"
            className="flex-1"
            onClick={handleUse}
          >
            <Sparkles className="h-3 w-3 mr-1" />
            Use with AI
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}