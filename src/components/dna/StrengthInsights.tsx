import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, ArrowRight, Sparkles } from "lucide-react";

interface StrengthInsightsProps {
  personalizedInsight: string | null;
  recommendedFocus: string | null;
}

export function StrengthInsights({ personalizedInsight, recommendedFocus }: StrengthInsightsProps) {
  if (!personalizedInsight && !recommendedFocus) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Personalized Insight */}
      {personalizedInsight && (
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-500" />
              What Makes YOU Special ✨
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {personalizedInsight}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Recommended Focus */}
      {recommendedFocus && (
        <Card className="bg-gradient-to-r from-green-500/5 to-transparent border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-green-500/10 mt-0.5">
                <ArrowRight className="h-4 w-4 text-green-500" />
              </div>
              <div>
                <p className="text-xs font-medium text-green-600 uppercase tracking-wider mb-1">
                  Your Next Power-Up 🎯
                </p>
                <p className="text-sm font-medium">
                  {recommendedFocus}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
