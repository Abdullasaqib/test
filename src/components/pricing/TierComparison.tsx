import { Check, X } from "lucide-react";
import { PricingTier, PricingTierFeatures } from "@/hooks/usePricingTiers";
import { cn } from "@/lib/utils";

interface TierComparisonProps {
  tiers: PricingTier[];
}

const featureRows = [
  { key: "ai_foundations_cert", label: "AI Foundations Certificate" },
  { key: "ai_builder_cert", label: "AI Builder Certificate" },
  { key: "ai_launcher_cert", label: "AI Launcher Certificate" },
  { key: "curriculum", label: "Full Curriculum Access" },
  { key: "sprint", label: "Daily Sprint Challenges 🔥" },
  { key: "ai_coach", label: "AI Coach" },
  { key: "tank", label: "THE TANK Pitch Practice" },
  { key: "case_studies", label: "Case Studies Library" },
  { key: "live_classes", label: "Live Group Classes" },
  { key: "mentor", label: "Dedicated Mentor" },
  { key: "support", label: "Priority Support" },
];

const getFeatureValue = (tier: PricingTier, key: string): string | boolean => {
  const features = (tier.features || {}) as PricingTierFeatures;
  
  switch (key) {
    case "ai_foundations_cert":
      return tier.certificates_included?.includes('prompt-engineering-fundamentals') || false;
    case "ai_builder_cert":
      return tier.certificates_included?.includes('ai-founders-certificate') || false;
    case "ai_launcher_cert":
      return tier.certificates_included?.includes('ai-launcher') || false;
    case "curriculum":
      return features.curriculum_access === 'full' ? true : features.curriculum_access === 'preview' ? 'Preview Only' : false;
    case "sprint":
      return features.sprint_daily === -1 ? 'Unlimited' : features.sprint_daily > 0 ? `${features.sprint_daily}/month` : false;
    case "ai_coach":
      return features.ai_coach_daily === -1 ? 'Unlimited' : `${features.ai_coach_daily}/day`;
    case "tank":
      return features.tank_weekly === -1 ? 'Unlimited' : `${features.tank_weekly}/week`;
    case "case_studies":
      return features.case_studies || false;
    case "live_classes":
      return features.live_classes || false;
    case "mentor":
      return features.mentor_access || false;
    case "support":
      return features.mentor_access ? '24h Response' : features.case_studies ? '48h Response' : '72h Response';
    default:
      return false;
  }
};

export const TierComparison = ({ tiers }: TierComparisonProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th className="py-4 px-4 text-left text-sm font-medium text-muted-foreground">
              Feature
            </th>
            {tiers.map((tier) => (
              <th
                key={tier.id}
                className={cn(
                  "py-4 px-4 text-center text-sm font-semibold",
                  tier.is_featured && "bg-primary/5"
                )}
              >
                <div>{tier.name}</div>
                <div className="mt-1 font-normal">
                  {tier.original_price && (
                    <span className="text-muted-foreground line-through text-xs mr-1">
                      ${tier.original_price}
                    </span>
                  )}
                  <span className="text-foreground">${tier.current_price}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {featureRows.map((row) => (
            <tr key={row.key} className="border-b border-border">
              <td className="py-3 px-4 text-sm text-foreground">{row.label}</td>
              {tiers.map((tier) => {
                const value = getFeatureValue(tier, row.key);
                return (
                  <td
                    key={tier.id}
                    className={cn(
                      "py-3 px-4 text-center",
                      tier.is_featured && "bg-primary/5"
                    )}
                  >
                    {typeof value === 'boolean' ? (
                      value ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-muted-foreground/30 mx-auto" />
                      )
                    ) : (
                      <span className="text-sm text-foreground">{value}</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
