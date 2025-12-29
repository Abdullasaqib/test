import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useStudent } from "@/hooks/useStudent";

interface CertificationProgressData {
  certificationId: string;
  completedLessons: number;
  isEnrolled: boolean;
  isCompleted: boolean;
}

interface UseCertificationProgressReturn {
  progressMap: Map<string, CertificationProgressData>;
  loading: boolean;
  getProgress: (certificationId: string) => CertificationProgressData;
}

export function useCertificationProgress(): UseCertificationProgressReturn {
  const { student } = useStudent();
  const [progressMap, setProgressMap] = useState<Map<string, CertificationProgressData>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (student?.id) {
      fetchAllProgress();
    } else {
      setLoading(false);
    }
  }, [student?.id]);

  const fetchAllProgress = async () => {
    if (!student?.id) return;

    try {
      setLoading(true);

      // Fetch all student certifications (enrollments)
      const { data: enrollments, error: enrollError } = await supabase
        .from("student_certifications")
        .select("certification_id, completed_at, certificate_number")
        .eq("student_id", student.id);

      if (enrollError) throw enrollError;

      // Fetch all certification progress
      const { data: progressData, error: progressError } = await supabase
        .from("certification_progress")
        .select("lesson_id")
        .eq("student_id", student.id);

      if (progressError) throw progressError;

      // Fetch lesson-to-certification mapping
      const { data: lessons, error: lessonsError } = await supabase
        .from("certification_lessons")
        .select("id, certification_id");

      if (lessonsError) throw lessonsError;

      // Build lesson to certification map
      const lessonToCert = new Map<string, string>();
      lessons?.forEach(lesson => {
        lessonToCert.set(lesson.id, lesson.certification_id);
      });

      // Count completed lessons per certification
      const completedByCart = new Map<string, number>();
      progressData?.forEach(p => {
        const certId = lessonToCert.get(p.lesson_id);
        if (certId) {
          completedByCart.set(certId, (completedByCart.get(certId) || 0) + 1);
        }
      });

      // Build the progress map
      const newProgressMap = new Map<string, CertificationProgressData>();
      
      // Add enrolled certifications
      enrollments?.forEach(enrollment => {
        newProgressMap.set(enrollment.certification_id, {
          certificationId: enrollment.certification_id,
          completedLessons: completedByCart.get(enrollment.certification_id) || 0,
          isEnrolled: true,
          isCompleted: enrollment.completed_at !== null,
        });
      });

      setProgressMap(newProgressMap);
    } catch (error) {
      console.error("Failed to fetch certification progress:", error);
    } finally {
      setLoading(false);
    }
  };

  const getProgress = (certificationId: string): CertificationProgressData => {
    return progressMap.get(certificationId) || {
      certificationId,
      completedLessons: 0,
      isEnrolled: false,
      isCompleted: false,
    };
  };

  return {
    progressMap,
    loading,
    getProgress,
  };
}
