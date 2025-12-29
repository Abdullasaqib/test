import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useStudent } from "@/hooks/useStudent";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading: authLoading } = useAuth();
  const { student, loading: studentLoading } = useStudent();
  const location = useLocation();
  const [sessionValid, setSessionValid] = useState<boolean | null>(null);

  // SECURITY: Verify session is still valid
  useEffect(() => {
    if (!authLoading && user) {
      supabase.auth.getSession().then(({ data: { session }, error }) => {
        if (error || !session) {
          setSessionValid(false);
        } else {
          setSessionValid(true);
        }
      });
    } else if (!authLoading && !user) {
      setSessionValid(false);
    }
  }, [user, authLoading]);

  // Show loading only while checking auth - brief spinner
  if (authLoading || sessionValid === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  // SECURITY: Redirect to login if not authenticated or session invalid
  if (!user || sessionValid === false) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // DON'T block on student loading - let pages render with their own skeleton states
  // This enables instant page transitions while data loads in the background

  // Check audience type for routing (only if student is loaded)
  if (!studentLoading && student) {
    const audienceType = (student as any)?.audience_type;
    const isProUser = ['professional', 'college', 'enterprise'].includes(audienceType);

    // Pro user routing (adults)
    if (isProUser) {
      const isProOnboardingPage = location.pathname === "/pro/onboarding";
      const proNeedsOnboarding = !(student as any)?.pro_onboarding_completed;

      if (proNeedsOnboarding && !isProOnboardingPage) {
        return <Navigate to="/pro/onboarding" replace />;
      }
    }

    // COPPA: Check if under-13 user needs parent consent
    const isUnder13 = student?.age && student.age < 13;
    const parentConsentVerified = (student as any)?.parent_consent_verified;
    const isAwaitingConsentPage = location.pathname === "/awaiting-consent";

    if (isUnder13 && !parentConsentVerified && !isAwaitingConsentPage) {
      return <Navigate to="/awaiting-consent" replace />;
    }
  }

  // Render children immediately - let pages handle their own loading states
  return <>{children}</>;
}
