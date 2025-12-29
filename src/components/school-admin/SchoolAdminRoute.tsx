import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useSchoolAdmin } from "@/hooks/useSchoolAdmin";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SchoolAdminRouteProps {
  children: React.ReactNode;
}

export function SchoolAdminRoute({ children }: SchoolAdminRouteProps) {
  const { user, loading: authLoading } = useAuth();
  const { isSchoolAdmin, isLoadingAdmin } = useSchoolAdmin();
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

  if (authLoading || isLoadingAdmin || sessionValid === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // SECURITY: Redirect if not authenticated or session invalid
  if (!user || sessionValid === false) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isSchoolAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md px-4">
          <h1 className="text-2xl font-bold text-foreground mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-4">
            You don't have permission to access the school admin dashboard. 
            Please contact your school administrator if you believe this is an error.
          </p>
          <a href="/academy" className="text-primary hover:underline">
            Return to Academy
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
