import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Copy, 
  Check,
  Presentation,
  BookOpen,
  Target,
  Lightbulb,
  Globe,
  Laptop,
  DollarSign,
  TrendingUp,
  Users,
  Rocket,
  Brain,
  Zap,
  GraduationCap,
  Building2,
  Landmark
} from "lucide-react";
import { toast } from "sonner";

interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  speakerNotes: string[];
  background: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "NEXT_",
    subtitle: "The AI Education Platform for Ages 9-16",
    icon: <Zap className="h-12 w-12" />,
    background: "from-primary/20 via-background to-background",
    content: (
      <div className="space-y-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Jobs won't be taken by AI.
          <br />
          <span className="text-primary">They'll be taken by people who know AI.</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          The 12-week program that turns kids into AI-fluent founders
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Badge variant="secondary" className="text-lg px-4 py-2">Ages 9-16</Badge>
          <Badge variant="secondary" className="text-lg px-4 py-2">12 Weeks</Badge>
          <Badge variant="secondary" className="text-lg px-4 py-2">180 Missions</Badge>
        </div>
      </div>
    ),
    speakerNotes: [
      "ChatGPT launched November 2022. Lovable launched in 2024. What launches in 2026? We don't know — but our students will be ready.",
      "We're not teaching kids to code. We're teaching them to command AI.",
      "Every child who graduates NEXT_ has built and launched a real product."
    ]
  },
  {
    id: 2,
    title: "The Problem",
    subtitle: "A New Layer of Skills is Emerging — And Schools Need Partners to Deliver It",
    icon: <Target className="h-12 w-12" />,
    background: "from-destructive/10 via-background to-background",
    content: (
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-destructive/10 border border-destructive/20">
            <h3 className="text-3xl font-bold text-destructive">$600B+</h3>
            <p className="text-muted-foreground">spent annually on K-12 education globally — almost none on AI fluency</p>
          </div>
          <div className="p-6 rounded-xl bg-destructive/10 border border-destructive/20">
            <h3 className="text-3xl font-bold text-destructive">65%</h3>
            <p className="text-muted-foreground">of children in school today will work in jobs that don't exist yet (WEF)</p>
          </div>
        </div>
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-destructive/10 border border-destructive/20">
            <h3 className="text-3xl font-bold text-destructive">10,000+</h3>
            <p className="text-muted-foreground">entrepreneurship programs exist for adults — virtually none for ages 9-16</p>
          </div>
          <div className="p-6 rounded-xl bg-primary/10 border border-primary/20">
            <h3 className="text-3xl font-bold text-primary">AI is the great equalizer</h3>
            <p className="text-muted-foreground">but access to AI education isn't distributed equally</p>
          </div>
        </div>
      </div>
    ),
    speakerNotes: [
      "Coding bootcamps taught people to write code. AI writes code now. What do we teach?",
      "The biggest opportunity gap of our generation: who gets to learn AI as a native language vs. a foreign one.",
      "Schools teach math, science, languages — but not the meta-skill of building with AI."
    ]
  },
  {
    id: 3,
    title: "The Solution",
    subtitle: "NEXT_: 12 Weeks to AI-Fluent Founder",
    icon: <Lightbulb className="h-12 w-12" />,
    background: "from-primary/20 via-background to-background",
    content: (
      <div className="space-y-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-card border">
            <GraduationCap className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">12-Week Curriculum</h3>
            <p className="text-muted-foreground">180 missions across 5 phases: Discovery → Validation → Building → Growth → Pitch</p>
          </div>
          <div className="p-6 rounded-xl bg-card border">
            <Users className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">3 Age Tracks</h3>
            <p className="text-muted-foreground">Junior (9-11), Teen (12-14), Advanced (15-16) with age-appropriate content</p>
          </div>
          <div className="p-6 rounded-xl bg-card border">
            <Brain className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">AI Coach</h3>
            <p className="text-muted-foreground">24/7 AI mentor for brainstorming, problem-solving, and pitch practice</p>
          </div>
        </div>
        <div className="p-6 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30">
          <h3 className="text-2xl font-bold mb-2">Key Differentiator</h3>
          <p className="text-lg">"We don't teach AI literacy (using tools). We teach <span className="text-primary font-bold">AI fluency</span> (thinking, building, creating WITH AI)."</p>
        </div>
      </div>
    ),
    speakerNotes: [
      "Every student launches a REAL product — not a toy project.",
      "Our curriculum is AI-first from Day 1 — not AI-supplemented.",
      "By Demo Day, a 12-year-old can pitch their AI-powered business to investors."
    ]
  },
  {
    id: 4,
    title: "Market Size",
    subtitle: "$100B+ Market with Zero Category Leader",
    icon: <Globe className="h-12 w-12" />,
    background: "from-accent/20 via-background to-background",
    content: (
      <div className="space-y-8">
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-64 h-64 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
              <div className="w-44 h-44 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-primary/30 border-2 border-primary/50 flex items-center justify-center">
                  <span className="text-lg font-bold">$500M</span>
                </div>
              </div>
            </div>
            <div className="absolute -top-2 -right-2 bg-card px-3 py-1 rounded-lg border text-sm">TAM: $100B+</div>
            <div className="absolute top-16 -right-8 bg-card px-3 py-1 rounded-lg border text-sm">SAM: $15B</div>
            <div className="absolute bottom-20 -right-4 bg-card px-3 py-1 rounded-lg border text-sm">SOM: $500M</div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-lg bg-card border">
            <h4 className="font-bold text-primary">TAM</h4>
            <p className="text-sm text-muted-foreground">Global K-12 EdTech + Supplemental Education</p>
          </div>
          <div className="p-4 rounded-lg bg-card border">
            <h4 className="font-bold text-primary">SAM</h4>
            <p className="text-sm text-muted-foreground">AI/STEM Education for Ages 9-16</p>
          </div>
          <div className="p-4 rounded-lg bg-card border">
            <h4 className="font-bold text-primary">SOM</h4>
            <p className="text-sm text-muted-foreground">English-speaking + early government markets</p>
          </div>
        </div>
      </div>
    ),
    speakerNotes: [
      "This is a white space. 10,000 adult programs. ZERO leaders in AI education for kids.",
      "First mover advantage is enormous — governments want to be first, not second.",
      "The country that owns AI youth education becomes the exporter to the world."
    ]
  },
  {
    id: 5,
    title: "Product Demo",
    subtitle: "The Complete AI Founder Operating System",
    icon: <Laptop className="h-12 w-12" />,
    background: "from-primary/20 via-background to-background",
    content: (
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-card border space-y-3">
          <Brain className="h-8 w-8 text-primary" />
          <h3 className="text-xl font-bold">AI Coach</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• 24/7 AI mentor trained on entrepreneurship</li>
            <li>• Helps with brainstorming & customer research</li>
            <li>• Rate-limited to control costs (20/day)</li>
          </ul>
        </div>
        <div className="p-6 rounded-xl bg-card border space-y-3">
          <Presentation className="h-8 w-8 text-primary" />
          <h3 className="text-xl font-bold">THE TANK</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• World's first AI Shark Tank for students</li>
            <li>• 5 investor personas with real-time scoring</li>
            <li>• "Nervous Founder" → "Shark Tamer" progression</li>
          </ul>
        </div>
        <div className="p-6 rounded-xl bg-card border space-y-3">
          <TrendingUp className="h-8 w-8 text-primary" />
          <h3 className="text-xl font-bold">Skill Intelligence</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• AI tracks 8 skill categories</li>
            <li>• Weekly insights for parents and schools</li>
            <li>• At-risk indicators for early intervention</li>
          </ul>
        </div>
        <div className="p-6 rounded-xl bg-card border space-y-3">
          <GraduationCap className="h-8 w-8 text-primary" />
          <h3 className="text-xl font-bold">NEXT_ CERTIFIED</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Level 1: AI Foundations (6 lessons)</li>
            <li>• Level 2: AI Builder (12 weeks)</li>
            <li>• LinkedIn-shareable → viral growth</li>
          </ul>
        </div>
      </div>
    ),
    speakerNotes: [
      "Speaking is a thinking problem. THE TANK solves BOTH.",
      "Schools get dashboards. Parents see real progress. Students build confidence.",
      "Every credential issued from UAE becomes marketing for UAE globally."
    ]
  },
  {
    id: 6,
    title: "Business Model",
    subtitle: "Three Revenue Channels, 80%+ Gross Margins",
    icon: <DollarSign className="h-12 w-12" />,
    background: "from-green-500/10 via-background to-background",
    content: (
      <div className="space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-6 rounded-xl bg-card border text-center">
            <Users className="h-10 w-10 text-primary mx-auto mb-3" />
            <h3 className="text-lg font-bold">B2C Individual</h3>
            <p className="text-3xl font-bold text-primary my-2">$19 - $290</p>
            <p className="text-sm text-muted-foreground">Revolution Start → Live Cohort</p>
            <Badge className="mt-2">88-92% margin</Badge>
          </div>
          <div className="p-6 rounded-xl bg-card border text-center">
            <Building2 className="h-10 w-10 text-primary mx-auto mb-3" />
            <h3 className="text-lg font-bold">B2B Schools</h3>
            <p className="text-3xl font-bold text-primary my-2">$9 - $45</p>
            <p className="text-sm text-muted-foreground">per student/year</p>
            <Badge className="mt-2">74-92% margin</Badge>
          </div>
          <div className="p-6 rounded-xl bg-card border text-center">
            <Landmark className="h-10 w-10 text-primary mx-auto mb-3" />
            <h3 className="text-lg font-bold">B2G Government</h3>
            <p className="text-3xl font-bold text-primary my-2">Custom</p>
            <p className="text-sm text-muted-foreground">National programs</p>
            <Badge className="mt-2">70-80% margin</Badge>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
          <h4 className="font-bold mb-2">Revenue Mix at Scale</h4>
          <div className="flex gap-4 text-sm">
            <span><strong>B2B Schools:</strong> 70%</span>
            <span><strong>B2C:</strong> 18%</span>
            <span><strong>B2G:</strong> 12%</span>
          </div>
        </div>
      </div>
    ),
    speakerNotes: [
      "Government wins unlock B2B school adoption in that country.",
      "We don't compete with schools — we sell TO schools.",
      "Path to $100M ARR is primarily enterprise, not consumer."
    ]
  },
  {
    id: 7,
    title: "Traction",
    subtitle: "Pre-Launch — Building Category Leadership",
    icon: <TrendingUp className="h-12 w-12" />,
    background: "from-primary/20 via-background to-background",
    content: (
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-6 rounded-xl bg-card border">
            <h3 className="text-lg font-bold mb-4">Current Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between"><span>Platform</span><Badge variant="secondary">Production Ready</Badge></div>
              <div className="flex justify-between"><span>Curriculum</span><Badge variant="secondary">180 Missions</Badge></div>
              <div className="flex justify-between"><span>AI Features</span><Badge variant="secondary">19 Edge Functions</Badge></div>
              <div className="flex justify-between"><span>Pricing Tiers</span><Badge variant="secondary">7 Active</Badge></div>
            </div>
          </div>
          <div className="p-6 rounded-xl bg-card border">
            <h3 className="text-lg font-bold mb-4">90-Day Milestones</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm">First government partnership signed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm">10 school pilots (2,000+ students)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm">1,000 certifications issued</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm">Demo Day with first cohort</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-accent/10 border border-accent/20 text-center">
          <p className="text-lg font-medium">Pipeline: Government partnerships + School pilots in target markets</p>
        </div>
      </div>
    ),
    speakerNotes: [
      "We're pre-launch on revenue but post-launch on product.",
      "Full platform built — now executing go-to-market.",
      "Government-first strategy: one pilot success unlocks entire country."
    ]
  },
  {
    id: 8,
    title: "Competition",
    subtitle: "We're Creating the Category, Not Competing In It",
    icon: <Target className="h-12 w-12" />,
    background: "from-primary/20 via-background to-background",
    content: (
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Competitive Landscape</h3>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="font-medium">Coding bootcamps</p>
                <p className="text-sm text-muted-foreground">Adults, code → We teach AI fluency</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="font-medium">1 Million Prompt</p>
                <p className="text-sm text-muted-foreground">Adults, literacy → We teach youth, fluency</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="font-medium">STEM programs</p>
                <p className="text-sm text-muted-foreground">Youth, science → We build real products</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Our Moat</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>First mover in AI education ages 9-16</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Complete platform (curriculum + AI + credentials)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Government partnerships as barrier</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>180 age-appropriate missions</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>THE TANK (no competitor has this)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    speakerNotes: [
      "We're not competing. We're category creating.",
      "The question isn't who else does this. It's: who will students credit for their success in 10 years?",
      "Government endorsement is the ultimate moat."
    ]
  },
  {
    id: 9,
    title: "Why We're Building This",
    subtitle: "The Vision Behind NEXT_",
    icon: <Users className="h-12 w-12" />,
    background: "from-primary/20 via-background to-background",
    content: (
      <div className="space-y-6">
        <div className="p-6 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-center">
          <p className="text-2xl font-bold leading-relaxed">
            "Nobody knows what's coming next.
            <br />
            <span className="text-primary">But we're making sure every child is ready to build it."</span>
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-card border text-center">
            <Brain className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-bold mb-2">AI-Native Builders</h3>
            <p className="text-sm text-muted-foreground">We've built products with AI tools — we teach what we practice</p>
          </div>
          <div className="p-5 rounded-xl bg-card border text-center">
            <GraduationCap className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-bold mb-2">EdTech Experience</h3>
            <p className="text-sm text-muted-foreground">Age-appropriate curriculum design for 9-16 year olds</p>
          </div>
          <div className="p-5 rounded-xl bg-card border text-center">
            <Landmark className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-bold mb-2">Enterprise Ready</h3>
            <p className="text-sm text-muted-foreground">Government and institutional partnership experience</p>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-muted/50 border text-center">
          <p className="text-muted-foreground italic">"We're building what we wish existed when we were 12."</p>
        </div>
      </div>
    ),
    speakerNotes: [
      "This isn't just a business. It's a movement to democratize access to AI education.",
      "Our curriculum reflects real founder journeys, not academic theory.",
      "We're building what we wish existed when we were 12 — the on-ramp to the future."
    ]
  },
  {
    id: 10,
    title: "The Ask",
    subtitle: "Join Us in Building the Next Billion Founders",
    icon: <Rocket className="h-12 w-12" />,
    background: "from-primary/30 via-primary/10 to-background",
    content: (
      <div className="space-y-6">
        <div className="text-center mb-4">
          <Badge variant="secondary" className="text-lg px-6 py-2">Raising $500K - $1M Pre-Seed</Badge>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-card border">
            <h3 className="text-lg font-bold mb-4">Use of Funds</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Go-to-Market</span>
                <Badge>40%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Product</span>
                <Badge>30%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Team</span>
                <Badge>20%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Operations</span>
                <Badge>10%</Badge>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-xl bg-card border">
            <h3 className="text-lg font-bold mb-4">18-Month Milestones</h3>
            <div className="space-y-2 text-sm">
              <p>• 3 government partnerships secured</p>
              <p>• 100 school pilots → 20,000 students</p>
              <p>• 10,000 certifications issued</p>
              <p>• $2M ARR</p>
            </div>
          </div>
        </div>
        <div className="p-6 rounded-xl bg-gradient-to-r from-primary/30 to-accent/30 border border-primary/40 text-center space-y-4">
          <p className="text-xl font-bold">
            The next generation of tech leaders isn't being born.
            <br />
            <span className="text-primary">It's being built.</span>
          </p>
          <p className="text-lg text-muted-foreground">The question is: where?</p>
        </div>
      </div>
    ),
    speakerNotes: [
      "We're raising $500K-$1M to execute our government-first go-to-market strategy.",
      "We're not asking you to bet on AI. That bet is made. We're asking you to bet on WHO gets to command it.",
      "The first nation to own AI youth education exports it to the world."
    ]
  }
];

