import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Sparkles, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useShuffledQuiz } from "@/hooks/useShuffledQuiz";

interface QuizQuestion {
  question: string;
  options: string[];
  correct?: number;
  correctIndex?: number;
}

interface MissionQuickCheckProps {
  questions: QuizQuestion[];
  sprintTitle: string;
  onComplete: (score: number) => void;
}

export function MissionQuickCheck({ questions, sprintTitle, onComplete }: MissionQuickCheckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Shuffle quiz options on the client side
  const shuffledQuestions = useShuffledQuiz(questions);

  // Guard against empty questions
  if (!questions || questions.length === 0 || shuffledQuestions.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground mb-4">No quiz questions available.</p>
        <Button onClick={() => onComplete(100)} variant="outline">
          Continue Without Quiz
        </Button>
      </div>
    );
  }

  const currentQuestion = shuffledQuestions[currentIndex];
  const isCorrect = selectedAnswer === currentQuestion?.correctIndex;

  // Handle case where currentIndex is out of bounds
  if (!currentQuestion) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground mb-4">Something went wrong loading the quiz.</p>
        <Button 
          onClick={() => {
            setCurrentIndex(0);
            setSelectedAnswer(null);
            setShowFeedback(false);
            setCorrectCount(0);
          }} 
          variant="outline"
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      </div>
    );
  }

  const handleSelectAnswer = (index: number) => {
    if (showFeedback) return;
    
    setSelectedAnswer(index);
    setShowFeedback(true);
    
    const wasCorrect = index === currentQuestion.correctIndex;
    const newCorrectCount = wasCorrect ? correctCount + 1 : correctCount;
    
    if (wasCorrect) {
      setCorrectCount(newCorrectCount);
    }

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      // Calculate isLastQuestion INSIDE the timeout with fresh value
      const isLastQuestion = currentIndex === shuffledQuestions.length - 1;
      
      if (isLastQuestion) {
        const finalScore = Math.round((newCorrectCount / shuffledQuestions.length) * 100);
        onComplete(finalScore);
      } else {
        // Bounds check before incrementing
        setCurrentIndex(prev => {
          const nextIndex = prev + 1;
          return nextIndex < shuffledQuestions.length ? nextIndex : prev;
        });
        setSelectedAnswer(null);
        setShowFeedback(false);
      }
    }, 1200);
  };

  return (
    <div className="py-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="h-5 w-5 text-primary" />
        <span className="text-sm font-medium text-muted-foreground">Quick Check</span>
        <span className="ml-auto text-xs text-muted-foreground">
          {currentIndex + 1} of {shuffledQuestions.length}
        </span>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="space-y-6"
        >
          <h2 className="text-xl font-semibold text-foreground">
            {currentQuestion.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectOption = index === currentQuestion.correctIndex;
              
              let bgClass = "bg-card hover:bg-accent/50";
              let borderClass = "border-border";
              let textClass = "text-foreground";
              
              if (showFeedback) {
                if (isCorrectOption) {
                  bgClass = "bg-green-500/20";
                  borderClass = "border-green-500";
                  textClass = "text-green-700 dark:text-green-300";
                } else if (isSelected && !isCorrectOption) {
                  bgClass = "bg-red-500/20";
                  borderClass = "border-red-500";
                  textClass = "text-red-700 dark:text-red-300";
                }
              } else if (isSelected) {
                bgClass = "bg-primary/20";
                borderClass = "border-primary";
              }

              return (
                <motion.button
                  key={index}
                  whileHover={!showFeedback ? { scale: 1.02 } : {}}
                  whileTap={!showFeedback ? { scale: 0.98 } : {}}
                  onClick={() => handleSelectAnswer(index)}
                  disabled={showFeedback}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${bgClass} ${borderClass} ${textClass}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {showFeedback && isCorrectOption && (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    )}
                    {showFeedback && isSelected && !isCorrectOption && (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Feedback Message */}
          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`p-4 rounded-xl text-center font-medium ${
                  isCorrect 
                    ? "bg-green-500/20 text-green-700 dark:text-green-300" 
                    : "bg-amber-500/20 text-amber-700 dark:text-amber-300"
                }`}
              >
                {isCorrect ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="text-xl">🎉</span> Correct! Great job!
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <span className="text-xl">💡</span> Good try! The answer is highlighted above.
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}