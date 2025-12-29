import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface PricingTierFeatures {
  ai_coach_daily: number;
  tank_weekly: number;
  sprint_daily: number; // -1 = unlimited, 0 = none, positive = limit
  curriculum_access: "preview" | "full";
  case_studies: boolean;
  live_classes: boolean;
  mentor_access?: boolean;
  mentor?: boolean;
  school_dashboard?: boolean;
  priority_support?: boolean;
  custom_implementation?: boolean;
}

export interface PricingTier {
  id: string;
  name: string;
  slug: string;
  type: "b2c" | "b2b";
  tier_type: string;
  program: string;
  original_price: number | null;
  current_price: number;
  monthly_price: number | null;
  upfront_price: number;
  billing_period: "one-time" | "monthly" | "yearly";
  duration_months: number;
  trial_days: number;
  includes_yearly_access: boolean;
  certificates_included: string[];
  features: PricingTierFeatures;
  min_students: number | null;
  max_students: number | null;
  is_active: boolean;
  is_featured: boolean;
  badge_text: string | null;
  display_order: number;
}

export function usePricingTiers(type?: "b2c" | "b2b") {
  return useQuery({
    queryKey: ["pricing-tiers", type],
    queryFn: async () => {
      let query = supabase
        .from("pricing_tiers")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (type) {
        query = query.eq("type", type);
      }

      const { data, error } = await query;

      if (error) throw error;

      return (data || []).map((tier) => ({
        ...tier,
        type: tier.type as "b2c" | "b2b",
        billing_period: (tier.billing_period || "one-time") as "one-time" | "monthly" | "yearly",
        features: ((tier.features as unknown) || {
          ai_coach_daily: 0,
          tank_weekly: 0,
          sprint_daily: 0,
          curriculum_access: "preview",
          case_studies: false,
          live_classes: false,
        }) as PricingTierFeatures,
        certificates_included: tier.certificates_included || [],
        current_price: tier.current_price ?? 0,
        upfront_price: tier.upfront_price ?? 0,
        duration_months: tier.duration_months ?? 1,
        trial_days: tier.trial_days ?? 0,
        is_featured: tier.is_featured || tier.badge_text === "RECOMMENDED",
      })) as PricingTier[];
    },
  });
}

// Map friendly slugs to database slugs for backwards compatibility
const SLUG_ALIASES: Record<string, string> = {
  'ai-foundations': 'revolution-start',
  'ai-builder': 'yearly-founder',
  'ai-launcher': 'live-cohort',
  'first-step': 'revolution-start',
  'full-foundation': 'yearly-founder',
  'accelerator': 'live-cohort',
};

export function usePricingTier(slug: string | null | undefined) {
  return useQuery({
    queryKey: ["pricing-tier", slug],
    queryFn: async () => {
      if (!slug) return null;
      
      // Resolve alias to actual database slug
      const resolvedSlug = SLUG_ALIASES[slug] || slug;
      
      const { data, error } = await supabase
        .from("pricing_tiers")
        .select("*")
        .eq("slug", resolvedSlug)
        .maybeSingle();

      // Return null instead of throwing if not found
      if (error || !data) return null;

      return {
        ...data,
        type: data.type as "b2c" | "b2b",
        billing_period: (data.billing_period || "one-time") as "one-time" | "monthly" | "yearly",
        features: ((data.features as unknown) || {
          ai_coach_daily: 0,
          tank_weekly: 0,
          sprint_daily: 0,
          curriculum_access: "preview",
          case_studies: false,
          live_classes: false,
        }) as PricingTierFeatures,
        certificates_included: data.certificates_included || [],
        current_price: data.current_price ?? 0,
        upfront_price: data.upfront_price ?? 0,
        duration_months: data.duration_months ?? 1,
        trial_days: data.trial_days ?? 0,
        is_featured: data.is_featured || data.badge_text === "RECOMMENDED",
      } as PricingTier;
    },
    enabled: !!slug,
  });
}
