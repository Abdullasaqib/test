import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Mic, Play, Star, Target, TrendingUp, MessageSquare, Award, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { SEOHead } from "@/components/seo/SEOHead";

const TheTankPage = () => {
  const navigate = useNavigate();

  const investors = [
    { name: "The Mentor", emoji: "👨‍🏫", style: "Supportive", tagline: "Let's build this together", difficulty: "Beginner", color: "text-green-400" },
    { name: "The Shark", emoji: "🦈", style: "Aggressive", tagline: "Show me the money", difficulty: "Hard", color: "text-red-400" },
    { name: "The Skeptic", emoji: "🤔", style: "Analytical", tagline: "Prove it with data", difficulty: "Medium", color: "text-blue-400" },
    { name: "The Visionary", emoji: "🔮", style: "Big Picture", tagline: "Think bigger", difficulty: "Medium", color: "text-purple-400" },
    { name: "The Operator", emoji: "⚙️", style: "Practical", tagline: "How does this scale?", difficulty: "Hard", color: "text-amber-400" },
  ];

  const steps = [
    { icon: Target, title: "Choose Your Investor", description: "Each persona has a unique style and difficulty level" },
    { icon: Mic, title: "Record Your Pitch", description: "60 seconds to convince them your idea is worth funding" },
    { icon: Star, title: "Get Scored", description: "AI evaluates clarity, confidence, market potential, and more" },
    { icon: MessageSquare, title: "Answer Q&A", description: "Handle tough investor questions in real-time" },
    { icon: TrendingUp, title: "Level Up", description: "Earn XP, unlock higher levels, and track your growth" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="THE TANK — AI Pitch Practice for Young Founders"
        description="Practice pitching to 5 AI investor personas. Build confidence. Get scored. Level up. Prepare for Demo Day."
        canonical="/features/the-tank"
      />
      <PublicHeader />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-[#0A0F1C] via-[#1a1a2e] to-[#0A0F1C]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-sm px-4 py-1">
              Exclusive Platform Feature
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white">
              THE <span className="text-amber-400">TANK</span>
            </h1>
            <p className="text-2xl md:text-3xl text-white/80 font-medium">
              Where Founders Are Forged
            </p>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Think Shark Tank, but AI-powered. Practice your pitch. Face tough questions. 
              Build the confidence you need before Demo Day.
            </p>
            <Button 
              size="lg"
              onClick={() => navigate('/ai-foundations')}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-lg px-8 py-6 h-auto"
            >
              Start Pitching <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* The 5 Investors */}
      <section className="py-20 bg-card border-y border-border/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Meet Your Investors
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              5 unique personas. 5 different challenges. Master them all.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {investors.map((investor, index) => (
              <Card key={index} className="glass-card border-border/50 hover:scale-105 transition-all duration-300 text-center">
                <CardContent className="p-6 space-y-3">
                  <div className="text-5xl">{investor.emoji}</div>
                  <h3 className={`text-lg font-bold ${investor.color}`}>{investor.name}</h3>
                  <p className="text-foreground text-sm font-medium">{investor.style}</p>
                  <p className="text-muted-foreground text-xs italic">"{investor.tagline}"</p>
                  <Badge variant="outline" className="text-xs">
                    {investor.difficulty}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Inside the Platform - Mock-ups */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Inside THE TANK
            </h2>
            <p className="text-muted-foreground text-lg">
              See exactly what you'll experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Investor Selection Mock-up */}
            <Card className="bg-[#0d1117] border-border/50 overflow-hidden">
              <div className="bg-[#161b22] px-4 py-2 flex items-center gap-2 border-b border-border/30">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-white/50 text-xs ml-2">Choose Your Investor</span>
              </div>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <p className="text-white/80 text-sm mb-4">Who will you pitch to today?</p>
                  {investors.slice(0, 3).map((inv, i) => (
                    <div key={i} className={`flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 ${i === 0 ? 'ring-2 ring-amber-500' : ''}`}>
                      <span className="text-2xl">{inv.emoji}</span>
                      <div className="flex-1">
                        <p className="text-white font-medium text-sm">{inv.name}</p>
                        <p className="text-white/50 text-xs">{inv.style}</p>
                      </div>
                      <Badge className="bg-white/10 text-white/60 text-xs">{inv.difficulty}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pitch Recording Mock-up */}
            <Card className="bg-[#0d1117] border-border/50 overflow-hidden">
              <div className="bg-[#161b22] px-4 py-2 flex items-center gap-2 border-b border-border/30">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-white/50 text-xs ml-2">Record Your Pitch</span>
              </div>
              <CardContent className="p-6 text-center space-y-4">
                <div className="text-6xl">👨‍🏫</div>
                <p className="text-white font-medium">The Mentor is listening...</p>
                <div className="w-24 h-24 mx-auto rounded-full bg-red-500/20 border-4 border-red-500 flex items-center justify-center animate-pulse">
                  <Mic className="w-10 h-10 text-red-500" />
                </div>
                <div className="flex items-center justify-center gap-2 text-white/60">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-sm">Recording... 0:34 / 1:00</span>
                </div>
                <p className="text-white/50 text-xs">Tip: Focus on the problem you're solving</p>
              </CardContent>
            </Card>

            {/* Score Breakdown Mock-up */}
            <Card className="bg-[#0d1117] border-border/50 overflow-hidden">
              <div className="bg-[#161b22] px-4 py-2 flex items-center gap-2 border-b border-border/30">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-white/50 text-xs ml-2">Your Score</span>
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="text-center">
                  <div className="text-5xl font-bold text-amber-400">78</div>
                  <p className="text-white/60 text-sm">Overall Score</p>
                </div>
                <div className="space-y-2">
                  {[
                    { label: 'Clarity', score: 85, color: 'bg-green-500' },
                    { label: 'Confidence', score: 72, color: 'bg-amber-500' },
                    { label: 'Market Potential', score: 80, color: 'bg-blue-500' },
                    { label: 'Storytelling', score: 75, color: 'bg-purple-500' },
                  ].map((item, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-white/80">{item.label}</span>
                        <span className="text-white/60">{item.score}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.score}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Q&A Session Mock-up */}
            <Card className="bg-[#0d1117] border-border/50 overflow-hidden">
              <div className="bg-[#161b22] px-4 py-2 flex items-center gap-2 border-b border-border/30">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-white/50 text-xs ml-2">Investor Q&A</span>
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">👨‍🏫</span>
                  <div className="flex-1 bg-white/5 rounded-lg p-3 border border-white/10">
                    <p className="text-white text-sm">"Interesting idea! But how will you get your first 100 users?"</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 justify-end">
                  <div className="flex-1 bg-amber-500/20 rounded-lg p-3 border border-amber-500/30">
                    <p className="text-white text-sm">"Great question! I'm starting with my school's..."</p>
                    <div className="w-2 h-4 bg-white/80 animate-pulse inline-block ml-1" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">Y</div>
                </div>
                <p className="text-white/50 text-xs text-center">Answer thoughtfully — investors remember good responses</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-card border-y border-border/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              How THE TANK Works
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex items-center">
                  <div className="text-center max-w-[150px]">
                    <div className="w-14 h-14 mx-auto mb-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center">
                      <Icon className="w-7 h-7 text-amber-400" />
                    </div>
                    <h3 className="text-foreground font-bold text-sm">{step.title}</h3>
                    <p className="text-muted-foreground text-xs mt-1">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <ChevronRight className="w-5 h-5 text-muted-foreground mx-2 hidden md:block" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#0A0F1C] via-[#1a1a2e] to-[#0A0F1C]">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <Award className="w-16 h-16 text-amber-400 mx-auto" />
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Ready to face the investors?
            </h2>
            <p className="text-white/60 text-lg">
              THE TANK is included in all tiers. Start practicing today.
            </p>
            <Button 
              size="lg"
              onClick={() => navigate('/ai-foundations')}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-lg px-10 py-6 h-auto"
            >
              Enter THE TANK <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};

export default TheTankPage;
