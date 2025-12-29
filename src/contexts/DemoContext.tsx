import React, { createContext, useContext, useMemo } from "react";
import { useLocation } from "react-router-dom";
import {
  DEMO_STUDENT,
  DEMO_SKILL_SCORES,
  DEMO_PITCH_ATTEMPTS,
  DEMO_CURRENT_MISSION,
  DEMO_MISSION_STEPS,
  DEMO_COMPLETED_MISSIONS,
  DEMO_TOTAL_MISSIONS,
  DEMO_CERTIFICATION_PROGRESS,
  DEMO_TANK_LEVEL,
  DEMO_TANK_XP,
} from "@/data/demoData";

interface DemoContextType {
  isDemoMode: boolean;
  demoStudent: typeof DEMO_STUDENT;
  demoSkillScores: typeof DEMO_SKILL_SCORES;
  demoPitchAttempts: typeof DEMO_PITCH_ATTEMPTS;
  demoCurrentMission: typeof DEMO_CURRENT_MISSION;
  demoMissionSteps: typeof DEMO_MISSION_STEPS;
  demoCompletedMissions: number;
  demoTotalMissions: number;
  demoCertificationProgress: typeof DEMO_CERTIFICATION_PROGRESS;
  demoTankLevel: string;
  demoTankXP: number;
}

const DemoContext = createContext<DemoContextType | null>(null);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  
  const isDemoMode = useMemo(() => {
    return location.pathname.startsWith("/demo");
  }, [location.pathname]);

  const value = useMemo(() => ({
    isDemoMode,
    demoStudent: DEMO_STUDENT,
    demoSkillScores: DEMO_SKILL_SCORES,
    demoPitchAttempts: DEMO_PITCH_ATTEMPTS,
    demoCurrentMission: DEMO_CURRENT_MISSION,
    demoMissionSteps: DEMO_MISSION_STEPS,
    demoCompletedMissions: DEMO_COMPLETED_MISSIONS,
    demoTotalMissions: DEMO_TOTAL_MISSIONS,
    demoCertificationProgress: DEMO_CERTIFICATION_PROGRESS,
    demoTankLevel: DEMO_TANK_LEVEL,
    demoTankXP: DEMO_TANK_XP,
  }), [isDemoMode]);

  return (
    <DemoContext.Provider value={value}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemoMode() {
  const context = useContext(DemoContext);
  
  // Return non-demo defaults if context is not available
  if (!context) {
    return {
      isDemoMode: false,
      demoStudent: null,
      demoSkillScores: [],
      demoPitchAttempts: [],
      demoCurrentMission: null,
      demoMissionSteps: [],
      demoCompletedMissions: 0,
      demoTotalMissions: 60,
      demoCertificationProgress: null,
      demoTankLevel: "Nervous Founder",
      demoTankXP: 0,
    };
  }
  
  return context;
}
