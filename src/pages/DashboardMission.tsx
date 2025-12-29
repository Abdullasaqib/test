import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MissionCard } from "@/components/mission/MissionCard";
import { MissionSprintView } from "@/components/mission/MissionSprintView";
import { LabExecution } from "@/components/mission/LabExecution";
import { SimplifiedLabExecution } from "@/components/mission/SimplifiedLabExecution";
import { DailyReflection } from "@/components/mission/DailyReflection";
import { SkillGain } from "@/components/mission/SkillGain";
import { WelcomeJourney } from "@/components/dashboard/WelcomeJourney";
import { useMission } from "@/hooks/useMission";
import { useMissionSprints } from "@/hooks/useMissionSprints";
import { useStudent } from "@/hooks/useStudent";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, ArrowRight, Rocket } from "lucide-react";
import { toast } from "sonner";

type MissionPhase = "overview" | "sprints" | "execution" | "reflection" | "complete";

export default function DashboardMission() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { student } = useStudent();
  const {
    currentMission,
    nextMission,
    missionSteps,
    studentMissionStatus,
    missionSkills,
    skillTotals,
    completedCount,
    totalMissions,
    isLoading,
    startMission,
    completeMission,
  } = useMission();
  
  // Fetch sprints for the current mission
  const { sprints, completedSprintIds, loading: sprintsLoading, completeSprint } = useMissionSprints(
    currentMission?.id || null,
    student?.id || null
  );

  const [phase, setPhase] = useState<MissionPhase>("overview");
  const [labStartTime, setLabStartTime] = useState<Date | null>(null);
  const [stepResponses, setStepResponses] = useState<Record<string, string>>({});
  
  // Check if mission has sprints
  const hasSprints = sprints && sprints.length > 0;

  // Determine initial phase based on mission status
  useEffect(() => {
    if (studentMissionStatus?.status === "in_progress") {
      setPhase("execution");
      if (!labStartTime) {
        setLabStartTime(new Date(studentMissionStatus.started_at || Date.now()));
      }
    } else if (studentMissionStatus?.status === "completed") {
      setPhase("complete");
    }
  }, [studentMissionStatus]);

  const handleStartLab = async () => {
    try {
      await startMission.mutateAsync();
      setLabStartTime(new Date());
      // If mission has sprints, go to sprint view; otherwise go to execution
      setPhase(hasSprints ? "sprints" : "execution");
    } catch (error) {
      toast.error("Failed to start mission");
    }
  };
  
  // Handle sprint completion - when all sprints are done
  const handleSprintMissionComplete = async () => {
    if (!student || !currentMission) return;
    
    try {
      const timeSpentMinutes = labStartTime
        ? Math.round((Date.now() - labStartTime.getTime()) / 60000)
        : 15;
      
      // Complete the mission
      await completeMission.mutateAsync(timeSpentMinutes);
      setPhase("complete");
      toast.success("🎉 Mission complete! Great work!");
    } catch (error) {
      console.error("Error completing mission:", error);
      toast.error("Failed to complete mission");
    }
  };

  const handleLabComplete = async (responses: Record<string, string>) => {
    setStepResponses(responses);
    setPhase("reflection");
  };

  const handleReflectionSubmit = async (reflection: {
    whatLearned: string;
    whatSurprised: string;
    whatNext: string;
    mood: number;
  }) => {
    if (!student || !currentMission) return;

    try {
      // Calculate time spent
      const timeSpentMinutes = labStartTime
        ? Math.round((Date.now() - labStartTime.getTime()) / 60000)
        : 30;

      // Save reflection
      await supabase.from("reflections").insert({
        student_id: student.id,
        mission_id: currentMission.id,
        what_learned: reflection.whatLearned,
        what_surprised: reflection.whatSurprised,
        what_next: reflection.whatNext,
        mood: reflection.mood,
      });

      // Complete the mission
      await completeMission.mutateAsync(timeSpentMinutes);

      setPhase("complete");
      toast.success("Mission complete! Great work!");
    } catch (error) {
      console.error("Error completing mission:", error);
      toast.error("Failed to save your progress");
    }
  };

  const handleAskCoach = (prompt: string) => {
    // Navigate to coach with context
    navigate(`/dashboard/coach?prompt=${encodeURIComponent(prompt)}`);
  };

  const handleNextMission = async () => {
    // Reset state and invalidate queries to load next mission
    setPhase("overview");
    setLabStartTime(null);
    setStepResponses({});
    await queryClient.invalidateQueries({ queryKey: ['current-mission'] });
    await queryClient.invalidateQueries({ queryKey: ['student-mission-status'] });
  };

  // Only show loading skeleton on initial load (no data yet), not during refetch
  const hasInitialData = currentMission !== undefined;
  if ((isLoading && !hasInitialData) || (sprintsLoading && sprints.length === 0)) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </DashboardLayout>
    );
  }

  if (!currentMission) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-12 text-center">
              <Rocket className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-bold text-foreground mb-2">
                No Missions Available
              </h2>
              <p className="text-muted-foreground mb-6">
                Missions for your program are being prepared. Check back soon!
              </p>
              <Button onClick={() => navigate("/dashboard")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  const currentWeek = currentMission.week || 1;
  const totalWeeks = 12;

  // Calculate skills for display
  const earnedSkills = missionSkills?.map((sm) => ({
    skill: sm.skill,
    points: sm.points,
  })) || [];
  const totalXP = earnedSkills.reduce((sum, s) => sum + s.points, 0);

  return (
    <DashboardLayout currentWeek={currentWeek} totalWeeks={totalWeeks}>
      {/* Welcome Modal for first-time users */}
      <WelcomeJourney 
        studentName={student?.full_name} 
        onComplete={() => {}} 
      />

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard")}
            className="px-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Dashboard
          </Button>
          <span>/</span>
          <span className="text-foreground">
            Week {currentMission.week}, Day {currentMission.day}
          </span>
        </div>

        {/* Phase: Overview */}
        {phase === "overview" && (
          <MissionCard
            mission={currentMission}
            dayNumber={currentMission.day_number}
            totalDays={totalMissions}
            onStart={handleStartLab}
            isStarted={false}
          />
        )}

        {/* Phase: Sprints - Micro-sprint experience for missions with sprints */}
        {phase === "sprints" && hasSprints && (
          <MissionSprintView
            mission={currentMission}
            sprints={sprints}
            completedSprintIds={completedSprintIds}
            onSprintComplete={completeSprint}
            onMissionComplete={handleSprintMissionComplete}
            onBack={() => setPhase("overview")}
          />
        )}

        {/* Phase: Execution - With detailed steps (fallback for missions without sprints) */}
        {phase === "execution" && missionSteps && missionSteps.length > 0 && (
          <LabExecution
            mission={currentMission}
            steps={missionSteps}
            onComplete={handleLabComplete}
            onAskCoach={handleAskCoach}
            onBack={() => setPhase("overview")}
          />
        )}

        {/* Phase: Execution - Simplified (uses lab_prompt directly, fallback) */}
        {phase === "execution" && (!missionSteps || missionSteps.length === 0) && (
          <SimplifiedLabExecution
            mission={currentMission}
            onComplete={handleLabComplete}
            onAskCoach={handleAskCoach}
            onBack={() => setPhase("overview")}
          />
        )}

        {/* Phase: Reflection */}
        {phase === "reflection" && (
          <DailyReflection
            missionTitle={currentMission.title}
            onSubmit={handleReflectionSubmit}
          />
        )}

        {/* Phase: Complete */}
        {phase === "complete" && (
          <div className="space-y-6">
            <SkillGain
              skills={earnedSkills}
              totalPointsEarned={totalXP}
              streakDays={completedCount}
              nextMission={nextMission}
              skillTotals={skillTotals}
            />

            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => navigate("/dashboard")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
              <Button onClick={handleNextMission}>
                Next Mission
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
