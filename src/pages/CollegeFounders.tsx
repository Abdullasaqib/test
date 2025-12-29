import { PublicHeader } from "@/components/layout/PublicHeader";
import { ProgramWaitlistForm } from "@/components/coming-soon/ProgramWaitlistForm";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SEOHead } from "@/components/seo/SEOHead";
import { 
  GraduationCap, 
  Rocket, 
  Users, 
  Lightbulb, 
  Target, 
  Zap,
  Calendar,
  Award,
  Code2,
  Briefcase,
  CheckCircle2,
  X,
  Sparkles
} from "lucide-react";

const CollegeFounders = () => {
  const formFields = [
    { name: "email", label: "Email", type: "email" as const, placeholder: "you@university.edu", required: true },
    { name: "name", label: "Full Name", type: "text" as const, placeholder: "Your name", required: true },
    { name: "university", label: "University", type: "text" as const, placeholder: "Your university", required: false },
    { name: "graduation_year", label: "Graduation Year", type: "select" as const, placeholder: "Select year", required: false, options: ["2025", "2026", "2027", "2028", "2029+"] },
    { name: "idea", label: "What would you build?", type: "textarea" as const, placeholder: "Describe your startup idea or the problem you want to solve...", required: false },
  ];

  const curriculumPreview = [
    { weeks: "1-2", title: "Opportunity Mapping", description: "Identify high-value problems in your network and validate market demand with real data" },
    { weeks: "3-4", title: "Rapid Validation", description: "Collect 100+ data points through customer interviews and landing page experiments" },
    { weeks: "5-7", title: "AI MVP Sprint", description: "Build your product using AI tools — ship in days, not months" },
    { weeks: "8-10", title: "Launch & Growth", description: "Go live, acquire first users, run growth experiments, and iterate based on feedback" },
    { weeks: "11-12", title: "Demo Day Ready", description: "Craft your pitch deck, practice with AI investors, and present at Demo Day" },
  ];

  const targetAudience = [
    { icon: Code2, title: "CS Students", description: "Turn your coding skills into a real product before you graduate" },
    { icon: Briefcase, title: "Business Majors", description: "Build products without waiting for a technical co-founder" },
    { icon: Users, title: "Student Leaders", description: "Transform your org's ideas into impactful products" },
    { icon: Lightbulb, title: "Side Project Builders", description: "Finally launch that idea that's been collecting dust" },
  ];

  const outcomes = [
    { icon: Rocket, metric: "A Shipped Product", description: "Live on the internet with real users" },
    { icon: Target, metric: "Real Validation", description: "Know if your idea has potential—before you commit years" },
    { icon: Award, metric: "AI Venture Certificate", description: "Level 4 credential for your LinkedIn" },
    { icon: Users, metric: "Founder Network", description: "Cohort of ambitious peers building alongside you" },
  ];

  const realCampusProjects = [
    { name: "Campus Carpool Matcher", impact: "89 students connected for rides home" },
    { name: "Exam Prep Community", impact: "340 students shared study resources" },
    { name: "Lost & Found App", impact: "23 items reunited with owners in first month" },
    { name: "Club Event Aggregator", impact: "Used by 5 student organizations" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0F1C]">
      <SEOHead
        title="College Founders Program | NEXT_ BILLION LAB"
        description="12 weeks to build and validate your startup idea. AI-powered entrepreneurship for college students ages 17-22. Learn if your idea has potential before you commit years."
        keywords="college startup, student entrepreneur, AI business, university founders, side project startup"
      />
      <PublicHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 mb-6">
                <Calendar className="w-3 h-3 mr-1" />
                Ages 17-22 • Launching Q2 2026
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Ship Something Real{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Before You Graduate
                </span>
              </h1>
              
              <p className="text-xl text-white/70 mb-4">
                12 weeks. Real AI tools. A shipped product you can point to.
              </p>
              <p className="text-lg text-white/50 mb-8">
                Learn if your idea has potential—before you commit years to it.
              </p>

              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-blue-400" />
                  <span className="text-white/60">For college students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  <span className="text-white/60">From $299</span>
                </div>
              </div>
            </div>

            {/* Waitlist Form */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 mb-3">
                    COMING Q2 2026
                  </Badge>
                  <h3 className="text-2xl font-bold text-white">Join the Waitlist</h3>
                  <p className="text-white/60 mt-2">Be first to know when enrollment opens</p>
                </div>
                <ProgramWaitlistForm
                  programName="College Founders"
                  source="college-founders-waitlist"
                  interestedProgram="college"
                  fields={formFields}
                  ctaText="Get Early Access"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            The Problem with Traditional Programs
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <Card className="bg-red-500/5 border-red-500/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-red-400 mb-3">❌ What They Teach</h3>
                <ul className="text-white/60 space-y-2 text-left">
                  <li>• Case studies from the 1990s</li>
                  <li>• Theoretical frameworks</li>
                  <li>• Group projects that go nowhere</li>
                  <li>• Business plans nobody reads</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-emerald-500/5 border-emerald-500/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-emerald-400 mb-3">✓ What We Teach</h3>
                <ul className="text-white/60 space-y-2 text-left">
                  <li>• Ship real products with AI tools</li>
                  <li>• Get real users and real feedback</li>
                  <li>• Build a portfolio that matters</li>
                  <li>• Learn if your idea has potential</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Curriculum Preview */}
      <section className="py-20 px-6 bg-gradient-to-b from-blue-900/10 to-transparent">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              12-Week Curriculum Preview
            </h2>
            <p className="text-white/60">From idea to shipped product in one semester</p>
          </div>

          <div className="space-y-4">
            {curriculumPreview.map((phase, index) => (
              <Card key={index} className="bg-white/5 border-white/10 hover:border-blue-500/30 transition-colors">
                <CardContent className="p-6 flex items-start gap-6">
                  <div className="bg-blue-500/20 text-blue-300 font-bold px-4 py-2 rounded-lg text-sm whitespace-nowrap">
                    Week {phase.weeks}
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

      {/* Who It's For */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Built For You
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetAudience.map((item, index) => (
              <Card key={index} className="bg-white/5 border-white/10 hover:border-blue-500/30 transition-colors text-center">
                <CardContent className="p-6">
                  <item.icon className="w-10 h-10 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-white/60 text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="py-20 px-6 bg-gradient-to-b from-purple-900/10 to-transparent">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            What You'll Walk Away With
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {outcomes.map((item, index) => (
              <Card key={index} className="bg-white/5 border-white/10">
                <CardContent className="p-6 text-center">
                  <item.icon className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                  <div className="text-xl font-bold text-white mb-1">{item.metric}</div>
                  <p className="text-white/60 text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Real Campus Projects */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            What Students Build
          </h2>
          <p className="text-white/60 text-center mb-12">Real projects with real impact</p>
          <div className="grid md:grid-cols-2 gap-6">
            {realCampusProjects.map((project, index) => (
              <Card key={index} className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Sparkles className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                  </div>
                  <p className="text-white/70">{project.impact}</p>
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
                    <span>You'll ship something real</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>You'll learn AI building tools you'll use forever</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>You'll get real user feedback</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>You'll know if your idea has potential</span>
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
                    <span>Revenue or paying customers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <span>That you should drop out</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <span>A billion-dollar company in 12 weeks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <span>Specific income or valuation numbers</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          <p className="text-center text-white/50 mt-8 max-w-2xl mx-auto">
            Some graduates discover their idea doesn't work—that's a success. 
            You learned in 12 weeks what might have taken years and thousands of dollars.
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
            The goal isn't to make money in 12 weeks. 
            <br /><br />
            The goal is to develop the skills and clarity to <span className="text-blue-400">build anything</span>—so 
            you're never dependent on waiting for permission again.
            <br /><br />
            <span className="text-white/80">Creative independence. Career resilience. Proof of capability.</span>
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Graduate with something to show for it.
          </h2>
          <p className="text-white/60 mb-8">
            Early access for the first 100 founders. Join the waitlist now.
          </p>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-8">
              <ProgramWaitlistForm
                programName="College Founders"
                source="college-founders-waitlist-bottom"
                interestedProgram="college"
                fields={formFields.slice(0, 2)}
                ctaText="Claim Your Spot"
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

export default CollegeFounders;