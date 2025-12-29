import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle, Lightbulb, ChevronRight, X } from "lucide-react";

interface ThinkingScaffoldProps {
  challengeType?: string;
  onClose?: () => void;
}

const scaffoldPrompts = [
  {
    step: 1,
    icon: "🔍",
    question: "What's the main problem here?",
    hint: "Try to describe the challenge in one sentence.",
  },
  {
    step: 2,
    icon: "🤔",
    question: "What are your options?",
    hint: "List 2-3 different ways you could solve this.",
  },
  {
    step: 3,
    icon: "⚖️",
    question: "What happens with each option?",
    hint: "Think about the pros and cons of each approach.",
  },
  {
    step: 4,
    icon: "🎯",
    question: "Which option fits best?",
    hint: "Consider: What would a successful founder choose?",
  },
];

export function ThinkingScaffold({ challengeType, onClose }: ThinkingScaffoldProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isExpanded) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(true)}
          className="text-muted-foreground hover:text-primary gap-2"
        >
          <HelpCircle className="h-4 w-4" />
          Need help thinking this through?
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
    >
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-400" />
              <span className="font-semibold text-sm">Thinking Framework</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                setIsExpanded(false);
                onClose?.();
              }}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress dots */}
          <div className="flex gap-2 mb-4">
            {scaffoldPrompts.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentStep(i)}
                className={`h-2 rounded-full transition-all ${
                  i === currentStep 
                    ? 'w-6 bg-primary' 
                    : i < currentStep 
                    ? 'w-2 bg-primary/50' 
                    : 'w-2 bg-muted'
                }`}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{scaffoldPrompts[currentStep].icon}</span>
                <div>
                  <p className="font-medium">{scaffoldPrompts[currentStep].question}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {scaffoldPrompts[currentStep].hint}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            {currentStep < scaffoldPrompts.length - 1 ? (
              <Button
                size="sm"
                onClick={() => setCurrentStep(currentStep + 1)}
                className="gap-1"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={() => setIsExpanded(false)}
                variant="secondary"
              >
                Got it!
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
