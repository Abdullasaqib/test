import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useStudent } from "./useStudent";

export interface Base44Lesson {
  id: string;
  title: string;
  lessonOrder: number;
  estimatedMinutes: number;
  module: 'PLAN' | 'PROMPT';
  isCompleted: boolean;
}

export interface WeekMission {
  id: string;
  day: number;
  title: string;
  subtitle: string | null;
  estimatedMinutes: number;
  status: 'completed' | 'in_progress' | 'available' | 'locked';
}

export interface HybridWeekProgress {
  week: number;
  theme: string;
  emoji: string;
  tagline: string;
  // Base44 structured lessons for this week
  base44Lessons: Base44Lesson[];
  // Original hands-on missions
  missions: WeekMission[];
  totalMissions: number;
  completedMissions: number;
  completedLessons: number;
  status: 'completed' | 'in_progress' | 'current' | 'locked';
}

// Base44 Lesson to Week mapping
// PLAN Module (Lessons 1-6) → Weeks 1-4
// PROMPT Module (Lessons 7-10) → Weeks 5-8
const lessonWeekMapping: Record<number, number> = {
  1: 1, // The Entrepreneurial Journey → Week 1
  2: 1, // The Entrepreneurial Mindset → Week 1
  3: 2, // What is Entrepreneurial Opportunity? → Week 2
  4: 2, // How to Find Business Opportunities → Week 2
  5: 3, // Drafting Your Business Plan → Week 3
  6: 4, // Your Elevator Pitch → Week 4
  7: 5, // Build Better Prompts: The BASE Framework → Week 5
  8: 6, // Level Up Your Prompts → Week 6
  9: 7, // Bring Your Prompt to Life with Base44 → Week 7
  10: 8, // Present Your Venture Opportunity → Week 8
};

// Week themes integrating Base44 + Original curriculum
const weekThemes: Record<number, { theme: string; emoji: string; tagline: string; focus: string }> = {
  1: { 
    theme: "The Entrepreneurial Journey", 
    emoji: "🚀", 
    tagline: "Start your founder adventure!",
    focus: "PLAN Module: Understanding entrepreneurship"
  },
  2: { 
    theme: "Finding Opportunities", 
    emoji: "🔍", 
    tagline: "Discover problems worth solving",
    focus: "PLAN Module: Opportunity identification"
  },
  3: { 
    theme: "Business Planning", 
    emoji: "📋", 
    tagline: "Map out your venture",
    focus: "PLAN Module: Business plan basics"
  },
  4: { 
    theme: "Your Elevator Pitch", 
    emoji: "🎤", 
    tagline: "Sell your idea in 60 seconds",
    focus: "PLAN Module: Pitch development"
  },
  5: { 
    theme: "The BASE Framework", 
    emoji: "🎯", 
    tagline: "Master AI prompting",
    focus: "PROMPT Module: Structured prompting"
  },
  6: { 
    theme: "Level Up Prompts", 
    emoji: "⬆️", 
    tagline: "Advanced prompt techniques",
    focus: "PROMPT Module: Prompt optimization"
  },
  7: { 
    theme: "Build with Base44", 
    emoji: "🏗️", 
    tagline: "Create your first AI app!",
    focus: "PROMPT Module: App building"
  },
  8: { 
    theme: "Present Your Venture", 
    emoji: "🎬", 
    tagline: "Showcase what you built",
    focus: "PROMPT Module: Final presentation"
  },
  9: { 
    theme: "Growth & Testing", 
    emoji: "📈", 
    tagline: "Get real users and feedback",
    focus: "Hands-on: User testing & iteration"
  },
  10: { 
    theme: "Launch Day", 
    emoji: "🚀", 
    tagline: "Ship it to the world!",
    focus: "Hands-on: Product launch"
  },
  11: { 
    theme: "Pitch Perfect", 
    emoji: "💎", 
    tagline: "Build your investor deck",
    focus: "Hands-on: Investor preparation"
  },
  12: { 
    theme: "Demo Day", 
    emoji: "🏆", 
    tagline: "Show the world what you built!",
    focus: "Hands-on: Final presentation"
  },
};

