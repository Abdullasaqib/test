import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Check, Lightbulb, Sparkles, ChevronDown, ChevronUp, PartyPopper } from "lucide-react";
import { MissionStep as MissionStepType } from "@/hooks/useMission";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface MissionStepProps {
  step: MissionStepType;
  stepNumber: number;
  totalSteps: number;
  value: string;
  onChange: (value: string) => void;
  isCompleted: boolean;
  isActive: boolean;
  onComplete: () => void;
  onAskCoach: (prompt: string) => void;
  showCelebration?: boolean;
}

// Character count thresholds for quality hints
const QUALITY_THRESHOLDS = {
  short: 50,
  good: 150,
  great: 300,
};

export function MissionStep({
  step,
  stepNumber,
  totalSteps,
  value,
  onChange,
  isCompleted,
  isActive,
  onComplete,
  onAskCoach,
  showCelebration = false,
}: MissionStepProps) {
  const [showExample, setShowExample] = useState(false);
  const [showPromptHelp, setShowPromptHelp] = useState(false);

  const handleAskCoach = () => {
    const prompt = step.prompt_help || `Help me with: ${step.title}`;
    onAskCoach(prompt);
  };

  // Character count and quality indicator
  const charCount = value.length;
  const getQualityLevel = () => {
    if (charCount >= QUALITY_THRESHOLDS.great) return { level: "great", color: "text-green-500", label: "Great detail!" };
    if (charCount >= QUALITY_THRESHOLDS.good) return { level: "good", color: "text-blue-500", label: "Good progress" };
    if (charCount >= QUALITY_THRESHOLDS.short) return { level: "short", color: "text-muted-foreground", label: "Keep going..." };
    return { level: "start", color: "text-muted-foreground", label: "" };
  };
  const quality = getQualityLevel();

  // Contextual hints based on step content
  const getContextualHint = () => {
    const instruction = step.instruction.toLowerCase();
    if (instruction.includes("problem") && charCount < QUALITY_THRESHOLDS.good) {
      return "Try adding WHO has this problem and HOW it affects them";
    }
    if (instruction.includes("solution") && charCount < QUALITY_THRESHOLDS.good) {
      return "Describe WHAT your solution does and WHY it's better";
    }
    if (instruction.includes("customer") && charCount < QUALITY_THRESHOLDS.good) {
      return "Be specific about age, interests, and behaviors";
    }
    return null;
  };

  return (
    <Card className={cn(
      "transition-all duration-300 relative overflow-hidden",
      isActive ? "border-primary shadow-lg" : "border-border opacity-60",
      isCompleted && "border-green-500/50 bg-green-500/5"
    )}>
      {/* Celebration Animation Overlay */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 flex items-center justify-center bg-green-500/10 pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <PartyPopper className="h-16 w-16 text-green-500" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CardContent className="p-6">
        {/* Step Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div 
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                isCompleted ? "bg-green-500 text-white" : 
                isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              )}
              animate={showCelebration ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              {isCompleted ? <Check className="h-4 w-4" /> : stepNumber}
            </motion.div>
            <div>
              <h3 className="font-semibold text-foreground">{step.title}</h3>
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <span>Step {stepNumber} of {totalSteps}</span>
                {step.is_required && <Badge variant="outline" className="text-xs">Required</Badge>}
              </div>
            </div>
          </div>
        </div>

        {/* Instruction */}
        <p className="text-foreground/80 mb-4 leading-relaxed">
          {step.instruction}
        </p>

        {/* Input Area */}
        {isActive && !isCompleted && (
          <div className="space-y-4">
            {step.input_type === 'textarea' || step.input_type === 'text' ? (
              <div className="space-y-2">
                <Textarea
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder={step.input_placeholder || "Type your answer here..."}
                  className="min-h-[120px] resize-none"
                />
                {/* Character Counter with Quality Hint */}
                <div className="flex items-center justify-between text-xs">
                  <span className={quality.color}>
                    {charCount} characters {quality.label && `• ${quality.label}`}
                  </span>
                  {getContextualHint() && (
                    <span className="text-muted-foreground italic">
                      💡 {getContextualHint()}
                    </span>
                  )}
                </div>
              </div>
            ) : step.input_type === 'url' ? (
              <Input
                type="url"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={step.input_placeholder || "Enter URL..."}
              />
            ) : (
              <div className="space-y-2">
                <Textarea
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder={step.input_placeholder || "Type your answer here..."}
                  className="min-h-[100px] resize-none"
                />
                <div className="flex items-center justify-between text-xs">
                  <span className={quality.color}>
                    {charCount} characters {quality.label && `• ${quality.label}`}
                  </span>
                </div>
              </div>
            )}

            {/* Help Sections */}
            <div className="flex flex-wrap gap-2">
              {step.prompt_help && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPromptHelp(!showPromptHelp)}
                  className="text-xs"
                >
                  <Lightbulb className="h-3 w-3 mr-1" />
                  Prompt Help
                  {showPromptHelp ? <ChevronUp className="h-3 w-3 ml-1" /> : <ChevronDown className="h-3 w-3 ml-1" />}
                </Button>
              )}
              
              {step.example_output && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowExample(!showExample)}
                  className="text-xs"
                >
                  See Example
                  {showExample ? <ChevronUp className="h-3 w-3 ml-1" /> : <ChevronDown className="h-3 w-3 ml-1" />}
                </Button>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={handleAskCoach}
                className="text-xs text-primary border-primary/30 hover:bg-primary/10"
              >
                <Sparkles className="h-3 w-3 mr-1" />
                Ask AI Coach
              </Button>
            </div>

            {/* Prompt Help Panel */}
            <AnimatePresence>
              {showPromptHelp && step.prompt_help && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4"
                >
                  <h4 className="font-medium text-sm text-blue-600 dark:text-blue-400 mb-2 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Training Wheels Prompt
                  </h4>
                  <p className="text-sm text-foreground/80 italic">"{step.prompt_help}"</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Copy this prompt and use it with the AI Coach to get help!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Example Panel */}
            <AnimatePresence>
              {showExample && step.example_output && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-muted/50 border border-border rounded-lg p-4"
                >
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Example Output</h4>
                  <p className="text-sm text-foreground/80 whitespace-pre-line">{step.example_output}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Complete Step Button */}
            <Button
              onClick={onComplete}
              disabled={step.is_required && !value.trim()}
              className="w-full"
            >
              <Check className="h-4 w-4 mr-2" />
              Complete Step
            </Button>
          </div>
        )}

        {/* Completed State */}
        {isCompleted && value && (
          <div className="bg-muted/30 rounded-lg p-4 border border-border">
            <p className="text-sm text-foreground/80 whitespace-pre-line">{value}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
