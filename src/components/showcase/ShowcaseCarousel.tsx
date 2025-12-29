import { useCaseStudies } from "@/hooks/useCaseStudies";
import { ShowcaseCard } from "./ShowcaseCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function ShowcaseCarousel() {
  const { data: featuredProjects = [], isLoading: loading } = useCaseStudies({ depth: 'quick' });

  if (loading) {
    return (
      <Card className="border-border/50 bg-card/50">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-48" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (featuredProjects.length === 0) return null;

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Student Projects</CardTitle>
        </div>
        <Link to="/dashboard/showcase">
          <Button variant="ghost" size="sm">
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredProjects.slice(0, 3).map((project) => (
            <ShowcaseCard key={project.id} project={project} variant="compact" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
