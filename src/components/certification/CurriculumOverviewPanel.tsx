import { useState } from "react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle2, 
  Clock, 
  Lock, 
  PlayCircle, 
  Target,
  BookOpen,
  Award,
  Lightbulb
} from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  description?: string | null;
  estimated_minutes?: number | null;
  lesson_order: number;
  learning_objectives?: string[] | null;
  quiz_questions?: unknown;
}

interface CurriculumOverviewPanelProps {
  lessons: Lesson[];
  completedLessonIds: string[];
  currentLessonId?: string;
  isEnrolled: boolean;
  certificationName: string;
  estimatedHours?: number;
  onLessonClick?: (lessonId: string, index: number) => void;
}

export function CurriculumOverviewPanel({
  lessons,
  completedLessonIds,
  currentLessonId,
  isEnrolled,
  certificationName,
  estimatedHours,
  onLessonClick
}: CurriculumOverviewPanelProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  
  const completedCount = completedLessonIds.length;
  const totalCount = lessons.length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const getLessonStatus = (lesson: Lesson) => {
    if (completedLessonIds.includes(lesson.id)) return 'completed';
    if (lesson.id === currentLessonId) return 'current';
    if (!isEnrolled) return 'locked';
    
    // Check if previous lesson is completed (for sequential unlock)
    const lessonIndex = lessons.findIndex(l => l.id === lesson.id);
    if (lessonIndex === 0) return 'available';
    const previousLesson = lessons[lessonIndex - 1];
    if (previousLesson && completedLessonIds.includes(previousLesson.id)) return 'available';
    
    return 'upcoming';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'current':
        return <PlayCircle className="h-5 w-5 text-primary animate-pulse" />;
      case 'available':
        return <PlayCircle className="h-5 w-5 text-primary" />;
      case 'locked':
        return <Lock className="h-5 w-5 text-muted-foreground" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20">Completed</Badge>;
      case 'current':
        return <Badge className="bg-primary/10 text-primary border-primary/20 animate-pulse">In Progress</Badge>;
      case 'available':
        return <Badge variant="outline" className="border-primary/30 text-primary">Start Now</Badge>;
      case 'locked':
        return <Badge variant="outline" className="text-muted-foreground">Locked</Badge>;
      default:
        return <Badge variant="outline" className="text-muted-foreground">Upcoming</Badge>;
    }
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Full Curriculum Overview
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {totalCount} lessons • {estimatedHours || Math.ceil(totalCount * 0.5)} hours total
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{completedCount}/{totalCount}</div>
            <p className="text-xs text-muted-foreground">lessons complete</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Your Progress</span>
            <span className="font-medium">{Math.round(progressPercent)}%</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <Accordion 
          type="multiple" 
          value={expandedItems}
          onValueChange={setExpandedItems}
          className="space-y-2"
        >
          {lessons.map((lesson, index) => {
            const status = getLessonStatus(lesson);
            const isClickable = status === 'completed' || status === 'current' || status === 'available';
            
            return (
              <AccordionItem 
                key={lesson.id} 
                value={lesson.id}
                className={`
                  border rounded-lg px-4 transition-all
                  ${status === 'completed' ? 'bg-green-500/5 border-green-500/20' : ''}
                  ${status === 'current' ? 'bg-primary/5 border-primary/30 ring-1 ring-primary/20' : ''}
                  ${status === 'available' ? 'bg-card hover:bg-accent/50 border-border/50' : ''}
                  ${status === 'locked' || status === 'upcoming' ? 'bg-muted/30 border-border/30' : ''}
                `}
              >
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-4 w-full">
                    {/* Lesson Number Circle */}
                    <div className={`
                      flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold
                      ${status === 'completed' ? 'bg-green-500 text-white' : ''}
                      ${status === 'current' ? 'bg-primary text-primary-foreground' : ''}
                      ${status === 'available' ? 'bg-primary/20 text-primary' : ''}
                      ${status === 'locked' || status === 'upcoming' ? 'bg-muted text-muted-foreground' : ''}
                    `}>
                      {status === 'completed' ? <CheckCircle2 className="h-4 w-4" /> : index + 1}
                    </div>

                    {/* Lesson Info */}
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${status === 'locked' ? 'text-muted-foreground' : ''}`}>
                          {lesson.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {lesson.estimated_minutes || 30} min
                        </span>
                        {lesson.quiz_questions && Array.isArray(lesson.quiz_questions) && lesson.quiz_questions.length > 0 && (
                          <span className="flex items-center gap-1">
                            <Target className="h-3 w-3" />
                            Quiz included
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="mr-2">
                      {getStatusBadge(status)}
                    </div>
                  </div>
                </AccordionTrigger>
                
                <AccordionContent className="pb-4">
                  <div className="pl-12 space-y-4">
                    {/* Description */}
                    {lesson.description && (
                      <p className="text-sm text-muted-foreground">
                        {lesson.description}
                      </p>
                    )}
                    
                    {/* Learning Objectives */}
                    {lesson.learning_objectives && lesson.learning_objectives.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Lightbulb className="h-4 w-4 text-amber-500" />
                          What you'll learn
                        </div>
                        <ul className="space-y-1.5">
                          {lesson.learning_objectives.map((objective, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle2 className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                              {objective}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Action Button */}
                    {isClickable && onLessonClick && (
                      <button
                        onClick={() => onLessonClick(lesson.id, index)}
                        className={`
                          inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                          ${status === 'completed' 
                            ? 'bg-green-500/10 text-green-600 hover:bg-green-500/20' 
                            : 'bg-primary text-primary-foreground hover:bg-primary/90'
                          }
                        `}
                      >
                        {status === 'completed' ? (
                          <>
                            <CheckCircle2 className="h-4 w-4" />
                            Review Lesson
                          </>
                        ) : (
                          <>
                            <PlayCircle className="h-4 w-4" />
                            {status === 'current' ? 'Continue Lesson' : 'Start Lesson'}
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>

        {/* Certificate Reward */}
        <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-amber-500/10 border border-amber-500/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-amber-500/20">
              <Award className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <h4 className="font-semibold text-amber-600">Complete all lessons to earn</h4>
              <p className="text-sm text-muted-foreground">{certificationName} • LinkedIn-shareable credential</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
