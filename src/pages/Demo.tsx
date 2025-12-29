import { Outlet, useLocation } from "react-router-dom";
import { DemoProvider } from "@/contexts/DemoContext";
import { DemoBanner } from "@/components/demo/DemoBanner";
import { DemoLayout } from "@/components/demo/DemoLayout";
import { HeroWelcome } from "@/components/dashboard/HeroWelcome";
import { TodaysMission } from "@/components/dashboard/TodaysMission";
import { QuickJourney } from "@/components/dashboard/QuickJourney";
import { TankCard } from "@/components/dashboard/TankCard";
import { CertificationProgressCard } from "@/components/dashboard/CertificationProgressCard";
import {
  DEMO_STUDENT,
  DEMO_CURRENT_MISSION,
  DEMO_COMPLETED_MISSIONS,
  DEMO_TANK_LEVEL,
  DEMO_TANK_XP,
  DEMO_CERTIFICATION_PROGRESS,
} from "@/data/demoData";

function DemoDashboardContent() {
  const currentMission = {
    week: DEMO_CURRENT_MISSION.week,
    day: DEMO_CURRENT_MISSION.day,
    title: DEMO_CURRENT_MISSION.title,
    subtitle: DEMO_CURRENT_MISSION.subtitle || "",
    estimatedMinutes: DEMO_CURRENT_MISSION.estimated_minutes,
  };

  return (
    <DemoLayout>
      <div className="space-y-6">
        <HeroWelcome 
          firstName={DEMO_STUDENT.full_name.split(" ")[0]} 
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TodaysMission 
              currentMission={currentMission}
              completedCount={DEMO_COMPLETED_MISSIONS}
            />
          </div>
          
          <div className="space-y-6">
            <QuickJourney 
              currentWeek={DEMO_CURRENT_MISSION.week}
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <TankCard 
            founderLevel={DEMO_TANK_LEVEL}
            totalXP={DEMO_TANK_XP}
            lastScore={82}
          />
          <CertificationProgressCard 
            lessonsCompleted={DEMO_CERTIFICATION_PROGRESS.completedLessons}
            totalLessons={DEMO_CERTIFICATION_PROGRESS.totalLessons}
            isEnrolled={true}
            isCompleted={false}
          />
        </div>
      </div>
    </DemoLayout>
  );
}

export default function Demo() {
  const location = useLocation();
  
  // If accessing /demo exactly, show dashboard
  // If accessing /demo/*, render nested routes via Outlet
  const isExactDemo = location.pathname === "/demo";

  return (
    <DemoProvider>
      <DemoBanner />
      {isExactDemo ? <DemoDashboardContent /> : <Outlet />}
    </DemoProvider>
  );
}
