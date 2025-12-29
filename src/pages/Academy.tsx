import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Rocket, ArrowRight, Mic, Dna, MessageSquare, Video, Lightbulb, Sparkles, Brain, Puzzle, MessageCircle, RefreshCw, Wrench } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { CursorWordmark } from "@/components/ui/cursor-wordmark";
import { SEOHead } from "@/components/seo/SEOHead";
import { usePricingTiers } from "@/hooks/usePricingTiers";
import { TierCard } from "@/components/pricing/TierCard";
import { PricingTier } from "@/hooks/usePricingTiers";
const Academy = () => {
  const navigate = useNavigate();
  const {
    data: tiers,
    isLoading: tiersLoading
  } = usePricingTiers("b2c");
  const handleTierSelect = (tier: PricingTier) => {
    // Navigate to dedicated tier landing pages
    const tierRoutes: Record<string, string> = {
      'revolution-start': '/ai-foundations',
      'yearly-founder': '/ai-builder',
      'live-cohort': '/ai-launcher'
    };
    navigate(tierRoutes[tier.slug] || `/checkout?tier=${tier.slug}`);
  };

  // Credentials you'll earn
  const certifications = [{
    icon: Award,
    title: "AI FOUNDATIONS",
    tagline: "AI Foundations Certificate",
    description: "University-grade AI curriculum. BASE Framework. Base44-verified.",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
    tier: "START FREE"
  }, {
    icon: Rocket,
    title: "AI BUILDER",
    tagline: "AI Builder Certificate",
    description: "Complete the 12-week curriculum. Ship real products. Prove you can build with AI.",
    color: "text-gold",
    bgColor: "bg-gold/10",
    borderColor: "border-gold/20",
    tier: "$99/year"
  }, {
    icon: Video,
    title: "AI LAUNCHER",
    tagline: "AI Launcher Certificate",
    description: "Complete live cohort (starts Feb 2026), ship your product, pitch at Demo Day with real investors. The ultimate founder credential.",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
    tier: "$290"
  }];

  // Platform tools you'll use
  const platformFeatures = [{
    icon: Mic,
    title: "THE TANK",
    tagline: "Where founders are forged",
    description: "AI-powered Shark Tank. Practice pitching to 5 investor personas. Build confidence before Demo Day.",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20"
  }, {
    icon: Dna,
    title: "FOUNDER DNA",
    tagline: "Discover who you are",
    description: "Personality-matched founder archetypes. Discover your unique strengths and superpowers.",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20"
  }, {
    icon: MessageSquare,
    title: "AI COACH",
    tagline: "A mentor who never sleeps",
    description: "24/7 AI guidance for brainstorming, problem-solving, and feedback. Always there when you're stuck.",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20"
  }, {
    icon: Lightbulb,
    title: "PROMPT LIBRARY",
    tagline: "50+ prompts for every stage",
    description: "Copy-paste AI prompts from brainstorming to pitch prep. Accelerate every step of your founder journey.",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20"
  }];

  // The 5-phase journey
  const phases = [{
    name: "DISCOVER",
    weeks: "1-2",
    description: "Find problems worth solving"
  }, {
    name: "VALIDATE",
    weeks: "3-4",
    description: "Talk to real customers"
  }, {
    name: "BUILD",
    weeks: "5-7",
    description: "Create your MVP with AI"
  }, {
    name: "LAUNCH",
    weeks: "8-10",
    description: "Get users & traction"
  }, {
    name: "PITCH",
    weeks: "11-12",
    description: "Demo Day ready"
  }];
  return <div className="min-h-screen bg-background">
      <SEOHead title="AI Entrepreneurship Academy for Young Founders" description="Transform your child into a founder. They won't learn about AI—they'll build with it. Ages 9-17. NEXT_ CERTIFIED." canonical="/academy" keywords="AI education, young entrepreneurs, vibe coding, kids coding, teen founders, entrepreneurship for kids" />
      <PublicHeader />
      
      {/* ===== SECTION 1: HERO ===== */}
      <section className="relative border-b border-border/50 overflow-hidden flex items-center justify-center min-h-[85vh] pt-24 bg-gradient-to-br from-[#0A0F1C] via-[#111827] to-[#0A0F1C]">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold/10 rounded-full blur-3xl animate-pulse" style={{
          animationDelay: '1s'
        }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center space-y-8 max-w-5xl">
          <div className="flex flex-col items-center gap-4">
            <CursorWordmark word="NEXT" size="hero" className="text-white" cursorClassName="text-gold" subtitle="BILLION LAB" />
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight text-white">
            The next billion-dollar companies won't be built by coders.
            <span className="block mt-4 bg-gradient-to-r from-white via-primary to-gold bg-clip-text text-transparent">
              They'll be built by kids who learned to command AI.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">
            They won't learn about AI. They'll build with it.
          </p>
          
          <div className="flex flex-col items-center gap-4">
            <Button size="lg" onClick={() => navigate('/signup')} className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold shadow-lg shadow-amber-500/25 border-0 h-14 px-10 text-lg">
              Start Building
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-white/50 text-sm">
              Create your free account in 30 seconds • Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
            </p>
          </div>

          <p className="text-white/60 text-lg">
            Start Free • Ages 9-17 • NEXT_ CERTIFIED
          </p>
        </div>
      </section>

      {/* ===== SECTION 2: SOCIAL PROOF BAR ===== */}
      <section className="py-8 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-b border-border/50">
        <div className="container mx-auto text-center">
          <p className="text-xl md:text-2xl font-bold text-foreground">
            1 Million <span className="text-primary">NEXT_ CERTIFIED</span> by 2026.
            <span className="block md:inline md:ml-2 text-muted-foreground font-normal">This is where it starts.</span>
          </p>
        </div>
      </section>

      {/* ===== SECTION 2.5: BASE44 PARTNERSHIP BANNER ===== */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-amber-950/30 via-amber-950/20 to-amber-950/30 border-b border-amber-500/20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 text-center md:text-left">
            <div className="flex items-center gap-5">
              <span className="text-3xl md:text-5xl font-bold text-white">NEXT_</span>
              <span className="text-white/40 text-2xl md:text-3xl">×</span>
              <img alt="Base44" className="h-12 md:h-16" src="/lovable-uploads/f8747e56-e3b1-4168-9e37-5cfc4b0b76ac.png" />
            </div>
            <div className="h-px w-20 md:h-16 md:w-px bg-amber-500/30" />
            <div>
              <p className="text-amber-400 font-semibold text-xl md:text-2xl">The Only Student AI Credential Certified by Base44</p>
              <p className="text-white/60 text-base md:text-lg mt-1">Same framework taught at universities. Now for ages 9-17.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2.6: SKILLS FOR THE AI AGE ===== */}
      <section className="py-20 bg-card/30 border-b border-border/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Skills That Can't Be Automated
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              No domain required. No hosting costs. Just the thinking skills that will matter for the next 50 years.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Brain, title: "Critical Thinking", description: "Spot AI hallucinations. Question everything.", color: "text-purple-400", bgColor: "bg-purple-500/10" },
              { icon: Puzzle, title: "Problem Solving", description: "Break complex problems into solvable pieces.", color: "text-blue-400", bgColor: "bg-blue-500/10" },
              { icon: MessageCircle, title: "Communication", description: "Express ideas clearly—to humans and machines.", color: "text-cyan-400", bgColor: "bg-cyan-500/10" },
              { icon: RefreshCw, title: "Adaptability", description: "Master new tools in days, not years.", color: "text-green-400", bgColor: "bg-green-500/10" },
              { icon: Wrench, title: "Self-Reliance", description: "Build without permission or expensive resources.", color: "text-amber-400", bgColor: "bg-amber-500/10" },
              { icon: Sparkles, title: "Creativity", description: "Generate and iterate on ideas at the speed of thought.", color: "text-pink-400", bgColor: "bg-pink-500/10" },
            ].map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div key={index} className="bg-card/50 border border-border/50 rounded-xl p-6 hover:border-primary/30 transition-all duration-300">
                  <div className={`w-12 h-12 rounded-lg ${skill.bgColor} flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${skill.color}`} />
                  </div>
                  <h3 className={`text-lg font-bold ${skill.color} mb-2`}>{skill.title}</h3>
                  <p className="text-muted-foreground text-sm">{skill.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: CREDENTIALS YOU'LL EARN ===== */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Credentials That Prove You're Ready
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            LinkedIn-shareable certificates. Real proof of AI fluency.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {certifications.map((cert, index) => {
          const Icon = cert.icon;
          const certLinks = ['/certification/ai-foundations', '/certification/ai-builder', '/certification/ai-launcher'];
          return <Link to={certLinks[index]} key={index}>
                <Card className={`glass-card ${cert.borderColor} hover:scale-105 transition-all duration-300 relative overflow-hidden cursor-pointer h-full`}>
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-50" style={{
                color: cert.color.replace('text-', '')
              }} />
                  <CardContent className="p-6 space-y-4">
                    <div className={`w-14 h-14 rounded-xl ${cert.bgColor} flex items-center justify-center`}>
                      <Icon className={`w-7 h-7 ${cert.color}`} />
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold ${cert.color}`}>{cert.title}</h3>
                      <p className="text-foreground font-medium mt-1">{cert.tagline}</p>
                    </div>
                    <p className="text-muted-foreground text-sm">{cert.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={`${cert.borderColor} text-xs`}>
                        {cert.tier}
                      </Badge>
                      <ArrowRight className={`w-4 h-4 ${cert.color}`} />
                    </div>
                  </CardContent>
                </Card>
              </Link>;
        })}
        </div>
      </section>

      {/* ===== SECTION 4: TOOLS YOU'LL USE ===== */}
      <section className="bg-card border-y border-border/50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Tools That Make You Unstoppable
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Every feature designed for one outcome: independence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {platformFeatures.map((feature, index) => {
            const Icon = feature.icon;
            const featureLinks = ['/features/the-tank', '/features/founder-dna', '/features/ai-coach', '/features/prompt-library'];
            return <Link to={featureLinks[index]} key={index}>
                  <Card className={`glass-card ${feature.borderColor} hover:scale-105 transition-all duration-300 cursor-pointer h-full`}>
                    <CardContent className="p-6 space-y-4">
                      <div className={`w-14 h-14 rounded-xl ${feature.bgColor} flex items-center justify-center`}>
                        <Icon className={`w-7 h-7 ${feature.color}`} />
                      </div>
                      <div>
                        <h3 className={`text-xl font-bold ${feature.color}`}>{feature.title}</h3>
                        <p className="text-foreground font-medium mt-1">{feature.tagline}</p>
                      </div>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                      <div className="flex justify-end">
                        <ArrowRight className={`w-4 h-4 ${feature.color}`} />
                      </div>
                    </CardContent>
                  </Card>
                </Link>;
          })}
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: THE PATH ===== */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Problem → Product → Pitch.
            </h2>
          </div>

          {/* Desktop Timeline */}
          <div className="hidden md:flex items-center justify-center gap-4 max-w-5xl mx-auto mb-8">
            {phases.map((phase, index) => <div key={index} className="flex items-center">
                <div className="text-center">
                  <div className="bg-primary/10 border border-primary/30 rounded-xl px-6 py-4 hover:bg-primary/20 transition-colors">
                    <p className="text-primary font-bold text-lg">{phase.name}</p>
                    <p className="text-muted-foreground text-sm">Weeks {phase.weeks}</p>
                  </div>
                </div>
                {index < phases.length - 1 && <ArrowRight className="w-6 h-6 text-muted-foreground mx-2" />}
              </div>)}
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden space-y-3 max-w-sm mx-auto mb-8">
            {phases.map((phase, index) => <div key={index} className="bg-primary/10 border border-primary/30 rounded-xl px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-primary font-bold">{phase.name}</p>
                  <p className="text-muted-foreground text-sm">{phase.description}</p>
                </div>
                <Badge variant="outline" className="border-primary/30 text-primary">
                  W{phase.weeks}
                </Badge>
              </div>)}
          </div>

          <div className="text-center">
            <Button variant="link" onClick={() => navigate('/how-it-works')} className="text-primary hover:text-primary/80 text-lg">
              See the full journey <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* ===== SECTION 6: THE MOVEMENT (PRICING) ===== */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Every founder started somewhere.
          </h2>
          <p className="text-muted-foreground text-lg">
            Choose your path. Start building today.
          </p>
        </div>

        {tiersLoading ? <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div> : <>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
              {tiers?.slice(0, 3).map(tier => <TierCard key={tier.id} tier={tier} onSelect={handleTierSelect} compact />)}
            </div>
            <div className="text-center">
              <Button variant="link" onClick={() => navigate('/pricing')} className="text-muted-foreground hover:text-foreground">
                Full details at /pricing →
              </Button>
            </div>
          </>}
      </section>

      {/* ===== SECTION 6.5: FOR INSTITUTIONS ===== */}
      <section className="py-16 bg-card/30 border-y border-border/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              For Institutions
            </h2>
            <p className="text-muted-foreground mb-8">
              Bring NEXT_ to your school, government, or organization.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" onClick={() => navigate('/schools')} className="border-primary/50 text-primary hover:bg-primary/10">
                For Schools
              </Button>
              <Button variant="outline" onClick={() => navigate('/government-pitch')} className="border-primary/50 text-primary hover:bg-primary/10">
                Government Briefing
              </Button>
              <Button variant="outline" onClick={() => navigate('/partners')} className="border-primary/50 text-primary hover:bg-primary/10">
                Become a Partner
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 7: FINAL CTA ===== */}
      <section className="bg-gradient-to-br from-[#0A0F1C] via-[#111827] to-[#0A0F1C] border-t border-border/50 py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              The next billion-dollar company will be built by someone who started here.
            </h2>
            
            <div className="flex flex-col items-center gap-4">
              <Button size="lg" onClick={() => navigate('/signup')} className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold shadow-lg shadow-amber-500/25 border-0 h-14 px-10 text-lg">
                Claim Your Spot
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <p className="text-white/50 text-sm">
                Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>;
};
export default Academy;