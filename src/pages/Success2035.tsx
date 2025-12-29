import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NeuralBackground } from "@/components/ui/neural-background";
import { OrganicBlob } from "@/components/ui/organic-blob";
import { 
  ArrowLeft, 
  ArrowRight,
  Target, 
  Clock, 
  Compass, 
  Heart, 
  Star,
  BookOpen,
  Share2,
  Sparkles
} from "lucide-react";

const successShifts = [
  {
    id: 1,
    icon: Target,
    title: "Purpose vs Position",
    today: {
      label: "Today's Metric",
      description: "Job titles, company prestige, LinkedIn profile impressions"
    },
    future: {
      label: "2035 Metric", 
      description: "Alignment between daily actions and personal mission"
    },
    explanation: "The shift from \"What do you do?\" to \"Why do you do it?\" reflects a generation prioritizing meaningful work over prestigious labels. Success becomes about the depth of impact, not the height of the corporate ladder.",
    drivers: ["Declining corporate loyalty post-2020", "Rise of creator/founder culture", "AI commoditizing generic work"]
  },
  {
    id: 2,
    icon: Clock,
    title: "Time Autonomy vs Income Maximization",
    today: {
      label: "Today's Metric",
      description: "Salary size, bonus potential, total compensation packages"
    },
    future: {
      label: "2035 Metric",
      description: "Control over your calendar, location independence, schedule flexibility"
    },
    explanation: "Money buys things. Time buys experiences, relationships, and freedom. The wealthiest people in 2035 won't be measured by bank accounts but by how much of their time truly belongs to them.",
    drivers: ["Remote work normalization", "4-day work week movements", "Burnout awareness in younger generations"]
  },
  {
    id: 3,
    icon: Compass,
    title: "Life Design vs Material Accumulation",
    today: {
      label: "Today's Metric",
      description: "Houses owned, cars in garage, square footage, brand possessions"
    },
    future: {
      label: "2035 Metric",
      description: "Experiences lived, skills acquired, relationships nurtured, adventures completed"
    },
    explanation: "Ownership is being replaced by access. Memories outweigh materials. The question shifts from \"What do you have?\" to \"What have you experienced?\" Success becomes a story, not an inventory.",
    drivers: ["Subscription economy growth", "Minimalism movement", "Climate consciousness among youth"]
  },
  {
    id: 4,
    icon: Heart,
    title: "Wellbeing vs Busyness",
    today: {
      label: "Today's Metric",
      description: "Hours worked, inbox zero, meetings attended, always available"
    },
    future: {
      label: "2035 Metric",
      description: "Energy levels, mental clarity, physical health, emotional balance"
    },
    explanation: "Being busy is no longer a badge of honor—it's a sign of poor prioritization. The new status symbol is saying \"no\" more than \"yes\" and protecting your energy like the finite resource it is.",
    drivers: ["Mental health destigmatization", "Productivity research on rest", "Athletes/CEOs modeling recovery prioritization"]
  },
  {
    id: 5,
    icon: Star,
    title: "Reputation vs Status Signaling",
    today: {
      label: "Today's Metric",
      description: "Followers count, viral moments, verification badges, public recognition"
    },
    future: {
      label: "2035 Metric",
      description: "Trust within your community, quality of referrals, depth of professional relationships"
    },
    explanation: "A million followers means nothing if none of them would vouch for your character. In 2035, reputation is built through consistent actions in closed rooms, not performative posts in public feeds.",
    drivers: ["Influencer culture backlash", "Rise of private communities", "Increased value of trust in AI-saturated content world"]
  }
];

const sources = [
  { name: "World Economic Forum", title: "Future of Jobs Report 2023" },
  { name: "MIT Sloan", title: "Redefining Success in the Digital Age" },
  { name: "McKinsey Global Institute", title: "The Future of Work After COVID-19" },
  { name: "OECD", title: "Skills for 2030 Framework" },
  { name: "Deloitte", title: "Global Gen Z and Millennial Survey 2024" }
];

