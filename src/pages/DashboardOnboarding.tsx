import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useStudent } from "@/hooks/useStudent";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ChevronRight, ChevronLeft, Check, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CursorWordmark } from "@/components/ui/cursor-wordmark";

const programs = [
  { 
    value: "junior", 
    label: "Junior Builders", 
    ages: "9-11",
    ageRange: [9, 10, 11],
    emoji: "🌱"
  },
  { 
    value: "teen", 
    label: "Teen Founders", 
    ages: "12-14",
    ageRange: [12, 13, 14],
    emoji: "🚀"
  },
  { 
    value: "advanced", 
    label: "Advanced", 
    ages: "15-17",
    ageRange: [15, 16, 17],
    emoji: "⚡"
  },
];

function getProgramFromAge(age: number): string {
  if (age >= 9 && age <= 11) return "junior";
  if (age >= 12 && age <= 14) return "teen";
  if (age >= 15 && age <= 17) return "advanced";
  return "teen";
}

type Step = "age" | "student" | "parent" | "consent";

interface FormData {
  // Student info
  selectedProgram: typeof programs[0] | null;
  studentName: string;
  // Parent info
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  parentRelationship: string;
  // Consent
  termsAccepted: boolean;
  privacyAccepted: boolean;
  marketingConsent: boolean;
}

