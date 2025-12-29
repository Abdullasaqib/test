import { DemoLayout } from "@/components/demo/DemoLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Award, CheckCircle2, Lock, Sparkles, BookOpen, Zap, Target } from "lucide-react";
import { DEMO_CERTIFICATION_PROGRESS } from "@/data/demoData";

const certificates = [
  {
    slug: "ai-foundations",
    name: "AI Foundations",
    tagline: "Start Your AI Journey",
    lessons: 10,
    isFree: true,
    completed: 5,
  },
  {
    slug: "vibe-coding-essentials",
    name: "Vibe Coding Essentials",
    tagline: "Build Without Traditional Code",
    lessons: 8,
    isFree: false,
    completed: 2,
  },
  {
    slug: "ai-builder",
    name: "AI Builder",
    tagline: "12-Week Founder Journey",
    lessons: 24,
    isFree: false,
    completed: 0,
  },
  {
    slug: "ai-launcher",
    name: "AI Launcher",
    tagline: "Live Cohort with Mentors",
    lessons: 12,
    isFree: false,
    completed: 0,
    isLive: true,
  },
];

export default function DemoCertification() {
  return (
    <DemoLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Award className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Pick Your Certificate</h1>
          </div>
          <p className="text-muted-foreground">
            Start free with AI Foundations, then level up
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Your Overall Progress</span>
              <span className="text-sm text-muted-foreground">
                {DEMO_CERTIFICATION_PROGRESS.completedLessons}/{DEMO_CERTIFICATION_PROGRESS.totalLessons} lessons
              </span>
            </div>
            <Progress 
              value={(DEMO_CERTIFICATION_PROGRESS.completedLessons / DEMO_CERTIFICATION_PROGRESS.totalLessons) * 100} 
              className="h-2"
            />
          </CardContent>
        </Card>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certificates.map((cert) => {
            const progress = cert.lessons > 0 ? (cert.completed / cert.lessons) * 100 : 0;
            const isCompleted = cert.completed === cert.lessons && cert.lessons > 0;
            
            return (
              <Card 
                key={cert.slug} 
                className={`relative overflow-hidden transition-all hover:border-primary/50 ${
                  isCompleted ? 'border-green-500/50 bg-green-500/5' : ''
                }`}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {cert.name}
                        {cert.isFree && (
                          <Badge variant="secondary" className="text-xs">FREE</Badge>
                        )}
                        {cert.isLive && (
                          <Badge className="text-xs bg-purple-500/20 text-purple-400 border-purple-500/30">
                            LIVE
                          </Badge>
                        )}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {cert.tagline}
                      </p>
                    </div>
                    {isCompleted ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : cert.completed > 0 ? (
                      <Sparkles className="h-5 w-5 text-primary" />
                    ) : !cert.isFree ? (
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    ) : null}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      {cert.lessons} lessons
                    </span>
                    {cert.completed > 0 && (
                      <span className="flex items-center gap-1 text-primary">
                        <Zap className="h-4 w-4" />
                        {cert.completed} done
                      </span>
                    )}
                  </div>
                  
                  {cert.completed > 0 && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-1.5" />
                    </div>
                  )}
                  
                  <Button 
                    className="w-full mt-2" 
                    variant={cert.completed > 0 ? "default" : "outline"}
                    size="sm"
                  >
                    {isCompleted ? (
                      <>
                        <Award className="h-4 w-4 mr-2" />
                        View Certificate
                      </>
                    ) : cert.completed > 0 ? (
                      <>
                        <Target className="h-4 w-4 mr-2" />
                        Continue Learning
                      </>
                    ) : (
                      <>
                        <BookOpen className="h-4 w-4 mr-2" />
                        Start Certificate
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Info Banner */}
        <Card className="bg-muted/30 border-dashed">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Demo Mode:</span> This is a preview of the certification dashboard. 
              <Button variant="link" className="p-0 h-auto text-primary ml-1">
                Sign up
              </Button>
              {" "}to track your real progress.
            </p>
          </CardContent>
        </Card>
      </div>
    </DemoLayout>
  );
}
