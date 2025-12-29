import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Clock, ChevronRight, ArrowLeft, Download } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";
import { LessonSummaryCard } from "./LessonSummaryCard";
import { SprintLessonView } from "./SprintLessonView";
import { useCertificationSprints } from "@/hooks/useCertificationSprints";
import { useStudent } from "@/hooks/useStudent";

type CertificationLesson = Tables<"certification_lessons">;

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

interface LessonContentProps {
  lesson: CertificationLesson;
  isCompleted: boolean;
  onComplete: (quizScore?: number) => Promise<void>;
  onBack: () => void;
  onNext?: () => void;
  isLast?: boolean;
  lessonOrder?: number;
  totalLessons?: number;
  certificationName?: string;
}

export function LessonContent({
  lesson,
  isCompleted,
  onComplete,
  onBack,
  onNext,
  isLast = false,
  lessonOrder = 1,
  totalLessons = 1,
  certificationName = "Certification",
}: LessonContentProps) {
  const [showQuiz, setShowQuiz] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  
  const { student } = useStudent();
  const studentAge = student?.age || null;
  const { 
    sprints, 
    completedSprintIds, 
    completeSprint, 
    hasSprints, 
    loading: sprintsLoading,
    ageTrack 
  } = useCertificationSprints(lesson.id, studentAge);

  // Handle both nested {"value": {...}} and flat {...} quiz question structures
  // IMPORTANT: All hooks must be called before any early returns
  const rawQuiz = (lesson.quiz_questions as unknown as Array<{value?: QuizQuestion} | QuizQuestion>) || [];
  const quizQuestions: QuizQuestion[] = rawQuiz.map(q => {
    if (q && typeof q === 'object' && 'value' in q && q.value) {
      return q.value;
    }
    return q as QuizQuestion;
  }).filter(q => q && q.question && q.options);
  const hasQuiz = quizQuestions.length > 0;

  // Shuffle quiz options for display (memoized per session)
  const shuffledQuizQuestions = useMemo(() => {
    if (!hasQuiz) return [];
    
    const sessionSeed = Math.random().toString(36).substring(7);
    
    return quizQuestions.map(q => {
      if (!q.options || q.options.length < 2) {
        return { ...q, shuffledOptions: q.options, correctIndex: q.correct ?? 0 };
      }
      
      // Create shuffle mapping
      const indices = q.options.map((_, i) => i);
      const seed = q.question + sessionSeed;
      let hash = 0;
      for (let i = 0; i < seed.length; i++) {
        hash = ((hash << 5) - hash) + seed.charCodeAt(i);
        hash = hash & hash;
      }
      
      // Seeded shuffle
      for (let i = indices.length - 1; i > 0; i--) {
        hash = Math.sin(hash) * 10000;
        const j = Math.floor((hash - Math.floor(hash)) * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      
      const shuffledOptions = indices.map(i => q.options[i]);
      const newCorrectIndex = indices.indexOf(q.correct ?? 0);
      
      return {
        ...q,
        shuffledOptions,
        correctIndex: newCorrectIndex >= 0 ? newCorrectIndex : 0,
      };
    });
  }, [quizQuestions, hasQuiz]);

  // Handle sprint completion with student ID
  const handleSprintComplete = async (sprintId: string, quizScore?: number) => {
    if (student?.id) {
      await completeSprint(sprintId, student.id, quizScore);
    }
  };

  // Show loading state while sprints are being fetched
  if (sprintsLoading) {
    return (
      <div className="max-w-3xl mx-auto flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading lesson content...</p>
        </div>
      </div>
    );
  }

  // Use micro-sprint view if sprints exist
  if (hasSprints && !isCompleted) {
    return (
      <SprintLessonView
        lessonTitle={lesson.title}
        lessonOrder={lessonOrder}
        totalLessons={totalLessons}
        sprints={sprints}
        completedSprintIds={completedSprintIds}
        onSprintComplete={handleSprintComplete}
        onLessonComplete={async () => {
          await onComplete(100);
          if (onNext) onNext();
        }}
        onBack={onBack}
        certificationName={certificationName}
        ageTrack={ageTrack}
      />
    );
  }

  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    if (quizSubmitted) return;
    setAnswers({ ...answers, [questionIndex]: optionIndex });
  };

  const handleSubmitQuiz = async () => {
    let correct = 0;
    shuffledQuizQuestions.forEach((q, i) => {
      if (answers[i] === q.correctIndex) correct++;
    });
    
    const score = Math.round((correct / shuffledQuizQuestions.length) * 100);
    setQuizScore(score);
    setQuizSubmitted(true);
    await onComplete(score);
  };

  const handleCompleteWithoutQuiz = async () => {
    await onComplete();
  };

  // Convert markdown-like content to HTML (simple version)
  const renderContent = (content: string | null) => {
    if (!content) return null;
    
    return content.split('\n').map((line, i) => {
      // Headers
      if (line.startsWith('# ')) {
        return <h1 key={i} className="text-2xl font-bold mt-6 mb-4 text-foreground">{line.slice(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={i} className="text-xl font-semibold mt-5 mb-3 text-foreground">{line.slice(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={i} className="text-lg font-medium mt-4 mb-2 text-foreground">{line.slice(4)}</h3>;
      }
      // Code blocks
      if (line.startsWith('```')) {
        return null; // Simple handling - skip code block markers
      }
      // Blockquotes
      if (line.startsWith('> ')) {
        return (
          <blockquote key={i} className="border-l-4 border-primary/50 pl-4 my-3 italic text-muted-foreground bg-primary/5 py-2 rounded-r">
            {line.slice(2)}
          </blockquote>
        );
      }
      // Bold text
      if (line.includes('**')) {
        const parts = line.split(/\*\*([^*]+)\*\*/g);
        return (
          <p key={i} className="my-2 text-muted-foreground">
            {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="text-foreground">{part}</strong> : part)}
          </p>
        );
      }
      // List items
      if (line.startsWith('- ')) {
        return (
          <li key={i} className="ml-4 my-1 text-muted-foreground list-disc">
            {line.slice(2)}
          </li>
        );
      }
      // Table rows (simple)
      if (line.startsWith('|')) {
        return null; // Skip tables for now
      }
      // Empty lines
      if (line.trim() === '') {
        return <div key={i} className="h-3" />;
      }
      // Regular paragraphs
      return <p key={i} className="my-2 text-muted-foreground leading-relaxed">{line}</p>;
    });
  };

  const progressPercent = (lessonOrder / totalLessons) * 100;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
          <span>{certificationName}</span>
          <span>{lessonOrder} of {totalLessons} lessons</span>
        </div>
        <Progress value={progressPercent} className="h-1.5" />
      </div>

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Curriculum
        </Button>
        <div className="flex-1" />
        <Badge variant="outline" className="gap-1">
          Lesson {lessonOrder} of {totalLessons}
        </Badge>
        <Badge variant="outline" className="gap-1">
          <Clock className="h-3 w-3" />
          {lesson.estimated_minutes} min
        </Badge>
        {isCompleted && (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Completed
          </Badge>
        )}
      </div>

      {/* Lesson Title */}
      <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
      {lesson.description && (
        <p className="text-muted-foreground mb-6">{lesson.description}</p>
      )}

      {/* Lesson Content */}
      <Card className="mb-8 border-border/50 bg-card/50">
        <CardContent className="p-6 prose prose-invert max-w-none">
          {renderContent(lesson.content)}
        </CardContent>
      </Card>

      {/* Quiz Section */}
      {hasQuiz && !showQuiz && !isCompleted && (
        <Card className="mb-6 border-primary/30 bg-primary/5">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Ready for the Quiz?</h3>
            <p className="text-muted-foreground mb-4">
              Test your knowledge with {quizQuestions.length} quick questions.
            </p>
            <Button onClick={() => setShowQuiz(true)}>
              Take Quiz
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      )}

      {showQuiz && (
        <Card className="mb-6 border-border/50">
          <CardHeader>
            <CardTitle>Lesson Quiz</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {shuffledQuizQuestions.map((q, qIndex) => (
              <div key={qIndex} className="space-y-3">
                <p className="font-medium">
                  {qIndex + 1}. {q.question}
                </p>
                <div className="space-y-2">
                  {q.shuffledOptions && q.shuffledOptions.map((option, oIndex) => {
                    const isSelected = answers[qIndex] === oIndex;
                    const isCorrect = quizSubmitted && q.correctIndex === oIndex;
                    const isWrong = quizSubmitted && isSelected && q.correctIndex !== oIndex;

                    return (
                      <button
                        key={oIndex}
                        onClick={() => handleAnswerSelect(qIndex, oIndex)}
                        disabled={quizSubmitted}
                        className={`w-full text-left p-3 rounded-lg border transition-all ${
                          isCorrect
                            ? "border-green-500 bg-green-500/20 text-green-400"
                            : isWrong
                            ? "border-red-500 bg-red-500/20 text-red-400"
                            : isSelected
                            ? "border-primary bg-primary/20"
                            : "border-border hover:border-primary/50 hover:bg-primary/5"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {!quizSubmitted ? (
              <Button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(answers).length !== shuffledQuizQuestions.length}
                className="w-full"
              >
                Submit Answers
              </Button>
            ) : (
              <div className="text-center p-4 rounded-lg bg-primary/10">
                <p className="text-lg font-semibold">
                  Score: {quizScore}%
                </p>
                <p className="text-sm text-muted-foreground">
                  {quizScore >= 70 ? "Great job! 🎉" : "Keep learning and try again!"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Complete / Next Button */}
      {!hasQuiz && !isCompleted && (
        <Button onClick={handleCompleteWithoutQuiz} className="w-full">
          Mark as Complete
          <CheckCircle2 className="h-4 w-4 ml-2" />
        </Button>
      )}

      {(isCompleted || quizSubmitted) && onNext && (
        <Button onClick={onNext} className="w-full">
          {isLast ? "Complete Certification" : "Next Lesson"}
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      )}

      {/* Summary Card (shown after completion) */}
      {isCompleted && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Download className="h-5 w-5 text-primary" />
            Lesson Summary Card
          </h3>
          <LessonSummaryCard lessonOrder={lesson.lesson_order} />
        </div>
      )}
    </div>
  );
}
