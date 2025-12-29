import { useState } from "react";
import { motion } from "framer-motion";
import { Lightbulb, Copy, Check, Sparkles, ChevronRight, Star, Brain, Zap, Layers } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface PromptTemplate {
  id: string;
  category: string;
  title: string;
  template: string;
  example: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  technique?: string;
}

const promptTemplates: PromptTemplate[] = [
  // Advanced Techniques
  {
    id: "chain-of-thought",
    category: "Advanced Techniques",
    title: "Chain-of-Thought Prompting",
    template: "Let's think step by step. I want to [GOAL]. First, identify the key challenges. Then, break down each challenge into smaller steps. Finally, suggest solutions for each.",
    example: "Let's think step by step. I want to build a marketplace for local tutors. First, identify the key challenges. Then, break down each challenge into smaller steps. Finally, suggest solutions for each.",
    difficulty: "advanced",
    technique: "Chain-of-thought",
  },
  {
    id: "few-shot",
    category: "Advanced Techniques",
    title: "Few-Shot Learning",
    template: "Here are 3 examples of [TYPE]:\n\nExample 1: [EXAMPLE_1]\nExample 2: [EXAMPLE_2]\nExample 3: [EXAMPLE_3]\n\nNow create one for [MY_CONTEXT] following the same pattern and quality.",
    example: "Here are 3 examples of great startup taglines:\n\nExample 1: 'Move fast and break things' (Facebook)\nExample 2: 'Think different' (Apple)\nExample 3: 'Just do it' (Nike)\n\nNow create one for my tutoring marketplace following the same pattern and quality.",
    difficulty: "advanced",
    technique: "Few-shot",
  },
  {
    id: "persona-stack",
    category: "Advanced Techniques",
    title: "Persona Stacking",
    template: "Act as both a [EXPERT_1] and a [EXPERT_2]. Combine your expertise to [TASK]. Consider both perspectives when giving your analysis.",
    example: "Act as both a senior product designer and a startup founder who has raised $10M. Combine your expertise to critique my app's onboarding flow. Consider both perspectives when giving your analysis.",
    difficulty: "advanced",
    technique: "Persona stacking",
  },
  {
    id: "reverse-prompt",
    category: "Advanced Techniques",
    title: "Reverse Prompting",
    template: "Before you help me with [TASK], first ask me 5 clarifying questions that will help you give a much better answer. Don't start working until I've answered them.",
    example: "Before you help me design my app's database structure, first ask me 5 clarifying questions that will help you give a much better answer. Don't start working until I've answered them.",
    difficulty: "intermediate",
    technique: "Reverse prompting",
  },
  // Base44 Templates
  {
    id: "base44-fullstack",
    category: "Base44 Apps",
    title: "Full-Stack App with Auth",
    template: "Create a [APP_TYPE] with user signup and login. Users should be able to [MAIN_ACTION]. Include a dashboard showing their [DATA]. Use [COLOR_SCHEME] colors and make it mobile-friendly.",
    example: "Create a habit tracker with user signup and login. Users should be able to add habits, mark them complete daily, and see streaks. Include a dashboard showing their progress. Use purple and white colors and make it mobile-friendly.",
    difficulty: "intermediate",
  },
  {
    id: "base44-database",
    category: "Base44 Apps",
    title: "App with Database",
    template: "Build a [APP_TYPE] that stores [DATA_TYPE] in a database. Each entry should have: [FIELD_1], [FIELD_2], [FIELD_3], and a timestamp. Users can create, edit, and delete entries. Add search and filtering.",
    example: "Build a book tracker that stores books in a database. Each entry should have: title, author, status (reading/finished/want to read), and a timestamp. Users can create, edit, and delete entries. Add search and filtering by status.",
    difficulty: "intermediate",
  },
  {
    id: "base44-saas",
    category: "Base44 Apps",
    title: "SaaS MVP Template",
    template: "Create a SaaS app for [USE_CASE]. Include: landing page with pricing tiers, user authentication, a main dashboard for [CORE_FEATURE], and settings page. Use professional [INDUSTRY] styling.",
    example: "Create a SaaS app for freelance invoice management. Include: landing page with pricing tiers, user authentication, a main dashboard for creating and tracking invoices, and settings page. Use professional finance/business styling.",
    difficulty: "advanced",
  },
  // Landing Pages
  {
    id: "landing-page",
    category: "Landing Pages",
    title: "Startup Landing Page",
    template: "Create a landing page for [STARTUP_NAME], a [DESCRIPTION]. Include: hero with headline '[HEADLINE]', 3 benefit cards, social proof section, and email signup. Use [COLOR_SCHEME] colors.",
    example: "Create a landing page for TutorMatch, a marketplace connecting students with local tutors. Include: hero with headline 'Find Your Perfect Tutor in Minutes', 3 benefit cards, social proof section, and email signup. Use blue and warm white colors.",
    difficulty: "beginner",
  },
  {
    id: "waitlist",
    category: "Landing Pages",
    title: "Waitlist Page",
    template: "Create a waitlist landing page for [PRODUCT]. Include: bold headline about [VALUE_PROP], countdown or 'launching soon' badge, email capture form, and show number of people already signed up (start at [NUMBER]).",
    example: "Create a waitlist landing page for an AI writing assistant. Include: bold headline about writing 10x faster, 'launching soon' badge, email capture form, and show number of people already signed up (start at 847).",
    difficulty: "beginner",
  },
  // Debugging
  {
    id: "debug-symptom",
    category: "Debugging",
    title: "Debug by Symptom",
    template: "Something's wrong with [FEATURE]. I expect: [EXPECTED_BEHAVIOR]. But instead: [ACTUAL_BEHAVIOR]. It started happening after [RECENT_CHANGE]. Please investigate and fix.",
    example: "Something's wrong with the signup button. I expect: clicking it should create a new account and redirect to dashboard. But instead: nothing happens when I click. It started happening after I added the new header. Please investigate and fix.",
    difficulty: "beginner",
  },
  {
    id: "fix-bug",
    category: "Debugging",
    title: "Fix Error Message",
    template: "I'm getting this error: '[ERROR_MESSAGE]'. It happens when [TRIGGER]. The feature should [EXPECTED_BEHAVIOR]. Please fix it and explain what went wrong.",
    example: "I'm getting this error: 'Cannot read property 'map' of undefined'. It happens when I load the dashboard. The feature should show a list of my saved items. Please fix it and explain what went wrong.",
    difficulty: "beginner",
  },
];

