import { Calendar, Clock, Award, Play, ArrowRight, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface MasterclassScheduleProps {
  variant?: "amber" | "yellow" | "emerald";
  showFullYear?: boolean;
}

export function MasterclassSchedule({ variant = "amber", showFullYear = false }: MasterclassScheduleProps) {
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

  const masterclasses2026 = [
    { month: "January", title: "Vibe Coding Deep Dive", description: "Advanced prompting techniques for building faster", date: "Jan 24, 2026" },
    { month: "February", title: "AI for Problem Solving", description: "How founders identify and validate real problems", date: "Feb 21, 2026" },
    { month: "March", title: "Pitch Perfect", description: "Demo Day preparation with investor feedback", date: "Mar 21, 2026" },
    { month: "April", title: "Building with Base44", description: "Advanced builds and deployment strategies", date: "Apr 25, 2026" },
    { month: "May", title: "Customer Discovery Mastery", description: "Interview techniques that reveal real insights", date: "May 23, 2026" },
    { month: "June", title: "AI Safety & Ethics", description: "Responsible AI usage and critical thinking", date: "Jun 27, 2026" },
    { month: "July", title: "From MVP to Product", description: "Iteration strategies that work", date: "Jul 25, 2026" },
    { month: "August", title: "Marketing with AI", description: "Content, copywriting, and growth tactics", date: "Aug 22, 2026" },
    { month: "September", title: "Financial Literacy for Founders", description: "Revenue models and unit economics", date: "Sep 26, 2026" },
    { month: "October", title: "Team Building & Leadership", description: "Finding co-founders and managing people", date: "Oct 24, 2026" },
    { month: "November", title: "Scaling What Works", description: "From 10 users to 1,000 users", date: "Nov 21, 2026" },
    { month: "December", title: "Year in Review + 2027 Preview", description: "Celebrate wins and plan ahead", date: "Dec 19, 2026" },
  ];

  const displayClasses = showFullYear ? masterclasses2026 : masterclasses2026.slice(0, 3);

  const whatsIncluded = [
    "60-90 minute live session",
    "Interactive workshop component",
    "Certificate of completion",
    "1-year replay access",
  ];

  return (
    <section className="py-20 bg-card border-y border-border/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Badge className={colors.badge + " mb-4"}>
            MASTERCLASSES
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            2026 Masterclass Calendar
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            One deep-dive session every month. Expert-led workshops on the skills that matter.
          </p>
        </div>

        {/* What's Included */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {whatsIncluded.map((item, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 bg-card/50 border border-border/50 rounded-full">
                <CheckCircle2 className={`w-4 h-4 ${colors.icon}`} />
                <span className="text-sm text-foreground/80">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar Grid */}
        <div className={`max-w-5xl mx-auto grid ${showFullYear ? 'md:grid-cols-3 lg:grid-cols-4' : 'md:grid-cols-3'} gap-4`}>
          {displayClasses.map((mc, index) => (
            <Card 
              key={index} 
              className="border-border/50 bg-card/50 hover:scale-105 transition-all duration-300"
            >
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge className={colors.badge}>{mc.month}</Badge>
                  <span className="text-xs text-muted-foreground">{mc.date}</span>
                </div>
                <h3 className="font-bold text-foreground">{mc.title}</h3>
                <p className="text-sm text-muted-foreground">{mc.description}</p>
                <div className="pt-2 border-t border-border/30 flex items-center gap-2">
                  <Play className={`w-3 h-3 ${colors.icon}`} />
                  <span className="text-xs text-muted-foreground">60-90 min • Live + Replay</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {!showFullYear && (
          <div className="text-center mt-10">
            <Button 
              onClick={() => navigate('/masterclasses')}
              className={colors.button}
            >
              See All 12 Masterclasses <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {/* Free with membership note */}
        <div className="max-w-2xl mx-auto mt-10 text-center p-4 bg-card/30 border border-border/50 rounded-lg">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Award className={`w-5 h-5 ${colors.icon}`} />
            <span className="font-semibold text-foreground">Free for 1 Year with Any Enrollment</span>
          </div>
          <p className="text-sm text-muted-foreground">
            All NEXT_ students get complimentary access to every masterclass for their first year.
          </p>
        </div>
      </div>
    </section>
  );
}
