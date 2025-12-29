import { PublicHeader } from "@/components/layout/PublicHeader";
import { ProgramWaitlistForm } from "@/components/coming-soon/ProgramWaitlistForm";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SEOHead } from "@/components/seo/SEOHead";
import { 
  Building2, 
  Users, 
  LineChart, 
  Shield, 
  Zap,
  Calendar,
  CheckCircle2,
  Rocket,
  Target,
  Lock,
  BarChart3,
  Briefcase,
  Globe,
  Heart,
  TrendingUp,
  ShoppingBag,
  Sparkles
} from "lucide-react";

const Enterprise = () => {
  const formFields = [
    { name: "email", label: "Work Email", type: "email" as const, placeholder: "you@company.com", required: true },
    { name: "full_name", label: "Full Name", type: "text" as const, placeholder: "Your name", required: true },
    { name: "company", label: "Company Name", type: "text" as const, placeholder: "Your company", required: true },
    { name: "team_size", label: "Team Size", type: "select" as const, placeholder: "Select team size", required: true, options: ["10-50", "51-200", "201-500", "501-1000", "1000+"] },
    { name: "training_goal", label: "Primary Training Goal", type: "select" as const, placeholder: "What's your focus?", required: false, options: ["Innovation upskilling", "AI adoption", "Internal tool building", "Intrapreneurship", "Digital transformation", "Other"] },
  ];

  const industryTracks = [
    {
      industry: "Healthcare",
      icon: Heart,
      tagline: "AI for Better Patient Outcomes",
      useCases: [
        "Patient intake automation",
        "Clinical workflow optimization", 
        "Documentation assistants",
        "Appointment scheduling intelligence"
      ],
      roles: "Ideal for: Clinic managers, practice administrators, healthcare IT"
    },
    {
      industry: "Financial Services",
      icon: TrendingUp,
      tagline: "AI for Smarter Operations",
      useCases: [
        "Client reporting automation",
        "Compliance documentation",
        "Internal knowledge systems",
        "Process workflow optimization"
      ],
      roles: "Ideal for: Operations teams, compliance, client services"
    },
    {
      industry: "Retail & E-commerce",
      icon: ShoppingBag,
      tagline: "AI for Customer Experience",
      useCases: [
        "Customer service automation",
        "Inventory intelligence tools",
        "Marketing content generation",
        "Internal operations dashboards"
      ],
      roles: "Ideal for: Marketing, operations, customer service leads"
    },
    {
      industry: "Professional Services",
      icon: Briefcase,
      tagline: "AI for Efficiency at Scale",
      useCases: [
        "Proposal generation tools",
        "Client onboarding automation",
        "Knowledge management systems",
        "Project tracking dashboards"
      ],
      roles: "Ideal for: Consultants, agencies, law firms, accounting"
    }
  ];

  const features = [
    { icon: Users, title: "Custom Curriculum", description: "Training tailored to your industry and use cases" },
    { icon: BarChart3, title: "Manager Dashboard", description: "Track progress, identify top performers, measure completion" },
    { icon: Lock, title: "Enterprise Security", description: "SSO, compliance certifications, and data privacy controls" },
    { icon: Globe, title: "Dedicated Success Manager", description: "White-glove onboarding and ongoing support" },
  ];

  const realOutcomes = [
    { 
      type: "Internal Tool", 
      example: "HR built an onboarding checklist app",
      impact: "Saves 4 hours/week per new hire"
    },
    { 
      type: "Process Automation", 
      example: "Finance automated expense reporting",
      impact: "Reduced manual data entry by 60%"
    },
    { 
      type: "Customer Dashboard", 
      example: "Sales built a client health tracker",
      impact: "Used by 23 team members daily"
    },
    { 
      type: "Knowledge Base", 
      example: "Support created an AI-powered FAQ",
      impact: "Reduced ticket volume by 30%"
    }
  ];

  const forLDLeaders = {
    headline: "Training That Produces Artifacts, Not Just Attendance",
    subheadline: "Every employee finishes with a working tool their team can use.",
    metrics: [
      "Week 6: Each employee ships an internal tool",
      "Week 8: Manager reviews measurable time savings",
      "Post-program: Tools remain in use (or iterate)"
    ]
  };

  const trustSignals = [
    "Built by the team training 1 million young founders",
    "Research-backed methodology",
    "SOC 2 Type II compliant",
    "GDPR ready",
  ];

  return (
    <div className="min-h-screen bg-[#0A0F1C]">
      <SEOHead
        title="Enterprise AI Training | NEXT_ BILLION LAB"
        description="Enable your teams to build internal tools and prototypes without waiting for engineering. Custom AI training by industry — Healthcare, Finance, Retail, Professional Services."
        keywords="enterprise AI training, corporate AI upskilling, team AI training, innovation training, internal tool building"
      />
      <PublicHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600/10 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/3 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 mb-6">
                <Building2 className="w-3 h-3 mr-1" />
                Enterprise Training Solutions
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Enable Every Team to{" "}
                <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  Build What They Need
                </span>
              </h1>
              
              <p className="text-xl text-white/70 mb-4">
                Custom AI training at scale. From 10 to 10,000 employees.
              </p>
              <p className="text-lg text-white/50 mb-8">
                Stop waiting for engineering. Train your teams to build internal tools, 
                automate workflows, and prototype solutions using AI.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-400" />
                  <span className="text-white/60">Enterprise security</span>
                </div>
                <div className="flex items-center gap-2">
                  <LineChart className="w-5 h-5 text-purple-400" />
                  <span className="text-white/60">Progress tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-400" />
                  <span className="text-white/60">From $199/seat</span>
                </div>
              </div>
            </div>

            {/* Demo Request Form */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 mb-3">
                    <Calendar className="w-3 h-3 mr-1" />
                    PILOT PROGRAMS AVAILABLE
                  </Badge>
                  <h3 className="text-2xl font-bold text-white">Book a Demo</h3>
                  <p className="text-white/60 mt-2">See how we can enable your team</p>
                </div>
                <ProgramWaitlistForm
                  programName="Enterprise Training"
                  source="enterprise-demo-request"
                  interestedProgram="enterprise"
                  fields={formFields}
                  ctaText="Request Demo"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* For L&D Leaders */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 mb-6">
            FOR L&D LEADERS
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {forLDLeaders.headline}
          </h2>
          <p className="text-xl text-white/70 mb-12">
            {forLDLeaders.subheadline}
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {forLDLeaders.metrics.map((metric, index) => (
              <Card key={index} className="bg-purple-500/5 border-purple-500/20">
                <CardContent className="p-6 text-center">
                  <CheckCircle2 className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <p className="text-white/80">{metric}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Tracks */}
      <section className="py-20 px-6 bg-gradient-to-b from-purple-900/10 to-transparent">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Industry-Specific Training
            </h2>
            <p className="text-white/60">Curriculum tailored to your industry's real problems</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {industryTracks.map((track, index) => (
              <Card key={index} className="bg-white/5 border-white/10 hover:border-purple-500/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-purple-500/20 p-3 rounded-lg">
                      <track.icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{track.industry}</h3>
                      <p className="text-purple-400 text-sm">{track.tagline}</p>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {track.useCases.map((useCase, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-white/70 text-sm">
                        <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0" />
                        {useCase}
                      </li>
                    ))}
                  </ul>
                  <p className="text-white/50 text-xs border-t border-white/10 pt-4">{track.roles}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Real Outcomes */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Teams Actually Build
            </h2>
            <p className="text-white/60">Real artifacts with measurable impact — not just certificates</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {realOutcomes.map((outcome, index) => (
              <Card key={index} className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border-purple-500/20">
                <CardContent className="p-6">
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 mb-3">
                    {outcome.type}
                  </Badge>
                  <h3 className="text-lg font-semibold text-white mb-2">{outcome.example}</h3>
                  <p className="text-white/70 text-sm">{outcome.impact}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-gradient-to-b from-indigo-900/10 to-transparent">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Enterprise-Grade Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((item, index) => (
              <Card key={index} className="bg-white/5 border-white/10 hover:border-purple-500/30 transition-colors text-center">
                <CardContent className="p-6">
                  <item.icon className="w-10 h-10 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-white/60 text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Flexible Pricing
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold text-white mb-2">Pilot</h3>
                <div className="text-3xl font-bold text-white mb-1">$199<span className="text-lg text-white/60">/seat</span></div>
                <p className="text-white/60 text-sm mb-4">10-50 employees</p>
                <ul className="text-white/60 text-sm space-y-2 text-left">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Full curriculum access</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Basic analytics</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Email support</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border-purple-500/30 relative">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-500 text-white">
                MOST POPULAR
              </Badge>
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold text-white mb-2">Growth</h3>
                <div className="text-3xl font-bold text-white mb-1">$149<span className="text-lg text-white/60">/seat</span></div>
                <p className="text-white/60 text-sm mb-4">51-500 employees</p>
                <ul className="text-white/60 text-sm space-y-2 text-left">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Everything in Pilot</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Manager dashboard</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Custom branding</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Priority support</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold text-white mb-2">Enterprise</h3>
                <div className="text-3xl font-bold text-white mb-1">Custom</div>
                <p className="text-white/60 text-sm mb-4">500+ employees</p>
                <ul className="text-white/60 text-sm space-y-2 text-left">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Everything in Growth</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Custom curriculum</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> SSO & security</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Dedicated CSM</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-wrap justify-center gap-6">
            {trustSignals.map((signal, index) => (
              <Badge key={index} className="bg-white/5 text-white/70 border-white/10 px-4 py-2">
                <CheckCircle2 className="w-4 h-4 mr-2 text-purple-400" />
                {signal}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Independence Philosophy */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            The Enablement Philosophy
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">
            The goal isn't training for training's sake.
            <br /><br />
            The goal is to <span className="text-purple-400">enable every team</span> to solve their own problems—so 
            they're never waiting on someone else's permission or backlog again.
            <br /><br />
            <span className="text-white/80">Faster prototyping. Reduced bottlenecks. Teams that ship.</span>
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            See what your team can build.
          </h2>
          <p className="text-white/60 mb-8">
            Schedule a demo to see how we can enable your teams.
          </p>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-8">
              <ProgramWaitlistForm
                programName="Enterprise Training"
                source="enterprise-demo-bottom"
                interestedProgram="enterprise"
                fields={formFields.slice(0, 3)}
                ctaText="Schedule Demo"
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="container mx-auto text-center text-white/40 text-sm">
          © 2025 Next Billion Lab. Building what's NEXT_
        </div>
      </footer>
    </div>
  );
};

export default Enterprise;