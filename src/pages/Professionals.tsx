import { PublicHeader } from "@/components/layout/PublicHeader";
import { ProgramWaitlistForm } from "@/components/coming-soon/ProgramWaitlistForm";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SEOHead } from "@/components/seo/SEOHead";
import { 
  Briefcase, 
  Clock, 
  Users, 
  Target,
  Calendar,
  Award,
  Zap,
  Lightbulb,
  CheckCircle2,
  X,
  Sparkles,
  ArrowRight,
  MessageSquare
} from "lucide-react";

const Professionals = () => {
  const formFields = [
    { name: "email", label: "Email", type: "email" as const, placeholder: "you@company.com", required: true },
    { name: "full_name", label: "Full Name", type: "text" as const, placeholder: "Your name", required: true },
    { name: "role_industry", label: "Current Role / Industry", type: "text" as const, placeholder: "e.g., Product Manager at SaaS", required: false },
    { name: "idea", label: "What would you build?", type: "textarea" as const, placeholder: "Describe the product you've been thinking about...", required: false },
  ];

  const curriculumPreview = [
    { week: "1", title: "Idea Crystallization", description: "Transform your domain expertise into a validated product concept with clear market potential" },
    { week: "2-3", title: "Lightning Validation", description: "Run rapid experiments to prove demand — landing pages, waitlists, and customer interviews" },
    { week: "4-5", title: "AI-Powered MVP", description: "Build your product using no-code and AI tools — ship what would take months in days" },
    { week: "6", title: "Launch & First Users", description: "Go live, acquire your first users, and get real feedback on your product" },
    { week: "7-8", title: "Iterate & Learn", description: "Analyze feedback, iterate on your product, and decide what's next based on real data" },
  ];

  const honestJourneys = [
    { 
      situation: "Had an idea for 3 years",
      outcome: "Built it in 8 weeks",
      reality: "50 beta users and real feedback — now I know exactly what to build next."
    },
    { 
      situation: "Wanted to test my consulting framework",
      outcome: "Launched to 3 pilot clients",
      reality: "Learned it needs more work, but I validated demand before committing more."
    },
    { 
      situation: "Built internal tool using course skills",
      outcome: "Got promoted at work",
      reality: "Didn't start a company — but proved I can build things. Career changed anyway."
    },
  ];

  const targetAudience = [
    { icon: Lightbulb, title: "Idea Carriers", description: "You've been thinking about this for years. Time to build it and see." },
    { icon: Users, title: "Domain Experts", description: "You see problems nobody else sees. Now you can solve them." },
    { icon: Briefcase, title: "Side Project Builders", description: "What if that weekend project became something real?" },
    { icon: Target, title: "Skills Seekers", description: "Learn to build — use it for your career, your side hustle, or just for yourself." },
  ];

  const features = [
    { icon: Clock, title: "8 Weeks Intensive", description: "Designed for busy professionals with full-time jobs" },
    { icon: MessageSquare, title: "AI Coach", description: "24/7 AI mentor to guide your building journey" },
    { icon: Target, title: "Cohort Accountability", description: "Small groups of ambitious peers pushing each other forward" },
    { icon: Sparkles, title: "Skills Focus", description: "Learn AI building tools you'll use for years" },
  ];

  const realProjects = [
    { name: "Internal dashboard", users: "12 colleagues", impact: "Saves 4 hours/week" },
    { name: "Landing page + waitlist", signups: "287 signups", status: "Still validating" },
    { name: "Chrome extension", users: "156 weekly active users", status: "Learning what they need" },
    { name: "Productized service pilot", clients: "3 pilot clients", status: "Testing pricing" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0F1C]">
      <SEOHead
        title="Professional Builders Program | NEXT_ BILLION LAB"
        description="8 weeks to validate the idea you've been carrying around. AI-powered building for working professionals. Learn if your idea has potential."
        keywords="professional builder, learn AI tools, side project, AI building, working professionals"
      />
      <PublicHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-600/10 via-transparent to-transparent" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 mb-6">
                <Calendar className="w-3 h-3 mr-1" />
                Idea Carriers • Domain Experts • Side Project Builders
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Learn to Build.{" "}
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  The Rest Is Up to You.
                </span>
              </h1>
              
              <p className="text-xl text-white/70 mb-4">
                8 weeks to validate the idea you've been carrying around—and learn if it has legs.
              </p>
              <p className="text-lg text-white/50 mb-8">
                You have 10 years of domain expertise. You don't have 10 years to learn to code.
                <br />
                <span className="text-amber-400/80">The tools have changed. Now you can build.</span>
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-400" />
                  <span className="text-white/60">8-week intensive</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-amber-400" />
                  <span className="text-white/60">AI Coach 24/7</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  <span className="text-white/60">From $749</span>
                </div>
              </div>
            </div>

            {/* Waitlist Form */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 mb-3">
                    COMING Q3 2026
                  </Badge>
                  <h3 className="text-2xl font-bold text-white">Reserve Your Spot</h3>
                  <p className="text-white/60 mt-2">Limited to 25 builders per cohort</p>
                </div>
                <ProgramWaitlistForm
                  programName="Professional Builders"
                  source="professionals-waitlist"
                  interestedProgram="professional"
                  fields={formFields}
                  ctaText="Join the Waitlist"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            What Makes This Different
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((item, index) => (
              <Card key={index} className="bg-white/5 border-white/10 hover:border-amber-500/30 transition-colors">
                <CardContent className="p-6 text-center">
                  <item.icon className="w-10 h-10 text-amber-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-white/60 text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Preview */}
      <section className="py-20 px-6 bg-gradient-to-b from-amber-900/10 to-transparent">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              8-Week Intensive Curriculum
            </h2>
            <p className="text-white/60">From idea to validated product while keeping your day job</p>
          </div>

          <div className="space-y-4">
            {curriculumPreview.map((phase, index) => (
              <Card key={index} className="bg-white/5 border-white/10 hover:border-amber-500/30 transition-colors">
                <CardContent className="p-6 flex items-start gap-6">
                  <div className="bg-amber-500/20 text-amber-300 font-bold px-4 py-2 rounded-lg text-sm whitespace-nowrap">
                    Week {phase.week}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{phase.title}</h3>
                    <p className="text-white/60">{phase.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Honest Journey Stories */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Real Journey Stories
          </h2>
          <p className="text-white/60 text-center mb-12">What's actually possible in 8 weeks</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {honestJourneys.map((story, index) => (
              <Card key={index} className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-white/60 text-sm">{story.situation}</span>
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                    <span className="text-amber-400 font-semibold text-sm">{story.outcome}</span>
                  </div>
                  <p className="text-white/80 italic text-sm">"{story.reality}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Real Projects */}
      <section className="py-20 px-6 bg-gradient-to-b from-orange-900/10 to-transparent">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            What Builders Ship
          </h2>
          <p className="text-white/60 text-center mb-12">Real projects, real impact — not revenue promises</p>
          <div className="grid md:grid-cols-2 gap-6">
            {realProjects.map((project, index) => (
              <Card key={index} className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                  </div>
                  <p className="text-white/70 text-sm">
                    {project.users || project.signups || project.clients} • {project.impact || project.status}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Built For You
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetAudience.map((item, index) => (
              <Card key={index} className="bg-white/5 border-white/10 hover:border-amber-500/30 transition-colors text-center">
                <CardContent className="p-6">
                  <item.icon className="w-10 h-10 text-amber-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-white/60 text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Honest Expectations */}
      <section className="py-20 px-6 bg-gradient-to-b from-amber-900/5 to-transparent">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Honest Expectations
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-emerald-500/5 border-emerald-500/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-emerald-400 mb-4">What We Promise</h3>
                <ul className="text-white/70 space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>You will ship a working product</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>You will learn AI building tools you'll use forever</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>You will get real user feedback</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>You will know if your idea has potential</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-red-500/5 border-red-500/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-red-400 mb-4">What We Don't Promise</h3>
                <ul className="text-white/70 space-y-3">
                  <li className="flex items-start gap-2">
                    <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <span>Revenue or profit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <span>Quitting your job</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <span>A successful business (most ideas need iteration)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <span>Specific income numbers</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          <p className="text-center text-white/50 mt-8 max-w-2xl mx-auto">
            Some graduates discover their idea doesn't work—that's a success. 
            You learned in 8 weeks what might have taken years and thousands of dollars.
          </p>
        </div>
      </section>

      {/* Independence Philosophy */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            The Independence Philosophy
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">
            The goal isn't to make money in 8 weeks. 
            <br /><br />
            The goal is to develop the skills and clarity to <span className="text-amber-400">build anything</span>—so 
            you're never dependent on someone else's permission again.
            <br /><br />
            <span className="text-white/80">Creative independence. Career resilience. Proof of capability.</span>
          </p>
        </div>
      </section>

      {/* Certificate */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <Award className="w-16 h-16 text-amber-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            AI Builder Pro Certificate
          </h2>
          <p className="text-white/60 mb-6">
            Level 5 professional credential recognizing your ability to build AI-powered products.
            Share on LinkedIn and prove you can build.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge className="bg-white/10 text-white/80 border-white/20 px-4 py-2">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              LinkedIn Shareable
            </Badge>
            <Badge className="bg-white/10 text-white/80 border-white/20 px-4 py-2">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Verifiable Credential
            </Badge>
            <Badge className="bg-white/10 text-white/80 border-white/20 px-4 py-2">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Portfolio Included
            </Badge>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Stop thinking about it. Start building it.
          </h2>
          <p className="text-white/60 mb-8">
            Limited to 25 builders per cohort. Reserve your spot now.
          </p>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-8">
              <ProgramWaitlistForm
                programName="Professional Builders"
                source="professionals-waitlist-bottom"
                interestedProgram="professional"
                fields={formFields.slice(0, 2)}
                ctaText="Reserve My Spot"
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

export default Professionals;