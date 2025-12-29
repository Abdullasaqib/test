import { motion } from "framer-motion";
import { Sparkles, Zap, Code, Wand2, ArrowRight, Play, Brain, Target, Rocket, Database, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface VibeCodingIntroProps {
  onStartLearning?: () => void;
}

export function VibeCodingIntro({ onStartLearning }: VibeCodingIntroProps) {
  const features = [
    {
      icon: Wand2,
      title: "Describe, Don't Code",
      description: "Tell AI what you want in plain English. No syntax to memorize!",
    },
    {
      icon: Zap,
      title: "Build in Minutes",
      description: "Create full-stack apps with databases that would take months to code.",
    },
    {
      icon: Database,
      title: "Real Databases",
      description: "User accounts, data storage, APIs—all through conversation.",
    },
  ];

  const base44Features = [
    {
      icon: Users,
      title: "User Authentication",
      prompt: "Add user signup and login to my app",
      result: "Complete auth system with secure sessions",
    },
    {
      icon: Database,
      title: "Database Integration",
      prompt: "Store user data with timestamps and categories",
      result: "Full database with relationships and queries",
    },
    {
      icon: Rocket,
      title: "Deploy Instantly",
      prompt: "Make this live so I can share it",
      result: "Production URL ready to share in seconds",
    },
  ];

  const examples = [
    {
      before: "const app = express(); app.get('/api'...",
      after: "Create a task tracker with user accounts and due dates",
      result: "Full-stack app with auth, database, and real-time updates",
    },
    {
      before: "useState, useEffect, Supabase, RLS policies...",
      after: "Build a dashboard where users can track their startup metrics",
      result: "Interactive charts, user data, secure access control",
    },
    {
      before: "npm install, webpack config, babel, deploy scripts...",
      after: "Make me a SaaS landing page that collects email signups",
      result: "Beautiful responsive page with working signup—deployed and live",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <Badge variant="secondary" className="mb-2 bg-gradient-to-r from-primary/20 to-accent/20">
          <Sparkles className="h-3 w-3 mr-1" />
          Cutting-Edge Skill
        </Badge>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Vibe Coding with Base44 ✨
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Build <span className="text-primary font-semibold">full-stack apps</span> by having a conversation. 
          User authentication, databases, APIs—all without writing a single line of code.
        </p>
      </motion.div>

      {/* Why Base44 */}
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                Why Base44?
                <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/30">Newest & Most Powerful</Badge>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Base44 is the <strong className="text-foreground">cutting-edge vibe coding platform</strong> that goes 
                beyond simple landing pages. Build complete applications with <em>user authentication</em>, 
                <em>real databases</em>, and <em>API integrations</em>—all through natural conversation.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This is the tool professional developers are switching to. You're learning it now.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Base44 Superpowers */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center">Base44 Superpowers</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {base44Features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow border-border hover:border-primary/30">
                <CardContent className="p-6 space-y-4">
                  <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-lg">{feature.title}</h3>
                  <div className="bg-secondary/50 rounded-lg p-3 text-sm">
                    <p className="text-primary font-medium">"{feature.prompt}"</p>
                  </div>
                  <p className="text-sm text-muted-foreground">→ {feature.result}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* What is Vibe Coding? */}
      <Card className="bg-card/50 backdrop-blur-sm border border-border">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Code className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">What is Vibe Coding?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Vibe coding is building software through <strong className="text-foreground">natural conversation</strong> with AI. 
                Describe what you want, iterate through feedback, and deploy real applications—all without 
                memorizing programming syntax or understanding server architecture.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <Badge className="bg-primary/10 text-primary border-primary/30">Base44</Badge>
                <Badge variant="outline">Bolt</Badge>
                <Badge variant="outline">Replit Agent</Badge>
                <Badge variant="outline">Cursor</Badge>
                <Badge variant="outline">v0.dev</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Features */}
      <div className="grid md:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow border-border">
              <CardContent className="p-6 text-center space-y-3">
                <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Before vs After */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center">Traditional Coding vs Vibe Coding</h2>
        <div className="grid gap-4">
          {examples.map((example, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="grid md:grid-cols-3 gap-4 items-center">
                    <div className="space-y-1">
                      <Badge variant="outline" className="mb-2 text-destructive border-destructive/30">
                        Traditional
                      </Badge>
                      <code className="text-xs text-muted-foreground block font-mono bg-secondary/50 p-2 rounded">
                        {example.before}
                      </code>
                    </div>
                    <div className="flex justify-center">
                      <ArrowRight className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <Badge variant="outline" className="mb-2 text-primary border-primary/30">
                        Base44
                      </Badge>
                      <p className="text-sm font-medium">"{example.after}"</p>
                      <p className="text-xs text-muted-foreground">→ {example.result}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Placeholder */}
      <Card className="overflow-hidden border-border">
        <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-card/50 backdrop-blur flex items-center justify-center mx-auto cursor-pointer hover:bg-card/70 transition-colors">
              <Play className="h-10 w-10 text-primary ml-1" />
            </div>
            <p className="text-foreground/80 text-lg font-medium">Watch: Build a Full-Stack App in 5 Minutes</p>
            <p className="text-muted-foreground text-sm">User accounts, database, deployed—all through conversation</p>
          </div>
        </div>
      </Card>

      {/* CTA */}
      <div className="text-center space-y-4">
        <h3 className="text-xl font-bold">Ready to become a Vibe Coder?</h3>
        <p className="text-muted-foreground">
          Master Base44 and start building real applications in minutes!
        </p>
        <Button size="lg" onClick={onStartLearning} className="group">
          Start Learning
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}
