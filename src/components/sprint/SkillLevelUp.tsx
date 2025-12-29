import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Star } from "lucide-react";

interface SkillLevelUpProps {
  skills: string[];
  animate?: boolean;
}

// Skill colors for visual variety
const skillColors: Record<string, { bg: string; text: string; glow: string }> = {
  "Problem Solving": { bg: "bg-purple-500/20", text: "text-purple-400", glow: "shadow-purple-500/30" },
  "Critical Thinking": { bg: "bg-blue-500/20", text: "text-blue-400", glow: "shadow-blue-500/30" },
  "Decision Making": { bg: "bg-amber-500/20", text: "text-amber-400", glow: "shadow-amber-500/30" },
  "Communication": { bg: "bg-green-500/20", text: "text-green-400", glow: "shadow-green-500/30" },
  "Creativity": { bg: "bg-pink-500/20", text: "text-pink-400", glow: "shadow-pink-500/30" },
  "Leadership": { bg: "bg-orange-500/20", text: "text-orange-400", glow: "shadow-orange-500/30" },
  "Financial Literacy": { bg: "bg-emerald-500/20", text: "text-emerald-400", glow: "shadow-emerald-500/30" },
  "Marketing": { bg: "bg-cyan-500/20", text: "text-cyan-400", glow: "shadow-cyan-500/30" },
  "Negotiation": { bg: "bg-red-500/20", text: "text-red-400", glow: "shadow-red-500/30" },
  "Strategic Thinking": { bg: "bg-indigo-500/20", text: "text-indigo-400", glow: "shadow-indigo-500/30" },
};

const getSkillColor = (skill: string) => {
  return skillColors[skill] || { bg: "bg-primary/20", text: "text-primary", glow: "shadow-primary/30" };
};

export function SkillLevelUp({ skills, animate = true }: SkillLevelUpProps) {
  if (!skills || skills.length === 0) return null;
  
  return (
    <div className="space-y-3">
      <motion.h3 
        className="text-sm font-semibold flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Sparkles className="h-4 w-4 text-yellow-400" />
        Skills Unlocked
      </motion.h3>
      
      <div className="flex flex-wrap justify-center gap-2">
        {skills.map((skill, index) => {
          const colors = getSkillColor(skill);
          
          return (
            <motion.div
              key={skill}
              initial={animate ? { scale: 0, opacity: 0 } : {}}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                delay: animate ? 0.1 + index * 0.15 : 0, 
                type: "spring", 
                bounce: 0.5 
              }}
              className={`
                relative group
                ${colors.bg} ${colors.text}
                px-4 py-2 rounded-full
                border border-current/20
                font-medium text-sm
                flex items-center gap-2
                ${animate ? `shadow-lg ${colors.glow}` : ''}
              `}
            >
              {/* Glow effect on animate */}
              {animate && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-current opacity-20 blur-md"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
              
              <motion.div
                animate={animate ? { rotate: [0, 15, -15, 0] } : {}}
                transition={{ delay: 0.3 + index * 0.15, duration: 0.5 }}
              >
                <Star className="h-3.5 w-3.5" />
              </motion.div>
              
              <span className="relative z-10">{skill}</span>
              
              {/* Level up indicator */}
              {animate && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.15 }}
                  className="flex items-center gap-0.5"
                >
                  <TrendingUp className="h-3 w-3" />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
