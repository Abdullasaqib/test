import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { History, Trophy, TrendingUp, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { INVESTORS } from "./InvestorSelect";
import { format } from "date-fns";

interface PitchAttempt {
  id: string;
  investor_persona: string;
  score: number;
  scores: {
    communication: number;
    confidence: number;
    persuasion: number;
    resilience: number;
    business_thinking: number;
  };
  total_xp_earned: number;
  created_at: string;
}

interface PitchHistoryProps {
  attempts: PitchAttempt[];
  onViewDetails?: (attempt: PitchAttempt) => void;
}

export function PitchHistory({ attempts, onViewDetails }: PitchHistoryProps) {
  if (attempts.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-12 text-center">
          <History className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
          <h3 className="font-medium mb-1">No Pitches Yet</h3>
          <p className="text-sm text-muted-foreground">
            Your pitch history will appear here after your first attempt
          </p>
        </CardContent>
      </Card>
    );
  }

  const bestAttempt = attempts.reduce((best, current) => 
    current.score > best.score ? current : best
  , attempts[0]);

  const totalXP = attempts.reduce((sum, a) => sum + (a.total_xp_earned || 0), 0);

  return (
    <div className="space-y-4">
      {/* Stats summary */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{attempts.length}</p>
            <p className="text-xs text-muted-foreground">Total Pitches</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">{totalXP}</p>
            <p className="text-xs text-muted-foreground">Total XP</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-500">{bestAttempt.score}/75</p>
            <p className="text-xs text-muted-foreground">Best Score</p>
          </CardContent>
        </Card>
      </div>

      {/* History list */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <History className="h-5 w-5" />
            Pitch History
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {attempts.map((attempt, index) => {
            const investor = INVESTORS.find(i => i.id === attempt.investor_persona);
            const isBest = attempt.id === bestAttempt.id;
            
            return (
              <div
                key={attempt.id}
                className={cn(
                  "flex items-center gap-4 p-3 rounded-lg border transition-colors hover:bg-muted/50",
                  isBest && "border-amber-500/50 bg-amber-500/5"
                )}
              >
                <span className="text-2xl">{investor?.emoji || "🎤"}</span>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium truncate">
                      {investor?.name || "Unknown"}
                    </span>
                    {isBest && (
                      <Badge className="bg-amber-500 text-white text-xs">
                        <Trophy className="h-3 w-3 mr-1" />
                        Best
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(attempt.created_at), "MMM d, yyyy")}
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold">{attempt.score}/75</p>
                  <p className="text-xs text-primary">+{attempt.total_xp_earned} XP</p>
                </div>

                {onViewDetails && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDetails(attempt)}
                  >
                    View
                  </Button>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
