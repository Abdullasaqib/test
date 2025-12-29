import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LiveActivityFeed } from "@/components/admin/LiveActivityFeed";
import {
  Users,
  FileText,
  GraduationCap,
  School,
  UserCheck,
  TrendingUp,
  Calendar,
  RefreshCw,
} from "lucide-react";

interface DashboardStats {
  totalApplications: number;
  pendingApplications: number;
  totalStudents: number;
  activeStudents: number;
  totalMentors: number;
  totalSchools: number;
  upcomingClasses: number;
  totalRevenue: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalApplications: 0,
    pendingApplications: 0,
    totalStudents: 0,
    activeStudents: 0,
    totalMentors: 0,
    totalSchools: 0,
    upcomingClasses: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [recentApplications, setRecentApplications] = useState<any[]>([]);

  const fetchStats = useCallback(async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    
    try {
      // Fetch applications count
      const { count: totalApps } = await supabase
        .from("applications")
        .select("*", { count: "exact", head: true });

      const { count: pendingApps } = await supabase
        .from("applications")
        .select("*", { count: "exact", head: true })
        .eq("status", "submitted");

      // Fetch students count
      const { count: totalStudents } = await supabase
        .from("students")
        .select("*", { count: "exact", head: true });

      // Count students with onboarding completed as "active"
      const { count: activeStudents } = await supabase
        .from("students")
        .select("*", { count: "exact", head: true })
        .eq("onboarding_completed", true);

      // Fetch mentors count
      const { count: totalMentors } = await supabase
        .from("mentor_profiles")
        .select("*", { count: "exact", head: true });

      // Fetch schools count
      const { count: totalSchools } = await supabase
        .from("schools")
        .select("*", { count: "exact", head: true });

      // Fetch upcoming classes
      const { count: upcomingClasses } = await supabase
        .from("live_classes")
        .select("*", { count: "exact", head: true })
        .gte("scheduled_at", new Date().toISOString());

      // Fetch enrollments with payments for revenue
      const { data: enrollments } = await supabase
        .from("enrollments")
        .select("amount_paid")
        .eq("status", "active");

      const totalRevenue = enrollments?.reduce((sum, e) => sum + (e.amount_paid || 0), 0) || 0;

      // Fetch recent applications
      const { data: recent } = await supabase
        .from("applications")
        .select("id, founder_name, startup_name, status, created_at, country")
        .order("created_at", { ascending: false })
        .limit(5);

      setStats({
        totalApplications: totalApps || 0,
        pendingApplications: pendingApps || 0,
        totalStudents: totalStudents || 0,
        activeStudents: activeStudents || 0,
        totalMentors: totalMentors || 0,
        totalSchools: totalSchools || 0,
        upcomingClasses: upcomingClasses || 0,
        totalRevenue,
      });

      setRecentApplications(recent || []);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Real-time subscriptions for admin dashboard
  useEffect(() => {
    const channel = supabase
      .channel('admin-dashboard-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'applications' }, () => {
        fetchStats();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'students' }, () => {
        fetchStats();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'enrollments' }, () => {
        fetchStats();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchStats]);

  const statCards = [
    {
      title: "Total Applications",
      value: stats.totalApplications,
      icon: FileText,
      description: `${stats.pendingApplications} pending review`,
      color: "text-blue-500",
    },
    {
      title: "Active Students",
      value: stats.activeStudents,
      icon: GraduationCap,
      description: `${stats.totalStudents} total enrolled`,
      color: "text-green-500",
    },
    {
      title: "Mentors",
      value: stats.totalMentors,
      icon: UserCheck,
      description: "Active mentors",
      color: "text-purple-500",
    },
    {
      title: "Schools",
      value: stats.totalSchools,
      icon: School,
      description: "Partner institutions",
      color: "text-orange-500",
    },
    {
      title: "Upcoming Classes",
      value: stats.upcomingClasses,
      icon: Calendar,
      description: "Scheduled sessions",
      color: "text-cyan-500",
    },
    {
      title: "Total Users",
      value: stats.totalStudents + stats.totalMentors,
      icon: Users,
      description: "Platform users",
      color: "text-pink-500",
    },
  ];

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      draft: "bg-muted text-muted-foreground",
      registered: "bg-purple-500/20 text-purple-600",
      submitted: "bg-yellow-500/20 text-yellow-600",
      ai_scored: "bg-blue-500/20 text-blue-600",
      accepted: "bg-green-500/20 text-green-600",
      rejected: "bg-red-500/20 text-red-600",
    };
    return styles[status] || styles.draft;
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview of your platform metrics and recent activity
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => fetchStats(true)}
          disabled={refreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Two Column Layout: Live Activity + Recent Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Activity Feed */}
        <LiveActivityFeed />

        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentApplications.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No applications yet
                </p>
              ) : (
                recentApplications.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-medium truncate">{app.founder_name}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {app.startup_name} • {app.country}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                          app.status
                        )}`}
                      >
                        {app.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
