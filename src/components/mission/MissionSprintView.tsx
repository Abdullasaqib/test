import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Clock, Sparkles, CheckCircle2, RefreshCw } from "lucide-react";
import { MissionSprint } from "@/hooks/useMissionSprints";
import { MissionQuickCheck } from "./MissionQuickCheck";
import confetti from "canvas-confetti";

interface MissionSprintViewProps {
  mission: {
    id: string;
    title: string;
    day_number: number;
  };
  sprints: MissionSprint[];
  completedSprintIds: string[];
  onSprintComplete: (sprintId: string, quizScore?: number) => Promise<void>;
  onMissionComplete: () => void;
  onBack: () => void;
}

export function MissionSprintView({
  mission,
  sprints,
  completedSprintIds,
  onSprintComplete,
  onMissionComplete,
  onBack
}: MissionSprintViewProps) {
  const [currentSprintIndex, setCurrentSprintIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const currentSprint = sprints[currentSprintIndex];
  const hasQuiz = currentSprint?.quiz_questions && currentSprint.quiz_questions.length > 0;
  const isSprintCompleted = currentSprint && completedSprintIds.includes(currentSprint.id);

  // Find first incomplete sprint on mount
  useEffect(() => {
    const firstIncomplete = sprints.findIndex(s => !completedSprintIds.includes(s.id));
    if (firstIncomplete !== -1) {
      setCurrentSprintIndex(firstIncomplete);
    }
  }, [sprints, completedSprintIds]);

  const handleContinue = async () => {
    if (hasQuiz && !isSprintCompleted) {
      setShowQuiz(true);
    } else {
      await handleSprintComplete();
    }
  };

  const handleSprintComplete = async (quizScore?: number) => {
    if (isCompleting) return;
    setIsCompleting(true);
    
    await onSprintComplete(currentSprint.id, quizScore);

    // Show celebration
    setShowCelebration(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#10b981', '#f59e0b']
    });

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setShowCelebration(false);
      setShowQuiz(false);
      
      // Calculate isLastSprint INSIDE the timeout with fresh value
      const isLastSprint = currentSprintIndex === sprints.length - 1;
      
      if (isLastSprint) {
        onMissionComplete();
      } else {
        // Bounds check before incrementing
        setCurrentSprintIndex(prev => {
          const nextIndex = prev + 1;
          return nextIndex < sprints.length ? nextIndex : prev;
        });
      }
      setIsCompleting(false);
    }, 1500);
  };

  const handleQuizComplete = async (score: number) => {
    await handleSprintComplete(score);
  };

  const renderContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('•') || line.startsWith('-')) {
        return <li key={index} className="ml-4">{line.substring(1).trim()}</li>;
      }
      if (line.match(/^[✅❌🔹🔸✨🎯🚀💡🌟🔍🤖🎨🏆📝🗣️⭐🎉🎊🕵️🔎🏠🎤🔬📊🎭📋🏪💰📊💬🌈🔮📚]/)) {
        return <p key={index} className="flex items-start gap-2">{line}</p>;
      }
      if (line.match(/^\d+[️⃣]?\./)) {
        return <li key={index} className="ml-4 list-decimal">{line.replace(/^\d+[️⃣]?\./, '').trim()}</li>;
      }
      return line.trim() ? <p key={index}>{line}</p> : <br key={index} />;
    });
  };

  const getSprintTypeIcon = (type: string) => {
    switch (type) {
      case 'lab': return '🧪';
      case 'quiz': return '❓';
      case 'reflection': return '💭';
      default: return '📖';
    }
  };

  // Guard against empty sprints
  if (!sprints || sprints.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No sprints available for this mission.</p>
          <Button onClick={onBack} variant="outline">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  // Handle case where currentSprintIndex is out of bounds
  if (!currentSprint) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Something went wrong loading the sprint.</p>
          <Button 
            onClick={() => {
              setCurrentSprintIndex(0);
              setShowQuiz(false);
              setShowCelebration(false);
              setIsCompleting(false);
            }} 
            variant="outline"
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const isLastSprint = currentSprintIndex === sprints.length - 1;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header - Fixed */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <button 
              onClick={onBack}
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {Math.ceil(currentSprint.estimated_seconds / 60)} min
            </div>
          </div>
          
          {/* Sprint Progress Dots */}
          <div className="flex items-center justify-center gap-2">
            {sprints.map((sprint, index) => (
              <motion.div
                key={sprint.id}
                initial={{ scale: 0.8 }}
                animate={{
                  scale: index === currentSprintIndex ? 1.3 : 1,
                  opacity: index <= currentSprintIndex || completedSprintIds.includes(sprint.id) ? 1 : 0.4,
                }}
                className={`h-2 rounded-full transition-all ${
                  completedSprintIds.includes(sprint.id)
                    ? "bg-green-500 w-2"
                    : index === currentSprintIndex
                    ? "bg-primary w-5"
                    : "bg-muted w-2"
                }`}
              />
            ))}
          </div>
          
          <p className="text-center text-xs text-muted-foreground mt-2">
            Day {mission.day_number} • Sprint {currentSprintIndex + 1} of {sprints.length}
          </p>
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <AnimatePresence mode="wait">
            {showCelebration ? (
              <motion.div
                key="celebration"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col items-center justify-center py-20"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: 2 }}
                  className="text-6xl mb-4"
                >
                  🎉
                </motion.div>
                <h2 className="text-2xl font-bold text-foreground">
                  {isLastSprint ? "Mission Complete!" : "Sprint Complete!"}
                </h2>
                <p className="text-muted-foreground mt-2">
                  {isLastSprint ? "You're amazing! 🚀" : "Keep going! You're doing great!"}
                </p>
              </motion.div>
            ) : showQuiz && hasQuiz ? (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <MissionQuickCheck
                  questions={currentSprint.quiz_questions}
                  sprintTitle={currentSprint.title}
                  onComplete={handleQuizComplete}
                />
              </motion.div>
            ) : (
              <motion.div
                key={`sprint-${currentSprintIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Sprint Type Badge */}
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getSprintTypeIcon(currentSprint.sprint_type)}</span>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    {currentSprint.sprint_type}
                  </span>
                  {isSprintCompleted && (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  )}
                </div>

                {/* Sprint Title */}
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  {currentSprint.title}
                </h1>

                {/* Sprint Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none space-y-4 text-foreground/90 leading-relaxed">
                  {renderContent(currentSprint.content)}
                </div>

                {/* Lab Instructions (if lab type) */}
                {currentSprint.sprint_type === 'lab' && currentSprint.lab_instructions && (
                  <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mt-6">
                    <h3 className="font-semibold text-primary mb-2 flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      Lab Instructions
                    </h3>
                    <div className="text-sm text-foreground/80 space-y-2">
                      {renderContent(currentSprint.lab_instructions)}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer - Fixed */}
      {!showCelebration && !showQuiz && (
        <div className="sticky bottom-0 bg-background/95 backdrop-blur border-t border-border px-4 py-4">
          <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
            <Button
              variant="ghost"
              onClick={() => setCurrentSprintIndex(prev => Math.max(0, prev - 1))}
              disabled={currentSprintIndex === 0}
              className="gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <Button
              onClick={handleContinue}
              disabled={isCompleting}
              className="gap-2 px-8"
              size="lg"
            >
              {isLastSprint ? "Complete Mission" : "Continue"}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}