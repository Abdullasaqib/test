import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useDemoMode } from "@/contexts/DemoContext";
import type { Tables } from "@/integrations/supabase/types";

type Student = Tables<"students">;

interface UseStudentReturn {
  student: Student | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useStudent(): UseStudentReturn {
  const { user, loading: authLoading } = useAuth();
  const { isDemoMode, demoStudent } = useDemoMode();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchStudent = async () => {
    // Return demo student if in demo mode
    if (isDemoMode) {
      setStudent(demoStudent as Student);
      setLoading(false);
      return;
    }

    if (!user) {
      setStudent(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from("students")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (fetchError) {
        throw fetchError;
      }

      setStudent(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch student"));
      setStudent(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      fetchStudent();
    }
  }, [user?.id, isDemoMode, authLoading]);

  return {
    student,
    loading,
    error,
    refetch: fetchStudent,
  };
}
