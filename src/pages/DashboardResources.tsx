import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Search, 
  ExternalLink, 
  FileText, 
  Video, 
  Wrench, 
  Lightbulb,
  Star,
  Loader2,
  Rocket,
  Palette,
  PenTool,
  Mic,
  HelpCircle,
  BarChart3,
  Play,
  X,
  Sparkles
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useStudent } from "@/hooks/useStudent";
import { useJourney } from "@/hooks/useJourney";

interface Resource {
  id: string;
  title: string;
  description: string | null;
  resource_type: string;
  url: string;
  thumbnail_url: string | null;
  program: string | null;
  week_number: number | null;
  category: string;
  is_featured: boolean;
  video_embed_url?: string | null;
  difficulty_level?: string;
  intent_tags?: string[];
  week_relevance?: number[];
  age_groups?: string[];
}

// Intent-based filtering - what kids WANT to do
const intentFilters = [
  { value: "all", label: "All Tools", icon: Sparkles, color: "bg-primary/10 text-primary" },
  { value: "build-app", label: "Build an App", icon: Rocket, color: "bg-blue-500/10 text-blue-500" },
  { value: "design", label: "Design Something", icon: Palette, color: "bg-pink-500/10 text-pink-500" },
  { value: "write-content", label: "Write Copy", icon: PenTool, color: "bg-green-500/10 text-green-500" },
  { value: "pitch", label: "Practice My Pitch", icon: Mic, color: "bg-purple-500/10 text-purple-500" },
  { value: "get-unstuck", label: "Get Unstuck", icon: HelpCircle, color: "bg-orange-500/10 text-orange-500" },
  { value: "understand-numbers", label: "Understand Numbers", icon: BarChart3, color: "bg-cyan-500/10 text-cyan-500" },
];

const getIcon = (type: string) => {
  switch (type) {
    case "tool":
      return Wrench;
    case "template":
      return FileText;
    case "video":
      return Video;
    default:
      return Lightbulb;
  }
};

