import { ProLayout } from "@/components/pro/ProLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Award, 
  Lock,
  CheckCircle2,
  Linkedin,
  Download,
  BookOpen,
  Target,
  Zap,
} from "lucide-react";

const requirements = [
  { name: "Complete 8-Week Curriculum", description: "40 missions across all phases", progress: 1, total: 40, icon: BookOpen },
  { name: "Pass All Quizzes", description: "Score 70%+ on each phase quiz", progress: 0, total: 5, icon: CheckCircle2 },
  { name: "Complete 20 Sprints", description: "Daily founder simulations", progress: 0, total: 20, icon: Zap },
  { name: "3 Tank Pitches", description: "Practice with AI investors", progress: 0, total: 3, icon: Target },
];

export default function ProCertificate() {
  const totalProgress = requirements.reduce((acc, req) => acc + req.progress, 0);
  const totalRequired = requirements.reduce((acc, req) => acc + req.total, 0);
  const overallProgress = Math.round((totalProgress / totalRequired) * 100);

  return (
    <ProLayout>
      <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">AI Builder Pro Certificate</h1>
              <p className="text-white/60">Level 5 Professional Credential</p>
            </div>
          </div>
        </div>

        {/* Certificate Preview */}
        <Card className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 border-amber-500/30 overflow-hidden">
          <CardContent className="p-0">
            <div className="relative">
              {/* Certificate locked overlay */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                <Lock className="w-16 h-16 text-white/40 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Certificate Locked</h3>
                <p className="text-white/60 text-center max-w-sm">
                  Complete all requirements below to unlock your AI Builder Pro Certificate
                </p>
              </div>
              
              {/* Certificate design preview */}
              <div className="p-12 text-center opacity-50">
                <div className="border-4 border-amber-500/30 rounded-lg p-8">
                  <Award className="w-20 h-20 text-amber-400 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-white mb-2">AI Builder Pro</h2>
                  <p className="text-amber-400 text-lg mb-4">Certificate of Completion</p>
                  <p className="text-white/60">This certifies that</p>
                  <p className="text-2xl font-bold text-white my-2">[Your Name]</p>
                  <p className="text-white/60">
                    has successfully completed the Professional Builder Program
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Overview */}
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Overall Progress</CardTitle>
            <CardDescription className="text-white/60">
              {overallProgress}% complete — {totalRequired - totalProgress} tasks remaining
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={overallProgress} className="h-3 mb-2" />
            <p className="text-sm text-white/40">
              {totalProgress} of {totalRequired} requirements completed
            </p>
          </CardContent>
        </Card>

        {/* Requirements */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Certificate Requirements</h2>
          <div className="grid gap-4">
            {requirements.map((req, index) => {
              const isComplete = req.progress >= req.total;
              const progressPercent = (req.progress / req.total) * 100;
              
              return (
                <Card 
                  key={index} 
                  className={`border transition-colors ${
                    isComplete 
                      ? "bg-emerald-500/5 border-emerald-500/30" 
                      : "bg-white/5 border-white/10"
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isComplete ? "bg-emerald-500/20" : "bg-white/10"
                      }`}>
                        {isComplete ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                        ) : (
                          <req.icon className="w-6 h-6 text-white/40" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-semibold ${isComplete ? "text-emerald-400" : "text-white"}`}>
                            {req.name}
                          </h3>
                          {isComplete && (
                            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                              Complete
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-white/60 mb-2">{req.description}</p>
                        <div className="flex items-center gap-3">
                          <Progress value={progressPercent} className="flex-1 h-2" />
                          <span className="text-sm text-white/40 whitespace-nowrap">
                            {req.progress}/{req.total}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Actions (disabled) */}
        <div className="flex flex-wrap gap-4">
          <Button disabled className="bg-white/10 text-white/40">
            <Linkedin className="w-4 h-4 mr-2" />
            Share on LinkedIn
          </Button>
          <Button disabled variant="outline" className="border-white/10 text-white/40">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>
    </ProLayout>
  );
}
