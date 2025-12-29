import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Globe, 
  Users, 
  TrendingUp, 
  GraduationCap, 
  Download, 
  Mail, 
  CheckCircle2, 
  Rocket, 
  Building2, 
  Clock, 
  Target,
  Zap,
  Award,
  Handshake,
  DollarSign
} from "lucide-react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { SEOHead } from "@/components/seo/SEOHead";

const RwandaPitch = () => {
  const globalStats = [
    { country: "China", stat: "200M students in AI curriculum" },
    { country: "Singapore", stat: "AI mandatory in all schools" },
    { country: "Estonia", stat: "Coding from age 6" },
    { country: "Israel", stat: "#1 in startups per capita" },
  ];

  const visionAlignment = [
    { goal: "Knowledge-Based Economy", alignment: "Train 100,000 young founders by 2030" },
    { goal: "Youth Employment", alignment: "Create job CREATORS, not job seekers" },
    { goal: "Smart Rwanda", alignment: "AI-first digital skills from age 9" },
    { goal: "Regional Tech Hub", alignment: "Position Rwanda as Africa's founder factory" },
  ];

  const roiProjections = [
    { year: "Year 1", students: "2,000", businesses: "400", jobs: "800", investment: "$70K" },
    { year: "Year 3", students: "20,000", businesses: "4,000", jobs: "12,000", investment: "$500K" },
    { year: "Year 5", students: "100,000", businesses: "20,000", jobs: "80,000", investment: "$2M" },
  ];

  const developmentPartners = [
    { name: "Mastercard Foundation", focus: "Youth employment & digital skills" },
    { name: "USAID", focus: "Economic growth & entrepreneurship" },
    { name: "GIZ", focus: "Vocational training & SME development" },
    { name: "British Council", focus: "Education innovation" },
    { name: "World Bank", focus: "Digital economy initiatives" },
  ];

  return (
    <>
      <SEOHead 
        title="Rwanda Government Partnership | NEXT_ AI Entrepreneurship Program"
        description="Strategic partnership proposal for Rwanda Development Board and Ministry of Education. Train 100,000 young Rwandan founders with AI entrepreneurship skills."
      />
      <div className="min-h-screen bg-background">
        <PublicHeader />
        
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 overflow-hidden">
          {/* Rwanda flag gradient accent */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#00A1DE]/10 via-background to-[#FAD201]/10" />
          <div className="absolute top-20 right-0 w-96 h-96 bg-[#20603D]/20 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto text-center"
            >
              <Badge variant="outline" className="mb-6 border-[#00A1DE]/50 text-[#00A1DE]">
                Ministry Partnership Proposal — Confidential
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                The Next Generation of{" "}
                <span className="bg-gradient-to-r from-[#00A1DE] via-[#FAD201] to-[#20603D] bg-clip-text text-transparent">
                  Rwandan Tech Leaders
                </span>{" "}
                Starts Here
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                A Strategic Partnership with Rwanda Development Board & Ministry of Education
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#00A1DE]" />
                  Rwanda Development Board
                </span>
                <span className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#FAD201]" />
                  Ministry of Education
                </span>
                <span className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#20603D]" />
                  Ministry of ICT & Innovation
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Global Race Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-center mb-4">
                The Global Race for AI Talent Has Begun
              </h2>
              <p className="text-center text-muted-foreground mb-12">
                Nations that prepare their youth now will lead the next century
              </p>
              
              <div className="grid md:grid-cols-4 gap-4 mb-12">
                {globalStats.map((stat, index) => (
                  <Card key={index} className="bg-card/50 border-border/50">
                    <CardContent className="p-4 text-center">
                      <Globe className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <p className="font-bold text-[#00A1DE]">{stat.country}</p>
                      <p className="text-sm text-muted-foreground">{stat.stat}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Card className="bg-gradient-to-r from-[#00A1DE]/10 via-[#FAD201]/10 to-[#20603D]/10 border-[#FAD201]/30">
                <CardContent className="p-8 text-center">
                  <p className="text-xl md:text-2xl font-medium">
                    Rwanda has become <span className="text-[#00A1DE] font-bold">Africa's tech hub</span>. 
                    Built the cleanest cities. Attracted global investment.
                    <br />
                    <span className="text-[#FAD201] font-bold">But who will build its future companies?</span>
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Vision 2050 Alignment Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-[#20603D]">Vision 2050 Aligned</Badge>
                <h2 className="text-3xl font-bold mb-4">
                  Strategic Alignment with National Goals
                </h2>
                <p className="text-muted-foreground">
                  NEXT_ directly supports Rwanda's transformation into Africa's Singapore
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {visionAlignment.map((item, index) => (
                  <Card key={index} className="bg-card/50 hover:bg-card transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-[#20603D]/20 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-5 h-5 text-[#20603D]" />
                        </div>
                        <div>
                          <h3 className="font-bold mb-1">{item.goal}</h3>
                          <p className="text-sm text-muted-foreground">{item.alignment}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <p className="text-center mt-8 text-muted-foreground italic">
                "Aligned with Vision 2050 and Smart Rwanda Master Plan"
              </p>
            </motion.div>
          </div>
        </section>

        {/* What Students Build Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">
                  What Students <span className="text-primary">Actually Build</span>
                </h2>
                <p className="text-muted-foreground">
                  Not presentations. Real products solving real African problems.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-card/50 border-[#00A1DE]/30">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-[#00A1DE]/20 flex items-center justify-center mx-auto mb-4">
                      <Target className="w-6 h-6 text-[#00A1DE]" />
                    </div>
                    <h3 className="font-bold mb-2">Week 1-4: Discovery</h3>
                    <p className="text-sm text-muted-foreground">
                      Find real problems in their community. Validate with real customers.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-card/50 border-[#FAD201]/30">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-[#FAD201]/20 flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-6 h-6 text-[#FAD201]" />
                    </div>
                    <h3 className="font-bold mb-2">Week 5-8: Build with AI</h3>
                    <p className="text-sm text-muted-foreground">
                      Use AI tools to build real apps, websites, and products.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-card/50 border-[#20603D]/30">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-[#20603D]/20 flex items-center justify-center mx-auto mb-4">
                      <Rocket className="w-6 h-6 text-[#20603D]" />
                    </div>
                    <h3 className="font-bold mb-2">Week 9-12: Launch</h3>
                    <p className="text-sm text-muted-foreground">
                      Real customers. Real revenue. Demo Day with investors.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pilot Proposal Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-[#00A1DE]">Pilot Proposal</Badge>
                <h2 className="text-3xl font-bold mb-4">
                  90-Day Proof of Concept
                </h2>
                <p className="text-muted-foreground">
                  Minimal investment. Maximum visibility. Measurable outcomes.
                </p>
              </div>
              
              <Card className="bg-gradient-to-br from-[#00A1DE]/10 via-background to-[#20603D]/10 border-2 border-[#FAD201]/30">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-4 gap-8 text-center mb-8">
                    <div>
                      <div className="text-4xl font-bold text-[#00A1DE]">5</div>
                      <p className="text-muted-foreground">Schools</p>
                      <p className="text-xs text-muted-foreground/70">Kigali-based</p>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-[#FAD201]">1,000</div>
                      <p className="text-muted-foreground">Students</p>
                      <p className="text-xs text-muted-foreground/70">Ages 9-15</p>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-[#20603D]">$35,000</div>
                      <p className="text-muted-foreground">Total Investment</p>
                      <p className="text-xs text-muted-foreground/70">$35/student</p>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-primary">90</div>
                      <p className="text-muted-foreground">Days</p>
                      <p className="text-xs text-muted-foreground/70">To first Demo Day</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-border/50 pt-6">
                    <h4 className="font-bold mb-4 text-center">What's Included:</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#20603D]" />
                        <span className="text-sm">Full Platform Access</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#20603D]" />
                        <span className="text-sm">Teacher Training (2hr)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#20603D]" />
                        <span className="text-sm">Analytics Dashboard</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#20603D]" />
                        <span className="text-sm">12-Week Curriculum</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#20603D]" />
                        <span className="text-sm">AI Building Tools</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#20603D]" />
                        <span className="text-sm">Demo Day Showcase</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* ROI Projections Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">
                  Return on Investment Projections
                </h2>
                <p className="text-muted-foreground">
                  Scaled for Rwanda's economy and youth population
                </p>
              </div>
              
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <table className="w-full">
                    <thead className="bg-[#00A1DE]/10">
                      <tr>
                        <th className="p-4 text-left font-bold">Metric</th>
                        {roiProjections.map((proj, i) => (
                          <th key={i} className="p-4 text-center font-bold">{proj.year}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/50">
                        <td className="p-4 flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#00A1DE]" />
                          Students Trained
                        </td>
                        {roiProjections.map((proj, i) => (
                          <td key={i} className="p-4 text-center font-medium">{proj.students}</td>
                        ))}
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="p-4 flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-[#FAD201]" />
                          Businesses Launched
                        </td>
                        {roiProjections.map((proj, i) => (
                          <td key={i} className="p-4 text-center font-medium">{proj.businesses}</td>
                        ))}
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="p-4 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-[#20603D]" />
                          Jobs Created
                        </td>
                        {roiProjections.map((proj, i) => (
                          <td key={i} className="p-4 text-center font-medium">{proj.jobs}</td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-4 flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-primary" />
                          Investment Required
                        </td>
                        {roiProjections.map((proj, i) => (
                          <td key={i} className="p-4 text-center font-medium">{proj.investment}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </CardContent>
              </Card>
              
              <p className="text-center mt-6 text-sm text-muted-foreground">
                *Based on 20% business launch rate and 4 jobs created per successful business
              </p>
            </motion.div>
          </div>
        </section>

        {/* Teacher Readiness Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">
                  Zero Teacher Burden
                </h2>
                <p className="text-muted-foreground">
                  2-hour training. Platform does the teaching.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-card/50">
                  <CardContent className="p-6 text-center">
                    <Clock className="w-10 h-10 mx-auto mb-4 text-primary" />
                    <h3 className="font-bold mb-2">2-Hour Training</h3>
                    <p className="text-sm text-muted-foreground">
                      Teachers become facilitators, not AI experts
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-card/50">
                  <CardContent className="p-6 text-center">
                    <Zap className="w-10 h-10 mx-auto mb-4 text-[#FAD201]" />
                    <h3 className="font-bold mb-2">Platform-Led</h3>
                    <p className="text-sm text-muted-foreground">
                      AI Coach guides each student individually
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-card/50">
                  <CardContent className="p-6 text-center">
                    <Globe className="w-10 h-10 mx-auto mb-4 text-[#20603D]" />
                    <h3 className="font-bold mb-2">English Curriculum</h3>
                    <p className="text-sm text-muted-foreground">
                      Matches Rwanda's education system. Kinyarwanda roadmap.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why NEXT_ Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">
                  Why NEXT_?
                </h2>
                <p className="text-muted-foreground">
                  The only program built specifically for the AI era
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-card/50 border-primary/30">
                  <CardContent className="p-6">
                    <Award className="w-10 h-10 mb-4 text-primary" />
                    <h3 className="font-bold mb-2">Global Proof</h3>
                    <p className="text-sm text-muted-foreground">
                      2,050+ students across 195 countries. Proven curriculum.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-card/50 border-[#FAD201]/30">
                  <CardContent className="p-6">
                    <Zap className="w-10 h-10 mb-4 text-[#FAD201]" />
                    <h3 className="font-bold mb-2">AI-Powered Scale</h3>
                    <p className="text-sm text-muted-foreground">
                      AI Coach enables 1:1 mentorship at scale. Ready for all of Africa.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-card/50 border-[#20603D]/30">
                  <CardContent className="p-6">
                    <Globe className="w-10 h-10 mb-4 text-[#20603D]" />
                    <h3 className="font-bold mb-2">African Success Stories</h3>
                    <p className="text-sm text-muted-foreground">
                      Students solving local problems with global-quality tools.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Development Partner Funding Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-[#FAD201] text-background">Funding Options</Badge>
                <h2 className="text-3xl font-bold mb-4">
                  Development Partner Co-Investment
                </h2>
                <p className="text-muted-foreground">
                  Multiple pathways to zero-cost or subsidized implementation
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {developmentPartners.map((partner, index) => (
                  <Card key={index} className="bg-card/50 hover:bg-card transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#00A1DE]/20 flex items-center justify-center shrink-0">
                          <Handshake className="w-5 h-5 text-[#00A1DE]" />
                        </div>
                        <div>
                          <h3 className="font-bold">{partner.name}</h3>
                          <p className="text-sm text-muted-foreground">{partner.focus}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Card className="bg-gradient-to-r from-[#20603D]/20 to-[#FAD201]/20 border-[#20603D]/50">
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-bold mb-4">Zero-Cost Pilot Option</h3>
                  <p className="text-muted-foreground mb-4">
                    NEXT_ will work with Rwanda Development Board to secure development partner 
                    funding for a fully subsidized pilot program. Government provides coordination 
                    and school access; partners fund the implementation.
                  </p>
                  <Badge className="bg-[#20603D]">Joint Proposal Available</Badge>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* PDF Download Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center"
            >
              <Download className="w-12 h-12 mx-auto mb-6 text-primary" />
              <h2 className="text-2xl font-bold mb-4">
                Executive Briefing Document
              </h2>
              <p className="text-muted-foreground mb-6">
                2-page summary for Ministry leadership and RDB executives
              </p>
              <Button 
                size="lg" 
                className="bg-[#00A1DE] hover:bg-[#00A1DE]/90"
                onClick={() => window.open('/Rwanda-Government-Briefing.html', '_blank')}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Executive Briefing
              </Button>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-[#00A1DE]/20 via-background to-[#20603D]/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold mb-4">
                Schedule a Confidential Ministry Briefing
              </h2>
              <p className="text-muted-foreground mb-8">
                Direct conversation with NEXT_ leadership about Rwanda implementation
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-[#20603D] hover:bg-[#20603D]/90"
                  onClick={() => window.location.href = 'mailto:government@nextbillionlab.com?subject=Rwanda Ministry Briefing Request'}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  government@nextbillionlab.com
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground mt-6">
                This proposal is confidential and prepared specifically for Rwanda Development Board and Ministry leadership.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-border/50">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>© 2025 NEXT_ | Building What's NEXT_ for Rwanda</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default RwandaPitch;
