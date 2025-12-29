import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SEOHead } from "@/components/seo";
import { 
  Brain, 
  Lightbulb, 
  Users, 
  Globe, 
  CheckCircle,
  ArrowRight,
  Mail,
  Zap,
  Award,
  GraduationCap,
  Sparkles,
  BookOpen,
  Wrench,
  Crown,
  Target,
  Mic,
  BarChart3,
  TrendingUp,
  Activity,
  Shield,
  Clock,
  AlertTriangle,
  Rocket,
  Camera,
  Newspaper,
  Play,
  Star
} from "lucide-react";
import lwlLogo from "@/assets/lwl-logo-white.png";
import base44Logo from "@/assets/base44-logo-white-new.svg";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const EmailCTA = ({ variant = "primary", size = "default" }: { variant?: "primary" | "secondary" | "outline"; size?: "default" | "lg" }) => {
  const baseClasses = size === "lg" ? "text-lg px-10 py-7" : "px-6 py-4";
  
  if (variant === "primary") {
    return (
      <Button 
        size="lg" 
        className={`${baseClasses} bg-gradient-to-r from-primary via-primary to-amber-500 hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] group`}
        onClick={() => window.location.href = 'mailto:gunjan@learnwithleaders.com?subject=UAE%20Partnership%20Inquiry'}
      >
        <Mail className="mr-2 h-5 w-5 group-hover:animate-pulse" />
        Reach Us: gunjan@learnwithleaders.com
      </Button>
    );
  }
  
  return (
    <Button 
      size={size === "lg" ? "lg" : "default"}
      variant="outline"
      className={`${baseClasses} border-primary/50 hover:bg-primary/10 hover:border-primary transition-all duration-300 hover:scale-[1.02]`}
      onClick={() => window.location.href = 'mailto:gunjan@learnwithleaders.com?subject=UAE%20Partnership%20Inquiry'}
    >
      <Mail className="mr-2 h-5 w-5" />
      gunjan@learnwithleaders.com
    </Button>
  );
};

