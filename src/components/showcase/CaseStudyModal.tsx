import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Lightbulb, 
  Wrench, 
  Trophy, 
  Sparkles,
  Palette,
  Code,
  Rocket,
  BookOpen,
  Copy,
  Check,
  MessageSquare,
} from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type CaseStudy = Tables<"case_studies">;

interface PromptUsed {
  tool: string;
  prompt: string;
}

interface CaseStudyModalProps {
  caseStudy: CaseStudy;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function getProjectEmoji(title: string): string {
  const lower = title.toLowerCase();
  if (lower.includes("pet") || lower.includes("dog") || lower.includes("cat")) return "🐕";
  if (lower.includes("homework") || lower.includes("study") || lower.includes("learn")) return "📚";
  if (lower.includes("recipe") || lower.includes("food") || lower.includes("cook")) return "🍳";
  if (lower.includes("eco") || lower.includes("green") || lower.includes("recycle")) return "🌱";
  if (lower.includes("pitch") || lower.includes("present") || lower.includes("speak")) return "🎤";
  if (lower.includes("game") || lower.includes("play")) return "🎮";
  if (lower.includes("music") || lower.includes("song")) return "🎵";
  if (lower.includes("art") || lower.includes("draw") || lower.includes("paint")) return "🎨";
  if (lower.includes("language") || lower.includes("speak") || lower.includes("chat")) return "💬";
  return "🚀";
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleCopy}
      className="h-7 px-2 text-xs gap-1"
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {copied ? "Copied!" : "Copy"}
    </Button>
  );
}

export function CaseStudyModal({ caseStudy, open, onOpenChange }: CaseStudyModalProps) {
  const navigate = useNavigate();
  const emoji = getProjectEmoji(caseStudy.title);
  const firstName = caseStudy.student_name?.split(" ")[0] || "This founder";
  const prompts = (caseStudy.prompts_used as unknown as PromptUsed[] | null) || [];

  const handleGetInspired = () => {
    onOpenChange(false);
    navigate('/dashboard/brainstorm');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center pb-4">
          {/* Big emoji header */}
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-accent/30 flex items-center justify-center text-5xl mb-3">
            {emoji}
          </div>
          <DialogTitle className="text-2xl font-bold">{caseStudy.title}</DialogTitle>
          <p className="text-muted-foreground">
            by {caseStudy.student_name}, age {caseStudy.student_age || "?"} • {caseStudy.program} track
          </p>
        </DialogHeader>

        <Tabs defaultValue="story" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="story" className="gap-1.5">
              <BookOpen className="h-4 w-4" />
              Story
            </TabsTrigger>
            <TabsTrigger value="journey" className="gap-1.5">
              <Rocket className="h-4 w-4" />
              Journey
            </TabsTrigger>
            <TabsTrigger value="prompts" className="gap-1.5">
              <MessageSquare className="h-4 w-4" />
              Prompts
            </TabsTrigger>
          </TabsList>

          {/* Story Tab */}
          <TabsContent value="story" className="space-y-4">
            {/* The Problem */}
            {caseStudy.problem_found && (
              <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-yellow-200 dark:bg-yellow-800 flex items-center justify-center">
                      <Lightbulb className="h-4 w-4 text-yellow-700 dark:text-yellow-300" />
                    </div>
                    <span className="font-bold text-yellow-700 dark:text-yellow-300">😤 The Problem</span>
                  </div>
                  <p className="text-yellow-900 dark:text-yellow-100 leading-relaxed">
                    {caseStudy.problem_found}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* The Outcome */}
            {caseStudy.outcome && (
              <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-green-200 dark:bg-green-800 flex items-center justify-center">
                      <Trophy className="h-4 w-4 text-green-700 dark:text-green-300" />
                    </div>
                    <span className="font-bold text-green-700 dark:text-green-300">🏆 The Result</span>
                  </div>
                  <p className="text-green-900 dark:text-green-100 leading-relaxed font-semibold">
                    {caseStudy.outcome}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Key Learnings */}
            {caseStudy.key_learnings && (
              <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-purple-200 dark:bg-purple-800 flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-purple-700 dark:text-purple-300" />
                    </div>
                    <span className="font-bold text-purple-700 dark:text-purple-300">💡 Key Learnings</span>
                  </div>
                  <p className="text-purple-900 dark:text-purple-100 leading-relaxed">
                    {caseStudy.key_learnings}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Tools Used */}
            {caseStudy.tools_used && caseStudy.tools_used.length > 0 && (
              <div className="pt-2">
                <p className="text-sm font-medium text-muted-foreground mb-2">🔧 Tools Used</p>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.tools_used.map((tool) => (
                    <Badge key={tool} variant="secondary" className="px-3 py-1">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Journey Tab */}
          <TabsContent value="journey" className="space-y-4">
            {/* Design Journey */}
            {caseStudy.design_journey && (
              <Card className="bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-pink-200 dark:bg-pink-800 flex items-center justify-center">
                      <Palette className="h-4 w-4 text-pink-700 dark:text-pink-300" />
                    </div>
                    <span className="font-bold text-pink-700 dark:text-pink-300">🎨 Design Journey</span>
                  </div>
                  <p className="text-pink-900 dark:text-pink-100 leading-relaxed">
                    {caseStudy.design_journey}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Code Journey */}
            {caseStudy.code_journey && (
              <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-blue-200 dark:bg-blue-800 flex items-center justify-center">
                      <Code className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                    </div>
                    <span className="font-bold text-blue-700 dark:text-blue-300">💻 Build Journey</span>
                  </div>
                  <p className="text-blue-900 dark:text-blue-100 leading-relaxed">
                    {caseStudy.code_journey}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Launch Story */}
            {caseStudy.launch_story && (
              <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-green-200 dark:bg-green-800 flex items-center justify-center">
                      <Rocket className="h-4 w-4 text-green-700 dark:text-green-300" />
                    </div>
                    <span className="font-bold text-green-700 dark:text-green-300">🚀 Launch Story</span>
                  </div>
                  <p className="text-green-900 dark:text-green-100 leading-relaxed">
                    {caseStudy.launch_story}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Prompts Tab */}
          <TabsContent value="prompts" className="space-y-4">
            {prompts.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground">
                  Here are the actual AI prompts {firstName} used to build this project. Copy them and adapt for your own ideas!
                </p>
                {prompts.map((item, index) => (
                  <Card key={index} className="bg-muted/30 border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="gap-1">
                          <Wrench className="h-3 w-3" />
                          {item.tool}
                        </Badge>
                        <CopyButton text={item.prompt} />
                      </div>
                      <div className="bg-background rounded-lg p-3 border font-mono text-sm">
                        {item.prompt}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="h-10 w-10 mx-auto mb-3 opacity-50" />
                <p>No prompts documented for this project yet.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="pt-4 flex justify-center gap-3">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
          <Button 
            className="gap-2"
            onClick={handleGetInspired}
          >
            <Sparkles className="h-4 w-4" />
            Get Inspired
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
