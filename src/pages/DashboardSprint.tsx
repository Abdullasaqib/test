import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { 
  Flame, Zap, Clock, CheckCircle2, Trophy, 
  Sparkles, Target, Brain, Send,
  Lock, ArrowUpRight, ChevronRight, TrendingUp,
  Compass, ThumbsUp, ThumbsDown, Calendar, RotateCcw, Eye, BarChart3
} from "lucide-react";
import { useSprints, Challenge } from "@/hooks/useSprints";
import { TrackSelector } from "@/components/sprint/TrackSelector";
import { PillarBadge } from "@/components/sprint/PillarBadge";
import { RealWorldContext } from "@/components/sprint/RealWorldContext";
import { ArchetypeBadge, FOUNDER_ARCHETYPES } from "@/components/sprint/ArchetypeBadge";
import { ThinkingScaffold } from "@/components/sprint/ThinkingScaffold";
import { XPExplainer } from "@/components/sprint/XPExplainer";
import { RecentSprintCard } from "@/components/sprint/RecentSprintCard";
import { MultipleChoiceOptions } from "@/components/sprint/MultipleChoiceOptions";
import { RoleBadge, RoleContextCard } from "@/components/sprint/RoleBadge";
import { SprintCelebration } from "@/components/sprint/SprintCelebration";
import { FeedbackCards } from "@/components/sprint/FeedbackCards";
import { RoleAchievement } from "@/components/sprint/RoleAchievement";
import { SkillLevelUp } from "@/components/sprint/SkillLevelUp";
import { MCFeedbackDisplay } from "@/components/sprint/MCFeedbackDisplay";
import { EffortBadge } from "@/components/sprint/EffortBadge";
import { SmartNextActions } from "@/components/sprint/SmartNextActions";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

type ViewState = 'challenge' | 'submitting' | 'result' | 'explore-tracks';

