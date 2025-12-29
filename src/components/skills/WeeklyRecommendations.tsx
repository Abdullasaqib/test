import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rocket, BookOpen, Users, Target, ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface Recommendation {
  type: string;
  title: string;
  description: string;
  priority: string;
}

interface WeeklyRecommendationsProps {
  recommendations: Recommendation[];
}

const typeIcons: Record<string, React.ReactNode> = {
  challenge: <Rocket className="w-5 h-5" />,
  lesson: <BookOpen className="w-5 h-5" />,
  mentor_match: <Users className="w-5 h-5" />,
  team_role: <Target className="w-5 h-5" />,
};

const priorityColors: Record<string, string> = {
  high: 'bg-red-500/20 text-red-500 border-red-500/30',
  medium: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
  low: 'bg-green-500/20 text-green-500 border-green-500/30',
};

export function WeeklyRecommendations({ recommendations }: WeeklyRecommendationsProps) {
  if (!recommendations || recommendations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            Weekly Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-muted-foreground">
            <Rocket className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Analyze your skills to get personalized recommendations!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          Weekly Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  {typeIcons[rec.type] || <Rocket className="w-5 h-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold truncate">{rec.title}</h4>
                    <Badge variant="outline" className={priorityColors[rec.priority]}>
                      {rec.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {rec.description}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
