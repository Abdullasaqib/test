import { Video, Calendar, Clock, Users, Sparkles, Star, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface LiveWebinarsSectionProps {
  variant?: "amber" | "yellow" | "emerald";
}

export function LiveWebinarsSection({ variant = "amber" }: LiveWebinarsSectionProps) {
  const navigate = useNavigate();
  
  const colorClasses = {
    amber: {
      badge: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      icon: "text-amber-400",
      border: "border-amber-500/30",
      bg: "bg-amber-500/10",
      button: "bg-amber-500 hover:bg-amber-600 text-black",
    },
    yellow: {
      badge: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
      icon: "text-yellow-400",
      border: "border-yellow-500/30",
      bg: "bg-yellow-500/10",
      button: "bg-yellow-500 hover:bg-yellow-600 text-black",
    },
    emerald: {
      badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      icon: "text-emerald-400",
      border: "border-emerald-500/30",
      bg: "bg-emerald-500/10",
      button: "bg-emerald-500 hover:bg-emerald-600 text-black",
    },
  };

  const colors = colorClasses[variant];

  const monthlySchedule = [
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

  const upcomingWebinars = [
    { date: "Jan 7, 2026", title: "AI in 2026: What Students Need to Know", type: "What's New in AI" },
    { date: "Jan 14, 2026", title: "Maya, 14 — Built a Mental Health App", type: "Student Spotlight" },
    { date: "Jan 21, 2026", title: "Getting Started: Q&A for New Teachers", type: "Teacher Office Hours" },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Badge className={colors.badge + " mb-4"}>
            LIVE WEBINARS
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Monthly Live Sessions
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            4 live webinars every month. Learn from experts, celebrate students, connect with educators.
          </p>
        </div>

        {/* Monthly Schedule Grid */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {monthlySchedule.map((session, index) => {
            const Icon = session.icon;
            return (
              <Card key={index} className="border-border/50 bg-card/50 hover:scale-105 transition-all duration-300">
                <CardContent className="p-5 space-y-3">
                  <div className={`w-10 h-10 rounded-full ${colors.bg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${colors.icon}`} />
                  </div>
                  <div>
                    <Badge variant="outline" className="text-xs mb-2">{session.week}</Badge>
                    <h3 className="font-bold text-foreground">{session.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{session.description}</p>
                  </div>
                  <div className="pt-2 border-t border-border/30 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{session.day}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" />
                      <span>{session.time}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Upcoming Webinars */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-foreground text-center mb-6">Upcoming Sessions</h3>
          <div className="space-y-3">
            {upcomingWebinars.map((webinar, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-4 bg-card/50 border border-border/50 rounded-lg hover:bg-card/80 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className={`text-sm font-bold ${colors.icon}`}>{webinar.date.split(", ")[0]}</div>
                    <div className="text-xs text-muted-foreground">{webinar.date.split(", ")[1]}</div>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{webinar.title}</p>
                    <p className="text-xs text-muted-foreground">{webinar.type}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs hidden sm:flex">Free for members</Badge>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button 
              onClick={() => navigate('/masterclasses')}
              className={colors.button}
            >
              View Full Schedule <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Access Note */}
        <div className="max-w-2xl mx-auto mt-10 text-center p-4 bg-card/30 border border-border/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">All enrolled students get access.</span> Recordings available within 24 hours. Q&A in every session.
          </p>
        </div>
      </div>
    </section>
  );
}