export default function DashboardSprint() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const isBonusMode = searchParams.get('bonus') === 'true';
  
  const { 
    loading, dailyChallenge, bonusChallenge, todayCompleted, streak, 
    recentAttempts, submitting, submitResponse, sprintAccess,
    industryTracks, studentTrackInterests, hasSelectedTracks,
    saveTrackInterests, trackProgress, fetchBonusChallenge
  } = useSprints();
  
  const [response, setResponse] = useState("");
  const [viewState, setViewState] = useState<ViewState>('challenge');
  const [result, setResult] = useState<{
    score: number;
    feedback: { praise: string; insight: string; next_challenge: string } | string;
    skills_awarded: string[];
    xp_earned: number;
    archetype?: string;
    baseXP?: number;
    roleFeedback?: string;
  } | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showResponseReview, setShowResponseReview] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [selectedTracks, setSelectedTracks] = useState<string[]>([]);
  const [showTrackDiscovery, setShowTrackDiscovery] = useState(false);
  const [currentBonusChallenge, setCurrentBonusChallenge] = useState<Challenge | null>(null);
  
  // Multiple-choice state
  const [selectedMCOption, setSelectedMCOption] = useState<string | null>(null);
  const [mcReasoning, setMcReasoning] = useState("");
  
  // Unified active challenge - this is what we render
  const activeChallenge = isBonusMode ? currentBonusChallenge : dailyChallenge;

  // Timer effect
  useEffect(() => {
    if (startTime && viewState === 'challenge') {
      const interval = setInterval(() => {
        setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [startTime, viewState]);

  // Start timer when challenge loads
  useEffect(() => {
    const activeChallenge = isBonusMode ? currentBonusChallenge : dailyChallenge;
    if (activeChallenge && !startTime && viewState === 'challenge') {
      setStartTime(Date.now());
    }
  }, [dailyChallenge, currentBonusChallenge, isBonusMode, startTime, viewState]);

  // Load bonus challenge when in bonus mode
  useEffect(() => {
    if (isBonusMode && fetchBonusChallenge && !currentBonusChallenge) {
      setViewState('challenge');
      setResult(null);
      fetchBonusChallenge().then(challenge => {
        if (challenge) {
          setCurrentBonusChallenge(challenge);
          setStartTime(Date.now());
        }
      });
    }
    // Clear bonus challenge when leaving bonus mode
    if (!isBonusMode && currentBonusChallenge) {
      setCurrentBonusChallenge(null);
    }
  }, [isBonusMode, fetchBonusChallenge]);

  // When returning to view results (non-bonus mode only)
  useEffect(() => {
    if (!isBonusMode && todayCompleted && recentAttempts.length > 0 && !result && viewState === 'challenge') {
      const latestAttempt = recentAttempts[0];
      let parsedFeedback = latestAttempt.ai_feedback;
      if (typeof latestAttempt.ai_feedback === 'string') {
        try {
          parsedFeedback = JSON.parse(latestAttempt.ai_feedback);
        } catch {
          parsedFeedback = latestAttempt.ai_feedback;
        }
      }
      
      setResult({
        score: latestAttempt.score || 0,
        feedback: parsedFeedback || '',
        skills_awarded: latestAttempt.skills_awarded || [],
        xp_earned: latestAttempt.xp_earned || 0,
        archetype: (latestAttempt as any).archetype,
        baseXP: latestAttempt.challenge?.xp_reward,
        roleFeedback: (latestAttempt as any).role_feedback,
      });
      setResponse(latestAttempt.response || '');
      setViewState('result');
    }
  }, [isBonusMode, todayCompleted, recentAttempts, result, viewState]);

  const handleTracksContinue = async () => {
    const success = await saveTrackInterests(selectedTracks);
    if (success) {
      setViewState('challenge');
    }
  };

  // Handle post-challenge track interest
  const handleTrackInterest = async (interested: boolean) => {
    if (interested && dailyChallenge?.industry_track_id) {
      const newInterests = [...new Set([...studentTrackInterests, dailyChallenge.industry_track_id])];
      await saveTrackInterests(newInterests);
    }
    setShowTrackDiscovery(false);
  };

  const isMultipleChoice = activeChallenge?.response_type === 'multiple_choice';
  const mcOptions = activeChallenge?.response_options?.options || [];

  const handleSubmit = async () => {
    if (!activeChallenge) return;
    
    // Validate based on response type
    if (isMultipleChoice) {
      if (!selectedMCOption || mcReasoning.trim().length < 20) return;
    } else {
      if (!response.trim()) return;
    }

    setViewState('submitting');
    
    const timeSpent = startTime ? Math.floor((Date.now() - startTime) / 1000) : undefined;
    
    // Build the response string based on type
    let finalResponse = response;
    if (isMultipleChoice) {
      const selectedOption = mcOptions.find((opt: { id: string }) => opt.id === selectedMCOption);
      finalResponse = `Selected: ${selectedMCOption} - ${selectedOption?.text || ''}\nReasoning: ${mcReasoning}`;
    }
    
    const evaluation = await submitResponse(activeChallenge.id, finalResponse, timeSpent, isBonusMode);
    
    if (evaluation?.success) {
      setResult({
        ...evaluation.attempt,
        baseXP: evaluation.challenge?.xp_reward || activeChallenge.xp_reward,
      });
      
      // Show celebration overlay first
      setShowCelebration(true);
    } else {
      setViewState('challenge');
    }
  };
  
  const handleCelebrationComplete = () => {
    setShowCelebration(false);
    setViewState('result');
    
    // Show track discovery if user hasn't selected this track yet (not for bonus mode)
    if (!isBonusMode && activeChallenge?.industry_track_id && !studentTrackInterests.includes(activeChallenge.industry_track_id)) {
      setShowTrackDiscovery(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Get current track progress
  const getCurrentTrackProgress = () => {
    if (!activeChallenge?.industry_track_id) return null;
    return trackProgress.find(tp => tp.track_id === activeChallenge.industry_track_id);
  };

  const categoryColors: Record<string, string> = {
    decision: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    scenario: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    thought: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  };

  const categoryLabels: Record<string, string> = {
    decision: 'Quick Decision',
    scenario: 'Scenario Sprint',
    thought: 'Thought Problem',
  };

  const categoryIcons: Record<string, typeof Target> = {
    decision: Target,
    scenario: Sparkles,
    thought: Brain,
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="inline-block"
            >
              <Zap className="h-10 w-10 text-orange-400" />
            </motion.div>
            <p className="text-muted-foreground mt-4">Loading your challenge...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // No access - show upgrade page
  if (!sprintAccess.hasAccess) {
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto text-center py-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-500/20 mb-6">
            <Lock className="h-10 w-10 text-orange-400" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Daily Sprint Challenges</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Build your founder instincts with AI-evaluated daily challenges. 
            Practice real-world decision making and earn XP!
          </p>
          <Button 
            onClick={() => navigate('/pricing')}
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
          >
            Upgrade to Unlock
            <ArrowUpRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  // Out of sprints
  if (!sprintAccess.isUnlimited && sprintAccess.sprintsRemaining <= 0) {
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto text-center py-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-500/20 mb-6">
            <Zap className="h-10 w-10 text-amber-400" />
          </div>
          <h1 className="text-3xl font-bold mb-4">You've Used All Your Sprints!</h1>
          <p className="text-lg text-muted-foreground mb-4">
            You've completed {sprintAccess.sprintsUsedThisMonth} sprints this month. Great work!
          </p>
          <p className="text-muted-foreground mb-8">
            Upgrade to FULL FOUNDATION for unlimited daily sprints.
          </p>
          <Button 
            onClick={() => navigate('/pricing')}
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
          >
            Get Unlimited Sprints
            <ArrowUpRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  // Get today's date formatted
  const getTodayFormatted = () => {
    return new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header - Wordle Style */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Zap className="h-6 w-6 text-orange-400" />
                </motion.div>
                Founder Simulation
              </h1>
              {/* Explore Tracks Button - Optional */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setViewState('explore-tracks')}
                className="text-muted-foreground hover:text-foreground"
              >
                <Compass className="h-4 w-4 mr-1" />
                Explore Tracks
              </Button>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">{getTodayFormatted()}</span>
            </div>
          </div>
          
          <Card className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 border-orange-500/20">
            <CardContent className="p-4 flex items-center gap-4">
              {!sprintAccess.isUnlimited && (
                <>
                  <div>
                    <div className="text-lg font-semibold text-foreground">{sprintAccess.sprintsRemaining}</div>
                    <div className="text-xs text-muted-foreground">Sprints Left</div>
                  </div>
                  <div className="h-10 w-px bg-border" />
                </>
              )}
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                >
                  <Flame className="h-6 w-6 text-orange-500" />
                </motion.div>
                <div>
                  <div className="text-2xl font-bold text-orange-400">{streak?.current_streak || 0}</div>
                  <div className="text-xs text-muted-foreground">Day Streak</div>
                </div>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <div className="text-lg font-semibold text-yellow-400">{streak?.total_xp_earned || 0} XP</div>
                <div className="text-xs text-muted-foreground">Total Earned</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <AnimatePresence mode="wait">
          {/* Explore Tracks - Optional Full Page */}
          {viewState === 'explore-tracks' && (
            <motion.div
              key="explore-tracks"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="mb-4">
                <Button 
                  variant="ghost" 
                  onClick={() => setViewState('challenge')}
                  className="text-muted-foreground"
                >
                  ← Back to Today's Simulation
                </Button>
              </div>
              <Card className="border-0 bg-transparent shadow-none">
                <CardContent className="p-0">
                  <TrackSelector
                    tracks={industryTracks}
                    progress={trackProgress}
                    selectedTracks={selectedTracks.length > 0 ? selectedTracks : studentTrackInterests}
                    onToggleTrack={(trackId) => {
                      setSelectedTracks(prev => {
                        const current = prev.length > 0 ? prev : studentTrackInterests;
                        return current.includes(trackId) 
                          ? current.filter(id => id !== trackId)
                          : [...current, trackId];
                      });
                    }}
                    onContinue={handleTracksContinue}
                    maxSelections={3}
                  />
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Already completed today - now handled by useEffect that sets viewState to 'result' */}
          {/* This block is kept as fallback when recentAttempts hasn't loaded yet */}
          {todayCompleted && viewState === 'challenge' && recentAttempts.length === 0 && (
            <motion.div
              key="completed-loading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
                <CardContent className="p-8 text-center">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-4"
                  >
                    <CheckCircle2 className="h-10 w-10 text-green-400" />
                  </motion.div>
                  <h2 className="text-2xl font-bold mb-2">Today's Sprint Complete!</h2>
                  <p className="text-muted-foreground mb-4">
                    Loading your results...
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Challenge view - now works for both daily and bonus mode */}
          {activeChallenge && viewState === 'challenge' && (!todayCompleted || isBonusMode) && (
            <motion.div
              key={`challenge-${isBonusMode ? 'bonus' : 'daily'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Bonus Mode Badge */}
              {isBonusMode && (
                <div className="text-center">
                  <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 gap-1.5">
                    <RotateCcw className="h-3 w-3" />
                    Bonus Round — Practice Mode
                  </Badge>
                </div>
              )}
              
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      {activeChallenge.track && (
                        <Badge variant="secondary" className="gap-1.5 bg-background/50 text-sm">
                          <span className="text-base">{activeChallenge.track.icon}</span>
                          {activeChallenge.track.name}
                        </Badge>
                      )}
                      {activeChallenge.pillar && (
                        <PillarBadge pillar={activeChallenge.pillar} />
                      )}
                      <Badge className={categoryColors[activeChallenge.category]}>
                        {categoryLabels[activeChallenge.category]}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="gap-1">
                        <Clock className="h-3 w-3" />
                        {activeChallenge.estimated_minutes} min
                      </Badge>
                      <motion.div 
                        className="flex items-center gap-2 text-sm bg-muted/50 px-3 py-1 rounded-full"
                        animate={{ scale: elapsedSeconds > 0 && elapsedSeconds % 60 === 0 ? [1, 1.1, 1] : 1 }}
                      >
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="font-mono font-medium">{formatTime(elapsedSeconds)}</span>
                      </motion.div>
                    </div>
                  </div>
                  <CardTitle className="text-xl mt-4">{activeChallenge.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Role Context Card - Show if role-based challenge */}
                  {activeChallenge.role_type && (
                    <RoleContextCard role={activeChallenge.role_type} />
                  )}

                  {/* Scenario with Identity Hook */}
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm text-orange-400 font-medium mb-2">
                      {activeChallenge.role_type 
                        ? `You're the ${activeChallenge.role_metadata?.role_title || activeChallenge.role_type}. Here's your situation:`
                        : "You're the founder. Here's your situation:"}
                    </p>
                    <p className="text-foreground leading-relaxed">
                      {activeChallenge.scenario}
                    </p>
                  </div>

                  {/* Real World Context - Expanded by default */}
                  {activeChallenge.real_world_context && (
                    <RealWorldContext 
                      context={activeChallenge.real_world_context}
                      trackIcon={activeChallenge.track?.icon}
                      trackName={activeChallenge.track?.name}
                      defaultExpanded={true}
                    />
                  )}

                  {/* The Decision */}
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <h3 className="font-semibold text-primary mb-2 flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      The Decision
                    </h3>
                    <p className="text-foreground">{activeChallenge.question}</p>
                  </div>

                  {/* Response area - Multiple Choice or Freeform */}
                  {isMultipleChoice && mcOptions.length > 0 ? (
                    <MultipleChoiceOptions
                      options={mcOptions}
                      selectedOption={selectedMCOption}
                      onSelect={setSelectedMCOption}
                      onReasoningChange={setMcReasoning}
                      reasoning={mcReasoning}
                      disabled={false}
                    />
                  ) : (
                    <div className="space-y-3">
                      <label className="text-sm font-medium">Your Response</label>
                      <Textarea
                        placeholder="Think like a founder... What would you do?"
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                        className="min-h-[150px] resize-none"
                        maxLength={2000}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{response.length}/2000 characters</span>
                        <span className="flex items-center gap-1">
                          <Zap className="h-3 w-3 text-yellow-400" />
                          +{activeChallenge.xp_reward} XP possible
                        </span>
                      </div>
                    </div>
                  )}

                  <Button 
                    onClick={handleSubmit}
                    disabled={isMultipleChoice 
                      ? (!selectedMCOption || mcReasoning.trim().length < 20)
                      : response.trim().length < 20
                    }
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/20"
                    size="lg"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Make Your Decision
                  </Button>

                  {!isMultipleChoice && response.trim().length < 20 && response.length > 0 && (
                    <p className="text-xs text-muted-foreground text-center">
                      Write at least 20 characters to submit
                    </p>
                  )}
                  
                  {isMultipleChoice && selectedMCOption && mcReasoning.trim().length < 20 && mcReasoning.length > 0 && (
                    <p className="text-xs text-muted-foreground text-center">
                      Explain your choice in at least 20 characters
                    </p>
                  )}

                  {/* Thinking Scaffold for younger students */}
                  <ThinkingScaffold challengeType={activeChallenge.category} />
                </CardContent>
              </Card>

              {/* Skills you'll develop */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-4 w-4 text-purple-400" />
                    <span className="text-sm font-medium">Skills You'll Develop</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeChallenge.skills_developed.map((skill, i) => (
                      <Badge key={i} variant="secondary" className="bg-purple-500/10 text-purple-300">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Submitting state */}
          {viewState === 'submitting' && (
            <motion.div
              key="submitting"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card>
                <CardContent className="p-12 text-center">
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4"
                  >
                    <Brain className="h-8 w-8 text-primary" />
                  </motion.div>
                  <h2 className="text-xl font-semibold mb-2">Evaluating Your Response...</h2>
                  <p className="text-muted-foreground">
                    Our AI mentor is reviewing your founder thinking
                  </p>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3 }}
                    className="mt-6 max-w-xs mx-auto"
                  >
                    <Progress value={66} className="h-2" />
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Result state - Enhanced with Archetypes */}
          {viewState === 'result' && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className={`${result.score >= 70 ? 'bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20' : 'bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20'} overflow-hidden`}>
                <CardContent className="p-8 text-center relative">
                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl" />
                  
                  {/* Score circle */}
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className={`inline-flex items-center justify-center w-28 h-28 rounded-full ${result.score >= 70 ? 'bg-green-500/20 ring-4 ring-green-500/30' : 'bg-amber-500/20 ring-4 ring-amber-500/30'} mb-4 relative`}
                  >
                    <span className="text-5xl font-bold">{result.score}</span>
                    <span className="absolute -bottom-1 text-xs text-muted-foreground">/100</span>
                  </motion.div>
                  
                  {/* Archetype Badge - NEW */}
                  {result.archetype && (
                    <div className="mb-4">
                      <ArchetypeBadge 
                        archetype={result.archetype} 
                        size="lg" 
                        showDescription 
                      />
                    </div>
                  )}
                  
                  {/* XP Earned - With Explainer Tooltip */}
                  <div className="mb-6">
                    <XPExplainer 
                      xpEarned={result.xp_earned} 
                      score={result.score} 
                      baseXP={result.baseXP || dailyChallenge?.xp_reward || 25} 
                    />
                  </div>

                  {/* Track Progress Update */}
                  {activeChallenge?.track && getCurrentTrackProgress() && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="mb-6 bg-background/50 rounded-xl p-4 max-w-md mx-auto"
                    >
                      <div className="flex items-center justify-center gap-3 mb-2">
                        <span className="text-2xl">{activeChallenge.track.icon}</span>
                        <div className="text-left">
                          <div className="font-semibold text-sm">{activeChallenge.track.name} Progress</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <TrendingUp className="h-3 w-3 text-green-400" />
                            {(getCurrentTrackProgress()?.challenges_completed || 0) + 1}/30 challenges
                          </div>
                        </div>
                      </div>
                      <Progress value={((getCurrentTrackProgress()?.challenges_completed || 0) + 1) / 30 * 100} className="h-2" />
                    </motion.div>
                  )}

                  {/* Feedback Cards */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-6 max-w-2xl mx-auto"
                  >
                    <FeedbackCards feedback={result.feedback} score={result.score} />
                  </motion.div>

                  {/* Role Achievement */}
                  {activeChallenge?.role_type && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="mb-6 max-w-md mx-auto"
                    >
                      <RoleAchievement 
                        roleType={activeChallenge.role_type} 
                        roleFeedback={result.roleFeedback}
                        score={result.score}
                      />
                    </motion.div>
                  )}

                  {/* Skills Level Up */}
                  {result.skills_awarded.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mb-6"
                    >
                      <SkillLevelUp skills={result.skills_awarded} />
                    </motion.div>
                  )}

                  {/* Streak update */}
                  {streak && streak.current_streak > 0 && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8, type: "spring", bounce: 0.5 }}
                      className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 0.5, repeat: 2 }}
                      >
                        <Flame className="h-5 w-5" />
                      </motion.div>
                      <span className="font-semibold">{streak.current_streak} Day Streak!</span>
                    </motion.div>
                  )}
                </CardContent>
              </Card>

              {/* Response Review - Expandable */}
              {showResponseReview && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        Your Response
                      </h3>
                      <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-4">
                        {response || recentAttempts[0]?.response || 'No response recorded'}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Post-Challenge Track Discovery */}
              {showTrackDiscovery && activeChallenge?.track && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <span className="text-4xl">{activeChallenge.track.icon}</span>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">
                            That was a {activeChallenge.track.name} challenge!
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Want more challenges like this?
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleTrackInterest(false)}
                          >
                            <ThumbsDown className="h-4 w-4 mr-1" />
                            Not really
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleTrackInterest(true)}
                            className="bg-primary hover:bg-primary/90"
                          >
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            Yes please!
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Next Actions */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
              >
                <Button 
                  variant="outline" 
                  onClick={() => setShowResponseReview(!showResponseReview)}
                  className="gap-2"
                >
                  <Eye className="h-4 w-4" />
                  {showResponseReview ? 'Hide Response' : 'Review Response'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/dashboard/sprint/tracks')}
                  className="gap-2"
                >
                  <BarChart3 className="h-4 w-4" />
                  View My Stats
                </Button>
                <Button 
                  variant="outline"
                  onClick={async () => {
                    setResponse('');
                    setResult(null);
                    setShowResponseReview(false);
                    setSelectedMCOption(null);
                    setMcReasoning('');
                    setCurrentBonusChallenge(null);
                    setStartTime(null);
                    // Navigate to bonus mode
                    navigate('/dashboard/sprint?bonus=true');
                  }}
                  className="gap-2 border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
                >
                  <RotateCcw className="h-4 w-4" />
                  Try Bonus Round
                </Button>
                <Button 
                  onClick={() => navigate('/dashboard')}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 gap-2"
                >
                  Back to Dashboard
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </motion.div>
              
              {isBonusMode && (
                <p className="text-center text-sm text-muted-foreground">
                  🎮 Bonus Round — practice mode, no pressure!
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recent Sprints - Now Expandable */}
        {recentAttempts.length > 0 && viewState === 'challenge' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-400" />
                Recent Sprints
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentAttempts.slice(0, 3).map((attempt, index) => (
                  <RecentSprintCard key={attempt.id} attempt={attempt} index={index} />
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}