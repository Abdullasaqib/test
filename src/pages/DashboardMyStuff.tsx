import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Backpack,
  Lightbulb,
  Trophy,
  Wrench,
  Star,
  ExternalLink,
  Copy,
  Check,
  Rocket,
  BookOpen
} from "lucide-react";
import { useAIToolbox } from "@/hooks/useAIToolbox";
import { useCaseStudies } from "@/hooks/useCaseStudies";
import { useStudentStuff } from "@/hooks/useStudentStuff";
import { useToast } from "@/hooks/use-toast";

// Simplified resources list
const quickResources = [
  { title: "Lovable", description: "Build apps with AI", url: "https://lovable.dev", category: "Build" },
  { title: "Canva", description: "Design anything", url: "https://canva.com", category: "Design" },
  { title: "ChatGPT", description: "AI assistant", url: "https://chat.openai.com", category: "AI" },
  { title: "Gamma", description: "AI presentations", url: "https://gamma.app", category: "Pitch" },
  { title: "Notion", description: "Notes & planning", url: "https://notion.so", category: "Organize" },
  { title: "Glide", description: "No-code apps", url: "https://glideapps.com", category: "Build" },
];

export default function DashboardMyStuff() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("prompts");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const {
    prompts,
    favorites,
    loading: promptsLoading,
    toggleFavorite,
  } = useAIToolbox();

  const { projects, loading: projectsLoading } = useStudentStuff();
  const { data: caseStudies = [], isLoading: showcaseLoading } = useCaseStudies({ depth: "quick" });

  const handleCopyPrompt = async (prompt: string, id: string) => {
    await navigator.clipboard.writeText(prompt);
    setCopiedId(id);
    toast({ title: "Copied!", description: "Prompt copied to clipboard" });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUsePrompt = (prompt: string) => {
    navigate("/dashboard/coach", { state: { prefillPrompt: prompt } });
  };

  // Get favorite prompts
  const favoritePrompts = prompts.filter(p => favorites.includes(p.id));
  // Get suggested prompts (first 6 that aren't favorites)
  const suggestedPrompts = prompts.filter(p => !favorites.includes(p.id)).slice(0, 6);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5">
            <Backpack className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">My Stuff</h1>
            <p className="text-muted-foreground">
              Prompts, projects & tools all in one place
            </p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="prompts" className="gap-2">
              <Lightbulb className="h-4 w-4" />
              <span className="hidden sm:inline">AI Prompts</span>
              <span className="sm:hidden">Prompts</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="gap-2">
              <Trophy className="h-4 w-4" />
              <span className="hidden sm:inline">My Projects</span>
              <span className="sm:hidden">Projects</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="gap-2">
              <Wrench className="h-4 w-4" />
              <span className="hidden sm:inline">Resources</span>
              <span className="sm:hidden">Tools</span>
            </TabsTrigger>
          </TabsList>

          {/* AI Prompts Tab */}
          <TabsContent value="prompts" className="mt-6 space-y-6">
            {promptsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 rounded-xl" />)}
              </div>
            ) : (
              <>
                {/* Favorites */}
                {favoritePrompts.length > 0 && (
                  <section>
                    <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Star className="h-5 w-5 text-amber-500" />
                      My Favorites
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {favoritePrompts.slice(0, 4).map((prompt) => (
                        <Card key={prompt.id} className="hover:border-primary/30 transition-colors">
                          <CardContent className="p-4 space-y-3">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-medium">{prompt.title}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {prompt.description}
                                </p>
                              </div>
                              <button
                                onClick={() => toggleFavorite(prompt.id)}
                                className="text-amber-500 hover:text-amber-400"
                              >
                                <Star className="h-4 w-4 fill-current" />
                              </button>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleCopyPrompt(prompt.prompt_template, prompt.id)}
                              >
                                {copiedId === prompt.id ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleUsePrompt(prompt.prompt_template)}
                              >
                                Use →
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </section>
                )}

                {/* Suggested Prompts */}
                <section>
                  <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    Suggested Prompts
                    <Badge variant="outline" className="ml-2">{prompts.length} total</Badge>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {suggestedPrompts.map((prompt) => (
                      <Card key={prompt.id} className="hover:border-primary/30 transition-colors">
                        <CardContent className="p-4 space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium text-sm">{prompt.title}</h3>
                              <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                                {prompt.description}
                              </p>
                            </div>
                            <button
                              onClick={() => toggleFavorite(prompt.id)}
                              className="text-muted-foreground hover:text-amber-500"
                            >
                              <Star className="h-4 w-4" />
                            </button>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="w-full text-xs"
                            onClick={() => handleUsePrompt(prompt.prompt_template)}
                          >
                            Use This →
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <Button variant="outline" onClick={() => navigate("/dashboard/toolkit")}>
                      Browse All {prompts.length} Prompts
                    </Button>
                  </div>
                </section>
              </>
            )}
          </TabsContent>

          {/* My Projects Tab */}
          <TabsContent value="projects" className="mt-6 space-y-6">
            {projectsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 rounded-xl" />)}
              </div>
            ) : projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project) => (
                  <Card key={project.id} className="hover:border-primary/30 transition-colors cursor-pointer group" onClick={() => {
                    if (project.type === 'certification') {
                      navigate(`/dashboard/certification/${project.slug}`);
                    }
                  }}>
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-3xl shrink-0 overflow-hidden">
                        {project.thumbnail_url ? (
                          <img src={project.thumbnail_url} alt={project.title} className="w-full h-full object-cover" />
                        ) : project.metadata?.icon ? (
                          project.metadata.icon
                        ) : (
                          project.type === 'certification' ? "🎓" : "🛠️"
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold truncate">{project.title}</h3>
                          {project.type === 'certification' && (
                            <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 text-[10px]">CERTIFIED</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{project.subtitle}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(project.date).toLocaleDateString()}
                        </p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    </CardContent>
                  </Card>
                ))}

                {/* Add New Project CTA */}
                <Card className="border-dashed border-2 hover:border-primary/50 transition-colors cursor-pointer flex items-center justify-center p-6" onClick={() => navigate("/dashboard/certification")}>
                  <div className="text-center">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                      <Rocket className="h-5 w-5 text-primary" />
                    </div>
                    <p className="font-medium text-sm text-primary">Build something new</p>
                  </div>
                </Card>
              </div>
            ) : (
              <>
                {/* Your Projects Empty State */}
                <Card className="border-dashed border-2 border-primary/30">
                  <CardContent className="p-8 text-center">
                    <Rocket className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-bold mb-2">Your projects will appear here</h3>
                    <p className="text-muted-foreground mb-4">
                      Complete missions to create artifacts and projects that showcase your skills!
                    </p>
                    <Button onClick={() => navigate("/dashboard/certification")}>
                      Start Building
                    </Button>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Inspiration from others */}
            {caseStudies.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-500" />
                  Get Inspired
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {caseStudies.slice(0, 4).map((project) => (
                    <Card key={project.id} className="hover:border-primary/30 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="text-3xl">{project.thumbnail_url || "🚀"}</div>
                          <div className="flex-1">
                            <h3 className="font-medium">{project.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              by {project.student_name}, {project.student_age}
                            </p>
                            {project.outcome && (
                              <Badge variant="outline" className="mt-2 text-xs">
                                {project.outcome}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline" onClick={() => navigate("/dashboard/showcase")}>
                    See All Stories
                  </Button>
                </div>
              </section>
            )}
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="mt-6 space-y-6">
            <section>
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Wrench className="h-5 w-5 text-primary" />
                Quick Access Tools
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {quickResources.map((resource) => (
                  <Card
                    key={resource.title}
                    className="hover:border-primary/30 transition-colors cursor-pointer"
                    onClick={() => window.open(resource.url, "_blank")}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-[10px]">
                          {resource.category}
                        </Badge>
                        <ExternalLink className="h-3 w-3 text-muted-foreground" />
                      </div>
                      <h3 className="font-medium">{resource.title}</h3>
                      <p className="text-xs text-muted-foreground">{resource.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <div className="text-center pt-4">
              <Button variant="outline" onClick={() => navigate("/dashboard/resources")}>
                <BookOpen className="h-4 w-4 mr-2" />
                Browse All Resources
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout >
  );
}