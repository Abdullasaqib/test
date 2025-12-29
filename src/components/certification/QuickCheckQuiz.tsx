import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Zap, RefreshCw } from "lucide-react";
import { useShuffledQuiz } from "@/hooks/useShuffledQuiz";

interface QuizQuestion {
  question: string;
  options: string[];
  correct?: number;
  correctIndex?: number;
}

interface QuickCheckQuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
  sprintTitle: string;
}

export function QuickCheckQuiz({
  questions,
  onComplete,
  sprintTitle,
}: QuickCheckQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
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

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion?.correctIndex;

  // Handle case where currentQuestionIndex is out of bounds
  if (!currentQuestion) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground mb-4">Something went wrong loading the quiz.</p>
        <Button 
          onClick={() => {
            setCurrentQuestionIndex(0);
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

    // Auto-advance after feedback
    timeoutRef.current = setTimeout(() => {
      // Calculate isLastQuestion INSIDE the timeout with fresh value
      const isLastQuestion = currentQuestionIndex === shuffledQuestions.length - 1;
      
      if (isLastQuestion) {
        const finalScore = Math.round((newCorrectCount / shuffledQuestions.length) * 100);
        onComplete(finalScore);
      } else {
        // Bounds check before incrementing
        setCurrentQuestionIndex(prev => {
          const nextIndex = prev + 1;
          return nextIndex < shuffledQuestions.length ? nextIndex : prev;
        });
        setSelectedAnswer(null);
        setShowFeedback(false);
      }
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <Badge variant="outline" className="mb-3 gap-1">
          <Zap className="h-3 w-3" />
          Quick Check
        </Badge>
        <h2 className="text-xl font-semibold text-foreground">
          {sprintTitle}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Question {currentQuestionIndex + 1} of {shuffledQuestions.length}
        </p>
      </div>

      {/* Question */}
      <motion.div
        key={currentQuestionIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border/50 rounded-xl p-6"
      >
        <p className="text-lg font-medium text-foreground mb-6">
          {currentQuestion.question}
        </p>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectOption = index === currentQuestion.correctIndex;
            
            let buttonClass = "w-full text-left p-4 rounded-lg border-2 transition-all ";
            
            if (showFeedback) {
              if (isCorrectOption) {
                buttonClass += "border-green-500 bg-green-500/20";
              } else if (isSelected && !isCorrectOption) {
                buttonClass += "border-red-500 bg-red-500/20";
              } else {
                buttonClass += "border-border/50 opacity-50";
              }
            } else if (isSelected) {
              buttonClass += "border-primary bg-primary/10";
            } else {
              buttonClass += "border-border hover:border-primary/50 hover:bg-primary/5";
            }

            return (
              <motion.button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={showFeedback}
                className={buttonClass}
                whileHover={!showFeedback ? { scale: 1.01 } : {}}
                whileTap={!showFeedback ? { scale: 0.99 } : {}}
              >
                <div className="flex items-center justify-between">
                  <span className="text-foreground">{option}</span>
                  <AnimatePresence>
                    {showFeedback && isCorrectOption && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", bounce: 0.5 }}
                      >
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </motion.div>
                    )}
                    {showFeedback && isSelected && !isCorrectOption && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", bounce: 0.5 }}
                      >
                        <XCircle className="h-5 w-5 text-red-500" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Feedback */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`text-center p-4 rounded-lg ${
              isCorrect 
                ? "bg-green-500/20 text-green-400" 
                : "bg-amber-500/20 text-amber-400"
            }`}
          >
            <p className="font-medium">
              {isCorrect ? "Correct! Great job! 🎉" : "Not quite, but you're learning! 💪"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress dots */}
      <div className="flex justify-center gap-2">
        {shuffledQuestions.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              index < currentQuestionIndex
                ? "bg-green-500"
                : index === currentQuestionIndex
                ? "bg-primary w-6"
                : "bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
}