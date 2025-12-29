import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Activity,
  UserPlus,
  GraduationCap,
  BookOpen,
  School,
  CreditCard,
  FileText,
  Zap,
  ArrowRight,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

interface ActivityLog {
  id: string;
  event_type: string;
  event_category: string;
  actor_name: string | null;
  entity_name: string | null;
  metadata: Record<string, unknown>;
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
  student: "bg-blue-500/20 text-blue-600",
  certification: "bg-green-500/20 text-green-600",
  payment: "bg-yellow-500/20 text-yellow-600",
  school: "bg-purple-500/20 text-purple-600",
  application: "bg-orange-500/20 text-orange-600",
  activity: "bg-cyan-500/20 text-cyan-600",
};

export function LiveActivityFeed() {
  const queryClient = useQueryClient();

  const { data: activities, isLoading } = useQuery({
    queryKey: ["admin-live-activity"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("admin_activity_log")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(8);

      if (error) throw error;
      return data as ActivityLog[];
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel("dashboard-activity-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "admin_activity_log",
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ["admin-live-activity"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const getEventIcon = (eventType: string) => {
    return eventIcons[eventType] || Activity;
  };

  const formatEventMessage = (activity: ActivityLog) => {
    const { event_type, actor_name, entity_name } = activity;
    const actor = actor_name || "Someone";
    const entity = entity_name || "item";

    switch (event_type) {
      case "student_signup":
        return <><span className="font-medium">{actor}</span> joined the platform</>;
      case "lesson_completed":
        return <><span className="font-medium">{actor}</span> completed "<span className="font-medium">{entity}</span>"</>;
      case "certification_completed":
        return <><span className="font-medium">{actor}</span> earned certificate</>;
      case "enrollment_created":
        return <><span className="font-medium">{actor}</span> enrolled</>;
      case "application_submitted":
        return <><span className="font-medium">{actor}</span> submitted application</>;
      case "school_registered":
        return <>New school: <span className="font-medium">{entity}</span></>;
      case "challenge_completed":
        return <><span className="font-medium">{actor}</span> completed challenge</>;
      default:
        return <><span className="font-medium">{actor}</span> {event_type.replace(/_/g, " ")}</>;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Live Activity
          <Badge variant="secondary" className="ml-2 animate-pulse">
            Live
          </Badge>
        </CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/admin/activity">
            View All <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-3 w-3/4" />
                  <Skeleton className="h-2 w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : activities?.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Activity className="h-10 w-10 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No recent activity</p>
          </div>
        ) : (
          <div className="space-y-3">
            {activities?.map((activity) => {
              const Icon = getEventIcon(activity.event_type);
              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 group"
                >
                  <div className={`p-1.5 rounded-full ${categoryColors[activity.event_category] || "bg-muted"}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground leading-tight">
                      {formatEventMessage(activity)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
