import { useState, useCallback } from "react";
import { useStudent } from "@/hooks/useStudent";
import { useStudentPricingTier } from "@/hooks/useStudentPricingTier";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type TasteFeature = "coach" | "tank";

interface TasteLimitResult {
  canUse: boolean;
  usedCount: number;
  totalAllowed: number;
  isFreeTier: boolean;
  incrementUsage: () => Promise<boolean>;
}

export function useTasteLimit(feature: TasteFeature): TasteLimitResult {
  const { student, refetch } = useStudent();
  const { tier } = useStudentPricingTier();
  const [isUpdating, setIsUpdating] = useState(false);

  // Check if user is on free tier
  const isFreeTier = tier?.slug === "free-foundations" || !tier;

  // Get taste limits from tier features
  const totalAllowed = feature === "coach" 
    ? (tier?.features as any)?.ai_coach_total ?? 5
    : (tier?.features as any)?.tank_total ?? 2;

  // Get current usage from student record
  const usedCount = feature === "coach"
    ? (student as any)?.free_coach_uses ?? 0
    : (student as any)?.free_tank_uses ?? 0;

  // Free tier users have limited total uses
  // Paid tier users have daily/weekly limits handled elsewhere
  const canUse = isFreeTier ? usedCount < totalAllowed : true;

  const incrementUsage = useCallback(async (): Promise<boolean> => {
    if (!student?.id || !isFreeTier) return true;
    if (usedCount >= totalAllowed) return false;

    setIsUpdating(true);
    try {
      const column = feature === "coach" ? "free_coach_uses" : "free_tank_uses";
      const { error } = await supabase
        .from("students")
        .update({ [column]: usedCount + 1 })
        .eq("id", student.id);

      if (error) throw error;
      
      await refetch();
      return true;
    } catch (error) {
      console.error("Failed to increment taste usage:", error);
      toast.error("Failed to update usage");
      return false;
    } finally {
      setIsUpdating(false);
    }
  }, [student?.id, isFreeTier, usedCount, totalAllowed, feature, refetch]);

  return {
    canUse,
    usedCount,
    totalAllowed,
    isFreeTier,
    incrementUsage,
  };
}