import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, Star, Zap } from "lucide-react";
import { ArchetypeBadge } from "./ArchetypeBadge";

interface SprintCelebrationProps {
  score: number;
  archetype?: string;
  xpEarned: number;
  onComplete: () => void;
}

export function SprintCelebration({ score, archetype, xpEarned, onComplete }: SprintCelebrationProps) {
  const [phase, setPhase] = useState<'confetti' | 'archetype' | 'xp' | 'done'>('confetti');
  
  const isGreatScore = score >= 70;
  
  // Get effort-based message
  const getEncouragementMessage = () => {
    if (score >= 85) return { emoji: "🚀", text: "FOUNDER MATERIAL!" };
    if (score >= 70) return { emoji: "⭐", text: "GREAT THINKING!" };
    if (score >= 50) return { emoji: "💪", text: "YOU'RE LEARNING!" };
    return { emoji: "🌱", text: "EVERY FOUNDER STARTS HERE!" };
  };
  
  const message = getEncouragementMessage();
  
  useEffect(() => {
    // Phase 1: Confetti burst (0-1.2s)
    if (isGreatScore) {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#eab308', '#22c55e', '#3b82f6', '#a855f7']
      });
    } else {
      // Gentler celebration for lower scores
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#eab308']
      });
    }
    
    // Phase 2: Archetype reveal (1.2s)
    const timer1 = setTimeout(() => setPhase('archetype'), 1200);
    
    // Phase 3: XP reveal (2.4s)
    const timer2 = setTimeout(() => setPhase('xp'), 2400);
    
    // Phase 4: Auto-dismiss (4s) or tap to skip
    const timer3 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 4000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isGreatScore, onComplete]);
  
  const handleSkip = () => {
    setPhase('done');
    onComplete();
  };
  
  if (phase === 'done') return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleSkip}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md cursor-pointer"
    >
      <AnimatePresence mode="wait">
        {/* Phase 1: Celebration Burst */}
        {phase === 'confetti' && (
          <motion.div
            key="confetti"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="text-center"
          >
            <motion.span 
              className="text-8xl block mb-4"
              animate={{ 
                rotate: [0, -10, 10, -5, 5, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 0.6 }}
            >
              {message.emoji}
            </motion.span>
            <motion.h1 
              className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-amber-400"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {message.text}
            </motion.h1>
          </motion.div>
        )}
        
        {/* Phase 2: Archetype Reveal */}
        {phase === 'archetype' && archetype && (
          <motion.div
            key="archetype"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.4 }}
            className="text-center"
          >
            <motion.p 
              className="text-xl text-muted-foreground mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              You thought like...
            </motion.p>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
            >
              <ArchetypeBadge archetype={archetype} size="lg" showDescription />
            </motion.div>
          </motion.div>
        )}
        
        {/* Phase 3: XP Earned */}
        {phase === 'xp' && (
          <motion.div
            key="xp"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="text-center"
          >
            <motion.div 
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl px-8 py-6 border border-yellow-500/30"
              animate={{ 
                boxShadow: ["0 0 20px rgba(245, 158, 11, 0.2)", "0 0 40px rgba(245, 158, 11, 0.4)", "0 0 20px rgba(245, 158, 11, 0.2)"]
              }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="h-10 w-10 text-yellow-400" />
              </motion.div>
              <div className="text-left">
                <motion.div 
                  className="text-4xl font-black text-yellow-400"
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ delay: 0.2 }}
                >
                  +{xpEarned} XP
                </motion.div>
                <p className="text-sm text-muted-foreground">Experience earned!</p>
              </div>
            </motion.div>
            
            <motion.p 
              className="mt-6 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Tap anywhere to continue
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Decorative floating elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: window.innerHeight + 100,
              rotate: 0
            }}
            animate={{ 
              y: -100,
              rotate: 360,
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {i % 2 === 0 ? (
              <Star className="h-6 w-6 text-yellow-400/40" />
            ) : (
              <Sparkles className="h-6 w-6 text-orange-400/40" />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