export default function GovernmentPitch() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <SEOHead
        title="Strategic Partnership Proposal | NEXT_ × UAE"
        description="National AI Education Program - Teaching AI fluency to the next generation through entrepreneurship"
        keywords="UAE AI education, AI fluency, youth AI program, Ministry of AI, NEXT_ CERTIFIED"
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-amber-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50" />
        
        {/* Subtle animated orbs */}
        <motion.div 
          className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 left-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div 
            className="max-w-5xl mx-auto text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Badge variant="outline" className="mb-8 px-6 py-2.5 text-sm border-primary/40 bg-primary/5 backdrop-blur-sm">
                <Crown className="w-4 h-4 mr-2 text-primary" />
                <span className="text-primary font-medium">STRATEGIC PARTNERSHIP PROPOSAL</span>
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1] tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span className="text-muted-foreground">1 Million AI</span> <span className="bg-gradient-to-r from-primary via-amber-500 to-primary bg-clip-text text-transparent">Leaders.</span><br />
              <span className="text-foreground">Starting Age 12.</span>
            </motion.h1>
            
            <motion.div 
              className="max-w-4xl mx-auto mb-10 p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-amber-500/10 border border-primary/30 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <p className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                <span className="text-primary">50 student startups</span> guaranteed in 90 days.
              </p>
              <p className="text-xl text-muted-foreground mb-4">
                Or we walk away.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-6 pt-6 border-t border-border/50">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">1,000</div>
                  <div className="text-sm text-muted-foreground">Students in Pilot</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-500">50+</div>
                  <div className="text-sm text-muted-foreground">Verified Startups Launched</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">90</div>
                  <div className="text-sm text-muted-foreground">Days to Results</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <EmailCTA variant="primary" size="lg" />
              <p className="text-sm text-muted-foreground">Direct line to our government partnerships team</p>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2">
            <motion.div 
              className="w-1.5 h-1.5 bg-primary rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* THE GUARANTEE - Bold Deliverables Section */}
      <section className="py-28 bg-gradient-to-br from-primary/5 via-background to-amber-500/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-16"
            {...fadeInUp}
          >
            <Badge className="mb-6 bg-green-500/10 text-green-600 border-green-500/30 px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              RISK-FREE GUARANTEE
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              What We <span className="text-primary">Deliver</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Not promises. <span className="text-foreground font-bold">Guarantees.</span>
            </p>
          </motion.div>

          <motion.div {...fadeInUp} className="mb-12">
            <Card className="max-w-5xl mx-auto bg-gradient-to-br from-primary/10 to-amber-500/10 border-primary/30 p-10">
              <CardContent>
                <div className="grid md:grid-cols-3 gap-8 text-center mb-10">
                  <div className="p-6 bg-background/50 rounded-2xl border border-border/50">
                    <div className="text-5xl font-bold text-primary mb-2">1,000</div>
                    <div className="text-lg font-semibold text-foreground mb-1">Students Enrolled</div>
                    <div className="text-sm text-muted-foreground">Access to 5-10 pilot schools</div>
                  </div>
                  <div className="p-6 bg-primary/10 rounded-2xl border border-primary/30">
                    <div className="text-5xl font-bold text-primary mb-2">50+</div>
                    <div className="text-lg font-semibold text-foreground mb-1">Startups Launched</div>
                    <div className="text-sm text-primary font-medium">Verified, live products</div>
                  </div>
                  <div className="p-6 bg-background/50 rounded-2xl border border-border/50">
                    <div className="text-5xl font-bold text-amber-500 mb-2">90</div>
                    <div className="text-lg font-semibold text-foreground mb-1">Days</div>
                    <div className="text-sm text-muted-foreground">From kickoff to Demo Day</div>
                  </div>
                </div>

                <div className="text-center p-6 bg-green-500/10 rounded-xl border border-green-500/30">
                  <p className="text-xl font-bold text-green-600 mb-2">
                    If we don't deliver 50 verified startups in 90 days — we walk away.
                  </p>
                  <p className="text-muted-foreground">
                    No Phase 2. No obligation. Results or nothing.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* What Students Get */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div {...fadeInUp}>
              <Card className="h-full bg-card border-border/50 p-8 hover:shadow-lg transition-all duration-300">
                <CardContent>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center">
                      <Rocket className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">What Each Student Gets</h3>
                      <p className="text-sm text-muted-foreground">Resources for their startup journey</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {[
                      "12-week structured AI builder curriculum",
                      "Access to enterprise AI tools (Base44)",
                      "Personal AI Coach for stuck moments",
                      "Demo Day presentation slot",
                      "NEXT_ CERTIFIED credential",
                      "Resources for their startup journey"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-foreground">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div {...fadeInUp}>
              <Card className="h-full bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/30 p-8 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300">
                <CardContent>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/20 flex items-center justify-center">
                      <GraduationCap className="h-7 w-7 text-amber-600" />
                    </div>
                    <div>
                      <Badge className="mb-1 bg-amber-500 text-white text-xs">HARVARD MENTORS</Badge>
                      <h3 className="text-xl font-bold text-amber-600">Elite Mentorship</h3>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {[
                      "Harvard-trained mentors coach every student",
                      "1:1 office hours with industry experts",
                      "Mentorship usually reserved for Stanford MBAs",
                      "Now available to 12-year-olds in UAE"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-foreground">
                        <Star className="h-5 w-5 text-amber-500 flex-shrink-0" />
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                    <p className="text-sm text-amber-600 text-center font-medium">
                      The same caliber of mentorship that built billion-dollar startups — now accessible to UAE's youth.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHAT WE ASK FOR */}
      <section className="py-28 bg-muted/30 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-16"
            {...fadeInUp}
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/30 px-4 py-2">
              <Target className="w-4 h-4 mr-2" />
              THE ASK
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              What We Need <span className="text-primary">From You</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We bring the curriculum, technology, and mentors.<br />
              <span className="text-foreground font-semibold">You bring the access and platform.</span>
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { 
                icon: "🏫", 
                title: "School Access", 
                desc: "Access to 5-10 schools for the pilot program",
                why: "Launch with real students"
              },
              { 
                icon: "📜", 
                title: "Ministry Endorsement", 
                desc: "Official letter of support from Ministry of AI",
                why: "Principals take it seriously"
              },
              { 
                icon: "🚀", 
                title: "Startup Resources", 
                desc: "Demo Day venue, mentorship hours, press coverage",
                why: "Celebrate student success"
              },
              { 
                icon: "📣", 
                title: "Announcement Platform", 
                desc: "Public platform to share success globally",
                why: "UAE leads the narrative"
              }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="h-full bg-card border-border/50 p-6 hover:shadow-lg transition-all duration-300 text-center">
                  <CardContent>
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
                    <div className="p-2 bg-primary/5 rounded-lg">
                      <p className="text-xs text-primary font-medium">Why: {item.why}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="py-28 bg-gradient-to-br from-red-500/5 via-background to-amber-500/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-red-500/10 via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-16"
            {...fadeInUp}
          >
            <Badge className="mb-6 bg-red-500/10 text-red-500 border-red-500/30 px-4 py-2">
              <Clock className="w-4 h-4 mr-2" />
              TIME-SENSITIVE OPPORTUNITY
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              The <span className="text-red-500">18-Month Window</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Before big tech saturates K-12 AI education.<br />
              <span className="text-foreground font-semibold">First-mover advantage is everything.</span>
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            <motion.div {...fadeInUp}>
              <Card className="h-full bg-gradient-to-br from-red-500/5 to-transparent border-red-500/20 p-8 hover:border-red-500/40 transition-all duration-300">
                <CardContent>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center">
                      <AlertTriangle className="h-7 w-7 text-red-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">The Competition is Watching</h3>
                      <p className="text-sm text-muted-foreground">Global race for AI education leadership</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-4">
                    {[
                      { country: "Saudi Arabia", status: "Investing heavily in AI education" },
                      { country: "Qatar", status: "Qatar Foundation exploring K-12 AI" },
                      { country: "Singapore", status: "Already piloting AI curriculum" },
                      { country: "China", status: "Mandatory AI education in schools" }
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm">
                        <Globe className="h-4 w-4 text-red-500 flex-shrink-0" />
                        <span><strong className="text-foreground">{item.country}:</strong> <span className="text-muted-foreground">{item.status}</span></span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 p-4 bg-red-500/5 rounded-xl border border-red-500/20">
                    <p className="text-sm text-red-500 font-medium text-center">
                      <strong>The question isn't if</strong> someone will lead K-12 AI education globally.<br />
                      <strong>The question is who.</strong>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div {...fadeInUp}>
              <Card className="h-full bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30 p-8 hover:border-primary/50 transition-all duration-300">
                <CardContent>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center">
                      <Rocket className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary">UAE's First-Mover Advantage</h3>
                      <p className="text-sm text-muted-foreground">What acting now secures</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-4">
                    {[
                      "Global recognition as the AI education leader",
                      "Standard-setting for MENA region",
                      "Export potential to GCC nations",
                      "Talent pipeline for 2035 economy",
                      "Media coverage of UAE's innovation leadership"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-foreground text-sm">
                        <Sparkles className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 p-4 bg-primary/10 rounded-xl border border-primary/20">
                    <p className="text-sm text-primary font-medium text-center">
                      UAE has the vision. UAE has the infrastructure.<br />
                      <strong>Now: the curriculum to match.</strong>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div 
            className="max-w-3xl mx-auto text-center"
            {...fadeInUp}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 p-8">
              <CardContent>
                <h3 className="text-2xl font-bold mb-4">The Cost of Waiting</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Every year delayed = <span className="text-red-500 font-semibold">1 generation</span> that enters the workforce 
                  without AI fluency.
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-muted/50 rounded-xl">
                    <div className="text-3xl font-bold text-foreground">2026</div>
                    <div className="text-sm text-muted-foreground">500 AI-fluent graduates</div>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-xl">
                    <div className="text-3xl font-bold text-foreground">2027</div>
                    <div className="text-sm text-muted-foreground">25,000 AI-fluent graduates</div>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
                    <div className="text-3xl font-bold text-primary">2030</div>
                    <div className="text-sm text-primary font-medium">100,000+ AI-fluent citizens</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* The Category */}
      <section className="py-28 bg-muted/30 relative">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-16"
            {...fadeInUp}
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/30 px-4 py-2">THE CATEGORY</Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              A Category <span className="text-primary">Without a Leader</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              There are 10,000 entrepreneurship programs.<br />
              There are 1,000 prompt training courses.<br />
              <span className="text-foreground font-semibold">There is no category leader in AI education for ages 9-16.</span>
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <Card className="bg-card border-border/50 text-center p-8 h-full hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="text-5xl font-bold text-muted-foreground mb-2">10,000+</div>
                  <h3 className="text-lg font-semibold mb-2">Entrepreneurship Programs</h3>
                  <p className="text-sm text-muted-foreground">Teaching business skills to adults</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-card border-border/50 text-center p-8 h-full hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="text-5xl font-bold text-muted-foreground mb-2">1,000+</div>
                  <h3 className="text-lg font-semibold mb-2">Prompt Training Courses</h3>
                  <p className="text-sm text-muted-foreground">Teaching adults to use ChatGPT</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30 text-center p-8 h-full hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="text-5xl font-bold text-primary mb-2">1</div>
                  <h3 className="text-lg font-semibold mb-2">AI Education for Ages 9-16</h3>
                  <p className="text-sm text-primary font-medium">NEXT_ is the category leader</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div 
            className="text-center"
            {...fadeInUp}
          >
            <p className="text-2xl font-semibold text-foreground">
              UAE can <span className="text-primary">own this category globally.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Team - LWL */}
      <section className="py-28 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-16"
            {...fadeInUp}
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/30 px-4 py-2">THE TEAM</Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Built by <span className="text-primary">Proven Educators</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              NEXT_ is the flagship initiative of <span className="text-foreground font-semibold">Learn With Leaders</span> — 
              a global education company that has been working with students across the world.
            </p>
          </motion.div>

          {/* Mission Statement */}
          <motion.div 
            {...fadeInUp}
            className="max-w-4xl mx-auto mb-12"
          >
            <div className="bg-gradient-to-r from-primary/20 via-amber-500/20 to-primary/20 rounded-2xl p-8 border border-primary/30 text-center">
              <span className="text-sm font-semibold text-amber-400 uppercase tracking-wider">Our Mission</span>
              <h3 className="text-3xl md:text-4xl font-bold mt-2 bg-gradient-to-r from-white via-amber-200 to-white bg-clip-text text-transparent">
                1 Million AI Leaders by 2030
              </h3>
              <p className="text-lg text-foreground font-semibold mt-2">
                Starting with your 1,000.
              </p>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Give us 1,000 students. We'll give you 50 startups. 90 days.
                That's the proof of concept. Then we scale together.
              </p>
            </div>
          </motion.div>

          <motion.div {...fadeInUp}>
            <Card className="max-w-4xl mx-auto bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/30 p-10 mb-12">
              <CardContent>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0 p-6 bg-background/50 rounded-2xl backdrop-blur-sm">
                    <img 
                      src={lwlLogo} 
                      alt="Learn With Leaders" 
                      className="h-24 w-auto"
                    />
                  </div>
                  <div className="text-center md:text-left flex-1">
                    <h3 className="text-2xl font-bold mb-4">Learn With Leaders</h3>
                    <p className="text-muted-foreground mb-6">
                      A global education company dedicated to preparing the next generation for success in an AI-driven world.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { value: "6+", label: "Years in Education" },
                        { value: "80+", label: "Countries Served" },
                        { value: "35K+", label: "Students Impacted" },
                        { value: "50+", label: "School Partnerships" }
                      ].map((stat, i) => (
                        <div key={i} className="text-center p-4 bg-background/50 rounded-xl backdrop-blur-sm">
                          <div className="text-2xl font-bold text-primary">{stat.value}</div>
                          <div className="text-xs text-muted-foreground">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Base44 Partnership */}
      <section className="py-28 bg-muted/30 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-16"
            {...fadeInUp}
          >
            <Badge className="mb-6 bg-amber-500/10 text-amber-600 border-amber-500/30 px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              TECHNOLOGY BACKBONE
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Powered by <span className="text-amber-500">Base44</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The enterprise AI coding platform trusted by businesses worldwide.<br />
              <span className="text-foreground font-semibold">World-class infrastructure. Government-grade reliability.</span>
            </p>
          </motion.div>

          <motion.div {...fadeInUp}>
            <Card className="max-w-4xl mx-auto bg-card border-amber-500/30 p-10 mb-12">
              <CardContent>
                <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
                  <div className="flex-shrink-0 p-6 bg-background rounded-2xl border border-border/50">
                    <img 
                      src={base44Logo} 
                      alt="Base44" 
                      className="h-12 w-auto"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Base44 × NEXT_ Partnership</h3>
                    <p className="text-muted-foreground">
                      Base44 provides the AI coding infrastructure that powers NEXT_'s hands-on learning experience. 
                      Students build real applications using the same enterprise tools used by companies worldwide.
                    </p>
                  </div>
                </div>

                <h4 className="text-lg font-bold mb-6 text-center">6-Pillar Partnership Structure</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { icon: "🎓", title: "10,000 Student Credits", desc: "Immediate capacity for Phase 1" },
                    { icon: "🏆", title: "Co-Branded Certification", desc: "\"NEXT_ × UAE Ministry\" credentials" },
                    { icon: "🏅", title: "National AI Olympiad", desc: "Annual competition platform" },
                    { icon: "🏢", title: "Regional HQ in Dubai", desc: "Local presence & support" },
                    { icon: "👩‍🏫", title: "Teacher Training Program", desc: "Certified AI educators" },
                    { icon: "📊", title: "Government Dashboard", desc: "Real-time progress reporting" }
                  ].map((item, i) => (
                    <div key={i} className="p-5 bg-amber-500/5 rounded-xl border border-amber-500/20 text-center hover:bg-amber-500/10 transition-colors">
                      <div className="text-3xl mb-3">{item.icon}</div>
                      <h5 className="font-semibold text-foreground mb-1">{item.title}</h5>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            className="text-center"
            {...fadeInUp}
          >
            <div className="inline-flex items-center gap-4 p-5 bg-gradient-to-r from-primary/10 via-amber-500/10 to-primary/10 rounded-2xl border border-primary/20">
              <span className="text-lg font-semibold text-primary">LWL Curriculum</span>
              <span className="text-2xl text-muted-foreground">×</span>
              <span className="text-lg font-semibold text-amber-500">Base44 Infrastructure</span>
              <span className="text-2xl text-muted-foreground">=</span>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-amber-500 bg-clip-text text-transparent">NEXT_</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Consumer vs Builder */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-16"
            {...fadeInUp}
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/30 px-4 py-2">THE DIFFERENCE</Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              AI Users vs. <span className="text-primary">AI Builders</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Like the difference between <span className="text-foreground">ordering food</span> and <span className="text-primary font-semibold">running a restaurant.</span>
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div {...fadeInUp}>
              <Card className="h-full bg-card border-border/50 p-8 hover:shadow-lg transition-all duration-300">
                <CardContent>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
                      <BookOpen className="h-7 w-7 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">AI User</h3>
                      <p className="text-sm text-muted-foreground">What most programs teach</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-3">
                    {[
                      "Uses ChatGPT for tasks",
                      "Writes decent prompts",
                      "Understands AI capabilities",
                      "Consumes AI-generated content"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-muted-foreground">
                        <CheckCircle className="h-5 w-5 text-muted-foreground/50 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-6 border-t border-border/50">
                    <p className="text-muted-foreground">
                      <span className="font-semibold text-foreground">Result:</span> Good employees for AI companies
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div {...fadeInUp}>
              <Card className="h-full bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30 p-8 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                <CardContent>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center">
                      <Rocket className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary">AI Builder</h3>
                      <p className="text-sm text-muted-foreground">What NEXT_ creates</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-3">
                    {[
                      "Ships real products using AI",
                      "Solves problems for real users",
                      "Launches to paying customers",
                      "Creates jobs, not just fills them"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-foreground">
                        <Sparkles className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-6 border-t border-primary/20">
                    <p className="text-foreground">
                      <span className="font-semibold text-primary">Result:</span> Founders who build UAE's AI economy
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.p 
            className="text-center text-xl text-muted-foreground mt-12 max-w-3xl mx-auto"
            {...fadeInUp}
          >
            AI Users work for AI companies.<br />
            <span className="text-primary font-semibold">AI Builders start them.</span>
          </motion.p>
        </div>
      </section>

      {/* Why Entrepreneurship */}
      <section className="py-28 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-16"
            {...fadeInUp}
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/30 px-4 py-2">THE METHOD</Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Why <span className="text-primary">Entrepreneurship?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Entrepreneurship is the <span className="text-foreground font-semibold">teaching vehicle</span>, not the destination.<br />
              Like Montessori uses hands-on learning — we use building real things.
            </p>
          </motion.div>

          <motion.div {...fadeInUp}>
            <Card className="max-w-4xl mx-auto bg-card border-border/50 p-10">
              <CardContent>
                <div className="grid md:grid-cols-2 gap-10">
                  <div>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Wrench className="h-5 w-5 text-primary" />
                      The Method
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Students learn AI by <span className="text-foreground font-medium">building something real</span>, not by reading about it.
                    </p>
                    <ul className="space-y-3 text-sm">
                      {[
                        "Identify a real problem",
                        "Use AI to design a solution",
                        "Build a working product",
                        "Launch to real users"
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-muted-foreground">
                          <ArrowRight className="h-4 w-4 text-primary flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-primary" />
                      The Skill
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      The output is businesses. The <span className="text-foreground font-medium">skill is AI fluency.</span>
                    </p>
                    <p className="text-muted-foreground text-sm mb-4">
                      That skill applies to <span className="text-foreground">every career</span>: medicine, law, engineering, art, science, government.
                    </p>
                    <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                      <p className="text-sm text-primary font-medium">
                        This is not an entrepreneurship program.<br />
                        It's AI education through entrepreneurship.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Age Tracks */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-16"
            {...fadeInUp}
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/30 px-4 py-2">DESIGNED FOR YOUNG MINDS</Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Built for Ages <span className="text-primary">9-16</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              No prompt training course works for 9-year-olds.<br />
              <span className="text-foreground font-semibold">NEXT_ was built from the ground up for young minds.</span>
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { age: "9-11", name: "Junior Track", emoji: "🌱", color: "green", items: ["15-25 minute missions", "Visual, playful learning", "Simple AI tools (Glide)", "Kid-friendly examples"] },
              { age: "12-14", name: "Teen Track", emoji: "🚀", color: "blue", items: ["25-40 minute missions", "Balanced complexity", "Intermediate tools (Base44)", "Real-world applications"] },
              { age: "15-16", name: "Advanced Track", emoji: "⚡", color: "purple", items: ["35-50 minute missions", "Professional complexity", "Advanced tools (Lovable)", "Investor-grade outputs"] }
            ].map((track, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="h-full bg-card border-border/50 p-8 hover:shadow-lg transition-all duration-300">
                  <CardContent className="text-center">
                    <div className={`w-16 h-16 rounded-2xl bg-${track.color}-500/10 flex items-center justify-center mx-auto mb-4`}>
                      <span className="text-3xl">{track.emoji}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{track.name}</h3>
                    <p className="text-primary font-semibold mb-4">Ages {track.age}</p>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      {track.items.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Certification Levels */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div {...fadeInUp}>
              <Card className="h-full bg-card border-border/50 p-8">
                <CardContent>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center">
                      <BookOpen className="h-7 w-7 text-green-500" />
                    </div>
                    <div>
                      <Badge variant="outline" className="mb-1">LEVEL 1</Badge>
                      <h3 className="text-xl font-bold">AI Foundations</h3>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">6 modules • ~4 hours • Immediate certification</p>
                  
                  <div className="space-y-2 mb-6">
                    <p className="text-sm font-semibold text-foreground">What students learn:</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {[
                        "Introduction to AI Tools",
                        "Anatomy of a Great Prompt",
                        "Prompt Patterns for Builders",
                        "AI Tool Deep-Dive: Building Apps",
                        "AI Tool Deep-Dive: Design Tools",
                        "Your First AI Project"
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                    <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                      ✓ LinkedIn-shareable credential
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div {...fadeInUp}>
              <Card className="h-full bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30 p-8">
                <CardContent>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center">
                      <Award className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <Badge className="mb-1 bg-primary text-primary-foreground">LEVEL 2</Badge>
                      <h3 className="text-xl font-bold text-primary">AI Builder</h3>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">12 weeks • 180 missions • Complete certification</p>
                  
                  <div className="space-y-2 mb-6">
                    <p className="text-sm font-semibold text-foreground">5-Phase Journey:</p>
                    <ul className="space-y-2 text-sm">
                      {[
                        { phase: "Discovery", weeks: "1-2", desc: "Find real problems" },
                        { phase: "Validation", weeks: "3-4", desc: "Customer research" },
                        { phase: "Building", weeks: "5-7", desc: "Build MVP with AI" },
                        { phase: "Growth", weeks: "8-10", desc: "Launch & scale" },
                        { phase: "Pitch", weeks: "11-12", desc: "Present to investors" }
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-foreground">
                          <Star className="h-4 w-4 text-primary flex-shrink-0" />
                          <span><strong>{item.phase}</strong> (Weeks {item.weeks}): {item.desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
                    <p className="text-sm text-primary font-medium">
                      ★ Full AI Fluency — builds real products
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* THE TANK */}
      <section className="py-28 bg-gradient-to-br from-amber-500/5 via-background to-amber-500/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-16"
            {...fadeInUp}
          >
            <Badge className="mb-6 bg-amber-500/10 text-amber-600 border-amber-500/30 px-4 py-2">🦈 FIRST-OF-ITS-KIND GLOBALLY</Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              THE <span className="text-amber-500">TANK</span>
            </h2>
            <p className="text-2xl text-foreground font-semibold mb-6">
              The world's first AI-powered Shark Tank for young founders.
            </p>
            <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-amber-500/5 border border-amber-500/20">
              <p className="text-xl text-muted-foreground mb-4">
                <span className="text-foreground font-bold">Speaking is a thinking problem.</span>
              </p>
              <p className="text-lg text-muted-foreground">
                The brilliant kids who don't speak up often have the <span className="text-foreground">best ideas</span>.
                THE TANK gives them a <span className="text-amber-500 font-semibold">safe space to find their voice</span> — 
                so by Demo Day, <span className="text-foreground font-semibold">they own the stage.</span>
              </p>
            </div>
          </motion.div>

          <motion.div {...fadeInUp}>
            <Card className="max-w-4xl mx-auto bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/30 p-10 mb-12">
              <CardContent>
                <h3 className="text-2xl font-bold text-center text-amber-500 mb-8">
                  From Safe Space → World Ready
                </h3>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  {[
                    { emoji: "🏠", title: "Practice from Home", desc: "Their bedroom becomes a pitch studio. No judgment. No pressure. Just growth." },
                    { emoji: "🎯", title: "Unlimited Practice", desc: "Pitch 100 times if needed. AI investors never get tired, never judge, always help." },
                    { emoji: "🌍", title: "Ready for Global Stages", desc: "The same simulation that stops shy kids from speaking becomes their superpower." }
                  ].map((item, i) => (
                    <div key={i} className="space-y-3">
                      <div className="text-5xl">{item.emoji}</div>
                      <h4 className="font-semibold text-foreground text-lg">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            <motion.div {...fadeInUp}>
              <Card className="h-full bg-card border-border/50 p-8">
                <CardContent>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                      <Mic className="h-7 w-7 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">5 AI Investor Personas</h3>
                      <p className="text-sm text-muted-foreground">Different styles, different challenges</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-3">
                    {[
                      "The Skeptic — challenges every assumption",
                      "The Mentor — supportive but probing",
                      "The Time-Crunched — wants quick answers",
                      "The Numbers Person — needs data",
                      "The Visionary — wants the big picture"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-muted-foreground text-sm">
                        <CheckCircle className="h-4 w-4 text-amber-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div {...fadeInUp}>
              <Card className="h-full bg-gradient-to-br from-amber-500/5 to-amber-500/10 border-amber-500/30 p-8">
                <CardContent>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/20 flex items-center justify-center">
                      <BarChart3 className="h-7 w-7 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-amber-600">Real-Time AI Scoring</h3>
                      <p className="text-sm text-muted-foreground">5 dimensions analyzed instantly</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-3">
                    {[
                      { dim: "Clarity", desc: "Is the message crystal clear?" },
                      { dim: "Confidence", desc: "Does the student believe it?" },
                      { dim: "Structure", desc: "Problem → Solution → Ask" },
                      { dim: "Engagement", desc: "Would investors lean in?" },
                      { dim: "Call to Action", desc: "Clear next step?" }
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-foreground text-sm">
                        <Sparkles className="h-4 w-4 text-amber-500 flex-shrink-0" />
                        <span><strong>{item.dim}:</strong> {item.desc}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                    <p className="text-sm text-amber-600 font-medium text-center">
                      <strong>Nervous Founder → Shark Tamer</strong><br />
                      At their own pace. In their own time.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div 
            className="text-center max-w-3xl mx-auto"
            {...fadeInUp}
          >
            <p className="text-xl text-foreground font-semibold mb-2">
              No student left behind because they were too shy to speak up.
            </p>
            <p className="text-lg text-muted-foreground">
              THE TANK democratizes confidence — every child gets unlimited practice 
              until they're ready for global platforms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skill Intelligence */}
      <section className="py-28 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-16"
            {...fadeInUp}
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/30 px-4 py-2">SCHOOL DASHBOARD</Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Skill <span className="text-primary">Intelligence</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              AI-powered tracking across 8 skill categories.<br />
              <span className="text-foreground font-semibold">Administrators see real progress, not just grades.</span>
            </p>
          </motion.div>

          <motion.div {...fadeInUp}>
            <Card className="max-w-5xl mx-auto bg-card border-border/50 p-10 mb-12">
              <CardContent>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mb-10">
                  {[
                    { skill: "Creative Thinking", icon: "💡" },
                    { skill: "Critical Reasoning", icon: "🧠" },
                    { skill: "Communication", icon: "🎤" },
                    { skill: "Entrepreneurial Mindset", icon: "🚀" },
                    { skill: "Financial Literacy", icon: "💰" },
                    { skill: "Collaboration", icon: "🤝" },
                    { skill: "Persistence & Grit", icon: "💪" },
                    { skill: "AI Fluency", icon: "⚡" }
                  ].map((item, i) => (
                    <div key={i} className="text-center p-4 bg-muted/50 rounded-xl border border-border/50 hover:bg-muted transition-colors">
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <div className="text-[10px] font-medium text-foreground leading-tight">{item.skill}</div>
                    </div>
                  ))}
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { icon: TrendingUp, color: "primary", title: "Weekly AI Insights", desc: "Automated progress analysis for each student" },
                    { icon: Target, color: "green-500", title: "Signature Strength Detection", desc: "Identify each student's unique superpower" },
                    { icon: Activity, color: "amber-500", title: "At-Risk Indicators", desc: "Early warning system for struggling students" }
                  ].map((item, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <item.icon className={`h-5 w-5 text-${item.color}`} />
                        <h4 className="font-semibold">{item.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            className="max-w-3xl mx-auto text-center"
            {...fadeInUp}
          >
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30 p-8">
              <CardContent>
                <h3 className="text-xl font-bold mb-4">Government Reporting Ready</h3>
                <p className="text-muted-foreground">
                  All skill data is aggregated for ministry-level reporting. Track AI fluency 
                  development across schools, regions, and demographics — 
                  <span className="text-foreground font-semibold"> measurable outcomes for every education dirham invested.</span>
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* 1 Million Prompt + NEXT_ */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-16"
            {...fadeInUp}
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/30 px-4 py-2">COMPLETE AI READINESS</Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              1 Million Prompt + NEXT_ = <span className="text-primary">Complete</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            <motion.div {...fadeInUp}>
              <Card className="h-full bg-card border-border/50 p-8">
                <CardContent>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
                      <Users className="h-7 w-7 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">1 Million Prompt</h3>
                      <p className="text-sm text-muted-foreground">Your existing initiative</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {[
                      "AI-literate workforce",
                      "Adults who can use AI tools",
                      "Employees ready for AI workplace"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-muted-foreground">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="text-center text-muted-foreground font-medium">
                    Creates excellent AI <span className="text-foreground">users</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div {...fadeInUp}>
              <Card className="h-full bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30 p-8">
                <CardContent>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center">
                      <Brain className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary">NEXT_</h3>
                      <p className="text-sm text-muted-foreground">The missing piece</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {[
                      "AI-fluent next generation",
                      "Young people who can BUILD with AI",
                      "Future leaders who will LEAD those workers"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-foreground">
                        <Sparkles className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="text-center text-primary font-semibold">
                    Creates future <span className="text-foreground">creators & leaders</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div 
            className="max-w-3xl mx-auto"
            {...fadeInUp}
          >
            <Card className="bg-card border-primary/30 p-10">
              <CardContent className="text-center">
                <Globe className="h-14 w-14 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4">
                  First Nation with <span className="text-primary">Complete AI Readiness</span>
                </h3>
                <p className="text-lg text-muted-foreground mb-4">
                  Adults AND the next generation.<br />
                  Workforce AND leadership pipeline.
                </p>
                <p className="text-xl font-semibold text-foreground">
                  No other nation has both. <span className="text-primary">UAE can be first.</span>
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Phase 1 Outcomes */}
      <section className="py-28 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-16"
            {...fadeInUp}
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/30 px-4 py-2">PHASE 1 OUTCOMES</Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              In 90 Days, <span className="text-primary">You Will Announce</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Press conference-ready outcomes. <span className="text-foreground font-bold">Guaranteed.</span>
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { icon: GraduationCap, title: "1,000 AI Builders Trained", desc: "Emirati students ages 12-16 who can BUILD with AI — not just use it" },
              { icon: Zap, title: "50+ Verified Startups", desc: "Real, live products solving UAE challenges — built by young founders" },
              { icon: Award, title: "National Demo Day", desc: "Minister of AI with 12-year-old presenting their startup to global press" },
              { icon: Target, title: "Proof for National Scale", desc: "Data-backed model ready for rollout to all Emirates" }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="h-full bg-card border-border/50 p-8 hover:shadow-lg transition-all duration-300">
                  <CardContent className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-lg">{item.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Partnership Tiers */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-16"
            {...fadeInUp}
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/30 px-4 py-2">PARTNERSHIP TIERS</Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Choose Your <span className="text-primary">Scale</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Every tier comes with <span className="text-foreground font-bold">guaranteed startup outcomes.</span>
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <Card className="h-full bg-card border-border/50 p-8 hover:shadow-lg transition-all duration-300">
                <CardContent>
                  <Badge variant="outline" className="mb-4">PILOT</Badge>
                  <h3 className="text-xl font-bold mb-2">Proof of Concept</h3>
                  
                  <div className="my-6 p-4 bg-muted/50 rounded-xl text-center">
                    <div className="text-2xl font-bold text-primary">1,000 students</div>
                    <div className="text-lg font-semibold text-foreground">→ 50 startups guaranteed</div>
                  </div>
                  
                  <ul className="space-y-3 text-sm mb-6">
                    {[
                      "5-10 schools in pilot",
                      "90-day program",
                      "Harvard mentors included",
                      "Demo Day with officials",
                      "Full data & reporting"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="p-3 bg-primary/5 rounded-lg text-center">
                    <p className="text-xs font-semibold text-foreground">What We Ask:</p>
                    <p className="text-xs text-muted-foreground">School access + Ministry endorsement</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30 p-8 relative hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground shadow-lg">RECOMMENDED</Badge>
                </div>
                <CardContent>
                  <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">SCALE</Badge>
                  <h3 className="text-xl font-bold mb-2 text-primary">Official Builder Track</h3>
                  
                  <div className="my-6 p-4 bg-primary/10 rounded-xl text-center border border-primary/20">
                    <div className="text-2xl font-bold text-primary">5,000 students</div>
                    <div className="text-lg font-semibold text-foreground">→ 250 startups guaranteed</div>
                  </div>
                  
                  <ul className="space-y-3 text-sm mb-6">
                    {[
                      "50 schools across Emirates",
                      "Official '1M AI Leaders' integration",
                      "Teacher certification program",
                      "National Demo Day event",
                      "Press & media coverage",
                      "Government dashboard access"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="p-3 bg-primary/10 rounded-lg text-center border border-primary/20">
                    <p className="text-xs font-semibold text-primary">What We Ask:</p>
                    <p className="text-xs text-foreground">Integration + resources + announcement platform</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full bg-card border-border/50 p-8 hover:shadow-lg transition-all duration-300">
                <CardContent>
                  <Badge variant="outline" className="mb-4">NATIONAL</Badge>
                  <h3 className="text-xl font-bold mb-2">Full Rollout</h3>
                  
                  <div className="my-6 p-4 bg-amber-500/10 rounded-xl text-center border border-amber-500/20">
                    <div className="text-2xl font-bold text-amber-500">50,000 students</div>
                    <div className="text-lg font-semibold text-foreground">→ 2,500+ startups</div>
                  </div>
                  
                  <ul className="space-y-3 text-sm mb-6">
                    {[
                      "All Emirates coverage",
                      "Arabic + English curriculum",
                      "Co-branded UAE × NEXT_ certification",
                      "Annual National AI Olympiad",
                      "World Government Summit announcement",
                      "Export rights to GCC nations"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Crown className="h-4 w-4 text-amber-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="p-3 bg-amber-500/10 rounded-lg text-center border border-amber-500/20">
                    <p className="text-xs font-semibold text-amber-600">What UAE Gets:</p>
                    <p className="text-xs text-foreground">Global AI education leadership</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* No-Risk Guarantee */}
          <motion.div 
            className="max-w-3xl mx-auto"
            {...fadeInUp}
          >
            <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/30 p-10">
              <CardContent className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-green-600">No-Risk Pilot Guarantee</h3>
                <p className="text-lg text-muted-foreground mb-4">
                  We're confident in our results. If Phase 1 outcomes don't meet agreed targets, 
                  <span className="text-foreground font-semibold"> there is no Phase 2 obligation.</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Start with Tier 1, validate results, then scale with confidence.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* What You'll Announce */}
      <section className="py-28 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-16"
            {...fadeInUp}
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/30 px-4 py-2">VISUALIZE SUCCESS</Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              What You'll <span className="text-primary">Announce</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Picture the press conference. Picture the headlines.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            <motion.div {...fadeInUp}>
              <Card className="h-full bg-card border-border/50 p-8">
                <CardContent>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <Camera className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">The Photo Opportunity</h3>
                      <p className="text-sm text-muted-foreground">Demo Day moment</p>
                    </div>
                  </div>
                  
                  <div className="p-5 bg-muted/50 rounded-xl border border-border/50 mb-6">
                    <p className="text-sm italic text-muted-foreground">
                      "Minister of AI stands with 12-year-old Emirati student who built a working 
                      app using AI — demonstrating the live product to global press."
                    </p>
                  </div>

                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {[
                      "Students presenting their AI-built solutions",
                      "Government officials as \"investors\" in mock pitch",
                      "International media coverage"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div {...fadeInUp}>
              <Card className="h-full bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30 p-8">
                <CardContent>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center">
                      <Newspaper className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary">The Headlines</h3>
                      <p className="text-sm text-muted-foreground">Global press coverage</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { headline: "UAE becomes first nation to implement national AI fluency curriculum for ages 9-16", source: "— Reuters, Bloomberg, Al Jazeera" },
                      { headline: "Emirati children build working AI products in groundbreaking education initiative", source: "— TechCrunch, Wired, The National" },
                      { headline: "UAE sets global standard for youth AI education", source: "— World Economic Forum, UNESCO" }
                    ].map((item, i) => (
                      <div key={i} className="p-4 bg-background/50 rounded-xl border border-border/50">
                        <p className="text-sm font-semibold text-foreground">{item.headline}</p>
                        <p className="text-xs text-muted-foreground mt-1">{item.source}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div 
            className="max-w-3xl mx-auto text-center"
            {...fadeInUp}
          >
            <Card className="bg-card border-border/50 p-10">
              <CardContent>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Play className="h-7 w-7 text-primary" />
                  <h3 className="text-xl font-bold">See It Live</h3>
                </div>
                <p className="text-muted-foreground mb-8">
                  Experience the NEXT_ platform and see what students will create.
                </p>
                <Button 
                  variant="outline"
                  size="lg"
                  className="px-8"
                  onClick={() => window.open('/demo', '_blank')}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Try the Demo
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Vision Quote */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto"
            {...fadeInUp}
          >
            <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20 p-14">
              <CardContent className="text-center">
                <blockquote className="text-2xl md:text-4xl font-light italic text-foreground mb-8 leading-relaxed">
                  "We want to see the UAE as an innovation hub."
                </blockquote>
                <p className="text-lg text-muted-foreground mb-10">
                  — His Highness Sheikh Mohammed bin Rashid Al Maktoum
                </p>
                
                <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-auto mb-10" />
                
                <p className="text-xl text-foreground max-w-2xl mx-auto">
                  NEXT_ delivers the <span className="font-semibold text-primary">AI-fluent generation</span> who will make that vision real.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-28 bg-gradient-to-br from-primary/10 via-background to-amber-500/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            {...fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Give Us 1,000 Students.<br />
              <span className="bg-gradient-to-r from-primary to-amber-500 bg-clip-text text-transparent">We'll Give You 50 Startups.</span>
            </h2>
            
            <p className="text-2xl text-foreground font-semibold mb-4">
              90 Days. Guaranteed.
            </p>
            
            <p className="text-lg text-muted-foreground mb-10">
              Let's build 1 Million AI Leaders together — starting with the first 1,000.
            </p>

            <div className="flex flex-col items-center gap-4">
              <EmailCTA variant="primary" size="lg" />
              <p className="text-sm text-muted-foreground">
                Direct line to our government partnerships team
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-border/50 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-amber-500 bg-clip-text text-transparent">NEXT_</span>
              <span className="text-muted-foreground">×</span>
              <span className="text-sm text-muted-foreground">An initiative of Learn With Leaders</span>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-muted-foreground">
              <p>© 2025 NEXT_ — AI Education for the Next Generation</p>
              <span className="hidden md:inline">•</span>
              <p>This document is confidential and intended for government officials only.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
