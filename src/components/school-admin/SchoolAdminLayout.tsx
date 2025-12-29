import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useSchoolAdmin } from "@/hooks/useSchoolAdmin";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  GraduationCap,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/school-admin", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/school-admin/students", icon: Users, label: "Students" },
  { to: "/school-admin/skills", icon: BarChart3, label: "Skills Analytics" },
  { to: "/school-admin/reports", icon: FileText, label: "Reports" },
  { to: "/school-admin/settings", icon: Settings, label: "Settings" },
];

interface SchoolAdminLayoutProps {
  children: React.ReactNode;
}

export function SchoolAdminLayout({ children }: SchoolAdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { signOut } = useAuth();
  const { schoolAdmin, licenseUsage } = useSchoolAdmin();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile header */}
      <header className="lg:hidden sticky top-0 z-50 bg-card border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">
                {schoolAdmin?.school?.name || "School Admin"}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-card border-r border-border transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {schoolAdmin?.school?.logo_url ? (
                  <img
                    src={schoolAdmin.school.logo_url}
                    alt={schoolAdmin.school.name}
                    className="h-10 w-10 rounded-lg object-cover"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                )}
                <div>
                  <h2 className="font-semibold text-foreground text-sm">
                    {schoolAdmin?.school?.name || "School"}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Admin Dashboard
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* License usage */}
            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Student Seats</span>
                <span className="font-medium text-foreground">
                  {licenseUsage.used} / {licenseUsage.total || "∞"}
                </span>
              </div>
              {licenseUsage.total > 0 && (
                <Progress value={licenseUsage.percentage} className="h-2" />
              )}
              {licenseUsage.remaining <= 10 && licenseUsage.total > 0 && (
                <p className="text-xs text-amber-600 mt-1">
                  {licenseUsage.remaining} seats remaining
                </p>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )
                }
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
              onClick={handleSignOut}
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:pl-72">
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
