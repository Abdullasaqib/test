import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { FlaskConical, Clock, ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import { Mission, MissionStep as MissionStepType } from "@/hooks/useMission";
import { MissionStep } from "./MissionStep";
import { AICoachPanel } from "./AICoachPanel";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface LabExecutionProps {
  mission: Mission;
  steps: MissionStepType[];
  onComplete: (stepResponses: Record<string, string>) => void;
  onBack: () => void;
  onAskCoach: (prompt: string) => void;
}

const DRAFT_KEY_PREFIX = "mission_draft_";

export function LabExecution({ mission, steps, onComplete, onBack, onAskCoach }: LabExecutionProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepResponses, setStepResponses] = useState<Record<string, string>>({});
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [startTime] = useState(Date.now());
  const [showCoachPanel, setShowCoachPanel] = useState(false);
  const [coachPrompt, setCoachPrompt] = useState("");
  const [justCompletedStep, setJustCompletedStep] = useState<string | null>(null);

  const currentStep = steps[currentStepIndex];
  const progress = (completedSteps.size / steps.length) * 100;
  const allStepsCompleted = completedSteps.size === steps.length;
  const draftKey = `${DRAFT_KEY_PREFIX}${mission.id}`;

  // Load draft from localStorage on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem(draftKey);
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        setStepResponses(parsed.responses || {});
        setCompletedSteps(new Set(parsed.completedSteps || []));
        if (parsed.currentStepIndex !== undefined) {
          setCurrentStepIndex(parsed.currentStepIndex);
        }
        toast.success("Draft restored! Your progress was saved.", {
          duration: 3000,
        });
      } catch (e) {
        console.error("Failed to parse draft:", e);
      }
    }
  }, [draftKey]);

  // Auto-save draft with debounce
  const saveDraft = useCallback(() => {
    const draft = {
      responses: stepResponses,
      completedSteps: Array.from(completedSteps),
      currentStepIndex,
      savedAt: Date.now(),
    };
    localStorage.setItem(draftKey, JSON.stringify(draft));
  }, [draftKey, stepResponses, completedSteps, currentStepIndex]);

  useEffect(() => {
    const timeoutId = setTimeout(saveDraft, 2000); // Debounce 2 seconds
    return () => clearTimeout(timeoutId);
  }, [stepResponses, completedSteps, currentStepIndex, saveDraft]);

  // Clear draft on successful completion
  const handleLabComplete = () => {
    localStorage.removeItem(draftKey);
    onComplete(stepResponses);
  };

  const handleStepComplete = (stepId: string) => {
    setCompletedSteps(prev => new Set([...prev, stepId]));
    setJustCompletedStep(stepId);
    
    // Clear animation after delay
    setTimeout(() => setJustCompletedStep(null), 1500);
    
    // Move to next step if available
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handleResponseChange = (stepId: string, value: string) => {
    setStepResponses(prev => ({ ...prev, [stepId]: value }));
  };

  const handleAskCoach = (prompt: string) => {
    setCoachPrompt(prompt);
    setShowCoachPanel(true);
  };

  const handleInsertSuggestion = (text: string) => {
    if (currentStep) {
      const currentValue = stepResponses[currentStep.id] || "";
      const newValue = currentValue ? `${currentValue}\n\n${text}` : text;
      setStepResponses(prev => ({ ...prev, [currentStep.id]: newValue }));
    }
    setShowCoachPanel(false);
  };

  const elapsedMinutes = Math.floor((Date.now() - startTime) / 60000);
  const stepsRemaining = steps.length - completedSteps.size;

  return (
    <div className="space-y-6">
      {/* Lab Header */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Lesson
            </Button>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="gap-1">
                <Clock className="h-3 w-3" />
                {elapsedMinutes} min
              </Badge>
              <Badge variant="secondary" className="gap-1">
                {completedSteps.size}/{steps.length} steps
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-3 mt-4">
            <div className="p-3 rounded-full bg-primary/10">
              <FlaskConical className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">{mission.title} – Lab</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{mission.lab_prompt}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Lab Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Encouragement Message */}
          {stepsRemaining > 0 && stepsRemaining <= 2 && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-primary mt-3 font-medium"
            >
              {stepsRemaining === 1 ? "Almost there! Just 1 step to go!" : "Great momentum! Only 2 steps left!"}
            </motion.p>
          )}
        </CardHeader>
      </Card>

      {/* Floating AI Coach Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowCoachPanel(true)}
        className="fixed bottom-6 right-6 z-40 shadow-lg border-primary/30 bg-background hover:bg-primary/10"
      >
        <Sparkles className="h-4 w-4 mr-2 text-primary" />
        AI Coach
      </Button>

      {/* Steps */}
      <div className="space-y-4">
        <AnimatePresence>
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <MissionStep
                step={step}
                stepNumber={index + 1}
                totalSteps={steps.length}
                value={stepResponses[step.id] || ""}
                onChange={(value) => handleResponseChange(step.id, value)}
                isCompleted={completedSteps.has(step.id)}
                isActive={index === currentStepIndex}
                onComplete={() => handleStepComplete(step.id)}
                onAskCoach={handleAskCoach}
                showCelebration={justCompletedStep === step.id}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Complete Lab Button */}
      {allStepsCompleted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="border-green-500/30 bg-green-500/5">
            <CardContent className="p-6 text-center">
              <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Lab Complete! 🎉
              </h3>
              <p className="text-muted-foreground mb-4">
                You've completed all {steps.length} steps in {elapsedMinutes} minutes.
              </p>
              <Button onClick={handleLabComplete} size="lg" className="gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Continue to Reflection
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* AI Coach Panel */}
      <AICoachPanel
        isOpen={showCoachPanel}
        onClose={() => setShowCoachPanel(false)}
        missionTitle={mission.title}
        currentStepTitle={currentStep?.title || ""}
        initialPrompt={coachPrompt}
        onInsertSuggestion={handleInsertSuggestion}
      />
    </div>
  );
}
