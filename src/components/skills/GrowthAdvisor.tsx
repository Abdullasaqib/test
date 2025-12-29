import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Target, Brain, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface GrowthAdvisorProps {
  tips: string[];
  learningStyle: string | null;
  teamRole: string | null;
}

const tipIcons = [
  <Lightbulb className="w-5 h-5" />,
  <Target className="w-5 h-5" />,
  <Brain className="w-5 h-5" />,
];

export function GrowthAdvisor({ tips, learningStyle, teamRole }: GrowthAdvisorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          Growth Advisor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {tips?.map((tip, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border/50"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
              {tipIcons[index] || tipIcons[0]}
            </div>
            <p className="text-sm leading-relaxed">{tip}</p>
          </motion.div>
        ))}

        {(learningStyle || teamRole) && (
          <div className="pt-4 border-t border-border space-y-3">
            {learningStyle && (
              <div className="flex items-center gap-2 text-sm">
                <Brain className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Learning Style:</span>
                <span className="font-medium">{learningStyle}</span>
              </div>
            )}
            {teamRole && (
              <div className="flex items-center gap-2 text-sm">
                <Target className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Best Team Role:</span>
                <span className="font-medium">{teamRole}</span>
              </div>
            )}
          </div>
        )}

        {tips?.length === 0 && (
          <div className="text-center py-6 text-muted-foreground">
            <Lightbulb className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Complete more missions to unlock personalized growth tips!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
