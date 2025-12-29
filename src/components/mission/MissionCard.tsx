import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Sparkles, ChevronRight, Play, Rocket, Heart } from "lucide-react";
import { Mission } from "@/hooks/useMission";
import { motion } from "framer-motion";

interface MissionCardProps {
  mission: Mission;
  dayNumber: number;
  totalDays: number;
  onStart: () => void;
  isStarted: boolean;
}

const PHASE_NAMES = ["", "Discovery", "Validation", "Building", "Growth", "Pitch"];
const PHASE_COLORS = ["", "bg-blue-500/10 text-blue-500", "bg-purple-500/10 text-purple-500", "bg-green-500/10 text-green-500", "bg-orange-500/10 text-orange-500", "bg-red-500/10 text-red-500"];

export function MissionCard({ mission, dayNumber, totalDays, onStart, isStarted }: MissionCardProps) {
  const isFirstMission = dayNumber === 1;

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-background to-muted/30 overflow-hidden">
      {/* First Mission Welcome Banner */}
      {isFirstMission && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-b border-primary/20 p-4"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-primary/20 shrink-0">
              <Rocket className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                Your First Mission!
                <span className="text-lg">🎯</span>
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Today you'll start discovering problems worth solving. This is Step 1 of building YOUR business.
              </p>
              <div className="flex items-center gap-2 mt-2 text-sm">
                <Heart className="h-4 w-4 text-pink-500" />
                <span className="text-muted-foreground">Don't worry about being perfect – just be curious!</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Header */}
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              Day {dayNumber} of {totalDays}
            </Badge>
            <Badge className={`text-xs ${PHASE_COLORS[mission.phase]}`}>
              Phase {mission.phase}: {PHASE_NAMES[mission.phase]}
            </Badge>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <Clock className="h-4 w-4" />
            <span>{mission.estimated_minutes} min</span>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-foreground">
          {mission.title}
        </h2>
        {mission.subtitle && (
          <p className="text-muted-foreground">{mission.subtitle}</p>
        )}
      </CardHeader>

      {/* Micro Content */}
      <CardContent className="space-y-6">
        <div className="bg-muted/50 rounded-lg p-6 border border-border">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 rounded-full bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Today's Micro-Lesson</h3>
              <p className="text-sm text-muted-foreground">5 minute read</p>
            </div>
          </div>
          
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p className="text-foreground/90 leading-relaxed whitespace-pre-line">
              {mission.micro_content}
            </p>
          </div>
        </div>

        {/* Video if available */}
        {mission.video_url && (
          <div className="bg-muted/30 rounded-lg p-4 border border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Play className="h-4 w-4" />
              <span>Optional: Founder Story Video</span>
            </div>
            <a 
              href={mission.video_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline text-sm"
            >
              Watch inspiration video →
            </a>
          </div>
        )}

        {/* Lab Prompt Preview */}
        <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
          <h4 className="font-medium text-foreground mb-2">🔬 Today's Lab Mission</h4>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {mission.lab_prompt}
          </p>
        </div>

        {/* Start Button */}
        <Button 
          onClick={onStart} 
          size="lg" 
          className="w-full group"
        >
          {isStarted ? "Continue Lab" : isFirstMission ? "I'm ready – Let's go!" : "I understand – Start Lab"}
          <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
}