export function useHybridCurriculum() {
  const { student, loading: studentLoading } = useStudent();

  // Get AI Builder certification ID
  const { data: certification } = useQuery({
    queryKey: ['ai-builder-certification'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('certifications')
        .select('id')
        .eq('slug', 'ai-founders-certificate')
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  // Get Base44 lessons
  const { data: base44Lessons, isLoading: lessonsLoading } = useQuery({
    queryKey: ['base44-lessons', certification?.id],
    queryFn: async () => {
      if (!certification?.id) return [];

      const { data, error } = await supabase
        .from('certification_lessons')
        .select('id, title, lesson_order, estimated_minutes')
        .eq('certification_id', certification.id)
        .order('lesson_order', { ascending: true });

      if (error) throw error;
      return data || [];
    },
    enabled: !!certification?.id,
  });

  // Get lesson progress
  const { data: lessonProgress, isLoading: lessonProgressLoading } = useQuery({
    queryKey: ['lesson-progress', student?.id],
    queryFn: async () => {
      if (!student?.id) return [];

      const { data, error } = await supabase
        .from('certification_progress')
        .select('lesson_id, completed_at')
        .eq('student_id', student.id);

      if (error) throw error;
      return data || [];
    },
    enabled: !!student?.id,
  });

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

  // Build hybrid week progress
  const weekProgress: HybridWeekProgress[] = [];
  
  if (missions && studentMissions && base44Lessons) {
    const completedMissionSet = new Set(
      studentMissions.filter(sm => sm.status === 'completed').map(sm => sm.mission_id)
    );
    const inProgressMissionSet = new Set(
      studentMissions.filter(sm => sm.status === 'in_progress').map(sm => sm.mission_id)
    );
    const completedLessonSet = new Set(
      (lessonProgress || []).map(lp => lp.lesson_id)
    );

    // Group missions by week
    const missionsByWeek: Record<number, typeof missions> = {};
    missions.forEach(m => {
      if (!missionsByWeek[m.week]) missionsByWeek[m.week] = [];
      missionsByWeek[m.week].push(m);
    });

    // Group Base44 lessons by week using mapping
    const lessonsByWeek: Record<number, typeof base44Lessons> = {};
    base44Lessons.forEach(lesson => {
      const week = lessonWeekMapping[lesson.lesson_order];
      if (week) {
        if (!lessonsByWeek[week]) lessonsByWeek[week] = [];
        lessonsByWeek[week].push(lesson);
      }
    });

    let foundCurrentWeek = false;

    for (let week = 1; week <= 12; week++) {
      const weekMissions = missionsByWeek[week] || [];
      const weekLessons = lessonsByWeek[week] || [];
      
      const completedMissionCount = weekMissions.filter(m => completedMissionSet.has(m.id)).length;
      const completedLessonCount = weekLessons.filter(l => completedLessonSet.has(l.id)).length;
      const hasInProgress = weekMissions.some(m => inProgressMissionSet.has(m.id));
      
      const totalItems = weekMissions.length + weekLessons.length;
      const completedItems = completedMissionCount + completedLessonCount;

      let weekStatus: HybridWeekProgress['status'];
      
      if (completedItems === totalItems && totalItems > 0) {
        weekStatus = 'completed';
      } else if (hasInProgress || (completedItems > 0 && completedItems < totalItems)) {
        weekStatus = 'in_progress';
        foundCurrentWeek = true;
      } else if (!foundCurrentWeek && completedItems === 0) {
        weekStatus = 'current';
        foundCurrentWeek = true;
      } else {
        weekStatus = 'locked';
      }

      const theme = weekThemes[week] || { 
        theme: `Week ${week}`, 
        emoji: "📚", 
        tagline: "Keep learning!",
        focus: "Hands-on practice"
      };

      weekProgress.push({
        week,
        theme: theme.theme,
        emoji: theme.emoji,
        tagline: theme.tagline,
        base44Lessons: weekLessons.map(l => ({
          id: l.id,
          title: l.title,
          lessonOrder: l.lesson_order,
          estimatedMinutes: l.estimated_minutes,
          module: l.lesson_order <= 6 ? 'PLAN' : 'PROMPT',
          isCompleted: completedLessonSet.has(l.id),
        })),
        missions: weekMissions.map(m => ({
          id: m.id,
          day: m.day,
          title: m.title,
          subtitle: m.subtitle,
          estimatedMinutes: m.estimated_minutes,
          status: completedMissionSet.has(m.id) ? 'completed' : 
                  inProgressMissionSet.has(m.id) ? 'in_progress' :
                  (weekStatus === 'current' || weekStatus === 'in_progress') ? 'available' : 'locked'
        })),
        totalMissions: weekMissions.length,
        completedMissions: completedMissionCount,
        completedLessons: completedLessonCount,
        status: weekStatus,
      });
    }
  }

  // Calculate totals
  const currentWeek = weekProgress.find(w => w.status === 'current' || w.status === 'in_progress')?.week || 1;
  const totalCompletedMissions = weekProgress.reduce((sum, w) => sum + w.completedMissions, 0);
  const totalMissions = weekProgress.reduce((sum, w) => sum + w.totalMissions, 0);
  const totalCompletedLessons = weekProgress.reduce((sum, w) => sum + w.completedLessons, 0);
  const totalLessons = base44Lessons?.length || 10;
  
  const overallProgress = (totalMissions + totalLessons) > 0 
    ? Math.round(((totalCompletedMissions + totalCompletedLessons) / (totalMissions + totalLessons)) * 100) 
    : 0;

  return {
    weekProgress,
    currentWeek,
    totalCompletedMissions,
    totalMissions,
    totalCompletedLessons,
    totalLessons,
    overallProgress,
    weekThemes,
    isLoading: studentLoading || missionsLoading || progressLoading || lessonsLoading || lessonProgressLoading,
  };
}
