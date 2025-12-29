import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Lightbulb, Wrench, Trophy } from "lucide-react";
import type { CaseStudy } from "@/hooks/useCaseStudies";

interface JourneyStoryCardProps {
  project: CaseStudy;
}

export function JourneyStoryCard({ project }: JourneyStoryCardProps) {
  const initials = project.student_name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "?";

  const hasStory = project.problem_story || project.build_journey || project.outcome_story;

  return (
    <Card className="overflow-hidden hover:border-primary/50 transition-colors h-full">
      <CardContent className="p-0 h-full flex flex-col">
        {/* Header with photo */}
        <div className="p-4 pb-0 flex items-start gap-3">
          <Avatar className="h-12 w-12 border-2 border-primary/20">
            <AvatarFallback className="bg-primary/10 text-primary font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold truncate">{project.title}</h3>
            <p className="text-sm text-muted-foreground">
              {project.student_name}, {project.student_age}
            </p>
          </div>
          <Badge variant="outline" className="capitalize shrink-0">
            {project.program}
          </Badge>
        </div>

        {/* The Journey */}
        <div className="p-4 flex-1 space-y-3">
          {hasStory ? (
            <>
              {project.problem_story && (
                <div className="flex gap-2">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    <Lightbulb className="h-3.5 w-3.5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-0.5">The Problem</p>
                    <p className="text-sm line-clamp-2">{project.problem_story}</p>
                  </div>
                </div>
              )}

              {project.build_journey && (
                <div className="flex gap-2">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Wrench className="h-3.5 w-3.5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-0.5">How I Built It</p>
                    <p className="text-sm line-clamp-2">{project.build_journey}</p>
                  </div>
                </div>
              )}

              {project.outcome_story && (
                <div className="flex gap-2">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Trophy className="h-3.5 w-3.5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-0.5">What Happened</p>
                    <p className="text-sm line-clamp-2">{project.outcome_story}</p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <p className="text-sm text-muted-foreground line-clamp-3">
              {project.problem_found || "An amazing project built by a young founder."}
            </p>
          )}
        </div>

        {/* Tools */}
        <div className="p-4 pt-0 mt-auto">
          {project.tools_used && project.tools_used.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {project.tools_used.map((tool) => (
                <Badge key={tool} variant="secondary" className="text-xs">
                  {tool}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
