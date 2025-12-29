import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Award, Clock, BookOpen, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Tables } from "@/integrations/supabase/types";

type Certification = Tables<"certifications">;

interface CertificationCardProps {
  certification: Certification;
  completedLessons?: number;
  isEnrolled?: boolean;
  isCompleted?: boolean;
}

export function CertificationCard({
  certification,
  completedLessons = 0,
  isEnrolled = false,
  isCompleted = false,
}: CertificationCardProps) {
  const progress = certification.lessons_count 
    ? (completedLessons / certification.lessons_count) * 100 
    : 0;

  return (
    <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
      
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Award className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">{certification.name}</CardTitle>
            <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
              <span className="flex items-center gap-1">
                <BookOpen className="h-3.5 w-3.5" />
                {certification.lessons_count} lessons
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {certification.estimated_hours}h
              </span>
            </div>
          </div>
        </div>
        <CardDescription className="text-sm">
          {certification.description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {isEnrolled && !isCompleted && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{completedLessons}/{certification.lessons_count}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {isCompleted ? (
          <div className="flex items-center gap-2 text-green-400 mb-4">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-medium">Completed!</span>
          </div>
        ) : null}

        <Link to={`/dashboard/certification/${certification.slug}`}>
          <Button className="w-full group-hover:bg-primary/90" size="sm">
            {isCompleted ? "View Certificate" : isEnrolled ? "Continue Learning" : "Start Learning"}
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
