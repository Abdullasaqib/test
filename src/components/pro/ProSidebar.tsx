import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useStudent } from "@/hooks/useStudent";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Home,
  BookOpen,
  MessageSquare,
  Target,
  Zap,
  Award,
  Settings,
  LogOut,
  ChevronLeft,
} from "lucide-react";

const navItems = [
  { title: "Home", icon: Home, path: "/pro/home" },
  { title: "Curriculum", icon: BookOpen, path: "/pro/curriculum" },
  { title: "AI Coach", icon: MessageSquare, path: "/pro/coach" },
  { title: "THE TANK", icon: Target, path: "/pro/tank" },
  { title: "Daily Sprint", icon: Zap, path: "/pro/sprints" },
  { title: "Certificate", icon: Award, path: "/pro/certificate" },
  { title: "Settings", icon: Settings, path: "/pro/settings" },
];

export function ProSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const { student } = useStudent();
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Sidebar
      className={`${isCollapsed ? "w-16" : "w-64"} transition-all duration-300 bg-[#0D1321] border-r border-white/10`}
      collapsible="icon"
    >
      <SidebarHeader className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-white tracking-tight">NEXT_</span>
              <span className="text-xs text-amber-400 font-medium">PRO</span>
            </div>
          )}
          <SidebarTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-white/60 hover:text-white hover:bg-white/10"
            >
              <ChevronLeft className={`w-4 h-4 transition-transform ${isCollapsed ? "rotate-180" : ""}`} />
            </Button>
          </SidebarTrigger>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? "bg-amber-500/20 text-amber-400"
                        : "text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && <span className="font-medium">{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-white/10">
        {!isCollapsed && student && (
          <div className="flex items-center gap-3 mb-4 p-3 bg-white/5 rounded-lg">
            <Avatar className="w-10 h-10 bg-amber-500/20">
              <AvatarFallback className="bg-amber-500/20 text-amber-400 font-semibold">
                {getInitials(student.full_name || "U")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {student.full_name}
              </p>
              <p className="text-xs text-white/50 truncate">{user?.email}</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          onClick={handleSignOut}
          className={`w-full text-white/60 hover:text-white hover:bg-white/10 ${
            isCollapsed ? "justify-center" : "justify-start"
          }`}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span className="ml-3">Sign Out</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
