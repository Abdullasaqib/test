import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Copy, Check, Lightbulb, Code, Palette, Rocket, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { useCaseStudy } from "@/hooks/useCaseStudies";
import { useStudentPricingTier } from "@/hooks/useStudentPricingTier";
import { UpgradePrompt } from "@/components/dashboard/UpgradePrompt";
import { toast } from "sonner";
import { useState } from "react";

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: study, isLoading } = useCaseStudy(slug || "");
  const { canAccess, tier } = useStudentPricingTier();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const hasAccess = tier ? canAccess("case_studies") : false;

  const handleCopyPrompt = (prompt: string, index: number) => {
    navigator.clipboard.writeText(prompt);
    setCopiedIndex(index);
    toast.success("Prompt copied to clipboard!");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!study) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Case study not found</h1>
          <Button onClick={() => navigate("/case-studies")}>View All Case Studies</Button>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-background">
        <PublicHeader />
        <main className="pt-24 pb-20 container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/case-studies")}
            className="mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to case studies
          </Button>
          
          <UpgradePrompt
            feature="Case Studies"
            description="Upgrade to Yearly Founder or Live Cohort to access detailed case studies with copy-paste prompts."
            variant="card"
          />
        </main>
      </div>
    );
  }

  const programLabels: Record<string, string> = {
    junior: "Junior (9-11)",
    teen: "Teen (12-14)",
    advanced: "Advanced (15-17)",
  };

  const sections = [
    { 
      icon: Lightbulb, 
      title: "The Problem", 
      content: study.problem_found,
      color: "text-yellow-500"
    },
    { 
      icon: Palette, 
      title: "Design Journey", 
      content: study.design_journey,
      color: "text-pink-500"
    },
    { 
      icon: Code, 
      title: "Building with AI", 
      content: study.code_journey,
      color: "text-blue-500"
    },
    { 
      icon: Rocket, 
      title: "Launch Story", 
      content: study.launch_story,
      color: "text-green-500"
    },
    { 
      icon: BookOpen, 
      title: "Key Learnings", 
      content: study.key_learnings,
      color: "text-purple-500"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button
            variant="ghost"
            onClick={() => navigate("/case-studies")}
            className="mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to case studies
          </Button>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline">{programLabels[study.program]}</Badge>
              <span className="text-muted-foreground">
                Built by {study.student_name}, age {study.student_age}
              </span>
            </div>
            
            <h1 className="text-4xl font-bold mb-4">{study.title}</h1>
            
            {study.outcome && (
              <div className="bg-primary/10 text-primary rounded-lg p-4 inline-block">
                📈 <span className="font-semibold">{study.outcome}</span>
              </div>
            )}

            <div className="flex flex-wrap gap-2 mt-6">
              {study.tools_used.map((tool) => (
                <Badge key={tool} variant="secondary">
                  {tool}
                </Badge>
              ))}
            </div>
          </motion.div>

          {/* Prompts Used */}
          {Array.isArray(study.prompts_used) && study.prompts_used.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Copy className="h-5 w-5" />
                    Copy-Paste Prompts Used
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {(study.prompts_used as Array<{ tool: string; prompt: string }>).map((item, index) => (
                    <div 
                      key={index}
                      className="bg-muted/50 rounded-lg p-4 relative group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{item.tool}</Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCopyPrompt(item.prompt, index)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          {copiedIndex === index ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <p className="text-sm font-mono">{item.prompt}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Content Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              section.content && (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (index + 2) }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <section.icon className={`h-5 w-5 ${section.color}`} />
                        {section.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground whitespace-pre-wrap">
                        {section.content}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-none">
              <CardContent className="py-8">
                <h2 className="text-2xl font-bold mb-2">Ready to build your own?</h2>
                <p className="text-muted-foreground mb-4">
                  Join thousands of young founders building with AI
                </p>
                <Button size="lg" onClick={() => navigate("/pricing")}>
                  Start Your Journey
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
