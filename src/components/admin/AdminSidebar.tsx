import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  Calendar,
  UserCheck,
  School,
  BookOpen,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
  GraduationCap,
  CreditCard,
  Bell,
  Layers,
  ClipboardCheck,
  Activity,
  UserPlus,
  Mail,
  DollarSign,
  Briefcase,
  TrendingUp,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

const navItems = [
  { title: "Overview", url: "/admin", icon: LayoutDashboard },
  { title: "Activity Log", url: "/admin/activity", icon: Activity },
  { title: "Revenue", url: "/admin/revenue", icon: TrendingUp },
  { title: "Founders", url: "/admin/founders", icon: Globe },
  { title: "Users", url: "/admin/users", icon: Users },
  { title: "Students", url: "/admin/students", icon: GraduationCap },
  { title: "Leads & Sales", url: "/admin/leads", icon: UserPlus },
  { title: "B2B Deals", url: "/admin/deals", icon: Briefcase },
  { title: "Applications", url: "/admin/applications", icon: FileText },
  { title: "Enrollments", url: "/admin/enrollments", icon: CreditCard },
  { title: "Pricing", url: "/admin/pricing", icon: DollarSign },
  { title: "Case Studies", url: "/admin/case-studies", icon: BookOpen },
  { title: "Cohorts", url: "/admin/cohorts", icon: Calendar },
  { title: "Mentors", url: "/admin/mentors", icon: UserCheck },
  { title: "Schools", url: "/admin/schools", icon: School },
  { title: "Curriculum", url: "/admin/curriculum", icon: Layers },
  { title: "Curriculum Audit", url: "/admin/curriculum/audit", icon: ClipboardCheck },
  { title: "Curriculum Review", url: "/admin/curriculum/review", icon: Activity },
  { title: "Content", url: "/admin/content", icon: BookOpen },
  { title: "Announcements", url: "/admin/announcements", icon: Bell },
  { title: "Email Campaigns", url: "/admin/email-campaigns", icon: Mail },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
  { title: "System Health", url: "/admin/system-health", icon: Activity },
];

export function AdminSidebar() {
  const location = useLocation();
  const { signOut } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside
      className={cn(
        "flex flex-col bg-card border-r border-border h-screen sticky top-0 transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        {!collapsed && (
          <span className="font-bold text-lg text-foreground">Admin Panel</span>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8"
        >
          {collapsed ? <Menu className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            end={item.url === "/admin"}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              isActive(item.url)
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>{item.title}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-border space-y-1">
        <NavLink
          to="/admin/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
            isActive("/admin/settings")
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <Settings className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span>Settings</span>}
        </NavLink>
        <button
          onClick={() => signOut()}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
