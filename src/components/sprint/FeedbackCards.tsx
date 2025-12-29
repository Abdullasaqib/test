import { motion } from "framer-motion";
import { Star, Lightbulb, Rocket, Heart, Brain, Target } from "lucide-react";

interface StructuredFeedback {
  praise: string;
  insight: string;
  next_challenge: string;
}

interface FeedbackCardsProps {
  feedback: StructuredFeedback | string;
  score: number;
}

export function FeedbackCards({ feedback, score }: FeedbackCardsProps) {
  // Handle both structured and legacy string feedback
  const structured: StructuredFeedback = typeof feedback === 'string' 
    ? {
        praise: feedback,
        insight: "",
        next_challenge: ""
      }
    : feedback;
  
  // Only show cards that have content
  const cards = [
    {
      key: 'praise',
      icon: score >= 70 ? Star : Heart,
      title: score >= 70 ? "GREAT JOB!" : "NICE EFFORT!",
      content: structured.praise,
      gradient: "from-green-500/20 to-emerald-500/20",
      border: "border-green-500/30",
      iconColor: "text-green-400"
    },
    {
      key: 'insight',
      icon: Lightbulb,
      title: "FOUNDER TIP",
      content: structured.insight,
      gradient: "from-blue-500/20 to-cyan-500/20",
      border: "border-blue-500/30",
      iconColor: "text-blue-400"
    },
    {
      key: 'next',
      icon: Rocket,
      title: "LEVEL UP",
      content: structured.next_challenge,
      gradient: "from-purple-500/20 to-pink-500/20",
      border: "border-purple-500/30",
      iconColor: "text-purple-400"
    }
  ].filter(card => card.content && card.content.trim().length > 0);
  
  // If we only have the praise (legacy string format), show single card
  if (cards.length === 1) {
    const card = cards[0];
    const Icon = card.icon;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-gradient-to-br ${card.gradient} rounded-xl p-5 border ${card.border}`}
      >
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg bg-background/50 ${card.iconColor}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-sm mb-1">{card.title}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{card.content}</p>
          </div>
        </div>
      </motion.div>
    );
  }
  
  // Show the visual 3-card layout
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {cards.map((card, index) => {
        const Icon = card.icon;
        
        return (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.1 * index }}
            className={`bg-gradient-to-br ${card.gradient} rounded-xl p-4 border ${card.border} text-center`}
          >
            <motion.div 
              className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-background/50 ${card.iconColor} mb-3`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 + 0.1 * index, type: "spring", bounce: 0.5 }}
            >
              <Icon className="h-5 w-5" />
            </motion.div>
            <h4 className="font-bold text-xs tracking-wider mb-2 text-foreground/80">{card.title}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{card.content}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
