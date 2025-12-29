import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Rocket, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useDemoMode } from "@/contexts/DemoContext";
import { DemoActionBlocker } from "@/components/demo/DemoActionBlocker";

interface Mission {
  week: number;
  day: number;
  title: string;
  subtitle?: string;
  estimated_minutes?: number;
}

interface TodaysMissionProps {
  currentMission: Mission | null;
  completedCount: number;
}

export function TodaysMission({ currentMission, completedCount }: TodaysMissionProps) {
  const { isDemoMode } = useDemoMode();

  const getMissionEncouragement = () => {
    if (!currentMission) return "Your journey to build what's NEXT_ starts now!";
    if (currentMission.week === 1) return "Discover problems nobody else sees!";
    if (currentMission.week <= 4) return "Find what the world didn't know it needed!";
    if (currentMission.week <= 8) return "Build solutions nobody else imagined!";
    if (currentMission.week <= 10) return "Launch what changes everything!";
    return "Pitch like the founders who reimagined the world!";
  };

  const getButtonText = () => {
    if (completedCount === 0) return "Build What's NEXT_ 🚀";
    return "Continue Creating →";
  };

  // Demo mode: wrap links in DemoActionBlocker
  const MissionButton = isDemoMode ? (
    <DemoActionBlocker action="start this mission">
      <Button size="lg" className="flex-1 text-lg h-12 font-semibold w-full">
        {getButtonText()}
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </DemoActionBlocker>
  ) : (
    <Button size="lg" className="flex-1 text-lg h-12 font-semibold" asChild>
      <Link to="/dashboard/mission">
        {getButtonText()}
        <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
    </Button>
  );

  const JourneyButton = isDemoMode ? (
    <DemoActionBlocker action="view the full journey">
      <Button variant="outline" size="lg" className="h-12 w-full">
        View Full Journey
      </Button>
    </DemoActionBlocker>
  ) : (
    <Button variant="outline" size="lg" className="h-12" asChild>
      <Link to="/dashboard/curriculum">
        View Full Journey
      </Link>
    </Button>
  );

  return (
    <Card className="overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-background to-purple-500/5 shadow-lg shadow-primary/5">
      {/* Header banner */}
      <div className="bg-gradient-to-r from-primary via-primary/90 to-purple-600 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-primary-foreground" />
            <span className="text-sm font-semibold text-primary-foreground uppercase tracking-wider">
              Today's Mission
            </span>
          </div>
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            <Clock className="h-3 w-3 mr-1" />
            ~{currentMission?.estimated_minutes || 30} min
          </Badge>
        </div>
      </div>

      <CardContent className="p-6 md:p-8">
        <div className="space-y-4">
          {/* Mission title */}
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              {currentMission 
                ? `Week ${currentMission.week}, Day ${currentMission.day}`
                : "Day 1"
              }
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {currentMission?.title || "Begin Your Journey"}
            </h2>
          </div>

          {/* Encouragement */}
          <p className="text-lg text-muted-foreground">
            {currentMission?.subtitle || getMissionEncouragement()}
          </p>

          {/* What you'll do today */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
            <Sparkles className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-foreground">Today's goal:</p>
              <p className="text-sm text-muted-foreground">
                {currentMission 
                  ? "5 min learn → 20 min build → 5 min reflect"
                  : "Think like the founders who changed everything!"
                }
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            {MissionButton}
            {JourneyButton}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
