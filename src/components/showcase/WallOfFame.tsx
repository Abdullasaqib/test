import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { CaseStudy } from "@/hooks/useCaseStudies";

interface WallOfFameProps {
  projects: CaseStudy[];
}

export function WallOfFame({ projects }: WallOfFameProps) {
  const navigate = useNavigate();
  
  // Get unique students
  const studentsWithNames = projects
    .filter((p) => p.student_name)
    .slice(0, 11); // Leave room for the "You?" placeholder

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="h-5 w-5 text-primary" />
          Wall of Young Founders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3 items-center">
          {studentsWithNames.map((project) => {
            const initials = project.student_name
              ?.split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase() || "?";

            return (
              <div key={project.id} className="group relative">
                <Avatar className="h-14 w-14 border-2 border-primary/20 transition-transform group-hover:scale-110">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                {/* Tooltip on hover */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-lg z-10">
                  {project.student_name}, {project.student_age}
                </div>
              </div>
            );
          })}

          {/* The "You?" placeholder */}
          <Button
            variant="outline"
            className="h-14 w-14 rounded-full border-dashed border-2 hover:border-primary hover:bg-primary/10 p-0"
            onClick={() => navigate("/dashboard/certification")}
          >
            <div className="flex flex-col items-center">
              <Plus className="h-5 w-5" />
              <span className="text-[10px] font-medium">You?</span>
            </div>
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mt-4">
          These students started just like you. Build something amazing and join them! 🚀
        </p>
      </CardContent>
    </Card>
  );
}