// Rich default resources with embedded videos and intent tags
const defaultResources: Resource[] = [
  // Build an App Tools
  {
    id: "1",
    title: "Lovable",
    description: "Create full websites and apps with AI. Type what you want, watch it come to life! Perfect for building your MVP.",
    resource_type: "tool",
    url: "https://lovable.dev",
    thumbnail_url: null,
    program: null,
    week_number: null,
    category: "ai-tools",
    is_featured: true,
    video_embed_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    difficulty_level: "beginner",
    intent_tags: ["build-app"],
    week_relevance: [5, 6, 7],
    age_groups: ["teen", "advanced"],
  },
  {
    id: "2",
    title: "Base44",
    description: "Build apps just by describing what you want. Say it, and Base44 builds it for you! Great for beginners.",
    resource_type: "tool",
    url: "https://base44.com",
    thumbnail_url: null,
    program: null,
    week_number: null,
    category: "ai-tools",
    is_featured: true,
    video_embed_url: null,
    difficulty_level: "beginner",
    intent_tags: ["build-app"],
    week_relevance: [5, 6, 7],
    age_groups: ["junior", "teen"],
  },
  {
    id: "3",
    title: "Glide",
    description: "Turn a spreadsheet into a beautiful app in minutes. No coding needed! Perfect for your first app.",
    resource_type: "tool",
    url: "https://glideapps.com",
    thumbnail_url: null,
    program: null,
    week_number: null,
    category: "ai-tools",
    is_featured: true,
    video_embed_url: "https://www.youtube.com/embed/Lqc9oBQzZlc",
    difficulty_level: "beginner",
    intent_tags: ["build-app"],
    week_relevance: [5, 6, 7],
    age_groups: ["junior", "teen"],
  },
  // Design Tools
  {
    id: "4",
    title: "Canva",
    description: "Design anything - logos, social posts, pitch decks. Drag, drop, done! Used by millions of creators.",
    resource_type: "tool",
    url: "https://canva.com",
    thumbnail_url: null,
    program: null,
    week_number: null,
    category: "tools",
    is_featured: true,
    video_embed_url: "https://www.youtube.com/embed/zJSbCzqZpCk",
    difficulty_level: "beginner",
    intent_tags: ["design", "pitch"],
    week_relevance: [5, 6, 7, 8, 11, 12],
    age_groups: ["junior", "teen", "advanced"],
  },
  {
    id: "5",
    title: "Leonardo AI",
    description: "Create amazing images with AI. Perfect for logos, product mockups, and marketing graphics!",
    resource_type: "tool",
    url: "https://leonardo.ai",
    thumbnail_url: null,
    program: null,
    week_number: null,
    category: "ai-tools",
    is_featured: false,
    video_embed_url: "https://www.youtube.com/embed/VIEkJSs1Z3k",
    difficulty_level: "beginner",
    intent_tags: ["design"],
    week_relevance: [5, 6, 7, 8],
    age_groups: ["teen", "advanced"],
  },
  {
    id: "6",
    title: "Figma",
    description: "Design your app before building it. See exactly how it will look and feel! Pro designers use this.",
    resource_type: "tool",
    url: "https://figma.com",
    thumbnail_url: null,
    program: null,
    week_number: null,
    category: "tools",
    is_featured: false,
    video_embed_url: "https://www.youtube.com/embed/Cx2dkpBxst8",
    difficulty_level: "intermediate",
    intent_tags: ["design", "build-app"],
    week_relevance: [5, 6],
    age_groups: ["teen", "advanced"],
  },
  // Write Content Tools
  {
    id: "7",
    title: "ChatGPT",
    description: "The AI assistant everyone talks about. Ask questions, brainstorm, write - it does it all! Your thinking partner.",
    resource_type: "tool",
    url: "https://chat.openai.com",
    thumbnail_url: null,
    program: null,
    week_number: null,
    category: "ai-tools",
    is_featured: true,
    video_embed_url: "https://www.youtube.com/embed/2IK3DFHRFfw",
    difficulty_level: "beginner",
    intent_tags: ["write-content", "get-unstuck", "pitch"],
    week_relevance: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    age_groups: ["junior", "teen", "advanced"],
  },
  {
    id: "8",
    title: "Claude",
    description: "Super smart AI that helps you think, write, and solve problems. Really good at explaining things!",
    resource_type: "tool",
    url: "https://claude.ai",
    thumbnail_url: null,
    program: null,
    week_number: null,
    category: "ai-tools",
    is_featured: false,
    video_embed_url: null,
    difficulty_level: "beginner",
    intent_tags: ["write-content", "get-unstuck"],
    week_relevance: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    age_groups: ["teen", "advanced"],
  },
  // Pitch Tools
  {
    id: "9",
    title: "Gamma",
    description: "Make beautiful presentations in seconds. Just describe your idea, Gamma designs the slides! Perfect for Demo Day.",
    resource_type: "tool",
    url: "https://gamma.app",
    thumbnail_url: null,
    program: null,
    week_number: null,
    category: "ai-tools",
    is_featured: true,
    video_embed_url: "https://www.youtube.com/embed/M_qLBTwfV7s",
    difficulty_level: "beginner",
    intent_tags: ["pitch", "design"],
    week_relevance: [11, 12],
    age_groups: ["junior", "teen", "advanced"],
  },
  // Get Unstuck Tools
  {
    id: "10",
    title: "Google AI Studio",
    description: "Free playground to experiment with Google's Gemini AI. Great for testing ideas and getting help!",
    resource_type: "tool",
    url: "https://aistudio.google.com",
    thumbnail_url: null,
    program: null,
    week_number: null,
    category: "ai-tools",
    is_featured: false,
    video_embed_url: null,
    difficulty_level: "intermediate",
    intent_tags: ["get-unstuck", "write-content"],
    week_relevance: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    age_groups: ["teen", "advanced"],
  },
  // Templates
  {
    id: "11",
    title: "Business Model Canvas",
    description: "Map out your entire business on one page. See the big picture clearly! Every founder needs this.",
    resource_type: "template",
    url: "https://www.strategyzer.com/canvas/business-model-canvas",
    thumbnail_url: null,
    program: null,
    week_number: null,
    category: "templates",
    is_featured: true,
    video_embed_url: "https://www.youtube.com/embed/IP0cUBWTgpY",
    difficulty_level: "beginner",
    intent_tags: ["understand-numbers", "pitch"],
    week_relevance: [3, 4, 11, 12],
    age_groups: ["teen", "advanced"],
  },
  // Tutorials
  {
    id: "12",
    title: "How to Validate Your Idea",
    description: "Test if people actually want what you're building. Save time, build smarter!",
    resource_type: "video",
    url: "https://www.youtube.com/watch?v=C27RVio2rOs",
    thumbnail_url: null,
    program: null,
    week_number: null,
    category: "tutorials",
    is_featured: false,
    video_embed_url: "https://www.youtube.com/embed/C27RVio2rOs",
    difficulty_level: "beginner",
    intent_tags: ["get-unstuck"],
    week_relevance: [3, 4],
    age_groups: ["junior", "teen", "advanced"],
  },
  // Inspiration
  {
    id: "13",
    title: "Y Combinator Startup Library",
    description: "Free advice from the world's best startup school. Learn from the pros who funded Airbnb and Stripe!",
    resource_type: "link",
    url: "https://www.ycombinator.com/library",
    thumbnail_url: null,
    program: null,
    week_number: null,
    category: "inspiration",
    is_featured: false,
    video_embed_url: null,
    difficulty_level: "intermediate",
    intent_tags: ["get-unstuck"],
    week_relevance: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    age_groups: ["teen", "advanced"],
  },
  {
    id: "14",
    title: "Notion",
    description: "Your startup's brain! Notes, docs, to-do lists, project plans - all in one place.",
    resource_type: "tool",
    url: "https://notion.so",
    thumbnail_url: null,
    program: null,
    week_number: null,
    category: "tools",
    is_featured: false,
    video_embed_url: "https://www.youtube.com/embed/aA7si7AmPkY",
    difficulty_level: "beginner",
    intent_tags: ["write-content", "understand-numbers"],
    week_relevance: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    age_groups: ["teen", "advanced"],
  },
];

