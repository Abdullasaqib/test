import { Award, Building2, GraduationCap, Landmark, Briefcase, TrendingUp, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SEOHead } from "@/components/seo";
import { PublicHeader, PublicFooter } from "@/components/layout";
import { useNavigate } from "react-router-dom";
import base44Logo from "@/assets/base44-logo-white.svg";
const partnerCategories = [{
  icon: GraduationCap,
  title: "Academic Partners",
  description: "Universities and research institutions",
  examples: ["Coming Soon"],
  color: "text-blue-400",
  bgColor: "bg-blue-500/10",
  borderColor: "border-blue-500/30"
}, {
  icon: Building2,
  title: "Curriculum Partners",
  description: "AI platforms and educational content providers",
  examples: ["Base44"],
  color: "text-amber-400",
  bgColor: "bg-amber-500/10",
  borderColor: "border-amber-500/30",
  featured: true
}, {
  icon: Landmark,
  title: "Government Partners",
  description: "Ministries of Education and Youth Development",
  examples: ["Coming Soon"],
  color: "text-emerald-400",
  bgColor: "bg-emerald-500/10",
  borderColor: "border-emerald-500/30"
}, {
  icon: Briefcase,
  title: "Corporate Partners",
  description: "Companies investing in future talent",
  examples: ["Coming Soon"],
  color: "text-purple-400",
  bgColor: "bg-purple-500/10",
  borderColor: "border-purple-500/30"
}, {
  icon: TrendingUp,
  title: "Investment Partners",
  description: "Venture funds and impact investors",
  examples: ["Coming Soon"],
  color: "text-rose-400",
  bgColor: "bg-rose-500/10",
  borderColor: "border-rose-500/30"
}];
const partnerBenefits = ["Joint curriculum development and co-branding", "Access to emerging AI talent pipeline", "Co-marketing and press opportunities", "Custom enterprise implementations", "Early access to new features and content"];
export default function Partners() {
  const navigate = useNavigate();
  return <>
      <SEOHead title="Partners | NEXT_ Billion Lab" description="Building What's NEXT_ Together. Join leading organizations partnering with NEXT_ to prepare the next generation of AI builders." />
      <div className="min-h-screen bg-background">
        <PublicHeader />

        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-[#0A0F1C] via-[#1a1a2e] to-[#0A0F1C]">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl animate-pulse" style={{
            animationDelay: '1s'
          }} />
          </div>

          <div className="container mx-auto px-6 relative z-10 text-center">
            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-sm px-4 py-1 mb-6">
              PARTNERSHIPS
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
              Building What's{" "}
              <span className="text-amber-400">NEXT_</span>
              <br />Together
            </h1>
            
            {/* Base44 Logo - Founding Partner */}
            <div className="flex flex-col items-center gap-3 mb-8">
              <span className="text-sm text-white/50 uppercase tracking-wider">Founding Curriculum Partner</span>
              <img src={base44Logo} alt="Base44" className="h-14 md:h-20" />
            </div>
            
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Join the movement to prepare the next generation of AI builders.
              Partner with NEXT_ to shape the future of education.
            </p>
          </div>
        </section>

        {/* Featured Partner: Base44 */}
        <section className="py-20 bg-card border-y border-border/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 mb-4">
                FOUNDING CURRICULUM PARTNER
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Base44
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                The only student AI curriculum certified by Base44 — the platform trusted by universities worldwide to teach AI building.
              </p>
            </div>

            <Card className="max-w-4xl mx-auto bg-gradient-to-br from-amber-950/20 via-background to-amber-950/10 border-amber-500/30">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-48 h-24 bg-[#0A0F1C] rounded-lg p-4 flex items-center justify-center border border-amber-500/30">
                    <img src={base44Logo} alt="Base44" className="w-full h-auto" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <blockquote className="text-lg text-foreground/90 italic mb-4">
                      "When we saw how NEXT_ teaches AI thinking, we knew our BASE Framework could amplify their mission. Together, we're giving every student the tools to build real products."
                    </blockquote>
                    <p className="text-muted-foreground">
                      — <span className="text-foreground font-medium">Elad Landau</span>, Co-founder, Base44
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-border/50">
                  <p className="text-center text-muted-foreground mb-6">
                    Base44's BASE Framework is used by top universities globally. NEXT_ is the only program delivering this university-grade curriculum to ages 9-17.
                  </p>
                  <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-3xl font-bold text-amber-400">University-Grade</div>
                      <div className="text-muted-foreground text-sm">BASE Framework Curriculum</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-amber-400">​Certified</div>
                      <div className="text-muted-foreground text-sm">Base44-Certified Credential</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-amber-400">$48</div>
                      <div className="text-muted-foreground text-sm">Building Credits Included</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Partner Categories */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Partner Categories
              </h2>
              <p className="text-muted-foreground text-lg">
                We partner with organizations who share our mission.
              </p>
            </div>

            {/* Featured Partner - Curriculum Partners (larger, highlighted) */}
            {partnerCategories.filter(c => c.featured).map((category, index) => {
              const Icon = category.icon;
              return (
                <Card key={index} className="max-w-3xl mx-auto mb-8 bg-gradient-to-br from-amber-950/30 via-amber-900/10 to-amber-950/20 border-amber-500/40 border-2 ring-2 ring-amber-500/30 shadow-lg shadow-amber-500/10">
                  <CardContent className="p-8 md:p-10">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className={`p-5 rounded-2xl ${category.bgColor} border ${category.borderColor}`}>
                        <Icon className={`w-10 h-10 ${category.color}`} />
                      </div>
                      <div className="text-center md:text-left flex-1">
                        <h3 className="text-foreground font-bold text-2xl mb-2">{category.title}</h3>
                        <p className="text-muted-foreground text-base">{category.description}</p>
                        <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                          {category.examples.map((example, i) => (
                            <Badge key={i} className="bg-amber-500/20 text-amber-400 border-amber-500/40 text-sm px-4 py-1">
                              {example}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {/* Other Partners - 2x2 grid */}
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {partnerCategories.filter(c => !c.featured).map((category, index) => {
                const Icon = category.icon;
                return (
                  <Card key={index} className={`${category.bgColor} ${category.borderColor} border`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${category.bgColor}`}>
                          <Icon className={`w-6 h-6 ${category.color}`} />
                        </div>
                        <div>
                          <h3 className="text-foreground font-bold text-lg">{category.title}</h3>
                          <p className="text-muted-foreground text-sm mt-1">{category.description}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {category.examples.map((example, i) => (
                              <Badge key={i} variant="outline" className={`${category.borderColor} ${category.color}`}>
                                {example}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Partner Benefits */}
        <section className="py-20 bg-card/30 border-y border-border/50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Why Partner With NEXT_?
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {partnerBenefits.map((benefit, index) => <div key={index} className="flex items-center gap-3 p-4 bg-card/50 border border-border/30 rounded-lg">
                    <Check className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>)}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-gradient-to-br from-[#0A0F1C] via-[#1a1a2e] to-[#0A0F1C]">
          <div className="container mx-auto px-6 text-center">
            <Award className="w-16 h-16 text-amber-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Become a Partner
            </h2>
            <p className="text-white/60 text-lg max-w-xl mx-auto mb-8">
              Join leading organizations building the future of AI education.
            </p>
            <Button size="lg" onClick={() => window.location.href = 'mailto:partnerships@nextbillionlab.com'} className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-lg px-8">
              Contact Partnerships
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        <PublicFooter />
      </div>
    </>;
}