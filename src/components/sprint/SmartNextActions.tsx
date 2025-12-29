import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Eye, BarChart3, RotateCcw, ChevronRight, 
  MessageCircle, Flame, User, Home
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SmartNextActionsProps {
  score: number;
  streak?: number;
  roleType?: string | null;
  onReviewResponse: () => void;
  onBonusRound: () => void;
  showResponseReview: boolean;
}

export function SmartNextActions({ 
  score, 
  streak = 0, 
  roleType, 
  onReviewResponse, 
  onBonusRound,
  showResponseReview 
}: SmartNextActionsProps) {
  const navigate = useNavigate();
  
  // Build smart actions based on context
  const getActions = () => {
    const actions = [];
    
    // Always show review response
    actions.push({
      key: 'review',
      label: showResponseReview ? 'Hide Response' : 'Review Response',
      icon: Eye,
      onClick: onReviewResponse,
      variant: 'outline' as const,
      className: ''
    });
    
    // Low score: suggest help
    if (score < 60) {
      actions.push({
        key: 'coach',
        label: 'Get Help from Coach',
        icon: MessageCircle,
        onClick: () => navigate('/dashboard/coach'),
        variant: 'outline' as const,
        className: 'border-blue-500/30 text-blue-400 hover:bg-blue-500/10'
      });
    }
    
    // Has streak: encourage keeping it
    if (streak > 1) {
      actions.push({
        key: 'stats',
        label: `${streak} Day Streak! View Stats`,
        icon: Flame,
        onClick: () => navigate('/dashboard/sprint/tracks'),
        variant: 'outline' as const,
        className: 'border-orange-500/30 text-orange-400 hover:bg-orange-500/10'
      });
    } else {
      // No streak emphasis: just show stats
      actions.push({
        key: 'stats',
        label: 'View My Stats',
        icon: BarChart3,
        onClick: () => navigate('/dashboard/sprint/tracks'),
        variant: 'outline' as const,
        className: ''
      });
    }
    
    // Role-based: suggest another role challenge
    if (roleType) {
      actions.push({
        key: 'bonus-role',
        label: `Try Another ${roleType} Challenge`,
        icon: User,
        onClick: onBonusRound,
        variant: 'outline' as const,
        className: 'border-purple-500/30 text-purple-400 hover:bg-purple-500/10'
      });
    } else {
      // Standard bonus round
      actions.push({
        key: 'bonus',
        label: 'Try Bonus Round',
        icon: RotateCcw,
        onClick: onBonusRound,
        variant: 'outline' as const,
        className: 'border-orange-500/30 text-orange-400 hover:bg-orange-500/10'
      });
    }
    
    // Primary: Back to Dashboard
    actions.push({
      key: 'dashboard',
      label: 'Back to Dashboard',
      icon: Home,
      onClick: () => navigate('/dashboard'),
      variant: 'default' as const,
      className: 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600'
    });
    
    return actions;
  };
  
  const actions = getActions();
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="flex flex-wrap justify-center gap-3"
    >
      {actions.map((action, index) => {
        const Icon = action.icon;
        
        return (
          <motion.div
            key={action.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + index * 0.1 }}
          >
            <Button 
              variant={action.variant}
              onClick={action.onClick}
              className={`gap-2 ${action.className}`}
            >
              <Icon className="h-4 w-4" />
              {action.label}
              {action.key === 'dashboard' && <ChevronRight className="h-4 w-4" />}
            </Button>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
