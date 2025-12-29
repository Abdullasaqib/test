import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Lightbulb, Copy, Heart, Clock, Palette, MessageSquare, Code, TrendingUp, Mic, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { SEOHead } from "@/components/seo/SEOHead";

const PromptLibraryPage = () => {
  const navigate = useNavigate();

  const categories = [
    { icon: Lightbulb, name: "Brainstorming", count: 12, color: "text-amber-400", bgColor: "bg-amber-500/10" },
    { icon: MessageSquare, name: "Customer Research", count: 8, color: "text-blue-400", bgColor: "bg-blue-500/10" },
    { icon: Palette, name: "Design Help", count: 10, color: "text-purple-400", bgColor: "bg-purple-500/10" },
    { icon: Code, name: "Technical Help", count: 7, color: "text-green-400", bgColor: "bg-green-500/10" },
    { icon: TrendingUp, name: "Marketing", count: 9, color: "text-pink-400", bgColor: "bg-pink-500/10" },
    { icon: Mic, name: "Pitch Prep", count: 6, color: "text-orange-400", bgColor: "bg-orange-500/10" },
  ];

  const samplePrompts = [
    {
      category: "Brainstorming",
      title: "Problem Discovery",
      prompt: "I want to build a startup for [target audience]. Help me brainstorm 10 problems they face daily that could become viable business opportunities. For each problem, rate how painful it is (1-10) and how often it occurs.",
      stage: "Idea",
      difficulty: "Beginner"
    },
    {
      category: "Customer Research",
      title: "Interview Questions",
      prompt: "I'm building [product idea] for [target audience]. Generate 10 open-ended questions I can ask in customer interviews to validate if this problem is worth solving. Focus on understanding their current behavior and pain points.",
      stage: "Validation",
      difficulty: "Beginner"
    },
    {
      category: "Design Help",
      title: "Landing Page Copy",
      prompt: "Write landing page copy for my startup [name]. The problem we solve is [problem] for [audience]. Include: a headline that grabs attention, a subheadline explaining the solution, 3 key benefits, and a strong CTA.",
      stage: "MVP",
      difficulty: "Intermediate"
    },
    {
      category: "Pitch Prep",
      title: "Investor Q&A Prep",
      prompt: "I'm pitching [startup idea] to investors. Generate 10 tough questions they might ask about my business model, market size, and competitive advantage. For each question, help me craft a confident 30-second answer.",
      stage: "Pitch",
      difficulty: "Advanced"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="PROMPT LIBRARY — 50+ AI Prompts for Young Founders"
        description="Copy-paste AI prompts for every stage of your founder journey. From brainstorming to pitch prep, accelerate with proven prompts."
        canonical="/features/prompt-library"
      />
      <PublicHeader />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-[#0A0F1C] via-[#1a1a2e] to-[#0A0F1C]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-sm px-4 py-1">
              Exclusive Platform Feature
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white">
              PROMPT <span className="text-cyan-400">LIBRARY</span>
            </h1>
            <p className="text-2xl md:text-3xl text-white/80 font-medium">
              50+ Prompts for Every Stage
            </p>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Don't know what to ask AI? We've got you covered. Copy-paste prompts 
              for brainstorming, customer research, design, coding, marketing, and pitch prep.
            </p>
            <Button 
              size="lg"
              onClick={() => navigate('/ai-foundations')}
              className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white font-bold text-lg px-8 py-6 h-auto"
            >
              Explore Prompts <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-card border-y border-border/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Prompts for Every Challenge
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Organized by category and stage. Find exactly what you need.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {categories.map((cat, index) => {
              const Icon = cat.icon;
              return (
                <Card key={index} className="glass-card border-border/50 hover:scale-105 transition-all duration-300 text-center">
                  <CardContent className="p-5 space-y-2">
                    <div className={`w-12 h-12 mx-auto rounded-xl ${cat.bgColor} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${cat.color}`} />
                    </div>
                    <h3 className="text-foreground font-bold text-sm">{cat.name}</h3>
                    <Badge variant="outline" className="text-xs">{cat.count} prompts</Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Inside the Platform - Mock-ups */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Inside the Prompt Library
            </h2>
            <p className="text-muted-foreground text-lg">
              See exactly how prompts work
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Prompt Cards Mock-up */}
            <Card className="bg-[#0d1117] border-border/50 overflow-hidden md:col-span-2">
              <div className="bg-[#161b22] px-4 py-2 flex items-center gap-2 border-b border-border/30">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-white/50 text-xs ml-2">Prompt Library — Week 3 Recommendations</span>
              </div>
              <CardContent className="p-6">
                {/* Search bar */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input 
                      type="text" 
                      placeholder="Search prompts..." 
                      className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-white/40 text-sm focus:outline-none"
                    />
                  </div>
                  <Button variant="outline" size="sm" className="bg-white/5 border-white/20 text-white/80">
                    <Heart className="w-4 h-4 mr-1" /> Favorites
                  </Button>
                </div>

                {/* Prompt cards */}
                <div className="grid md:grid-cols-2 gap-4">
                  {samplePrompts.map((prompt, i) => (
                    <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-xs">
                          {prompt.category}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Badge variant="outline" className="text-xs border-white/20 text-white/60">
                            {prompt.stage}
                          </Badge>
                        </div>
                      </div>
                      <h3 className="text-white font-bold">{prompt.title}</h3>
                      <p className="text-white/60 text-sm line-clamp-2">{prompt.prompt}</p>
                      <div className="flex items-center gap-2 pt-2">
                        <Button size="sm" className="flex-1 bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 border-0">
                          <Copy className="w-3 h-3 mr-1" /> Copy
                        </Button>
                        <Button size="sm" variant="ghost" className="text-white/40 hover:text-pink-400">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Week-Aware Recommendations */}
            <Card className="bg-[#0d1117] border-border/50 overflow-hidden">
              <div className="bg-[#161b22] px-4 py-2 flex items-center gap-2 border-b border-border/30">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-white/50 text-xs ml-2">Best for Your Week</span>
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-xs">Week 3</Badge>
                    <span className="text-white/60 text-xs">Customer Validation</span>
                  </div>
                  <p className="text-white text-sm">
                    Prompts tailored to where you are in your journey
                  </p>
                </div>
                <div className="space-y-2">
                  {[
                    "Customer Interview Questions",
                    "Analyze Interview Notes",
                    "Identify Pain Point Patterns",
                  ].map((prompt, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                      <span className="text-white text-sm">{prompt}</span>
                      <Button size="sm" variant="ghost" className="text-cyan-400 h-7 px-2">
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Favorites & History */}
            <Card className="bg-[#0d1117] border-border/50 overflow-hidden">
              <div className="bg-[#161b22] px-4 py-2 flex items-center gap-2 border-b border-border/30">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-white/50 text-xs ml-2">Your Favorites</span>
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  {[
                    { title: "Problem Discovery Brainstorm", uses: 5 },
                    { title: "Landing Page Copy Generator", uses: 3 },
                    { title: "Pitch Script Framework", uses: 2 },
                  ].map((fav, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
                        <span className="text-white text-sm">{fav.title}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/40 text-xs">
                        <Clock className="w-3 h-3" />
                        <span>Used {fav.uses}x</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-white/40 text-xs text-center">
                  Save your favorite prompts for quick access
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sample Prompts Showcase */}
      <section className="py-20 bg-card border-y border-border/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Sample Prompts
            </h2>
            <p className="text-muted-foreground text-lg">
              Here's a taste of what you'll get access to
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {samplePrompts.map((prompt, i) => (
              <Card key={i} className="glass-card border-border/50">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30">
                        {prompt.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {prompt.stage}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {prompt.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <h3 className="text-foreground font-bold text-lg">{prompt.title}</h3>
                  <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm text-muted-foreground">
                    {prompt.prompt}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#0A0F1C] via-[#1a1a2e] to-[#0A0F1C]">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <Lightbulb className="w-16 h-16 text-cyan-400 mx-auto" />
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Ready to accelerate your journey?
            </h2>
            <p className="text-white/60 text-lg">
              All 50+ prompts included in every tier. Start using them today.
            </p>
            <Button 
              size="lg"
              onClick={() => navigate('/ai-foundations')}
              className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white font-bold text-lg px-10 py-6 h-auto"
            >
              Get Access <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};

export default PromptLibraryPage;
