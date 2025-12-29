import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Clock, BookOpen, Users, Star, CheckCircle2, Loader2 } from "lucide-react";

interface CertificationHeroProps {
  name: string;
  description?: string;
  lessonsCount: number;
  estimatedHours?: number;
  isEnrolled: boolean;
  isCompleted: boolean;
  completedLessons: number;
  ageRange?: string;
  onEnroll?: () => void;
  onContinue?: () => void;
  onViewCertificate?: () => void;
}

export function CertificationHero({
  name,
  description,
  lessonsCount,
  estimatedHours,
  isEnrolled,
  isCompleted,
  completedLessons,
  ageRange = "Ages 9-17",
  onEnroll,
  onContinue,
  onViewCertificate
}: CertificationHeroProps) {
  const [isScrolling, setIsScrolling] = useState(false);

  const handleViewCertificate = () => {
    if (isScrolling) return;
    setIsScrolling(true);
    onViewCertificate?.();
    // Reset after animation completes
    setTimeout(() => setIsScrolling(false), 1000);
  };
  const progressPercent = lessonsCount > 0 ? (completedLessons / lessonsCount) * 100 : 0;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-primary/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, currentColor 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Glowing Orb */}
      <div className="absolute -top-20 -right-20 w-40 md:w-64 h-40 md:h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-32 md:w-48 h-32 md:h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 p-5 md:p-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          {/* Left Content */}
          <div className="space-y-4 flex-1">
            {/* Badge */}
            <div className="flex items-center gap-2 flex-wrap">
              {isCompleted ? (
                <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Completed
                </Badge>
              ) : isEnrolled ? (
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  <BookOpen className="h-3 w-3 mr-1" />
                  In Progress
                </Badge>
              ) : (
                <Badge variant="secondary">
                  <Star className="h-3 w-3 mr-1" />
                  Free Certificate
                </Badge>
              )}
              <Badge variant="outline" className="text-muted-foreground">
                NEXT_ CERTIFIED
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
              {name}
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
              {description || "Master the foundational skills that will define the next generation of AI builders."}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span>{lessonsCount} lessons</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{estimatedHours || Math.ceil(lessonsCount * 0.5)} hours</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Award className="h-4 w-4 text-amber-500" />
                <span>LinkedIn-shareable</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{ageRange}</span>
              </div>
            </div>

            {/* Progress (if enrolled) */}
            {isEnrolled && !isCompleted && (
              <div className="space-y-2 max-w-md">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Your Progress</span>
                  <span className="font-medium">{completedLessons} of {lessonsCount} lessons</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="pt-2">
              {isCompleted ? (
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={handleViewCertificate} 
                  disabled={isScrolling}
                  className="gap-2 transition-all duration-200 hover:bg-amber-500/10 hover:border-amber-500/50"
                >
                  {isScrolling ? (
                    <Loader2 className="h-5 w-5 animate-spin text-amber-500" />
                  ) : (
                    <Award className="h-5 w-5 text-amber-500" />
                  )}
                  {isScrolling ? "Scrolling..." : "View Your Certificate"}
                </Button>
              ) : isEnrolled ? (
                <Button size="lg" onClick={onContinue} className="gap-2">
                  Continue Learning
                  <span className="text-primary-foreground/80">→</span>
                </Button>
              ) : (
                <Button size="lg" onClick={onEnroll} className="gap-2 bg-gradient-to-r from-primary to-primary/80">
                  Start Learning — Free
                  <span className="text-primary-foreground/80">→</span>
                </Button>
              )}
            </div>
          </div>

          {/* Right - Certificate Preview */}
          <div className="hidden lg:block flex-shrink-0">
            <div className="relative w-56 xl:w-64 h-40 xl:h-44 rounded-lg border border-amber-500/30 bg-gradient-to-br from-amber-50/50 to-amber-100/30 dark:from-amber-950/30 dark:to-amber-900/20 p-4 shadow-xl shadow-amber-500/5 transform rotate-2 hover:rotate-0 transition-transform">
              {/* Certificate Content */}
              <div className="flex flex-col items-center justify-center h-full text-center space-y-2">
                <Award className="h-10 w-10 text-amber-500" />
                <div className="text-xs text-amber-600 dark:text-amber-400 font-semibold tracking-wider">
                  CERTIFICATE OF COMPLETION
                </div>
                <div className="text-sm font-bold text-foreground/80 line-clamp-2">
                  {name}
                </div>
                <div className="text-[10px] text-muted-foreground">
                  NEXT_ CERTIFIED • {new Date().getFullYear()}
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-amber-500/30 rounded-tl-lg" />
              <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-amber-500/30 rounded-tr-lg" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-amber-500/30 rounded-bl-lg" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-amber-500/30 rounded-br-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
