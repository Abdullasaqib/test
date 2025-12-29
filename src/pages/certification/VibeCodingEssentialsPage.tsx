import { useNavigate } from "react-router-dom";
import { Code2, ArrowRight, Check, Clock, CheckCircle2, Zap, MessageSquare, Rocket, Share2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SEOHead } from "@/components/seo";
import { PublicHeader, PublicFooter } from "@/components/layout";
import base44Logo from "@/assets/base44-logo-white.svg";

const VibeCodingEssentialsPage = () => {
  const navigate = useNavigate();

  const curriculum = [
    {
      lesson: 1,
      title: "What is Vibe Coding?",
      description: "Discover how natural language replaces traditional programming",
      duration: "~20 min",
      icon: MessageSquare,
      objectives: [
        "Understand the difference between vibe coding and traditional coding",
        "Explain why AI changes everything about app creation",
        "Identify 3+ apps that can be built through conversation"
      ]
    },
    {
      lesson: 2,
      title: "Mastering the Prompt Cycle",
      description: "Learn the prompt-review-refine loop that powers AI building",
      duration: "~25 min",
      icon: Zap,
      objectives: [
        "Master the prompt-review-refine cycle",
        "Write clear, specific prompts that get better results",
        "Debug AI outputs through natural conversation"
      ]
    },
    {
      lesson: 3,
      title: "From Idea to Working App",
      description: "Build a complete app from scratch using Base44",
      duration: "~25 min",
      icon: Rocket,
      objectives: [
        "Structure projects using conversational prompts",
        "Build features incrementally with AI assistance",
        "Create a fully functional application from scratch"
      ]
    },
    {
      lesson: 4,
      title: "Ship & Share",
      description: "Deploy your app and get real users",
      duration: "~20 min",
      icon: Share2,
      objectives: [
        "Deploy your app to production",
        "Get your first real users",
        "Iterate based on feedback"
      ]
    }
  ];

  const skillsMastered = [
    { skill: "The Prompt Cycle", description: "Master the prompt-review-refine methodology" },
    { skill: "AI-Assisted Building", description: "Build apps through natural conversation" },
    { skill: "Debugging Through Dialogue", description: "Fix issues by talking to AI" },
    { skill: "Shipping Real Apps", description: "Deploy and share with the world" }
  ];

  return (
    <>
      <SEOHead 
        title="Vibe Coding Essentials | Build Apps Through Conversation | NEXT_" 
        description="Master the revolutionary skill of building software by talking to AI. No traditional coding required. 4 lessons, ~1.5 hours." 
      />
      <div className="min-h-screen bg-background">
        <PublicHeader />

        {/* Hero */}
        <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-br from-[#1a0a2e] via-[#2d1b4e] to-[#1a0a2e]">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/40 text-sm px-4 py-1.5">
                UPGRADE • 4 LESSONS • 1 MONTH ACCESS
              </Badge>

              <div className="flex items-center justify-center gap-4">
                <Code2 className="w-12 h-12 text-purple-400" />
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Vibe Coding<br />
                <span className="text-purple-400">Essentials</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                Master the revolutionary skill of building software by talking to AI.<br />
                <span className="text-purple-300 font-medium">No traditional coding required.</span>
              </p>

              <div className="flex items-center justify-center gap-6 text-white/60 text-sm flex-wrap">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-400" />
                  ~1.5 hours total
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  Certificate included
                </span>
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  1 month platform access
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/signup')} 
                  className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white font-bold text-lg px-10 py-7 h-auto"
                >
                  Start Learning <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              <p className="text-white/50 text-sm">
                Upgrade from FREE for just $19
              </p>
            </div>
          </div>
        </section>

        {/* What is Vibe Coding */}
        <section className="py-20 bg-card border-y border-border/50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/30">
                THE REVOLUTION
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground">
                What is Vibe Coding?
              </h2>
              <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
                <p>
                  <span className="text-foreground font-semibold">Vibe coding</span> is building software 
                  through conversation with AI. Instead of writing code line by line, you describe 
                  what you want — and the AI builds it.
                </p>
                <p>
                  This isn't the future. <span className="text-purple-400 font-medium">It's happening right now.</span>
                </p>
                <p>
                  The students who master this skill will be the founders, creators, and leaders 
                  of the next decade. The ones who don't will wonder how everyone else moved so fast.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4-Lesson Curriculum */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/30 mb-4">
                THE CURRICULUM
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                4 Lessons to App Builder
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                From zero to shipping a real app. No coding experience required.
              </p>
            </div>

            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
              {curriculum.map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.lesson} className="border-border/50 bg-card/50 overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 justify-between mb-1">
                            <Badge variant="outline" className="text-xs text-purple-400 border-purple-500/30">
                              Lesson {item.lesson}
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {item.duration}
                            </span>
                          </div>
                          <h3 className="font-bold text-foreground text-lg">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-border/30">
                        <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Learning Objectives:</p>
                        <ul className="space-y-2">
                          {item.objectives.map((obj, i) => (
                            <li key={i} className="text-sm text-foreground/70 flex items-start gap-2">
                              <Check className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                              <span>{obj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Skills Mastered */}
        <section className="py-20 bg-card/30 border-y border-border/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/30 mb-4">
                SKILLS MASTERED
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                What You'll Master
              </h2>
            </div>

            <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6">
              {skillsMastered.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border/50">
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{item.skill}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Base44 Partnership */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-purple-500/10 overflow-hidden">
                <CardContent className="p-8 text-center space-y-6">
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-2xl font-bold text-foreground">NEXT_</span>
                    <span className="text-muted-foreground">×</span>
                    <img src={base44Logo} alt="Base44" className="h-6 invert dark:invert-0" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Built in Partnership with Base44
                  </h3>
                  <p className="text-muted-foreground">
                    Learn vibe coding using the same AI-powered platform trusted by thousands of builders. 
                    Your <span className="text-purple-400 font-semibold">$19 upgrade includes Base44 building credits</span> to 
                    build your first real app.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Upgrade Section */}
        <section className="py-20 bg-card/30 border-y border-border/50">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30">
                UPGRADE YOUR CERTIFICATE
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Completed AI Foundations?
              </h2>
              <p className="text-muted-foreground text-lg">
                Unlock Vibe Coding Essentials for just <span className="text-purple-400 font-semibold">$19</span>. 
                Includes 4 lessons, your certificate, 1 month of full platform access, and Base44 building credits.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/signup')} 
                  className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white font-bold"
                >
                  Unlock for $19 <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate('/ai-foundations')} 
                  className="border-border"
                >
                  Start Free with AI Foundations
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-gradient-to-br from-[#1a0a2e] via-[#2d1b4e] to-[#1a0a2e]">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                Ready to Build Your First App?
              </h2>
              <p className="text-xl text-white/70">
                Join thousands of students who are building real apps through conversation with AI.
              </p>
              <Button 
                size="lg" 
                onClick={() => navigate('/signup')} 
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white font-bold text-lg px-10 py-7 h-auto"
              >
                Unlock for $19 <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        <PublicFooter />
      </div>
    </>
  );
};

export default VibeCodingEssentialsPage;
