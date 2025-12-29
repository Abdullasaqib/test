import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Sparkles, CheckCircle2, Clock } from "lucide-react";

interface LiveBuildDemoProps {
  onComplete?: () => void;
}

const buildSteps = [
  {
    time: 0,
    prompt: "Create a habit tracker app with user accounts",
    description: "Setting up the foundation...",
    visual: "🏗️",
  },
  {
    time: 3,
    prompt: "",
    description: "User authentication added",
    visual: "🔐",
  },
  {
    time: 6,
    prompt: "Add a dashboard showing daily habits with checkboxes",
    description: "Building the main interface...",
    visual: "📊",
  },
  {
    time: 9,
    prompt: "",
    description: "Habit list with checkboxes ready",
    visual: "✅",
  },
  {
    time: 12,
    prompt: "Track streaks and show a progress chart",
    description: "Adding gamification...",
    visual: "📈",
  },
  {
    time: 15,
    prompt: "",
    description: "Streak tracking and charts done",
    visual: "🔥",
  },
  {
    time: 18,
    prompt: "Make it mobile-friendly with dark mode",
    description: "Polishing the design...",
    visual: "🌙",
  },
  {
    time: 21,
    prompt: "",
    description: "Responsive design complete",
    visual: "📱",
  },
  {
    time: 24,
    prompt: "",
    description: "App deployed and live! 🎉",
    visual: "🚀",
  },
];

export function LiveBuildDemo({ onComplete }: LiveBuildDemoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= 24) {
          setIsPlaying(false);
          onComplete?.();
          return 24;
        }
        return prev + 1;
      });
    }, 400); // Speed up for demo (400ms = 1 "second" of build time)

    return () => clearInterval(interval);
  }, [isPlaying, onComplete]);

  useEffect(() => {
    const step = buildSteps.findIndex((s, i) => {
      const nextStep = buildSteps[i + 1];
      return nextStep ? currentTime < nextStep.time : true;
    });
    setCurrentStep(step);
  }, [currentTime]);

  const reset = () => {
    setCurrentTime(0);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const progressPercent = (currentTime / 24) * 100;
  const currentStepData = buildSteps[currentStep];

  return (
    <Card className="overflow-hidden border-primary/20">
      <CardContent className="p-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 border-b border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="font-bold">Build a Full-Stack App in 5 Minutes</h3>
            </div>
            <Badge variant="outline" className="gap-1">
              <Clock className="h-3 w-3" />
              {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, "0")} / 0:24
            </Badge>
          </div>
        </div>

        {/* Demo Area */}
        <div className="p-6 space-y-6">
          {/* Progress Bar */}
          <div className="relative">
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-accent"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="flex justify-between mt-2">
              {buildSteps.filter((s) => s.prompt).map((step, i) => (
                <div
                  key={i}
                  className={`text-xs ${currentTime >= step.time ? "text-primary" : "text-muted-foreground"}`}
                >
                  {step.visual}
                </div>
              ))}
            </div>
          </div>

          {/* Current Prompt */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="min-h-[120px]"
            >
              {currentStepData.prompt && (
                <div className="bg-secondary/50 rounded-lg p-4 mb-3">
                  <p className="text-xs text-muted-foreground mb-1">Your prompt:</p>
                  <p className="font-mono text-sm">"{currentStepData.prompt}"</p>
                </div>
              )}
              
              <div className="flex items-center gap-3">
                <span className="text-4xl">{currentStepData.visual}</span>
                <div>
                  <p className="font-medium">{currentStepData.description}</p>
                  {currentTime === 24 && (
                    <p className="text-sm text-green-500 flex items-center gap-1 mt-1">
                      <CheckCircle2 className="h-4 w-4" />
                      Full-stack app with auth, database, and charts—deployed!
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Simulated App Preview */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="bg-secondary/50 px-3 py-1.5 flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-destructive/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              <span className="text-xs text-muted-foreground">habit-tracker.base44.app</span>
            </div>
            <div className="p-4 h-48 flex items-center justify-center">
              <motion.div
                className="text-center"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {currentTime < 24 ? (
                  <>
                    <div className="text-4xl mb-2">
                      {buildSteps.slice(0, currentStep + 1).map((s) => s.visual).join(" ")}
                    </div>
                    <p className="text-sm text-muted-foreground">Building your app...</p>
                  </>
                ) : (
                  <>
                    <div className="text-5xl mb-2">🎉</div>
                    <p className="font-bold text-lg text-primary">App Complete!</p>
                    <p className="text-sm text-muted-foreground">User auth • Database • Charts • Mobile • Deployed</p>
                  </>
                )}
              </motion.div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={reset}
              disabled={currentTime === 0}
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
            <Button
              size="lg"
              onClick={() => setIsPlaying(!isPlaying)}
              className="gap-2"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-4 w-4" />
                  Pause
                </>
              ) : currentTime === 24 ? (
                <>
                  <RotateCcw className="h-4 w-4" />
                  Watch Again
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  {currentTime > 0 ? "Resume" : "Watch the Magic"}
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
