import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, Copy, Share2, Globe, School, GraduationCap, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ApplicationData {
  founder_name: string;
  email: string;
  country: string;
  city: string;
  grade: string;
  school_name: string;
  startup_name: string;
}

const RegistrationSuccess = () => {
  const [searchParams] = useSearchParams();
  const applicationId = searchParams.get("id");
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [applicationData, setApplicationData] = useState<ApplicationData | null>(null);

  useEffect(() => {
    const fetchApplicationData = async () => {
      if (!applicationId) return;
      
      const { data, error } = await supabase
        .from('applications')
        .select('founder_name, email, country, city, grade, school_name, startup_name')
        .eq('id', applicationId)
        .single();

      if (!error && data) {
        setApplicationData(data);
      }
    };

    fetchApplicationData();
  }, [applicationId]);

  const copyApplicationId = () => {
    if (applicationId) {
      navigator.clipboard.writeText(applicationId);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Application ID copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareOnTwitter = () => {
    const text = "I just registered for Founders Olympiad 2026! 🚀 Competing with 1M+ student founders worldwide. Join me!";
    const url = "https://foundersolympiad.com/apply";
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold">
            You're Registered! 🎉
          </h1>
          
          <p className="text-xl text-muted-foreground">
            Welcome to Founders Olympiad 2026
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-8 shadow-lg space-y-6">
          {applicationData && (
            <>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-4">Your Registration Details</p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium">{applicationData.founder_name}</p>
                      <p className="text-sm text-muted-foreground">{applicationData.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium">{applicationData.country}</p>
                      <p className="text-sm text-muted-foreground">{applicationData.city}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <GraduationCap className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium">{applicationData.grade}</p>
                      <p className="text-sm text-muted-foreground">{applicationData.school_name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Building2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-sm text-muted-foreground">Venture</p>
                      <p className="font-medium">{applicationData.startup_name}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />
            </>
          )}

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Your Application ID</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-muted px-4 py-3 rounded-md font-mono text-sm break-all">
                {applicationId || "Loading..."}
              </code>
              <Button
                variant="outline"
                size="icon"
                onClick={copyApplicationId}
                disabled={!applicationId}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Save this ID to check your status later
            </p>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="font-medium">Phase 1 Opens: February 15, 2026</p>
                <p className="text-sm text-muted-foreground">
                  We'll email you when it's time to submit your 90-second pitch video
                </p>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <p className="text-sm font-medium mb-2">What happens next?</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Check your email for confirmation</li>
                <li>• Start preparing your pitch (90 seconds max)</li>
                <li>• Join our community for updates and tips</li>
                <li>• Mark Feb 15 on your calendar 📅</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={shareOnTwitter}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share on Twitter
            </Button>
            <Link to="/check-status" className="flex-1">
              <Button variant="secondary" className="w-full">
                Check Status
              </Button>
            </Link>
          </div>

          <Link to="/olympiad" className="block">
            <Button variant="default" className="w-full" size="lg">
              Back to Olympiad
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
