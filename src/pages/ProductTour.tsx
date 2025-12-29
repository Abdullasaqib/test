import { motion } from "framer-motion";
import { 
  Rocket, Brain, Target, Trophy, Lightbulb, MessageSquare, 
  Zap, Award, ChevronRight, Play, CheckCircle2, Sparkles,
  Users, BarChart3, Calendar, BookOpen, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/seo/SEOHead";

// Mock Dashboard Preview
const DashboardPreview = () => (
  <div className="bg-background rounded-xl border shadow-lg overflow-hidden">
    <div className="bg-muted/50 border-b px-4 py-2 flex items-center gap-2">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-400" />
        <div className="w-3 h-3 rounded-full bg-yellow-400" />
        <div className="w-3 h-3 rounded-full bg-green-400" />
      </div>
      <span className="text-xs text-muted-foreground ml-2">dashboard.nextbillionlab.com</span>
    </div>
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold">Welcome back, Alex! 👋</h3>
          <p className="text-sm text-muted-foreground">Week 4 of 12 • Building Phase</p>
        </div>
        <Badge className="bg-primary/10 text-primary">FULL FOUNDATION</Badge>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-3 text-center">
            <div className="text-2xl font-bold text-primary">18</div>
            <div className="text-xs text-muted-foreground">Missions Done</div>
          </CardContent>
        </Card>
        <Card className="bg-amber-500/5 border-amber-500/20">
          <CardContent className="p-3 text-center">
            <div className="text-2xl font-bold text-amber-500">1,240</div>
            <div className="text-xs text-muted-foreground">XP Earned</div>
          </CardContent>
        </Card>
        <Card className="bg-green-500/5 border-green-500/20">
          <CardContent className="p-3 text-center">
            <div className="text-2xl font-bold text-green-500">7</div>
            <div className="text-xs text-muted-foreground">Day Streak</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm">Today's Mission</h4>
              <p className="text-xs text-muted-foreground">Build Your First Landing Page with AI</p>
            </div>
            <Button size="sm" className="gap-1">
              Start <ChevronRight className="w-3 h-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

// Mock Mission/Sprint Preview
const MissionPreview = () => (
  <div className="bg-background rounded-xl border shadow-lg overflow-hidden">
    <div className="bg-muted/50 border-b px-4 py-2 flex items-center gap-2">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-400" />
        <div className="w-3 h-3 rounded-full bg-yellow-400" />
        <div className="w-3 h-3 rounded-full bg-green-400" />
      </div>
      <span className="text-xs text-muted-foreground">Mission 12: Customer Discovery</span>
    </div>
    <div className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="text-xs">Week 3</Badge>
        <Badge className="bg-amber-500/10 text-amber-600 text-xs">+50 XP</Badge>
        <Badge variant="outline" className="text-xs">🧠 Problem Discovery</Badge>
      </div>
      
      <div>
        <h3 className="text-lg font-bold mb-2">Find 3 People With This Problem</h3>
        <p className="text-sm text-muted-foreground">
          Great founders don't guess — they ask. Your mission is to find 3 real people 
          who have the problem you're trying to solve.
        </p>
      </div>

      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-500 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sm mb-1">💡 Micro-Lesson</h4>
              <p className="text-xs text-muted-foreground">
                The best way to validate an idea is to talk to potential customers BEFORE 
                you build anything. Ask them: "What's the hardest part about [problem]?"
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-primary/30">
        <CardContent className="p-4">
          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
            <Rocket className="w-4 h-4 text-primary" />
            🔬 Your Lab
          </h4>
          <p className="text-xs text-muted-foreground mb-3">
            Use this AI prompt to prepare your customer interview questions:
          </p>
          <div className="bg-muted rounded-lg p-3 text-xs font-mono">
            "Help me create 5 open-ended questions to ask potential customers about [your problem]..."
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Button className="flex-1 gap-2">
          <CheckCircle2 className="w-4 h-4" />
          Mark Complete
        </Button>
      </div>
    </div>
  </div>
);

// Mock AI Coach Preview
const AICoachPreview = () => (
  <div className="bg-background rounded-xl border shadow-lg overflow-hidden">
    <div className="bg-muted/50 border-b px-4 py-2 flex items-center gap-2">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-400" />
        <div className="w-3 h-3 rounded-full bg-yellow-400" />
        <div className="w-3 h-3 rounded-full bg-green-400" />
      </div>
      <span className="text-xs text-muted-foreground">AI Coach • Your 24/7 Mentor</span>
    </div>
    <div className="p-4 space-y-4 max-h-[400px]">
      <div className="flex gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
          <Brain className="w-4 h-4 text-primary" />
        </div>
        <div className="bg-muted rounded-lg rounded-tl-none p-3 max-w-[85%]">
          <p className="text-sm">
            Hey Alex! 👋 I see you're working on customer discovery this week. 
            That's one of the most important skills a founder can learn. What's on your mind?
          </p>
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <div className="bg-primary text-primary-foreground rounded-lg rounded-tr-none p-3 max-w-[85%]">
          <p className="text-sm">
            I'm not sure how to approach strangers to interview them about my app idea. It feels awkward.
          </p>
        </div>
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
          <span className="text-xs font-bold">A</span>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
          <Brain className="w-4 h-4 text-primary" />
        </div>
        <div className="bg-muted rounded-lg rounded-tl-none p-3 max-w-[85%]">
          <p className="text-sm">
            Totally normal to feel that way! Here's a secret: you're not selling anything — you're learning. 
            Try this opener: <span className="font-medium">"I'm a student working on a project about [topic]. 
            Could I ask you 2 quick questions?"</span>
          </p>
          <p className="text-sm mt-2">
            Most people love helping students. Want me to help you practice the conversation? 🎯
          </p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Button size="sm" variant="outline" className="text-xs">Help me practice</Button>
        <Button size="sm" variant="outline" className="text-xs">Give me more tips</Button>
        <Button size="sm" variant="outline" className="text-xs">I'm stuck on something else</Button>
      </div>
    </div>
  </div>
);

// Mock THE TANK Preview
const TankPreview = () => (
  <div className="bg-background rounded-xl border shadow-lg overflow-hidden">
    <div className="bg-muted/50 border-b px-4 py-2 flex items-center gap-2">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-400" />
        <div className="w-3 h-3 rounded-full bg-yellow-400" />
        <div className="w-3 h-3 rounded-full bg-green-400" />
      </div>
      <span className="text-xs text-muted-foreground">THE TANK • Pitch Practice</span>
    </div>
    <div className="p-6 space-y-4">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-600 px-3 py-1 rounded-full text-sm font-medium">
          <Trophy className="w-4 h-4" />
          Level 3: Rising Pitcher
        </div>
        <h3 className="text-lg font-bold">Choose Your Investor</h3>
        <p className="text-sm text-muted-foreground">Practice pitching to different AI investor personas</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { name: "Sarah Chen", style: "Analytical", difficulty: "Medium", emoji: "👩‍💼" },
          { name: "Marcus Webb", style: "Tough Love", difficulty: "Hard", emoji: "👨‍💼" },
          { name: "Dr. Patel", style: "Supportive", difficulty: "Easy", emoji: "👨‍🔬" },
        ].map((investor) => (
          <Card key={investor.name} className="cursor-pointer hover:border-primary/50 transition-colors">
            <CardContent className="p-3 text-center">
              <div className="text-2xl mb-1">{investor.emoji}</div>
              <div className="font-semibold text-sm">{investor.name}</div>
              <div className="text-xs text-muted-foreground">{investor.style}</div>
              <Badge variant="outline" className="text-xs mt-1">
                {investor.difficulty}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">Your Progress</span>
            <span className="text-xs text-muted-foreground">850 / 1000 XP to Level 4</span>
          </div>
          <Progress value={85} className="h-2" />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>12 pitches completed</span>
            <span>Avg score: 78/100</span>
          </div>
        </CardContent>
      </Card>

      <Button className="w-full gap-2">
        <Play className="w-4 h-4" />
        Start Pitch Session
      </Button>
    </div>
  </div>
);

// Mock Founder DNA Preview
const FounderDNAPreview = () => (
  <div className="bg-background rounded-xl border shadow-lg overflow-hidden">
    <div className="bg-muted/50 border-b px-4 py-2 flex items-center gap-2">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-400" />
        <div className="w-3 h-3 rounded-full bg-yellow-400" />
        <div className="w-3 h-3 rounded-full bg-green-400" />
      </div>
      <span className="text-xs text-muted-foreground">FOUNDER DNA • Your Superpowers</span>
    </div>
    <div className="p-6 space-y-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white text-2xl mb-3">
          🚀
        </div>
        <h3 className="text-lg font-bold">The Visionary Builder</h3>
        <p className="text-sm text-muted-foreground">You see the big picture AND love making things happen</p>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Problem Solving</span>
            <span className="text-primary font-medium">92%</span>
          </div>
          <Progress value={92} className="h-2" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Creative Thinking</span>
            <span className="text-primary font-medium">88%</span>
          </div>
          <Progress value={88} className="h-2" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Communication</span>
            <span className="text-primary font-medium">75%</span>
          </div>
          <Progress value={75} className="h-2" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Resilience</span>
            <span className="text-primary font-medium">85%</span>
          </div>
          <Progress value={85} className="h-2" />
        </div>
      </div>

      <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
        <CardContent className="p-3">
          <h4 className="font-semibold text-sm mb-1 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-500" />
            Your Superpower
          </h4>
          <p className="text-xs text-muted-foreground">
            You excel at turning abstract ideas into concrete plans. Use this in customer interviews!
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
);

// Mock Certificate Preview
const CertificatePreview = () => (
  <div className="bg-background rounded-xl border shadow-lg overflow-hidden">
    <div className="bg-muted/50 border-b px-4 py-2 flex items-center gap-2">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-400" />
        <div className="w-3 h-3 rounded-full bg-yellow-400" />
        <div className="w-3 h-3 rounded-full bg-green-400" />
      </div>
      <span className="text-xs text-muted-foreground">NEXT_ CERTIFIED</span>
    </div>
    <div className="p-6">
      <div className="border-4 border-double border-primary/30 rounded-lg p-6 bg-gradient-to-br from-primary/5 to-transparent">
        <div className="text-center space-y-3">
          <div className="text-xs text-muted-foreground uppercase tracking-widest mb-2">NEXT_ BILLION LAB</div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Certificate of Completion</p>
            <h3 className="text-xl font-bold mt-1">AI Foundations Certificate</h3>
          </div>
          <p className="text-sm text-muted-foreground">This certifies that</p>
          <p className="text-lg font-semibold">Alex Johnson</p>
          <p className="text-sm text-muted-foreground">
            has successfully completed the AI Foundations curriculum<br />
            demonstrating proficiency in AI-powered entrepreneurship
          </p>
          <div className="pt-4 border-t border-dashed border-muted-foreground/30 mt-4">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Credential ID: NEXT-AF-2025-12345</span>
              <span>December 2025</span>
            </div>
          </div>
          <Button size="sm" variant="outline" className="gap-2 mt-2">
            Share on LinkedIn
          </Button>
        </div>
      </div>
    </div>
  </div>
);

// Curriculum Timeline Preview
const CurriculumPreview = () => (
  <div className="space-y-4">
    {[
      { phase: "DISCOVER", weeks: "1-2", color: "bg-blue-500", topics: ["Find Your Problem", "Customer Discovery", "Market Research"] },
      { phase: "VALIDATE", weeks: "3-4", color: "bg-purple-500", topics: ["Interview Customers", "Test Your Idea", "Pivot or Proceed"] },
      { phase: "BUILD", weeks: "5-8", color: "bg-amber-500", topics: ["AI Product Building", "Landing Pages", "MVP Launch"] },
      { phase: "LAUNCH", weeks: "9-10", color: "bg-green-500", topics: ["Go-to-Market", "First Users", "Iterate Fast"] },
      { phase: "PITCH", weeks: "11-12", color: "bg-red-500", topics: ["Pitch Deck", "Demo Day Prep", "Investor Practice"] },
    ].map((phase, index) => (
      <motion.div
        key={phase.phase}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        className="flex gap-4 items-start"
      >
        <div className="flex flex-col items-center">
          <div className={`w-10 h-10 rounded-full ${phase.color} text-white flex items-center justify-center font-bold text-sm`}>
            {index + 1}
          </div>
          {index < 4 && <div className="w-0.5 h-16 bg-muted-foreground/20" />}
        </div>
        <div className="flex-1 pb-4">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold">{phase.phase}</h4>
            <Badge variant="outline" className="text-xs">Weeks {phase.weeks}</Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            {phase.topics.map((topic) => (
              <span key={topic} className="text-xs bg-muted px-2 py-1 rounded">{topic}</span>
            ))}
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

export default function ProductTour() {
  return (
    <>
      <SEOHead
        title="Product Tour | See Inside NEXT_ Billion Lab"
        description="Explore the NEXT_ Billion Lab platform. See the dashboard, AI Coach, THE TANK pitch practice, curriculum, and certifications that prepare young founders for the AI age."
      />
      <PublicHeader />
      
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto max-w-4xl text-center">
            <Badge className="mb-4">PRODUCT TOUR</Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              See What Students Experience
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore every feature of the platform — from daily missions to AI coaching 
              to pitch practice. This is exactly what your child will use.
            </p>
          </div>
        </section>

        {/* Dashboard Section */}
        <section className="py-16 px-4 border-b">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <Badge variant="outline" className="mb-4">THE DASHBOARD</Badge>
                <h2 className="text-3xl font-bold mb-4">
                  Your Command Center
                </h2>
                <p className="text-muted-foreground mb-6">
                  Every student gets a personalized dashboard showing their progress, 
                  current week, XP earned, and today's mission. Everything in one place.
                </p>
                <ul className="space-y-3">
                  {[
                    "Track progress through 12 weeks",
                    "See XP and achievements",
                    "Access all features instantly",
                    "Personalized recommendations"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <DashboardPreview />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Missions Section */}
        <section className="py-16 px-4 bg-muted/30 border-b">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="order-2 md:order-1"
              >
                <MissionPreview />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="order-1 md:order-2"
              >
                <Badge variant="outline" className="mb-4">DAILY MISSIONS</Badge>
                <h2 className="text-3xl font-bold mb-4">
                  Learn By Doing
                </h2>
                <p className="text-muted-foreground mb-6">
                  Each mission is a bite-sized lesson + hands-on lab. Students learn a concept, 
                  then immediately apply it to their own startup idea.
                </p>
                <ul className="space-y-3">
                  {[
                    "60-90 second micro-lessons",
                    "Hands-on labs with AI tools",
                    "Real-world founder scenarios",
                    "Earn XP for completion"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* AI Coach Section */}
        <section className="py-16 px-4 border-b">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <Badge variant="outline" className="mb-4">AI COACH</Badge>
                <h2 className="text-3xl font-bold mb-4">
                  24/7 Personal Mentor
                </h2>
                <p className="text-muted-foreground mb-6">
                  Our AI Coach knows every student's journey and provides personalized guidance. 
                  Stuck at 2am? The coach is there. Need feedback on your pitch? Ask away.
                </p>
                <ul className="space-y-3">
                  {[
                    "Knows your curriculum progress",
                    "Provides age-appropriate guidance",
                    "Helps when you're stuck",
                    "Prepares you for THE TANK"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <AICoachPreview />
              </motion.div>
            </div>
          </div>
        </section>

        {/* THE TANK Section */}
        <section className="py-16 px-4 bg-muted/30 border-b">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="order-2 md:order-1"
              >
                <TankPreview />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="order-1 md:order-2"
              >
                <Badge variant="outline" className="mb-4">THE TANK</Badge>
                <h2 className="text-3xl font-bold mb-4">
                  Practice Your Pitch
                </h2>
                <p className="text-muted-foreground mb-6">
                  Like Shark Tank, but with AI investors. Students record their pitch, 
                  get instant feedback, and level up their presentation skills.
                </p>
                <ul className="space-y-3">
                  {[
                    "Multiple AI investor personas",
                    "Real-time pitch scoring",
                    "Detailed feedback on delivery",
                    "Practice Q&A sessions"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Founder DNA Section */}
        <section className="py-16 px-4 border-b">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <Badge variant="outline" className="mb-4">FOUNDER DNA</Badge>
                <h2 className="text-3xl font-bold mb-4">
                  Discover Your Superpowers
                </h2>
                <p className="text-muted-foreground mb-6">
                  AI-powered assessment reveals each student's unique founder strengths. 
                  Know what you're great at and where to grow.
                </p>
                <ul className="space-y-3">
                  {[
                    "Personalized strength analysis",
                    "Founder archetype matching",
                    "Growth recommendations",
                    "Track progress over time"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <FounderDNAPreview />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Curriculum Section */}
        <section className="py-16 px-4 bg-muted/30 border-b">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <Badge variant="outline" className="mb-4">12-WEEK CURRICULUM</Badge>
                <h2 className="text-3xl font-bold mb-4">
                  The Complete Founder Journey
                </h2>
                <p className="text-muted-foreground mb-6">
                  Five phases take students from "I have an idea" to "I launched my product." 
                  Every week builds on the last.
                </p>
                <ul className="space-y-3">
                  {[
                    "180 missions across 12 weeks",
                    "Age-appropriate tracks (9-11, 12-14, 15-16)",
                    "Research-backed pedagogy",
                    "Real artifacts at every phase"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <CurriculumPreview />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Certificate Section */}
        <section className="py-16 px-4 border-b">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <Badge variant="outline" className="mb-4">NEXT_ CERTIFIED</Badge>
                <h2 className="text-3xl font-bold mb-4">
                  Credentials That Matter
                </h2>
                <p className="text-muted-foreground mb-6">
                  Earn LinkedIn-shareable certificates that prove real skills. 
                  Three levels: AI Foundations, AI Builder, and AI Launcher.
                </p>
                <ul className="space-y-3">
                  {[
                    "Share on LinkedIn instantly",
                    "Unique credential ID",
                    "Skills mastered section",
                    "QR code verification"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <CertificatePreview />
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-background to-primary/5">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Building?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join thousands of young founders learning to build with AI. 
              Start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="gap-2">
                <Link to="/ai-foundations">
                  Start for $19 <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/pricing">
                  Compare All Plans
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </>
  );
}
