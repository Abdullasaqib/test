import { useState, useEffect, useCallback } from "react";
import { useStudent } from "@/hooks/useStudent";
import { supabase } from "@/integrations/supabase/client";

export type AIFeature = "ai_coach" | "stuck_prompt";

interface RateLimitStatus {
  allowed: boolean;
  reason?: string;
  limit?: number;
  used?: number;
  resets_in?: string;
  daily_remaining?: number;
  weekly_remaining?: number;
  monthly_remaining?: number;
}

interface UsageStats {
  feature: string;
  daily_count: number;
  weekly_count: number;
  monthly_count: number;
  daily_limit: number;
  weekly_limit: number;
  monthly_limit: number;
}

export function useAIUsage() {
  const { student } = useStudent();
  const [loading, setLoading] = useState(false);
  const [usageStats, setUsageStats] = useState<UsageStats[]>([]);

  // Fetch usage stats for all features
  const fetchUsageStats = useCallback(async () => {
    if (!student?.id) return;

    setLoading(true);
    try {
      // Get rate limits
      const { data: limits } = await supabase
        .from("ai_rate_limits")
        .select("*")
        .eq("is_active", true);

      // Get usage counts
      const now = new Date();
      const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();

      const { data: usage } = await supabase
        .from("student_ai_usage")
        .select("feature, created_at")
        .eq("student_id", student.id)
        .gte("created_at", monthAgo);

      const stats: UsageStats[] = (limits || []).map((limit) => {
        const featureUsage = (usage || []).filter((u) => u.feature === limit.feature);
        return {
          feature: limit.feature,
          daily_count: featureUsage.filter((u) => u.created_at >= dayAgo).length,
          weekly_count: featureUsage.filter((u) => u.created_at >= weekAgo).length,
          monthly_count: featureUsage.length,
          daily_limit: limit.daily_limit,
          weekly_limit: limit.weekly_limit,
          monthly_limit: limit.monthly_limit,
        };
      });

      setUsageStats(stats);
    } catch (error) {
      console.error("Error fetching usage stats:", error);
    } finally {
      setLoading(false);
    }
  }, [student?.id]);

  useEffect(() => {
    fetchUsageStats();
  }, [fetchUsageStats]);

  // Check rate limit for a specific feature
  const checkRateLimit = useCallback(
    async (feature: AIFeature): Promise<RateLimitStatus> => {
      if (!student?.id) {
        return { allowed: false, reason: "not_authenticated" };
      }

      try {
        const { data, error } = await supabase.rpc("check_ai_rate_limit", {
          p_student_id: student.id,
          p_feature: feature,
        });

        if (error) {
          console.error("Error checking rate limit:", error);
          // Allow if check fails (fail open for better UX)
          return { allowed: true };
        }

        return data as unknown as RateLimitStatus;
      } catch (error) {
        console.error("Error checking rate limit:", error);
        return { allowed: true };
      }
    },
    [student?.id]
  );

  // Record AI usage
  const recordUsage = useCallback(
    async (
      feature: AIFeature,
      tokensInput: number = 0,
      tokensOutput: number = 0
    ): Promise<boolean> => {
      if (!student?.id) return false;

      try {
        const { error } = await supabase.from("student_ai_usage").insert({
          student_id: student.id,
          feature,
          tokens_input: tokensInput,
          tokens_output: tokensOutput,
        });

        if (error) {
          console.error("Error recording usage:", error);
          return false;
        }

        // Refresh stats
        await fetchUsageStats();
        return true;
      } catch (error) {
        console.error("Error recording usage:", error);
        return false;
      }
    },
    [student?.id, fetchUsageStats]
  );

  // Get stats for a specific feature
  const getFeatureStats = useCallback(
    (feature: AIFeature): UsageStats | undefined => {
      return usageStats.find((s) => s.feature === feature);
    },
    [usageStats]
  );

  // Get remaining uses for a feature (daily)
  const getRemainingDaily = useCallback(
    (feature: AIFeature): number => {
      const stats = getFeatureStats(feature);
      if (!stats) return 0;
      return Math.max(0, stats.daily_limit - stats.daily_count);
    },
    [getFeatureStats]
  );

  return {
    loading,
    usageStats,
    checkRateLimit,
    recordUsage,
    getFeatureStats,
    getRemainingDaily,
    refreshStats: fetchUsageStats,
  };
}
