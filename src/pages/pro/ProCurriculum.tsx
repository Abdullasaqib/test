import { ProLayout } from "@/components/pro/ProLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useStudent } from "@/hooks/useStudent";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, 
  Lock, 
  CheckCircle2, 
  PlayCircle, 
  Clock,
  ArrowRight,
  Lightbulb,
  Users,
  Code,
  Rocket,
  TrendingUp,
  Search,
  Target,
  Megaphone,
} from "lucide-react";

// Phase configuration for professional (8 weeks) and college (12 weeks)
const professionalPhases = [
  { week: 1, title: "Idea Crystallization", description: "Transform your domain expertise into a validated product concept", icon: Lightbulb },
  { week: "2-3", title: "Lightning Validation", description: "Run rapid experiments to prove demand", icon: Users },
  { week: "4-5", title: "AI-Powered MVP", description: "Build your product using no-code and AI tools", icon: Code },
  { week: 6, title: "Launch & First Users", description: "Go live and acquire your first users", icon: Rocket },
  { week: "7-8", title: "Iterate & Learn", description: "Analyze feedback and iterate on your product", icon: TrendingUp },
];

const collegePhases = [
  { week: "1-2", title: "Discovery", description: "Find problems worth solving on campus and beyond", icon: Search },
  { week: "3-4", title: "Validation", description: "Test your ideas with real potential customers", icon: Users },
  { week: "5-7", title: "Building", description: "Create your MVP using AI tools", icon: Code },
  { week: "8-10", title: "Growth", description: "Launch and acquire your first users", icon: TrendingUp },
  { week: "11-12", title: "Pitch", description: "Prepare for Demo Day and investor meetings", icon: Target },
];

