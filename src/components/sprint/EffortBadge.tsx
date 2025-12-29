import { motion } from "framer-motion";
import { Heart, Zap, Star, Rocket, Trophy } from "lucide-react";

interface EffortBadgeProps {
  score: number;
}

export function EffortBadge({ score }: EffortBadgeProps) {
  // Get effort-based encouragement
  const getEffortLevel = () => {
    if (score >= 85) {
      return {
        icon: Trophy,
        label: "FOUNDER MATERIAL",
        subtext: "You crushed it! 🔥",
        gradient: "from-yellow-500 to-amber-500",
        bgGradient: "from-yellow-500/20 to-amber-500/20",
        border: "border-yellow-500/30",
        iconColor: "text-yellow-400"
      };
    }
    if (score >= 70) {
      return {
        icon: Star,
        label: "SOLID THINKING",
        subtext: "You're on the right track!",
        gradient: "from-green-500 to-emerald-500",
        bgGradient: "from-green-500/20 to-emerald-500/20",
        border: "border-green-500/30",
        iconColor: "text-green-400"
      };
    }
    if (score >= 50) {
      return {
        icon: Zap,
        label: "YOU'RE LEARNING",
        subtext: "Every founder started here!",
        gradient: "from-blue-500 to-cyan-500",
        bgGradient: "from-blue-500/20 to-cyan-500/20",
        border: "border-blue-500/30",
        iconColor: "text-blue-400"
      };
    }
    return {
      icon: Heart,
      label: "GROWTH MINDSET",
      subtext: "Failures are lessons in disguise",
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-500/20 to-rose-500/20",
      border: "border-pink-500/30",
      iconColor: "text-pink-400"
    };
  };
  
  const effort = getEffortLevel();
  const Icon = effort.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`
        inline-flex flex-col items-center gap-2 
        bg-gradient-to-br ${effort.bgGradient} 
        rounded-2xl px-6 py-4 
        border ${effort.border}
      `}
    >
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: score >= 70 ? [0, 5, -5, 0] : 0
        }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`p-3 rounded-full bg-gradient-to-br ${effort.gradient}`}
      >
        <Icon className="h-6 w-6 text-white" />
      </motion.div>
      
      <div className="text-center">
        <motion.div 
          className={`font-black text-sm tracking-wider bg-gradient-to-r ${effort.gradient} bg-clip-text text-transparent`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {effort.label}
        </motion.div>
        <motion.p 
          className="text-xs text-muted-foreground mt-0.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {effort.subtext}
        </motion.p>
      </div>
      
      {/* Growth points for low scores */}
      {score < 60 && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-xs bg-background/50 px-3 py-1 rounded-full text-pink-400"
        >
          +10 Growth Points
        </motion.div>
      )}
    </motion.div>
  );
}
