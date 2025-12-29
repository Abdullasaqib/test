import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Video, Clock, ExternalLink, Play, CalendarPlus, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useStudentPricingTier } from "@/hooks/useStudentPricingTier";
import { format, isAfter, isBefore, addMinutes } from "date-fns";

interface LiveClass {
  id: string;
  title: string;
  description: string | null;
  zoom_link: string;
  zoom_passcode: string | null;
  scheduled_at: string;
  duration_minutes: number;
  program: string;
  week_number: number | null;
  class_type: string;
  recording_url: string | null;
}

export default function DashboardSchedule() {
  const navigate = useNavigate();
  const [liveClasses, setLiveClasses] = useState<LiveClass[]>([]);
  const [loading, setLoading] = useState(true);
  const { canAccess, isLoading: tierLoading } = useStudentPricingTier();
  
  const hasLiveClasses = canAccess('live_classes');

  useEffect(() => {
    if (!tierLoading && hasLiveClasses) {
      fetchLiveClasses();
    } else if (!tierLoading && !hasLiveClasses) {
      setLoading(false);
    }
  }, [tierLoading, hasLiveClasses]);

  const fetchLiveClasses = async () => {
    try {
      const { data, error } = await supabase
        .from("live_classes")
        .select("*")
        .order("scheduled_at", { ascending: true });

      if (error) throw error;
      setLiveClasses(data || []);
    } catch (error) {
      console.error("Error fetching live classes:", error);
    } finally {
      setLoading(false);
    }
  };

  const now = new Date();
  const upcomingClasses = liveClasses.filter(c => 
    isAfter(new Date(c.scheduled_at), now) || 
    isAfter(addMinutes(new Date(c.scheduled_at), c.duration_minutes), now)
  );
  const pastClasses = liveClasses.filter(c => 
    isBefore(addMinutes(new Date(c.scheduled_at), c.duration_minutes), now)
  );

  const canJoin = (scheduledAt: string) => {
    const classTime = new Date(scheduledAt);
    const joinWindow = addMinutes(classTime, -15); // Can join 15 min before
    return isAfter(now, joinWindow);
  };

  const addToCalendar = (cls: LiveClass) => {
    const startDate = new Date(cls.scheduled_at);
    const endDate = addMinutes(startDate, cls.duration_minutes);
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(cls.title)}&dates=${format(startDate, "yyyyMMdd'T'HHmmss")}/${format(endDate, "yyyyMMdd'T'HHmmss")}&details=${encodeURIComponent(`Join Zoom: ${cls.zoom_link}\n\n${cls.description || ''}`)}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  const getClassTypeLabel = (type: string) => {
    switch (type) {
      case 'lesson': return 'Live Lesson';
      case 'office_hours': return 'Office Hours';
      case 'demo_day': return 'Demo Day';
      case 'guest_speaker': return 'Guest Speaker';
      default: return type;
    }
  };

  // Show upgrade prompt for non-ACCELERATOR users
  if (!tierLoading && !hasLiveClasses) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Live Classes</h1>
            <p className="text-muted-foreground mt-1">
              Join live sessions with mentors and your cohort
            </p>
          </div>
          
          <Card className="border-amber-500/30">
            <CardContent className="py-12 text-center">
              <div className="h-16 w-16 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Unlock Live Classes
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Live classes are available with the ACCELERATOR tier. Get 12 weeks of live group sessions, 
                mentor guidance, and present at Demo Day.
              </p>
              <Button 
                className="bg-amber-600 hover:bg-amber-700"
                onClick={() => navigate('/ai-launcher')}
              >
                Upgrade to ACCELERATOR — $290
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Live Classes</h1>
          <p className="text-muted-foreground mt-1">
            Join live sessions and access recordings
          </p>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">
              <Calendar className="h-4 w-4 mr-2" />
              Upcoming ({upcomingClasses.length})
            </TabsTrigger>
            <TabsTrigger value="recordings">
              <Play className="h-4 w-4 mr-2" />
              Recordings ({pastClasses.filter(c => c.recording_url).length})
            </TabsTrigger>
          </TabsList>

          {/* Upcoming Classes */}
          <TabsContent value="upcoming" className="space-y-4">
            {loading ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <div className="animate-pulse space-y-3">
                    <div className="h-4 bg-muted rounded w-1/3 mx-auto" />
                    <div className="h-4 bg-muted rounded w-1/2 mx-auto" />
                  </div>
                </CardContent>
              </Card>
            ) : upcomingClasses.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
                  <h3 className="font-medium text-foreground mb-2">No Upcoming Classes</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Live classes will be scheduled once your cohort begins. You'll receive 
                    notifications when new classes are added.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {upcomingClasses.map((session) => {
                  const scheduledDate = new Date(session.scheduled_at);
                  const isJoinable = canJoin(session.scheduled_at);
                  
                  return (
                    <Card key={session.id} className={isJoinable ? "border-primary/30" : ""}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="flex items-center gap-2">
                              <Video className="h-5 w-5 text-primary" />
                              {session.title}
                            </CardTitle>
                            {session.description && (
                              <CardDescription className="mt-1">
                                {session.description}
                              </CardDescription>
                            )}
                          </div>
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            {getClassTypeLabel(session.class_type)}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {format(scheduledDate, "MMM d, yyyy")}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {format(scheduledDate, "h:mm a")}
                            </div>
                            <span>{session.duration_minutes} min</span>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => addToCalendar(session)}
                            >
                              <CalendarPlus className="h-4 w-4 mr-1" />
                              Add to Calendar
                            </Button>
                            <Button 
                              size="sm"
                              disabled={!isJoinable}
                              asChild={isJoinable}
                            >
                              {isJoinable ? (
                                <a href={session.zoom_link} target="_blank" rel="noopener noreferrer">
                                  Join Zoom
                                  <ExternalLink className="ml-2 h-4 w-4" />
                                </a>
                              ) : (
                                <span>Join Zoom</span>
                              )}
                            </Button>
                          </div>
                        </div>
                        {session.zoom_passcode && (
                          <p className="text-xs text-muted-foreground mt-3">
                            Passcode: <span className="font-mono">{session.zoom_passcode}</span>
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          {/* Recordings */}
          <TabsContent value="recordings" className="space-y-4">
            {pastClasses.filter(c => c.recording_url).length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <Video className="h-10 w-10 mx-auto mb-3 text-muted-foreground/30" />
                  <p className="text-sm text-muted-foreground">
                    Class recordings will appear here after each live session
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-3">
                {pastClasses
                  .filter(c => c.recording_url)
                  .map((recording) => (
                    <Card key={recording.id}>
                      <CardContent className="py-4 flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-foreground">{recording.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(recording.scheduled_at), "MMMM d, yyyy")}
                          </p>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <a href={recording.recording_url!} target="_blank" rel="noopener noreferrer">
                            <Play className="h-4 w-4 mr-2" />
                            Watch Recording
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
