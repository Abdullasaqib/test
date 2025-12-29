import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MessageSquare, Lightbulb, Zap, Target, HelpCircle, Mic, FileText, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { SEOHead } from "@/components/seo/SEOHead";

const AICoachPage = () => {
  const navigate = useNavigate();

  const capabilities = [
    { icon: Lightbulb, title: "Brainstorming", description: "Generate ideas, explore possibilities, and find unique angles for your startup", color: "text-amber-400" },
    { icon: HelpCircle, title: "Problem Solving", description: "Work through blockers, debug issues, and find creative solutions", color: "text-blue-400" },
    { icon: Target, title: "Strategic Guidance", description: "Get feedback on your business model, pricing, and go-to-market strategy", color: "text-green-400" },
    { icon: Mic, title: "Pitch Prep", description: "Practice your pitch, refine your story, and prepare for tough questions", color: "text-purple-400" },
    { icon: FileText, title: "Content Creation", description: "Write landing page copy, social posts, and marketing materials", color: "text-pink-400" },
    { icon: Zap, title: "Unstuck Prompts", description: "When you don't know what to ask, get AI-generated prompts tailored to your stage", color: "text-orange-400" },
  ];

  const quickActions = [
    "I'm stuck on my mission",
    "Help me brainstorm ideas",
    "Prepare for THE TANK",
    "Review my pitch",
    "I need customer interview questions",
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="AI COACH — 24/7 AI Mentor for Young Founders"
        description="Get instant guidance, brainstorm ideas, solve problems, and prepare for Demo Day. Your AI mentor who never sleeps."
        canonical="/features/ai-coach"
      />
      <PublicHeader />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-[#0A0F1C] via-[#1a1a2e] to-[#0A0F1C]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-sm px-4 py-1">
              Exclusive Platform Feature
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white">
              AI <span className="text-blue-400">COACH</span>
            </h1>
            <p className="text-2xl md:text-3xl text-white/80 font-medium">
              A Mentor Who Never Sleeps
            </p>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Stuck at midnight? Need to brainstorm? Want feedback on your pitch? 
              Your AI Coach is always ready to help—no scheduling required.
            </p>
            <Button 
              size="lg"
              onClick={() => navigate('/ai-foundations')}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-bold text-lg px-8 py-6 h-auto"
            >
              Start Chatting <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* What It Can Do */}
      <section className="py-20 bg-card border-y border-border/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              What Your Coach Can Do
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Trained on founder best practices, startup methodology, and your curriculum.
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

      {/* Inside the Platform - Mock-ups */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Inside AI COACH
            </h2>
            <p className="text-muted-foreground text-lg">
              See exactly what chatting with your coach looks like
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Chat Interface Mock-up */}
            <Card className="bg-[#0d1117] border-border/50 overflow-hidden md:col-span-2">
              <div className="bg-[#161b22] px-4 py-2 flex items-center gap-2 border-b border-border/30">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-white/50 text-xs ml-2">AI Coach — Week 4: Customer Validation</span>
              </div>
              <CardContent className="p-6 space-y-4">
                {/* Coach message */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 bg-white/5 rounded-xl rounded-tl-none p-4 border border-white/10">
                    <p className="text-white text-sm">
                      I see you're working on customer interviews this week! 🎯 Here are 3 questions 
                      that will help you understand if people actually have the problem you're solving:
                    </p>
                    <ul className="text-white/80 text-sm mt-3 space-y-2 ml-4 list-disc">
                      <li>"Walk me through the last time you experienced [problem]..."</li>
                      <li>"What have you tried to solve this? What didn't work?"</li>
                      <li>"If you could wave a magic wand, what would the perfect solution look like?"</li>
                    </ul>
                  </div>
                </div>

                {/* User message */}
                <div className="flex items-start gap-3 justify-end">
                  <div className="flex-1 max-w-[80%] bg-blue-500/20 rounded-xl rounded-tr-none p-4 border border-blue-500/30">
                    <p className="text-white text-sm">
                      Thanks! But what if they say they don't have the problem at all?
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-white font-bold">
                    S
                  </div>
                </div>

                {/* Coach response */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 bg-white/5 rounded-xl rounded-tl-none p-4 border border-white/10">
                    <p className="text-white text-sm">
                      Great question! That's actually valuable data. It means either:
                    </p>
                    <ul className="text-white/80 text-sm mt-2 space-y-1 ml-4 list-decimal">
                      <li>You're talking to the wrong audience</li>
                      <li>The problem exists but they describe it differently</li>
                      <li>The problem isn't painful enough to solve</li>
                    </ul>
                    <p className="text-white text-sm mt-2">
                      Try asking: "What's the most frustrating part of [related activity]?" and listen 
                      for pain points. Want me to help you reframe your interview questions?
                    </p>
                  </div>
                </div>

                {/* Input area */}
                <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                  <input 
                    type="text" 
                    placeholder="Ask your coach anything..." 
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                  <Button size="icon" className="bg-blue-500 hover:bg-blue-600 h-12 w-12">
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions Mock-up */}
            <Card className="bg-[#0d1117] border-border/50 overflow-hidden">
              <div className="bg-[#161b22] px-4 py-2 flex items-center gap-2 border-b border-border/30">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-white/50 text-xs ml-2">Quick Actions</span>
              </div>
              <CardContent className="p-6">
                <p className="text-white/60 text-sm mb-4">Not sure what to ask? Start here:</p>
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action, i) => (
                    <Button 
                      key={i} 
                      variant="outline" 
                      size="sm"
                      className="bg-white/5 border-white/20 text-white/80 hover:bg-white/10 hover:text-white text-xs"
                    >
                      {action}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Week-Aware Mock-up */}
            <Card className="bg-[#0d1117] border-border/50 overflow-hidden">
              <div className="bg-[#161b22] px-4 py-2 flex items-center gap-2 border-b border-border/30">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-white/50 text-xs ml-2">Context-Aware</span>
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">Week 4</Badge>
                    <span className="text-white/60 text-xs">Customer Validation</span>
                  </div>
                  <p className="text-white text-sm">
                    Your coach knows exactly where you are in your journey and tailors advice to your current mission.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-white/60 text-xs">Suggested prompts for this week:</p>
                  <div className="space-y-1">
                    {[
                      "How do I find people to interview?",
                      "What makes a good customer interview?",
                      "Help me analyze my interview notes",
                    ].map((prompt, i) => (
                      <div key={i} className="flex items-center gap-2 text-white/80 text-sm">
                        <Lightbulb className="w-3 h-3 text-amber-400" />
                        <span>{prompt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Always Available */}
      <section className="py-20 bg-card border-y border-border/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              Stuck at 2am? Your coach is awake.
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { time: "24/7", label: "Available anytime", description: "No scheduling, no waiting" },
                { time: "∞", label: "Unlimited questions", description: "Ask as much as you need" },
                { time: "<1s", label: "Instant responses", description: "No delays, no loading" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl font-bold text-blue-400">{stat.time}</div>
                  <div className="text-foreground font-medium mt-2">{stat.label}</div>
                  <div className="text-muted-foreground text-sm mt-1">{stat.description}</div>
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
            <MessageSquare className="w-16 h-16 text-blue-400 mx-auto" />
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Ready for unlimited coaching?
            </h2>
            <p className="text-white/60 text-lg">
              FULL FOUNDATION and ACCELERATOR include 50+ AI Coach messages daily.
            </p>
            <Button 
              size="lg"
              onClick={() => navigate('/ai-builder')}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-bold text-lg px-10 py-6 h-auto"
            >
              Get AI Coach <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};

export default AICoachPage;
