import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Dna, Palette, BarChart3, Rocket, Hammer, Target, Sparkles, Zap, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { SEOHead } from "@/components/seo/SEOHead";

const FounderDNAPage = () => {
  const navigate = useNavigate();

  const archetypes = [
    { 
      name: "The Creative", 
      icon: Palette, 
      color: "text-purple-400", 
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      description: "You see possibilities others miss. Design and storytelling are your superpowers.",
      strengths: ["Visual thinking", "Brand building", "User experience"]
    },
    { 
      name: "The Analyst", 
      icon: BarChart3, 
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      description: "Data drives your decisions. You find patterns and optimize everything.",
      strengths: ["Data analysis", "Problem solving", "Strategy"]
    },
    { 
      name: "The Hustler", 
      icon: Rocket, 
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
      description: "Speed is your advantage. You ship fast and learn faster.",
      strengths: ["Sales", "Networking", "Execution speed"]
    },
    { 
      name: "The Builder", 
      icon: Hammer, 
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      description: "You love making things work. Technical challenges excite you.",
      strengths: ["Technical skills", "System design", "Persistence"]
    },
    { 
      name: "The Strategist", 
      icon: Target, 
      color: "text-indigo-400",
      bgColor: "bg-indigo-500/10",
      borderColor: "border-indigo-500/30",
      description: "You think three steps ahead. Planning and positioning are natural.",
      strengths: ["Long-term thinking", "Market analysis", "Leadership"]
    },
  ];

  const roles = [
    { name: "CEO", percent: 85, color: "bg-purple-500" },
    { name: "CTO", percent: 45, color: "bg-blue-500" },
    { name: "CMO", percent: 72, color: "bg-amber-500" },
    { name: "COO", percent: 38, color: "bg-green-500" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="FOUNDER DNA — Discover Your Founder Archetype"
        description="Discover your unique founder archetype. Understand your superpowers and growth edges. Build self-awareness to make better decisions."
        canonical="/features/founder-dna"
      />
      <PublicHeader />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-[#0A0F1C] via-[#1a1a2e] to-[#0A0F1C]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-sm px-4 py-1">
              Exclusive Platform Feature
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white">
              FOUNDER <span className="text-purple-400">DNA</span>
            </h1>
            <p className="text-2xl md:text-3xl text-white/80 font-medium">
              Discover Who You Are
            </p>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Every great founder knows their strengths. Discover your archetype, 
              understand your superpowers, and build on what makes you unique.
            </p>
            <Button 
              size="lg"
              onClick={() => navigate('/ai-foundations')}
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white font-bold text-lg px-8 py-6 h-auto"
            >
              Discover Your DNA <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* The 5 Archetypes */}
      <section className="py-20 bg-card border-y border-border/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              The 5 Founder Archetypes
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Which one are you? Complete missions to unlock your profile.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {archetypes.map((archetype, index) => {
              const Icon = archetype.icon;
              return (
                <Card key={index} className={`glass-card ${archetype.borderColor} hover:scale-105 transition-all duration-300`}>
                  <CardContent className="p-5 space-y-3 text-center">
                    <div className={`w-14 h-14 mx-auto rounded-xl ${archetype.bgColor} flex items-center justify-center`}>
                      <Icon className={`w-7 h-7 ${archetype.color}`} />
                    </div>
                    <h3 className={`text-lg font-bold ${archetype.color}`}>{archetype.name}</h3>
                    <p className="text-muted-foreground text-xs">{archetype.description}</p>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {archetype.strengths.map((s, i) => (
                        <Badge key={i} variant="outline" className="text-xs border-border/50">
                          {s}
                        </Badge>
                      ))}
                    </div>
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
              Inside FOUNDER DNA
            </h2>
            <p className="text-muted-foreground text-lg">
              See exactly what you'll discover
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Founder Type Card Mock-up */}
            <Card className="bg-[#0d1117] border-border/50 overflow-hidden">
              <div className="bg-[#161b22] px-4 py-2 flex items-center gap-2 border-b border-border/30">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-white/50 text-xs ml-2">Your Founder Type</span>
              </div>
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Palette className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">The Creative</h3>
                  <p className="text-white/60 text-sm mt-1">Your dominant archetype based on 24 completed missions</p>
                </div>
                <p className="text-white/80 text-sm italic">
                  "You see possibilities others miss. Your unique perspective and design thinking 
                  make you naturally gifted at creating memorable experiences."
                </p>
              </CardContent>
            </Card>

            {/* Superpowers Mock-up */}
            <Card className="bg-[#0d1117] border-border/50 overflow-hidden">
              <div className="bg-[#161b22] px-4 py-2 flex items-center gap-2 border-b border-border/30">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-white/50 text-xs ml-2">Your Superpowers</span>
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Sparkles, label: "Visual Storytelling", color: "text-purple-400" },
                    { icon: Zap, label: "Rapid Ideation", color: "text-amber-400" },
                    { icon: Star, label: "User Empathy", color: "text-blue-400" },
                  ].map((power, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10">
                      <power.icon className={`w-5 h-5 ${power.color}`} />
                      <span className="text-white text-sm">{power.label}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/10 pt-4">
                  <p className="text-white/60 text-xs mb-2">Growth Opportunities</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30 text-xs">Data Analysis</Badge>
                    <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30 text-xs">Technical Depth</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* DNA Radar Chart Mock-up */}
            <Card className="bg-[#0d1117] border-border/50 overflow-hidden">
              <div className="bg-[#161b22] px-4 py-2 flex items-center gap-2 border-b border-border/30">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-white/50 text-xs ml-2">Skills Radar</span>
              </div>
              <CardContent className="p-6">
                <div className="relative w-48 h-48 mx-auto">
                  {/* Simple radar visualization */}
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    {/* Background hexagon */}
                    <polygon points="100,20 170,55 170,125 100,160 30,125 30,55" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    <polygon points="100,40 150,65 150,115 100,140 50,115 50,65" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    <polygon points="100,60 130,75 130,105 100,120 70,105 70,75" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    {/* Data polygon */}
                    <polygon points="100,30 155,60 140,120 100,145 55,110 45,60" fill="rgba(168,85,247,0.2)" stroke="rgba(168,85,247,0.8)" strokeWidth="2" />
                    {/* Labels */}
                    <text x="100" y="12" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10">Design</text>
                    <text x="180" y="55" textAnchor="start" fill="rgba(255,255,255,0.6)" fontSize="10">Strategy</text>
                    <text x="180" y="130" textAnchor="start" fill="rgba(255,255,255,0.6)" fontSize="10">Tech</text>
                    <text x="100" y="180" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10">Sales</text>
                    <text x="20" y="130" textAnchor="end" fill="rgba(255,255,255,0.6)" fontSize="10">Ops</text>
                    <text x="20" y="55" textAnchor="end" fill="rgba(255,255,255,0.6)" fontSize="10">Marketing</text>
                  </svg>
                </div>
              </CardContent>
            </Card>

            {/* Role Fit Mock-up */}
            <Card className="bg-[#0d1117] border-border/50 overflow-hidden">
              <div className="bg-[#161b22] px-4 py-2 flex items-center gap-2 border-b border-border/30">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-white/50 text-xs ml-2">Role Fit Analysis</span>
              </div>
              <CardContent className="p-6 space-y-4">
                <p className="text-white/60 text-sm">Your natural fit for startup roles:</p>
                <div className="space-y-3">
                  {roles.map((role, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-white font-medium">{role.name}</span>
                        <span className="text-white/60">{role.percent}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className={`h-full ${role.color} rounded-full`} style={{ width: `${role.percent}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                  <p className="text-purple-400 text-sm font-medium">Best Match: CEO / CMO</p>
                  <p className="text-white/60 text-xs mt-1">Your creative vision and communication skills shine in leadership roles</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-20 bg-card border-y border-border/50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              Why Self-Awareness Matters
            </h2>
            <p className="text-muted-foreground text-lg">
              The best founders know themselves. They double down on strengths, 
              find co-founders who complement their weaknesses, and make decisions 
              aligned with their natural abilities.
            </p>
            <div className="grid md:grid-cols-3 gap-6 pt-8">
              {[
                { title: "Better Decisions", description: "Know when to lead and when to delegate" },
                { title: "Stronger Teams", description: "Find co-founders who complement your skills" },
                { title: "Faster Growth", description: "Focus on what you're naturally great at" },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <h3 className="text-foreground font-bold text-lg">{item.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#0A0F1C] via-[#1a1a2e] to-[#0A0F1C]">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <Dna className="w-16 h-16 text-purple-400 mx-auto" />
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Ready to discover your superpowers?
            </h2>
            <p className="text-white/60 text-lg">
              FOUNDER DNA unlocks as you complete missions. Start today.
            </p>
            <Button 
              size="lg"
              onClick={() => navigate('/ai-foundations')}
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white font-bold text-lg px-10 py-6 h-auto"
            >
              Discover Your DNA <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};

export default FounderDNAPage;
