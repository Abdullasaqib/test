import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useEnterpriseAdmin } from "@/hooks/useEnterpriseAdmin";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface EnterpriseAdminRouteProps {
  children: React.ReactNode;
}

export function EnterpriseAdminRoute({ children }: EnterpriseAdminRouteProps) {
  const { user, loading: authLoading } = useAuth();
  const { isEnterpriseAdmin, isLoading: enterpriseLoading } = useEnterpriseAdmin();
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

  if (authLoading || enterpriseLoading || sessionValid === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoadingSpinner />
      </div>
    );
  }

  // SECURITY: Redirect if not authenticated or session invalid
  if (!user || sessionValid === false) {
    return <Navigate to="/login" replace />;
  }

  if (!isEnterpriseAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
