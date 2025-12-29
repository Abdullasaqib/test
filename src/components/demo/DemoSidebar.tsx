import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ProgressRing } from "@/components/dashboard/ProgressRing";
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
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Home,
  Award,
  Rocket,
  Zap,
  Backpack,
  MessageCircle,
  BarChart3,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function DemoSidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  
  // Demo progress values
  const currentWeek = 5;
  const totalWeeks = 12;
  const progress = Math.round((currentWeek / totalWeeks) * 100);

  const demoNavItems = [
    { 
      title: "Home", 
      icon: Home, 
      path: "/demo",
      exact: true
    },
    { 
      title: "THE TANK 🦈", 
      icon: Rocket, 
      path: "/demo/tank",
    },
    { 
      title: "AI Coach", 
      icon: MessageCircle, 
      path: "/demo/coach",
    },
    { 
      title: "My Skills", 
      icon: BarChart3, 
      path: "/demo/skills",
    },
  ];

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
                  Week {currentWeek} of {totalWeeks}
                </p>
                <p className="text-xs text-sidebar-foreground/60">
                  Demo Mode
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-sidebar-foreground/50">
            Explore Demo
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {demoNavItems.map((item) => {
                const isActive = item.exact 
                  ? location.pathname === item.path
                  : location.pathname.startsWith(item.path);
                
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                    >
                      <Link to={item.path}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        {!collapsed && (
          <div className="px-2 py-2">
            <div className="flex items-center gap-2 px-2 py-2 rounded-md bg-sidebar-accent/50">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-medium text-primary">A</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-sidebar-foreground truncate">
                  Alex Chen
                </p>
                <Badge variant="outline" className="text-[10px] px-1 py-0 h-4">
                  Demo Student
                </Badge>
              </div>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
