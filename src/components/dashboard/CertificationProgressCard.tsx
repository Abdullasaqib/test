import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Award, Sparkles, ArrowRight, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useDemoMode } from "@/contexts/DemoContext";
import { DemoActionBlocker } from "@/components/demo/DemoActionBlocker";

interface CertificationProgressCardProps {
  lessonsCompleted: number;
  totalLessons: number;
  isEnrolled: boolean;
  isCompleted: boolean;
  certificationName?: string;
}

export function CertificationProgressCard({
  lessonsCompleted,
  totalLessons,
  isEnrolled,
  isCompleted,
  certificationName = "AI Foundations Certificate"
}: CertificationProgressCardProps) {
  const { isDemoMode } = useDemoMode();
  const progress = totalLessons > 0 ? (lessonsCompleted / totalLessons) * 100 : 0;

  // Demo mode CTA wrapper
  const DemoCTAWrapper = ({ children, action }: { children: React.ReactNode; action: string }) => {
    if (isDemoMode) {
      return <DemoActionBlocker action={action}>{children}</DemoActionBlocker>;
    }
    return <>{children}</>;
  };

  if (isCompleted) {
    return (
      <Card className="border-primary/30 bg-gradient-to-br from-primary/10 via-purple-500/10 to-amber-500/10 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-20 h-20 md:w-32 md:h-32 bg-gradient-to-br from-amber-400/20 to-amber-600/20 rounded-full blur-3xl pointer-events-none" />
        <CardHeader className="pb-3 relative z-10">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <Badge variant="secondary" className="bg-amber-500/20 text-amber-600 border-amber-500/30 gap-1">
              <Award className="h-3 w-3" />
              NEXT_ CERTIFIED
            </Badge>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-primary text-xs h-8"
              onClick={() => {
                const shareUrl = encodeURIComponent(window.location.origin);
                const title = encodeURIComponent("I just earned my NEXT_ CERTIFIED credential! 🎉");
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}&title=${title}`, '_blank');
              }}
            >
              <Share2 className="h-3.5 w-3.5 mr-1" />
              Share
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 md:h-14 md:w-14 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg flex-shrink-0">
              <Award className="h-6 w-6 md:h-7 md:w-7 text-white" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-base md:text-lg text-foreground">Ready for What's NEXT_ 🎉</h3>
              <p className="text-sm text-muted-foreground truncate">{certificationName}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            You've proven you can adapt to whatever comes next. Now unlock the full founder journey.
          </p>
          <DemoCTAWrapper action="view pricing options">
            <Link to="/pricing">
              <Button className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
                Build What's NEXT_
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </DemoCTAWrapper>
        </CardContent>
      </Card>
    );
  }

  if (isEnrolled) {
    return (
      <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-purple-500/5 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-full blur-2xl pointer-events-none" />
        <CardHeader className="pb-3 relative z-10">
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-base md:text-lg flex items-center gap-2 min-w-0">
              <Award className="h-5 w-5 text-primary flex-shrink-0" />
              <span className="truncate">Your NEXT_ Credential</span>
            </CardTitle>
            <Badge variant="outline" className="text-xs flex-shrink-0">
              {lessonsCompleted}/{totalLessons}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 relative z-10">
          <div>
            <p className="text-sm text-muted-foreground mb-2 truncate">{certificationName}</p>
            <Progress value={progress} className="h-2" />
          </div>
          <DemoCTAWrapper action="continue learning">
            <Link to="/dashboard/certification/prompt-engineering-fundamentals">
              <Button className="w-full" variant="default">
                Continue Learning
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </DemoCTAWrapper>
        </CardContent>
      </Card>
    );
  }

  // Not enrolled yet - show invitation
  return (
    <Card className="border-primary/30 bg-gradient-to-br from-primary/5 via-purple-500/5 to-amber-500/5 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-20 h-20 md:w-32 md:h-32 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <CardHeader className="pb-3 relative z-10">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary flex-shrink-0" />
          <CardTitle className="text-base md:text-lg truncate">Become NEXT_ CERTIFIED</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 relative z-10">
        <p className="text-sm text-muted-foreground">
          Prove you're ready for a future that doesn't exist yet. Earn a credential that proves you can build whatever comes NEXT_
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Award className="h-4 w-4 text-amber-500 flex-shrink-0" />
          <span>6 lessons • ~3 hours • Share on LinkedIn</span>
        </div>
        <DemoCTAWrapper action="start certification">
          <Link to="/dashboard/certification">
            <Button className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
              Start Building What's NEXT_
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </DemoCTAWrapper>
      </CardContent>
    </Card>
  );
}
