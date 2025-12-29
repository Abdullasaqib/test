import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Sparkles, 
  Users, 
  TrendingUp, 
  Clock, 
  DollarSign,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  UserPlus,
  HelpCircle,
  Lightbulb,
  Star
} from "lucide-react";
import { Badge as BadgeUI } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { PricingTable } from "@/components/academy/PricingTable";

export default function JuniorProgramPage() {
  const navigate = useNavigate();

  const benefits = [
    "Learn problem-solving through real business creation",
    "Build confidence by launching your first product",
    "Develop communication skills with customers",
    "Master kid-friendly AI tools",
    "Weekly group calls with peers",
    "24/7 AI Coach support"
  ];

  const curriculum = [
    { week: 1, title: "Meet the Lab & Pick Your Problem", output: "One-line problem + one paragraph story" },
    { week: 2, title: "Turn Problem into a Simple Idea", output: "Idea summary card with name" },
    { week: 3, title: "Talk to 3 People", output: "Reflection: What I learned from talking to people" },
    { week: 4, title: "Design Your First Version on Paper", output: "One visual of the idea" },
    { week: 5, title: "How Will You Tell People About It", output: "A simple message, poster, or flyer" },
    { week: 6, title: "Basic Money Thinking", output: "A simple mini money plan" },
    { week: 7, title: "Improve Your Idea Using AI Feedback", output: "Version 2 of your idea" },
    { week: 8, title: "Storytelling Week", output: "Short story + 30-60s voice pitch" },
    { week: 9, title: "Mini Launch Action", output: "Log entry: what you did and what people said" },
    { week: 10, title: "Reflection and Impact", output: "Reflection card" },
    { week: 11, title: "Build Simple Pitch Deck", output: "5-slide pitch deck" },
    { week: 12, title: "Showcase and Certificate", output: "Final pitch + certificate" }
  ];

  const idealFor = [
    "Ages 9-11 who are curious and creative",
    "Kids who love solving problems",
    "Young entrepreneurs with big ideas",
    "Students ready to learn business basics"
  ];

  const projectIdeas = [
    {
      title: "Custom Study Planners",
      description: "Help classmates organize their homework and school schedule with personalized planners.",
      age: "Ages 10-11"
    },
    {
      title: "Pet Care Guides",
      description: "Create guides and checklists for taking care of different pets in your neighborhood.",
      age: "Ages 9-10"
    },
    {
      title: "Homework Helper Tools",
      description: "Simple tools or apps to help friends track and complete their assignments.",
      age: "Ages 11"
    }
  ];

  const faqs = [
    {
      q: "Does my child need coding experience?",
      a: "No! We use simple AI tools designed specifically for young learners. If they can drag and drop, they can build."
    },
    {
      q: "How much time per week is required?",
      a: "Approximately 5-7 hours: 30-45 minutes daily for video lessons and activities, plus 1-hour weekly group call."
    },
    {
      q: "What if my child doesn't launch a product?",
      a: "The real value is in learning entrepreneurial skills, problem-solving, and building confidence. Many students continue growing their ideas after the program ends."
    },
    {
      q: "What happens after the program ends?",
      a: "Students receive a certificate and can continue developing their projects. Many join our alumni community for ongoing support and networking."
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
        First cohort starts January 2025 • Limited spots • Be part of our founding class
      </div>

      {/* Hero Section */}
      <section className="relative py-32 px-4 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Ages 9-11 • 12 Weeks • Fun & Confidence Building
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            Junior Builders
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            The perfect first step into entrepreneurship. Build a real project, 
            develop confidence, and learn skills that last a lifetime.
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
                Self-paced learning with weekly group accountability calls
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
              <h3 className="font-semibold text-lg mb-2">Simple Launch</h3>
              <p className="text-sm text-muted-foreground">
                A real project your child builds and presents
              </p>
            </Card>
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
                Decide if you want to work alone (individual) or with friends (team). 
                Teams can be created or joined with a code.
              </p>
            </Card>
            
            <Card className="p-8">
              <HelpCircle className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Step 2: Pick Their Idea Path</h3>
              <p className="text-muted-foreground mb-4">
                <strong>"I already have an idea"</strong> — They tell us about it in 5 quick questions.<br/>
                <strong>"Help me brainstorm"</strong> — Our AI Coach helps them discover the perfect idea.
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

      {/* Stories from the Future */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Stories from the Future</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Imagine what your child could achieve in just 12 weeks
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 border-2 border-dashed border-primary/30">
              <Star className="w-8 h-8 text-primary/50 mb-4" />
              <p className="text-sm italic mb-4">
                "Imagine your child confidently presenting their first business idea to your whole family at Demo Day..."
              </p>
              <p className="text-xs text-muted-foreground">— A future parent story</p>
            </Card>

            <Card className="p-6 border-2 border-dashed border-primary/30">
              <Star className="w-8 h-8 text-primary/50 mb-4" />
              <p className="text-sm italic mb-4">
                "Picture them asking 'what problem can I solve?' instead of 'can I have more screen time?'..."
              </p>
              <p className="text-xs text-muted-foreground">— A future parent story</p>
            </Card>

            <Card className="p-6 border-2 border-dashed border-primary/30">
              <Star className="w-8 h-8 text-primary/50 mb-4" />
              <p className="text-sm italic mb-4">
                "Envision them learning to handle feedback gracefully and iterate on their ideas like real founders..."
              </p>
              <p className="text-xs text-muted-foreground">— A future parent story</p>
            </Card>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Our first cohort launches January 2025. Be part of the stories we'll tell.
          </p>
        </div>
      </section>

      {/* 12-Week Curriculum */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">12-Week Journey</h2>
          
          <div className="space-y-4">
            {curriculum.map((item) => (
              <Card key={item.week} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">
                    {item.week}
                  </div>
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

      {/* What You Could Build */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">What You Could Build</h2>
          <p className="text-center text-muted-foreground mb-12">
            Example project ideas from our curriculum — your child will create their own!
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {projectIdeas.map((project, index) => (
              <Card key={index} className="p-6">
                <h4 className="font-semibold mb-2">{project.title}</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {project.description}
                </p>
                <BadgeUI variant="outline">{project.age}</BadgeUI>
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
      <PricingTable program="junior" />

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Building?</h2>
          <p className="text-muted-foreground mb-8">
            Be part of our founding cohort launching January 2025. Limited spots available.
          </p>
          <Button size="lg" onClick={() => navigate("/pricing")}>
            Get Started — From $19 <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}
