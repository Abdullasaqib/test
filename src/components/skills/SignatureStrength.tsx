import { Card, CardContent } from "@/components/ui/card";
import { Star, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface SignatureStrengthProps {
  name: string;
  description: string | null;
  icon: string;
  score: number;
}

export function SignatureStrength({ name, description, icon, score }: SignatureStrengthProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="relative overflow-hidden border-primary/50 bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-3xl">
                {icon}
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center">
                <Star className="w-4 h-4 text-white fill-white" />
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Your Signature Strength
                </span>
              </div>
              <h3 className="text-2xl font-bold">{name}</h3>
              {description && (
                <p className="text-muted-foreground leading-relaxed">
                  {description}
                </p>
              )}
              <div className="flex items-center gap-2 pt-2">
                <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-primary to-yellow-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
                <span className="font-bold text-lg">{score}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
