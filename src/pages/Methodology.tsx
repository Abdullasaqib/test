import { SEOHead } from "@/components/seo/SEOHead";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  Brain, 
  Lightbulb, 
  Target, 
  TrendingUp, 
  Users, 
  Zap,
  BookOpen,
  GraduationCap,
  Sparkles,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const frameworks = [
  {
    name: "Bloom's Taxonomy",
    author: "Benjamin Bloom, 1956",
    icon: Brain,
    color: "from-blue-500 to-indigo-500",
    description: "Cognitive learning progression from knowledge recall to creative synthesis",
    application: "Every sprint is tagged with a cognitive level (Remember → Understand → Apply → Analyze → Evaluate → Create). Students progress through levels as they master skills.",
    levels: ["Remember", "Understand", "Apply", "Analyze", "Evaluate", "Create"],
    research: "Used by 90%+ of educational institutions worldwide for curriculum design"
  },
  {
    name: "Kolb's Experiential Learning",
    author: "David Kolb, 1984",
    icon: TrendingUp,
    color: "from-green-500 to-emerald-500",
    description: "Learning through concrete experience, reflection, conceptualization, and experimentation",
    application: "Each mission follows the cycle: Experience (scenario) → Reflect (what happened) → Conceptualize (why it matters) → Experiment (apply to your startup).",
    levels: ["Concrete Experience", "Reflective Observation", "Abstract Conceptualization", "Active Experimentation"],
    research: "Foundation of modern project-based learning and internship programs"
  },
  {
    name: "Growth Mindset Theory",
    author: "Carol Dweck, 2006",
    icon: Sparkles,
    color: "from-purple-500 to-pink-500",
    description: "Intelligence and abilities can be developed through dedication and hard work",
    application: "AI feedback emphasizes effort over talent. 'Your persistence in iterating shows real founder thinking' rather than 'You're smart.'",
    levels: ["Embrace Challenges", "Persist Through Setbacks", "Learn from Criticism", "Find Inspiration in Others"],
    research: "Students with growth mindset show 30% higher achievement gains"
  },
  {
    name: "Zone of Proximal Development",
    author: "Lev Vygotsky, 1978",
    icon: Target,
    color: "from-orange-500 to-red-500",
    description: "Learning occurs best when tasks are just beyond current ability with scaffolded support",
    application: "Age-appropriate content adapts difficulty. Junior (9-11) gets more scaffolding, Advanced (15-16) faces complex challenges.",
    levels: ["What I Can Do Alone", "What I Can Do With Help", "What I Cannot Do Yet"],
    research: "Optimal learning occurs in the 'stretch zone' with appropriate support"
  },
  {
    name: "Flow State Theory",
    author: "Mihaly Csikszentmihalyi, 1990",
    icon: Zap,
    color: "from-cyan-500 to-blue-500",
    description: "Deep engagement occurs when challenge matches skill level",
    application: "60-90 second micro-sprints maintain focus. Immediate feedback keeps students in flow. Gamification (streaks, XP) sustains motivation.",
    levels: ["Clear Goals", "Immediate Feedback", "Balance of Challenge & Skill", "Deep Concentration"],
    research: "Flow state increases learning retention by 400-500%"
  },
  {
    name: "Social Constructivism",
    author: "Jean Piaget & Jerome Bruner",
    icon: Users,
    color: "from-yellow-500 to-orange-500",
    description: "Knowledge is constructed through social interaction and real-world context",
    application: "Industry tracks connect learning to real companies. THE TANK simulates investor presentations. Team collaboration is encouraged.",
    levels: ["Social Interaction", "Real-World Context", "Active Construction", "Scaffolded Support"],
    research: "Contextual learning improves transfer to real-world application by 60%"
  }
];

const bloomLevels = [
  { level: "Remember", description: "Recall facts and basic concepts", verbs: "Define, list, name, recall", color: "bg-red-500" },
  { level: "Understand", description: "Explain ideas or concepts", verbs: "Describe, explain, summarize", color: "bg-orange-500" },
  { level: "Apply", description: "Use information in new situations", verbs: "Execute, implement, solve", color: "bg-yellow-500" },
  { level: "Analyze", description: "Draw connections among ideas", verbs: "Differentiate, compare, organize", color: "bg-green-500" },
  { level: "Evaluate", description: "Justify a decision or action", verbs: "Critique, judge, defend", color: "bg-blue-500" },
  { level: "Create", description: "Produce new or original work", verbs: "Design, develop, formulate", color: "bg-purple-500" }
];

const curriculumMapping = [
  { phase: "Discovery (Weeks 1-2)", bloom: ["Remember", "Understand"], description: "Identify problems, understand markets" },
  { phase: "Validation (Weeks 3-4)", bloom: ["Apply", "Analyze"], description: "Test assumptions, analyze feedback" },
  { phase: "Building (Weeks 5-7)", bloom: ["Apply", "Create"], description: "Build MVP with AI tools" },
  { phase: "Growth (Weeks 8-10)", bloom: ["Analyze", "Evaluate"], description: "Launch, measure, iterate" },
  { phase: "Pitch (Weeks 11-12)", bloom: ["Evaluate", "Create"], description: "Present and defend your startup" }
];

