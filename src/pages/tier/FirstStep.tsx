import { useNavigate } from "react-router-dom";
import { Award, BookOpen, Brain, AlertTriangle, Lightbulb, Users, Target, Zap, ArrowRight, Check, Sparkles, Clock, GraduationCap, CheckCircle2, School, FileText, BarChart3, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SEOHead } from "@/components/seo";
import { PublicHeader, PublicFooter } from "@/components/layout";
import { TeacherSupportSection, LiveWebinarsSection, MasterclassSchedule, CommunityPromiseSection } from "@/components/schools";
import base44Logo from "@/assets/base44-logo-white.svg";
const FirstStep = () => {
  const navigate = useNavigate();
  const curriculumPart1 = [{
    lesson: 1,
    title: "AI Is Smart But Not Human",
    description: "Understand AI's real capabilities and limits",
    duration: "~45 min",
    objectives: ["Explain how AI learns from patterns (can describe 2+ methods)", "Identify 3 ways AI differs from human intelligence", "Recognize when AI might make mistakes"]
  }, {
    lesson: 2,
    title: "Clear Instructions, Better Results",
    description: "Master prompt engineering fundamentals",
    duration: "~45 min",
    objectives: ["Write clear, specific prompts that get better results", "Apply the 4-part prompt structure framework", "Compare weak vs strong prompts and explain differences"]
  }, {
    lesson: 3,
    title: "Catch the AI Mistake",
    description: "Develop critical thinking AI can't replace",
    duration: "~45 min",
    objectives: ["Identify AI hallucinations with 80%+ accuracy", "Apply 3 verification techniques for AI outputs", "Explain why AI confidently states false information"]
  }, {
    lesson: 4,
    title: "Make It Better Step by Step",
    description: "Learn iterative improvement",
    duration: "~45 min",
    objectives: ["Use iterative prompting to improve AI outputs", "Apply feedback loops to refine results", "Transform a 3/10 response into an 8/10 response"]
  }, {
    lesson: 5,
    title: "Humans Decide, AI Helps",
    description: "Build judgment skills for the AI age",
    duration: "~45 min",
    objectives: ["Make ethical decisions about when to use AI", "Identify 3+ situations where human judgment is essential", "Apply decision framework: 'What should AI do vs what should I do?'"]
  }, {
    lesson: 6,
    title: "Build Something Real",
    description: "Apply everything in a capstone project",
    duration: "~45 min",
    objectives: ["Complete a real-world project using AI tools", "Demonstrate all 5 skills from previous lessons", "Create a shareable portfolio piece"]
  }];
  const curriculumPart2 = [{
    module: 1,
    title: "Getting Started with Prompting",
    lessonPlan: "Build Better Prompts",
    description: "The 4 keys to writing effective prompts with the BASE framework",
    duration: "~45 min",
    content: [
      { type: "lesson", title: "Build Better Prompts" }
    ],
    takeaways: [
      "The 4 keys to writing effective prompts with the BASE framework",
      "Why clarity and structure matter",
      "How better prompts = better apps"
    ]
  }, {
    module: 2,
    title: "How Prompts Improve with Practice",
    lessonPlan: "Level Up Your Prompts",
    description: "Compare weak vs. strong prompts and transform results",
    duration: "~60 min",
    content: [
      { type: "lesson", title: "Level Up Your Prompts", description: "Compare weak vs. strong prompts and see how small changes in detail and structure transform results" },
      { type: "activity", title: "Prompt Check-Up", description: "Test your knowledge with a quick interactive activity to spot the difference between strong and weak prompts" },
      { type: "homework", title: "Prompt Makeover", description: "Take a weak prompt and improve it step by step until it becomes a strong, usable one" }
    ],
    takeaways: [
      "How to analyze prompts critically",
      "Practical strategies for leveling up your own prompts"
    ]
  }, {
    module: 3,
    title: "From Prompt to Prototype",
    lessonPlan: "Bring Your Prompt to Life",
    description: "Build your first real app with Base44",
    duration: "~90 min",
    content: [
      { type: "lesson", title: "Bring Your Prompt to Life", description: "Use a step-by-step guide to draft your own app prompt. Then watch how Base44 transforms prompts into working app prototypes" },
      { type: "homework", title: "Complete the Prompt Builder Worksheet" },
      { type: "watch", title: "Base44 Tutorial Video" },
      { type: "homework", title: "Apply + Reflect — Your First App Prompt", description: "Write and test your own prompt in Base44. Publish your prototype, then reflect on what worked, what you'd improve, and how prompting skills transfer to other projects" }
    ],
    takeaways: [
      "A complete, tested prompt of your own design",
      "Experience turning a prompt into a live prototype",
      "Confidence using the Smart Prompting Framework to build apps that are useful and user-ready"
    ]
  }, {
    module: 4,
    title: "Conclusions",
    lessonPlan: "How to Take Vibe Coding Further",
    description: "What comes next on your builder journey",
    duration: "~30 min",
    content: [
      { type: "lesson", title: "How to Take Vibe Coding Further" }
    ],
    takeaways: [
      "Clear path to continue your AI building journey",
      "Next steps for AI Builder certification"
    ]
  }];
  const ageTracks = [{
    name: "EXPLORER",
    ages: "Ages 9-11",
    description: "Builds curiosity and healthy skepticism about AI's limits",
    projects: ["Pet tracker", "Joke generator", "Virtual pet helper"],
    color: "amber",
    icon: "🎮"
  }, {
    name: "CREATOR",
    ages: "Ages 12-14",
    description: "Develops structured reasoning and verification habits",
    projects: ["Study helper", "Club manager", "Event planner"],
    color: "blue",
    icon: "📱"
  }, {
    name: "FOUNDER",
    ages: "Ages 15-16",
    description: "Builds professional judgment and strategic thinking",
    projects: ["Landing pages", "MVPs", "Business dashboards"],
    color: "purple",
    icon: "🚀"
  }];
  const whatsIncluded = [{
    icon: BookOpen,
    text: "University-Grade Curriculum (BASE Framework)"
  }, {
    icon: Users,
    text: "Age-appropriate content (3 learning tracks)"
  }, {
    icon: CheckCircle2,
    text: "Quiz after every lesson"
  }, {
    icon: Award,
    text: "Base44-Verified Credential"
  }, {
    icon: Sparkles,
    text: "$48 Base44 building credits"
  }, {
    icon: Target,
    text: "LinkedIn-shareable certificate"
  }];
  const personas = ["Students who want to CREATE, not just consume", "Young people who refuse to wait for permission", "Future founders who believe they can change the world", "Anyone who believes opportunity shouldn't depend on zip code"];
  return <>
      <SEOHead title="One Million Students. One Mission. | NEXT_ × Base44" description="NEXT_ Billion Lab and Base44 have committed to certify one million students in AI Foundations by December 2026. Every student. Every country. Free." />
      <div className="min-h-screen bg-background">
        <PublicHeader />

        {/* Hero - THE MISSION */}
        <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-br from-[#0A0F1C] via-[#1a1a2e] to-[#0A0F1C]">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <Badge className="bg-white/10 text-white/80 border-white/20 text-sm px-4 py-1.5">
                THE MISSION
              </Badge>
              
              {/* Partner Logos */}
              <div className="flex items-center justify-center gap-6">
                <span className="text-3xl md:text-4xl font-bold text-white tracking-tight">NEXT_</span>
                <span className="text-white/40 text-2xl">×</span>
                <img src={base44Logo} alt="Base44" className="h-8 md:h-10" />
              </div>

              {/* Base44 Verified Badge */}
              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/40 text-sm px-6 py-2">
                THE ONLY STUDENT AI CREDENTIAL CERTIFIED BY BASE44
              </Badge>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                One Million Students.<br />
                <span className="text-amber-400">One Year.</span><br />
                One Chance to Change Everything.
              </h1>
              
              <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                NEXT_ Billion Lab and Base44 have committed to certify one million students 
                in AI Foundations by December 2026. Every student. Every country. Free.
              </p>

              <Button size="lg" onClick={() => navigate('/signup')} className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-lg px-10 py-7 h-auto">
                Join the Mission <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Partnership Statement */}
        <section className="py-20 bg-card border-y border-border/50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <blockquote className="text-center space-y-6">
                <p className="text-xl md:text-2xl lg:text-3xl text-foreground/90 leading-relaxed font-light italic">
                  "For the first time in history, a child in Lagos has access to the same 
                  AI tools as a child in London.
                </p>
                <p className="text-xl md:text-2xl lg:text-3xl text-foreground/90 leading-relaxed font-light italic">
                  The question is: will they know how to use them?
                </p>
                <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
                  That's why we're giving every student a complete AI education — and $48 
                  in real building credits to create their first app.
                </p>
                <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
                  This isn't charity. It's belief. We believe the next great founder, the 
                  next breakthrough, the next billion-dollar idea could come from anywhere. 
                  We're betting on it."
                </p>
                <footer className="pt-6 flex items-center justify-center gap-4">
                  <span className="text-muted-foreground">—</span>
                  <span className="font-semibold text-foreground">NEXT_ Billion Lab</span>
                  <span className="text-muted-foreground">×</span>
                  <span className="font-semibold text-foreground">Base44</span>
                </footer>
              </blockquote>
            </div>
          </div>
        </section>

        {/* Age Tracks Section - NEW */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30 mb-4">
                FOR EVERY LEARNER
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Three Learning Tracks
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Ages 9-16 • Same 10 lessons • Age-appropriate content<br />
                Automatic track selection based on student age.
              </p>
            </div>

            <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
              {ageTracks.map(track => <Card key={track.name} className="border-border/50 bg-card/50 overflow-hidden">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{track.icon}</span>
                      <div>
                        <h3 className="font-bold text-foreground text-lg">{track.name}</h3>
                        <p className="text-sm text-amber-400 font-medium">{track.ages}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {track.description}
                    </p>
                    <div className="pt-3 border-t border-border/30">
                      <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Sample Projects:</p>
                      <div className="flex flex-wrap gap-2">
                        {track.projects.map((project, i) => <Badge key={i} variant="outline" className="text-xs text-foreground/70">
                            {project}
                          </Badge>)}
                      </div>
                    </div>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </section>

        {/* The Stakes - Why This Matters */}
        <section className="py-20 bg-card/30 border-y border-border/50">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground">
                The Gap That's Widening
              </h2>
              <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
                <p>
                  By 2030, AI will have transformed every industry.
                </p>
                <p>
                  The students who understand how to <span className="text-foreground font-semibold">THINK</span> with AI will lead.<br />
                  The students who only learn to use tools will follow.
                </p>
                <p>
                  The AI landscape changes every year. We partner with schools to teach the thinking 
                  that adapts — the judgment that knows when AI is wrong, and the skills that lead to financial independence.
                </p>
                <p className="text-foreground font-medium">
                  We're teaching the thinking that creates the tools.<br />
                  The judgment that knows when AI is wrong.<br />
                  The skills that lead to financial independence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Curriculum - 10 Lessons with Details */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                The Curriculum That Changes Everything
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                University-grade AI education. BASE Framework methodology. Proven pedagogy trusted by top institutions worldwide.
              </p>
              <div className="flex items-center justify-center gap-6 mt-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  ~45 min each
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  Quiz included
                </span>
                <span className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-amber-400" />
                  Measurable outcomes
                </span>
              </div>
            </div>

            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
              {/* Part 1: AI Thinking Skills */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <Brain className="w-6 h-6 text-amber-400" />
                  <h3 className="text-xl font-bold text-foreground">Part 1: AI Thinking Skills</h3>
                  <Badge variant="outline" className="text-muted-foreground">Lessons 1-6</Badge>
                </div>
                <div className="space-y-3">
                  {curriculumPart1.map(item => <Card key={item.lesson} className="border-border/50 bg-card/50">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4 mb-3">
                          <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                            <span className="text-amber-400 font-bold text-sm">{item.lesson}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 justify-between">
                              <h4 className="font-semibold text-foreground">{item.title}</h4>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Clock className="w-3 h-3" /> {item.duration}
                                </span>
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                        <div className="ml-12 pt-3 border-t border-border/30">
                          <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Learning Objectives:</p>
                          <ul className="space-y-1">
                            {item.objectives.map((obj, i) => <li key={i} className="text-xs text-foreground/70 flex items-start gap-2">
                                <Check className="w-3 h-3 text-amber-400 mt-0.5 flex-shrink-0" />
                                <span>{obj}</span>
                              </li>)}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>)}
                </div>
              </div>

              {/* Part 2: From Prompts to Prototypes with Base44 */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <Zap className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl font-bold text-foreground">Part 2: From Prompts to Prototypes</h3>
                  <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30">with Base44</Badge>
                </div>
                <div className="space-y-3">
                  {curriculumPart2.map(item => (
                    <Card key={item.module} className="border-border/50 bg-card/50">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4 mb-3">
                          <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                            <span className="text-blue-400 font-bold text-sm">{item.module}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 justify-between">
                              <h4 className="font-semibold text-foreground">{item.title}</h4>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Clock className="w-3 h-3" /> {item.duration}
                                </span>
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                        <div className="ml-12 pt-3 border-t border-border/30">
                          <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">What You'll Learn:</p>
                          <ul className="space-y-1">
                            {item.takeaways.slice(0, 3).map((takeaway, i) => (
                              <li key={i} className="text-xs text-foreground/70 flex items-start gap-2">
                                <Check className="w-3 h-3 text-blue-400 mt-0.5 flex-shrink-0" />
                                <span>{takeaway}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-blue-400" />
                    <span className="text-foreground font-medium">$48 in Base44 credits included</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 ml-8">
                    Build your first real app as part of the curriculum
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What's Included - Benefits Grid with Masterclasses */}
        <section className="py-20 bg-card border-y border-border/50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  What Every Student Gets
                </h2>
                <p className="text-muted-foreground">
                  Everything included. No hidden costs. Free forever.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {whatsIncluded.map((item, i) => <div key={i} className="flex items-center gap-3 p-4 bg-card/50 border border-border/30 rounded-lg">
                    <item.icon className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <span className="text-foreground text-sm">{item.text}</span>
                  </div>)}
              </div>

              {/* Special Feature - Masterclasses */}
              <Card className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-blue-500/10 border-amber-500/30">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center flex-shrink-0">
                      <Video className="w-6 h-6 text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-foreground text-lg">FREE Masterclasses for 1 Year</h3>
                        <Badge className="bg-amber-500 text-black text-xs">INCLUDED</Badge>
                      </div>
                      <p className="text-muted-foreground mb-3">
                        AI is evolving fast. Stay current with monthly live masterclasses covering:
                      </p>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {["New AI tools and capabilities", "Curriculum updates and additions", "Industry trends and applications", "Live Q&A with AI experts"].map((item, i) => <div key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                            <Check className="w-4 h-4 text-amber-400" />
                            <span>{item}</span>
                          </div>)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats - Impact Focused */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[{
                value: "10",
                label: "Lessons",
                desc: "~45 min each"
              }, {
                value: "3",
                label: "Age Tracks",
                desc: "Ages 9-16"
              }, {
                value: "$48",
                label: "Credits",
                desc: "Build your first app"
              }, {
                value: "1M",
                label: "Goal",
                desc: "Students by 2026"
              }].map((stat, i) => <div key={i}>
                    <div className="text-4xl md:text-5xl font-bold text-amber-400">{stat.value}</div>
                    <div className="text-foreground font-medium mt-2">{stat.label}</div>
                    <div className="text-muted-foreground text-sm mt-1">{stat.desc}</div>
                  </div>)}
              </div>
              <p className="text-center text-muted-foreground mt-8">
                <span className="text-amber-400">★</span> Plus: Quiz after every lesson • Certificate included • Free masterclasses for 1 year
              </p>
            </div>
          </div>
        </section>

        {/* The Certificate */}
        <section className="py-20 bg-card/30 border-y border-border/50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                    A Credential That Means Something
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    The AI Foundations Certificate isn't a participation trophy. It's proof 
                    you can think critically in the AI age.
                  </p>
                  <ul className="space-y-3">
                    {["Shareable on LinkedIn and portfolios", "Demonstrates real AI thinking skills", "Issued in partnership with Base44", "Verified credential with unique ID"].map((item, i) => <li key={i} className="flex items-center gap-3 text-foreground">
                        <Check className="w-5 h-5 text-amber-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>)}
                  </ul>
                </div>
                
                {/* Certificate Preview */}
                <div className="relative">
                  <Card className="bg-gradient-to-br from-[#0A0F1C] via-[#1a1a2e] to-[#0A0F1C] border-amber-500/30 p-8 text-center">
                    <div className="space-y-4">
                      <Award className="w-16 h-16 text-amber-400 mx-auto" />
                      <div className="text-xs text-white/40 uppercase tracking-widest">Certificate of Completion</div>
                      <h3 className="text-2xl font-bold text-white">AI Foundations</h3>
                      <div className="text-white/60 text-sm">Level 1 of 3</div>
                      <div className="pt-4 border-t border-white/10 flex items-center justify-center gap-4">
                        <span className="text-white/80 font-medium">NEXT_</span>
                        <span className="text-white/40">×</span>
                        <img src={base44Logo} alt="Base44" className="h-5 opacity-80" />
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* For Educators Section - NEW */}
        <section className="py-20 bg-gradient-to-br from-blue-950/50 via-background to-blue-950/30">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30 mb-4">
                  <School className="w-3 h-3 mr-1" />
                  FOR EDUCATORS & SCHOOLS
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Bring AI Foundations to Your Students
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  No teacher training required. Students learn at their own pace. 
                  You track their progress.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Curriculum Structure */}
                <Card className="border-border/50 bg-card/50">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-amber-400" />
                    </div>
                    <h3 className="font-bold text-foreground text-lg">Curriculum Structure</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-amber-400" />
                        10 self-paced lessons (~7 hours total)
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-amber-400" />
                        Each lesson: ~45 min (fits class periods)
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-amber-400" />
                        Built-in quizzes and practice challenges
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-amber-400" />
                        No teacher training required
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-amber-400" />
                        Works independently or in classroom
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Research Foundation */}
                <Card className="border-border/50 bg-card/50">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-blue-400" />
                    </div>
                    <h3 className="font-bold text-foreground text-lg">Research Foundation</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-blue-400" />
                        Bloom's Taxonomy aligned objectives
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-blue-400" />
                        Kolb's Experiential Learning model
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-blue-400" />
                        Zone of Proximal Development scaffolding
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-blue-400" />
                        Growth Mindset principles embedded
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-blue-400" />
                        Age-appropriate cognitive design
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* What Schools Get */}
                <Card className="border-border/50 bg-card/50">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-purple-400" />
                    </div>
                    <h3 className="font-bold text-foreground text-lg">What Schools Get</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-purple-400" />
                        Real-time student progress dashboard
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-purple-400" />
                        Completion tracking and reports
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-purple-400" />
                        Certificate verification system
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-purple-400" />
                        School admin portal access
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-purple-400" />
                        60-day free pilot for schools
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center mt-10">
                <Button size="lg" variant="outline" onClick={() => navigate('/schools')} className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10">
                  <School className="w-4 h-4 mr-2" />
                  Partner With Us
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Live Webinars Section */}
        <LiveWebinarsSection variant="amber" />

        {/* Masterclass Schedule */}
        <MasterclassSchedule variant="amber" />

        {/* Community Promise Section */}
        <CommunityPromiseSection variant="amber" />

        {/* Who This Is For */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
                This Is For The Builders
              </h2>
              <div className="space-y-3">
                {personas.map((persona, index) => <div key={index} className="flex items-center gap-3 p-4 bg-card/30 border border-border/30 rounded-lg text-left">
                    <Check className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <span className="text-foreground">{persona}</span>
                  </div>)}
              </div>
            </div>
          </div>
        </section>

        {/* Impact Counter */}
        <section className="py-16 bg-card/30 border-y border-border/50">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <div className="flex items-center justify-center gap-3">
                <Users className="w-8 h-8 text-amber-400" />
                <h3 className="text-2xl font-bold text-foreground">The Movement</h3>
              </div>
              <div className="text-5xl md:text-7xl font-bold">
                <span className="text-muted-foreground">0</span>
                <span className="text-muted-foreground mx-4">→</span>
                <span className="text-amber-400">1,000,000</span>
              </div>
              <p className="text-muted-foreground text-lg">
                Students certified by December 2026
              </p>
              <p className="text-foreground font-medium">
                You could be one of them.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-gradient-to-br from-[#0A0F1C] via-[#1a1a2e] to-[#0A0F1C]">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                The next billion-dollar company will be built by someone who started here.
              </h2>
              
              <Button size="lg" onClick={() => navigate('/signup')} className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xl px-12 py-8 h-auto">
                Start Free <ArrowRight className="ml-2 h-6 w-6" />
              </Button>

              <p className="text-white/50">
                No credit card. No trial period. Just begin.
              </p>
            </div>
          </div>
        </section>

        {/* Schools Footer CTA - NEW */}
        <section className="py-12 bg-card border-t border-border/50">
          <div className="container mx-auto px-6 text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <School className="w-6 h-6 text-muted-foreground" />
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">Schools & Government Partners:</span>{" "}
                60-day free pilot. No teacher training required.
              </p>
              <Button variant="link" onClick={() => navigate('/schools')} className="text-amber-400 hover:text-amber-300 p-0">
                Learn About School Licensing →
              </Button>
            </div>
          </div>
        </section>

        <PublicFooter />
      </div>
    </>;
};
export default FirstStep;