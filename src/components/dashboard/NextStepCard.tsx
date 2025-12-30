import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, BookOpen, Rocket, CheckCircle2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

interface NextStepCardProps {
  isEnrolled: boolean;
  isCompleted: boolean;
  lessonsCompleted: number;
  totalLessons: number;
  currentMission: {
    week: number;
    day: number;
    title: string;
  } | null;
  completedCount: number;
  certSlug?: string;
}

export function NextStepCard({
  isEnrolled,
  isCompleted,
  lessonsCompleted,
  totalLessons,
  currentMission,
  completedCount,
  certSlug = "prompt-engineering-fundamentals"
}: NextStepCardProps) {
  // Determine the primary action based on state
  const getCardState = () => {
    if (!isEnrolled) {
      return {
        title: "Start Your AI Foundations Certificate",
        subtitle: "Learn the basics of AI building in 6 short lessons",
        buttonText: "Start Learning",
        href: `/dashboard/certification/${certSlug}`,
        icon: BookOpen,
        progress: null,
        variant: "certification" as const
      };
    }

    if (!isCompleted && lessonsCompleted < totalLessons) {
      const nextLesson = lessonsCompleted + 1;
      return {
        title: `Continue Lesson ${nextLesson} of ${totalLessons}`,
        subtitle: "Pick up where you left off",
        buttonText: "Continue Learning",
        href: `/dashboard/certification/${certSlug}`,
        icon: BookOpen,
        progress: (lessonsCompleted / totalLessons) * 100,
        variant: "certification" as const
      };
    }

    if (isCompleted || lessonsCompleted >= totalLessons) {
      if (currentMission) {
        return {
          title: currentMission.title || "Continue Your Mission",
          subtitle: `Week ${currentMission.week}, Day ${currentMission.day}`,
          buttonText: completedCount === 0 ? "Start Building" : "Continue Mission",
          href: "/dashboard/mission",
          icon: Rocket,
          progress: null,
          variant: "mission" as const
        };
      }

      return {
        title: "Great work today! 🎉",
        subtitle: "You've completed today's mission. Come back tomorrow!",
        buttonText: "View Progress",
        href: "/dashboard/curriculum",
        icon: CheckCircle2,
        progress: null,
        variant: "complete" as const
      };
    }

    return {
      title: "Start Your Journey",
      subtitle: "Begin building what's NEXT_",
      buttonText: "Get Started",
      href: `/dashboard/certification/${certSlug}`,
      icon: Sparkles,
      progress: null,
      variant: "default" as const
    };
  };

  const cardState = getCardState();
  const Icon = cardState.icon;

  const getGradient = () => {
    switch (cardState.variant) {
      case "certification":
        return "from-blue-500/10 via-background to-cyan-500/5 border-blue-500/30";
      case "mission":
        return "from-primary/10 via-background to-purple-500/5 border-primary/30";
      case "complete":
        return "from-green-500/10 via-background to-emerald-500/5 border-green-500/30";
      default:
        return "from-primary/10 via-background to-primary/5 border-primary/30";
    }
  };

  const getIconColor = () => {
    switch (cardState.variant) {
      case "certification":
        return "text-blue-600 bg-blue-500/20";
      case "mission":
        return "text-primary bg-primary/20";
      case "complete":
        return "text-green-600 bg-green-500/20";
      default:
        return "text-primary bg-primary/20";
    }
  };

  return (
    <Card className={`overflow-hidden border-2 bg-gradient-to-br ${getGradient()} shadow-lg`}>
      <CardContent className="p-5 md:p-8">
        <div className="flex items-start gap-3 md:gap-4">
          <div className={`h-12 w-12 md:h-14 md:w-14 rounded-xl flex items-center justify-center shrink-0 ${getIconColor()}`}>
            <Icon className="h-6 w-6 md:h-7 md:w-7" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wide mb-1">
              Your Next Step
            </p>
            <h2 className="text-lg md:text-2xl font-bold text-foreground mb-1 md:mb-2 line-clamp-2">
              {cardState.title}
            </h2>
            <p className="text-sm text-muted-foreground mb-3 md:mb-4 line-clamp-2">
              {cardState.subtitle}
            </p>

            {cardState.progress !== null && (
              <div className="mb-3 md:mb-4">
                <Progress value={cardState.progress} className="h-1.5 md:h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {lessonsCompleted} of {totalLessons} lessons completed
                </p>
              </div>
            )}

            <Button size="lg" className="font-semibold" asChild>
              <Link to={cardState.href}>
                {cardState.buttonText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
