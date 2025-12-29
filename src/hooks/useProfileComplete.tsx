import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useStudent } from "./useStudent";

/**
 * Hook to check if student profile is complete.
 * Redirects to profile completion page if demographics are missing.
 */
export function useProfileComplete() {
  const { student, loading } = useStudent();
  const navigate = useNavigate();
  const location = useLocation();

  const isProfileComplete = Boolean(
    student?.country && student?.grade
  );

  const needsProfileComplete = !loading && student && !isProfileComplete;

  useEffect(() => {
    // Don't redirect if we're already on the profile complete page
    if (location.pathname === "/dashboard/profile-complete") {
      return;
    }

    // If student exists but profile is incomplete, redirect
    if (needsProfileComplete) {
      navigate("/dashboard/profile-complete", { replace: true });
    }
  }, [needsProfileComplete, navigate, location.pathname]);

  return {
    isProfileComplete,
    needsProfileComplete,
    loading,
  };
}
