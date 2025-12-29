import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { CaseStudy } from "@/hooks/useCaseStudies";

interface FounderQuotesProps {
  projects: CaseStudy[];
}

export function FounderQuotes({ projects }: FounderQuotesProps) {
  // Filter to only projects with quotes
  const projectsWithQuotes = projects.filter((p) => p.creator_quote);

  if (projectsWithQuotes.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Quote className="h-5 w-5 text-primary" />
        What Young Founders Say
      </h3>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {projectsWithQuotes.map((project) => {
            const initials = project.student_name
              ?.split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase() || "?";

            return (
              <CarouselItem key={project.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="h-full bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
                  <CardContent className="p-5 h-full flex flex-col">
                    <Quote className="h-6 w-6 text-primary/30 mb-2" />
                    
                    <p className="text-sm italic flex-1 mb-4">
                      "{project.creator_quote}"
                    </p>

                    <div className="flex items-center gap-3 mt-auto">
                      <Avatar className="h-9 w-9 border border-primary/20">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{project.student_name}</p>
                        <p className="text-xs text-muted-foreground">
                          Age {project.student_age} • Built {project.title}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="-left-2 md:-left-4" />
        <CarouselNext className="-right-2 md:-right-4" />
      </Carousel>
    </div>
  );
}
