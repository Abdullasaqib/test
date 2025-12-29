import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { PricingTier, PricingTierFeatures } from "@/hooks/usePricingTiers";

interface TierCardProps {
  tier: PricingTier;
  onSelect: (tier: PricingTier) => void;
  compact?: boolean;
}

export const TierCard = ({ tier, onSelect, compact = false }: TierCardProps) => {
  const features = (tier.features || {}) as PricingTierFeatures;
  const hasOriginalPrice = tier.original_price && tier.original_price > (tier.current_price ?? 0);

  const sprintLabel = features.sprint_daily === -1 
    ? 'Unlimited Daily Sprints 🔥' 
    : features.sprint_daily > 0 
      ? `${features.sprint_daily} Daily Sprints/month` 
      : null;

  const featureList = [
    { 
      label: "AI Foundations Certificate", 
      included: tier.certificates_included?.includes('prompt-engineering-fundamentals') 
    },
    { 
      label: "AI Builder Certificate", 
      included: tier.certificates_included?.includes('ai-founders-certificate') 
    },
    { 
      label: "AI Launcher Certificate", 
      included: tier.certificates_included?.includes('ai-launcher') 
    },
    { 
      label: tier.duration_months === 1 ? "1 Month Access" : `${tier.duration_months} Month Access`,
      included: true 
    },
    ...(sprintLabel ? [{ 
      label: sprintLabel,
      included: true,
      highlight: features.sprint_daily === -1
    }] : []),
    { 
      label: `AI Coach (${features.ai_coach_daily === -1 ? 'Unlimited' : features.ai_coach_daily + '/day'})`,
      included: features.ai_coach_daily > 0 || features.ai_coach_daily === -1
    },
    { 
      label: `THE TANK Pitch Practice (${features.tank_weekly === -1 ? 'Unlimited' : features.tank_weekly + '/week'})`,
      included: features.tank_weekly > 0 || features.tank_weekly === -1
    },
    { 
      label: "Case Studies Library",
      included: features.case_studies 
    },
    { 
      label: "Live Classes + Demo Day",
      included: features.live_classes 
    },
  ];

  const isLiveCohort = tier.slug === 'live-cohort';

  // Tier-specific taglines based on certificate progression
  // Database slugs: revolution-start, yearly-founder, live-cohort
  const tierTaglines: Record<string, string> = {
    'revolution-start': "Master AI prompting fundamentals. Earn your first certificate.",
    'yearly-founder': "Full 12-week curriculum. Build real products with AI.",
    'live-cohort': "Live mentorship + Demo Day with investors. Feb 2026.",
  };

  const tagline = tier.slug ? tierTaglines[tier.slug] : null;

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border bg-card p-6 transition-all h-full",
        tier.is_featured && "border-primary shadow-lg shadow-primary/20 scale-105",
        !tier.is_featured && "border-border hover:border-primary/50"
      )}
    >
      {/* Badge */}
      {tier.badge_text && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className={cn(
            "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold",
            tier.is_featured 
              ? "bg-primary text-primary-foreground" 
              : "bg-amber-500 text-white"
          )}>
            {tier.badge_text}
          </span>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6 pt-2">
        <h3 className="text-xl font-bold text-foreground">{tier.name}</h3>
        
        {/* Certificate Name - Clearly Visible */}
        <div className="mt-2">
          {tier.slug === 'revolution-start' && (
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              AI Foundations Certificate
            </span>
          )}
          {tier.slug === 'yearly-founder' && (
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              AI Foundations + AI Builder Certificates
            </span>
          )}
          {tier.slug === 'live-cohort' && (
            <div className="space-y-1">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                LAUNCH WITH MENTORS
              </span>
              <p className="text-xs text-muted-foreground">First cohort: Feb 2026</p>
            </div>
          )}
        </div>
        
        {/* Pricing */}
        <div className="mt-4">
          {hasOriginalPrice && (
            <span className="text-lg text-muted-foreground line-through mr-2">
              ${tier.original_price}
            </span>
          )}
          <span className="text-4xl font-bold text-foreground">
            ${tier.current_price}
          </span>
          {tier.billing_period === 'yearly' && tier.monthly_price && tier.monthly_price > 0 && (
            <div className="text-sm text-muted-foreground mt-1">
              or ${tier.monthly_price}/month
            </div>
          )}
          {tier.billing_period === 'one-time' && (
            <div className="text-sm text-muted-foreground mt-1">one-time</div>
          )}
          {tier.trial_days > 0 && (
            <div className="text-sm text-primary font-medium mt-1">
              {tier.trial_days}-day trial included
            </div>
          )}
        </div>
      </div>

      {/* Features */}
      {!compact && (
        <ul className="space-y-3 mb-6 flex-1">
          {featureList.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm">
              {feature.included ? (
                <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
              ) : (
                <X className="h-4 w-4 text-muted-foreground/50 flex-shrink-0" />
              )}
              <span className={cn(
                feature.included ? "text-foreground" : "text-muted-foreground/50",
                (feature as any).highlight && "font-semibold text-primary"
              )}>
                {feature.label}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* CTA */}
      <Button
        onClick={() => onSelect(tier)}
        className="w-full"
        variant={tier.is_featured ? "default" : "outline"}
        size="lg"
      >
        {tier.slug === 'revolution-start' ? 'Get AI Foundations' : 
         tier.slug === 'yearly-founder' ? 'Get AI Builder' : 
         tier.slug === 'live-cohort' ? 'Join AI Launcher' : 'Get Started'}
      </Button>
    </div>
  );
};