export default function InvestorPitch() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNotes, setShowNotes] = useState(true);
  const [copied, setCopied] = useState(false);

  const goToSlide = (index: number) => {
    if (index >= 0 && index < slides.length) {
      setCurrentSlide(index);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === " ") {
      goToSlide(currentSlide + 1);
    } else if (e.key === "ArrowLeft") {
      goToSlide(currentSlide - 1);
    }
  };

  const handleCopy = async () => {
    const text = slides.map(s => 
      `# Slide ${s.id}: ${s.title}\n${s.subtitle || ''}\n\nSpeaker Notes:\n${s.speakerNotes.map(n => `• ${n}`).join('\n')}`
    ).join('\n\n---\n\n');
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Pitch deck copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const content = slides.map(s => 
      `# Slide ${s.id}: ${s.title}\n\n**${s.subtitle || ''}**\n\n## Speaker Notes\n${s.speakerNotes.map(n => `- ${n}`).join('\n')}`
    ).join('\n\n---\n\n');
    
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "NEXT-investor-pitch-deck.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Pitch deck downloaded");
  };

  const slide = slides[currentSlide];

  return (
    <div 
      className="min-h-screen bg-background flex flex-col"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <span className="text-xl font-bold">NEXT_</span>
          <Badge variant="outline">Investor Pitch Deck</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowNotes(!showNotes)}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            {showNotes ? "Hide" : "Show"} Notes
          </Button>
          <Button variant="ghost" size="sm" onClick={handleCopy}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Slide Content */}
        <div className="flex-1 flex flex-col">
          <div className={`flex-1 bg-gradient-to-br ${slide.background} p-8 md:p-12 overflow-auto`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-5xl mx-auto"
              >
                {/* Slide Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    {slide.icon}
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold">{slide.title}</h1>
                    {slide.subtitle && (
                      <p className="text-lg text-muted-foreground mt-1">{slide.subtitle}</p>
                    )}
                  </div>
                </div>

                {/* Slide Content */}
                <div className="min-h-[400px]">
                  {slide.content}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between p-4 border-t bg-card/50 backdrop-blur-sm">
            <Button
              variant="ghost"
              onClick={() => goToSlide(currentSlide - 1)}
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {/* Slide Dots */}
            <div className="flex items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === currentSlide 
                      ? "bg-primary w-6" 
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="ghost"
              onClick={() => goToSlide(currentSlide + 1)}
              disabled={currentSlide === slides.length - 1}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Speaker Notes Panel */}
        <AnimatePresence>
          {showNotes && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-l bg-muted/30 overflow-hidden"
            >
              <div className="p-6 w-80">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Speaker Notes
                </h3>
                <div className="space-y-4">
                  {slide.speakerNotes.map((note, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-sm text-muted-foreground leading-relaxed"
                    >
                      "{note}"
                    </motion.p>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t">
                  <p className="text-xs text-muted-foreground">
                    Slide {currentSlide + 1} of {slides.length}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Use ← → arrows to navigate
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
