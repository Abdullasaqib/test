import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, Users, Sparkles } from "lucide-react";
import type { CaseStudy } from "@/hooks/useCaseStudies";

interface ProjectOfWeekHeroProps {
  project: CaseStudy | null;
}

export function ProjectOfWeekHero({ project }: ProjectOfWeekHeroProps) {
  if (!project) {
    return null;
  }

  const initials = project.student_name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "?";

  return (
    <Card className="overflow-hidden border-primary/30 bg-gradient-to-br from-primary/10 via-background to-primary/5">
      <CardContent className="p-0">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Project Visual */}
          <div className="relative aspect-video md:aspect-auto">
            {project.thumbnail_url ? (
              <img
                src={project.thumbnail_url}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full min-h-[250px] bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <Sparkles className="h-16 w-16 text-primary/40" />
              </div>
            )}
            <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground gap-1">
              <Star className="h-3 w-3 fill-current" />
              Project of the Week
            </Badge>
          </div>

          {/* Project Story */}
          <div className="p-6 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{project.title}</h2>
            
            {/* Creator */}
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="h-10 w-10 border-2 border-primary/30">
                <AvatarFallback className="bg-primary/20 text-primary font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{project.student_name}</p>
                <p className="text-sm text-muted-foreground">
                  Age {project.student_age} • {project.program} program
                </p>
              </div>
            </div>

            {/* The Story */}
            {project.problem_story && (
              <div className="mb-4">
                <p className="text-sm font-medium text-primary mb-1">💡 Why I built this:</p>
                <p className="text-muted-foreground italic">"{project.problem_story}"</p>
              </div>
            )}

            {/* Stats */}
            <div className="flex items-center gap-4 mb-4">
              {project.users_count && project.users_count > 0 && (
                <div className="flex items-center gap-1.5 text-sm">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="font-semibold">{project.users_count}+ users</span>
                </div>
              )}
              {project.tools_used && project.tools_used.length > 0 && (
                <div className="flex gap-1">
                  {project.tools_used.slice(0, 3).map((tool) => (
                    <Badge key={tool} variant="secondary" className="text-xs">
                      {tool}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
