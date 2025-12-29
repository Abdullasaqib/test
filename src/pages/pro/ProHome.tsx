import { useStudent } from "@/hooks/useStudent";
import { ProLayout } from "@/components/pro/ProLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  BookOpen,
  MessageSquare,
  Target,
  Zap,
  Award,
  ArrowRight,
  Clock,
  TrendingUp,
  Lightbulb,
} from "lucide-react";

export default function ProHome() {
  const { student } = useStudent();
  const navigate = useNavigate();

  const track = student?.program === 'college' ? 'college' : 'professional';
  const totalWeeks = track === 'college' ? 12 : 8;
  const certificateName = track === 'college' ? 'AI Venture Certificate' : 'AI Builder Pro Certificate';

  // Fetch missions for the student's track
  const { data: missions, isLoading: missionsLoading } = useQuery({
    queryKey: ['pro-missions', track],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('missions')
        .select('id, title, week, day, micro_content')
        .eq('track', track)
        .order('week', { ascending: true })
        .order('day', { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!track,
  });

  // Fetch student's completed missions
  const { data: studentMissions, isLoading: progressLoading } = useQuery({
    queryKey: ['pro-student-missions', student?.id],
    queryFn: async () => {
      if (!student?.id) return [];
      const { data, error } = await supabase
        .from('student_missions')
        .select('mission_id, status')
        .eq('student_id', student.id);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!student?.id,
  });

  const isLoading = missionsLoading || progressLoading;
  const completedMissionIds = studentMissions?.filter(m => m.status === 'completed').map(m => m.mission_id) || [];
  const totalMissions = missions?.length || 0;
  const completedCount = completedMissionIds.length;
  const progressPercent = totalMissions > 0 ? Math.round((completedCount / totalMissions) * 100) : 0;

  // Find current mission (first incomplete)
  const currentMission = missions?.find(m => !completedMissionIds.includes(m.id));
  const currentWeek = currentMission?.week || 1;

  // Get phase name for current week
  const getPhaseName = (week: number) => {
    if (track === 'professional') {
      if (week === 1) return 'Idea Crystallization';
      if (week <= 3) return 'Lightning Validation';
      if (week <= 5) return 'AI-Powered MVP';
      if (week === 6) return 'Launch & First Users';
      return 'Iterate & Learn';
    } else {
      if (week <= 2) return 'Discovery';
      if (week <= 4) return 'Validation';
      if (week <= 7) return 'Building';
      if (week <= 10) return 'Growth';
      return 'Pitch';
    }
  };

  const quickActions = [
    {
      title: "Continue Curriculum",
      description: `Week ${currentWeek}: ${getPhaseName(currentWeek)}`,
      icon: BookOpen,
      path: "/pro/curriculum",
      color: "bg-blue-500/20 text-blue-400",
    },
    {
      title: "AI Coach",
      description: "Get help with your idea",
      icon: MessageSquare,
      path: "/pro/coach",
      color: "bg-emerald-500/20 text-emerald-400",
    },
    {
      title: "Daily Sprint",
      description: "Build your founder muscles",
      icon: Zap,
      path: "/pro/sprints",
      color: "bg-amber-500/20 text-amber-400",
    },
    {
      title: "THE TANK",
      description: "Practice your pitch",
      icon: Target,
      path: "/pro/tank",
      color: "bg-purple-500/20 text-purple-400",
    },
  ];

  if (isLoading) {
    return (
      <ProLayout>
        <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-32 w-full" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-40" />)}
          </div>
        </div>
      </ProLayout>
    );
  }

  return (
    <ProLayout>
      <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">
            Welcome back, {student?.full_name?.split(" ")[0] || "Builder"}
          </h1>
          <p className="text-white/60">
            Ready to build? Here's where you left off.
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">
                  <Clock className="w-3 h-3 mr-1" />
                  Week {currentWeek} of {totalWeeks}
                </Badge>
                <h2 className="text-2xl font-bold text-white">{getPhaseName(currentWeek)}</h2>
                <p className="text-white/60">
                  {completedCount} of {totalMissions} missions completed
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="text-right">
                  <span className="text-3xl font-bold text-amber-400">{progressPercent}%</span>
                  <span className="text-white/40 ml-1">complete</span>
                </div>
                <Progress value={progressPercent} className="w-48 h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Card
              key={action.path}
              className="bg-white/5 border-white/10 hover:border-amber-500/30 transition-colors cursor-pointer group"
              onClick={() => navigate(action.path)}
            >
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mb-4`}>
                  <action.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-amber-400 transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-white/50">{action.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Today's Focus */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-400" />
                Today's Mission
              </CardTitle>
              <CardDescription className="text-white/60">
                Week {currentMission?.week || 1}, Day {currentMission?.day || 1}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-white/5 rounded-lg">
                <h4 className="font-medium text-white mb-2">
                  {currentMission?.title || 'Start Your Journey'}
                </h4>
                <p className="text-sm text-white/60 mb-4 line-clamp-2">
                  {currentMission?.micro_content?.substring(0, 120) || 'Begin your first mission to start building.'}...
                </p>
                <Button 
                  onClick={() => navigate("/pro/curriculum")}
                  className="bg-amber-500 hover:bg-amber-600 text-black"
                >
                  Start Mission
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                Your Progress
              </CardTitle>
              <CardDescription className="text-white/60">
                Skills you're developing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Problem Discovery</span>
                  <span className={currentWeek >= 1 ? "text-amber-400 font-medium" : "text-white/40"}>
                    {currentWeek >= 1 ? `Level ${Math.min(currentWeek, 3)}` : 'Locked'}
                  </span>
                </div>
                <Progress value={Math.min(currentWeek / 3 * 100, 100)} className="h-2" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Customer Validation</span>
                  <span className={currentWeek >= 2 ? "text-amber-400 font-medium" : "text-white/40"}>
                    {currentWeek >= 2 ? `Level ${Math.min(currentWeek - 1, 3)}` : 'Locked'}
                  </span>
                </div>
                <Progress value={currentWeek >= 2 ? Math.min((currentWeek - 1) / 3 * 100, 100) : 0} className="h-2" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">AI Building</span>
                  <span className={currentWeek >= 4 ? "text-amber-400 font-medium" : "text-white/40"}>
                    {currentWeek >= 4 ? `Level ${Math.min(currentWeek - 3, 3)}` : 'Locked'}
                  </span>
                </div>
                <Progress value={currentWeek >= 4 ? Math.min((currentWeek - 3) / 3 * 100, 100) : 0} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Certificate Preview */}
        <Card className="bg-gradient-to-r from-amber-900/20 to-orange-900/20 border-amber-500/20">
          <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-amber-500/20 rounded-xl flex items-center justify-center">
                <Award className="w-8 h-8 text-amber-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{certificateName}</h3>
                <p className="text-white/60">Complete the {totalWeeks}-week program to earn your credential</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate("/pro/certificate")}
              className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
            >
              View Certificate
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </ProLayout>
  );
}
