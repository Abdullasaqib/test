import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Award, Clock, BookOpen, MessageCircle, Target, Sparkles, Users, Video, Calendar, Check, Play, FileText, Timer, Star, ArrowRight, ChevronRight, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SEOHead } from "@/components/seo";
import { PublicHeader, PublicFooter } from "@/components/layout";
import { TeacherSupportSection, LiveWebinarsSection, MasterclassSchedule, CommunityPromiseSection } from "@/components/schools";
import { useStudent } from "@/hooks/useStudent";
import { cn } from "@/lib/utils";
import melanieLo from "@/assets/mentors/melanie-lo.jpeg";

const Accelerator = () => {
  const navigate = useNavigate();
  const { student } = useStudent();
  const [selectedAge, setSelectedAge] = useState<string>(
    student?.age && student.age >= 12 && student.age <= 18 ? String(student.age) : ""
  );

  const handleGetStarted = () => {
    navigate(`/checkout?tier=live-cohort&age=${selectedAge}`);
  };

  const certificates = [
    { name: "AI Foundations Certificate" },
    { name: "AI Builder Certificate" },
    { name: "AI Launcher Certificate" },
  ];

  const capabilities = [
    { icon: Video, title: "Live Sessions", description: "12 weeks of live group classes with mentor", color: "text-emerald-400" },
    { icon: Users, title: "Dedicated Mentor", description: "Personal guidance throughout your journey", color: "text-blue-400" },
    { icon: Target, title: "Demo Day", description: "Present to real investors on pitch day", color: "text-purple-400" },
    { icon: Award, title: "3 Certificates", description: "Foundations + Builder + Launcher credentials", color: "text-yellow-400" },
    { icon: MessageCircle, title: "Unlimited Coach", description: "No daily limits on AI mentor access", color: "text-green-400" },
    { icon: Sparkles, title: "Priority Support", description: "First in line for help and feedback", color: "text-pink-400" },
  ];

  const detailedSchedule = [
    {
      weekend: "Weekend 1",
      title: "Your Idea, Validated",
      dates: "Feb 21-22, 2026",
      sessions: [
        { day: "Saturday", time: "10:30am ET", topic: "Find Your Problem + Customer Discovery", deliverable: "Problem statement defined" },
        { day: "Sunday", time: "10:30am ET", topic: "Build Your First MVP with AI", deliverable: "Working prototype started" },
      ],
      homework: "Interview 5 potential users this week",
    },
    {
      weekend: "Weekend 2",
      title: "Your Product, Polished",
      dates: "Feb 28 - Mar 1, 2026",
      sessions: [
        { day: "Saturday", time: "10:30am ET", topic: "Make It Beautiful + User Experience", deliverable: "Polished UI complete" },
        { day: "Sunday", time: "10:30am ET", topic: "Get Your First Users + Feedback Loops", deliverable: "Real user feedback collected" },
      ],
      homework: "Get 10 people to try your product",
    },
    {
      weekend: "Weekend 3",
      title: "Your Pitch, Perfected",
      dates: "March 7, 2026",
      sessions: [
        { day: "Saturday", time: "10:30am ET", topic: "DEMO DAY — Pitch to Real Investors", deliverable: "Live pitch to investor panel" },
      ],
      homework: null,
      isPitchDay: true,
    },
  ];

  const personas = [
    "Students ready to pitch to real investors",
    "Founders who want dedicated mentorship",
    "Anyone who learns best with live guidance",
  ];

  return (
    <>
      <SEOHead
        title="AI Launcher Certificate - Accelerator | NEXT_ Billion Lab"
        description="Launch with mentors. Pitch to real investors. 3 weekends, Demo Day, dedicated mentor."
      />
      <div className="min-h-screen bg-background">
        <PublicHeader />

        {/* Hero - Dramatic Gradient */}
        <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-[#0A0F1C] via-[#1a1a2e] to-[#0A0F1C]">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="flex items-center justify-center gap-2">
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-sm px-4 py-1">
                  ACCELERATOR
                </Badge>
                <Badge className="bg-emerald-500 text-black text-sm px-3 py-1">
                  LAUNCH WITH MENTORS
                </Badge>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white">
                Launch with mentors.{" "}
                <span className="text-emerald-400">Pitch to real investors.</span>
              </h1>
              <p className="text-2xl md:text-3xl text-white/80 font-medium">
                3 Weekends. Dedicated Mentor. Demo Day.
              </p>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                Mentors teach the <span className="text-emerald-400 font-semibold">Base44 LAUNCH</span> curriculum. Live sessions, pitch coaching with investor rubrics, and Demo Day with real investors.
              </p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-white/50 line-through text-xl">$450</span>
                <span className="text-5xl font-bold text-emerald-400">$290</span>
              </div>
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-sm px-4 py-1">
                LIMITED OFFER — 36% OFF
              </Badge>
              <div className="pt-2">
                <Button 
                  size="lg"
                  onClick={() => document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-bold text-lg px-8 py-6 h-auto"
                >
                  Join the Cohort <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
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
                  <Award className="w-4 h-4 text-emerald-400" />
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
                What You'll Get
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                The complete live experience with personal mentorship.
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

        {/* Detailed Weekend Schedule */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                The 3-Weekend Journey
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                From idea to investor pitch in just 3 weekends. Every session builds on the last.
              </p>
            </div>

            <div className="max-w-5xl mx-auto space-y-8">
              {detailedSchedule.map((weekend, index) => (
                <Card 
                  key={index} 
                  className={cn(
                    "border-border/50 overflow-hidden transition-all duration-300 hover:scale-[1.02]",
                    weekend.isPitchDay 
                      ? "bg-gradient-to-br from-emerald-950/50 to-emerald-900/30 border-emerald-500/30" 
                      : "glass-card"
                  )}
                >
                  <CardContent className="p-0">
                    {/* Weekend Header */}
                    <div className={cn(
                      "px-6 py-4 border-b border-border/30 flex flex-col md:flex-row md:items-center md:justify-between gap-2",
                      weekend.isPitchDay ? "bg-emerald-500/10" : "bg-card/50"
                    )}>
                      <div className="flex items-center gap-3">
                        <Badge className={cn(
                          "text-sm px-3 py-1",
                          weekend.isPitchDay 
                            ? "bg-emerald-500 text-black" 
                            : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                        )}>
                          {weekend.weekend}
                        </Badge>
                        <h3 className="text-xl font-bold text-foreground">{weekend.title}</h3>
                        {weekend.isPitchDay && (
                          <Badge className="bg-red-500/20 text-red-400 border-red-500/30 animate-pulse">
                            DEMO DAY
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-medium">{weekend.dates}</span>
                      </div>
                    </div>

                    {/* Sessions */}
                    <div className="p-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        {weekend.sessions.map((session, sIndex) => (
                          <div 
                            key={sIndex} 
                            className={cn(
                              "p-4 rounded-lg border",
                              weekend.isPitchDay 
                                ? "bg-emerald-500/10 border-emerald-500/30" 
                                : "bg-card/30 border-border/30"
                            )}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="text-xs">
                                {session.day}
                              </Badge>
                              <span className="text-emerald-400 text-sm font-medium flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {session.time}
                              </span>
                            </div>
                            <h4 className="text-foreground font-semibold mb-1">{session.topic}</h4>
                            <p className="text-muted-foreground text-sm flex items-center gap-1">
                              <Target className="w-3 h-3 text-emerald-400" />
                              {session.deliverable}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Homework */}
                      {weekend.homework && (
                        <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                          <div className="flex items-start gap-3">
                            <FileText className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-amber-400 font-semibold text-sm">Homework This Week</p>
                              <p className="text-foreground/80 text-sm mt-1">{weekend.homework}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Pitch Day Special */}
                      {weekend.isPitchDay && (
                        <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                          <div className="flex items-start gap-3">
                            <Mic className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-emerald-400 font-semibold text-sm">What Happens on Demo Day</p>
                              <ul className="text-foreground/80 text-sm mt-2 space-y-1">
                                <li className="flex items-center gap-2">
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  5-minute pitch to investor panel
                                </li>
                                <li className="flex items-center gap-2">
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  Live Q&A and feedback from investors
                                </li>
                                <li className="flex items-center gap-2">
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  Awards for top pitches
                                </li>
                                <li className="flex items-center gap-2">
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  Earn your AI Launcher Certificate
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Meet Your Mentor */}
        <section className="py-20 bg-gradient-to-b from-background to-card/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 mb-4">
                Your Guide
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Meet Your Mentor
              </h2>
              <p className="text-muted-foreground text-lg">
                Learn from industry leaders who've shaped AI education
              </p>
            </div>

            <Card className="max-w-4xl mx-auto bg-gradient-to-br from-emerald-950/30 via-card to-emerald-950/20 border-emerald-500/30 border-2 overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  {/* Photo */}
                  <div className="md:w-1/3 relative">
                    <div className="aspect-square md:aspect-auto md:h-full">
                      <img 
                        src={melanieLo} 
                        alt="Dr. Melanie Lo"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/20" />
                    </div>
                  </div>
                  
                  {/* Bio */}
                  <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-center">
                    <div className="mb-4">
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                        Dr. Melanie Lo
                      </h3>
                      <p className="text-emerald-400 font-medium">
                        Director of Educational Innovation, Wix University & Base44
                      </p>
                    </div>
                    
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        Dedicated to reimagining how higher education prepares students for the digital-first workforce. She leads global initiatives bridging academia and industry, creating scalable programs that embed digital fluency, professional branding, and career readiness into university curricula.
                      </p>
                      <p>
                        Her expertise spans curriculum strategy, certification design, and academic partnerships—all focused on empowering the next generation to take ownership of their digital identities and thrive in a workforce that values creativity, adaptability, and visibility.
                      </p>
                    </div>

                    {/* Expertise Badges */}
                    <div className="flex flex-wrap gap-2 mt-6">
                      {["Curriculum Strategy", "Certification Design", "Academic Partnerships", "Digital Fluency"].map((skill) => (
                        <Badge key={skill} className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 px-3 py-1">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Inside the Platform - Mockups */}
        <section className="py-20 bg-card/30 border-y border-border/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Inside the Live Cohort
              </h2>
              <p className="text-muted-foreground text-lg">
                See exactly what you'll experience
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {/* Live Session Interface Mockup */}
              <Card className="bg-[#0d1117] border-border/50 overflow-hidden md:col-span-2">
                <div className="bg-[#161b22] px-4 py-2 flex items-center gap-2 border-b border-border/30">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-white/50 text-xs ml-2">Live Session — Weekend 2, Session 3</span>
                </div>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <div className="aspect-video bg-gradient-to-br from-emerald-900/50 to-emerald-950/50 rounded-lg border border-emerald-500/20 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iIzBkMTExNyI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiIGZpbGw9IiMxZjI5MzciPjwvY2lyY2xlPgo8L3N2Zz4=')] opacity-30" />
                        <div className="flex flex-col items-center gap-3 z-10">
                          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center">
                            <Play className="w-8 h-8 text-emerald-400 ml-1" />
                          </div>
                          <span className="text-white/80 font-medium">Live with Mentor Sarah</span>
                          <Badge className="bg-red-500/20 text-red-400 border-red-500/30 animate-pulse">
                            ● LIVE NOW
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-emerald-400" />
                          <span className="text-white/60 text-sm">12 students in session</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Timer className="w-4 h-4 text-emerald-400" />
                          <span className="text-white/60 text-sm">45:23 remaining</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-full md:w-72 space-y-3">
                      <h4 className="text-white font-semibold">Today's Session</h4>
                      <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                        <p className="text-emerald-400 font-medium text-sm">Pitch Deck Mastery</p>
                        <p className="text-white/60 text-xs mt-1">Creating slides that sell your vision</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-white/40 text-xs">Session Agenda:</p>
                        {["Review homework pitches", "Storytelling frameworks", "Live deck critique", "Q&A with mentor"].map((item, i) => (
                          <div key={i} className="flex items-center gap-2 text-white/70 text-sm">
                            <div className={`w-4 h-4 rounded-full border ${i < 2 ? 'bg-emerald-500/20 border-emerald-500' : 'border-white/20'} flex items-center justify-center`}>
                              {i < 2 && <Check className="w-3 h-3 text-emerald-400" />}
                            </div>
                            <span className={i < 2 ? 'text-white/40 line-through' : ''}>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pitch Deck Builder Mockup */}
              <Card className="bg-[#0d1117] border-border/50 overflow-hidden">
                <div className="bg-[#161b22] px-4 py-2 flex items-center gap-2 border-b border-border/30">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-white/50 text-xs ml-2">Pitch Deck Builder</span>
                </div>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-semibold">Your Pitch Deck</h4>
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
                      7/10 slides
                    </Badge>
                  </div>
                  <div className="grid grid-cols-5 gap-1">
                    {["Problem", "Solution", "Market", "Product", "Team", "Traction", "Ask", "—", "—", "—"].map((slide, i) => (
                      <div 
                        key={i} 
                        className={`aspect-[4/3] rounded text-[8px] flex items-center justify-center ${
                          i < 7 ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400' : 'bg-white/5 border border-white/10 text-white/30'
                        }`}
                      >
                        {slide}
                      </div>
                    ))}
                  </div>
                  <div className="p-3 bg-white/5 rounded border border-white/10">
                    <div className="flex items-start gap-2">
                      <Star className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-white/80 text-xs font-medium">Mentor Feedback</p>
                        <p className="text-white/50 text-xs mt-1">"Great problem statement! Add more specific metrics to your traction slide."</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Demo Day Countdown Mockup */}
              <Card className="bg-[#0d1117] border-border/50 overflow-hidden">
                <div className="bg-[#161b22] px-4 py-2 flex items-center gap-2 border-b border-border/30">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-white/50 text-xs ml-2">Demo Day Prep</span>
                </div>
                <CardContent className="p-4 space-y-4">
                  <div className="text-center">
                    <p className="text-white/60 text-sm">Pitch Day Countdown</p>
                    <div className="text-4xl font-bold text-emerald-400 my-2">5 Days</div>
                    <p className="text-white/40 text-xs">March 7, 2026</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-white/60 text-xs">Your Readiness Score</p>
                    <div className="flex items-center gap-3">
                      <Progress value={78} className="h-3 flex-1 bg-white/10" />
                      <span className="text-emerald-400 font-bold">78%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-white/60 text-xs">Practice Rounds</p>
                    <div className="flex gap-2">
                      {[1, 2, 3].map((round) => (
                        <div key={round} className="flex-1 p-2 bg-white/5 rounded border border-white/10 text-center">
                          <div className={`text-lg font-bold ${round < 3 ? 'text-emerald-400' : 'text-white/30'}`}>
                            {round < 3 ? '85' : '—'}
                          </div>
                          <div className="text-white/40 text-[10px]">Round {round}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Live Webinars Section */}
        <LiveWebinarsSection variant="emerald" />

        {/* Masterclass Schedule */}
        <MasterclassSchedule variant="emerald" />

        {/* Community Promise Section */}
        <CommunityPromiseSection variant="emerald" />

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
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
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
              <Video className="w-16 h-16 text-emerald-400 mx-auto" />
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                Ready to launch?
              </h2>
              <p className="text-white/60 text-lg">
                3 weekends. Demo Day. Real investors.
              </p>
              
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                <Select value={selectedAge} onValueChange={setSelectedAge}>
                  <SelectTrigger className="w-full bg-white/5 border-white/20 text-white">
                    <SelectValue placeholder="Select your age (12-18)" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 7 }, (_, i) => i + 12).map((age) => (
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
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-bold text-lg py-6 h-auto"
                >
                  Join for $290 <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <p className="text-white/40 text-sm">
                  1 year platform access • All 3 certificates included
                </p>
              </div>
              
              <p className="text-white/50 text-sm pt-4">
                Not ready for live sessions?{" "}
                <a href="/ai-builder" className="text-emerald-400 hover:underline">
                  See Full Foundation →
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

export default Accelerator;