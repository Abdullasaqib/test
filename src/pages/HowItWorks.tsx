import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Award, Brain, Shield, MessageSquare, Target, Zap, ArrowRight, Sparkles, Mic, Lightbulb, BookOpen, CheckCircle } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { PublicHeader, PublicFooter } from "@/components/layout";
import { SEOHead } from "@/components/seo/SEOHead";

const HowItWorks = () => {
  const navigate = useNavigate();

  const certifications = [
    {
      level: 1,
      name: "AI Foundations Certificate",
      description: "Master the fundamentals of AI-powered creation. Learn prompt engineering, understand AI tools, build your first projects.",
      duration: "10 Lessons • Forever Free",
      skills: ["Prompt Engineering", "AI Tool Mastery", "Creative Problem Solving"],
      path: "/certification/ai-foundations",
      color: "from-blue-500 to-cyan-500",
      badge: "LEVEL 1"
    },
    {
      level: 2,
      name: "AI Builder Certificate",
      description: "Build real products with real customers. Complete the 12-week curriculum from problem discovery to product launch.",
      duration: "12 Weeks • 180 Missions",
      skills: ["Product Development", "Customer Validation", "Business Models"],
      path: "/certification/ai-builder",
      color: "from-amber-500 to-orange-500",
      badge: "LEVEL 2"
    },
    {
      level: 3,
      name: "AI Launcher Certificate",
      description: "Present to investors, launch publicly, and earn recognition. Complete the Live Cohort and Demo Day presentation.",
      duration: "Live Cohort • Demo Day",
      skills: ["Pitch Mastery", "Investor Communication", "Public Launch"],
      path: "/certification/ai-launcher",
      color: "from-purple-500 to-pink-500",
      badge: "LEVEL 3"
    }
  ];

  const phases = [
    { name: "DISCOVER", weeks: "Weeks 1-2", description: "Find problems worth solving", icon: Lightbulb },
    { name: "VALIDATE", weeks: "Weeks 3-4", description: "Talk to real customers", icon: Target },
    { name: "BUILD", weeks: "Weeks 5-8", description: "Create your product with AI", icon: Sparkles },
    { name: "LAUNCH", weeks: "Weeks 9-10", description: "Go live, get real users", icon: ArrowRight },
    { name: "PITCH", weeks: "Weeks 11-12", description: "Present to investors", icon: Mic }
  ];

  const tools = [
    {
      icon: "🦈",
      name: "THE TANK",
      description: "AI-powered Shark Tank simulation. Practice pitching to 5 investor personas. Get scored and level up.",
      path: "/features/the-tank"
    },
    {
      icon: "🧬",
      name: "FOUNDER DNA",
      description: "Discover your founder archetype. Understand your superpowers. Build self-awareness.",
      path: "/features/founder-dna"
    },
    {
      icon: "🤖",
      name: "AI COACH",
      description: "24/7 mentor who never sleeps. Context-aware guidance. Unstuck prompts when you're blocked.",
      path: "/features/ai-coach"
    },
    {
      icon: "📚",
      name: "PROMPT LIBRARY",
      description: "50+ prompts for every stage. From brainstorming to launch. Copy, paste, create.",
      path: "/features/prompt-library"
    }
  ];

  const globalRace = [
    { country: "Singapore", stat: "Mandatory", desc: "Youth entrepreneurship in schools" },
    { country: "Israel", stat: "#1", desc: "Startups per capita globally" },
    { country: "Estonia", stat: "Age 6", desc: "Digital-first education begins" },
    { country: "China", stat: "200M", desc: "Students in AI education" },
  ];

  const ageContent = [
    { age: "Junior (9-11)", desc: "Fun, confidence-building projects with simple launches and first customers" },
    { age: "Teen (12-14)", desc: "Real validation, better prototypes, and revenue experiments" },
    { age: "Advanced (15-17)", desc: "Full launches, monetization, competition prep, and portfolio building" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="How It Works — The Complete Journey | NEXT_ Billion Lab"
        description="AI doesn't care where you were born. It cares what you can create. Discover how NEXT_ gives every child a fair chance at the biggest opportunity in human history."
        canonical="/how-it-works"
        keywords="how it works, AI education, equal opportunity, young entrepreneurs, certification"
      />
      <PublicHeader />

      {/* HERO: Equal Opportunity Message */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-background via-primary/5 to-background border-b border-border/50">
        <div className="container mx-auto px-6 text-center max-w-5xl">
          <Badge className="bg-primary/10 text-primary border-primary/30 mb-6 text-sm">
            THE MISSION
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
            AI doesn't care where you were born.
            <span className="block mt-3 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 bg-clip-text text-transparent">
              It cares what you can create.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
            We're giving every child a fair chance at the biggest opportunity in human history.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/signup')}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-lg px-8"
            >
              Start Free
              <ArrowRight className="ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/manifesto')}
              className="border-border text-foreground hover:bg-muted"
            >
              Read Our Manifesto
            </Button>
          </div>
        </div>
      </section>

      {/* THE 3-LEVEL CERTIFICATION PATH */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <Badge className="bg-primary/10 text-primary border-primary/30 mb-4">
            YOUR PATH TO NEXT_ CERTIFIED
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
            3 Levels. 3 Certificates.
            <span className="block mt-2 text-primary">1 Complete Journey.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each level builds on the last. Each certificate proves you can create.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {certifications.map((cert) => (
            <Link to={cert.path} key={cert.level}>
              <Card className="h-full glass-card hover:border-primary/50 transition-all hover:scale-[1.02] cursor-pointer group">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className={`bg-gradient-to-r ${cert.color} text-white border-0`}>
                      {cert.badge}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{cert.duration}</span>
                  </div>
                  <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                    {cert.name}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground mt-2">
                    {cert.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {cert.skills.map((skill, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        {skill}
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 text-primary font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* WHAT STUDENTS ACTUALLY DO */}
      <section className="bg-card border-y border-border/50">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <Badge className="bg-primary/10 text-primary border-primary/30 mb-4">
              THE 12-WEEK JOURNEY
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
              What Students Actually Do
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From problem discovery to product launch. Real products. Real customers. Real independence.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 max-w-5xl mx-auto mb-12">
            {phases.map((phase, i) => {
              const Icon = phase.icon;
              return (
                <div key={i} className="flex items-center gap-4 md:gap-2">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-2 border border-primary/30">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <div className="font-bold text-foreground">{phase.name}</div>
                    <div className="text-xs text-muted-foreground">{phase.weeks}</div>
                    <div className="text-xs text-primary mt-1">{phase.description}</div>
                  </div>
                  {i < phases.length - 1 && (
                    <ArrowRight className="w-6 h-6 text-muted-foreground hidden md:block" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Button 
              variant="outline" 
              onClick={() => navigate('/product-tour')}
              className="border-primary text-primary hover:bg-primary/10"
            >
              See Product Tour <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* THE TOOLS (CLICKABLE) */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <Badge className="bg-primary/10 text-primary border-primary/30 mb-4">
            TOOLS THAT MAKE YOU UNSTOPPABLE
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
            Not Just Lessons.
            <span className="block mt-2 text-primary">A Complete Founder Toolkit.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {tools.map((tool) => (
            <Link to={tool.path} key={tool.name}>
              <Card className="h-full glass-card hover:border-primary/50 transition-all hover:scale-[1.02] cursor-pointer group text-center">
                <CardContent className="pt-8 pb-6">
                  <div className="text-5xl mb-4">{tool.icon}</div>
                  <h3 className="font-bold text-foreground text-lg mb-2 group-hover:text-primary transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                  <div className="mt-4 text-primary font-semibold text-sm flex items-center justify-center gap-2 group-hover:gap-3 transition-all">
                    Explore <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* AGE-APPROPRIATE CONTENT (SECONDARY) */}
      <section className="bg-card border-y border-border/50">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
              Same Credentials. Age-Appropriate Content.
            </h2>
            <p className="text-muted-foreground mb-8">
              Every student can earn all 3 certificates. Content is adapted for each age group.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {ageContent.map((item, i) => (
                <Card key={i} className="glass-card">
                  <CardContent className="pt-6">
                    <Badge variant="outline" className="mb-3 border-primary/30 text-primary">
                      {item.age}
                    </Badge>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GLOBAL CONTEXT (SECONDARY) */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Other nations aren't waiting.
              <span className="block mt-1 text-primary">Your competition is already training.</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {globalRace.map((item, i) => (
              <Card key={i} className="glass-card">
                <CardContent className="p-6 text-center space-y-2">
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">{item.country}</div>
                  <div className="text-2xl md:text-3xl font-bold text-primary">{item.stat}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-background border-t border-border/50">
        <div className="container mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            Ready to start building?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Choose your path. Build real products. Become NEXT_ CERTIFIED.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/signup')}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-lg px-8"
            >
              AI FOUNDATIONS — FREE
            </Button>
            <Button 
              size="lg" 
              onClick={() => navigate('/ai-builder')}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-bold"
            >
              FULL FOUNDATION — $99/year
            </Button>
            <Button 
              size="lg" 
              onClick={() => navigate('/ai-launcher')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold"
            >
              ACCELERATOR — $290
            </Button>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};

export default HowItWorks;
