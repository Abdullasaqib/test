import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Award, Clock, BookOpen, MessageCircle, Target, Sparkles, Users, BarChart3, Check, Rocket, FileText, Lightbulb, Send, TrendingUp, ArrowRight, ChevronRight, Zap, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SEOHead } from "@/components/seo";
import { PublicHeader, PublicFooter } from "@/components/layout";
import { TeacherSupportSection, LiveWebinarsSection, MasterclassSchedule, CommunityPromiseSection } from "@/components/schools";
import { useStudent } from "@/hooks/useStudent";

const FullFoundation = () => {
  const navigate = useNavigate();
  const { student } = useStudent();
  const [selectedAge, setSelectedAge] = useState<string>(
    student?.age && student.age >= 9 && student.age <= 17 ? String(student.age) : ""
  );

  const handleGetStarted = () => {
    navigate(`/checkout?tier=yearly-founder&age=${selectedAge}`);
  };

  const certificates = [
    { name: "AI Foundations Certificate" },
    { name: "AI Builder Certificate" },
  ];

  const capabilities = [
    { icon: Award, title: "Both Certificates", description: "AI Foundations + AI Builder credentials", color: "text-yellow-400" },
    { icon: BookOpen, title: "60 Missions", description: "Complete curriculum from idea to launch", color: "text-blue-400" },
    { icon: MessageCircle, title: "50 Coach Messages", description: "Daily AI mentor access", color: "text-green-400" },
    { icon: Target, title: "Unlimited TANK", description: "Practice pitching without limits", color: "text-purple-400" },
    { icon: Sparkles, title: "FOUNDER DNA", description: "Discover your unique founder archetype", color: "text-pink-400" },
    { icon: BarChart3, title: "Skills Intelligence", description: "Track your growth with analytics", color: "text-amber-400" },
  ];

  const phases = [
    { name: "DISCOVER", icon: Lightbulb },
    { name: "VALIDATE", icon: Users },
    { name: "BUILD", icon: Rocket },
    { name: "LAUNCH", icon: Zap },
    { name: "PITCH", icon: Target },
  ];

  const personas = [
    "Students ready to build their first product",
    "Future founders who want the complete journey",
    "Anyone serious about launching something real",
  ];

  return (
    <>
      <SEOHead
        title="AI Builder Certificate - Full Foundation | NEXT_ Billion Lab"
        description="The complete 12-week curriculum. Build real products. Earn real credentials."
      />
      <div className="min-h-screen bg-background">
        <PublicHeader />

        {/* Hero - Dramatic Gradient */}
        <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-[#0A0F1C] via-[#1a1a2e] to-[#0A0F1C]">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="flex items-center justify-center gap-2">
                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-sm px-4 py-1">
                  FULL FOUNDATION
                </Badge>
                <Badge className="bg-yellow-500 text-black text-sm px-3 py-1">
                  MOST POPULAR
                </Badge>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white">
                Build real products.{" "}
                <span className="text-yellow-400">Earn real credentials.</span>
              </h1>
              <p className="text-2xl md:text-3xl text-white/80 font-medium">
                The Complete 12-Week Curriculum
              </p>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                Curriculum developed in partnership with <span className="text-yellow-400 font-semibold">Base44</span>. PLAN + PROMPT modules teach you to build real products from idea to launch.
              </p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-5xl font-bold text-yellow-400">$99</span>
                <span className="text-white/60">/year</span>
              </div>
              <p className="text-white/50 text-sm">or $29/month</p>
              <Button 
                size="lg"
                onClick={() => document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold text-lg px-8 py-6 h-auto"
              >
                Start Building <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Certificate Badges */}
        <section className="py-8 bg-card/30 border-b border-border/50">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {certificates.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 bg-card/50 border border-border/50 rounded-full"
                >
                  <Award className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-medium">{cert.name}</span>
                  <Check className="w-4 h-4 text-green-400" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What You'll Master - 6 Card Grid */}
        <section className="py-20 bg-card border-y border-border/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                What You'll Master
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Everything you need to go from idea to launch.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {capabilities.map((cap, index) => {
                const Icon = cap.icon;
                return (
                  <Card key={index} className="glass-card border-border/50 hover:scale-105 transition-all duration-300">
                    <CardContent className="p-6 space-y-3">
                      <Icon className={`w-10 h-10 ${cap.color}`} />
                      <h3 className="text-foreground font-bold text-lg">{cap.title}</h3>
                      <p className="text-muted-foreground text-sm">{cap.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                {[
                  { value: "60", label: "Missions", desc: "Complete curriculum" },
                  { value: "12", label: "Weeks", desc: "Structured journey" },
                  { value: "50", label: "Coach Messages", desc: "Daily AI guidance" },
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-5xl font-bold text-yellow-400">{stat.value}</div>
                    <div className="text-foreground font-medium mt-2">{stat.label}</div>
                    <div className="text-muted-foreground text-sm mt-1">{stat.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Inside the Platform - Mockups */}
        <section className="py-20 bg-card/30 border-y border-border/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Inside the Platform
              </h2>
              <p className="text-muted-foreground text-lg">
                See exactly what you'll experience as a student
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {/* Mission Dashboard Mockup */}
              <Card className="bg-[#0d1117] border-border/50 overflow-hidden md:col-span-2">
                <div className="bg-[#161b22] px-4 py-2 flex items-center gap-2 border-b border-border/30">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-white/50 text-xs ml-2">Dashboard — Week 5 of 12</span>
                </div>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-3">
                        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">BUILD Phase</Badge>
                        <span className="text-white/40 text-sm">Mission 25 of 60</span>
                      </div>
                      <h3 className="text-xl font-bold text-white">Today's Mission</h3>
                      <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-start gap-3">
                          <Rocket className="w-5 h-5 text-yellow-400 mt-0.5" />
                          <div>
                            <h4 className="text-white font-medium">Create Your Landing Page</h4>
                            <p className="text-white/60 text-sm mt-1">
                              Use AI to build a landing page that captures emails from potential customers.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-white/60">Week 5 Progress</span>
                          <span className="text-yellow-400">3/5 missions</span>
                        </div>
                        <Progress value={60} className="h-2 bg-white/10" />
                      </div>
                    </div>
                    <div className="w-full md:w-64 space-y-3">
                      <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-green-400" />
                          <span className="text-white/80 text-sm font-medium">Your Stats</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-center">
                          <div className="p-2 bg-white/5 rounded">
                            <div className="text-lg font-bold text-yellow-400">24</div>
                            <div className="text-xs text-white/40">Missions Done</div>
                          </div>
                          <div className="p-2 bg-white/5 rounded">
                            <div className="text-lg font-bold text-green-400">1,450</div>
                            <div className="text-xs text-white/40">XP Earned</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Artifacts Showcase Mockup */}
              <Card className="bg-[#0d1117] border-border/50 overflow-hidden">
                <div className="bg-[#161b22] px-4 py-2 flex items-center gap-2 border-b border-border/30">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-white/50 text-xs ml-2">My Artifacts</span>
                </div>
                <CardContent className="p-4 space-y-3">
                  <h4 className="text-white font-semibold">Your Portfolio</h4>
                  <p className="text-white/60 text-sm">Real artifacts you'll create:</p>
                  <div className="space-y-2">
                    {[
                      { name: "Business Model Canvas", status: "Complete", icon: FileText },
                      { name: "Customer Persona Card", status: "Complete", icon: Users },
                      { name: "Landing Page", status: "In Progress", icon: Rocket },
                      { name: "Pitch Deck", status: "Locked", icon: Target },
                    ].map((artifact, i) => (
                      <div key={i} className="flex items-center gap-3 p-2 bg-white/5 rounded border border-white/10">
                        <artifact.icon className="w-4 h-4 text-yellow-400" />
                        <span className="text-white/80 text-sm flex-1">{artifact.name}</span>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            artifact.status === 'Complete' ? 'text-green-400 border-green-400/30' :
                            artifact.status === 'In Progress' ? 'text-yellow-400 border-yellow-400/30' :
                            'text-white/40 border-white/20'
                          }`}
                        >
                          {artifact.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* AI Coach Week-Aware Mockup */}
              <Card className="bg-[#0d1117] border-border/50 overflow-hidden">
                <div className="bg-[#161b22] px-4 py-2 flex items-center gap-2 border-b border-border/30">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-white/50 text-xs ml-2">AI Coach — Week 5: BUILD</span>
                </div>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 bg-white/5 rounded-lg rounded-tl-none p-3 border border-white/10">
                      <p className="text-white text-sm">
                        I see you're building your landing page! 🚀 Here's a tip: Focus on ONE clear value proposition above the fold.
                      </p>
                    </div>
                  </div>
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="w-4 h-4 text-yellow-400" />
                      <span className="text-white/80 text-sm font-medium">Week 5 Suggestions</span>
                    </div>
                    <div className="space-y-1">
                      {["Review landing page best practices", "Get feedback on your headline", "Set up email capture"].map((s, i) => (
                        <div key={i} className="flex items-center gap-2 text-white/60 text-xs">
                          <div className="w-1 h-1 rounded-full bg-yellow-400" />
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                    <input 
                      type="text" 
                      placeholder="Ask about your mission..." 
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-white/40 text-sm focus:outline-none"
                    />
                    <Button size="icon" className="bg-yellow-500 hover:bg-yellow-600 h-9 w-9">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* The 12-Week Journey - Horizontal Flow */}
        <section className="py-20 bg-card border-y border-border/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                The 12-Week Journey
              </h2>
              <p className="text-muted-foreground text-lg">
                5 phases. From idea to investor-ready pitch.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
              {phases.map((phase, index) => {
                const Icon = phase.icon;
                return (
                  <div key={index} className="flex items-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl flex items-center justify-center">
                        <Icon className="w-8 h-8 text-yellow-400" />
                      </div>
                      <h3 className="text-foreground font-bold text-sm">{phase.name}</h3>
                    </div>
                    {index < phases.length - 1 && (
                      <ChevronRight className="w-6 h-6 text-muted-foreground mx-3 hidden md:block" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Live Webinars Section */}
        <LiveWebinarsSection variant="yellow" />

        {/* Masterclass Schedule */}
        <MasterclassSchedule variant="yellow" />

        {/* Community Promise Section */}
        <CommunityPromiseSection variant="yellow" />

        {/* Who This Is For */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Who This Is For</h2>
              <div className="space-y-3">
                {personas.map((persona, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-card/30 border border-border/30 rounded-lg"
                  >
                    <Check className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                    <span className="text-muted-foreground">{persona}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Gradient */}
        <section id="cta-section" className="py-24 bg-gradient-to-br from-[#0A0F1C] via-[#1a1a2e] to-[#0A0F1C]">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-md mx-auto space-y-6">
              <Rocket className="w-16 h-16 text-yellow-400 mx-auto" />
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                Ready to build?
              </h2>
              <p className="text-white/60 text-lg">
                12 weeks. 60 missions. 2 certificates.
              </p>
              
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                <Select value={selectedAge} onValueChange={setSelectedAge}>
                  <SelectTrigger className="w-full bg-white/5 border-white/20 text-white">
                    <SelectValue placeholder="Select your age" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 9 }, (_, i) => i + 9).map((age) => (
                      <SelectItem key={age} value={String(age)}>
                        {age} years old
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button
                  onClick={handleGetStarted}
                  disabled={!selectedAge}
                  size="lg"
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold text-lg py-6 h-auto"
                >
                  Start for $99/year <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <p className="text-white/40 text-sm">
                  or $29/month • Cancel anytime
                </p>
              </div>
              
              <p className="text-white/50 text-sm pt-4">
                Want live mentorship?{" "}
                <a href="/ai-launcher" className="text-yellow-400 hover:underline">
                  See Accelerator →
                </a>
              </p>
            </div>
          </div>
        </section>

        <PublicFooter />
      </div>
    </>
  );
};

export default FullFoundation;