export default function ProCurriculum() {
  const { student } = useStudent();
  const navigate = useNavigate();
  
  const track = student?.program === 'college' ? 'college' : 'professional';
  const phases = track === 'college' ? collegePhases : professionalPhases;
  const totalWeeks = track === 'college' ? 12 : 8;

  // Fetch missions for the student's track
  const { data: missions, isLoading: missionsLoading } = useQuery({
    queryKey: ['pro-missions', track],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('missions')
        .select('id, title, week, day, estimated_minutes, artifact_type')
        .eq('track', track)
        .order('week', { ascending: true })
        .order('day', { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!track,
  });

  // Fetch student's completed missions
  const { data: completedMissions, isLoading: progressLoading } = useQuery({
    queryKey: ['pro-student-missions', student?.id],
    queryFn: async () => {
      if (!student?.id) return [];
      const { data, error } = await supabase
        .from('student_missions')
        .select('mission_id, status')
        .eq('student_id', student.id)
        .eq('status', 'completed');
      
      if (error) throw error;
      return data?.map(m => m.mission_id) || [];
    },
    enabled: !!student?.id,
  });

  const isLoading = missionsLoading || progressLoading;
  const totalMissions = missions?.length || 0;
  const completedCount = completedMissions?.length || 0;
  const progressPercent = totalMissions > 0 ? Math.round((completedCount / totalMissions) * 100) : 0;

  // Helper to get missions for a week range
  const getMissionsForWeekRange = (weekRange: string | number) => {
    if (!missions) return { total: 0, completed: 0 };
    
    let weeks: number[] = [];
    if (typeof weekRange === 'number') {
      weeks = [weekRange];
    } else {
      const [start, end] = weekRange.split('-').map(Number);
      for (let i = start; i <= end; i++) {
        weeks.push(i);
      }
    }
    
    const phaseMissions = missions.filter(m => weeks.includes(m.week));
    const phaseCompleted = phaseMissions.filter(m => completedMissions?.includes(m.id));
    
    return { total: phaseMissions.length, completed: phaseCompleted.length };
  };

  // Determine current phase
  const getCurrentPhaseIndex = () => {
    if (!missions || !completedMissions) return 0;
    
    for (let i = 0; i < phases.length; i++) {
      const { total, completed } = getMissionsForWeekRange(phases[i].week);
      if (completed < total) return i;
    }
    return phases.length - 1;
  };

  const currentPhaseIndex = getCurrentPhaseIndex();

  const getPhaseStatus = (index: number) => {
    const { total, completed } = getMissionsForWeekRange(phases[index].week);
    if (completed >= total && total > 0) return 'completed';
    if (index === currentPhaseIndex) return 'in_progress';
    if (index < currentPhaseIndex) return 'completed';
    return 'locked';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Completed</Badge>;
      case "in_progress":
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">In Progress</Badge>;
      default:
        return <Badge className="bg-white/10 text-white/40 border-white/10">Locked</Badge>;
    }
  };

  if (isLoading) {
    return (
      <ProLayout>
        <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-8">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-32 w-full" />
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <Skeleton key={i} className="h-40 w-full" />
            ))}
          </div>
        </div>
      </ProLayout>
    );
  }

  return (
    <ProLayout>
      <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-amber-400" />
            <h1 className="text-3xl font-bold text-white">{totalWeeks}-Week Curriculum</h1>
          </div>
          <p className="text-white/60">
            {track === 'college' 
              ? 'Turn your side project into a startup by graduation'
              : 'From idea to validated product while keeping your day job'
            }
          </p>
        </div>

        {/* Overall Progress */}
        <Card className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Your Progress</h2>
                <p className="text-white/60">{completedCount} of {totalMissions} missions completed</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-2xl font-bold text-amber-400">{progressPercent}%</span>
                </div>
                <Progress value={progressPercent} className="w-32 h-3" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Curriculum Phases */}
        <div className="space-y-4">
          {phases.map((phase, index) => {
            const status = getPhaseStatus(index);
            const { total, completed } = getMissionsForWeekRange(phase.week);
            const PhaseIcon = phase.icon;
            
            return (
              <Card 
                key={index} 
                className={`border transition-colors ${
                  status === "in_progress" 
                    ? "bg-amber-500/5 border-amber-500/30" 
                    : status === "completed"
                    ? "bg-emerald-500/5 border-emerald-500/30"
                    : "bg-white/5 border-white/10"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Week indicator */}
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      status === "in_progress"
                        ? "bg-amber-500/20"
                        : status === "completed"
                        ? "bg-emerald-500/20"
                        : "bg-white/10"
                    }`}>
                      <PhaseIcon className={`w-8 h-8 ${
                        status === "in_progress"
                          ? "text-amber-400"
                          : status === "completed"
                          ? "text-emerald-400"
                          : "text-white/30"
                      }`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-sm font-medium ${
                          status === "locked" ? "text-white/40" : "text-amber-400"
                        }`}>
                          Week {phase.week}
                        </span>
                        {getStatusBadge(status)}
                      </div>
                      <h3 className={`text-xl font-semibold mb-2 ${
                        status === "locked" ? "text-white/50" : "text-white"
                      }`}>
                        {phase.title}
                      </h3>
                      <p className={`text-sm mb-4 ${
                        status === "locked" ? "text-white/30" : "text-white/60"
                      }`}>
                        {phase.description}
                      </p>

                      {/* Progress bar for non-locked phases */}
                      {status !== "locked" && total > 0 && (
                        <div className="flex items-center gap-4">
                          <Progress 
                            value={(completed / total) * 100} 
                            className="flex-1 h-2" 
                          />
                          <span className="text-sm text-white/60 whitespace-nowrap">
                            {completed}/{total} missions
                          </span>
                        </div>
                      )}

                      {/* Locked message */}
                      {status === "locked" && (
                        <div className="flex items-center gap-2 text-white/40 text-sm">
                          <Clock className="w-4 h-4" />
                          <span>Complete previous phases to unlock</span>
                        </div>
                      )}
                    </div>

                    {/* Action button */}
                    <div className="flex-shrink-0">
                      {status === "in_progress" ? (
                        <Button 
                          className="bg-amber-500 hover:bg-amber-600 text-black"
                          onClick={() => navigate('/pro/curriculum')}
                        >
                          Continue
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      ) : status === "completed" ? (
                        <Button variant="outline" className="border-emerald-500/30 text-emerald-400">
                          Review
                        </Button>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                          <Lock className="w-5 h-5 text-white/30" />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </ProLayout>
  );
}