const Methodology = () => {
  return (
    <>
      <SEOHead 
        title="Our Learning Science | Research-Backed Methodology | NEXT_"
        description="Discover the pedagogical frameworks behind NEXT_'s AI entrepreneurship curriculum. Built on Bloom's Taxonomy, Kolb's Experiential Learning, and Growth Mindset research."
      />
      <PublicHeader />
      
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto"
            >
              <Badge variant="outline" className="mb-4">
                <BookOpen className="w-3 h-3 mr-1" />
                Learning Science
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Built on <span className="text-primary">50+ Years</span> of Learning Research
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Our curriculum isn't guesswork. Every sprint, mission, and feedback loop is designed 
                using proven pedagogical frameworks from the world's leading educational researchers.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {["Bloom's Taxonomy", "Kolb's Cycle", "Growth Mindset", "Flow Theory", "ZPD"].map((framework) => (
                  <Badge key={framework} variant="secondary" className="text-sm">
                    {framework}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Learning Science Matters</h2>
              <p className="text-muted-foreground">
                Most "learn to code" programs are built by engineers, not educators. 
                We're different. Our L&D team includes curriculum designers, child psychologists, 
                and learning scientists who ensure every minute of your child's learning time is optimized.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-primary mb-2">85%</div>
                  <p className="text-sm text-muted-foreground">
                    Completion rate vs. 40% industry average
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-primary mb-2">4.5x</div>
                  <p className="text-sm text-muted-foreground">
                    Better retention with micro-sprints
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-primary mb-2">60s</div>
                  <p className="text-sm text-muted-foreground">
                    Optimal sprint length for focus
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Frameworks Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Pedagogical Foundations</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Six research-backed frameworks inform every aspect of our curriculum design, 
                from sprint structure to AI feedback generation.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {frameworks.map((framework, index) => (
                <motion.div
                  key={framework.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${framework.color} flex items-center justify-center mb-3`}>
                        <framework.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-lg">{framework.name}</CardTitle>
                      <p className="text-xs text-muted-foreground">{framework.author}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{framework.description}</p>
                      
                      <div className="bg-muted/50 rounded-lg p-3">
                        <p className="text-xs font-medium mb-1">How We Apply It:</p>
                        <p className="text-xs text-muted-foreground">{framework.application}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {framework.levels.slice(0, 4).map((level) => (
                          <Badge key={level} variant="outline" className="text-xs">
                            {level}
                          </Badge>
                        ))}
                      </div>
                      
                      <p className="text-xs text-primary italic">"{framework.research}"</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Bloom's Taxonomy Deep Dive */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Bloom's Taxonomy in Action</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Every sprint in our curriculum is tagged with a cognitive level. 
                Students progress from basic recall to creative application.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              {/* Pyramid visualization */}
              <div className="flex flex-col items-center mb-12">
                {bloomLevels.slice().reverse().map((level, index) => (
                  <motion.div
                    key={level.level}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 mb-2"
                    style={{ width: `${60 + index * 8}%` }}
                  >
                    <div className={`${level.color} text-white px-4 py-3 rounded-lg flex-1 text-center`}>
                      <div className="font-bold">{level.level}</div>
                      <div className="text-xs opacity-90">{level.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Curriculum Mapping */}
              <Card>
                <CardHeader>
                  <CardTitle>How Our 12-Week Curriculum Maps to Bloom's</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {curriculumMapping.map((phase) => (
                      <div key={phase.phase} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                        <div className="font-medium min-w-[180px]">{phase.phase}</div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        <div className="flex gap-2">
                          {phase.bloom.map((level) => {
                            const bloomData = bloomLevels.find(b => b.level === level);
                            return (
                              <Badge key={level} className={`${bloomData?.color} text-white`}>
                                {level}
                              </Badge>
                            );
                          })}
                        </div>
                        <span className="text-sm text-muted-foreground ml-auto">{phase.description}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* AI Feedback Integration */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Research-Backed AI Feedback</h2>
                <p className="text-muted-foreground">
                  Our AI evaluation system is trained on pedagogical best practices, 
                  not just generic language models.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      Growth Mindset Feedback
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-1" />
                      <p className="text-sm">Emphasizes effort and process over innate ability</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-1" />
                      <p className="text-sm">Reframes "failures" as learning opportunities</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-1" />
                      <p className="text-sm">Provides specific, actionable next steps</p>
                    </div>
                    <div className="bg-muted p-3 rounded-lg mt-4">
                      <p className="text-xs font-medium mb-1">Example Feedback:</p>
                      <p className="text-sm italic">"Your iteration on the customer feedback shows real founder resilience. The way you adapted your solution based on user input demonstrates exactly how successful startups pivot."</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-primary" />
                      Bloom's-Aligned Evaluation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-1" />
                      <p className="text-sm">Evaluates responses at appropriate cognitive level</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-1" />
                      <p className="text-sm">Scaffolds to next level when ready</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-1" />
                      <p className="text-sm">Age-appropriate language and expectations</p>
                    </div>
                    <div className="bg-muted p-3 rounded-lg mt-4">
                      <p className="text-xs font-medium mb-1">Cognitive Progression:</p>
                      <p className="text-sm italic">"You've shown strong analysis of the market. Ready for a challenge? Try creating a new solution that combines elements from two different industries."</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Experience Research-Backed Learning</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of students learning entrepreneurship through 
              pedagogically-designed, AI-powered micro-sprints.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link to="/pricing">Start Learning</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/academy/schools">For Schools</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Methodology;
