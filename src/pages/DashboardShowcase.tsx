import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useCaseStudies, useFeaturedCaseStudies, useProjectOfWeek } from "@/hooks/useCaseStudies";
import { KidFriendlyHero } from "@/components/showcase/KidFriendlyHero";
import { KidFriendlyCard } from "@/components/showcase/KidFriendlyCard";
import { CaseStudyCard } from "@/components/showcase/CaseStudyCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Award, Rocket, BookOpen, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DashboardShowcase() {
  // Fetch all case studies
  const { data: allCaseStudies = [], isLoading: allLoading } = useCaseStudies();
  
  // Fetch full case studies (detailed)
  const { data: fullCaseStudies = [], isLoading: fullLoading } = useCaseStudies({ depth: "full" });
  
  // Fetch quick stories
  const { data: quickStories = [], isLoading: quickLoading } = useCaseStudies({ depth: "quick" });
  
  // Fetch featured
  const { data: featuredStudies = [], isLoading: featuredLoading } = useFeaturedCaseStudies();
  
  // Fetch project of the week
  const { data: projectOfWeek, isLoading: powLoading } = useProjectOfWeek();

  const navigate = useNavigate();

  const loading = allLoading || fullLoading || quickLoading || featuredLoading || powLoading;

  // Get hero project (project of week, or featured, or first quick story)
  const heroProject = projectOfWeek || 
    quickStories.find((p) => p.is_featured) || 
    quickStories[0];

  // Quick stories excluding hero
  const otherQuickStories = quickStories.filter((p) => p.id !== heroProject?.id);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-8">
          <Skeleton className="h-[300px] w-full rounded-xl" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-[200px] rounded-xl" />
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-10">
        {/* Header - Fun and Simple */}
        <div className="text-center max-w-xl mx-auto">
          <Badge variant="outline" className="mb-3">NEXT_ SHOWCASE</Badge>
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-4xl">🏆</span>
            <h1 className="text-3xl md:text-4xl font-bold">Hall of Founders</h1>
            <span className="text-4xl">🏆</span>
          </div>
          <p className="text-lg text-muted-foreground">
            Real products built by kids just like you. Read their stories, learn from their prompts, then build your own!
          </p>
        </div>

        {/* Tabs for different views */}
        <Tabs defaultValue="case-studies" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
            <TabsTrigger value="case-studies" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Case Studies
            </TabsTrigger>
            <TabsTrigger value="quick-stories" className="gap-2">
              <Rocket className="h-4 w-4" />
              Quick Stories
            </TabsTrigger>
          </TabsList>

          {/* Case Studies Tab - Rich Content */}
          <TabsContent value="case-studies" className="space-y-8">
            {/* Stats Bar */}
            <div className="flex justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{fullCaseStudies.length} Founder Stories</span>
              </div>
              <div className="flex items-center gap-2">
                <Rocket className="h-4 w-4" />
                <span>Ages 9-16</span>
              </div>
            </div>

            {/* Featured Case Study */}
            {featuredStudies[0] && (
              <section>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-500" />
                  Featured Story
                </h2>
                <CaseStudyCard caseStudy={featuredStudies[0]} variant="featured" />
              </section>
            )}

            {/* All Case Studies Grid */}
            {fullCaseStudies.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  All Case Studies
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {fullCaseStudies
                    .filter(cs => cs.id !== featuredStudies[0]?.id)
                    .map((caseStudy) => (
                      <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
                    ))}
                </div>
              </section>
            )}

            {fullCaseStudies.length === 0 && (
              <Card className="border-dashed border-2 border-primary/30">
                <CardContent className="p-12 text-center">
                  <div className="text-6xl mb-4">📖</div>
                  <h3 className="text-2xl font-bold mb-2">Case Studies Coming Soon!</h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    We're documenting founder journeys. Check back soon!
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Quick Stories Tab - Simpler Cards */}
          <TabsContent value="quick-stories" className="space-y-8">
            {/* Section 1: Project of the Week - BIG and Visual */}
            {heroProject && (
              <section>
                <KidFriendlyHero project={heroProject} />
              </section>
            )}

            {/* Section 2: More Inspiring Stories */}
            {otherQuickStories.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
                  <Rocket className="h-6 w-6 text-primary" />
                  More Amazing Stories 
                  <span className="text-2xl">✨</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {otherQuickStories.slice(0, 4).map((project) => (
                    <KidFriendlyCard key={project.id} project={project} />
                  ))}
                </div>
              </section>
            )}

            {quickStories.length === 0 && (
              <Card className="border-dashed border-2 border-primary/30">
                <CardContent className="p-12 text-center">
                  <div className="text-6xl mb-4">🎨</div>
                  <h3 className="text-2xl font-bold mb-2">Be the First!</h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    No projects yet — but YOU could be the first to build something amazing!
                  </p>
                  <Button size="lg" className="font-bold" onClick={() => navigate("/dashboard/certification")}>
                    Start Building! 🚀
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Section 3: Feeling Inspired? (softer CTA) */}
        <section>
          <Card className="bg-gradient-to-br from-primary/5 via-background to-accent/5 border-primary/20 overflow-hidden">
            <CardContent className="p-6 md:p-8">
              <div className="text-center max-w-md mx-auto">
                <p className="text-3xl mb-3">💡</p>
                <h3 className="text-xl font-semibold mb-2">
                  Feeling Inspired?
                </h3>
                <p className="text-muted-foreground mb-4">
                  These founders started exactly where you are now. 
                  When you're ready, your story could be here too.
                </p>
                <Button 
                  onClick={() => navigate("/dashboard/certification")}
                  className="gap-2"
                >
                  <Rocket className="h-4 w-4" />
                  Start Your Journey
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </DashboardLayout>
  );
}
