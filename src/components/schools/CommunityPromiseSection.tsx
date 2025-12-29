import { Mail, Newspaper, TrendingUp, Users, Star, Bell, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

interface CommunityPromiseSectionProps {
  variant?: "amber" | "yellow" | "emerald";
}

export function CommunityPromiseSection({ variant = "amber" }: CommunityPromiseSectionProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const colorClasses = {
    amber: {
      badge: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      icon: "text-amber-400",
      border: "border-amber-500/30",
      bg: "bg-amber-500/10",
      button: "bg-amber-500 hover:bg-amber-600 text-black",
      gradient: "from-amber-500/20 to-amber-600/10",
    },
    yellow: {
      badge: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
      icon: "text-yellow-400",
      border: "border-yellow-500/30",
      bg: "bg-yellow-500/10",
      button: "bg-yellow-500 hover:bg-yellow-600 text-black",
      gradient: "from-yellow-500/20 to-yellow-600/10",
    },
    emerald: {
      badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      icon: "text-emerald-400",
      border: "border-emerald-500/30",
      bg: "bg-emerald-500/10",
      button: "bg-emerald-500 hover:bg-emerald-600 text-black",
      gradient: "from-emerald-500/20 to-emerald-600/10",
    },
  };

  const colors = colorClasses[variant];

  const monthlyUpdates = [
    { icon: TrendingUp, title: "AI Trends", description: "What's changing in AI this month" },
    { icon: Newspaper, title: "Platform Updates", description: "New features and improvements" },
    { icon: Star, title: "Success Stories", description: "Student wins and milestones" },
    { icon: Bell, title: "Event Reminders", description: "Upcoming webinars and masterclasses" },
    { icon: Users, title: "Alumni Network", description: "Connect with NEXT_ graduates" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("You're on the list! Check your email for confirmation.");
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <section className={`py-20 bg-gradient-to-br ${colors.gradient}`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Badge className={colors.badge + " mb-4"}>
            THE PROMISE
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Once You're In, You're Never Alone
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            AI is evolving faster than any curriculum can keep up. That's why NEXT_ members get monthly 
            updates on what's changing, what's new, and what matters. <span className="text-foreground font-medium">You'll never be left behind.</span>
          </p>
        </div>

        {/* What You'll Get */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-4 mb-12">
          {monthlyUpdates.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="border-border/50 bg-card/50 text-center">
                <CardContent className="p-4 space-y-2">
                  <div className={`w-10 h-10 rounded-full ${colors.bg} flex items-center justify-center mx-auto`}>
                    <Icon className={`w-5 h-5 ${colors.icon}`} />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quote */}
        <div className="max-w-3xl mx-auto mb-12">
          <blockquote className="text-center">
            <p className="text-xl md:text-2xl text-foreground/90 italic leading-relaxed">
              "The tools will change. The platforms will evolve. But the thinking — the founder mindset, 
              the AI fluency, the ability to create — that stays with you forever."
            </p>
            <footer className="mt-4 text-muted-foreground">
              — NEXT_ Billion Lab
            </footer>
          </blockquote>
        </div>

        {/* Email Capture for Non-Members */}
        <div className="max-w-lg mx-auto">
          <Card className="border-border/50 bg-card/80">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2 justify-center">
                <Mail className={`w-5 h-5 ${colors.icon}`} />
                <span className="font-semibold text-foreground">Not enrolled yet?</span>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Join 50,000+ future founders getting monthly AI insights and updates.
              </p>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input 
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-background border-border"
                  required
                />
                <Button 
                  type="submit" 
                  className={colors.button}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "..." : "Subscribe"}
                </Button>
              </form>
              <p className="text-xs text-muted-foreground text-center">
                Free monthly newsletter. Unsubscribe anytime.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
