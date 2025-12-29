import { Card, CardContent } from "@/components/ui/card";
import { Activity, AlertTriangle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface EngagementScoreProps {
  score: number;
  atRiskIndicators?: string[];
}

export function EngagementScore({ score, atRiskIndicators = [] }: EngagementScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    if (score >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Highly Engaged';
    if (score >= 60) return 'Good Engagement';
    if (score >= 40) return 'Needs Attention';
    return 'At Risk';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-600';
    if (score >= 60) return 'from-yellow-500 to-amber-600';
    if (score >= 40) return 'from-orange-500 to-orange-600';
    return 'from-red-500 to-red-600';
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <svg className="w-20 h-20 -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-muted"
              />
              <motion.circle
                cx="40"
                cy="40"
                r="36"
                stroke="url(#engagementGradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                initial={{ strokeDasharray: "0 226" }}
                animate={{ strokeDasharray: `${(score / 100) * 226} 226` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="engagementGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" className={cn("stop-color-current", getScoreColor(score))} />
                  <stop offset="100%" className={cn("stop-color-current", getScoreColor(score))} />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={cn("text-2xl font-bold", getScoreColor(score))}>
                {score}
              </span>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-5 h-5 text-muted-foreground" />
              <span className="font-semibold">Engagement Score</span>
            </div>
            <p className={cn("text-lg font-medium", getScoreColor(score))}>
              {getScoreLabel(score)}
            </p>
          </div>
        </div>

        {atRiskIndicators.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2 mb-2 text-yellow-500">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">Areas to Watch</span>
            </div>
            <ul className="space-y-1">
              {atRiskIndicators.map((indicator, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-yellow-500">•</span>
                  {indicator}
                </li>
              ))}
            </ul>
          </div>
        )}

        {atRiskIndicators.length === 0 && score >= 60 && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-green-500">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm">All engagement metrics look healthy!</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
