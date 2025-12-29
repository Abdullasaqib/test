import { GraduationCap, Clock, MessageCircle, FileText, Video, Users, CheckCircle2, XCircle, HeartHandshake, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TeacherSupportSectionProps {
  variant?: "amber" | "yellow" | "emerald";
}

export function TeacherSupportSection({ variant = "amber" }: TeacherSupportSectionProps) {
  const colorClasses = {
    amber: {
      badge: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      icon: "text-amber-400",
      border: "border-amber-500/30",
      bg: "bg-amber-500/10",
    },
    yellow: {
      badge: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
      icon: "text-yellow-400",
      border: "border-yellow-500/30",
      bg: "bg-yellow-500/10",
    },
    emerald: {
      badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      icon: "text-emerald-400",
      border: "border-emerald-500/30",
      bg: "bg-emerald-500/10",
    },
  };

  const colors = colorClasses[variant];

  const teacherGets = [
    { icon: Video, text: "2-hour onboarding video (watch anytime)" },
    { icon: FileText, text: "Lesson facilitation guides (PDF per lesson)" },
    { icon: Clock, text: "Weekly pacing guide" },
    { icon: MessageCircle, text: "Discussion prompts for each lesson" },
    { icon: Users, text: "Student troubleshooting FAQ" },
  ];

  const noNeed = [
    "AI expertise",
    "Coding knowledge",
    "Extra prep time (15 min/week max)",
  ];

  const supportAvailable = [
    { icon: Video, text: "Monthly teacher office hours (live Q&A)", desc: "First Friday of every month, 4pm ET" },
    { icon: MessageCircle, text: "Email support within 24 hours", desc: "teacher-support@nextbillionlab.com" },
    { icon: Users, text: "Private teacher community", desc: "Connect with educators worldwide" },
  ];

  return (
    <section className="py-20 bg-card/30 border-y border-border/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Badge className={colors.badge + " mb-4"}>
            FOR EDUCATORS
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Built for Teachers, by Teachers
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We've removed every barrier so you can focus on what matters: guiding students.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {/* What Teachers Get */}
          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full ${colors.bg} flex items-center justify-center`}>
                  <GraduationCap className={`w-5 h-5 ${colors.icon}`} />
                </div>
                <h3 className="font-bold text-foreground text-lg">What Teachers Get</h3>
              </div>
              <div className="space-y-3">
                {teacherGets.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <item.icon className={`w-4 h-4 ${colors.icon} mt-0.5 flex-shrink-0`} />
                    <span className="text-sm text-foreground/80">{item.text}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* What Teachers DON'T Need */}
          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <HeartHandshake className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="font-bold text-foreground text-lg">No Expertise Needed</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                You don't need to be an AI expert. We've designed everything so any teacher can facilitate with confidence.
              </p>
              <div className="space-y-3">
                {noNeed.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <XCircle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm text-foreground/80 line-through decoration-muted-foreground/50">{item}</span>
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Support Available */}
          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="font-bold text-foreground text-lg">Support Available</h3>
              </div>
              <div className="space-y-4">
                {supportAvailable.map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <item.icon className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <span className="text-sm font-medium text-foreground">{item.text}</span>
                    </div>
                    <p className="text-xs text-muted-foreground ml-6">{item.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Download CTA */}
        <div className="max-w-xl mx-auto mt-10 text-center">
          <Button 
            variant="outline" 
            className={`${colors.border} hover:${colors.bg}`}
          >
            <Download className="w-4 h-4 mr-2" />
            Download Teacher Quick-Start Guide (PDF)
          </Button>
        </div>
      </div>
    </section>
  );
}
