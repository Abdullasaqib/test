import { motion } from "framer-motion";
import { RoleBadge, FOUNDER_ROLES } from "./RoleBadge";

interface RoleAchievementProps {
  roleType: string;
  roleFeedback?: string;
  score: number;
}

export function RoleAchievement({ roleType, roleFeedback, score }: RoleAchievementProps) {
  const role = FOUNDER_ROLES[roleType as keyof typeof FOUNDER_ROLES];
  
  if (!role) return null;
  
  // Get performance level based on score
  const getPerformanceLevel = () => {
    if (score >= 85) return { label: "Expert", color: "text-yellow-400", stars: 3 };
    if (score >= 70) return { label: "Skilled", color: "text-green-400", stars: 2 };
    if (score >= 50) return { label: "Learning", color: "text-blue-400", stars: 1 };
    return { label: "Practicing", color: "text-muted-foreground", stars: 0 };
  };
  
  const performance = getPerformanceLevel();
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-xl p-5 border border-indigo-500/20"
    >
      <div className="flex items-center gap-4">
        {/* Large Role Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
          className="relative"
        >
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
            style={{ backgroundColor: `${role.color}20`, border: `2px solid ${role.color}40` }}
          >
            {role.emoji}
          </div>
          
          {/* Performance stars */}
          <motion.div 
            className="absolute -bottom-1 -right-1 flex gap-0.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {[...Array(3)].map((_, i) => (
              <span 
                key={i} 
                className={`text-xs ${i < performance.stars ? 'text-yellow-400' : 'text-muted-foreground/30'}`}
              >
                ★
              </span>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold">{role.title}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full bg-background/50 ${performance.color}`}>
              {performance.label}
            </span>
          </div>
          
          {roleFeedback ? (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {roleFeedback}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              You stepped into the {role.title} role for this challenge!
            </p>
          )}
        </div>
      </div>
      
      {/* XP Bonus indicator */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-3 inline-flex items-center gap-2 text-xs bg-yellow-500/10 text-yellow-400 px-3 py-1.5 rounded-full"
      >
        <span className="font-medium">+5 {role.title} Experience</span>
      </motion.div>
    </motion.div>
  );
}