const advancedTechniques = [
  {
    name: "Chain-of-Thought",
    icon: Brain,
    description: "Make AI reason step by step for complex problems",
    trigger: "Let's think step by step...",
  },
  {
    name: "Few-Shot Learning",
    icon: Layers,
    description: "Give examples to get outputs that match your style",
    trigger: "Here are 3 examples of...",
  },
  {
    name: "Persona Stacking",
    icon: Zap,
    description: "Combine multiple expert perspectives for richer answers",
    trigger: "Act as both a [X] and a [Y]...",
  },
];

export function PromptWorkshop() {
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null);
  const [customPrompt, setCustomPrompt] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-green-500/10 text-green-500 border-green-500/30";
      case "intermediate": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/30";
      case "advanced": return "bg-red-500/10 text-red-500 border-red-500/30";
      default: return "";
    }
  };

  const categories = [...new Set(promptTemplates.map(t => t.category))];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <Badge variant="secondary" className="mb-2">
          <Sparkles className="h-3 w-3 mr-1" />
          Advanced Prompt Engineering
        </Badge>
        <h1 className="text-3xl font-bold">Prompt Workshop</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Master advanced techniques that 99% of people don't know. These prompts will make AI 
          work 10x better for you.
        </p>
      </div>

      {/* Advanced Techniques Highlight */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardContent className="p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Secret Techniques Most People Don't Know
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {advancedTechniques.map((technique) => (
              <div key={technique.name} className="bg-card/50 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <technique.icon className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">{technique.name}</h4>
                </div>
                <p className="text-sm text-muted-foreground">{technique.description}</p>
                <code className="text-xs bg-secondary/50 px-2 py-1 rounded block">
                  {technique.trigger}
                </code>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Lightbulb className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="font-bold">Pro Tips for Base44</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li className="flex items-center gap-2">
                  <Star className="h-3 w-3 text-yellow-500" />
                  <strong>Start simple:</strong> Get the core feature working, then add complexity
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-3 w-3 text-yellow-500" />
                  <strong>Describe symptoms:</strong> "X isn't working" beats pasting error messages
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-3 w-3 text-yellow-500" />
                  <strong>One change at a time:</strong> Multiple requests = confusion
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-3 w-3 text-yellow-500" />
                  <strong>Give context:</strong> Explain WHY, not just WHAT
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Templates by Category */}
      {categories.map((category) => (
        <div key={category} className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ChevronRight className="h-5 w-5 text-primary" />
            {category}
            {category === "Advanced Techniques" && (
              <Badge className="bg-gradient-to-r from-primary/20 to-accent/20 text-primary">
                🔥 Pro Level
              </Badge>
            )}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {promptTemplates
              .filter((t) => t.category === category)
              .map((template) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card 
                    className={`cursor-pointer transition-all ${
                      selectedTemplate?.id === template.id 
                        ? "ring-2 ring-primary" 
                        : "hover:shadow-md"
                    }`}
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{template.title}</CardTitle>
                        <div className="flex gap-2">
                          {template.technique && (
                            <Badge variant="secondary" className="text-xs">
                              {template.technique}
                            </Badge>
                          )}
                          <Badge variant="outline" className={getDifficultyColor(template.difficulty)}>
                            {template.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {template.template}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </div>
      ))}

      {/* Selected Template Detail */}
      {selectedTemplate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-2 border-primary/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CardTitle>{selectedTemplate.title}</CardTitle>
                  {selectedTemplate.technique && (
                    <Badge className="bg-primary/10 text-primary">
                      {selectedTemplate.technique}
                    </Badge>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(selectedTemplate.template, selectedTemplate.id)}
                >
                  {copiedId === selectedTemplate.id ? (
                    <>
                      <Check className="h-4 w-4 mr-1" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" />
                      Copy Template
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Template:</h4>
                <div className="bg-secondary/50 p-4 rounded-lg text-sm font-mono whitespace-pre-wrap">
                  {selectedTemplate.template}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Example:</h4>
                <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg text-sm whitespace-pre-wrap">
                  {selectedTemplate.example}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2"
                  onClick={() => handleCopy(selectedTemplate.example, `${selectedTemplate.id}-example`)}
                >
                  {copiedId === `${selectedTemplate.id}-example` ? (
                    <>
                      <Check className="h-4 w-4 mr-1" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" />
                      Copy Example
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Practice Area */}
      <Card>
        <CardHeader>
          <CardTitle>Practice Your Prompts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Write your own prompt here... Try using chain-of-thought or persona stacking!"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            rows={5}
            className="font-mono text-sm"
          />
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {customPrompt.length} characters • {customPrompt.split(' ').filter(Boolean).length} words
            </p>
            <Button
              onClick={() => handleCopy(customPrompt, "custom")}
              disabled={!customPrompt.trim()}
            >
              {copiedId === "custom" ? (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  Copy My Prompt
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
