import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CursorWordmark } from "@/components/ui/cursor-wordmark";
import { 
  Loader2, Sparkles, Brain, Rocket, MessageSquare, Target, Flame,
  CheckCircle2, ArrowRight, BookOpen, Users, Shield, FileText,
  ChevronDown, ChevronUp, ExternalLink, Star, Quote
} from "lucide-react";
import { Link } from "react-router-dom";
import { CopyButton } from "@/components/free-guide/CopyButton";
import { PromptCard } from "@/components/free-guide/PromptCard";
import { TableOfContents } from "@/components/free-guide/TableOfContents";
import { 
  aiToolsExpanded, weekendProjectsExpanded, promptLibrary, 
  teenFounderStories, parentGuide, printableResources 
} from "@/components/free-guide/guideData";

const FreeAIGuide = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [expandedTool, setExpandedTool] = useState<string | null>(null);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [activePromptCategory, setActivePromptCategory] = useState("brainstorming");
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const handleLockedClick = () => {
    toast({
      title: "🔐 Unlock this section",
      description: "Enter your email above for instant access!",
    });
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => emailInputRef.current?.focus(), 500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("leads").insert({ email, source: "free-ai-guide" });
      if (error) throw error;
      toast({ title: "Welcome to the guide!", description: "Scroll down to access your complete AI Builders Guide." });
      setHasAccess(true);
    } catch (error) {
      console.error("Lead capture error:", error);
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Free AI Builders Guide for Young Entrepreneurs | 50+ Prompts, Projects & More | NEXT_</title>
        <meta name="description" content="The ultimate AI guide for kids & teens: 50+ copy-paste prompts, 5 weekend projects with full tutorials, teen founder case studies, parent safety guide, and printable resources. Free instant access." />
      </Helmet>

      <div className="min-h-screen bg-[#0A0F1C]">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0F1C]/80 backdrop-blur-xl border-b border-white/5">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/academy" className="flex items-center gap-2">
              <CursorWordmark word="NEXT" className="text-2xl font-bold text-white" />
            </Link>
            <Link to="/pricing">
              <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">Get Started — From $19</Button>
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">50+ Prompts • 5 Full Projects • Parent Guide</span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                THE COMPLETE AI
                <span className="block bg-gradient-to-r from-primary via-blue-400 to-accent bg-clip-text text-transparent">BUILDERS GUIDE</span>
              </h1>

              <p className="text-xl md:text-2xl text-white/70 mb-4 max-w-2xl mx-auto">
                Everything your child needs to master AI tools and build real projects.
              </p>
              <p className="text-lg text-white/50 mb-8">Free. Instant access. Actually useful.</p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-6 mb-12">
                {[
                  { value: "50+", label: "Copy-Paste Prompts" },
                  { value: "5", label: "Full Project Tutorials" },
                  { value: "10", label: "AI Tools Reviewed" },
                  { value: "5", label: "Teen Founder Stories" }
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-white/50">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Email Capture */}
              <AnimatePresence mode="wait">
                {!hasAccess ? (
                  <motion.form ref={formRef} key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <Input ref={emailInputRef} type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required className="flex-1 h-14 bg-white/5 border-white/10 text-white placeholder:text-white/40 text-lg" />
                    <Button type="submit" disabled={isSubmitting} className="h-14 px-8 bg-accent hover:bg-accent/90 text-black font-bold text-lg">
                      {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Get Full Access<ArrowRight className="ml-2 w-5 h-5" /></>}
                    </Button>
                  </motion.form>
                ) : (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400">
                    <CheckCircle2 className="w-6 h-6" />
                    <span className="text-lg font-medium">You're in! Scroll down for your complete guide.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* What's Inside Preview */}
        <section className="py-20 border-t border-white/5">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">What's Inside</h2>
            <p className="text-white/50 text-center mb-12 max-w-xl mx-auto">
              {hasAccess ? "Your complete guide to AI building" : "Enter your email above to unlock everything"}
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { icon: Brain, title: "10 AI Tools Deep-Dived", desc: "Not just names—full tutorials, prompts for each, parent safety notes, cost breakdowns" },
                { icon: Rocket, title: "5 Weekend Projects", desc: "Step-by-step tutorials with 7-8 steps each, troubleshooting guides, extension ideas" },
                { icon: MessageSquare, title: "50+ Copy-Paste Prompts", desc: "Organized by category: brainstorming, writing, building, design, learning, marketing" },
                { icon: Star, title: "Teen Founder Case Studies", desc: "Real stories from 5 young entrepreneurs who built with AI—their tools, journey, and advice" },
                { icon: Target, title: "Age Roadmaps", desc: "Week-by-week learning paths for ages 9-11, 12-14, and 15-16" },
                { icon: Shield, title: "Parent Safety Guide", desc: "Tool-by-tool safety settings, age boundaries, ethics conversations, and support tips" },
                { icon: FileText, title: "Printable Resources", desc: "Weekly tracker, project planner, prompt cheat card, completion certificate" }
              ].map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} onClick={hasAccess ? undefined : handleLockedClick}
                  className={`p-6 rounded-2xl border transition-all ${hasAccess ? "bg-white/5 border-white/10 hover:border-primary/30" : "bg-white/[0.02] border-white/5 opacity-60 cursor-pointer hover:opacity-80 hover:border-primary/20"}`}>
                  <item.icon className={`w-8 h-8 mb-4 ${hasAccess ? "text-primary" : "text-white/30"}`} />
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-white/50 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Full Guide Content */}
        <AnimatePresence>
          {hasAccess && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <TableOfContents />

              {/* Section 1: AI Tools */}
              <section id="tools" className="py-20 border-t border-white/5 bg-gradient-to-b from-transparent to-primary/5">
                <div className="container mx-auto px-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center"><Brain className="w-5 h-5 text-primary" /></div>
                    <span className="text-primary font-medium">Section 1</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">10 AI Tools Every Young Builder Needs</h2>
                  <p className="text-white/60 mb-12 max-w-2xl">Click any tool to see detailed prompts, use cases, and parent safety notes.</p>

                  <div className="space-y-4">
                    {aiToolsExpanded.map((tool, i) => (
                      <motion.div key={tool.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
                        <button onClick={() => setExpandedTool(expandedTool === tool.name ? null : tool.name)} className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/5 transition-colors">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0"><tool.icon className="w-6 h-6 text-primary" /></div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-white">{tool.name}</h3>
                              <span className="text-xs px-2 py-0.5 rounded-full bg-accent/20 text-accent">{tool.ageRange}</span>
                              <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/50">{tool.cost}</span>
                            </div>
                            <p className="text-white/50 text-sm">{tool.description}</p>
                          </div>
                          {expandedTool === tool.name ? <ChevronUp className="w-5 h-5 text-white/50" /> : <ChevronDown className="w-5 h-5 text-white/50" />}
                        </button>

                        {expandedTool === tool.name && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="border-t border-white/10 p-5 space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div><span className="text-white/40 text-sm">Best For</span><p className="text-white">{tool.bestFor}</p></div>
                              <div><span className="text-white/40 text-sm">Parent Notes</span><p className="text-white/70">{tool.parentNotes}</p></div>
                            </div>
                            <div>
                              <h4 className="text-white font-medium mb-4">3 Ready-to-Use Prompts</h4>
                              <div className="space-y-3">
                                {tool.useCases.map((useCase, j) => (
                                  <div key={j} className="p-4 rounded-xl bg-white/5 border border-white/10">
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="font-medium text-white text-sm">{useCase.title}</span>
                                      <CopyButton text={useCase.prompt} />
                                    </div>
                                    <p className="text-white/50 text-xs font-mono bg-black/20 p-2 rounded">{useCase.prompt}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-xl bg-primary/10 border border-primary/20">
                              <div><span className="text-primary font-medium">💡 Pro Tip</span><p className="text-white/70 text-sm mt-1">{tool.proTip}</p></div>
                              <a href={tool.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline"><span className="text-sm">Open {tool.name}</span><ExternalLink className="w-4 h-4" /></a>
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Section 2: Weekend Projects */}
              <section id="projects" className="py-20 border-t border-white/5">
                <div className="container mx-auto px-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center"><Rocket className="w-5 h-5 text-accent" /></div>
                    <span className="text-accent font-medium">Section 2</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">5 Weekend Projects with Full Tutorials</h2>
                  <p className="text-white/60 mb-12 max-w-2xl">Complete step-by-step guides with prompts you can copy-paste. Each project results in something real.</p>

                  <div className="space-y-6">
                    {weekendProjectsExpanded.map((project, i) => (
                      <motion.div key={project.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
                        <button onClick={() => setExpandedProject(expandedProject === i ? null : i)} className="w-full p-6 text-left hover:bg-white/5 transition-colors">
                          <div className="flex flex-wrap items-center gap-4 mb-3">
                            <h3 className="text-xl font-bold text-white">{project.title}</h3>
                            <span className="text-sm px-3 py-1 rounded-full bg-primary/20 text-primary">⏱ {project.time}</span>
                            <span className="text-sm px-3 py-1 rounded-full bg-accent/20 text-accent">{project.difficulty}</span>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {project.tools.map(tool => <span key={tool} className="text-xs px-2 py-1 rounded bg-white/10 text-white/70">{tool}</span>)}
                          </div>
                          <p className="text-white/50 text-sm">{project.prerequisites}</p>
                          <div className="flex items-center gap-2 mt-4 text-green-400">
                            <CheckCircle2 className="w-4 h-4" />
                            <span className="text-sm font-medium">Outcome: {project.outcome}</span>
                          </div>
                        </button>

                        {expandedProject === i && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="border-t border-white/10 p-6 space-y-6">
                            <div>
                              <h4 className="text-white font-medium mb-4">Step-by-Step Tutorial</h4>
                              <div className="space-y-4">
                                {project.steps.map((step, j) => (
                                  <div key={j} className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 font-medium">{j + 1}</div>
                                    <div className="flex-1">
                                      <h5 className="font-medium text-white mb-1">{step.step}</h5>
                                      <p className="text-white/50 text-sm mb-2">{step.details}</p>
                                      {step.prompt && (
                                        <div className="p-3 rounded-lg bg-black/30 border border-white/10">
                                          <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs text-white/40">Prompt to use:</span>
                                            <CopyButton text={step.prompt} />
                                          </div>
                                          <p className="text-white/60 text-xs font-mono">{step.prompt}</p>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
                                <h5 className="font-medium text-orange-400 mb-2">⚠️ Troubleshooting</h5>
                                <ul className="space-y-1">
                                  {project.troubleshooting.map((tip, j) => <li key={j} className="text-white/60 text-sm">• {tip}</li>)}
                                </ul>
                              </div>
                              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                                <h5 className="font-medium text-green-400 mb-2">🚀 Extension Ideas</h5>
                                <ul className="space-y-1">
                                  {project.extensions.map((ext, j) => <li key={j} className="text-white/60 text-sm">• {ext}</li>)}
                                </ul>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Section 3: 50+ Prompts */}
              <section id="prompts" className="py-20 border-t border-white/5 bg-gradient-to-b from-transparent to-green-500/5">
                <div className="container mx-auto px-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center"><MessageSquare className="w-5 h-5 text-green-400" /></div>
                    <span className="text-green-400 font-medium">Section 3</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">50+ Copy-Paste Prompts</h2>
                  <p className="text-white/60 mb-8 max-w-2xl">Click any prompt to copy it. Organized by what you're trying to do.</p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {Object.keys(promptLibrary).map((category) => (
                      <button key={category} onClick={() => setActivePromptCategory(category)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activePromptCategory === category ? "bg-green-500 text-black" : "bg-white/10 text-white/70 hover:bg-white/20"}`}>
                        {category.charAt(0).toUpperCase() + category.slice(1)} ({promptLibrary[category as keyof typeof promptLibrary].length})
                      </button>
                    ))}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {promptLibrary[activePromptCategory as keyof typeof promptLibrary].map((item, i) => (
                      <PromptCard key={i} title={item.title} prompt={item.prompt} index={i} color="green" />
                    ))}
                  </div>
                </div>
              </section>

              {/* Section 4: Teen Founder Stories */}
              <section id="stories" className="py-20 border-t border-white/5">
                <div className="container mx-auto px-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center"><Star className="w-5 h-5 text-yellow-400" /></div>
                    <span className="text-yellow-400 font-medium">Section 4</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Teen Founder Case Studies</h2>
                  <p className="text-white/60 mb-12 max-w-2xl">Real stories from young entrepreneurs who built with AI.</p>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teenFounderStories.map((story, i) => (
                      <motion.div key={story.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-black font-bold">{story.name.charAt(0)}</div>
                          <div><h3 className="font-semibold text-white">{story.name}</h3><p className="text-white/50 text-sm">{story.location}</p></div>
                        </div>
                        <h4 className="font-medium text-primary mb-2">{story.business}</h4>
                        <p className="text-white/60 text-sm mb-4">{story.description}</p>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {story.tools.map(tool => <span key={tool} className="text-xs px-2 py-0.5 rounded bg-white/10 text-white/60">{tool}</span>)}
                        </div>
                        <div className="flex-1">
                          <p className="text-white/50 text-sm mb-4">{story.journey}</p>
                          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 mb-4">
                            <p className="text-green-400 text-sm font-medium">📈 {story.outcome}</p>
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                          <Quote className="w-4 h-4 text-yellow-400 mb-1" />
                          <p className="text-white/70 text-sm italic mb-2">"{story.quote}"</p>
                          <p className="text-yellow-400 text-xs font-medium">💡 Advice: {story.advice}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Section 5: Age Roadmaps - Compact */}
              <section id="roadmaps" className="py-20 border-t border-white/5 bg-gradient-to-b from-transparent to-purple-500/5">
                <div className="container mx-auto px-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center"><Target className="w-5 h-5 text-purple-400" /></div>
                    <span className="text-purple-400 font-medium">Section 5</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">Age-Appropriate Roadmaps</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { age: "9-11", title: "Young Explorer", focus: "Visual building, creative projects", tools: ["Glide", "Canva AI", "ChatGPT"], time: "2-3 hours/week", color: "emerald" },
                      { age: "12-14", title: "Teen Builder", focus: "App development, problem-solving", tools: ["Glide", "Bubble", "ChatGPT", "Claude"], time: "4-5 hours/week", color: "blue" },
                      { age: "15-16", title: "Advanced Creator", focus: "Full-stack building, real products", tools: ["Lovable", "Cursor", "All AI tools"], time: "6-8 hours/week", color: "purple" }
                    ].map((r, i) => (
                      <motion.div key={r.age} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <div className="text-3xl font-bold text-white mb-1">Ages {r.age}</div>
                        <div className={`text-${r.color}-400 font-medium mb-4`}>{r.title}</div>
                        <p className="text-white/50 text-sm mb-4">{r.focus}</p>
                        <div className="flex flex-wrap gap-1 mb-4">{r.tools.map(t => <span key={t} className="text-xs px-2 py-0.5 rounded bg-white/10 text-white/60">{t}</span>)}</div>
                        <p className="text-white/40 text-sm">⏱ {r.time}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Section 6: Parent Guide */}
              <section id="parents" className="py-20 border-t border-white/5">
                <div className="container mx-auto px-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center"><Shield className="w-5 h-5 text-blue-400" /></div>
                    <span className="text-blue-400 font-medium">Section 6</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{parentGuide.overview.title}</h2>
                  <p className="text-white/60 mb-12 max-w-2xl">{parentGuide.overview.intro}</p>

                  <div className="grid md:grid-cols-2 gap-6 mb-12">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                      <h3 className="font-semibold text-white mb-4">🔐 Safety Settings by Tool</h3>
                      {parentGuide.safetySettings.map((setting, i) => (
                        <div key={i} className="mb-4 last:mb-0">
                          <h4 className="text-primary font-medium mb-2">{setting.tool}</h4>
                          <ul className="space-y-1">{setting.steps.map((s, j) => <li key={j} className="text-white/60 text-sm">• {s}</li>)}</ul>
                        </div>
                      ))}
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                      <h3 className="font-semibold text-white mb-4">💬 Ethics Conversations</h3>
                      {parentGuide.ethicsConversations.map((conv, i) => (
                        <div key={i} className="mb-4 last:mb-0">
                          <h4 className="text-green-400 font-medium mb-2">{conv.topic}</h4>
                          <ul className="space-y-1">{conv.talkingPoints.map((p, j) => <li key={j} className="text-white/60 text-sm">• {p}</li>)}</ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20">
                      <h3 className="font-semibold text-red-400 mb-4">🚩 Red Flags to Watch For</h3>
                      <ul className="space-y-2">{parentGuide.redFlags.map((flag, i) => <li key={i} className="text-white/70 text-sm">• {flag}</li>)}</ul>
                    </div>
                    <div className="p-6 rounded-2xl bg-green-500/10 border border-green-500/20">
                      <h3 className="font-semibold text-green-400 mb-4">✅ How to Support Them</h3>
                      <ul className="space-y-2">{parentGuide.supportTips.map((tip, i) => <li key={i} className="text-white/70 text-sm">• {tip}</li>)}</ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 7: Printables */}
              <section id="printables" className="py-20 border-t border-white/5 bg-gradient-to-b from-transparent to-accent/5">
                <div className="container mx-auto px-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center"><FileText className="w-5 h-5 text-accent" /></div>
                    <span className="text-accent font-medium">Section 7</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Printable Resources</h2>
                  <p className="text-white/60 mb-12 max-w-2xl">Download these templates to track progress and plan projects offline.</p>

                  <div className="grid md:grid-cols-2 gap-6">
                    {printableResources.map((resource, i) => (
                      <motion.div key={resource.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <h3 className="font-semibold text-white mb-2">{resource.title}</h3>
                        <p className="text-white/50 text-sm mb-4">{resource.description}</p>
                        <ul className="space-y-1 mb-4">{resource.contents.map((c, j) => <li key={j} className="text-white/60 text-sm">✓ {c}</li>)}</ul>
                        <p className="text-accent text-sm font-medium">Coming soon: Download PDF</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Pricing CTA Section */}
              <section className="py-24 border-t border-white/5 bg-gradient-to-b from-primary/10 to-transparent">
                <div className="container mx-auto px-4">
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 text-center">Ready to Build What's NEXT_?</h2>
                  <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto text-center">The guide is just the beginning. Join the 12-week NEXT_ program and launch your first real product with AI.</p>
                  
                  {/* Pricing Tiers */}
                  <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
                    {/* Revolution Start - $19 */}
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all">
                      <div className="text-center mb-6">
                        <p className="text-white/50 text-sm mb-2">FIRST STEP</p>
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-white/40 line-through text-lg">$39</span>
                          <span className="text-4xl font-bold text-white">$19</span>
                        </div>
                        <p className="text-white/50 text-sm mt-1">1-month access</p>
                      </div>
                      <ul className="space-y-3 mb-6">
                        <li className="flex items-center gap-2 text-white/70 text-sm"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" />AI Foundations Certificate (Level 1)</li>
                        <li className="flex items-center gap-2 text-white/70 text-sm"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" />AI Coach (10 messages/day)</li>
                        <li className="flex items-center gap-2 text-white/70 text-sm"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" />THE TANK pitch practice</li>
                        <li className="flex items-center gap-2 text-white/70 text-sm"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" />Curriculum preview</li>
                      </ul>
                      <Link to="/pricing" className="block">
                        <Button className="w-full bg-white/10 hover:bg-white/20 text-white">Start Building</Button>
                      </Link>
                    </div>

                    {/* Yearly Founder - $99 */}
                    <div className="p-6 rounded-2xl bg-gradient-to-b from-primary/20 to-primary/5 border-2 border-primary/50 relative">
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-black text-xs font-bold rounded-full">BEST VALUE</div>
                      <div className="text-center mb-6">
                        <p className="text-primary text-sm mb-2">FULL FOUNDATION</p>
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-4xl font-bold text-white">$99</span>
                          <span className="text-white/50 text-sm">/year</span>
                        </div>
                        <p className="text-white/50 text-sm mt-1">or $29/month</p>
                      </div>
                      <ul className="space-y-3 mb-6">
                        <li className="flex items-center gap-2 text-white/70 text-sm"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" />AI Foundations + AI Builder Certificates</li>
                        <li className="flex items-center gap-2 text-white/70 text-sm"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" />Full 12-week curriculum access</li>
                        <li className="flex items-center gap-2 text-white/70 text-sm"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" />AI Coach (50 messages/day)</li>
                        <li className="flex items-center gap-2 text-white/70 text-sm"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" />THE TANK unlimited pitch practice</li>
                        <li className="flex items-center gap-2 text-white/70 text-sm"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" />Case study library</li>
                      </ul>
                      <Link to="/pricing" className="block">
                        <Button className="w-full bg-primary hover:bg-primary/90 text-black font-bold">Choose Plan</Button>
                      </Link>
                    </div>

                    {/* Live Cohort - $290 */}
                    <div className="p-6 rounded-2xl bg-white/5 border border-accent/30 hover:border-accent/50 transition-all">
                      <div className="text-center mb-6">
                        <p className="text-accent text-sm mb-2">ACCELERATOR</p>
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-white/40 line-through text-lg">$690</span>
                          <span className="text-4xl font-bold text-white">$290</span>
                        </div>
                        <p className="text-accent text-sm mt-1">Limited spots</p>
                      </div>
                      <ul className="space-y-3 mb-6">
                        <li className="flex items-center gap-2 text-white/70 text-sm"><CheckCircle2 className="w-4 h-4 text-accent shrink-0" />All 3 Certificates (Levels 1, 2 & 3)</li>
                        <li className="flex items-center gap-2 text-white/70 text-sm"><CheckCircle2 className="w-4 h-4 text-accent shrink-0" />12 weeks live classes with mentors</li>
                        <li className="flex items-center gap-2 text-white/70 text-sm"><CheckCircle2 className="w-4 h-4 text-accent shrink-0" />Demo Day investor presentation</li>
                        <li className="flex items-center gap-2 text-white/70 text-sm"><CheckCircle2 className="w-4 h-4 text-accent shrink-0" />AI Launcher Certificate (Level 3)</li>
                        <li className="flex items-center gap-2 text-white/70 text-sm"><CheckCircle2 className="w-4 h-4 text-accent shrink-0" />Investor network access</li>
                      </ul>
                      <Link to="/pricing" className="block">
                        <Button className="w-full bg-accent hover:bg-accent/90 text-black font-bold">Join Cohort</Button>
                      </Link>
                    </div>
                  </div>

                  <p className="text-center text-white/40 text-sm">
                    Questions? <Link to="/academy" className="text-primary hover:underline">Learn more about the program</Link>
                  </p>
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <footer className="py-8 border-t border-white/5">
          <div className="container mx-auto px-4 text-center">
            <CursorWordmark word="NEXT" className="text-xl font-bold text-white/50 mb-4 justify-center" />
            <p className="text-white/30 text-sm">© {new Date().getFullYear()} NEXT_ — AI Education for Young Founders</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default FreeAIGuide;
