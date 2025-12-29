import { useAIUsage, AIFeature } from "@/hooks/useAIUsage";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Sparkles, AlertCircle } from "lucide-react";

interface UsageIndicatorProps {
  feature: AIFeature;
  showLabel?: boolean;
  compact?: boolean;
}

const featureLabels: Record<AIFeature, string> = {
  ai_coach: "AI Coach",
  stuck_prompt: "Prompt Helper",
};

export function UsageIndicator({ feature, showLabel = true, compact = false }: UsageIndicatorProps) {
  const { getFeatureStats, loading } = useAIUsage();
  const stats = getFeatureStats(feature);

  if (loading || !stats) {
    return null;
  }

  const remaining = stats.daily_limit - stats.daily_count;
  const percentage = (stats.daily_count / stats.daily_limit) * 100;
  const isLow = remaining <= 1;
  const isExhausted = remaining <= 0;

  if (compact) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={`flex items-center gap-1 text-xs ${isExhausted ? "text-destructive" : isLow ? "text-warning" : "text-muted-foreground"}`}>
              {isExhausted ? (
                <AlertCircle className="h-3 w-3" />
              ) : (
                <Sparkles className="h-3 w-3" />
              )}
              <span>{remaining}/{stats.daily_limit}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{remaining} {featureLabels[feature]} generations remaining today</p>
            <p className="text-xs text-muted-foreground mt-1">
              Weekly: {stats.weekly_limit - stats.weekly_count} remaining
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <div className="space-y-1">
      {showLabel && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{featureLabels[feature]}</span>
          <span className={isExhausted ? "text-destructive" : isLow ? "text-warning" : "text-foreground"}>
            {remaining} / {stats.daily_limit} today
          </span>
        </div>
      )}
      <Progress 
        value={percentage} 
        className={`h-2 ${isExhausted ? "[&>div]:bg-destructive" : isLow ? "[&>div]:bg-warning" : ""}`}
      />
      {isExhausted && (
        <p className="text-xs text-destructive flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          Daily limit reached. Resets tomorrow.
        </p>
      )}
    </div>
  );
}
