import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useStudent } from "./useStudent";

export interface WeekProgress {
  week: number;
  theme: string;
  emoji: string;
  tagline: string;
  totalMissions: number;
  completedMissions: number;
  status: 'completed' | 'in_progress' | 'current' | 'locked';
  missions: WeekMission[];
}

export interface WeekMission {
  id: string;
  day: number;
  title: string;
  subtitle: string | null;
  estimated_minutes: number;
  status: 'completed' | 'in_progress' | 'available' | 'locked';
}

// Week themes with kid-friendly descriptions (Vibe Coding focus in weeks 5-7)
const weekThemes: Record<number, { theme: string; emoji: string; tagline: string }> = {
  1: { theme: "Problem Hunting", emoji: "🔍", tagline: "Find problems worth solving!" },
  2: { theme: "Customer Detective", emoji: "👥", tagline: "Interview real people like a pro" },
  3: { theme: "Reality Check", emoji: "✅", tagline: "Prove your idea has legs" },
  4: { theme: "Solution Architect", emoji: "💡", tagline: "Design your big idea" },
  5: { theme: "MVP Builder", emoji: "🏗️", tagline: "Build your first app with AI!" },
  6: { theme: "Launch Pad", emoji: "🌐", tagline: "Create your AI-powered landing page" },
  7: { theme: "Vibe Coder Pro", emoji: "✨", tagline: "Master AI-assisted building" },
  8: { theme: "Test Lab", emoji: "🧪", tagline: "Let real users try it" },
  9: { theme: "Growth Hacker", emoji: "📈", tagline: "Get your first customers" },
  10: { theme: "Launch Day", emoji: "🚀", tagline: "Ship it to the world!" },
  11: { theme: "Pitch Perfect", emoji: "🎤", tagline: "Build your investor deck" },
  12: { theme: "Demo Day", emoji: "🏆", tagline: "Show the world what you built" },
};

export function useJourney() {
  const { student, loading: studentLoading } = useStudent();

  // Get all missions for student's track
  const { data: missions, isLoading: missionsLoading } = useQuery({
    queryKey: ['journey-missions', student?.program],
    queryFn: async () => {
      if (!student) return [];

      const track = student.program === 'junior' ? 'junior' : 
                    student.program === 'teen' ? 'teen' : 'advanced';

      const { data, error } = await supabase
        .from('missions')
        .select('id, week, day, day_number, title, subtitle, estimated_minutes')
        .eq('track', track)
        .order('day_number', { ascending: true });

      if (error) throw error;
      return data || [];
    },
    enabled: !!student,
  });

  // Get student's mission progress
  const { data: studentMissions, isLoading: progressLoading } = useQuery({
    queryKey: ['journey-progress', student?.id],
    queryFn: async () => {
      if (!student) return [];

      const { data, error } = await supabase
        .from('student_missions')
        .select('mission_id, status')
        .eq('student_id', student.id);

      if (error) throw error;
      return data || [];
    },
    enabled: !!student,
  });

  // Calculate week progress
  const weekProgress: WeekProgress[] = [];
  
  if (missions && studentMissions) {
    const completedSet = new Set(
      studentMissions.filter(sm => sm.status === 'completed').map(sm => sm.mission_id)
    );
    const inProgressSet = new Set(
      studentMissions.filter(sm => sm.status === 'in_progress').map(sm => sm.mission_id)
    );

    // Group missions by week
    const missionsByWeek: Record<number, typeof missions> = {};
    missions.forEach(m => {
      if (!missionsByWeek[m.week]) missionsByWeek[m.week] = [];
      missionsByWeek[m.week].push(m);
    });

    let foundCurrentWeek = false;

    for (let week = 1; week <= 12; week++) {
      const weekMissions = missionsByWeek[week] || [];
      const completedCount = weekMissions.filter(m => completedSet.has(m.id)).length;
      const hasInProgress = weekMissions.some(m => inProgressSet.has(m.id));
      
      let weekStatus: WeekProgress['status'];
      
      if (completedCount === weekMissions.length && weekMissions.length > 0) {
        weekStatus = 'completed';
      } else if (hasInProgress || (completedCount > 0 && completedCount < weekMissions.length)) {
        weekStatus = 'in_progress';
        foundCurrentWeek = true;
      } else if (!foundCurrentWeek && completedCount === 0) {
        // First week with no progress is the current week
        weekStatus = 'current';
        foundCurrentWeek = true;
      } else {
        weekStatus = 'locked';
      }

      const theme = weekThemes[week] || { theme: `Week ${week}`, emoji: "📚", tagline: "Keep learning!" };

      weekProgress.push({
        week,
        theme: theme.theme,
        emoji: theme.emoji,
        tagline: theme.tagline,
        totalMissions: weekMissions.length || 5,
        completedMissions: completedCount,
        status: weekStatus,
        missions: weekMissions.map(m => ({
          id: m.id,
          day: m.day,
          title: m.title,
          subtitle: m.subtitle,
          estimated_minutes: m.estimated_minutes,
          status: completedSet.has(m.id) ? 'completed' : 
                  inProgressSet.has(m.id) ? 'in_progress' :
                  (weekStatus === 'current' || weekStatus === 'in_progress') ? 'available' : 'locked'
        }))
      });
    }
  }

  // Find current week - memoized to prevent recalculation on navigation
  const currentWeek = useMemo(() => {
    return weekProgress.find(w => w.status === 'current' || w.status === 'in_progress')?.week || 1;
  }, [weekProgress]);
  
  // Calculate total progress - memoized
  const { totalCompleted, totalMissions, overallProgress } = useMemo(() => {
    const completed = weekProgress.reduce((sum, w) => sum + w.completedMissions, 0);
    const total = weekProgress.reduce((sum, w) => sum + w.totalMissions, 0);
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { totalCompleted: completed, totalMissions: total, overallProgress: progress };
  }, [weekProgress]);

  return {
    weekProgress,
    currentWeek,
    totalCompleted,
    totalMissions,
    overallProgress,
    weekThemes,
    isLoading: studentLoading || missionsLoading || progressLoading,
  };
}