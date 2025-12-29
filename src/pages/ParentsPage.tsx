import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Brain, 
  Shield, 
  CheckCircle2, 
  ArrowLeft,
  DollarSign,
  Lightbulb,
  Newspaper,
  Quote,
  Sparkles,
  Wand2,
  Target,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ParentsPage() {
  const navigate = useNavigate();

  const faqs = [
    {
      q: "Is this safe for my child?",
      a: "Absolutely. All interactions are supervised. Our Coach is designed specifically for young learners with appropriate guardrails. There's no unsupervised contact with strangers. Weekly group calls are moderated by trained facilitators."
    },
    {
      q: "Will this distract from school?",
      a: "No — it complements academics. Students spend 5-8 hours per week, equivalent to an extracurricular activity. Many parents report improved focus, time management, and problem-solving skills that transfer to schoolwork."
    },
    {
      q: "What if my child fails?",
      a: "Failure is learning. Most successful founders failed multiple times before succeeding. We celebrate iterations and pivots. Your child will learn resilience, adaptability, and how to handle setbacks gracefully."
    },
    {
      q: "Is this just for 'smart' or 'tech' kids?",
      a: "Entrepreneurship rewards curiosity, not test scores. No coding required—Vibe Coding means they describe what they want and AI builds it. We've seen creative kids, shy kids, and 'average students' thrive because the skills are fundamentally human."
    },
    {
      q: "What happens after the 12 weeks?",
      a: "Students receive a certificate and can continue developing their projects. Many join our alumni community. Some go on to participate in entrepreneurship competitions. The skills and mindset last a lifetime."
    }
  ];

  const comparisonPoints = [
    { item: "Private tutoring (1 hr/week)", cost: "$200-500/week", total: "$2,400-6,000/12 weeks" },
    { item: "Summer coding camp", cost: "$1,500-3,000", total: "One-time, 1-2 weeks" },
    { item: "Traditional business camp", cost: "$2,000-5,000", total: "One-time, 1-2 weeks" },
    { item: "Next Billion Lab (First Step)", cost: "From $19", total: "12-week program" }
  ];

  const newSkills = [
    {
      icon: Wand2,
      title: "Vibe Coding",
      description: "Build apps by describing them. No syntax, no debugging—your child commands AI to create.",
      highlight: true
    },
    {
      icon: Brain,
      title: "Critical Thinking",
      description: "Ask the questions AI can't answer. Solve problems algorithms have never seen."
    },
    {
      icon: Target,
      title: "Entrepreneurial Mindset",
      description: "See problems as opportunities. Create value, don't just consume it."
    },
    {
      icon: Zap,
      title: "AI Fluency",
      description: "Master the tools that will define their careers—before they're competing for jobs."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Back Navigation */}
      <div className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Button variant="ghost" size="sm" onClick={() => navigate("/academy")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Academy
          </Button>
          <Button size="sm" onClick={() => navigate("/pricing")}>
            View Pricing
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-24 px-4 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            <Heart className="w-3 h-3 mr-1" />
            For Parents
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Your child is{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              smart
            </span>
            .
            <br />
            Now make them{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              unstoppable
            </span>
            .
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            There's a new skill set emerging that schools weren't designed to teach—not because they're failing, but because it didn't exist 5 years ago.
          </p>
          
          <Button size="lg" onClick={() => navigate("/pricing")}>
            <Sparkles className="mr-2 w-4 h-4" />
            Get Started — From $19
          </Button>
        </div>
      </section>

      {/* What Schools Teach + What We Add */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">Schools Teach the Foundation. We Add the Future.</h2>
          </div>
          
          <div className="space-y-6 text-lg text-muted-foreground">
            <p>
              Reading, writing, math, science—these are essential. But there's a new layer of skills your child needs that schools can't teach yet.
            </p>
            <p>
              In 12 weeks, your child will learn to identify problems worth solving, talk to real people, 
              build real solutions with AI tools, and launch real products.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-10">
            {newSkills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <Card key={index} className={`p-6 ${skill.highlight ? 'border-primary/50 bg-primary/5' : ''}`}>
                  <Icon className="w-10 h-10 text-primary mb-4" />
                  <h4 className="font-semibold mb-2">{skill.title}</h4>
                  <p className="text-sm text-muted-foreground">{skill.description}</p>
                  {skill.highlight && <Badge variant="outline" className="mt-3 text-xs">The skill that replaced traditional coding</Badge>}
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* What Your Child Will Experience */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">What Your Child Will Experience</h2>
          
          <div className="space-y-4">
            {[
              { week: "Weeks 1-2", title: "DISCOVER", description: "Find problems worth solving. AI-assisted ideation and problem hunting." },
              { week: "Weeks 3-4", title: "VALIDATE", description: "Talk to real customers. Research and validate the need." },
              { week: "Weeks 5-7", title: "BUILD", description: "Create your MVP with AI tools. Vibe coding—describe it, build it." },
              { week: "Weeks 8-10", title: "LAUNCH", description: "Get users and traction. Real feedback, real iteration." },
              { week: "Weeks 11-12", title: "PITCH", description: "Demo Day ready. Present to parents, peers, and mentors." }
            ].map((phase, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start gap-4">
                  <Badge variant="outline" className="flex-shrink-0">{phase.week}</Badge>
                  <div>
                    <h4 className="font-semibold mb-1">{phase.title}</h4>
                    <p className="text-muted-foreground">{phase.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-6 mt-8 border-2 border-primary/20 bg-primary/5">
            <h4 className="font-semibold mb-3">By the end, your child will have:</h4>
            <ul className="space-y-2">
              {[
                "A real project with real users or customers",
                "A portfolio piece for college applications",
                "Vibe coding skills to build anything they imagine",
                "Certificate of completion",
                "Network of ambitious peers worldwide"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      {/* Investment Comparison */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <DollarSign className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">The Investment</h2>
          </div>
          
          <p className="text-xl text-muted-foreground mb-8">
            Start for less than a coffee—and the skills last a lifetime.
          </p>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-semibold">Program</th>
                    <th className="text-left p-4 font-semibold">Cost</th>
                    <th className="text-left p-4 font-semibold">Duration/Total</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonPoints.map((point, index) => (
                    <tr key={index} className={index === comparisonPoints.length - 1 ? 'bg-primary/5 font-semibold' : ''}>
                      <td className="p-4 border-t">{point.item}</td>
                      <td className="p-4 border-t">{point.cost}</td>
                      <td className="p-4 border-t">{point.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="mt-8 text-center">
            <Button size="lg" onClick={() => navigate("/pricing")}>
              View All Pricing Options
            </Button>
            <p className="text-center text-muted-foreground mt-4">
              <strong>Scholarships available</strong> for students who demonstrate need.
            </p>
          </div>
        </div>
      </section>

      {/* Press Release from the Future */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <Newspaper className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">Press Release from the Future</h2>
          </div>

          <Card className="p-8 border-2 border-primary/20 bg-card">
            <div className="text-center mb-6">
              <Badge className="mb-4">FOR IMMEDIATE RELEASE</Badge>
              <p className="text-sm text-muted-foreground">Dubai, January 15, 2035</p>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-center mb-6">
              "Next Billion Lab Graduates Now Lead $50B+ in Market Cap"
            </h3>

            <p className="text-lg text-muted-foreground italic text-center mb-8">
              The first generation of "AI-native entrepreneurs" is reshaping global business
            </p>

            <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
              <p>
                Ten years ago, a small cohort of 30 children aged 9-16 joined an experimental program 
                called Next Billion Lab. Today, those graduates collectively lead companies worth over 
                $50 billion in market capitalization.
              </p>

              <Card className="p-4 my-6 bg-muted/30 border-l-4 border-l-primary">
                <Quote className="w-6 h-6 text-primary mb-2" />
                <p className="italic">
                  "I learned at Next Billion Lab that real entrepreneurs don't wait for permission. 
                  While my classmates were studying for exams, I was talking to customers. And Vibe Coding meant I could build anything I imagined."
                </p>
                <p className="text-sm mt-2 font-semibold">
                  — Sarah Al-Rashid, CEO of CleanFlow ($12B water purification company)
                </p>
                <p className="text-xs text-muted-foreground">Joined at age 12 in 2025</p>
              </Card>

              <p>
                Ahmad Patel, who entered the program at 15, recently led his AI-powered education 
                company EduMind through a $2.3 billion acquisition. "The skills I learned at 15—customer 
                validation, rapid prototyping, pitch development—are the same skills I use running 
                a thousand-person company," he noted.
              </p>

              <Card className="p-4 my-6 bg-muted/30">
                <p className="font-semibold mb-3">Dr. Maria Santos, MIT Education Researcher:</p>
                <p className="italic mb-4">
                  "Next Billion Lab represents the most significant innovation in entrepreneurship 
                  education in 50 years."
                </p>
                <p className="text-sm">Her 2034 study found that NBL graduates are:</p>
                <ul className="mt-2 space-y-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span><strong>4x more likely</strong> to start companies before age 25</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span><strong>3x more likely</strong> to reach leadership positions by 30</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span><strong>67% higher</strong> average income than peers</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-4 my-6 bg-muted/30 border-l-4 border-l-primary">
                <Quote className="w-6 h-6 text-primary mb-2" />
                <p className="italic">
                  "We didn't just teach them to code or build apps. We taught them to think like owners. 
                  To see problems as opportunities. To move from 'someone should fix this' to 'I will fix this.'"
                </p>
                <p className="text-sm mt-2 font-semibold">— Next Billion Lab Founder</p>
              </Card>

              <p>
                The program has since expanded to 150 countries, with over 2 million students completing 
                the curriculum. Notable graduates include the youngest-ever Y Combinator partner, two 
                UNICEF Goodwill Ambassadors, and the architect of Saudi Arabia's national AI education initiative.
              </p>

              <div className="border-t pt-6 mt-6">
                <p className="text-sm">
                  <strong>About Next Billion Lab:</strong> Founded in 2025 in Dubai, Next Billion Lab 
                  pioneered AI-native entrepreneurship education for students ages 9-16. The organization's 
                  mission: develop the next generation of builders who will solve the world's biggest problems.
                </p>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground">###</p>
            </div>
          </Card>

          <p className="text-center text-muted-foreground mt-8 italic">
            This is where your child's story could begin.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">Common Parent Questions</h2>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6">
                <h4 className="font-semibold mb-2 flex items-start gap-2">
                  <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  {faq.q}
                </h4>
                <p className="text-muted-foreground pl-7">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            12 weeks. One big idea. A lifetime of confidence.
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            The skills that will define the next generation of leaders start here.
          </p>
          <Button size="lg" onClick={() => navigate("/pricing")}>
            <Sparkles className="mr-2 w-4 h-4" />
            Get Started — From $19
          </Button>
        </div>
      </section>
    </div>
  );
}