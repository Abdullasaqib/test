import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useStudent } from "@/hooks/useStudent";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Loader2, ArrowRight, Briefcase, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const INDUSTRIES = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "E-commerce",
  "Media & Entertainment",
  "Real Estate",
  "Manufacturing",
  "Consulting",
  "Other",
];

const IDEA_STAGES = [
  { value: "just_thinking", label: "Just thinking about it", description: "I have ideas but haven't started" },
  { value: "researching", label: "Researching the market", description: "Talking to potential customers" },
  { value: "prototyping", label: "Building a prototype", description: "Working on a basic version" },
  { value: "launched", label: "Already launched", description: "Have a product, want to improve" },
];

export default function ProOnboarding() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { student, refetch } = useStudent();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    full_name: "",
    industry: "",
    idea_stage: "",
    terms_accepted: false,
  });

  // Pre-fill name from student record
  useEffect(() => {
    if (student?.full_name) {
      setFormData(prev => ({ ...prev, full_name: student.full_name }));
    }
  }, [student]);

  // Redirect if already completed onboarding
  useEffect(() => {
    if ((student as any)?.pro_onboarding_completed) {
      navigate("/pro/home");
    }
  }, [student, navigate]);

  const handleSubmit = async () => {
    if (!user || !student) return;
    
    if (!formData.terms_accepted) {
      toast({ title: "Please accept the terms to continue", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("students")
        .update({
          full_name: formData.full_name,
          industry: formData.industry,
          idea_stage: formData.idea_stage,
          pro_onboarding_completed: true,
          onboarding_completed: true,
        })
        .eq("id", student.id);

      if (error) throw error;

      await refetch();
      toast({ title: "Welcome to NEXT_!", description: "Let's start building." });
      navigate("/pro/home");
    } catch (error) {
      console.error("Onboarding error:", error);
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceedStep1 = formData.full_name.trim().length > 0;
  const canProceedStep2 = formData.industry && formData.idea_stage && formData.terms_accepted;

  return (
    <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className={`w-3 h-3 rounded-full ${step >= 1 ? "bg-amber-500" : "bg-white/20"}`} />
          <div className={`w-12 h-0.5 ${step >= 2 ? "bg-amber-500" : "bg-white/20"}`} />
          <div className={`w-3 h-3 rounded-full ${step >= 2 ? "bg-amber-500" : "bg-white/20"}`} />
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-8 h-8 text-amber-400" />
                  </div>
                  <CardTitle className="text-2xl text-white">Welcome, Builder</CardTitle>
                  <CardDescription className="text-white/60">
                    Let's get you set up in 30 seconds
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white/80">Your Name</Label>
                    <Input
                      id="name"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      placeholder="How should we call you?"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                    />
                  </div>

                  <Button
                    onClick={() => setStep(2)}
                    disabled={!canProceedStep1}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-black"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lightbulb className="w-8 h-8 text-amber-400" />
                  </div>
                  <CardTitle className="text-2xl text-white">Tell us about your idea</CardTitle>
                  <CardDescription className="text-white/60">
                    This helps us personalize your experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-white/80">Your Industry</Label>
                    <Select
                      value={formData.industry}
                      onValueChange={(value) => setFormData({ ...formData, industry: value })}
                    >
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {INDUSTRIES.map((industry) => (
                          <SelectItem key={industry} value={industry.toLowerCase()}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-white/80">Where are you with your idea?</Label>
                    <div className="grid gap-2">
                      {IDEA_STAGES.map((stage) => (
                        <button
                          key={stage.value}
                          onClick={() => setFormData({ ...formData, idea_stage: stage.value })}
                          className={`p-4 rounded-lg border text-left transition-colors ${
                            formData.idea_stage === stage.value
                              ? "bg-amber-500/20 border-amber-500/50"
                              : "bg-white/5 border-white/10 hover:border-white/20"
                          }`}
                        >
                          <div className="text-white font-medium">{stage.label}</div>
                          <div className="text-white/50 text-sm">{stage.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
                    <Checkbox
                      id="terms"
                      checked={formData.terms_accepted}
                      onCheckedChange={(checked) => setFormData({ ...formData, terms_accepted: checked as boolean })}
                      className="mt-1"
                    />
                    <label htmlFor="terms" className="text-sm text-white/60 cursor-pointer">
                      I accept the{" "}
                      <a href="/terms" className="text-amber-400 hover:underline" target="_blank">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="/privacy" className="text-amber-400 hover:underline" target="_blank">
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="border-white/10 text-white hover:bg-white/5"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={!canProceedStep2 || isSubmitting}
                      className="flex-1 bg-amber-500 hover:bg-amber-600 text-black"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          Start Building
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
