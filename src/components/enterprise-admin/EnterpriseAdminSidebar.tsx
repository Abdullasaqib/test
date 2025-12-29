import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  Settings,
  Building2,
  GraduationCap
} from "lucide-react";
import { useEnterpriseAdmin } from "@/hooks/useEnterpriseAdmin";

const navItems = [
  { href: "/enterprise-admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/enterprise-admin/learners", label: "Learners", icon: Users },
  { href: "/enterprise-admin/progress", label: "Progress", icon: GraduationCap },
  { href: "/enterprise-admin/reports", label: "Reports", icon: BarChart3 },
  { href: "/enterprise-admin/settings", label: "Settings", icon: Settings },
];

export function EnterpriseAdminSidebar() {
  const location = useLocation();
  const { currentOrg } = useEnterpriseAdmin();

  return (
    <aside className="w-64 bg-card border-r border-border min-h-screen p-4">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Building2 className="h-5 w-5 text-primary" />
          <span className="font-semibold text-sm text-foreground">Enterprise</span>
        </div>
        {currentOrg && (
          <p className="text-xs text-muted-foreground truncate">{currentOrg.name}</p>
        )}
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
