import { Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useStudentPricingTier } from "@/hooks/useStudentPricingTier";

export function TrialBanner() {
  const navigate = useNavigate();
  const { isTrialActive, trialDaysLeft, subscriptionStatus } = useStudentPricingTier();

  if (subscriptionStatus === "expired") {
    return (
      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-destructive" />
          <div>
            <p className="font-semibold text-destructive">Your trial has ended</p>
            <p className="text-sm text-muted-foreground">
              Upgrade now to continue your founder journey
            </p>
          </div>
        </div>
        <Button onClick={() => navigate("/pricing")} variant="destructive">
          Upgrade Now
        </Button>
      </div>
    );
  }

  if (!isTrialActive || trialDaysLeft <= 0) return null;

  const urgency = trialDaysLeft <= 3 ? "high" : trialDaysLeft <= 7 ? "medium" : "low";

  return (
    <div 
      className={`rounded-lg p-4 flex items-center justify-between ${
        urgency === "high" 
          ? "bg-destructive/10 border border-destructive/20" 
          : urgency === "medium"
          ? "bg-amber-500/10 border border-amber-500/20"
          : "bg-primary/10 border border-primary/20"
      }`}
    >
      <div className="flex items-center gap-3">
        <Sparkles className={`h-5 w-5 ${
          urgency === "high" 
            ? "text-destructive" 
            : urgency === "medium"
            ? "text-amber-500"
            : "text-primary"
        }`} />
        <div>
          <p className="font-semibold">
            {trialDaysLeft === 1 
              ? "Last day of your trial!" 
              : `${trialDaysLeft} days left in your trial`}
          </p>
          <p className="text-sm text-muted-foreground">
            Upgrade to keep full access after your trial ends
          </p>
        </div>
      </div>
      <Button 
        onClick={() => navigate("/pricing")}
        variant={urgency === "high" ? "destructive" : "default"}
      >
        Upgrade Now
      </Button>
    </div>
  );
}