const Success2035 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/academy")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Academy
          </Button>
          <div className="flex gap-3">
            <Button 
              variant="outline"
              onClick={() => navigate("/academy/social")}
              className="flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share Content
            </Button>
            <Button onClick={() => navigate("/pricing")}>
              Get Started — From $9
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <NeuralBackground className="opacity-30" />
        <OrganicBlob color="hsl(var(--primary))" size={500} className="top-20 -left-48" animationDelay={0} />
        <OrganicBlob color="hsl(var(--accent))" size={400} className="bottom-10 -right-32" animationDelay={2} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-card/50 backdrop-blur-sm border border-border text-foreground mb-6">
              <Sparkles className="w-3 h-3 mr-1" />
              The Future of Success
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              How Will We Measure{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Success in 2035?
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              The metrics that defined achievement for our parents' generation are becoming obsolete. 
              Here's what success will actually look like for the next generation of founders.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" onClick={() => navigate("/pricing")}>
                Get Started — From $9
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/blog/success-2035-how-will-we-measure-it")}>
                <BookOpen className="w-4 h-4 mr-2" />
                Read Full Article
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* The 5 Shifts */}
      <section className="py-20 bg-card/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-card/50 backdrop-blur-sm border border-border text-foreground mb-4">
              The 5 Shifts
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Success is Being Redefined
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These aren't predictions—they're patterns already emerging in how Gen Z thinks about achievement.
            </p>
          </div>

          <div className="space-y-8 max-w-5xl mx-auto">
            {successShifts.map((shift, index) => (
              <Card key={shift.id} className="bg-card/50 backdrop-blur-sm border-border overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <shift.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <Badge variant="outline" className="mb-1">Shift {index + 1}</Badge>
                      <CardTitle className="text-2xl">{shift.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Today vs 2035 Comparison */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-muted/50 border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                        <span className="text-sm font-medium text-muted-foreground">{shift.today.label}</span>
                      </div>
                      <p className="text-foreground">{shift.today.description}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-sm font-medium text-primary">{shift.future.label}</span>
                      </div>
                      <p className="text-foreground">{shift.future.description}</p>
                    </div>
                  </div>

                  {/* Explanation */}
                  <p className="text-muted-foreground leading-relaxed">
                    {shift.explanation}
                  </p>

                  {/* Drivers */}
                  <div>
                    <span className="text-sm font-medium text-muted-foreground mb-2 block">What's Driving This:</span>
                    <div className="flex flex-wrap gap-2">
                      {shift.drivers.map((driver, i) => (
                        <Badge key={i} variant="secondary" className="bg-secondary/50">
                          {driver}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Matters for Young Founders */}
      <section className="py-20 relative overflow-hidden">
        <OrganicBlob color="hsl(var(--primary))" size={350} className="top-20 -right-32" animationDelay={1} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="bg-card/50 backdrop-blur-sm border border-border text-foreground mb-4">
                The Opportunity
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why This Matters for Young Founders
              </h2>
            </div>

            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardContent className="p-8 space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  The founders who will define 2035 aren't chasing yesterday's metrics. They're building companies that:
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Create purpose-driven products that solve real problems",
                    "Design for time freedom, not just revenue growth",
                    "Prioritize experiences and impact over accumulation",
                    "Build sustainable businesses that protect founder wellbeing",
                    "Earn trust through action, not performance"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-primary">{index + 1}</span>
                      </div>
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>

                <p className="text-lg text-foreground font-medium pt-4 border-t border-border">
                  At Next Billion Lab, we're preparing young founders for this future—not the past.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sources */}
      <section className="py-16 bg-card/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold mb-6 text-center">Research & Sources</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {sources.map((source, index) => (
                <Badge key={index} variant="outline" className="py-2 px-4">
                  <span className="font-medium">{source.name}</span>
                  <span className="text-muted-foreground ml-1">— {source.title}</span>
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <OrganicBlob color="hsl(var(--primary))" size={400} className="bottom-0 left-1/4" animationDelay={0} />
        
        <div className="container mx-auto px-4 relative z-10">
          <Card className="max-w-3xl mx-auto bg-card/50 backdrop-blur-sm border-border text-center">
            <CardContent className="p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Build for 2035?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                Join the next generation of founders who are redefining success on their own terms.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" onClick={() => navigate("/pricing")}>
                  Get Started — From $9
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate("/academy/social")}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share This Vision
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Success2035;
