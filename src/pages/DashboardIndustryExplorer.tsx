import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useIndustryCertifications, useIndustryModules, useIndustrySprints } from "@/hooks/useIndustryCertifications";
import { useStudentPricingTier } from "@/hooks/useStudentPricingTier";
import { useAuth } from "@/hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Clock, 
  Target, 
  Briefcase, 
  Building2, 
  Lock,
  CheckCircle2,
  PlayCircle,
  ArrowLeft,
  BookOpen,
  ChevronRight
} from "lucide-react";

// ============================================
// INDUSTRY SPRINT VIEW COMPONENT
// ============================================
interface SprintViewProps {
  moduleId: string;
  moduleName: string;
  onBack: () => void;
}

const IndustrySprintView = ({ moduleId, moduleName, onBack }: SprintViewProps) => {
  const { sprints, loading, completedSprintIds, completeSprint } = useIndustrySprints(moduleId);
  const [currentSprintIndex, setCurrentSprintIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6 space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-64" />
        </div>
      </DashboardLayout>
    );
  }

  if (!sprints.length) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Module
          </Button>
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No sprints found for this module yet.</p>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  const currentSprint = sprints[currentSprintIndex];
  const isCompleted = completedSprintIds.includes(currentSprint.id);
  const quizQuestions = (currentSprint.quiz_questions as any[]) || [];
  const currentQuestion = quizQuestions[0];

  const handleNextSprint = async () => {
    if (!isCompleted) {
      await completeSprint(currentSprint.id, selectedAnswer === currentQuestion?.correctIndex ? 100 : 50);
    }
    
    if (currentSprintIndex < sprints.length - 1) {
      setCurrentSprintIndex(currentSprintIndex + 1);
      setShowQuiz(false);
      setSelectedAnswer(null);
      setQuizSubmitted(false);
    } else {
      onBack();
    }
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Module
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Sprint {currentSprintIndex + 1} of {sprints.length}
            </span>
            <Progress 
              value={((currentSprintIndex + 1) / sprints.length) * 100} 
              className="w-24 h-2" 
            />
          </div>
        </div>

        {/* Sprint Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSprint.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Badge variant="outline">{moduleName}</Badge>
                  <span>•</span>
                  <Clock className="h-3 w-3" />
                  <span>{Math.ceil((currentSprint.estimated_seconds || 60) / 60)} min</span>
                </div>
                <CardTitle className="text-xl">{currentSprint.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Main Content */}
                <div className="prose prose-invert max-w-none">
                  {currentSprint.content.split('\n\n').map((paragraph, i) => {
                    if (paragraph.startsWith('## ')) {
                      return <h2 key={i} className="text-lg font-semibold mt-4 mb-2">{paragraph.slice(3)}</h2>;
                    }
                    if (paragraph.startsWith('### ')) {
                      return <h3 key={i} className="text-base font-medium mt-3 mb-2">{paragraph.slice(4)}</h3>;
                    }
                    if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
                      return (
                        <ul key={i} className="list-disc pl-5 space-y-1">
                          {paragraph.split('\n').map((item, j) => (
                            <li key={j} className="text-muted-foreground">{item.slice(2)}</li>
                          ))}
                        </ul>
                      );
                    }
                    if (paragraph.startsWith('> ')) {
                      return (
                        <blockquote key={i} className="border-l-2 border-primary pl-4 italic text-muted-foreground">
                          {paragraph.slice(2)}
                        </blockquote>
                      );
                    }
                    return <p key={i} className="text-muted-foreground leading-relaxed">{paragraph}</p>;
                  })}
                </div>

                {/* Real World Example */}
                {currentSprint.real_world_example && (
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-primary mb-2">
                      <Building2 className="h-4 w-4" />
                      Real-World Example
                    </div>
                    <p className="text-sm text-muted-foreground">{currentSprint.real_world_example}</p>
                  </div>
                )}

                {/* Quiz Section */}
                {!showQuiz && currentQuestion && (
                  <Button onClick={() => setShowQuiz(true)} className="w-full">
                    Take Quick Check
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                )}

                {showQuiz && currentQuestion && (
                  <div className="border rounded-lg p-4 space-y-4">
                    <h4 className="font-medium">Quick Check</h4>
                    <p className="text-muted-foreground">{currentQuestion.question}</p>
                    <div className="grid gap-2">
                      {currentQuestion.options?.map((option: string, i: number) => (
                        <button
                          key={i}
                          onClick={() => !quizSubmitted && setSelectedAnswer(i)}
                          disabled={quizSubmitted}
                          className={`text-left p-3 rounded-lg border transition-all ${
                            selectedAnswer === i 
                              ? quizSubmitted
                                ? i === currentQuestion.correctIndex
                                  ? 'bg-green-500/10 border-green-500'
                                  : 'bg-red-500/10 border-red-500'
                                : 'bg-primary/10 border-primary'
                              : quizSubmitted && i === currentQuestion.correctIndex
                                ? 'bg-green-500/10 border-green-500'
                                : 'hover:bg-muted/50'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    
                    {selectedAnswer !== null && !quizSubmitted && (
                      <Button onClick={handleQuizSubmit} className="w-full">
                        Submit Answer
                      </Button>
                    )}
                    
                    {quizSubmitted && (
                      <div className={`p-3 rounded-lg ${
                        selectedAnswer === currentQuestion.correctIndex 
                          ? 'bg-green-500/10 text-green-500' 
                          : 'bg-amber-500/10 text-amber-500'
                      }`}>
                        {selectedAnswer === currentQuestion.correctIndex 
                          ? '✓ Correct! Great job!' 
                          : `The correct answer was: ${currentQuestion.options[currentQuestion.correctIndex]}`
                        }
                      </div>
                    )}
                  </div>
                )}

                {/* Reflection Prompt */}
                {currentSprint.reflection_prompt && (
                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-sm font-medium mb-2">
                      💭 Think About It
                    </div>
                    <p className="text-sm text-muted-foreground italic">{currentSprint.reflection_prompt}</p>
                  </div>
                )}

                {/* Continue Button */}
                {(!currentQuestion || quizSubmitted) && (
                  <Button onClick={handleNextSprint} className="w-full" size="lg">
                    {currentSprintIndex < sprints.length - 1 ? 'Continue to Next Sprint' : 'Complete Module'}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
};

// ============================================
// INDUSTRY TRACK DETAIL COMPONENT
// ============================================
interface TrackDetailProps {
  slug: string;
  hasAccess: boolean;
}

const IndustryTrackDetail = ({ slug, hasAccess }: TrackDetailProps) => {
  const navigate = useNavigate();
  const { certifications, loading: certLoading, getProgressForCertification } = useIndustryCertifications();
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [selectedModuleName, setSelectedModuleName] = useState<string>('');

  // Debug logging for troubleshooting
  console.log('[IndustryTrackDetail] slug:', slug);
  console.log('[IndustryTrackDetail] certifications:', certifications);
  
  const certification = certifications.find(c => c.slug === slug);
  console.log('[IndustryTrackDetail] matched certification:', certification);
  
  const { modules, loading: modulesLoading } = useIndustryModules(certification?.id || '');
  console.log('[IndustryTrackDetail] modules:', modules, 'loading:', modulesLoading);

  if (certLoading || modulesLoading) {
    return (
      <DashboardLayout>
        <div className="p-6 space-y-4">
          <Skeleton className="h-8 w-48" />
          <p className="text-sm text-muted-foreground">Loading track content...</p>
          <div className="grid gap-4">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-32" />)}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!certification) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <Button variant="ghost" onClick={() => navigate('/dashboard/industry')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Explorer
          </Button>
          <Card className="p-8 text-center mt-4">
            <p className="text-muted-foreground mb-2">Industry track not found.</p>
            <p className="text-xs text-muted-foreground">
              Looking for slug: "{slug}" | Available: {certifications.map(c => c.slug).join(', ') || 'none'}
            </p>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  // If a module is selected, show sprint view
  if (selectedModuleId) {
    return (
      <IndustrySprintView 
        moduleId={selectedModuleId} 
        moduleName={selectedModuleName}
        onBack={() => setSelectedModuleId(null)} 
      />
    );
  }

  const certProgress = getProgressForCertification(certification.id);
  const progressPercent = certProgress 
    ? Math.round((certProgress.sprints_completed / (certification.modules_count * 5)) * 100) 
    : 0;

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      rose: { bg: 'bg-rose-500/10', text: 'text-rose-500', border: 'border-rose-500/30' },
      green: { bg: 'bg-green-500/10', text: 'text-green-500', border: 'border-green-500/30' },
      blue: { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/30' },
      purple: { bg: 'bg-purple-500/10', text: 'text-purple-500', border: 'border-purple-500/30' },
      orange: { bg: 'bg-orange-500/10', text: 'text-orange-500', border: 'border-orange-500/30' },
    };
    return colors[color] || colors.blue;
  };

  const colors = getColorClasses(certification.color_theme);

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 max-w-4xl mx-auto">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate('/dashboard/industry')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Industry Explorer
        </Button>

        {/* Track Header */}
        <Card className={`${colors.bg} border ${colors.border}`}>
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="text-5xl">{certification.icon}</div>
              <div className="flex-1">
                <CardTitle className="text-2xl">{certification.name}</CardTitle>
                <CardDescription className="mt-2">{certification.description}</CardDescription>
                <div className="flex flex-wrap gap-4 mt-4 text-sm">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{certification.modules_count} modules</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{certification.estimated_hours} hours</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="h-4 w-4" />
                    <span>{progressPercent}% complete</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Modules List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Modules</h2>
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card 
                className="hover:shadow-md transition-all cursor-pointer"
                onClick={() => {
                  setSelectedModuleId(module.id);
                  setSelectedModuleName(module.title);
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${colors.bg} ${colors.text}`}>
                        {module.module_number}
                      </div>
                      <div>
                        <h3 className="font-medium">{module.title}</h3>
                        <p className="text-sm text-muted-foreground">{module.description}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                          <span>{module.sprints_count} sprints</span>
                          <span>•</span>
                          <span>{module.estimated_minutes} min</span>
                          {module.case_study_company && (
                            <>
                              <span>•</span>
                              <span>Case: {module.case_study_company}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {modules.length === 0 && (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No modules found for this track yet.</p>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

// ============================================
// MAIN INDUSTRY EXPLORER COMPONENT
// ============================================
const IndustryExplorer = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { certifications, progress, loading, startCertification, getProgressForCertification } = useIndustryCertifications();
  const { canAccess, tier, isLoading: tierLoading } = useStudentPricingTier();
  
  // Admin bypass for testing
  const isAdmin = user?.email?.includes('@nextbillionlab.com') || user?.email?.includes('@lovable.dev');
  
  // Check if user has access to industry tracks (FULL FOUNDATION or higher, or admin)
  const hasAccess = isAdmin || (canAccess('curriculum_access') && tier?.features?.curriculum_access === 'full');

  // If we have a slug, show the track detail view
  if (slug) {
    return <IndustryTrackDetail slug={slug} hasAccess={hasAccess} />;
  }

  const handleStartCertification = async (certId: string, certSlug: string) => {
    if (!hasAccess) {
      navigate('/pricing');
      return;
    }
    
    const existingProgress = getProgressForCertification(certId);
    if (!existingProgress) {
      await startCertification(certId);
    }
    navigate(`/dashboard/industry/${certSlug}`);
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      rose: { bg: 'bg-rose-500/10', text: 'text-rose-500', border: 'border-rose-500/30' },
      green: { bg: 'bg-green-500/10', text: 'text-green-500', border: 'border-green-500/30' },
      blue: { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/30' },
      purple: { bg: 'bg-purple-500/10', text: 'text-purple-500', border: 'border-purple-500/30' },
      orange: { bg: 'bg-orange-500/10', text: 'text-orange-500', border: 'border-orange-500/30' },
    };
    return colors[color] || colors.blue;
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6 space-y-6">
          <Skeleton className="h-10 w-64" />
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2].map(i => (
              <Skeleton key={i} className="h-80" />
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Industry Explorer</h1>
          <p className="text-muted-foreground">
            Dive deep into specific industries and discover how AI is transforming them. 
            Each track includes 6 modules with real-world case studies.
          </p>
        </div>

        {/* Admin Bypass Notice */}
        {isAdmin && (
          <Card className="border-green-500/30 bg-green-500/5">
            <CardContent className="flex items-center gap-3 py-3">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <p className="text-sm text-green-500">Admin access enabled — all content unlocked for testing</p>
            </CardContent>
          </Card>
        )}

        {/* Access Banner */}
        {!hasAccess && (
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Upgrade to unlock Industry Explorer</p>
                  <p className="text-sm text-muted-foreground">
                    FULL FOUNDATION and ACCELERATOR tiers include industry certifications
                  </p>
                </div>
              </div>
              <Button onClick={() => navigate('/pricing')}>
                Upgrade Now
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Certification Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => {
            const certProgress = getProgressForCertification(cert.id);
            const colors = getColorClasses(cert.color_theme);
            const progressPercent = certProgress 
              ? Math.round((certProgress.sprints_completed / (cert.modules_count * 5)) * 100) 
              : 0;
            const isCompleted = certProgress?.completed_at !== null;
            const isStarted = !!certProgress;

            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`h-full hover:shadow-lg transition-all ${!hasAccess ? 'opacity-60' : ''}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className={`text-4xl p-3 rounded-xl ${colors.bg}`}>
                        {cert.icon}
                      </div>
                      {isCompleted ? (
                        <Badge className="bg-green-500/10 text-green-500 border-green-500/30">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                      ) : isStarted ? (
                        <Badge variant="outline" className={colors.border}>
                          In Progress
                        </Badge>
                      ) : null}
                    </div>
                    <CardTitle className="text-xl mt-4">{cert.name}</CardTitle>
                    <CardDescription>{cert.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Stats */}
                    <div className="flex flex-wrap gap-3 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Target className="h-4 w-4" />
                        <span>{cert.modules_count} modules</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{cert.estimated_hours}h</span>
                      </div>
                    </div>

                    {/* Progress */}
                    {isStarted && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{progressPercent}%</span>
                        </div>
                        <Progress value={progressPercent} className="h-2" />
                      </div>
                    )}

                    {/* Skills */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-1 text-sm font-medium">
                        <Briefcase className="h-4 w-4" />
                        <span>Skills you'll develop</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {cert.skill_focus_areas.slice(0, 3).map(skill => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {cert.skill_focus_areas.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{cert.skill_focus_areas.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Companies */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-1 text-sm font-medium">
                        <Building2 className="h-4 w-4" />
                        <span>Real-world examples</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {cert.real_world_companies.slice(0, 3).join(', ')}
                        {cert.real_world_companies.length > 3 && ` + ${cert.real_world_companies.length - 3} more`}
                      </p>
                    </div>

                    {/* CTA */}
                    <Button 
                      className="w-full mt-4" 
                      variant={hasAccess ? "default" : "outline"}
                      onClick={() => handleStartCertification(cert.id, cert.slug)}
                    >
                      {!hasAccess ? (
                        <>
                          <Lock className="h-4 w-4 mr-2" />
                          Upgrade to Access
                        </>
                      ) : isStarted ? (
                        <>
                          <PlayCircle className="h-4 w-4 mr-2" />
                          Continue Learning
                        </>
                      ) : (
                        <>
                          Start Exploring
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Coming Soon */}
        <div className="text-center py-8 border-t">
          <p className="text-muted-foreground mb-2">More industry tracks coming soon</p>
          <div className="flex justify-center gap-2 flex-wrap">
            {['AI + Fashion', 'AI + Gaming', 'AI + Finance', 'AI + Education'].map(track => (
              <Badge key={track} variant="outline" className="opacity-50">
                {track}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default IndustryExplorer;