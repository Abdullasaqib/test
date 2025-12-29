import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Trophy, 
  Users, 
  TrendingUp, 
  Award, 
  Clock, 
  DollarSign,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  UserPlus,
  HelpCircle,
  Lightbulb,
  GraduationCap,
  Star,
  Calendar
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { PricingTable } from "@/components/academy/PricingTable";

export default function AdvancedProgramPage() {
  const navigate = useNavigate();

  const benefits = [
    "Build launch-ready products with real traction",
    "Master fundraising basics and investor relations",
    "Learn team building and leadership",
    "Advanced go-to-market strategies",
    "Growth experiments and scaling tactics",
    "1:1 mentorship with successful founders",
    "Investor-style pitch deck development",
    "University portfolio that stands out",
    "Competition preparation (science fairs, pitch events)",
    "Potential scholarship opportunities"
  ];

  const curriculum = [
    { week: 1, title: "Idea Selection & Opportunity Sizing", output: "Idea canvas with problem, target user, rough market size" },
    { week: 2, title: "Competitive Landscape & Positioning", output: "Competitor comparison + positioning statement" },
    { week: 3, title: "Deep Validation & Insight", output: "Validation report (10+ interviews or 30+ survey responses)" },
    { week: 4, title: "MVP Design", output: "MVP plan: UX flow, feature list, tool stack" },
    { week: 5, title: "Build MVP 1.0", output: "MVP link or file: landing page, app mockup, service workflow" },
    { week: 6, title: "Launch Test 1", output: "Experiment metrics: sign-ups, clicks, interest" },
    { week: 7, title: "Iterate & Refine", output: "MVP 1.1 with focused changes" },
    { week: 8, title: "Business & Revenue Model", output: "One-page financial snapshot" },
    { week: 9, title: "Growth & Distribution Ideas", output: "Channel experiment plan" },
    { week: 10, title: "Run Growth Experiment", output: "Growth results and learnings" },
    { week: 11, title: "Investor-Style Pitch", output: "Polished pitch deck + recorded pitch" },
    { week: 12, title: "Demo Day & Portfolio Export", output: "Portfolio pack + certificate" }
  ];

  const idealFor = [
    "Ages 15-16 with serious founder ambition",
    "Students who completed Teen Founders or equivalent",
    "Teens with demonstrated entrepreneurial interest",
    "Future startup founders targeting real launches",
    "Students seeking elite college admissions edge",
    "Those comfortable with high-stakes challenges"
  ];

  const outcomes = [
    { metric: "MVP", label: "Launch-Ready Product" },
    { metric: "30+", label: "Users Validated" },
    { metric: "Growth", label: "Experiment Run" },
    { metric: "Portfolio", label: "University-Ready" }
  ];

  const potentialJourney = [
    { week: "Week 4", milestone: "First beta users testing your MVP" },
    { week: "Week 8", milestone: "Product-market fit signals emerging" },
    { week: "Week 10", milestone: "Growth experiment showing traction" },
    { week: "Week 12", milestone: "Demo Day ready, portfolio complete" }
  ];

  const faqs = [
    {
      q: "How is this different from Teen Founders?",
      a: "Senior Venture Lab focuses on deeper market research, competitive analysis, growth experiments, and building a university-ready portfolio. You'll work on bigger opportunities with investor-style pitches."
    },
    {
      q: "Do I need a team to apply?",
      a: "No, but you should be prepared to build one. We help you recruit co-founders from our network and teach you how to lead a team effectively."
    },
    {
      q: "Will I actually launch a product?",
      a: "That's the goal! You'll have the tools, mentorship, and structured curriculum to build and launch a real product with real users by Demo Day."
    },
    {
      q: "How much time is required per week?",
      a: "Plan for 12-15 hours weekly. This is equivalent to a serious part-time commitment and should be treated as such. You're building a real product."
    },
    {
      q: "How does this help with college applications?",
      a: "A launched product with real users is one of the most impressive achievements possible. You'll have metrics, user feedback, and leadership experience that stands out at top universities."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Back Navigation */}
      <div className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/academy")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Programs
          </Button>
        </div>
      </div>

      {/* Urgency Banner */}
      <div className="bg-primary text-primary-foreground py-3 px-4 text-center text-sm font-medium">
        Applications open • Selective admission • Interview required • First cohort March 2025
      </div>

      {/* Hero Section */}
      <section className="relative py-32 px-4 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Trophy className="w-4 h-4" />
            Ages 15-16 • 12 Weeks • Real Launches & Portfolio Building
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            Senior Venture Lab
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Build launch-ready products. Run growth experiments. Create a portfolio that gets you into top universities. 
            This is where serious teen founders become tomorrow's startup CEOs.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/pricing")}>
              Get Started — From $19 <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/academy")}>
              View All Programs
            </Button>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50">
              <Clock className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-lg mb-2">12 Weeks</h3>
              <p className="text-sm text-muted-foreground">
                Full journey from idea to launched product
              </p>
            </Card>
            
            <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50">
              <DollarSign className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-lg mb-2">Starting at $19</h3>
              <p className="text-sm text-muted-foreground">
                <Button variant="link" className="p-0 h-auto" onClick={() => navigate("/pricing")}>View all pricing options →</Button>
              </p>
            </Card>
            
            <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50">
              <TrendingUp className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-lg mb-2">Real Traction</h3>
              <p className="text-sm text-muted-foreground">
                Launched product with users and growth experiments
              </p>
            </Card>
          </div>

          {/* Success Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {outcomes.map((outcome, index) => (
              <Card key={index} className="p-6 text-center backdrop-blur-sm bg-card/50 border-border/50">
                <div className="text-3xl font-bold text-primary mb-2">{outcome.metric}</div>
                <div className="text-sm text-muted-foreground">{outcome.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How Students Start */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">How You Start</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-8">
              <UserPlus className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Step 1: Choose How to Build</h3>
              <p className="text-muted-foreground mb-4">
                Work solo (individual) or with co-founders (team). 
                Teams can be created or joined with a code.
              </p>
            </Card>
            
            <Card className="p-8">
              <HelpCircle className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Step 2: Pick Your Idea Path</h3>
              <p className="text-muted-foreground mb-4">
                <strong>"I already have an idea"</strong> — 5 questions: problem, user, solution, revenue model, current stage.<br/>
                <strong>"Help me brainstorm"</strong> — AI Coach helps you identify high-potential opportunities.
              </p>
            </Card>
          </div>

          <Card className="p-8 mt-6 border-2 border-primary/30 bg-primary/5">
            <Lightbulb className="w-10 h-10 text-primary mb-4 mx-auto" />
            <h3 className="text-xl font-bold mb-3 text-center">Brainstorming Categories</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-center">
              <div className="p-3 bg-background rounded-lg">
                <p className="text-sm font-medium">Make money</p>
              </div>
              <div className="p-3 bg-background rounded-lg">
                <p className="text-sm font-medium">Solve a school problem</p>
              </div>
              <div className="p-3 bg-background rounded-lg">
                <p className="text-sm font-medium">Help my community</p>
              </div>
              <div className="p-3 bg-background rounded-lg">
                <p className="text-sm font-medium">Help the planet</p>
              </div>
              <div className="p-3 bg-background rounded-lg">
                <p className="text-sm font-medium">Build with AI</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Selectivity & Application Requirements */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Selective Admission Process</h2>
          
          <Card className="p-8 mb-8 border-2 border-primary/20 bg-primary/5">
            <p className="text-center text-muted-foreground">
              This is our most intensive program. We're looking for ambitious students ready to commit 12-15 hours weekly to building something real. 
              Admission includes an interview to ensure mutual fit.
            </p>
          </Card>

          <Card className="p-8">
            <h3 className="text-xl font-bold mb-6">What We Look For:</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Demonstrated Entrepreneurial Interest</p>
                  <p className="text-sm text-muted-foreground">
                    Prior business ideas, projects, or completion of Teen Founders track
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Ambitious Vision</p>
                  <p className="text-sm text-muted-foreground">
                    Clear vision for a product that solves a real problem
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Time Commitment</p>
                  <p className="text-sm text-muted-foreground">
                    Ability to dedicate 12-15 hours weekly to building your product
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Coachability</p>
                  <p className="text-sm text-muted-foreground">
                    Willingness to learn from mentors, pivot when needed, and act on feedback
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Your Potential Journey */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Your Potential Journey</h2>
          <p className="text-center text-muted-foreground mb-12">
            What you could achieve in 12 weeks with full commitment
          </p>
          
          <Card className="border-2 border-dashed border-primary/30 p-8">
            <div className="grid md:grid-cols-4 gap-6">
              {potentialJourney.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-lg font-bold text-primary mb-2">{item.week}</div>
                  <p className="text-sm text-muted-foreground">{item.milestone}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-muted-foreground mt-8">
              These are goals, not guarantees. Results depend on your commitment and the nature of your project.
            </p>
          </Card>
        </div>
      </section>

      {/* University Portfolio Advantage */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Your University Portfolio</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <GraduationCap className="w-10 h-10 text-primary mb-4" />
              <h4 className="font-semibold text-lg mb-2">Stand Out in Applications</h4>
              <p className="text-sm text-muted-foreground mb-4">
                A launched product with real users is incredibly compelling for college apps. 
                You'll have metrics, validation data, and demonstrated leadership.
              </p>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Real user metrics to showcase</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Validation data as proof of impact</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Leadership & problem-solving demonstrated</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <Award className="w-10 h-10 text-primary mb-4" />
              <h4 className="font-semibold text-lg mb-2">Portfolio Export</h4>
              <p className="text-sm text-muted-foreground mb-4">
                At the end of the program, you'll receive a complete portfolio pack 
                documenting your journey, experiments, and achievements.
              </p>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Polished pitch deck</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Experiment & metrics documentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Certificate of completion</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Day */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Demo Day</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-8">
              <Star className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Present Your Work</h3>
              <p className="text-muted-foreground mb-4">
                At the end of the program, you'll pitch your product to a panel of mentors, 
                founders, and potentially investors. This is your moment to shine.
              </p>
              <ul className="text-sm space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>5-minute pitch presentation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Q&A with experienced founders</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Actionable feedback for next steps</span>
                </li>
              </ul>
            </Card>
            
            <Card className="p-8">
              <Trophy className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Recognition & Next Steps</h3>
              <p className="text-muted-foreground mb-4">
                Top performers will be recognized and may receive additional opportunities 
                for mentorship, competition prep, or continued support.
              </p>
              <ul className="text-sm space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Certificate of completion</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Alumni network access</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Continued mentorship opportunities</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* 12-Week Curriculum */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">12-Week Curriculum</h2>
          
          <div className="space-y-4">
            {curriculum.map((item) => (
              <Card key={item.week} className="p-6">
                <div className="flex items-start gap-4">
                  <Badge className="bg-primary text-primary-foreground">{item.week}</Badge>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">Output: {item.output}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Program Benefits */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Program Benefits</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Ideal For</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {idealFor.map((item, index) => (
              <Card key={index} className="p-6 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <p className="font-medium">{item}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6">
                <h4 className="font-semibold mb-2">{faq.q}</h4>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <PricingTable program="senior" />

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready for the Challenge?</h2>
          <p className="text-muted-foreground mb-8">
            Senior Venture Lab is for ambitious teens ready to build real products. 
            Our first cohort launches March 2025. Apply now to be considered.
          </p>
          <Button size="lg" onClick={() => navigate("/pricing")}>
            Get Started — From $19 <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}
