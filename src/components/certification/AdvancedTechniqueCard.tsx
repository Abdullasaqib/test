import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Check, Brain, Layers, Zap, MessageSquare, ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AdvancedTechniqueCardProps {
  technique: "chain-of-thought" | "few-shot" | "persona-stacking" | "reverse-prompting";
  compact?: boolean;
}

const techniques = {
  "chain-of-thought": {
    name: "Chain-of-Thought",
    icon: Brain,
    color: "from-purple-500 to-pink-500",
    badge: "bg-purple-500/10 text-purple-500 border-purple-500/30",
    description: "Make AI reason step-by-step through complex problems",
    howItWorks: "Add 'Let's think step by step' to make AI break down complex tasks logically before answering.",
    example: {
      before: "How do I start a tutoring business?",
      after: "Let's think step by step. I want to start a tutoring business. First, identify the key challenges. Then, break each challenge into actionable steps. Finally, suggest solutions for each.",
      improvement: "AI breaks down: market research → pricing → marketing → operations → growth",
    },
    tryIt: "Let's think step by step. I want to [YOUR GOAL]. First, identify the key challenges. Then...",
  },
  "few-shot": {
    name: "Few-Shot Learning",
    icon: Layers,
    color: "from-blue-500 to-cyan-500",
    badge: "bg-blue-500/10 text-blue-500 border-blue-500/30",
    description: "Give examples to get outputs that match your exact style",
    howItWorks: "Show AI 2-3 examples of what you want, and it will pattern-match to produce similar quality.",
    example: {
      before: "Write a startup tagline for my app",
      after: "Here are 3 examples of great taglines:\n1. 'Think different' (Apple)\n2. 'Just do it' (Nike)\n3. 'Move fast and break things' (Facebook)\n\nNow create one for my study app that helps students focus.",
      improvement: "AI mimics the punchy, memorable style of your examples",
    },
    tryIt: "Here are 3 examples of [TYPE]:\n\n1. [EXAMPLE_1]\n2. [EXAMPLE_2]\n3. [EXAMPLE_3]\n\nNow create one for [YOUR CONTEXT].",
  },
  "persona-stacking": {
    name: "Persona Stacking",
    icon: Zap,
    color: "from-amber-500 to-orange-500",
    badge: "bg-amber-500/10 text-amber-500 border-amber-500/30",
    description: "Combine multiple expert perspectives for richer insights",
    howItWorks: "Ask AI to act as two experts at once to get multi-dimensional analysis.",
    example: {
      before: "Review my landing page design",
      after: "Act as both a senior product designer who has worked at Airbnb AND a conversion optimization expert. Review my landing page and give me feedback from both perspectives.",
      improvement: "Get design critique AND conversion optimization tips in one response",
    },
    tryIt: "Act as both a [EXPERT_1] and a [EXPERT_2]. Combine your expertise to [TASK].",
  },
  "reverse-prompting": {
    name: "Reverse Prompting",
    icon: MessageSquare,
    color: "from-green-500 to-emerald-500",
    badge: "bg-green-500/10 text-green-500 border-green-500/30",
    description: "Make AI ask YOU questions before it starts working",
    howItWorks: "Ask AI to clarify what it needs to know first. This leads to much better outputs.",
    example: {
      before: "Help me design my app's database",
      after: "Before you help me design my app's database, ask me 5 clarifying questions that will help you give a much better answer. Don't start working until I've answered them.",
      improvement: "AI asks about: data types, relationships, scale, access patterns, security needs",
    },
    tryIt: "Before you help me with [TASK], ask me 5 clarifying questions first. Don't start until I've answered.",
  },
};

export function AdvancedTechniqueCard({ technique, compact = false }: AdvancedTechniqueCardProps) {
  const [copied, setCopied] = useState(false);
  const [showExample, setShowExample] = useState(false);
  
  const tech = techniques[technique];
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(tech.tryIt);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card/50 border border-border/50 rounded-lg p-4 hover:border-primary/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-gradient-to-br ${tech.color} text-white`}>
            <tech.icon className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm">{tech.name}</h4>
            <p className="text-xs text-muted-foreground">{tech.description}</p>
          </div>
          <Badge variant="outline" className={tech.badge}>Pro</Badge>
        </div>
      </motion.div>
    );
  }

  return (
    <Card className="overflow-hidden border-border/50 hover:border-primary/30 transition-colors">
      <CardContent className="p-0">
        {/* Header */}
        <div className={`bg-gradient-to-r ${tech.color} p-4 text-white`}>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <tech.icon className="h-5 w-5" />
            </div>
            <div>
              <Badge className="bg-white/20 text-white border-white/30 mb-1">
                🔥 Pro Technique
              </Badge>
              <h3 className="font-bold text-lg">{tech.name}</h3>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4 space-y-4">
          <p className="text-muted-foreground">{tech.description}</p>
          
          <div className="bg-secondary/50 rounded-lg p-3">
            <p className="text-sm font-medium mb-1">How it works:</p>
            <p className="text-sm text-muted-foreground">{tech.howItWorks}</p>
          </div>
          
          {/* Example Toggle */}
          <Button 
            variant="ghost" 
            className="w-full justify-between"
            onClick={() => setShowExample(!showExample)}
          >
            See Example
            <ArrowRight className={`h-4 w-4 transition-transform ${showExample ? 'rotate-90' : ''}`} />
          </Button>
          
          {showExample && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-3"
            >
              <div>
                <Badge variant="outline" className="text-destructive border-destructive/30 mb-2">Before</Badge>
                <p className="text-sm bg-destructive/5 p-2 rounded">{tech.example.before}</p>
              </div>
              <div>
                <Badge variant="outline" className="text-primary border-primary/30 mb-2">After</Badge>
                <p className="text-sm bg-primary/5 p-2 rounded whitespace-pre-wrap">{tech.example.after}</p>
              </div>
              <div className="flex items-start gap-2 bg-green-500/5 p-2 rounded">
                <ArrowRight className="h-4 w-4 text-green-500 mt-0.5" />
                <p className="text-sm text-green-600">{tech.example.improvement}</p>
              </div>
            </motion.div>
          )}
          
          {/* Try It */}
          <div className="pt-2 border-t border-border/50">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">Try it yourself:</p>
              <Button variant="outline" size="sm" onClick={handleCopy}>
                {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
            <code className="text-xs bg-secondary/50 p-3 rounded-lg block font-mono whitespace-pre-wrap">
              {tech.tryIt}
            </code>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
