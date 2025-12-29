import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video, Calendar, Clock, ExternalLink, CalendarPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format, isAfter, addMinutes } from "date-fns";
import { Link } from "react-router-dom";

interface LiveClass {
  id: string;
  title: string;
  scheduled_at: string;
  duration_minutes: number;
  zoom_link: string;
  class_type: string;
}

export function UpcomingClassCard() {
  const [nextClass, setNextClass] = useState<LiveClass | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNextClass();
  }, []);

  const fetchNextClass = async () => {
    try {
      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from("live_classes")
        .select("id, title, scheduled_at, duration_minutes, zoom_link, class_type")
        .gte("scheduled_at", now)
        .order("scheduled_at", { ascending: true })
        .limit(1)
        .single();

      if (!error && data) {
        setNextClass(data);
      }
    } catch (error) {
      // No upcoming class found
    } finally {
      setLoading(false);
    }
  };

  const canJoin = (scheduledAt: string) => {
    const classTime = new Date(scheduledAt);
    const joinWindow = addMinutes(classTime, -15);
    return isAfter(new Date(), joinWindow);
  };

  const addToCalendar = () => {
    if (!nextClass) return;
    const startDate = new Date(nextClass.scheduled_at);
    const endDate = addMinutes(startDate, nextClass.duration_minutes);
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(nextClass.title)}&dates=${format(startDate, "yyyyMMdd'T'HHmmss")}/${format(endDate, "yyyyMMdd'T'HHmmss")}&details=${encodeURIComponent(`Join Zoom: ${nextClass.zoom_link}`)}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  if (loading) {
    return (
      <Card className="border-amber-500/30 bg-gradient-to-r from-amber-500/5 to-orange-500/5">
        <CardContent className="py-6">
          <div className="animate-pulse flex items-center gap-4">
            <div className="h-12 w-12 bg-muted rounded-xl" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted rounded w-1/3" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // No upcoming class - show cohort countdown
  if (!nextClass) {
    return (
      <Card className="border-amber-500/30 bg-gradient-to-r from-amber-500/5 to-orange-500/5">
        <CardContent className="py-5 md:py-6">
          <div className="flex items-start gap-3 md:gap-4">
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center shrink-0">
              <Video className="h-5 w-5 md:h-6 md:w-6 text-amber-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="font-semibold text-foreground text-sm md:text-base">Your Live Cohort</h3>
                  <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
                    First cohort starts February 2026 — exact dates announced to enrolled students soon!
                  </p>
                </div>
                <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/30 flex-shrink-0 text-xs">
                  ACCELERATOR
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const scheduledDate = new Date(nextClass.scheduled_at);
  const isJoinable = canJoin(nextClass.scheduled_at);

  return (
    <Card className="border-amber-500/30 bg-gradient-to-r from-amber-500/5 to-orange-500/5">
      <CardHeader className="pb-2 px-4 md:px-6">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-base md:text-lg flex items-center gap-2">
            <Video className="h-4 w-4 md:h-5 md:w-5 text-amber-600" />
            <span className="truncate">Next Live Class</span>
          </CardTitle>
          <Link to="/dashboard/schedule" className="text-xs md:text-sm text-amber-600 hover:underline flex-shrink-0">
            View all →
          </Link>
        </div>
      </CardHeader>
      <CardContent className="px-4 md:px-6 pb-4 md:pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4">
          <div className="min-w-0">
            <h4 className="font-semibold text-foreground text-sm md:text-base truncate">{nextClass.title}</h4>
            <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {format(scheduledDate, "MMM d, yyyy")}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {format(scheduledDate, "h:mm a")}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={addToCalendar}>
              <CalendarPlus className="h-4 w-4 mr-1" />
              Add to Calendar
            </Button>
            {isJoinable ? (
              <Button size="sm" className="bg-amber-600 hover:bg-amber-700" asChild>
                <a href={nextClass.zoom_link} target="_blank" rel="noopener noreferrer">
                  Join Now
                  <ExternalLink className="ml-1 h-3.5 w-3.5" />
                </a>
              </Button>
            ) : (
              <Button size="sm" disabled>
                Starts {format(scheduledDate, "h:mm a")}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
