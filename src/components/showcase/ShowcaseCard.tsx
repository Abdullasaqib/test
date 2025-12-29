import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Wrench } from "lucide-react";
import type { CaseStudy } from "@/hooks/useCaseStudies";

interface ShowcaseCardProps {
  project: CaseStudy;
  variant?: "default" | "compact";
}

const programColors: Record<string, string> = {
  junior: "bg-green-500/20 text-green-400 border-green-500/30",
  teen: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  advanced: "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

export function ShowcaseCard({ project, variant = "default" }: ShowcaseCardProps) {
  const isCompact = variant === "compact";

  return (
    <Card className={`group overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 ${isCompact ? "" : "h-full"}`}>
      {/* Thumbnail */}
      {project.thumbnail_url && !isCompact && (
        <div className="aspect-video bg-muted overflow-hidden">
          <img
            src={project.thumbnail_url}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Placeholder if no thumbnail */}
      {!project.thumbnail_url && !isCompact && (
        <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
          <div className="text-4xl opacity-50">🚀</div>
        </div>
      )}

      <CardHeader className={isCompact ? "pb-2" : ""}>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className={isCompact ? "text-base" : "text-lg"}>
            {project.title}
          </CardTitle>
          {project.program && (
            <Badge variant="outline" className={`${programColors[project.program] || ""} capitalize text-xs`}>
              {project.program}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-3.5 w-3.5" />
          <span>{project.student_name}</span>
          {project.student_age && (
            <span className="text-xs">• Age {project.student_age}</span>
          )}
        </div>
      </CardHeader>

      <CardContent className={isCompact ? "pt-0" : ""}>
        {!isCompact && project.problem_found && (
          <CardDescription className="mb-4 line-clamp-2">
            {project.problem_found}
          </CardDescription>
        )}

        {/* Tools Used */}
        {project.tools_used && project.tools_used.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tools_used.map((tool) => (
              <Badge key={tool} variant="secondary" className="text-xs">
                <Wrench className="h-2.5 w-2.5 mr-1" />
                {tool}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
