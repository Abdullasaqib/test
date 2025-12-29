import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type CaseStudy = Tables<"case_studies">;

export type StoryDepth = "quick" | "full" | "all";

interface UseCaseStudiesOptions {
  program?: string;
  depth?: StoryDepth;
}

export function useCaseStudies(options: UseCaseStudiesOptions = {}) {
  const { program, depth = "all" } = options;

  return useQuery({
    queryKey: ["case-studies", program, depth],
    queryFn: async () => {
      let query = supabase
        .from("case_studies")
        .select("*")
        .eq("is_published", true)
        .order("is_featured", { ascending: false })
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (program) {
        query = query.eq("program", program);
      }

      if (depth !== "all") {
        query = query.eq("story_depth", depth);
      }

      const { data, error } = await query;

      if (error) throw error;

      return (data || []) as CaseStudy[];
    },
  });
}

export function useCaseStudy(slug: string) {
  return useQuery({
    queryKey: ["case-study", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) throw error;

      return data as CaseStudy;
    },
    enabled: !!slug,
  });
}

// Helper hooks for common patterns
export function useFeaturedCaseStudies() {
  return useQuery({
    queryKey: ["case-studies", "featured"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .eq("is_published", true)
        .eq("is_featured", true)
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (error) throw error;

      return (data || []) as CaseStudy[];
    },
  });
}

export function useProjectOfWeek() {
  return useQuery({
    queryKey: ["case-studies", "project-of-week"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .eq("is_published", true)
        .eq("is_project_of_week", true)
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      return data as CaseStudy | null;
    },
  });
}
