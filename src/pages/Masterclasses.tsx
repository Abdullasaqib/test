import { useNavigate } from "react-router-dom";
import { Calendar, Clock, Award, Play, ArrowLeft, CheckCircle2, Video, Users, Sparkles, Star, Bell, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/seo";
import { PublicHeader, PublicFooter } from "@/components/layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Masterclasses = () => {
  const navigate = useNavigate();

  const masterclasses2026 = [
    { month: "January", title: "Vibe Coding Deep Dive", description: "Advanced prompting techniques for building faster", date: "Jan 24, 2026", status: "upcoming" },
    { month: "February", title: "AI for Problem Solving", description: "How founders identify and validate real problems", date: "Feb 21, 2026", status: "upcoming" },
    { month: "March", title: "Pitch Perfect", description: "Demo Day preparation with investor feedback", date: "Mar 21, 2026", status: "upcoming" },
    { month: "April", title: "Building with Base44", description: "Advanced builds and deployment strategies", date: "Apr 25, 2026", status: "upcoming" },
    { month: "May", title: "Customer Discovery Mastery", description: "Interview techniques that reveal real insights", date: "May 23, 2026", status: "upcoming" },
    { month: "June", title: "AI Safety & Ethics", description: "Responsible AI usage and critical thinking", date: "Jun 27, 2026", status: "upcoming" },
    { month: "July", title: "From MVP to Product", description: "Iteration strategies that work", date: "Jul 25, 2026", status: "upcoming" },
    { month: "August", title: "Marketing with AI", description: "Content, copywriting, and growth tactics", date: "Aug 22, 2026", status: "upcoming" },
    { month: "September", title: "Financial Literacy for Founders", description: "Revenue models and unit economics", date: "Sep 26, 2026", status: "upcoming" },
    { month: "October", title: "Team Building & Leadership", description: "Finding co-founders and managing people", date: "Oct 24, 2026", status: "upcoming" },
    { month: "November", title: "Scaling What Works", description: "From 10 users to 1,000 users", date: "Nov 21, 2026", status: "upcoming" },
    { month: "December", title: "Year in Review + 2027 Preview", description: "Celebrate wins and plan ahead", date: "Dec 19, 2026", status: "upcoming" },
  ];

  const pastMasterclasses = [
    { month: "December 2024", title: "Getting Started with AI Building", description: "Introduction to vibe coding and AI tools", date: "Dec 14, 2024", status: "available", views: 1240 },
    { month: "November 2024", title: "Finding Your First Problem", description: "Problem discovery workshop", date: "Nov 16, 2024", status: "available", views: 980 },
    { month: "October 2024", title: "AI Tools Landscape 2024", description: "Overview of the best AI building tools", date: "Oct 19, 2024", status: "available", views: 1560 },
  ];

  const monthlyWebinars = [
    { 
      week: "Week 1", 
      title: "What's New in AI", 
      description: "Latest tools and capabilities shaping the future",
      icon: Sparkles,
      day: "First Tuesday",
      time: "4:00 PM ET"
    },
    { 
      week: "Week 2", 
      title: "Student Spotlight", 
      description: "Showcase amazing student projects and journeys",
      icon: Star,
      day: "Second Tuesday",
      time: "4:00 PM ET"
    },
    { 
      week: "Week 3", 
      title: "Teacher Office Hours", 
      description: "Live Q&A for educators and facilitators",
      icon: Users,
      day: "Third Friday",
      time: "4:00 PM ET"
    },
    { 
      week: "Week 4", 
      title: "Industry Expert Session", 
      description: "Guest speakers from top tech companies",
      icon: Video,
      day: "Fourth Tuesday",
      time: "4:00 PM ET"
    },
  ];

  const whatsIncluded = [
    "60-90 minute live session",
    "Interactive workshop component",
    "Certificate of completion",
    "1-year replay access",
  ];

  return (
    <>
      <SEOHead
        title="Masterclasses & Live Webinars | NEXT_ Billion Lab"
        description="Monthly masterclasses and weekly webinars for NEXT_ students. Expert-led workshops, student spotlights, and industry sessions."
      />
      <div className="min-h-screen bg-background">
        <PublicHeader />

        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-[#0A0F1C] via-[#1a1a2e] to-[#0A0F1C]">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="text-white/60 hover:text-white mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>

            <div className="max-w-4xl mx-auto text-center space-y-6">
              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-sm px-4 py-1">
                LIVE LEARNING
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold text-white">
                Masterclasses &<br />
                <span className="text-amber-400">Live Webinars</span>
              </h1>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Monthly deep-dive masterclasses and 4 weekly webinars. Expert-led workshops on the skills that matter.
              </p>

              {/* What's Included */}
              <div className="flex flex-wrap justify-center gap-3 pt-4">
                {whatsIncluded.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span className="text-sm text-white/80">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Button 
                  size="lg"
                  onClick={() => navigate('/signup')}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-lg px-8 py-6 h-auto"
                >
                  Join NEXT_ to Access All Sessions
                </Button>
                <p className="text-white/50 text-sm mt-3">Free for 1 year with any enrollment</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs for Masterclasses vs Webinars */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <Tabs defaultValue="masterclasses" className="max-w-6xl mx-auto">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
                <TabsTrigger value="masterclasses">2026 Masterclasses</TabsTrigger>
                <TabsTrigger value="webinars">Weekly Webinars</TabsTrigger>
              </TabsList>

              {/* Masterclasses Tab */}
              <TabsContent value="masterclasses" className="space-y-12">
                {/* 2025 Calendar */}
                <div>
                  <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-2">2026 Masterclass Calendar</h2>
                    <p className="text-muted-foreground">One deep-dive session every month. All sessions at 11:00 AM ET.</p>
                  </div>

                  <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {masterclasses2026.map((mc, index) => (
                      <Card 
                        key={index} 
                        className="border-border/50 bg-card/50 hover:scale-105 transition-all duration-300"
                      >
                        <CardContent className="p-5 space-y-3">
                          <div className="flex items-center justify-between">
                            <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30">{mc.month}</Badge>
                            <span className="text-xs text-muted-foreground">{mc.date}</span>
                          </div>
                          <h3 className="font-bold text-foreground">{mc.title}</h3>
                          <p className="text-sm text-muted-foreground">{mc.description}</p>
                          <div className="pt-2 border-t border-border/30 flex items-center gap-2">
                            <Play className="w-3 h-3 text-amber-400" />
                            <span className="text-xs text-muted-foreground">60-90 min • Live + Replay</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Past Masterclasses */}
                <div>
                  <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Past Masterclasses</h2>
                    <p className="text-muted-foreground">Recordings available to all NEXT_ students</p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                    {pastMasterclasses.map((mc, index) => (
                      <Card 
                        key={index} 
                        className="border-border/50 bg-card/50"
                      >
                        <CardContent className="p-5 space-y-3">
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-muted-foreground">{mc.month}</Badge>
                            <Badge className="bg-green-500/10 text-green-400 border-green-500/30 text-xs">Available</Badge>
                          </div>
                          <h3 className="font-bold text-foreground">{mc.title}</h3>
                          <p className="text-sm text-muted-foreground">{mc.description}</p>
                          <div className="pt-2 border-t border-border/30 flex items-center justify-between">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Play className="w-3 h-3" /> Watch replay
                            </span>
                            <span className="text-xs text-muted-foreground">{mc.views.toLocaleString()} views</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Webinars Tab */}
              <TabsContent value="webinars" className="space-y-12">
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-2">Weekly Live Webinars</h2>
                  <p className="text-muted-foreground">4 live sessions every month. Free for all NEXT_ students.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                  {monthlyWebinars.map((session, index) => {
                    const Icon = session.icon;
                    return (
                      <Card key={index} className="border-border/50 bg-card/50 hover:scale-105 transition-all duration-300">
                        <CardContent className="p-5 space-y-3">
                          <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                            <Icon className="w-6 h-6 text-amber-400" />
                          </div>
                          <div>
                            <Badge variant="outline" className="text-xs mb-2">{session.week}</Badge>
                            <h3 className="font-bold text-foreground">{session.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{session.description}</p>
                          </div>
                          <div className="pt-2 border-t border-border/30 text-xs text-muted-foreground space-y-1">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{session.day}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{session.time}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Benefits */}
                <div className="max-w-3xl mx-auto mt-12">
                  <Card className="border-border/50 bg-card/30">
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-3 gap-6 text-center">
                        <div>
                          <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-3">
                            <Video className="w-6 h-6 text-green-400" />
                          </div>
                          <h3 className="font-semibold text-foreground mb-1">Live + Recorded</h3>
                          <p className="text-sm text-muted-foreground">Watch live or catch the replay within 24 hours</p>
                        </div>
                        <div>
                          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-3">
                            <Users className="w-6 h-6 text-blue-400" />
                          </div>
                          <h3 className="font-semibold text-foreground mb-1">Interactive Q&A</h3>
                          <p className="text-sm text-muted-foreground">Get your questions answered in every session</p>
                        </div>
                        <div>
                          <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-3">
                            <Bell className="w-6 h-6 text-purple-400" />
                          </div>
                          <h3 className="font-semibold text-foreground mb-1">Reminders</h3>
                          <p className="text-sm text-muted-foreground">Get notified before each session starts</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Access Note */}
        <section className="py-16 bg-card/30 border-y border-border/50">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="flex items-center justify-center gap-2">
                <Award className="w-6 h-6 text-amber-400" />
                <span className="font-bold text-foreground text-xl">Free for 1 Year with Any Enrollment</span>
              </div>
              <p className="text-muted-foreground">
                All NEXT_ students get complimentary access to every masterclass and webinar for their first year. 
                Never miss a session — all recordings are available in your dashboard.
              </p>
              <Button 
                size="lg"
                onClick={() => navigate('/ai-foundations')}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold"
              >
                Start Free — Join the Mission
              </Button>
            </div>
          </div>
        </section>

        <PublicFooter />
      </div>
    </>
  );
};

export default Masterclasses;
