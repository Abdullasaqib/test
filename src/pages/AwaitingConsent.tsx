import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useStudent } from "@/hooks/useStudent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, Clock, RefreshCw, HelpCircle, CheckCircle2 } from "lucide-react";
import { CursorWordmark } from "@/components/ui/cursor-wordmark";
import { supabase } from "@/integrations/supabase/client";

export default function AwaitingConsent() {
  const [resending, setResending] = useState(false);
  const [lastResent, setLastResent] = useState<Date | null>(null);
  const { user, loading: authLoading, signOut } = useAuth();
  const { student, loading: studentLoading, refetch } = useStudent();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if consent has been verified
  useEffect(() => {
    if (!authLoading && !studentLoading) {
      if (!user) {
        navigate("/login", { replace: true });
        return;
      }

      // If consent is now verified or user is 13+, redirect to dashboard
      if (student) {
        const isUnder13 = student.age && student.age < 13;
        const isVerified = (student as any).parent_consent_verified;
        
        if (!isUnder13 || isVerified) {
          navigate("/dashboard", { replace: true });
        }
      }
    }
  }, [user, authLoading, student, studentLoading, navigate]);

  // Poll for consent status every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 10000);

    return () => clearInterval(interval);
  }, [refetch]);

  const handleResendEmail = async () => {
    // Rate limit: 1 resend per minute
    if (lastResent && Date.now() - lastResent.getTime() < 60000) {
      toast({
        title: "Please wait",
        description: "You can resend the email in a moment.",
        variant: "destructive",
      });
      return;
    }

    setResending(true);

    try {
      const { error } = await supabase.functions.invoke("send-parent-consent", {
        body: {
          studentId: student?.id,
          studentName: student?.full_name,
          studentEmail: user?.email,
          parentEmail: student?.parent_email,
          siteUrl: window.location.origin,
        },
      });

      if (error) {
        throw error;
      }

      setLastResent(new Date());
      toast({
        title: "Email sent!",
        description: "We've sent another email to your parent/guardian.",
      });
    } catch (err) {
      console.error("Error resending email:", err);
      toast({
        title: "Failed to send",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setResending(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/login", { replace: true });
  };

  // Mask email for privacy
  const maskEmail = (email: string | null | undefined) => {
    if (!email) return "your parent";
    const [local, domain] = email.split("@");
    if (local.length <= 3) return `${local[0]}***@${domain}`;
    return `${local.slice(0, 3)}***@${domain}`;
  };

  if (authLoading || studentLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col">
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
            
            {/* Animated Mail Icon */}
            <div className="flex justify-center py-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Mail className="h-10 w-10 text-amber-500" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-background border-2 border-amber-500 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-amber-500" />
                </div>
              </div>
            </div>

            <div>
              <CardTitle className="text-2xl font-bold">Almost There!</CardTitle>
              <CardDescription className="mt-2">
                We've sent an email to{" "}
                <span className="font-medium text-foreground">
                  {maskEmail(student?.parent_email)}
                </span>
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Instructions */}
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">1</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Ask your parent to check their email</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Check spam/junk folder if not found
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">2</span>
                </div>
                <div>
                  <p className="text-sm font-medium">They click the "Approve Account" button</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    The link expires in 24 hours
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">You'll get instant access!</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    This page will update automatically
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={handleResendEmail}
                disabled={resending}
              >
                {resending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Resend Email
                  </>
                )}
              </Button>

              <Button
                variant="ghost"
                className="w-full text-muted-foreground"
                onClick={handleSignOut}
              >
                Sign out and use a different email
              </Button>
            </div>

            {/* Help Link */}
            <div className="text-center pt-2">
              <Link 
                to="/help" 
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
              >
                <HelpCircle className="h-4 w-4" />
                Need help?
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
