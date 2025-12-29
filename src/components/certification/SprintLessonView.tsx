import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle2, 
  ChevronRight, 
  ArrowLeft, 
  Clock,
  Zap,
  RefreshCw
} from "lucide-react";
import { QuickCheckQuiz } from "./QuickCheckQuiz";
import { SprintProgressIndicator } from "./SprintProgressIndicator";
import confetti from "canvas-confetti";

type AgeTrack = 'explorer' | 'creator' | 'founder';

interface LessonSprint {
  id: string;
  sprint_order: number;
  title: string;
  content: string;
  estimated_seconds: number;
  quiz_questions: Array<{
    question: string;
    options: string[];
    correct: number;
  }>;
  is_advanced_technique?: boolean;
  age_track?: string;
}

interface SprintLessonViewProps {
  lessonTitle: string;
  lessonOrder: number;
  totalLessons: number;
  sprints: LessonSprint[];
  completedSprintIds: string[];
  onSprintComplete: (sprintId: string, quizScore?: number) => Promise<void>;
  onLessonComplete: () => void;
  onBack: () => void;
  certificationName?: string;
  ageTrack?: AgeTrack;
}

const ageTrackConfig: Record<AgeTrack, { label: string; icon: string; color: string }> = {
  explorer: { label: "Explorer", icon: "🔍", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  creator: { label: "Creator", icon: "🎨", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  founder: { label: "Founder", icon: "🚀", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
};

const encouragements = [
  "You're doing amazing! 🌟",
  "Keep going, future founder! 🚀",
  "Your brain is growing! 🧠",
  "Almost there! 💪",
  "You've got this! ⚡",
];

export function SprintLessonView({
  lessonTitle,
  lessonOrder,
  totalLessons,
  sprints,
  completedSprintIds,
  onSprintComplete,
  onLessonComplete,
  onBack,
  certificationName = "AI Foundations Certificate",
  ageTrack = "creator",
}: SprintLessonViewProps) {
  const trackConfig = ageTrackConfig[ageTrack];
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
  const totalSprintsCompleted = completedSprintIds.length;

  // Find first incomplete sprint on mount
  useEffect(() => {
    const firstIncomplete = sprints.findIndex(s => !completedSprintIds.includes(s.id));
    if (firstIncomplete >= 0) {
      setCurrentSprintIndex(firstIncomplete);
    }
  }, [sprints, completedSprintIds]);

  const handleContinue = () => {
    if (!currentSprint) return; // Safety guard against undefined sprint
    if (currentSprint.quiz_questions && currentSprint.quiz_questions.length > 0) {
      setShowQuiz(true);
    } else {
      handleSprintComplete();
    }
  };

  const handleSprintComplete = async (quizScore?: number) => {
    if (!currentSprint) return; // Safety guard against undefined sprint
    setIsCompleting(true);
    await onSprintComplete(currentSprint.id, quizScore);
    setShowQuiz(false);
    
    // Calculate isLastSprint with fresh value
    const isLastSprint = currentSprintIndex === sprints.length - 1;
    
    if (isLastSprint) {
      // Only show celebration on lesson completion
      setShowCelebration(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#8b5cf6', '#f59e0b', '#22c55e'],
      });

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setShowCelebration(false);
        setIsCompleting(false);
        onLessonComplete();
      }, 2000);
    } else {
      // No celebration between sprints - immediate transition
      setCurrentSprintIndex(prev => {
        const nextIndex = prev + 1;
        return nextIndex < sprints.length ? nextIndex : prev;
      });
      setIsCompleting(false);
    }
  };

  const getEncouragement = () => {
    return encouragements[currentSprintIndex % encouragements.length];
  };

  // Simple markdown rendering for sprint content
  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('## ')) {
        return (
          <h2 key={i} className="text-xl font-bold mt-4 mb-3 text-foreground">
            {line.slice(3)}
          </h2>
        );
      }
      if (line.startsWith('### ')) {
        return (
          <h3 key={i} className="text-lg font-semibold mt-3 mb-2 text-foreground">
            {line.slice(4)}
          </h3>
        );
      }
      if (line.startsWith('> ')) {
        return (
          <div key={i} className="bg-primary/10 border-l-4 border-primary p-4 rounded-r-lg my-3">
            <p className="text-foreground font-medium">{line.slice(2)}</p>
          </div>
        );
      }
      if (line.includes('**')) {
        const parts = line.split(/\*\*([^*]+)\*\*/g);
        return (
          <p key={i} className="text-lg text-muted-foreground leading-relaxed my-2">
            {parts.map((part, j) => 
              j % 2 === 1 ? <strong key={j} className="text-foreground">{part}</strong> : part
            )}
          </p>
        );
      }
      if (line.startsWith('- ')) {
        return (
          <div key={i} className="flex items-start gap-3 my-2">
            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-lg text-muted-foreground">{line.slice(2)}</p>
          </div>
        );
      }
      if (line.trim() === '') {
        return <div key={i} className="h-4" />;
      }
      return (
        <p key={i} className="text-lg text-muted-foreground leading-relaxed my-2">
          {line}
        </p>
      );
    });
  };

  // Guard against empty sprints
  if (!sprints || sprints.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No sprints available for this lesson.</p>
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
      <div className="min-h-screen flex items-center justify-center">
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
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border/50 px-4 py-3">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>
            <SprintProgressIndicator
              currentSprint={currentSprintIndex + 1}
              totalSprints={sprints.length}
              currentLesson={lessonOrder}
              totalLessons={totalLessons}
            />
            <Badge variant="outline" className="gap-1">
              <Clock className="h-3 w-3" />
              ~{Math.ceil(currentSprint.estimated_seconds / 60)} min
            </Badge>
          </div>
          <Progress 
            value={((currentSprintIndex) / sprints.length) * 100} 
            className="h-2"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {showCelebration ? (
              <motion.div
                key="celebration"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center py-20"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                >
                  <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto mb-4" />
                </motion.div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Lesson Complete! 🎉
                </h2>
                <p className="text-muted-foreground text-lg">
                  You're crushing it, future founder!
                </p>
              </motion.div>
            ) : showQuiz ? (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <QuickCheckQuiz
                  questions={currentSprint.quiz_questions}
                  onComplete={handleSprintComplete}
                  sprintTitle={currentSprint.title}
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
                {/* Sprint Title */}
                <div className="mb-6">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge variant="secondary" className="gap-1">
                      <Zap className="h-3 w-3" />
                      Sprint {currentSprintIndex + 1} of {sprints.length}
                    </Badge>
                    <Badge className={`border ${trackConfig.color}`}>
                      {trackConfig.icon} {trackConfig.label} Track
                    </Badge>
                    {currentSprint.is_advanced_technique && (
                      <Badge className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-orange-400 border-orange-500/30">
                        🔥 Advanced
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                    {currentSprint.title}
                  </h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    Lesson {lessonOrder}: {lessonTitle}
                  </p>
                </div>

                {/* Content */}
                <div className="bg-card/50 border border-border/50 rounded-xl p-6">
                  {renderContent(currentSprint.content)}
                </div>

                {/* Continue Button */}
                <div className="pt-4">
                  <Button 
                    onClick={handleContinue}
                    disabled={isCompleting}
                    size="lg"
                    className="w-full text-lg py-6 gap-2"
                  >
                    {currentSprint.quiz_questions?.length > 0 
                      ? "Quick Check →" 
                      : isLastSprint 
                        ? "Complete Lesson ✓" 
                        : "Continue →"
                    }
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                  
                  {currentSprintIndex > 0 && (
                    <Button
                      variant="ghost"
                      onClick={() => setCurrentSprintIndex(prev => Math.max(0, prev - 1))}
                      className="w-full mt-2"
                    >
                      ← Previous Sprint
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}