import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, MessageCircle, Target, Zap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TasteExhaustedModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: "coach" | "tank";
  usedCount: number;
  totalAllowed: number;
}

export function TasteExhaustedModal({
  isOpen,
  onClose,
  feature,
  usedCount,
  totalAllowed,
}: TasteExhaustedModalProps) {
  const navigate = useNavigate();

  const featureConfig = {
    coach: {
      icon: MessageCircle,
      title: "You've tried the AI Coach",
      subtitle: "It helped, right?",
      description: "You've used all 5 of your free AI Coach messages. Upgrade to get personalized guidance every day.",
      benefit: "5 AI Coach messages daily",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    tank: {
      icon: Target,
      title: "You've practiced in THE TANK",
      subtitle: "Ready to level up?",
      description: "You've completed both of your free pitch practice sessions. Upgrade to keep building your pitch skills.",
      benefit: "2 Tank pitches weekly",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
  };

  const config = featureConfig[feature];
  const Icon = config.icon;

  const handleUpgrade = () => {
    onClose();
    navigate("/pricing");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-[#0d1117] border-border/50">
        <DialogHeader className="text-center">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${config.bgColor} flex items-center justify-center`}>
            <Icon className={`w-8 h-8 ${config.color}`} />
          </div>
          <DialogTitle className="text-2xl font-bold text-foreground">
            {config.title}
          </DialogTitle>
          <DialogDescription className="text-lg text-amber-400 font-medium">
            {config.subtitle}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <p className="text-muted-foreground text-center">
            {config.description}
          </p>

          {/* What you get */}
          <div className="bg-card/50 border border-border/30 rounded-lg p-4">
            <h4 className="text-foreground font-semibold mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Upgrade to BUILDER for just $19/year
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-blue-400" />
                5 AI Coach messages daily
              </li>
              <li className="flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-400" />
                2 Tank pitch practices weekly
              </li>
              <li className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                10 Daily Sprints
              </li>
            </ul>
          </div>

          {/* Price comparison */}
          <div className="text-center">
            <span className="text-white/50 line-through text-lg">$45</span>
            <span className="text-3xl font-bold text-amber-400 ml-3">$19</span>
            <span className="text-muted-foreground ml-2">/year</span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 border-border/50"
          >
            Maybe Later
          </Button>
          <Button
            onClick={handleUpgrade}
            className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold"
          >
            Upgrade Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}