import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useStudent } from "@/hooks/useStudent";
import type { Tables } from "@/integrations/supabase/types";

type Certification = Tables<"certifications">;
type CertificationLesson = Tables<"certification_lessons">;
type StudentCertification = Tables<"student_certifications">;
type CertificationProgress = Tables<"certification_progress">;

interface UseCertificationReturn {
  certifications: Certification[];
  currentCertification: Certification | null;
  lessons: CertificationLesson[];
  enrollment: StudentCertification | null;
  progress: CertificationProgress[];
  loading: boolean;
  error: Error | null;
  refetch: () => void;
  enrollInCertification: (certificationId: string) => Promise<void>;
  completeLesson: (lessonId: string, quizScore?: number) => Promise<void>;
  completeCertification: () => Promise<string | null>;
  getCompletedLessonsCount: () => number;
  isLessonCompleted: (lessonId: string) => boolean;
}

export function useCertification(certificationSlug?: string): UseCertificationReturn {
  const { student } = useStudent();
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [currentCertification, setCurrentCertification] = useState<Certification | null>(null);
  const [lessons, setLessons] = useState<CertificationLesson[]>([]);
  const [enrollment, setEnrollment] = useState<StudentCertification | null>(null);
  const [progress, setProgress] = useState<CertificationProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadCertifications = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from("certifications")
          .select("*")
          .eq("is_active", true)
          .order("created_at", { ascending: true });

        if (fetchError) throw fetchError;
        setCertifications(data || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch certifications"));
      } finally {
        // If no slug provided, we're done loading (hub view)
        if (!certificationSlug) {
          setLoading(false);
        }
      }
    };

    loadCertifications();
  }, [certificationSlug]);

  useEffect(() => {
    if (certificationSlug) {
      fetchCertificationDetails(certificationSlug);
    }
  }, [certificationSlug, student?.id]);

  const fetchCertifications = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from("certifications")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: true });

      if (fetchError) throw fetchError;
      setCertifications(data || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch certifications"));
    }
  };

  const fetchCertificationDetails = async (slug: string) => {
    try {
      setLoading(true);
      
      // Fetch certification
      const { data: cert, error: certError } = await supabase
        .from("certifications")
        .select("*")
        .eq("slug", slug)
        .single();

      if (certError) throw certError;
      setCurrentCertification(cert);

      // Fetch lessons
      const { data: lessonData, error: lessonError } = await supabase
        .from("certification_lessons")
        .select("*")
        .eq("certification_id", cert.id)
        .order("lesson_order", { ascending: true });

      if (lessonError) throw lessonError;
      setLessons(lessonData || []);

      // Fetch enrollment and progress if student exists
      if (student?.id) {
        const { data: enrollData } = await supabase
          .from("student_certifications")
          .select("*")
          .eq("student_id", student.id)
          .eq("certification_id", cert.id)
          .maybeSingle();

        setEnrollment(enrollData);

        if (lessonData && lessonData.length > 0) {
          const lessonIds = lessonData.map(l => l.id);
          const { data: progressData } = await supabase
            .from("certification_progress")
            .select("*")
            .eq("student_id", student.id)
            .in("lesson_id", lessonIds);

          setProgress(progressData || []);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch certification details"));
    } finally {
      setLoading(false);
    }
  };

  const enrollInCertification = async (certificationId: string) => {
    if (!student?.id) throw new Error("Must be logged in to enroll");

    const { data, error: enrollError } = await supabase
      .from("student_certifications")
      .insert({
        student_id: student.id,
        certification_id: certificationId,
      })
      .select()
      .single();

    if (enrollError) throw enrollError;
    setEnrollment(data);
  };

  const completeLesson = async (lessonId: string, quizScore?: number) => {
    if (!student?.id) throw new Error("Must be logged in to track progress");

    const existingProgress = progress.find(p => p.lesson_id === lessonId);

    if (existingProgress) {
      // Update existing progress
      const { error: updateError } = await supabase
        .from("certification_progress")
        .update({
          quiz_score: quizScore ?? existingProgress.quiz_score,
          quiz_attempts: (existingProgress.quiz_attempts || 0) + 1,
        })
        .eq("id", existingProgress.id);

      if (updateError) throw updateError;
    } else {
      // Create new progress
      const { data, error: insertError } = await supabase
        .from("certification_progress")
        .insert({
          student_id: student.id,
          lesson_id: lessonId,
          quiz_score: quizScore,
          quiz_attempts: quizScore !== undefined ? 1 : 0,
        })
        .select()
        .single();

      if (insertError) throw insertError;
      setProgress([...progress, data]);
    }
  };

  const completeCertification = async (): Promise<string | null> => {
    if (!student?.id || !currentCertification) return null;

    // Generate certificate number based on certification type
    // AF = AI Foundations, AB = AI Builder, AL = AI Launcher
    let certType = 'AF'; // default for prompt-engineering-fundamentals
    if (currentCertification.slug === 'ai-founders-certificate') {
      certType = 'AB';
    } else if (currentCertification.slug === 'ai-launcher') {
      certType = 'AL';
    }
    const certificateNumber = `NEXT-${certType}-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;

    const { error: updateError } = await supabase
      .from("student_certifications")
      .update({
        completed_at: new Date().toISOString(),
        certificate_number: certificateNumber,
      })
      .eq("student_id", student.id)
      .eq("certification_id", currentCertification.id);

    if (updateError) throw updateError;

    setEnrollment(prev => prev ? {
      ...prev,
      completed_at: new Date().toISOString(),
      certificate_number: certificateNumber,
    } : null);

    return certificateNumber;
  };

  const getCompletedLessonsCount = () => progress.length;

  const isLessonCompleted = (lessonId: string) => 
    progress.some(p => p.lesson_id === lessonId);

  const refetch = () => {
    setLoading(true);
    setError(null);
    if (certificationSlug) {
      fetchCertificationDetails(certificationSlug);
    } else {
      fetchCertifications().finally(() => setLoading(false));
    }
  };

  return {
    certifications,
    currentCertification,
    lessons,
    enrollment,
    progress,
    loading,
    error,
    refetch,
    enrollInCertification,
    completeLesson,
    completeCertification,
    getCompletedLessonsCount,
    isLessonCompleted,
  };
}
