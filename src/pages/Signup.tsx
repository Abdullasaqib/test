import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useStudent } from "@/hooks/useStudent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft, AlertCircle } from "lucide-react";
import { z } from "zod";
import { CursorWordmark } from "@/components/ui/cursor-wordmark";
import { supabase } from "@/integrations/supabase/client";

// Schema changes based on age group
const createSignupSchema = (requiresParentEmail: boolean) => z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  ageGroup: z.string().min(1, "Please select your age group"),
  parentEmail: requiresParentEmail 
    ? z.string().email("Please enter a valid parent/guardian email")
    : z.string().optional(),
  termsAccepted: z.literal(true, { errorMap: () => ({ message: "You must accept the terms" }) }),
});

type AgeGroup = "9-11" | "12-14" | "15-17" | "18+" | "";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    ageGroup: "" as AgeGroup,
    parentEmail: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { signUp, user, loading: authLoading } = useAuth();
  const { student, refetch: refetchStudent } = useStudent();
  const navigate = useNavigate();
  const { toast } = useToast();

  const isUnder13 = formData.ageGroup === "9-11";

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user && student) {
      // Check if under-13 and needs consent
      if (student.age && student.age < 13 && !student.parent_consent_verified) {
        navigate("/awaiting-consent", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    }
  }, [user, authLoading, student, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleAgeSelect = (age: AgeGroup) => {
    setFormData((prev) => ({ ...prev, ageGroup: age }));
    setErrors((prev) => ({ ...prev, ageGroup: "", parentEmail: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      const schema = createSignupSchema(isUnder13);
      const result = schema.safeParse(formData);
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
        setLoading(false);
        return;
      }

      // Validate parent email is different from student email for under-13
      if (isUnder13 && formData.parentEmail.toLowerCase() === formData.email.toLowerCase()) {
        setErrors({ parentEmail: "Parent email must be different from your email" });
        setLoading(false);
        return;
      }

      // Convert age group to numeric age for storage
      const ageMap: Record<AgeGroup, number> = {
        "9-11": 10,
        "12-14": 13,
        "15-17": 16,
        "18+": 21,
        "": 0,
      };

      const { error } = await signUp(formData.email, formData.password, formData.fullName);
      
      if (error) {
        if (error.message.includes("already registered")) {
          toast({
            title: "Account exists",
            description: "This email is already registered. Please sign in instead.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Signup failed",
            description: error.message,
            variant: "destructive",
          });
        }
        setLoading(false);
        return;
      }

      // Store age in localStorage for profile creation
      localStorage.setItem("signup_age", String(ageMap[formData.ageGroup]));
      localStorage.setItem("signup_age_group", formData.ageGroup);

      // If under-13, we need to send parent consent email
      if (isUnder13 && formData.parentEmail) {
        // Wait briefly for auth to complete and student record to be created
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Refetch student to get the ID
        const { data: newStudent } = await supabase
          .from("students")
          .select("id")
          .eq("user_id", (await supabase.auth.getUser()).data.user?.id)
          .single();

        if (newStudent) {
          // Update student age
          await supabase
            .from("students")
            .update({ age: ageMap[formData.ageGroup] })
            .eq("id", newStudent.id);

          // Send parent consent email
          try {
            const { error: consentError } = await supabase.functions.invoke("send-parent-consent", {
              body: {
                studentId: newStudent.id,
                studentName: formData.fullName,
                studentEmail: formData.email,
                parentEmail: formData.parentEmail,
                siteUrl: window.location.origin,
              },
            });

            if (consentError) {
              console.error("Error sending consent email:", consentError);
            }
          } catch (err) {
            console.error("Failed to send consent email:", err);
          }
        }

        toast({
          title: "Almost there!",
          description: "We've sent an email to your parent/guardian for approval.",
        });
        
        navigate("/awaiting-consent", { replace: true });
      } else {
        toast({
          title: "Welcome to NEXT_!",
          description: "Your account has been created successfully.",
        });
        
        // Redirect handled by useEffect when user state updates
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col">
      {/* Header */}
      <header className="p-4">
        <Link 
          to="/academy" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-border/50 shadow-xl">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <CursorWordmark 
                word="NEXT" 
                size="xl" 
                subtitle="BILLION LAB"
                className="text-foreground"
              />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">Create Your Account</CardTitle>
              <CardDescription className="mt-1">
                Start building what's NEXT_
              </CardDescription>
            </div>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="Your name"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={loading}
                  autoFocus
                />
                {errors.fullName && (
                  <p className="text-sm text-destructive">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="At least 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>

              {/* Age Group */}
              <div className="space-y-2">
                <Label>Age Group</Label>
                <div className="grid grid-cols-4 gap-2">
                  {(["9-11", "12-14", "15-17", "18+"] as AgeGroup[]).map((age) => (
                    <Button
                      key={age}
                      type="button"
                      variant={formData.ageGroup === age ? "default" : "outline"}
                      className="w-full"
                      onClick={() => handleAgeSelect(age)}
                      disabled={loading}
                    >
                      {age}
                    </Button>
                  ))}
                </div>
                {errors.ageGroup && (
                  <p className="text-sm text-destructive">{errors.ageGroup}</p>
                )}
              </div>

              {/* Parent Email - Only shown for under-13 */}
              {isUnder13 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 mb-2">
                    <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0" />
                    <p className="text-sm text-amber-500">
                      Ages 9-11 require parent/guardian approval to access the platform.
                    </p>
                  </div>
                  <Label htmlFor="parentEmail">Parent/Guardian Email</Label>
                  <Input
                    id="parentEmail"
                    name="parentEmail"
                    type="email"
                    placeholder="parent@example.com"
                    value={formData.parentEmail}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  <p className="text-xs text-muted-foreground">
                    Your parent will receive an email to approve your account.
                  </p>
                  {errors.parentEmail && (
                    <p className="text-sm text-destructive">{errors.parentEmail}</p>
                  )}
                </div>
              )}

              {/* Terms */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) => {
                    setFormData((prev) => ({ ...prev, termsAccepted: checked === true }));
                    setErrors((prev) => ({ ...prev, termsAccepted: "" }));
                  }}
                  disabled={loading}
                />
                <Label htmlFor="terms" className="text-sm leading-tight cursor-pointer">
                  I agree to the{" "}
                  <Link to="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>
              {errors.termsAccepted && (
                <p className="text-sm text-destructive">{errors.termsAccepted}</p>
              )}
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isUnder13 ? "Creating account..." : "Creating account..."}
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  );
}
