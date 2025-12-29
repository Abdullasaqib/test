import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Rocket, GraduationCap, Users, Globe, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TierCard } from "@/components/pricing/TierCard";
import { TierComparison } from "@/components/pricing/TierComparison";
import { usePricingTiers, PricingTier } from "@/hooks/usePricingTiers";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { EqualOpportunityBanner, UnknownFutureSection, NEXTCertifiedBadge } from "@/components/movement";
import { SEOHead } from "@/components/seo/SEOHead";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Why does NEXT_ CERTIFIED matter?",
    answer: "Because the future is unknowable—but readiness is everything. NEXT_ CERTIFIED proves your child can adapt, create, and build with whatever tools emerge. In a world where jobs disappear and new ones appear overnight, this credential says: 'I'm ready for anything.'",
  },
  {
    question: "What are Daily Sprint Challenges?",
    answer: "Daily Sprints are AI-evaluated founder challenges that keep your skills sharp. Each day, you get a real-world scenario to solve—from making tough business decisions to pitching investors. FULL FOUNDATION and ACCELERATOR members get unlimited access. FIRST STEP includes 3 sprints to try.",
  },
  {
    question: "When does the ACCELERATOR live cohort start?",
    answer: "The first ACCELERATOR cohort begins February 2026. Exact dates and schedule will be announced to enrolled students. Spots are limited—enroll now to secure your place.",
  },
  {
    question: "What's the difference between the three plans?",
    answer: "AI FOUNDATIONS is completely free forever — 10 lessons, $48 Base44 credits, and your first certificate. BUILDER ($19/year) adds Vibe Coding, daily AI Coach, and more sprints. ACCELERATOR ($290) includes everything plus 12 weeks of live mentorship and Demo Day with real investors.",
  },
  {
    question: "Can I upgrade later?",
    answer: "Yes! You can upgrade at any time. Your progress will be saved and you'll get immediate access to all features of your new plan.",
  },
  {
    question: "What certificates do I get?",
    answer: "AI Foundations Certificate is free for everyone — 10 lessons with Base44 partnership. BUILDER adds AI Builder Certificate (earned by completing curriculum). ACCELERATOR adds AI Launcher Certificate (earned by completing live cohort and presenting at Demo Day). All are NEXT_ CERTIFIED credentials, shareable on LinkedIn.",
  },
  {
    question: "What age group is this for?",
    answer: "AI Foundations and AI Builder certificates are for ages 9-17 across three tracks: Junior (9-11), Teen (12-14), and Advanced (15-17). The AI Launcher live cohort (ACCELERATOR) is for ages 12-18. Each track has age-appropriate content—but the mission is the same: prepare to build the unknown future.",
  },
  {
    question: "Do parents need to be involved?",
    answer: "We require parent/guardian consent for all students under 18. Parents can track progress and are encouraged to support their child's journey to becoming a creator, not just a consumer, of technology.",
  },
];

export default function Pricing() {
  const navigate = useNavigate();
  const { data: b2cTiers = [], isLoading } = usePricingTiers("b2c");
  const [viewMode, setViewMode] = useState<"cards" | "compare">("cards");

  const handleSelectTier = (tier: PricingTier) => {
    const tierRoutes: Record<string, string> = {
      'revolution-start': '/ai-foundations',
      'yearly-founder': '/ai-builder',
      'live-cohort': '/ai-launcher'
    };
    navigate(tierRoutes[tier.slug] || `/checkout?tier=${tier.slug}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Pricing - AI Entrepreneurship for Young Founders"
        description="Start free with AI Foundations Certificate. 10 lessons, $48 Base44 credits, forever free. Upgrade to BUILDER ($19/year) or ACCELERATOR ($290) for more."
        canonical="/pricing"
        keywords="AI course pricing, kids entrepreneurship program, young founders pricing, NEXT certified"
      />
      <PublicHeader />

      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              BUILDING WHAT'S{" "}
              <span className="text-primary">NEXT_</span>
            </h1>
            
            <div className="space-y-4 mb-8">
              <p className="text-xl md:text-2xl text-muted-foreground">
                Nobody knew ChatGPT was coming.
              </p>
              <p className="text-xl md:text-2xl text-muted-foreground">
                Nobody knew Gemini was coming.
              </p>
              <p className="text-xl md:text-2xl font-medium text-foreground">
                Nobody knows what's <span className="text-primary font-bold">NEXT_</span>
              </p>
            </div>

            <p className="text-lg text-foreground mb-8">
              But we're preparing YOU to <span className="font-bold">BUILD</span> it.
            </p>

            <div className="flex justify-center mb-6">
              <NEXTCertifiedBadge size="lg" />
            </div>

            <p className="text-muted-foreground">
              Already enrolled?{" "}
              <Button
                variant="link"
                onClick={() => navigate("/login")}
                className="text-primary hover:text-primary/80 p-0 h-auto font-medium"
              >
                Login to your dashboard
              </Button>
            </p>
          </motion.div>
        </section>

        {/* Equal Opportunity Banner */}
        <section className="container mx-auto px-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <EqualOpportunityBanner />
          </motion.div>
        </section>

        {/* Pricing Cards */}
        <section className="container mx-auto px-4 mb-16">
          <div className="flex justify-center mb-8">
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "cards" | "compare")}>
              <TabsList>
                <TabsTrigger value="cards">Cards View</TabsTrigger>
                <TabsTrigger value="compare">Compare Features</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="text-center space-y-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
                <p className="text-sm text-muted-foreground">Loading pricing plans...</p>
              </div>
            </div>
          ) : b2cTiers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">Unable to load pricing plans.</p>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          ) : viewMode === "cards" ? (
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {b2cTiers.map((tier, index) => (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <TierCard tier={tier} onSelect={handleSelectTier} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-5xl mx-auto bg-card rounded-lg border border-border overflow-hidden"
            >
              <TierComparison tiers={b2cTiers} />
            </motion.div>
          )}
        </section>

        {/* Benefits Section - Reframed */}
        <section className="container mx-auto px-4 mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">
            What You'll Master
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Rocket className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Build What Doesn't Exist Yet</h3>
              <p className="text-sm text-muted-foreground">
                Not tutorials. Real products. Using tools that didn't exist 2 years ago.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Command Tomorrow's Tools</h3>
              <p className="text-sm text-muted-foreground">
                Master the AI tools that are reshaping every industry—before everyone else.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Create Jobs. Don't Wait for Them.</h3>
              <p className="text-sm text-muted-foreground">
                Graduate as a founder, not a job seeker. Build opportunities instead of chasing them.
              </p>
            </div>
          </div>
        </section>

        {/* Unknown Future Section */}
        <section className="container mx-auto px-4 mb-16">
          <div className="bg-muted/30 rounded-2xl p-8 max-w-3xl mx-auto">
            <UnknownFutureSection />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-4 mb-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Government/Schools CTA */}
        <section className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-primary/10 via-background to-primary/5 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto border border-primary/20">
            <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              For Nations That Want to Lead
            </h2>
            <p className="text-lg text-muted-foreground mb-4 max-w-2xl mx-auto">
              The countries that certify the most <span className="text-primary font-semibold">NEXT_</span> students will lead the AI economy.
            </p>
            <p className="text-foreground font-medium mb-8">
              The countries that wait will explain why they fell behind.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate("/schools/pricing")} size="lg">
                Schools Pricing
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate("/schools")}>
                Request Government Briefing
              </Button>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
