import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Rocket, 
  Lightbulb, 
  Users, 
  Code, 
  Presentation,
  ChevronRight,
  Sparkles,
  Trophy
} from "lucide-react";

interface WelcomeJourneyProps {
  studentName?: string;
  onComplete: () => void;
}

const JOURNEY_PHASES = [
  { icon: Lightbulb, name: "Discovery", weeks: "1-2", color: "text-blue-500", desc: "Find problems worth solving" },
  { icon: Users, name: "Validation", weeks: "3-4", color: "text-purple-500", desc: "Talk to real customers" },
  { icon: Code, name: "Building", weeks: "5-8", color: "text-green-500", desc: "Create your prototype" },
  { icon: Rocket, name: "Growth", weeks: "9-10", color: "text-orange-500", desc: "Get your first users" },
  { icon: Presentation, name: "Pitch", weeks: "11-12", color: "text-red-500", desc: "Present to investors" },
];

const ARTIFACTS = [
  { name: "Problem Card", icon: "📋" },
  { name: "Landing Page", icon: "🌐" },
  { name: "Prototype", icon: "🔧" },
  { name: "Customer Emails", icon: "📧" },
  { name: "Pitch Deck", icon: "📊" },
  { name: "Pitch Video", icon: "🎬" },
];

export function WelcomeJourney({ studentName, onComplete }: WelcomeJourneyProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Check if user has seen welcome before
    const hasSeenWelcome = localStorage.getItem("nbl_welcome_seen");
    if (!hasSeenWelcome) {
      setOpen(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem("nbl_welcome_seen", "true");
    setOpen(false);
    onComplete();
  };

  const firstName = studentName?.split(" ")[0] || "Builder";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden border-2 border-primary/20">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"
              >
                <Rocket className="h-10 w-10 text-primary" />
              </motion.div>
              
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Hey {firstName}! 👋
              </h2>
              <p className="text-muted-foreground mb-6">
                Ready to build your first real business?<br />
                Let me show you how this works.
              </p>
              
              <Button onClick={() => setStep(1)} size="lg" className="w-full">
                Show me!
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="journey"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-6"
            >
              <div className="text-center mb-6">
                <Badge variant="outline" className="mb-2">Your 12-Week Journey</Badge>
                <h3 className="text-lg font-semibold text-foreground">
                  From idea to real business
                </h3>
              </div>
              
              <div className="space-y-3 mb-6">
                {JOURNEY_PHASES.map((phase, i) => (
                  <motion.div
                    key={phase.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                  >
                    <div className={`p-2 rounded-full bg-background ${phase.color}`}>
                      <phase.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-foreground">{phase.name}</p>
                      <p className="text-xs text-muted-foreground">{phase.desc}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      Wk {phase.weeks}
                    </Badge>
                  </motion.div>
                ))}
              </div>
              
              <Button onClick={() => setStep(2)} size="lg" className="w-full">
                What will I create?
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="artifacts"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-6"
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-2">
                  <Sparkles className="h-4 w-4" />
                  Artifacts
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  Real things you'll build
                </h3>
                <p className="text-sm text-muted-foreground">
                  Not homework. Actual business assets.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                {ARTIFACTS.map((artifact, i) => (
                  <motion.div
                    key={artifact.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08 }}
                    className="p-3 rounded-lg bg-muted/50 text-center"
                  >
                    <span className="text-2xl mb-1 block">{artifact.icon}</span>
                    <p className="text-xs font-medium text-foreground">{artifact.name}</p>
                  </motion.div>
                ))}
              </div>
              
              <Button onClick={() => setStep(3)} size="lg" className="w-full">
                How does each day work?
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="daily"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-6"
            >
              <div className="text-center mb-6">
                <Badge variant="outline" className="mb-2">30 Minutes Daily</Badge>
                <h3 className="text-lg font-semibold text-foreground">
                  Your daily mission
                </h3>
              </div>
              
              <div className="space-y-4 mb-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-lg border border-border bg-background"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center text-sm font-bold shrink-0">
                    5
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Learn</p>
                    <p className="text-sm text-muted-foreground">Quick micro-lesson to prepare you</p>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-start gap-3 p-4 rounded-lg border-2 border-primary/20 bg-primary/5"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold shrink-0">
                    20
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Build</p>
                    <p className="text-sm text-muted-foreground">Execute your lab mission with AI help</p>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-start gap-3 p-4 rounded-lg border border-border bg-background"
                >
                  <div className="w-8 h-8 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center text-sm font-bold shrink-0">
                    5
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Reflect</p>
                    <p className="text-sm text-muted-foreground">Capture what you learned</p>
                  </div>
                </motion.div>
              </div>
              
              <Button onClick={handleComplete} size="lg" className="w-full">
                <Trophy className="mr-2 h-4 w-4" />
                Let's start my journey!
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}