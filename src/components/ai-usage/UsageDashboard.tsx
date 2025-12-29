import { useAIUsage, AIFeature } from "@/hooks/useAIUsage";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, Lightbulb, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const featureConfig: Record<AIFeature, { label: string; icon: React.ReactNode; description: string }> = {
  ai_coach: {
    label: "AI Coach",
    icon: <Brain className="h-5 w-5 text-success" />,
    description: "Chat with your AI mentor",
  },
  stuck_prompt: {
    label: "Stuck? Helper",
    icon: <Lightbulb className="h-5 w-5 text-warning" />,
    description: "Get unstuck with AI suggestions",
  },
};

export function UsageDashboard() {
  const { usageStats, loading, refreshStats } = useAIUsage();

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>AI Usage</CardTitle>
          <CardDescription>Your AI feature usage limits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>AI Usage</CardTitle>
          <CardDescription>Your daily AI feature limits</CardDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={refreshStats}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {usageStats.map((stat) => {
          const config = featureConfig[stat.feature as AIFeature];
          if (!config) return null;

          const dailyRemaining = stat.daily_limit - stat.daily_count;
          const dailyPercentage = (stat.daily_count / stat.daily_limit) * 100;
          const weeklyRemaining = stat.weekly_limit - stat.weekly_count;
          const isLow = dailyRemaining <= 1;
          const isExhausted = dailyRemaining <= 0;

          return (
            <div key={stat.feature} className="space-y-2">
              <div className="flex items-center gap-3">
                {config.icon}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{config.label}</span>
                    <span className={`text-sm ${isExhausted ? "text-destructive" : isLow ? "text-warning" : "text-muted-foreground"}`}>
                      {dailyRemaining} / {stat.daily_limit} today
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{config.description}</p>
                </div>
              </div>
              <Progress 
                value={dailyPercentage}
                className={`h-2 ${isExhausted ? "[&>div]:bg-destructive" : isLow ? "[&>div]:bg-warning" : ""}`}
              />
              <p className="text-xs text-muted-foreground">
                Weekly: {weeklyRemaining} remaining • Monthly: {stat.monthly_limit - stat.monthly_count} remaining
              </p>
            </div>
          );
        })}

        {usageStats.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No usage data yet. Start using AI features to track your usage!
          </p>
        )}
      </CardContent>
    </Card>
  );
}
