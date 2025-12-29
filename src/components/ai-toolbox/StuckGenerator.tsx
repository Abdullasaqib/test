import { useState } from "react";
import { Loader2, Copy, Check, Sparkles, ArrowRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface StuckGeneratorProps {
  studentContext: {
    currentWeek: number;
    program: string;
    ideaSummary?: string;
  };
  onUsePrompt: (prompt: string) => void;
}

const taskOptions = [
  { value: "landing_page", label: "Build my landing page" },
  { value: "customer_research", label: "Talk to potential customers" },
  { value: "pitch", label: "Create my pitch" },
  { value: "prototype", label: "Build a prototype/MVP" },
  { value: "marketing", label: "Get my first customers" },
  { value: "pricing", label: "Figure out pricing" },
  { value: "logo_design", label: "Design my logo/brand" },
  { value: "business_model", label: "Create my business model" },
  { value: "other", label: "Something else..." },
];

const blockerOptions = [
  { id: "dont_know_start", label: "Don't know where to start" },
  { id: "too_complex", label: "AI responses are too complicated" },
  { id: "not_matching", label: "Results don't match what I need" },
  { id: "no_ideas", label: "Out of ideas" },
  { id: "technical", label: "Technical issues" },
  { id: "confused", label: "Confused about next steps" },
  { id: "motivation", label: "Feeling overwhelmed" },
];

export function StuckGenerator({ studentContext, onUsePrompt }: StuckGeneratorProps) {
  const [step, setStep] = useState(1);
  const [tryingToDo, setTryingToDo] = useState("");
  const [whatTried, setWhatTried] = useState("");
  const [blockers, setBlockers] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<{
    generatedPrompt: string;
    explanation: string;
    nextSteps: string[];
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const toggleBlocker = (blockerId: string) => {
    setBlockers((prev) =>
      prev.includes(blockerId)
        ? prev.filter((b) => b !== blockerId)
        : [...prev, blockerId]
    );
  };

  const handleGenerate = async () => {
    if (!tryingToDo || !whatTried || blockers.length === 0) {
      toast({
        title: "Please fill in all fields",
        description: "We need this info to help you get unstuck!",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const selectedTask = taskOptions.find((t) => t.value === tryingToDo);
      const selectedBlockers = blockers.map(
        (b) => blockerOptions.find((opt) => opt.id === b)?.label || b
      );

      const { data, error } = await supabase.functions.invoke("generate-stuck-prompt", {
        body: {
          tryingToDo: selectedTask?.label || tryingToDo,
          whatTried,
          blockers: selectedBlockers,
          studentContext,
        },
      });

      if (error) throw error;
      setResult(data);
      setStep(4);
    } catch (error) {
      console.error("Error generating prompt:", error);
      toast({
        title: "Oops!",
        description: "Couldn't generate your prompt. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.generatedPrompt);
    setCopied(true);
    toast({ title: "Copied!", description: "Prompt copied to clipboard" });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setStep(1);
    setTryingToDo("");
    setWhatTried("");
    setBlockers([]);
    setResult(null);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader className="text-center pb-4">
          <div className="text-4xl mb-2">🆘</div>
          <CardTitle className="text-xl">Let me help you get unstuck!</CardTitle>
          <p className="text-sm text-muted-foreground">
            Answer a few quick questions and I'll create the perfect prompt for you
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress indicator */}
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`w-2 h-2 rounded-full transition-colors ${
                  s <= step ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>

          {/* Step 1: What are you trying to do */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Step 1: What are you trying to do?
                </label>
                <Select value={tryingToDo} onValueChange={setTryingToDo}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select what you're working on..." />
                  </SelectTrigger>
                  <SelectContent>
                    {taskOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                className="w-full"
                onClick={() => setStep(2)}
                disabled={!tryingToDo}
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Step 2: What have you tried */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Step 2: What have you tried so far?
                </label>
                <Textarea
                  placeholder="Tell me what you've already attempted... (e.g., 'I asked ChatGPT to help but the answer was too complicated')"
                  value={whatTried}
                  onChange={(e) => setWhatTried(e.target.value)}
                  rows={4}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => setStep(3)}
                  disabled={!whatTried.trim()}
                >
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: What's blocking you */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Step 3: What's blocking you? (select all that apply)
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {blockerOptions.map((option) => (
                    <div
                      key={option.id}
                      className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        blockers.includes(option.id)
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => toggleBlocker(option.id)}
                    >
                      <Checkbox checked={blockers.includes(option.id)} />
                      <span className="text-sm">{option.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleGenerate}
                  disabled={blockers.length === 0 || isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate My Prompt
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Result */}
          {step === 4 && result && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Your Custom Prompt</span>
                </div>
                <div className="bg-background rounded-md p-3 font-mono text-sm">
                  {result.generatedPrompt}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopy}>
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 mr-1" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                  <Button size="sm" onClick={() => onUsePrompt(result.generatedPrompt)}>
                    <Sparkles className="h-4 w-4 mr-1" />
                    Use This Prompt
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">💡 Why this will help:</h4>
                <p className="text-sm text-muted-foreground">{result.explanation}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">📋 Next steps:</h4>
                <ol className="space-y-1">
                  {result.nextSteps.map((step, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex gap-2">
                      <span className="font-medium text-foreground">{i + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <Button variant="outline" className="w-full" onClick={handleReset}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Start Over
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}