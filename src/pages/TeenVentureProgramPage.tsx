import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Rocket, 
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
  Star
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { PricingTable } from "@/components/academy/PricingTable";

export default function TeenVentureProgramPage() {
  const navigate = useNavigate();

  const benefits = [
    "Build real prototypes with paying customer potential",
    "Master validation and user research",
    "Learn customer retention strategies",
    "Advanced AI and automation tools",
    "Weekly mentor office hours",
    "24/7 AI Coach with advanced insights",
    "Peer network of ambitious teen founders",
    "Portfolio-ready projects for college apps"
  ];

  const curriculum = [
    { week: 1, title: "Idea Pick & Problem Deep Dive", output: "Problem brief: who, where, how big" },
    { week: 2, title: "Customer & User Profiling", output: "One persona card" },
    { week: 3, title: "Validation Plan", output: "Plan for 5-10 conversations/survey" },
    { week: 4, title: "Run Validation & Report", output: "Validation summary + pivot decision" },
    { week: 5, title: "Prototype 1.0", output: "Canva mockup, Google Form, or landing page" },
    { week: 6, title: "Feedback on Prototype", output: "Improvement list from 3+ people" },
    { week: 7, title: "Prototype 2.0 & Basic Funnel", output: "Improved prototype + customer journey" },
    { week: 8, title: "Money & Model Week", output: "One-page business model summary" },
    { week: 9, title: "Small Launch Experiment", output: "Experiment results: sign-ups, interest" },
    { week: 10, title: "Brand & Story", output: "Mini brand kit: name, logo idea, tagline" },
    { week: 11, title: "Pitch Deck & Presentation", output: "Teen-level pitch deck + script" },
    { week: 12, title: "Demo Day & Roadmap", output: "Final pitch + 3-month roadmap + certificate" }
  ];

  const idealFor = [
    "Ages 12-14 ready for serious entrepreneurship",
    "Students who completed Junior track or equivalent",
    "Teens comfortable with technology",
    "Future founders targeting real launches",
    "Students seeking competitive college edge"
  ];

  const outcomes = [
    { metric: "Real", label: "Prototype Built" },
    { metric: "10+", label: "People Validated" },
    { metric: "Launch", label: "Experiment Run" },
    { metric: "Pitch", label: "Demo Day Ready" }
  ];

  const projectIdeas = [
    {
      title: "Study Tools Platform",
      description: "Build a study aid or productivity tool that helps students manage homework, notes, or exam prep."
    },
    {
      title: "Community Marketplace",
      description: "Create a local marketplace connecting neighbors for services, tutoring, or skill sharing."
    },
    {
      title: "Meal Planning Service",
      description: "Design a meal planning tool that helps busy families organize weekly meals and shopping lists."
    }
  ];

  const faqs = [
    {
      q: "How is this different from Junior Builders?",
      a: "Teen Founders goes deeper into validation, prototyping, and business models. You'll build real prototypes, run experiments, and develop a proper pitch deck ready for Demo Day."
    },
    {
      q: "What technical skills are required?",
      a: "No coding required! We use AI tools and no-code platforms. However, students should be comfortable with technology and logical thinking."
    },
    {
      q: "How much time per week is needed?",
      a: "Plan for 8-12 hours weekly: daily lessons (1-2 hours), building time (4-6 hours), mentor calls (1 hour), and validation work (2-3 hours)."
    },
    {
      q: "Can this help with college applications?",
      a: "Absolutely! A real validated prototype with user feedback is incredibly compelling for college apps. You'll have tangible achievements to showcase."
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
        First cohort starts February 2025 • Limited to 30 students • Applications reviewed on rolling basis
      </div>

      {/* Hero Section */}
      <section className="relative py-32 px-4 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Rocket className="w-4 h-4" />
            Ages 12-14 • 12 Weeks • Real Validation & Prototypes
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            Teen Founders
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Build real prototypes, validate with real users, and launch real experiments. 
            Learn the skills that power successful startups.
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
                Comprehensive journey from idea to validated prototype
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
              <h3 className="font-semibold text-lg mb-2">Real Launch</h3>
              <p className="text-sm text-muted-foreground">
                Validated prototype with real user feedback
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
                <strong>"I already have an idea"</strong> — Tell us in 5 quick questions: problem, user, solution, revenue model, stage.<br/>
                <strong>"Help me brainstorm"</strong> — Our AI Coach helps you discover and validate an idea.
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

      {/* What You Could Build */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">What You Could Build</h2>
          <p className="text-center text-muted-foreground mb-12">
            Example project types — you'll create something uniquely yours
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {projectIdeas.map((project, index) => (
              <Card key={index} className="p-6">
                <Star className="w-8 h-8 text-primary/50 mb-4" />
                <h4 className="font-semibold mb-2">{project.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
              </Card>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Our first cohort launches February 2025. Your project could be the first success story we share.
          </p>
        </div>
      </section>

      {/* College Admissions Angle */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Your Competitive Edge for College</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <GraduationCap className="w-10 h-10 text-primary mb-4" />
              <h4 className="font-semibold text-lg mb-2">Stand Out in Applications</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Admissions officers see thousands of "good grades" and "club president" applications. 
                A real validated prototype with user feedback? That's unforgettable.
              </p>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Real user metrics to showcase</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Validation data as proof</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Leadership & problem-solving demonstrated</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <Award className="w-10 h-10 text-primary mb-4" />
              <h4 className="font-semibold text-lg mb-2">Essay Gold Mine</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Your Common App essay practically writes itself when you have real stories of 
                launching prototypes, handling users, and solving problems.
              </p>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Authentic failure & learning stories</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Demonstrated initiative beyond classroom</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Real impact on users' lives</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* 12-Week Curriculum */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">12-Week Journey</h2>
          
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
      <section className="py-20 px-4">
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
      <section className="py-20 px-4 bg-muted/30">
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
      <section className="py-20 px-4">
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
      <PricingTable program="teen" />

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Build Something Real?</h2>
          <p className="text-muted-foreground mb-8">
            Join our founding cohort launching February 2025. Your journey starts here.
          </p>
          <Button size="lg" onClick={() => navigate("/pricing")}>
            Get Started — From $19 <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}
