import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface AdminRouteProps {
  children: React.ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
  const { user, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [sessionValid, setSessionValid] = useState<boolean | null>(null);

  // SECURITY: Verify session is still valid
  useEffect(() => {
    if (!authLoading && user) {
      supabase.auth.getSession().then(({ data: { session }, error }) => {
        if (error || !session) {
          setSessionValid(false);
          setIsAdmin(false);
          setLoading(false);
        } else {
          setSessionValid(true);
        }
      });
    } else if (!authLoading && !user) {
      setSessionValid(false);
      setIsAdmin(false);
      setLoading(false);
    }
  }, [user, authLoading]);

  useEffect(() => {
    async function checkAdminRole() {
      if (!user || !sessionValid) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      // SECURITY: Verify session token is valid before checking role
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      // SECURITY: Check admin role with authenticated query
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (error) {
        console.error("Error checking admin role:", error);
        setIsAdmin(false);
      } else {
        setIsAdmin(!!data);
      }
      setLoading(false);
    }

    if (!authLoading && sessionValid === true) {
      checkAdminRole();
    }
  }, [user, authLoading, sessionValid]);

  if (authLoading || loading || sessionValid === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  // SECURITY: Redirect if not authenticated or session invalid
  if (!user || sessionValid === false) {
    return <Navigate to="/login" replace />;
  }

  // SECURITY: Redirect if not admin
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
