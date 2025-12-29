import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Activity,
  Search,
  Filter,
  RefreshCw,
  UserPlus,
  GraduationCap,
  BookOpen,
  School,
  CreditCard,
  FileText,
  Zap,
  Download,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ActivityLog {
  id: string;
  event_type: string;
  event_category: string;
  actor_id: string | null;
  actor_name: string | null;
  actor_type: string | null;
  entity_id: string | null;
  entity_type: string | null;
  entity_name: string | null;
  metadata: Record<string, unknown>;
  school_id: string | null;
  created_at: string;
}

const eventIcons: Record<string, typeof Activity> = {
  student_signup: UserPlus,
  lesson_completed: BookOpen,
  certification_completed: GraduationCap,
  enrollment_created: CreditCard,
  application_submitted: FileText,
  school_registered: School,
  challenge_completed: Zap,
};

const categoryColors: Record<string, string> = {
  student: "bg-blue-500/20 text-blue-600 border-blue-500/30",
  certification: "bg-green-500/20 text-green-600 border-green-500/30",
  payment: "bg-yellow-500/20 text-yellow-600 border-yellow-500/30",
  school: "bg-purple-500/20 text-purple-600 border-purple-500/30",
  application: "bg-orange-500/20 text-orange-600 border-orange-500/30",
  activity: "bg-cyan-500/20 text-cyan-600 border-cyan-500/30",
};

export default function AdminActivityLog() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [page, setPage] = useState(0);
  const pageSize = 50;

  const { data: activities, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ["admin-activity-log", categoryFilter, page],
    queryFn: async () => {
      let query = supabase
        .from("admin_activity_log")
        .select("*")
        .order("created_at", { ascending: false })
        .range(page * pageSize, (page + 1) * pageSize - 1);

      if (categoryFilter !== "all") {
        query = query.eq("event_category", categoryFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as ActivityLog[];
    },
  });

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel("admin-activity-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "admin_activity_log",
        },
        () => {
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  const filteredActivities = activities?.filter((activity) => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      activity.actor_name?.toLowerCase().includes(searchLower) ||
      activity.entity_name?.toLowerCase().includes(searchLower) ||
      activity.event_type.toLowerCase().includes(searchLower)
    );
  });

  const getEventIcon = (eventType: string) => {
    const IconComponent = eventIcons[eventType] || Activity;
    return IconComponent;
  };

  const formatEventMessage = (activity: ActivityLog) => {
    const { event_type, actor_name, entity_name, metadata } = activity;
    const actor = actor_name || "Someone";
    const entity = entity_name || "item";

    switch (event_type) {
      case "student_signup":
        return `${actor} joined the platform`;
      case "lesson_completed":
        return `${actor} completed "${entity}"`;
      case "certification_completed":
        return `${actor} earned "${entity}" certificate`;
      case "enrollment_created":
        return `${actor} enrolled in ${entity}`;
      case "application_submitted":
        return `${actor} submitted application for "${entity}"`;
      case "school_registered":
        return `New school registered: ${entity}`;
      case "challenge_completed":
        return `${actor} completed challenge: ${entity}`;
      default:
        return `${actor} performed ${event_type.replace(/_/g, " ")}`;
    }
  };

  const exportToCSV = () => {
    if (!activities) return;
    
    const headers = ["Timestamp", "Event Type", "Category", "Actor", "Entity", "Metadata"];
    const rows = activities.map(a => [
      new Date(a.created_at).toISOString(),
      a.event_type,
      a.event_category,
      a.actor_name || "",
      a.entity_name || "",
      JSON.stringify(a.metadata),
    ]);
    
    const csv = [headers.join(","), ...rows.map(r => r.map(c => `"${c}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `activity-log-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Activity Log</h1>
          <p className="text-muted-foreground mt-1">
            Real-time platform activity and events
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={exportToCSV}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isRefetching}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefetching ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, event, or entity..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="student">Students</SelectItem>
                <SelectItem value="certification">Certifications</SelectItem>
                <SelectItem value="payment">Payments</SelectItem>
                <SelectItem value="school">Schools</SelectItem>
                <SelectItem value="application">Applications</SelectItem>
                <SelectItem value="activity">Activities</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Activity List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Activity
            {isRefetching && (
              <Badge variant="secondary" className="ml-2">
                Updating...
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredActivities?.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No activity found</p>
              {search && <p className="text-sm mt-2">Try adjusting your search</p>}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredActivities?.map((activity) => {
                const Icon = getEventIcon(activity.event_type);
                return (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className={`p-2 rounded-full ${categoryColors[activity.event_category] || "bg-muted"}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">
                        {formatEventMessage(activity)}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <Badge
                          variant="outline"
                          className={categoryColors[activity.event_category]}
                        >
                          {activity.event_category}
                        </Badge>
                        {activity.metadata && Object.keys(activity.metadata).length > 0 && (
                          <span className="text-xs text-muted-foreground">
                            {Object.entries(activity.metadata)
                              .filter(([_, v]) => v !== null && v !== undefined)
                              .slice(0, 2)
                              .map(([k, v]) => `${k}: ${v}`)
                              .join(" • ")}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground whitespace-nowrap">
                      {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {filteredActivities && filteredActivities.length >= pageSize && (
            <div className="flex justify-center gap-2 mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
