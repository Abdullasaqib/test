import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft, Mail, CheckCircle } from "lucide-react";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
});

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");
  
  const { resetPassword } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = forgotPasswordSchema.safeParse({ email });
      if (!result.success) {
        setError(result.error.errors[0]?.message || "Invalid email");
        setLoading(false);
        return;
      }

      const { error: resetError } = await resetPassword(email);
      
      if (resetError) {
        // Supabase returns success even for non-existent emails (security best practice)
        // Only show errors for actual issues
        if (resetError.message.includes("rate limit")) {
          toast({
            title: "Too many requests",
            description: "Please wait a few minutes before trying again.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: resetError.message,
            variant: "destructive",
          });
        }
        setLoading(false);
        return;
      }

      setEmailSent(true);
      toast({
        title: "Email sent!",
        description: "Check your inbox for the password reset link.",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col">
      {/* Header */}
      <header className="p-4">
        <Link 
          to="/login" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-border/50 shadow-xl">
          {emailSent ? (
            <>
              <CardHeader className="text-center space-y-2">
                <div className="mx-auto w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-2">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
                <CardDescription>
                  We've sent a password reset link to <span className="font-medium text-foreground">{email}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  Click the link in the email to reset your password. The link will expire in 24 hours.
                </p>
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-left">
                  <p className="text-sm text-amber-600 dark:text-amber-400 font-medium mb-1">
                    Email may take a few minutes
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Check your spam/junk folder if you don't see it in your inbox.
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Didn't receive the email?{" "}
                  <button
                    type="button"
                    onClick={() => setEmailSent(false)}
                    className="text-primary hover:underline font-medium"
                  >
                    try again
                  </button>
                  {" "}or{" "}
                  <a
                    href="mailto:support@nextbillionlab.com?subject=Password%20Reset%20Help"
                    className="text-primary hover:underline font-medium"
                  >
                    contact support
                  </a>
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/login" className="w-full">
                  <Button variant="outline" className="w-full">
                    Return to Login
                  </Button>
                </Link>
              </CardFooter>
            </>
          ) : (
            <>
              <CardHeader className="text-center space-y-2">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-2">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold">Forgot Password?</CardTitle>
                <CardDescription>
                  Enter your email and we'll send you a link to reset your password
                </CardDescription>
              </CardHeader>

              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      disabled={loading}
                      autoFocus
                    />
                    {error && (
                      <p className="text-sm text-destructive">{error}</p>
                    )}
                  </div>
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
                        Sending...
                      </>
                    ) : (
                      "Send Reset Email"
                    )}
                  </Button>

                  <div className="text-center text-sm text-muted-foreground">
                    Remember your password?{" "}
                    <Link to="/login" className="text-primary hover:underline font-medium">
                      Sign in
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </>
          )}
        </Card>
      </main>
    </div>
  );
}