export default function DashboardResources() {
  const { student } = useStudent();
  const { currentWeek, weekThemes } = useJourney();
  const weekNumber = currentWeek || 1;
  const currentWeekTitle = weekThemes[weekNumber]?.theme || 'Getting Started';
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIntent, setActiveIntent] = useState("all");
  const [videoModal, setVideoModal] = useState<{ open: boolean; url: string; title: string }>({
    open: false,
    url: "",
    title: "",
  });

  // Determine student's age group based on program
  const getAgeGroup = () => {
    if (!student?.program) return "teen";
    if (student.program.includes("junior")) return "junior";
    if (student.program.includes("advanced")) return "advanced";
    return "teen";
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const { data, error } = await supabase
        .from("resources")
        .select("*")
        .order("is_featured", { ascending: false });

      if (error) throw error;
      
      // Merge DB resources with defaults, using defaults if DB is empty
      if (data && data.length > 0) {
        // Cast the data to include new fields
        setResources(data as Resource[]);
      } else {
        setResources(defaultResources);
      }
    } catch (error) {
      console.error("Error fetching resources:", error);
      setResources(defaultResources);
    } finally {
      setLoading(false);
    }
  };

  // Filter by search, intent, and age appropriateness
  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (resource.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    
    const matchesIntent = activeIntent === "all" || 
      (resource.intent_tags && resource.intent_tags.includes(activeIntent));
    
    // Age-appropriate filtering
    const studentAgeGroup = getAgeGroup();
    const matchesAge = !resource.age_groups || resource.age_groups.length === 0 ||
      resource.age_groups.includes(studentAgeGroup);
    
    return matchesSearch && matchesIntent && matchesAge;
  });

  // Get "Best for Your Week" recommendations
  const weekRecommendations = resources.filter((resource) => {
    return resource.week_relevance && resource.week_relevance.includes(weekNumber);
  }).slice(0, 3);

  const openVideoModal = (url: string, title: string) => {
    setVideoModal({ open: true, url, title });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Your AI Toolkit</h1>
          <p className="text-muted-foreground mt-1">
            Everything you need to build, design, and launch
          </p>
        </div>

        {/* Best For Your Week Section */}
        {weekRecommendations.length > 0 && (
          <Card className="border-primary/30 bg-primary/5">
            <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Best for Week {weekNumber}: {currentWeekTitle}
              </CardTitle>
              <CardDescription>
                These tools are perfect for what you're learning right now
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {weekRecommendations.map((resource) => (
                  <Button
                    key={resource.id}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => {
                      if (resource.video_embed_url) {
                        openVideoModal(resource.video_embed_url, resource.title);
                      } else {
                        window.open(resource.url, "_blank");
                      }
                    }}
                  >
                    {resource.video_embed_url && <Play className="h-3 w-3" />}
                    {resource.title}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Intent-Based Filter - What do you want to do? */}
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-3">
            What do you want to do right now?
          </p>
          <div className="flex flex-wrap gap-2">
            {intentFilters.map((intent) => {
              const Icon = intent.icon;
              const isActive = activeIntent === intent.value;
              return (
                <Button
                  key={intent.value}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  className={`gap-2 ${!isActive ? intent.color : ""}`}
                  onClick={() => setActiveIntent(intent.value)}
                >
                  <Icon className="h-4 w-4" />
                  {intent.label}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Resources Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {filteredResources.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredResources.map((resource) => {
                  const Icon = getIcon(resource.resource_type);
                  const hasVideo = !!resource.video_embed_url;
                  
                  return (
                    <Card 
                      key={resource.id} 
                      className={`hover:border-primary/30 transition-all ${
                        resource.is_featured ? "border-gold/30 bg-gold/5" : ""
                      }`}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                            resource.is_featured ? "bg-gold/20" : "bg-primary/10"
                          }`}>
                            <Icon className={`h-5 w-5 ${
                              resource.is_featured ? "text-gold" : "text-primary"
                            }`} />
                          </div>
                          <div className="flex items-center gap-2">
                            {hasVideo && (
                              <Badge variant="secondary" className="text-xs gap-1">
                                <Play className="h-3 w-3" />
                                Tutorial
                              </Badge>
                            )}
                            {resource.is_featured && (
                              <Star className="h-4 w-4 text-gold fill-gold" />
                            )}
                          </div>
                        </div>
                        <CardTitle className="text-base mt-3">{resource.title}</CardTitle>
                        <CardDescription className="text-sm line-clamp-2">
                          {resource.description}
                        </CardDescription>
                        
                        {/* Difficulty Badge */}
                        {resource.difficulty_level && (
                          <Badge 
                            variant="outline" 
                            className={`w-fit mt-2 text-xs ${
                              resource.difficulty_level === "beginner" 
                                ? "border-green-500/30 text-green-600" 
                                : resource.difficulty_level === "intermediate"
                                ? "border-yellow-500/30 text-yellow-600"
                                : "border-red-500/30 text-red-600"
                            }`}
                          >
                            {resource.difficulty_level === "beginner" ? "🌱 Beginner" : 
                             resource.difficulty_level === "intermediate" ? "🌿 Intermediate" : "🌳 Advanced"}
                          </Badge>
                        )}
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {hasVideo && (
                          <Button 
                            variant="default" 
                            size="sm" 
                            className="w-full gap-2"
                            onClick={() => openVideoModal(resource.video_embed_url!, resource.title)}
                          >
                            <Play className="h-4 w-4" />
                            Watch Tutorial
                          </Button>
                        )}
                        <Button variant="outline" size="sm" className="w-full" asChild>
                          <a href={resource.url} target="_blank" rel="noopener noreferrer">
                            Open {resource.title}
                            <ExternalLink className="ml-2 h-3 w-3" />
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
                  <h3 className="font-medium text-foreground mb-2">No Tools Found</h3>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search or filter
                  </p>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {/* Video Modal */}
        <Dialog open={videoModal.open} onOpenChange={(open) => setVideoModal({ ...videoModal, open })}>
          <DialogContent className="max-w-4xl p-0">
            <DialogHeader className="p-4 pb-0">
              <div className="flex items-center justify-between">
                <DialogTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5 text-primary" />
                  {videoModal.title} Tutorial
                </DialogTitle>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setVideoModal({ ...videoModal, open: false })}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>
            <div className="p-4 pt-2">
              <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
                {videoModal.url && (
                  <iframe
                    src={videoModal.url}
                    title={videoModal.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-3 text-center">
                Watch this tutorial, then try it yourself! 🚀
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