export default function DashboardOnboarding() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const { user } = useAuth();
  const { student, loading: studentLoading, refetch } = useStudent();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkingApplication, setCheckingApplication] = useState(true);
  
  // Get age from URL params (passed from checkout/tier pages)
  const ageFromUrl = searchParams.get("age");
  
  // If age is provided via URL, skip the age step
  const [currentStep, setCurrentStep] = useState<Step>(ageFromUrl ? "student" : "age");
  
  const [formData, setFormData] = useState<FormData>({
    selectedProgram: null,
    studentName: "",
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    parentRelationship: "parent",
    termsAccepted: false,
    privacyAccepted: false,
    marketingConsent: false,
  });

  // Redirect if already onboarded
  useEffect(() => {
    if (!studentLoading) {
      if (student?.onboarding_completed) {
        navigate("/dashboard", { replace: true });
        return;
      }
      // Always stop checking once studentLoading is done - regardless of student existing
      setCheckingApplication(false);
    }
  }, [student, studentLoading, navigate]);

  // Check for existing application and auto-create student
  useEffect(() => {
    const checkAndLinkApplication = async () => {
      if (!user?.email || studentLoading) return;
      if (student?.onboarding_completed) return;

      try {
        const { data: application, error } = await supabase
          .from("applications")
          .select("*")
          .eq("email", user.email)
          .maybeSingle();

        if (error) {
          console.error("Error checking application:", error);
          setCheckingApplication(false);
          return;
        }

        if (application) {
          // Found application - pre-fill form data
          const program = programs.find(p => p.value === getProgramFromAge(application.age));
          setFormData(prev => ({
            ...prev,
            selectedProgram: program || null,
            studentName: application.founder_name || "",
            parentName: application.parent_name || "",
            parentEmail: application.parent_email || "",
            parentPhone: application.parent_phone || "",
          }));
          
          // Skip to parent/consent step if we have basic info
          if (application.founder_name && application.age) {
            setCurrentStep("parent");
          }
        }

        setCheckingApplication(false);
      } catch (err) {
        console.error("Error in application check:", err);
        setCheckingApplication(false);
      }
    };

    if (user && !studentLoading && !student?.onboarding_completed) {
      checkAndLinkApplication();
    } else if (!studentLoading) {
      setCheckingApplication(false);
    }
  }, [user, student, studentLoading]);

  // Pre-fill student name from user metadata
  useEffect(() => {
    if (user && !formData.studentName) {
      setFormData(prev => ({
        ...prev,
        studentName: user.user_metadata?.full_name || "",
      }));
    }
  }, [user]);

  const handleSelectProgram = (program: typeof programs[0]) => {
    setFormData(prev => ({ ...prev, selectedProgram: program }));
    setCurrentStep("student");
  };

  const handleStudentSubmit = () => {
    if (!formData.studentName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter the student's name",
        variant: "destructive",
      });
      return;
    }
    setCurrentStep("parent");
  };

  const handleParentSubmit = () => {
    if (!formData.parentName.trim()) {
      toast({
        title: "Parent/Guardian name required",
        description: "Please enter parent or guardian name",
        variant: "destructive",
      });
      return;
    }
    if (!formData.parentEmail.trim() || !formData.parentEmail.includes("@")) {
      toast({
        title: "Valid email required",
        description: "Please enter a valid parent/guardian email",
        variant: "destructive",
      });
      return;
    }
    setCurrentStep("consent");
  };

  const handleFinalSubmit = async () => {
    if (!formData.termsAccepted || !formData.privacyAccepted) {
      toast({
        title: "Consent required",
        description: "Please accept the Terms of Service and Privacy Policy to continue",
        variant: "destructive",
      });
      return;
    }

    if (!user || !formData.selectedProgram) {
      toast({
        title: "Error",
        description: "Missing required information",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const now = new Date().toISOString();
      
      const { error } = await supabase
        .from("students")
        .upsert({
          user_id: user.id,
          full_name: formData.studentName.trim(),
          age: formData.selectedProgram.ageRange[1],
          program: formData.selectedProgram.value,
          parent_name: formData.parentName.trim(),
          parent_email: formData.parentEmail.trim(),
          parent_phone: formData.parentPhone.trim() || null,
          parent_relationship: formData.parentRelationship,
          terms_accepted_at: now,
          parent_consent_at: now,
          marketing_consent: formData.marketingConsent,
          profile_completed_at: now,
          onboarding_completed: true,
          updated_at: now,
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;

      // Get the student ID for auto-enrollment
      const { data: studentData } = await supabase
        .from("students")
        .select("id")
        .eq("user_id", user.id)
        .single();

      // Auto-enroll in AI Foundations Certificate
      if (studentData) {
        await supabase
          .from("student_certifications")
          .upsert({
            student_id: studentData.id,
            certification_id: '761a157d-a1e0-4423-99b8-a58f5ddad129', // AI Foundations Certificate
            started_at: now,
          }, { 
            onConflict: 'student_id,certification_id',
            ignoreDuplicates: true 
          });
      }

      // Update application if exists
      await supabase
        .from("applications")
        .update({ 
          user_id: user.id,
          parent_name: formData.parentName.trim(),
          parent_email: formData.parentEmail.trim(),
          parent_phone: formData.parentPhone.trim() || null,
        })
        .eq("email", user.email);

      await refetch();

      toast({
        title: "Welcome to Next Billion Lab! 🚀",
        description: `Let's start building, ${formData.studentName.split(' ')[0]}!`,
      });
      
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Onboarding error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (studentLoading || checkingApplication) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground text-sm">Setting up your account...</p>
        </div>
      </div>
    );
  }

  // Progress indicator
  const steps: Step[] = ["age", "student", "parent", "consent"];
  const currentStepIndex = steps.indexOf(currentStep);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <CursorWordmark 
              word="NEXT" 
              size="lg" 
              subtitle="BILLION LAB"
              className="text-foreground"
            />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            {currentStep === "age" && "How old are you?"}
            {currentStep === "student" && "What's your name?"}
            {currentStep === "parent" && "Parent/Guardian Info"}
            {currentStep === "consent" && "Almost there!"}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {currentStep === "age" && "Pick your age group to get started"}
            {currentStep === "student" && "We'll personalize your experience"}
            {currentStep === "parent" && "Required for students under 18"}
            {currentStep === "consent" && "Review and accept to continue"}
          </p>
        </div>

        {/* Progress bar */}
        <div className="flex gap-2 mb-8">
          {steps.map((step, index) => (
            <div
              key={step}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                index <= currentStepIndex ? "bg-primary" : "bg-muted"
              )}
            />
          ))}
        </div>

        {/* Step Content */}
        <div className="bg-card border border-border rounded-xl p-6">
          
          {/* Step 1: Age Selection */}
          {currentStep === "age" && (
            <div className="grid grid-cols-3 gap-3">
              {programs.map((program) => (
                <button
                  key={program.value}
                  onClick={() => handleSelectProgram(program)}
                  className={cn(
                    "flex flex-col items-center p-4 rounded-xl border-2",
                    "bg-background hover:border-primary hover:bg-primary/5",
                    "transition-all duration-200 cursor-pointer",
                    formData.selectedProgram?.value === program.value && "border-primary bg-primary/10"
                  )}
                >
                  <span className="text-3xl mb-2">{program.emoji}</span>
                  <span className="text-lg font-bold text-foreground">{program.ages}</span>
                  <span className="text-xs text-muted-foreground mt-1">{program.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Step 2: Student Name */}
          {currentStep === "student" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="studentName">Student's Full Name</Label>
                <Input
                  id="studentName"
                  placeholder="Alex Smith"
                  value={formData.studentName}
                  onChange={(e) => setFormData(prev => ({ ...prev, studentName: e.target.value }))}
                  className="mt-1.5"
                />
              </div>
              
              <div className="flex gap-3 pt-2">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep("age")}
                  className="flex-1"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
                <Button 
                  onClick={handleStudentSubmit}
                  className="flex-1"
                >
                  Continue
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Parent Info */}
          {currentStep === "parent" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3 mb-4">
                <Shield className="h-4 w-4 flex-shrink-0" />
                <span>We require parent/guardian info for all students under 18</span>
              </div>

              <div>
                <Label htmlFor="parentName">Parent/Guardian Full Name *</Label>
                <Input
                  id="parentName"
                  placeholder="Jane Smith"
                  value={formData.parentName}
                  onChange={(e) => setFormData(prev => ({ ...prev, parentName: e.target.value }))}
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="parentEmail">Parent/Guardian Email *</Label>
                <Input
                  id="parentEmail"
                  type="email"
                  placeholder="parent@email.com"
                  value={formData.parentEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, parentEmail: e.target.value }))}
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="parentPhone">Phone (optional)</Label>
                <Input
                  id="parentPhone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.parentPhone}
                  onChange={(e) => setFormData(prev => ({ ...prev, parentPhone: e.target.value }))}
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="relationship">Relationship</Label>
                <Select
                  value={formData.parentRelationship}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, parentRelationship: value }))}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="guardian">Legal Guardian</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-3 pt-2">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep("student")}
                  className="flex-1"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
                <Button 
                  onClick={handleParentSubmit}
                  className="flex-1"
                >
                  Continue
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Consent */}
          {currentStep === "consent" && (
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                  <Checkbox
                    id="terms"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, termsAccepted: checked === true }))
                    }
                    className="mt-0.5"
                  />
                  <label htmlFor="terms" className="text-sm cursor-pointer">
                    I agree to the{" "}
                    <Link to="/terms" target="_blank" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and confirm I am the parent/guardian of this student *
                  </label>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                  <Checkbox
                    id="privacy"
                    checked={formData.privacyAccepted}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, privacyAccepted: checked === true }))
                    }
                    className="mt-0.5"
                  />
                  <label htmlFor="privacy" className="text-sm cursor-pointer">
                    I have read and accept the{" "}
                    <Link to="/privacy" target="_blank" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>{" "}
                    and consent to data collection as described *
                  </label>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                  <Checkbox
                    id="marketing"
                    checked={formData.marketingConsent}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, marketingConsent: checked === true }))
                    }
                    className="mt-0.5"
                  />
                  <label htmlFor="marketing" className="text-sm cursor-pointer text-muted-foreground">
                    Send me updates about new features, programs, and tips (optional)
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep("parent")}
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
                <Button 
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting || !formData.termsAccepted || !formData.privacyAccepted}
                  className="flex-1"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4 mr-1" />
                      Start Building!
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <p className="text-xs text-muted-foreground text-center mt-6">
          {currentStep === "consent" ? (
            "By continuing, you confirm you are the parent/guardian of this student"
          ) : (
            `Step ${currentStepIndex + 1} of ${steps.length}`
          )}
        </p>
      </div>
    </div>
  );
}
