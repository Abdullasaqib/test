import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { CursorWordmark } from "@/components/ui/cursor-wordmark";
import { SEOHead } from "@/components/seo/SEOHead";
import { School, Users, CheckCircle2, ArrowRight, GraduationCap, BarChart3, BookOpen, Award, Globe, Sparkles, Building2, FileText, MessageSquare, Wand2, Target, Zap, AlertTriangle, TrendingUp, Clock, ShieldCheck, Mic, Send, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
export default function SchoolsPage() {
  const navigate = useNavigate();
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    school: "",
    role: "",
    studentCount: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.school.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Basic email validation
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(contactForm.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    setIsSubmitting(true);
    try {
      const {
        error
      } = await supabase.from("leads").insert({
        name: contactForm.name.trim(),
        email: contactForm.email.trim().toLowerCase(),
        source: "schools_contact",
        notes: JSON.stringify({
          school: contactForm.school,
          role: contactForm.role,
          studentCount: contactForm.studentCount,
          message: contactForm.message
        })
      });
      if (error) throw error;
      toast.success("Thank you! We'll be in touch within 24 hours.");
      setContactForm({
        name: "",
        email: "",
        school: "",
        role: "",
        studentCount: "",
        message: ""
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error("Something went wrong. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Pricing matches database tiers: Pilot $9, Standard $45, Volume $35, Enterprise $30
  const licenseTiers = [{
    name: "Pilot Program",
    students: "Up to 30 students",
    price: "$270",
    perStudent: "$9/student",
    highlight: true,
    badge: "⚡ First 5 Schools Only",
    features: ["Full 12-week curriculum", "Teacher training (2 hours)", "Admin dashboard access", "Student certificates", "Case study participation required"]
  }, {
    name: "Standard",
    students: "31-100 students",
    price: "From $4,500",
    perStudent: "$45/student",
    highlight: false,
    features: ["Full curriculum access", "Teacher training", "Admin dashboard", "Student certificates", "Email support"]
  }, {
    name: "Volume",
    students: "101-500 students",
    price: "From $3,535",
    perStudent: "$35/student",
    highlight: false,
    features: ["Everything in Standard", "Priority support", "Quarterly progress reports", "Parent communication toolkit", "Custom branding"]
  }, {
    name: "Enterprise",
    students: "500+ students",
    price: "Custom",
    perStudent: "$30/student",
    highlight: false,
    features: ["Everything in Volume", "Dedicated account manager", "On-site training", "Custom curriculum modules", "White-label options"]
  }];
  const globalRace = [{
    country: "🇸🇬 Singapore",
    stat: "Mandatory",
    desc: "Youth entrepreneurship in every school"
  }, {
    country: "🇮🇱 Israel",
    stat: "#1",
    desc: "Startups per capita globally"
  }, {
    country: "🇪🇪 Estonia",
    stat: "Age 6",
    desc: "Digital-first education begins"
  }, {
    country: "🇨🇳 China",
    stat: "200M",
    desc: "Students in AI education programs"
  }];
  const whatSchoolsGet = [{
    icon: BookOpen,
    title: "12-Week AI Entrepreneurship Curriculum",
    description: "Every student builds and launches a real product. Not a poster. Not a presentation. A real business."
  }, {
    icon: GraduationCap,
    title: "Complete Teacher Training",
    description: "2-hour training session. No tech expertise required. We coach, teachers facilitate."
  }, {
    icon: BarChart3,
    title: "Real-Time Analytics Dashboard",
    description: "Track every student's progress. Skills mastered. Missions completed. Engagement levels. Parent-ready reports."
  }, {
    icon: Award,
    title: "Demo Day + Certificates",
    description: "Students pitch their businesses. Parents invited. Official certificates for portfolios and transcripts."
  }, {
    icon: Wand2,
    title: "Vibe Coding: The New Literacy",
    description: "Students build apps by describing them. No syntax. No frustration. This is how the next generation will create."
  }, {
    icon: ShieldCheck,
    title: "AI-Safe, Age-Appropriate",
    description: "Curated AI tools. Privacy-first design. Built for ages 9-16. You can trust every interaction."
  }];
  return <div className="min-h-screen bg-[#0A0F1C]">
      <SEOHead title="For Schools & Governments - AI Entrepreneurship Curriculum" description="Bring world-class AI entrepreneurship education to your school. 12-week curriculum, teacher training, student certificates. First 5 schools get free pilot." canonical="/schools" keywords="school AI curriculum, government education partnership, entrepreneurship for schools, NEXT certified schools" />
      <PublicHeader />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-gold/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <Badge className="mb-8 bg-white/10 text-white border-white/20 backdrop-blur-sm px-4 py-2">
            <School className="w-4 h-4 mr-2" />
            For Schools & Government
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
            In 10 years, half of today's jobs 
            <span className="block mt-2 bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
              won't exist.
            </span>
          </h1>

          <Badge className="mb-6 bg-amber-500/20 text-amber-400 border-amber-500/40 text-sm px-6 py-2">
            THE ONLY SCHOOL AI CURRICULUM CERTIFIED BY BASE44
          </Badge>
          
          <p className="text-xl md:text-2xl text-white/70 mb-4 max-w-3xl mx-auto font-medium">
            Schools that move first will produce founders.
          </p>
          <p className="text-xl md:text-2xl text-white/70 mb-10 max-w-3xl mx-auto">
            Schools that wait will explain why they didn't.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-gold hover:bg-gold-light text-background font-semibold shadow-lg shadow-gold/25 text-lg px-8" onClick={() => window.location.href = "mailto:partnerships@nextbillionlab.com"}>
              <MessageSquare className="mr-2 w-5 h-5" />
              Request Partnership
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 text-lg px-8" onClick={() => navigate("/schools/curriculum")}>
              <BookOpen className="mr-2 w-5 h-5" />
              View Curriculum
            </Button>
          </div>
        </div>
      </section>

      {/* Urgency Banner */}
      <section className="py-4 bg-gold text-background">
        <div className="container mx-auto text-center px-4">
          <p className="font-bold text-lg">
            <Zap className="w-5 h-5 inline mr-2" />
            First 5 Schools Get FREE Pilot Program — Case Study Participation Required — Limited Spots Remaining
          </p>
        </div>
      </section>

      {/* The Stakes Section */}
      <section className="py-20 px-4 bg-[#0D1321]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-red-500/20 text-red-400 border-red-500/30">
              <AlertTriangle className="w-3 h-3 mr-1" />
              The Stakes
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              This isn't about getting ahead.
            </h2>
            <p className="text-2xl text-white/70">
              It's about not getting left behind.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {globalRace.map((item, i) => <Card key={i} className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-primary/50 transition-all">
                <div className="p-6 text-center space-y-2">
                  <div className="text-lg text-white/60 font-medium">{item.country}</div>
                  <div className="text-3xl md:text-4xl font-bold text-primary">{item.stat}</div>
                  <div className="text-sm text-white/50">{item.desc}</div>
                </div>
              </Card>)}
          </div>

          <div className="text-center">
            <p className="text-xl text-white/80 font-medium mb-2">
              These countries aren't waiting for permission.
            </p>
            <p className="text-lg text-white/60">
              They're producing the next generation of founders while others debate curriculum changes.
            </p>
          </div>
        </div>
      </section>

      {/* Why NEXT_ Section */}
      <section className="py-20 px-4 bg-[#0A0F1C]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Why <CursorWordmark word="NEXT" size="xl" className="text-white inline" cursorClassName="text-gold" />
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              We don't partner with every school. And we won't apologize for it.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8 hover:border-primary/50 transition-all">
              <Target className="w-12 h-12 text-gold mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">Every Student Launches Something Real</h3>
              <p className="text-white/60 text-lg">
                Not a poster. Not a pitch deck gathering dust. A real product with real users. 
                That's the standard. There is no participation trophy.
              </p>
            </Card>
            
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8 hover:border-primary/50 transition-all">
              <Wand2 className="w-12 h-12 text-gold mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">Vibe Coding: The New Literacy</h3>
              <p className="text-white/60 text-lg">
                Your students will build apps by describing them. No syntax. No frustration. 
                This is how the next generation will create—and we're teaching it now.
              </p>
            </Card>
            
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8 hover:border-primary/50 transition-all">
              <GraduationCap className="w-12 h-12 text-gold mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">Zero Teacher Expertise Required</h3>
              <p className="text-white/60 text-lg">
                Our platform coaches. Teachers facilitate. 2-hour training and they're ready. 
                We designed it for busy schools, not tech academies.
              </p>
            </Card>
            
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8 hover:border-primary/50 transition-all">
              <BarChart3 className="w-12 h-12 text-gold mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">Measurable, Reportable Outcomes</h3>
              <p className="text-white/60 text-lg">
                Real-time dashboards. Skills tracked. Progress visible. 
                Parent reports that actually say something. No vague "participation" metrics.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Base44 Curriculum Partner Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#0D1321] to-[#0A0F1C]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-amber-500/20 text-amber-400 border-amber-500/30">
              CURRICULUM PARTNER
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Certified by Base 44
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              The only student AI curriculum verified by Base44 — the platform trusted by universities worldwide.
            </p>
          </div>

          <Card className="bg-white/5 backdrop-blur-sm border-amber-500/30 p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  University-Grade Pedagogy for Ages 9-16
                </h3>
                <p className="text-lg text-white/70 mb-6">
                  Base44's BASE Framework is used by top universities globally. We're the only program bringing this rigorous methodology to K-12 students.
                </p>
                <ul className="space-y-3">
                  {["Same framework taught at universities", "Pedagogy tested across thousands of builders", "Credential recognized by institutions", "$48 real building credits per student"].map((item, i) => <li key={i} className="flex items-center gap-3 text-white/80">
                      <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
                      <span>{item}</span>
                    </li>)}
                </ul>
              </div>
              <div className="text-center p-8 bg-amber-500/10 rounded-xl border border-amber-500/20">
                <Award className="w-16 h-16 text-amber-400 mx-auto mb-4" />
                <p className="text-2xl font-bold text-white mb-2">Base44-Certified</p>
                <p className="text-white/60">
                  Every student earns a credential certified by Base44
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Research Methodology Section */}
      <section className="py-20 px-4 bg-[#0A0F1C]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-500/20 text-blue-400 border-blue-500/30">
              <GraduationCap className="w-3 h-3 mr-1" />
              Research Foundation
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Backed by Learning Science
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Our curriculum is built on proven pedagogical frameworks, not marketing hype.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[{
            name: "Bloom's Taxonomy",
            desc: "Measurable learning objectives at every level"
          }, {
            name: "Kolb's Experiential",
            desc: "Learn by doing, not just watching"
          }, {
            name: "Zone of Proximal Development",
            desc: "Scaffolded challenges that grow with students"
          }, {
            name: "Growth Mindset",
            desc: "Failure is part of the learning process"
          }].map((framework, i) => <Card key={i} className="bg-white/5 backdrop-blur-sm border-white/10 p-6 hover:border-blue-500/50 transition-all">
                <h4 className="font-bold text-white mb-2">{framework.name}</h4>
                <p className="text-sm text-white/60">{framework.desc}</p>
              </Card>)}
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10" onClick={() => navigate("/methodology")}>
              <BookOpen className="w-4 h-4 mr-2" />
              View Full Methodology
            </Button>
          </div>
        </div>
      </section>

      {/* THE TANK Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#0D1321] to-[#0A0F1C]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gold/20 text-gold border-gold/30">
              <Mic className="w-3 h-3 mr-1" />
              First-of-Its-Kind
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              THE TANK — AI Shark Tank for Students
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Speaking is a thinking problem. THE TANK solves BOTH.
            </p>
          </div>

          <Card className="bg-white/5 backdrop-blur-sm border-gold/30 p-8 md:p-12 mb-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  The Same Simulation That Stops Brilliant Kids From Speaking Up...
                </h3>
                <p className="text-lg text-white/70 mb-6">
                  Now becomes their <span className="text-gold font-semibold">superpower</span>.
                </p>
                <ul className="space-y-3">
                  {["5 AI investor personas with distinct personalities", "Real-time scoring on 5 dimensions", "Unlimited practice from their safe space", "Progress from 'Nervous Founder' to 'Shark Tamer'"].map((item, i) => <li key={i} className="flex items-center gap-3 text-white/80">
                      <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0" />
                      <span>{item}</span>
                    </li>)}
                </ul>
              </div>
              <div className="text-center p-8 bg-gold/10 rounded-xl border border-gold/20">
                <Mic className="w-16 h-16 text-gold mx-auto mb-4" />
                <p className="text-2xl font-bold text-white mb-2">Safe Space → World-Ready</p>
                <p className="text-white/60">
                  Students practice from their bedroom. Graduate ready for global stages.
                </p>
              </div>
            </div>
          </Card>

          <p className="text-center text-lg text-white/60">
            <span className="text-gold font-semibold">No student left behind</span> because they were too shy to speak up.
          </p>
        </div>
      </section>

      {/* Skill Intelligence Section */}
      <section className="py-20 px-4 bg-[#0A0F1C]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              <BarChart3 className="w-3 h-3 mr-1" />
              School Administrator Dashboard
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Skill Intelligence — Real Progress, Not Just Grades
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Track 8 skill categories across every student. Identify at-risk learners before they fall behind.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            {[{
            skill: "Problem Solving",
            icon: "🧩"
          }, {
            skill: "Communication",
            icon: "💬"
          }, {
            skill: "AI Fluency",
            icon: "🤖"
          }, {
            skill: "Creativity",
            icon: "💡"
          }, {
            skill: "Resilience",
            icon: "💪"
          }, {
            skill: "Collaboration",
            icon: "🤝"
          }, {
            skill: "Critical Thinking",
            icon: "🎯"
          }, {
            skill: "Leadership",
            icon: "👑"
          }].map((item, i) => <Card key={i} className="bg-white/5 backdrop-blur-sm border-white/10 p-4 text-center hover:border-primary/50 transition-all">
                <span className="text-2xl mb-2 block">{item.icon}</span>
                <p className="text-sm font-medium text-white">{item.skill}</p>
              </Card>)}
          </div>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <AlertTriangle className="w-10 h-10 text-gold mx-auto mb-3" />
                <h4 className="font-bold text-white mb-2">At-Risk Indicators</h4>
                <p className="text-sm text-white/60">Identify struggling students before they disengage</p>
              </div>
              <div className="text-center">
                <TrendingUp className="w-10 h-10 text-primary mx-auto mb-3" />
                <h4 className="font-bold text-white mb-2">Progress Tracking</h4>
                <p className="text-sm text-white/60">Weekly reports for teachers and parents</p>
              </div>
              <div className="text-center">
                <Users className="w-10 h-10 text-primary mx-auto mb-3" />
                <h4 className="font-bold text-white mb-2">Smart Grouping</h4>
                <p className="text-sm text-white/60">AI-powered team recommendations</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* What Schools Get */}
      <section className="py-20 px-4 bg-[#0D1321]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              What Your School Gets
            </h2>
            <p className="text-xl text-white/60">
              Everything you need to offer world-class AI entrepreneurship education.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatSchoolsGet.map((item, index) => {
            const Icon = item.icon;
            return <Card key={index} className="bg-white/5 backdrop-blur-sm border-white/10 p-6 hover:border-primary/50 transition-all">
                  <Icon className="w-10 h-10 text-primary mb-4" />
                  <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-white/60">{item.description}</p>
                </Card>;
          })}
          </div>
        </div>
      </section>

      {/* Government Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#0A0F1C] to-[#0D1321]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              <Building2 className="w-3 h-3 mr-1" />
              For Ministries of Education
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Curriculum reform takes years.
            </h2>
            <p className="text-2xl text-white/70 mb-2">
              We're offering months.
            </p>
          </div>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Clock className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-white mb-2">90 Days</h3>
                <p className="text-white/60">From contract to classrooms. We move fast because the world isn't waiting.</p>
              </div>
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-white mb-2">1M+ Ready</h3>
                <p className="text-white/60">Our platform is designed to scale. From 50 students to 50,000. Same quality.</p>
              </div>
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-white mb-2">Full Visibility</h3>
                <p className="text-white/60">National dashboards. District comparisons. Student outcomes. Real data.</p>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <p className="text-lg text-white/80 mb-6">
                Nation-states are competing for the next generation of AI founders. 
                <span className="text-gold font-semibold"> Will your country lead or follow?</span>
              </p>
              <Button size="lg" className="bg-gold hover:bg-gold-light text-background font-semibold shadow-lg shadow-gold/25" onClick={() => window.location.href = "mailto:government@nextbillionlab.com"}>
                <Building2 className="mr-2 w-5 h-5" />
                Schedule Government Briefing
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-[#0D1321]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              No hidden fees. No surprise costs. Full curriculum and training included in every plan.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {licenseTiers.map((tier, index) => <Card key={index} className={`p-6 relative transition-all ${tier.highlight ? 'bg-gold/10 border-2 border-gold shadow-lg shadow-gold/20' : 'bg-white/5 border-white/10 hover:border-primary/50'}`}>
                {tier.badge && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-background font-bold whitespace-nowrap">
                    {tier.badge}
                  </Badge>}
                <h3 className="text-xl font-bold text-white mb-2 mt-2">{tier.name}</h3>
                <div className="text-3xl font-bold text-primary mb-1">{tier.price}</div>
                <div className="text-sm text-white/50 mb-2">{tier.perStudent}</div>
                <div className="text-sm text-white/60 mb-4 pb-4 border-b border-white/10">{tier.students}</div>
                <ul className="space-y-2">
                  {tier.features.map((feature, i) => <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>)}
                </ul>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 px-4 bg-[#0A0F1C]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gold/20 text-gold border-gold/30">
              <MessageSquare className="w-3 h-3 mr-1" />
              Get Started
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Request a School License
            </h2>
            <p className="text-lg text-white/60">
              Tell us about your school and we'll get back to you within 24 hours with a customized proposal.
            </p>
          </div>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8">
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Your Name <span className="text-red-400">*</span>
                  </Label>
                  <Input id="name" placeholder="John Smith" value={contactForm.name} onChange={e => setContactForm(prev => ({
                  ...prev,
                  name: e.target.value
                }))} className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-gold" maxLength={100} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email Address <span className="text-red-400">*</span>
                  </Label>
                  <Input id="email" type="email" placeholder="john@school.edu" value={contactForm.email} onChange={e => setContactForm(prev => ({
                  ...prev,
                  email: e.target.value
                }))} className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-gold" maxLength={255} required />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="school" className="text-white">
                    School / Organization <span className="text-red-400">*</span>
                  </Label>
                  <Input id="school" placeholder="Springfield Academy" value={contactForm.school} onChange={e => setContactForm(prev => ({
                  ...prev,
                  school: e.target.value
                }))} className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-gold" maxLength={200} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-white">
                    Your Role
                  </Label>
                  <Input id="role" placeholder="Principal, Curriculum Director, etc." value={contactForm.role} onChange={e => setContactForm(prev => ({
                  ...prev,
                  role: e.target.value
                }))} className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-gold" maxLength={100} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="studentCount" className="text-white">
                  Estimated Number of Students
                </Label>
                <Input id="studentCount" placeholder="e.g., 50, 100-200, 500+" value={contactForm.studentCount} onChange={e => setContactForm(prev => ({
                ...prev,
                studentCount: e.target.value
              }))} className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-gold" maxLength={50} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-white">
                  Questions or Comments
                </Label>
                <Textarea id="message" placeholder="Tell us about your goals, timeline, or any questions you have..." value={contactForm.message} onChange={e => setContactForm(prev => ({
                ...prev,
                message: e.target.value
              }))} className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-gold min-h-[120px]" maxLength={1000} />
              </div>

              <Button type="submit" size="lg" className="w-full bg-gold hover:bg-gold-light text-background font-semibold shadow-lg shadow-gold/25" disabled={isSubmitting}>
                {isSubmitting ? <>
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                    Sending...
                  </> : <>
                    <Send className="mr-2 w-5 h-5" />
                    Request Information
                  </>}
              </Button>

              <p className="text-center text-sm text-white/40">
                We'll respond within 24 hours. Your information is never shared.
              </p>
            </form>
          </Card>
        </div>
      </section>

      {/* Geographic Focus */}
      <section className="py-16 px-4 bg-[#0A0F1C]">
        <div className="max-w-5xl mx-auto text-center">
          <Globe className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">Currently Launching In</h2>
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            <Badge variant="outline" className="text-lg px-4 py-2 border-white/20 text-white">
              <Building2 className="w-4 h-4 mr-2" />
              Dubai, UAE
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2 border-white/20 text-white">
              <Building2 className="w-4 h-4 mr-2" />
              Abu Dhabi, UAE
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2 border-white/20 text-white">
              <Building2 className="w-4 h-4 mr-2" />
              Saudi Arabia
            </Badge>
          </div>
          <p className="text-white/50">
            Interested from another region? <span className="text-primary cursor-pointer hover:underline" onClick={() => window.location.href = "mailto:partnerships@nextbillionlab.com"}>Contact us</span> — we're expanding fast.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#0D1321] to-[#0A0F1C]">
        <div className="max-w-4xl mx-auto text-center">
          <CursorWordmark word="NEXT" size="hero" className="text-white mb-8" cursorClassName="text-gold" />
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Be the school that produces founders.
          </h2>
          <p className="text-xl text-white/60 mb-4">
            Or be the school that explains why it didn't.
          </p>
          <p className="text-lg text-white/40 mb-10">
            First 5 pilot schools launch January 2026. After that, full pricing applies.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-gold hover:bg-gold-light text-background font-semibold shadow-lg shadow-gold/25 text-lg px-8" onClick={() => window.location.href = "mailto:partnerships@nextbillionlab.com"}>
              <MessageSquare className="mr-2 w-5 h-5" />
              Request Partnership
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 text-lg px-8" onClick={() => navigate("/schools/curriculum-guide")}>
              View Curriculum Guide
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
          
          <p className="mt-8 text-white/40 text-sm">
            partnerships@nextbillionlab.com • government@nextbillionlab.com
          </p>
        </div>
      </section>
    </div>;
}