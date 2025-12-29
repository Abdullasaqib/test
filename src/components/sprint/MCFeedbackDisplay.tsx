import { motion } from "framer-motion";
import { CheckCircle2, Users, MessageCircle } from "lucide-react";

interface MCOption {
  id: string;
  text: string;
}

interface MCFeedbackDisplayProps {
  options: MCOption[];
  selectedOption: string;
  reasoning: string;
}

export function MCFeedbackDisplay({ options, selectedOption, reasoning }: MCFeedbackDisplayProps) {
  if (!options || options.length === 0) return null;
  
  // Simulated social proof (in production would come from real data)
  const getPopularity = (optionId: string) => {
    const base = { A: 35, B: 25, C: 25, D: 15 };
    return base[optionId as keyof typeof base] || 25;
  };
  
  const mostPopular = options.reduce((a, b) => 
    getPopularity(a.id) > getPopularity(b.id) ? a : b
  );
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-slate-500/5 to-slate-500/10 rounded-xl p-5 border border-slate-500/20"
    >
      <h4 className="text-sm font-semibold mb-4 flex items-center gap-2">
        <MessageCircle className="h-4 w-4 text-blue-400" />
        Your Decision
      </h4>
      
      {/* Show all options with selection highlighted */}
      <div className="space-y-2 mb-4">
        {options.map((option) => {
          const isSelected = option.id === selectedOption;
          const popularity = getPopularity(option.id);
          
          return (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: options.indexOf(option) * 0.1 }}
              className={`
                relative rounded-lg p-3 border transition-all
                ${isSelected 
                  ? 'bg-green-500/10 border-green-500/30' 
                  : 'bg-background/30 border-border/50 opacity-60'
                }
              `}
            >
              <div className="flex items-start gap-3">
                {/* Option letter badge */}
                <div className={`
                  w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0
                  ${isSelected ? 'bg-green-500/30 text-green-400' : 'bg-muted text-muted-foreground'}
                `}>
                  {option.id}
                </div>
                
                {/* Option text */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {option.text}
                  </p>
                </div>
                
                {/* Selected indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                  </motion.div>
                )}
              </div>
              
              {/* Popularity bar (subtle) */}
              {isSelected && (
                <motion.div 
                  className="mt-2 flex items-center gap-2 text-xs text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Users className="h-3 w-3" />
                  <span>{popularity}% of founders chose this</span>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
      
      {/* Reasoning mirror */}
      {reasoning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-background/50 rounded-lg p-3 border border-border/50"
        >
          <p className="text-xs text-muted-foreground mb-1.5 font-medium">Your reasoning:</p>
          <p className="text-sm text-foreground/80 italic">"{reasoning}"</p>
        </motion.div>
      )}
      
      {/* Social proof */}
      {mostPopular.id !== selectedOption && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-3 text-xs text-muted-foreground text-center"
        >
          Most founders chose Option {mostPopular.id} — but there's no single "right" answer!
        </motion.p>
      )}
    </motion.div>
  );
}
