import { useDemoMode } from "@/contexts/DemoContext";

/**
 * Hook to generate demo-aware routes
 * Transforms /dashboard/* routes to /demo/* when in demo mode
 */
export function useDemoRoutes() {
  const { isDemoMode } = useDemoMode();

  const getRoute = (dashboardPath: string): string => {
    if (!isDemoMode) return dashboardPath;
    
    // Map dashboard routes to demo routes
    const routeMap: Record<string, string> = {
      '/dashboard': '/demo',
      '/dashboard/tank': '/demo/tank',
      '/dashboard/coach': '/demo/coach',
      '/dashboard/sprint': '/demo/skills', // Map sprint to skills for demo
      '/dashboard/skill-intelligence': '/demo/skills',
    };

    // Check for exact match first
    if (routeMap[dashboardPath]) {
      return routeMap[dashboardPath];
    }

    // For routes without demo equivalents, return null to indicate blocking needed
    return dashboardPath;
  };

  const hasDemo = (dashboardPath: string): boolean => {
    const demoRoutes = [
      '/dashboard',
      '/dashboard/tank',
      '/dashboard/coach',
      '/dashboard/sprint',
      '/dashboard/skill-intelligence',
    ];
    return demoRoutes.includes(dashboardPath);
  };

  return { isDemoMode, getRoute, hasDemo };
}
