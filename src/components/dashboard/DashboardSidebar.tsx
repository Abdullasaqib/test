import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useStudentPricingTier } from "@/hooks/useStudentPricingTier";
import { useSprints } from "@/hooks/useSprints";
import { ProgressRing } from "./ProgressRing";
import { CursorWordmark } from "@/components/ui/cursor-wordmark";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Home,
  Settings,
  LogOut,
  Award,
  Rocket,
  ChevronDown,
  Lock,
  GraduationCap,
  Wrench,
  Zap,
  Backpack,
  Dna,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DashboardSidebarProps {
  currentWeek?: number;
  totalWeeks?: number;
}

export function DashboardSidebar({ currentWeek = 1, totalWeeks = 12 }: DashboardSidebarProps) {
  const location = useLocation();
  const { signOut, user } = useAuth();
  const { state } = useSidebar();
  const { canAccess, tier } = useStudentPricingTier();
  const { streak } = useSprints();
  const collapsed = state === "collapsed";

  // Extract week from URL if present (real-time update)
  const weekMatch = location.pathname.match(/\/week\/(\d+)/);
  const displayWeek = weekMatch ? parseInt(weekMatch[1]) : currentWeek;

  const progress = Math.round((displayWeek / totalWeeks) * 100);

  // Certificate access based on tier
  const hasAIBuilder = canAccess('curriculum_access') && tier?.features?.curriculum_access === 'full';
  const hasAILauncher = canAccess('live_classes');

  // Check if user is on any certificate-related route
  const isCertificateActive = location.pathname.includes('/dashboard/certification') ||
    location.pathname.includes('/dashboard/curriculum');

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className={cn(
          "flex items-center gap-3 px-2 py-3",
          collapsed && "justify-center"
        )}>
          {collapsed ? (
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-primary-foreground font-bold text-sm">N_</span>
            </div>
          ) : (
            <div className="flex flex-col">
              <CursorWordmark
                word="NEXT"
                size="md"
                className="text-sidebar-foreground"
                cursorClassName="text-primary"
                subtitle="BILLION LAB"
                subtitleClassName="text-sidebar-foreground/60"
              />
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Progress Section */}
        {!collapsed && (
          <div className="px-4 py-4 border-b border-sidebar-border">
            <div className="flex items-center gap-4">
              <ProgressRing progress={progress} size={56} strokeWidth={5}>
                <span className="text-xs font-semibold text-sidebar-foreground">
                  {progress}%
                </span>
              </ProgressRing>
              <div>
                <p className="text-sm font-medium text-sidebar-foreground">
                  Week {displayWeek} of {totalWeeks}
                </p>
                <p className="text-xs text-sidebar-foreground/60">
                  Keep going!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Main Navigation - Simplified to 7 items */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-sidebar-foreground/50">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* 1. Home */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === '/dashboard'}
                  tooltip="Home"
                >
                  <Link to="/dashboard">
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* 2. My Certificates (Collapsible) */}
              <Collapsible defaultOpen={isCertificateActive} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip="My Certificates"
                      isActive={isCertificateActive}
                    >
                      <Award className="h-4 w-4" />
                      <span>My Certificates</span>
                      <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {/* AI Foundations - Always available */}
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={location.pathname.includes('/dashboard/certification/prompt-engineering-fundamentals')}
                        >
                          <Link to="/dashboard/certification/prompt-engineering-fundamentals">
                            <GraduationCap className="h-3.5 w-3.5" />
                            <span className="flex-1">AI Foundations</span>
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 bg-primary/10 text-primary border-primary/30">
                              FREE
                            </Badge>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>

                      {/* AI Builder - Tier gated */}
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={location.pathname.includes('/dashboard/curriculum')}
                          className={!hasAIBuilder ? "opacity-60" : ""}
                        >
                          <Link to={hasAIBuilder ? "/dashboard/curriculum" : "/dashboard/certification"}>
                            <Wrench className="h-3.5 w-3.5" />
                            <span className="flex-1">AI Builder</span>
                            {!hasAIBuilder && <Lock className="h-3 w-3 text-muted-foreground" />}
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>

                      {/* AI Launcher - ACCELERATOR only */}
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={location.pathname.includes('/dashboard/certification/ai-launcher')}
                          className={!hasAILauncher ? "opacity-60" : ""}
                        >
                          <Link to={hasAILauncher ? "/dashboard/schedule" : "/dashboard/certification"}>
                            <Zap className="h-3.5 w-3.5" />
                            <span className="flex-1">AI Launcher</span>
                            {hasAILauncher ? (
                              <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 bg-yellow-500/10 text-yellow-500 border-yellow-500/30">
                                Live
                              </Badge>
                            ) : (
                              <Lock className="h-3 w-3 text-muted-foreground" />
                            )}
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* 3. Daily Practice (renamed from Founder Simulation) */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === '/dashboard/sprint'}
                  tooltip="Daily Practice"
                >
                  <Link to="/dashboard/sprint" className="relative">
                    <Zap className="h-4 w-4" />
                    <span>Daily Practice</span>
                    {streak && streak.current_streak > 0 && (
                      <Badge
                        variant="outline"
                        className="ml-auto text-[10px] px-1.5 py-0 h-4 bg-orange-500/10 text-orange-500 border-orange-500/30"
                      >
                        🔥 {streak.current_streak}
                      </Badge>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* 4. THE TANK */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === '/dashboard/tank'}
                  tooltip="THE TANK"
                >
                  <Link to="/dashboard/tank">
                    <Rocket className="h-4 w-4" />
                    <span>THE TANK 🦈</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* 5. Founder DNA */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === '/dashboard/dna'}
                  tooltip="Founder DNA"
                >
                  <Link to="/dashboard/dna">
                    <Dna className="h-4 w-4" />
                    <span>Founder DNA</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* 5. My Stuff (NEW - combines Showcase + Resources + Prompts) */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname.startsWith('/dashboard/my-stuff')}
                  tooltip="My Stuff"
                >
                  <Link to="/dashboard/my-stuff">
                    <Backpack className="h-4 w-4" />
                    <span>My Stuff</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {/* 6. Settings */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === '/dashboard/settings'}
                  tooltip="Settings"
                >
                  <Link to="/dashboard/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          {/* 7. Sign Out */}
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleSignOut}
              tooltip="Sign Out"
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* User info */}
        {!collapsed && user && (
          <div className="px-2 py-2 mt-2">
            <div className="flex items-center gap-2 px-2 py-2 rounded-md bg-sidebar-accent/50">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-medium text-primary">
                  {user.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-sidebar-foreground truncate">
                  {user.user_metadata?.full_name || "Student"}
                </p>
                <p className="text-xs text-sidebar-foreground/60 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}