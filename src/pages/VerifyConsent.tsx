import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle2, XCircle, Clock, ArrowRight } from "lucide-react";
import { CursorWordmark } from "@/components/ui/cursor-wordmark";
import { supabase } from "@/integrations/supabase/client";

type VerifyStatus = "loading" | "success" | "already_verified" | "expired" | "error";

export default function VerifyConsent() {
  const [status, setStatus] = useState<VerifyStatus>("loading");
  const [studentName, setStudentName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const token = searchParams.get("token");

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setStatus("error");
        setErrorMessage("No verification token provided.");
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke("verify-parent-consent", {
          body: { token },
        });

        if (error) {
          console.error("Verification error:", error);
          setStatus("error");
          setErrorMessage("Failed to verify consent. Please try again.");
          return;
        }

        if (data.error) {
          if (data.error.includes("expired")) {
            setStatus("expired");
          } else {
            setStatus("error");
            setErrorMessage(data.error);
          }
          return;
        }

        setStudentName(data.studentName || "your child");
        
        if (data.alreadyVerified) {
          setStatus("already_verified");
        } else {
          setStatus("success");
        }
      } catch (err) {
        console.error("Error verifying consent:", err);
        setStatus("error");
        setErrorMessage("Something went wrong. Please try again.");
      }
    };

    verifyToken();
  }, [token]);

  const renderContent = () => {
    switch (status) {
      case "loading":
        return (
          <>
            <div className="flex justify-center py-6">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Verifying...</CardTitle>
            <CardDescription className="mt-2">
              Please wait while we verify your consent.
            </CardDescription>
          </>
        );

      case "success":
        return (
          <>
            <div className="flex justify-center py-6">
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-green-500" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-green-500">
              Consent Verified!
            </CardTitle>
            <CardDescription className="mt-2">
              <strong>{studentName}</strong>'s account is now active. They can start learning!
            </CardDescription>
          </>
        );

      case "already_verified":
        return (
          <>
            <div className="flex justify-center py-6">
              <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-blue-500" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-blue-500">
              Already Verified
            </CardTitle>
            <CardDescription className="mt-2">
              <strong>{studentName}</strong>'s account was already approved. They can start learning!
            </CardDescription>
          </>
        );

      case "expired":
        return (
          <>
            <div className="flex justify-center py-6">
              <div className="w-20 h-20 rounded-full bg-amber-500/20 flex items-center justify-center">
                <Clock className="h-10 w-10 text-amber-500" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-amber-500">
              Link Expired
            </CardTitle>
            <CardDescription className="mt-2">
              This verification link has expired. Your child can request a new email from their account.
            </CardDescription>
          </>
        );

      case "error":
        return (
          <>
            <div className="flex justify-center py-6">
              <div className="w-20 h-20 rounded-full bg-destructive/20 flex items-center justify-center">
                <XCircle className="h-10 w-10 text-destructive" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-destructive">
              Verification Failed
            </CardTitle>
            <CardDescription className="mt-2">
              {errorMessage || "We couldn't verify this link. It may be invalid or expired."}
            </CardDescription>
          </>
        );
    }
  };

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
            
            {renderContent()}
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Success/Already Verified Actions */}
            {(status === "success" || status === "already_verified") && (
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                  <h4 className="font-medium">What's Next?</h4>
                  <p className="text-sm text-muted-foreground">
                    {studentName} now has full access to NEXT_ Billion Lab and can start their AI learning journey.
                  </p>
                </div>

                <Link to="/academy" className="block">
                  <Button className="w-full" size="lg">
                    Learn More About NEXT_
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}

            {/* Expired Actions */}
            {status === "expired" && (
              <div className="space-y-3">
                <p className="text-sm text-center text-muted-foreground">
                  Ask your child to log in and request a new verification email.
                </p>
                <Link to="/login" className="block">
                  <Button variant="outline" className="w-full">
                    Go to Login
                  </Button>
                </Link>
              </div>
            )}

            {/* Error Actions */}
            {status === "error" && (
              <div className="space-y-3">
                <Link to="/" className="block">
                  <Button variant="outline" className="w-full">
                    Go to Homepage
                  </Button>
                </Link>
              </div>
            )}

            {/* Privacy Link */}
            <div className="text-center pt-4 border-t border-border/50">
              <p className="text-xs text-muted-foreground">
                Questions?{" "}
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                {" · "}
                <Link to="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
