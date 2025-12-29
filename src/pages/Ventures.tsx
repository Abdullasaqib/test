import { PublicHeader } from "@/components/layout/PublicHeader";
import { Button } from "@/components/ui/button";
import { Rocket, Users, Cpu, DollarSign, Presentation, ArrowRight, Lightbulb, Target, Zap } from "lucide-react";

const benefits = [
  {
    icon: Users,
    title: "Mentorship from Industry Leaders",
    description: "Get guidance from founders, investors, and tech leaders who've built billion-dollar companies.",
  },
  {
    icon: Cpu,
    title: "Access to AI Building Tools",
    description: "Build your product with the same AI tools used by the world's most innovative startups.",
  },
  {
    icon: DollarSign,
    title: "Path to Real Funding",
    description: "Connect with investors who believe in backing the next generation of founders.",
  },
  {
    icon: Presentation,
    title: "Demo Day with Investors",
    description: "Pitch your venture to a live audience of investors, mentors, and industry leaders.",
  },
];

const whoIsFor = [
  {
    icon: Lightbulb,
    title: "Young Visionaries",
    description: "Ages 9-16 with a venture idea that could change the world.",
  },
  {
    icon: Target,
    title: "NEXT_ Graduates",
    description: "Graduates of our programs who want to take their idea to the next level.",
  },
  {
    icon: Zap,
    title: "Teams with Traction",
    description: "Early-stage teams with initial validation looking for support to scale.",
  },
];

export default function Ventures() {
  return (
    <div className="min-h-screen bg-[#0A0F1C]">
      <PublicHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary mb-8">
              <Rocket className="w-4 h-4" />
              <span className="text-sm font-medium">NEXT_ VENTURES</span>
            </div>

            {/* Main headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              We're incubating{" "}
              <span className="bg-gradient-to-r from-primary via-amber-400 to-primary bg-clip-text text-transparent">
                the next wave.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-2xl mx-auto">
              Have an idea that could change the world?{" "}
              <span className="text-white font-semibold">Talk to us.</span>
            </p>

            {/* CTA */}
            <Button
              size="lg"
              onClick={() => window.location.href = "mailto:ventures@nextbillionlab.com?subject=NEXT_ Ventures Inquiry"}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-lg px-8 py-6 h-auto shadow-lg shadow-amber-500/25"
            >
              Talk to Us
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What We Offer
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Everything you need to turn your idea into a real venture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-300 hover:bg-white/10"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-20 relative bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Who This Is For
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              We're looking for ambitious young founders ready to build something real.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {whoIsFor.map((item, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/50 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-amber-500/20 flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-amber-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-white/60 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              The next billion-dollar company could be{" "}
              <span className="text-amber-500">yours.</span>
            </h2>
            <p className="text-xl text-white/70 mb-10">
              We're not just teaching founders. We're investing in the ones who are ready to lead.
            </p>
            <Button
              size="lg"
              onClick={() => window.location.href = "mailto:ventures@nextbillionlab.com?subject=NEXT_ Ventures Inquiry"}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-lg px-10 py-6 h-auto shadow-lg shadow-amber-500/25"
            >
              Talk to Us
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="container mx-auto px-6 text-center">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} NEXT_ Billion Lab. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
