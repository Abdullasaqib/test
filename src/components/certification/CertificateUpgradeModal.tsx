import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight, Lock, Zap, CheckCircle2, LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CertificateUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: {
    id: string;
    name: string;
    description: string;
    icon: LucideIcon;
    skills: string[];
    tierRequired: string | null;
    color: string;
    duration: string;
  } | null;
}

const tierInfo = {
  builder: {
    name: "AI Builder",
    price: "$99",
    period: "/year",
    benefits: [
      "Full 12-week curriculum access",
      "5 AI Coach messages daily",
      "2 Tank pitch practices weekly",
      "All certifications included",
    ],
  },
  full: {
    name: "AI Builder",
    price: "$99",
    period: "/year",
    benefits: [
      "Full 12-week curriculum access",
      "5 AI Coach messages daily",
      "2 Tank pitch practices weekly",
      "All certifications included",
    ],
  },
  accelerator: {
    name: "AI Launcher",
    price: "$290",
    period: " one-time",
    benefits: [
      "Live cohort experience",
      "Weekly mentor sessions",
      "Demo Day presentation",
      "Investor feedback",
    ],
  },
};

export function CertificateUpgradeModal({
  isOpen,
  onClose,
  certificate,
}: CertificateUpgradeModalProps) {
  const navigate = useNavigate();

  if (!certificate) return null;

  const Icon = certificate.icon;
  const tier = tierInfo[certificate.tierRequired as keyof typeof tierInfo] || tierInfo.builder;

  const colorClasses = {
    primary: {
      bg: "bg-primary/10",
      text: "text-primary",
    },
    purple: {
      bg: "bg-purple-500/10",
      text: "text-purple-500",
    },
    accent: {
      bg: "bg-purple-500/10",
      text: "text-purple-500",
    },
    yellow: {
      bg: "bg-amber-500/10",
      text: "text-amber-500",
    },
  }[certificate.color] || { bg: "bg-primary/10", text: "text-primary" };

  const handleUpgrade = () => {
    onClose();
    navigate("/pricing");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-background border-border/50">
        <DialogHeader className="text-center">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${colorClasses.bg} flex items-center justify-center relative`}>
            <Icon className={`w-8 h-8 ${colorClasses.text}`} />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-muted flex items-center justify-center">
              <Lock className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold text-foreground">
            {certificate.name}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {certificate.duration}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-4">
          <p className="text-muted-foreground text-center text-sm">
            {certificate.description}
          </p>

          {/* Skills Preview */}
          <div className="flex flex-wrap gap-1.5 justify-center">
            {certificate.skills.map((skill, i) => (
              <Badge key={i} variant="secondary" className="text-xs">
                <Zap className="h-3 w-3 mr-1 text-amber-500" />
                {skill}
              </Badge>
            ))}
          </div>

          {/* Upgrade Box */}
          <div className="bg-card/50 border border-border/30 rounded-lg p-4">
            <h4 className="text-foreground font-semibold mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Unlock with {tier.name}
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {tier.benefits.map((benefit, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* Price */}
          <div className="text-center">
            <span className="text-3xl font-bold text-amber-400">{tier.price}</span>
            <span className="text-muted-foreground ml-1">{tier.period}</span>
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
            Unlock Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
