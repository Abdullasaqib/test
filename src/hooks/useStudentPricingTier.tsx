import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useStudent } from "./useStudent";
import { PricingTier, PricingTierFeatures } from "./usePricingTiers";
import { useDemoMode } from "@/contexts/DemoContext";
import { DEMO_PRICING_TIER } from "@/data/demoData";

export type SubscriptionStatus = "active" | "trial" | "expired" | "cancelled";

export interface StudentPricingContext {
  tier: PricingTier | null;
  subscriptionStatus: SubscriptionStatus;
  isTrialActive: boolean;
  trialDaysLeft: number;
  canAccess: (feature: keyof PricingTier["features"]) => boolean;
  certificatesAvailable: string[];
  isLoading: boolean;
}

const defaultFeatures: PricingTierFeatures = {
  ai_coach_daily: 0,
  tank_weekly: 0,
  sprint_daily: 0,
  curriculum_access: "preview",
  case_studies: false,
  live_classes: false,
};

export function useStudentPricingTier(): StudentPricingContext {
  const { isDemoMode } = useDemoMode();
  const { student, loading: studentLoading } = useStudent();

  const { data: tier, isLoading: tierLoading } = useQuery({
    queryKey: ["student-pricing-tier", student?.pricing_tier_id, isDemoMode],
    queryFn: async () => {
      // Return demo tier in demo mode
      if (isDemoMode) {
        return DEMO_PRICING_TIER as PricingTier;
      }

      if (!student?.pricing_tier_id) return null;

      const { data, error } = await supabase
        .from("pricing_tiers")
        .select("*")
        .eq("id", student.pricing_tier_id)
        .single();

      if (error) return null;

      return {
        ...data,
        type: data.type as "b2c" | "b2b",
        billing_period: (data.billing_period || "one-time") as "one-time" | "monthly" | "yearly",
        features: ((data.features as unknown) || defaultFeatures) as PricingTierFeatures,
        certificates_included: data.certificates_included || [],
        current_price: data.current_price ?? 0,
        upfront_price: data.upfront_price ?? 0,
        duration_months: data.duration_months ?? 1,
        trial_days: data.trial_days ?? 0,
        is_featured: data.is_featured || data.badge_text === "RECOMMENDED",
      } as PricingTier;
    },
    enabled: isDemoMode || !!student?.pricing_tier_id,
  });

  // Demo mode returns active subscription
  if (isDemoMode) {
    return {
      tier: DEMO_PRICING_TIER as PricingTier,
      subscriptionStatus: "active",
      isTrialActive: false,
      trialDaysLeft: 0,
      canAccess: () => true, // Demo mode has full access
      certificatesAvailable: DEMO_PRICING_TIER.certificates_included,
      isLoading: false,
    };
  }

  // Safe defaults for non-authenticated users
  const subscriptionStatus = (student?.subscription_status || "active") as SubscriptionStatus;
  
  const trialEndsAt = student?.trial_ends_at ? new Date(student.trial_ends_at) : null;
  const now = new Date();
  const isTrialActive = subscriptionStatus === "trial" && trialEndsAt ? trialEndsAt > now : false;
  const trialDaysLeft = trialEndsAt && isTrialActive 
    ? Math.ceil((trialEndsAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const canAccess = (feature: keyof PricingTierFeatures): boolean => {
    // No tier means no access (public user or loading)
    if (!tier) return false;
    
    // If trial expired, no access to most features
    if (subscriptionStatus === "expired" || subscriptionStatus === "cancelled") {
      return false;
    }

    const featureValue = tier.features?.[feature];
    if (typeof featureValue === "boolean") return featureValue;
    if (typeof featureValue === "number") return featureValue !== 0;
    if (featureValue === "full") return true;
    if (featureValue === "preview") return true; // Limited access
    return false;
  };

  return {
    tier,
    subscriptionStatus,
    isTrialActive,
    trialDaysLeft,
    canAccess,
    certificatesAvailable: tier?.certificates_included || [],
    isLoading: studentLoading || tierLoading,
  };
}
