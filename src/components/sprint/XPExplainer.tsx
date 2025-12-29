import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Zap, Info } from "lucide-react";
import { motion } from "framer-motion";

interface XPExplainerProps {
  xpEarned: number;
  score: number;
  baseXP: number;
}

export function XPExplainer({ xpEarned, score, baseXP }: XPExplainerProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", bounce: 0.6 }}
            className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-400 px-5 py-2.5 rounded-full cursor-help group"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Zap className="h-5 w-5" />
            </motion.div>
            <span className="font-bold text-lg">+{xpEarned} XP Earned</span>
            <Info className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs p-4">
          <div className="space-y-2 text-sm">
            <p className="font-semibold">How XP is calculated:</p>
            <div className="bg-muted rounded-lg p-3 font-mono text-xs">
              <div className="flex justify-between">
                <span>Your Score:</span>
                <span className="text-yellow-400">{score}/100</span>
              </div>
              <div className="flex justify-between">
                <span>Challenge Base XP:</span>
                <span>{baseXP} XP</span>
              </div>
              <div className="border-t border-border my-2" />
              <div className="flex justify-between font-semibold">
                <span>{score}/100 × {baseXP} =</span>
                <span className="text-yellow-400">{xpEarned} XP</span>
              </div>
            </div>
            <p className="text-muted-foreground text-xs">
              Score higher to earn more XP! A perfect 100 = {baseXP} XP.
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
