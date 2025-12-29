import { useEffect, useState } from "react";
import { CertificateUpgradeModal } from "@/components/certification/CertificateUpgradeModal";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useCertification } from "@/hooks/useCertification";
import { useCertificationProgress } from "@/hooks/useCertificationProgress";
import { useStudent } from "@/hooks/useStudent";
import { useStudentPricingTier } from "@/hooks/useStudentPricingTier";
import { LessonContent } from "@/components/certification/LessonContent";
import { CertificateGenerator } from "@/components/certification/CertificateGenerator";
import { CurriculumOverviewPanel } from "@/components/certification/CurriculumOverviewPanel";
import { CertificationHero } from "@/components/certification/CertificationHero";
import { LearningPathTimeline } from "@/components/certification/LearningPathTimeline";
import { AllSummaryCardsDownload } from "@/components/certification/LessonSummaryCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { supabase } from "@/integrations/supabase/client";
import { 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  ArrowLeft,
  Play,
  Lock,
  GraduationCap,
  Wrench,
  Zap,
  ArrowRight,
  Target,
  Users,
  AlertCircle,
  RefreshCw,
  Code2,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";

// Type for lesson preview data
interface LessonPreview {
  id: string;
  title: string;
  estimated_minutes: number | null;
  lesson_order: number;
  certification_id: string;
}

// Certificate definitions
const certificates = [
  {
    id: "ai-foundations",
    slug: "prompt-engineering-fundamentals",
    name: "AI Foundations Certificate",
    icon: GraduationCap,
    duration: "6 lessons • ~4 hours",
    description: "Master AI prompt engineering basics. Learn to communicate effectively with AI tools.",
    color: "primary",
    tierRequired: null,
    skills: ["Prompt Engineering", "AI Communication", "Output Optimization"],
  },
  {
    id: "vibe-coding",
    slug: "vibe-coding-essentials",
    name: "Vibe Coding Essentials",
    icon: Code2,
    duration: "4 lessons • ~1.5 hours",
    description: "Master the art of building apps through conversation with AI. Learn the prompt cycle and ship your first working app.",
    color: "purple",
    tierRequired: "builder",
    skills: ["Prompt Cycle", "AI-Assisted Building", "Shipping Apps"],
  },
  {
    id: "ai-builder",
    slug: "ai-founders-certificate",
    name: "AI Builder Certificate",
    icon: Wrench,
    duration: "12 weeks • Build a product",
    description: "Complete the full founder journey. Discover problems, build solutions, and launch your product.",
    color: "accent",
    tierRequired: "full",
    skills: ["Product Development", "Customer Research", "MVP Building", "Growth Hacking"],
  },
  {
    id: "ai-launcher",
    slug: "ai-launcher",
    name: "AI Launcher Certificate",
    icon: Zap,
    duration: "Live cohort • Demo Day",
    description: "Present to real investors at Demo Day. Get mentorship and launch with your cohort.",
    color: "yellow",
    tierRequired: "accelerator",
    skills: ["Investor Pitching", "Public Speaking", "Startup Fundraising"],
  },
];

export default function DashboardCertification() {
  const { slug, lessonId } = useParams<{ slug?: string; lessonId?: string }>();
  const navigate = useNavigate();
  const { student } = useStudent();
  const { canAccess, tier } = useStudentPricingTier();
  const {
    certifications,
    currentCertification,
    lessons,
    enrollment,
    progress,
    loading,
    error,
    refetch,
    enrollInCertification,
    completeLesson,
    completeCertification,
    getCompletedLessonsCount,
    isLessonCompleted,
  } = useCertification(slug);
  
  const { getProgress, loading: progressLoading } = useCertificationProgress();

  const [currentLessonIndex, setCurrentLessonIndex] = useState<number | null>(null);
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [selectedLockedCert, setSelectedLockedCert] = useState<typeof certificates[0] | null>(null);

  // State for lesson previews by certification ID
  const [lessonPreviews, setLessonPreviews] = useState<Record<string, LessonPreview[]>>({});
  const [previewsLoading, setPreviewsLoading] = useState(true);

  // Check tier access
  const hasAIBuilder = canAccess('curriculum_access') && tier?.features?.curriculum_access === 'full';
  const hasAILauncher = canAccess('live_classes');

  const canAccessCertificate = (tierRequired: string | null) => {
    if (!tierRequired) return true;
    if (tierRequired === 'full') return hasAIBuilder;
    if (tierRequired === 'accelerator') return hasAILauncher;
    return false;
  };

  // Fetch lesson previews for all certifications
  useEffect(() => {
    const fetchLessonPreviews = async () => {
      try {
        const { data, error } = await supabase
          .from('certification_lessons')
          .select('id, title, estimated_minutes, lesson_order, certification_id')
          .order('lesson_order');

        if (error) throw error;

        // Group lessons by certification_id
        const grouped: Record<string, LessonPreview[]> = {};
        data?.forEach(lesson => {
          if (!grouped[lesson.certification_id]) {
            grouped[lesson.certification_id] = [];
          }
          grouped[lesson.certification_id].push(lesson);
        });
        setLessonPreviews(grouped);
      } catch (err) {
        console.error('Failed to fetch lesson previews:', err);
      } finally {
        setPreviewsLoading(false);
      }
    };

    fetchLessonPreviews();
  }, []);

  useEffect(() => {
    if (lessonId && lessons.length > 0) {
      const index = lessons.findIndex(l => l.id === lessonId);
      if (index !== -1) setCurrentLessonIndex(index);
    } else {
      setCurrentLessonIndex(null);
    }
  }, [lessonId, lessons]);

  const handleEnroll = async () => {
    if (!currentCertification) return;
    try {
      await enrollInCertification(currentCertification.id);
      toast.success("You're enrolled! Let's start learning.");
    } catch (error) {
      toast.error("Failed to enroll. Please try again.");
    }
  };

  const handleCompleteLesson = async (quizScore?: number) => {
    if (currentLessonIndex === null) return;
    const lesson = lessons[currentLessonIndex];
    try {
      await completeLesson(lesson.id, quizScore);
      toast.success("Lesson completed! 🎉");
    } catch (error) {
      toast.error("Failed to save progress.");
    }
  };

  const handleNextLesson = () => {
    if (currentLessonIndex === null) return;
    
    if (currentLessonIndex === lessons.length - 1) {
      handleCompleteCertification();
    } else {
      const nextLesson = lessons[currentLessonIndex + 1];
      navigate(`/dashboard/certification/${slug}/lesson/${nextLesson.id}`);
    }
  };

  const handleCompleteCertification = async () => {
    try {
      const certNumber = await completeCertification();
      if (certNumber) {
        toast.success("Congratulations! You've completed the certification! 🎓");
        navigate(`/dashboard/certification/${slug}`);
      }
    } catch (error) {
      toast.error("Failed to complete certification.");
    }
  };

  const handleLessonClick = (lessonId: string, index: number) => {
    if (!enrollment && index === 0) {
      handleEnroll().then(() => {
        navigate(`/dashboard/certification/${slug}/lesson/${lessonId}`);
      });
    } else {
      navigate(`/dashboard/certification/${slug}/lesson/${lessonId}`);
    }
  };

  const completedCount = getCompletedLessonsCount();
  const progressPercent = lessons.length > 0 ? (completedCount / lessons.length) * 100 : 0;
  const isCompleted = enrollment?.completed_at !== null && enrollment?.completed_at !== undefined;
  const completedLessonIds = progress.map(p => p.lesson_id);

  // Error state - show friendly error with retry
  if (error) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-destructive" />
          <div>
            <h2 className="text-xl font-semibold">Failed to Load Certifications</h2>
            <p className="text-muted-foreground mt-1">{error.message}</p>
          </div>
          <Button onClick={refetch} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  // Not logged in state (if trying to access specific certification)
  if (slug && !student && !loading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
          <Lock className="h-12 w-12 text-muted-foreground" />
          <div>
            <h2 className="text-xl font-semibold">Sign In Required</h2>
            <p className="text-muted-foreground mt-1">Please log in to view your certification progress.</p>
          </div>
          <Button onClick={() => navigate("/login")} className="gap-2">
            Sign In
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  // Certification not found
  if (slug && !loading && !currentCertification) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-muted-foreground" />
          <div>
            <h2 className="text-xl font-semibold">Certification Not Found</h2>
            <p className="text-muted-foreground mt-1">The certification "{slug}" doesn't exist or is no longer available.</p>
          </div>
          <Button onClick={() => navigate("/dashboard/certification")} variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Certifications
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  // Loading state - with better skeleton
  if (loading || progressLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <Skeleton className="h-48 w-full rounded-2xl" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-64 rounded-xl" />
            <Skeleton className="h-64 rounded-xl" />
            <Skeleton className="h-64 rounded-xl" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Viewing a specific lesson
  if (slug && currentLessonIndex !== null && lessons[currentLessonIndex]) {
    const lesson = lessons[currentLessonIndex];
    return (
      <DashboardLayout>
        <LessonContent
          lesson={lesson}
          isCompleted={isLessonCompleted(lesson.id)}
          onComplete={handleCompleteLesson}
          onBack={() => navigate(`/dashboard/certification/${slug}`)}
          onNext={handleNextLesson}
          isLast={currentLessonIndex === lessons.length - 1}
          lessonOrder={currentLessonIndex + 1}
          totalLessons={lessons.length}
          certificationName={currentCertification?.name || "Certification"}
        />
      </DashboardLayout>
    );
  }

  // Viewing a specific certification detail - WORLD CLASS UI
  if (slug && currentCertification) {
    // Get the first incomplete lesson for continue functionality
    const nextLessonIndex = lessons.findIndex(l => !isLessonCompleted(l.id));
    const nextLesson = nextLessonIndex !== -1 ? lessons[nextLessonIndex] : lessons[0];

    return (
      <DashboardLayout>
        <div className="space-y-8">
          {/* Back Navigation */}
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard/certification")} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            All Certificates
          </Button>

          {/* Hero Section */}
          <CertificationHero
            name={currentCertification.name}
            description={currentCertification.description || undefined}
            lessonsCount={currentCertification.lessons_count || lessons.length}
            estimatedHours={currentCertification.estimated_hours ? Number(currentCertification.estimated_hours) : undefined}
            isEnrolled={!!enrollment}
            isCompleted={isCompleted}
            completedLessons={completedCount}
            ageRange={slug === 'ai-launcher' ? "Ages 12-18" : "Ages 9-16"}
            onEnroll={handleEnroll}
            onContinue={() => nextLesson && navigate(`/dashboard/certification/${slug}/lesson/${nextLesson.id}`)}
            onViewCertificate={() => document.getElementById('certificate-section')?.scrollIntoView({ behavior: 'smooth' })}
          />

          {/* Certificate View (if completed) */}
          {isCompleted && enrollment?.certificate_number && (
            <div id="certificate-section" className="space-y-4">
              <CertificateGenerator
                studentName={student?.full_name || "Student"}
                certificationName={currentCertification.name}
                certificateNumber={enrollment.certificate_number}
                completedAt={enrollment.completed_at!}
              />
              
              {/* Download All Summary Cards */}
              {slug === 'prompt-engineering-fundamentals' && (
                <Card className="border-border/50 bg-card/50">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Lesson Summary Cards</h4>
                      <p className="text-sm text-muted-foreground">
                        Download all 6 printable summary cards as a PDF
                      </p>
                    </div>
                    <AllSummaryCardsDownload />
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Skills You'll Gain */}
          <Card className="border-border/50 bg-card/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Skills You'll Gain
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {certificates.find(c => c.slug === slug)?.skills?.map((skill, i) => (
                  <Badge key={i} variant="secondary" className="px-3 py-1.5">
                    <Zap className="h-3 w-3 mr-1.5 text-amber-500" />
                    {skill}
                  </Badge>
                ))}
                <Badge variant="outline" className="px-3 py-1.5 text-muted-foreground">
                  <Award className="h-3 w-3 mr-1.5" />
                  LinkedIn-shareable credential
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Full Curriculum Overview - THE KEY FEATURE */}
          {!isCompleted && (
            <CurriculumOverviewPanel
              lessons={lessons.map(l => ({
                id: l.id,
                title: l.title,
                description: l.description,
                estimated_minutes: l.estimated_minutes,
                lesson_order: l.lesson_order,
                learning_objectives: (l as any).learning_objectives || [],
                quiz_questions: l.quiz_questions
              }))}
              completedLessonIds={completedLessonIds}
              currentLessonId={nextLesson?.id}
              isEnrolled={!!enrollment}
              certificationName={currentCertification.name}
              estimatedHours={currentCertification.estimated_hours ? Number(currentCertification.estimated_hours) : undefined}
              onLessonClick={handleLessonClick}
            />
          )}

          {/* What You'll Build Section */}
          <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Wrench className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">What You'll Build</h3>
                  <p className="text-sm text-muted-foreground">
                    {slug === 'prompt-engineering-fundamentals' 
                      ? "A personal prompt library with proven templates for any AI tool. You'll craft prompts for content creation, research, problem-solving, and more."
                      : slug === 'ai-founders-certificate'
                      ? "A real product from idea to launch. You'll interview customers, build an MVP with AI tools, and acquire your first users."
                      : "A polished pitch deck and investor presentation. You'll practice with AI investors, refine your story, and present at Demo Day."
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  // Certification Hub - Pick Your Certificate view
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="outline" className="mb-2">NEXT_ CERTIFIED</Badge>
          <h1 className="text-3xl md:text-4xl font-bold">Pick Your Certificate</h1>
          <p className="text-muted-foreground text-lg">
            Choose any certificate to start learning. Each one gives you real skills and a LinkedIn-shareable credential.
          </p>
        </div>

        {/* Certificate Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certificates.map((cert) => {
            const Icon = cert.icon;
            const isLocked = !canAccessCertificate(cert.tierRequired);
            const certProgress = certifications.find(c => c.slug === cert.slug) 
              ? getProgress(certifications.find(c => c.slug === cert.slug)!.id)
              : null;
            
            const isInProgress = certProgress?.isEnrolled && !certProgress?.isCompleted;
            const isComplete = certProgress?.isCompleted;
            
            const colorClasses = {
              primary: {
                bg: "bg-primary/10",
                border: "border-primary/30 hover:border-primary/50",
                text: "text-primary",
                glow: "shadow-primary/10",
              },
              purple: {
                bg: "bg-purple-500/10",
                border: "border-purple-500/30 hover:border-purple-500/50",
                text: "text-purple-500",
                glow: "shadow-purple-500/10",
              },
              accent: {
                bg: "bg-purple-500/10",
                border: "border-purple-500/30 hover:border-purple-500/50",
                text: "text-purple-500",
                glow: "shadow-purple-500/10",
              },
              yellow: {
                bg: "bg-amber-500/10",
                border: "border-amber-500/30 hover:border-amber-500/50",
                text: "text-amber-500",
                glow: "shadow-amber-500/10",
              },
            }[cert.color];

            const handleClick = () => {
              if (isLocked) {
                setSelectedLockedCert(cert);
                setUpgradeModalOpen(true);
                return;
              }
              if (cert.slug === 'curriculum') {
                navigate("/dashboard/curriculum");
              } else if (cert.slug === 'ai-launcher') {
                navigate("/dashboard/schedule");
              } else {
                navigate(`/dashboard/certification/${cert.slug}`);
              }
            };

            return (
              <Card 
                key={cert.id}
                className={`relative overflow-hidden transition-all cursor-pointer hover:shadow-xl ${colorClasses.glow} ${
                  isLocked 
                    ? "opacity-60 border-border/30" 
                    : colorClasses.border
                }`}
                onClick={handleClick}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 opacity-30 bg-gradient-to-br ${colorClasses.bg} to-transparent pointer-events-none`} />
                
                <CardContent className="relative p-5 md:p-6">
                  {/* Header with Icon and Status */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className={`h-12 w-12 md:h-14 md:w-14 rounded-2xl ${colorClasses.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`h-6 w-6 md:h-7 md:w-7 ${colorClasses.text}`} />
                    </div>
                    
                    {/* Status Badge - now in flex layout instead of absolute */}
                    <div className="flex-shrink-0">
                      {isComplete && (
                        <Badge className="bg-green-500/20 text-green-500 border-green-500/30 text-xs">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Complete
                        </Badge>
                      )}
                      {isInProgress && !isComplete && (
                        <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
                          In Progress
                        </Badge>
                      )}
                      {isLocked && (
                        <Badge variant="outline" className="gap-1 text-xs">
                          <Lock className="h-3 w-3" />
                          Locked
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-base md:text-lg font-semibold mb-1 line-clamp-1">{cert.name}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground mb-2">{cert.duration}</p>
                  <p className="text-xs md:text-sm text-muted-foreground mb-4 line-clamp-2">{cert.description}</p>

                  {/* Skills Preview */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {cert.skills.slice(0, 2).map((skill, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {cert.skills.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{cert.skills.length - 2} more
                      </Badge>
                    )}
                  </div>

                  {/* Expandable Content Preview */}
                  {(() => {
                    // For AI Builder, show the 12-week journey instead of lessons
                    if (cert.slug === 'ai-founders-certificate') {
                      return (
                        <Collapsible className="mb-4">
                          <CollapsibleTrigger 
                            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground w-full py-2 border-t border-border/30 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ChevronDown className="h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                            <Target className="h-3 w-3" />
                            <span>See the 12-week journey</span>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="pt-3 space-y-2" onClick={(e) => e.stopPropagation()}>
                            {[
                              { week: "1-2", phase: "Discover", desc: "Find real problems worth solving" },
                              { week: "3-4", phase: "Design", desc: "Sketch and prototype your solution" },
                              { week: "5-8", phase: "Build", desc: "Create your MVP with AI tools" },
                              { week: "9-10", phase: "Launch", desc: "Get your first real users" },
                              { week: "11-12", phase: "Grow", desc: "Scale and iterate on feedback" },
                            ].map((item, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs">
                                <span className="w-12 text-muted-foreground flex-shrink-0">W{item.week}</span>
                                <span className="font-medium text-foreground/90 w-16 flex-shrink-0">{item.phase}</span>
                                <span className="text-muted-foreground line-clamp-1">{item.desc}</span>
                              </div>
                            ))}
                          </CollapsibleContent>
                        </Collapsible>
                      );
                    }
                    
                    // For other certificates, show lesson preview
                    const certId = certifications.find(c => c.slug === cert.slug)?.id;
                    const certLessons = certId ? lessonPreviews[certId] || [] : [];
                    
                    if (certLessons.length === 0 && !previewsLoading) return null;
                    
                    return (
                      <Collapsible className="mb-4">
                        <CollapsibleTrigger 
                          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground w-full py-2 border-t border-border/30 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ChevronDown className="h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                          <BookOpen className="h-3 w-3" />
                          <span>See what's inside ({certLessons.length} lessons)</span>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="pt-2 space-y-1.5" onClick={(e) => e.stopPropagation()}>
                          {certLessons.slice(0, 4).map((lesson, i) => (
                            <div key={lesson.id} className="flex items-center gap-2 text-xs">
                              <span className="w-4 h-4 rounded-full bg-muted flex items-center justify-center text-[10px] font-medium flex-shrink-0">
                                {i + 1}
                              </span>
                              <span className="flex-1 line-clamp-1 text-foreground/80">{lesson.title}</span>
                              {lesson.estimated_minutes && (
                                <span className="text-muted-foreground flex-shrink-0">{lesson.estimated_minutes}m</span>
                              )}
                            </div>
                          ))}
                          {certLessons.length > 4 && (
                            <p className="text-[10px] text-muted-foreground text-center pt-1">
                              + {certLessons.length - 4} more lessons
                            </p>
                          )}
                        </CollapsibleContent>
                      </Collapsible>
                    );
                  })()}

                  {/* Progress bar if in progress */}
                  {isInProgress && certProgress && (
                    <div className="mb-4">
                      <Progress 
                        value={(certProgress.completedLessons / (certifications.find(c => c.slug === cert.slug)?.lessons_count || 1)) * 100} 
                        className="h-1.5" 
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {certProgress.completedLessons} lessons complete
                      </p>
                    </div>
                  )}

                  {/* CTA */}
                  <Button 
                    variant={isLocked ? "outline" : "default"} 
                    className={`w-full gap-2 ${!isLocked ? 'bg-gradient-to-r from-primary to-primary/80' : ''}`}
                    disabled={isLocked}
                  >
                    {isLocked ? (
                      <>
                        <Lock className="h-4 w-4" />
                        Upgrade to Unlock
                      </>
                    ) : isComplete ? (
                      <>
                        View Certificate
                        <ArrowRight className="h-4 w-4" />
                      </>
                    ) : isInProgress && certProgress && certProgress.completedLessons > 0 ? (
                      <>
                        Continue Learning
                        <ArrowRight className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Start Learning
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats Banner */}
        <Card className="border-primary/20 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">6+</div>
                <div className="text-sm text-muted-foreground">Expert Lessons</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Free Certificate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">9-16</div>
                <div className="text-sm text-muted-foreground">Age Range</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">∞</div>
                <div className="text-sm text-muted-foreground">Lifetime Access</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Banner */}
        <Card className="border-muted bg-muted/30">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">
              Each certificate is <strong>independent</strong> — pick whichever fits your goals. 
              All certificates are <strong>LinkedIn-shareable</strong> and prove your AI skills to the world.
            </p>
          </CardContent>
        </Card>

        {/* Upgrade Modal for Locked Certificates */}
        <CertificateUpgradeModal
          isOpen={upgradeModalOpen}
          onClose={() => setUpgradeModalOpen(false)}
          certificate={selectedLockedCert}
        />
      </div>
    </DashboardLayout>
  );
}
