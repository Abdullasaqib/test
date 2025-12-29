import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Rocket, Trophy, Target } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

import {
  InvestorSelect,
  PitchRecorder,
  ScoreBreakdown,
  InvestorQA,
  PitchHistory,
  TankLevelBadge,
  INVESTORS,
} from "@/components/tank";
import { useTank, PitchEvaluation } from "@/hooks/useTank";

type Stage = "select" | "record" | "results" | "qa" | "summary";

export default function DashboardTank() {
  const { pitchAttempts, pitchTotalXP, submitPitch, isSubmitting, loadingAttempts } = useTank();
  const [searchParams, setSearchParams] = useSearchParams();
  const [evaluation, setEvaluation] = useState<PitchEvaluation | null>(null);
  const [activeTab, setActiveTab] = useState("pitch");

  // Get stage and investor from URL
  const stage = (searchParams.get("stage") as Stage) || "select";
  const selectedInvestor = searchParams.get("investor");

  const investor = INVESTORS.find((i) => i.id === selectedInvestor);

  // Navigate to a stage with URL update
  const navigateToStage = useCallback((newStage: Stage, investorId?: string | null) => {
    const params: Record<string, string> = {};
    if (newStage !== "select") {
      params.stage = newStage;
    }
    if (investorId) {
      params.investor = investorId;
    }
    setSearchParams(params);
  }, [setSearchParams]);

  const handleInvestorSelect = (id: string) => {
    navigateToStage("record", id);
  };

  const handlePitchSubmit = async (transcript: string) => {
    if (!selectedInvestor) return;

    try {
      const result = await submitPitch.mutateAsync({
        transcript,
        persona: selectedInvestor,
      });
      setEvaluation(result.evaluation);
      navigateToStage("results", selectedInvestor);
    } catch (error) {
      // Error is handled by useTank hook's onError - stay on record stage
      console.error("Failed to submit pitch:", error);
      // Keep user on record stage so they can retry
    }
  };

  const handleContinueToQA = () => {
    navigateToStage("qa", selectedInvestor);
  };

  const handleQAComplete = () => {
    navigateToStage("summary", selectedInvestor);
  };

  const handleReset = () => {
    setEvaluation(null);
    navigateToStage("select");
  };

  const handleBackToSelect = () => {
    navigateToStage("select");
  };

  const handlePitchAgain = () => {
    if (investor) {
      setEvaluation(null);
      navigateToStage("record", investor.id);
    }
  };

  // Warn before leaving if there's unsaved evaluation data
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (evaluation && (stage === "results" || stage === "qa")) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [evaluation, stage]);

  // Show skeleton while loading
  if (loadingAttempts) {
    return (
      <DashboardLayout currentWeek={1} totalWeeks={12}>
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-9 w-48" />
              <Skeleton className="h-5 w-72" />
            </div>
            <Skeleton className="h-12 w-32 rounded-lg" />
          </div>
          <Skeleton className="h-12 w-full" />
          <div className="grid grid-cols-3 gap-4">
            <Skeleton className="h-40 rounded-xl" />
            <Skeleton className="h-40 rounded-xl" />
            <Skeleton className="h-40 rounded-xl" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout currentWeek={1} totalWeeks={12}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              🦈 THE TANK
            </h1>
            <p className="text-muted-foreground">
              Practice your pitch with AI investors inspired by Shark Tank
            </p>
          </div>
          <TankLevelBadge xp={pitchTotalXP} showProgress size="lg" />
        </div>

        {/* Main content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pitch" className="gap-2">
              <Target className="h-4 w-4" />
              Practice Pitch
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <Trophy className="h-4 w-4" />
              My Progress
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pitch" className="mt-6">
            <AnimatePresence mode="wait">
              {/* Stage: Select Investor */}
              {stage === "select" && (
                <motion.div
                  key="select"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <InvestorSelect
                    selectedInvestor={selectedInvestor}
                    onSelect={handleInvestorSelect}
                  />
                </motion.div>
              )}

              {/* Stage: Record Pitch */}
              {stage === "record" && investor && (
                <motion.div
                  key="record"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <Button
                    variant="ghost"
                    onClick={handleBackToSelect}
                    className="gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Choose Different Investor
                  </Button>

                  <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                    <CardContent className="p-4 flex items-center gap-4">
                      <span className="text-4xl">{investor.emoji}</span>
                      <div>
                        <h3 className="font-bold">{investor.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {investor.tagline}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <PitchRecorder
                    onSubmit={handlePitchSubmit}
                    isSubmitting={isSubmitting}
                    onBack={handleBackToSelect}
                  />
                </motion.div>
              )}

              {/* Stage: Results */}
              {stage === "results" && evaluation && investor && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <ScoreBreakdown
                    scores={evaluation.scores}
                    totalScore={evaluation.totalScore}
                    xpEarned={evaluation.xpEarned}
                    verdict={evaluation.verdict}
                    feedback={evaluation.feedback}
                    nextTip={evaluation.nextTip}
                    investorName={investor.name}
                    onContinue={handleContinueToQA}
                  />
                </motion.div>
              )}

              {/* Stage: Q&A */}
              {stage === "qa" && evaluation && investor && (
                <motion.div
                  key="qa"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <InvestorQA
                    questions={evaluation.questions}
                    investorName={investor.name}
                    investorEmoji={investor.emoji}
                    onComplete={handleQAComplete}
                  />
                </motion.div>
              )}

              {/* Stage: Summary */}
              {stage === "summary" && evaluation && investor && (
                <motion.div
                  key="summary"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-6"
                >
                  <div className="py-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="text-6xl mb-4"
                    >
                      {evaluation.verdict === "DEAL" ? "🎉" : "💪"}
                    </motion.div>
                    <h2 className="text-2xl font-bold mb-2">
                      {evaluation.verdict === "DEAL"
                        ? "Amazing Pitch!"
                        : "Great Practice!"}
                    </h2>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      {evaluation.feedback.overallComment}
                    </p>
                  </div>

                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-3xl font-bold text-primary">
                            +{evaluation.xpEarned}
                          </p>
                          <p className="text-xs text-muted-foreground">XP Earned</p>
                        </div>
                        <div>
                          <p className="text-3xl font-bold">
                            {evaluation.totalScore}/75
                          </p>
                          <p className="text-xs text-muted-foreground">Score</p>
                        </div>
                        <div>
                          <p className="text-3xl font-bold">
                            {pitchAttempts.length + 1}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Total Pitches
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex gap-4 justify-center">
                    <Button variant="outline" onClick={handleReset}>
                      Try Different Investor
                    </Button>
                    <Button onClick={handlePitchAgain}>
                      <Rocket className="h-4 w-4 mr-2" />
                      Pitch Again
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Fallback: If URL has invalid stage/investor combo, go back to select */}
              {stage !== "select" && !investor && (
                <motion.div
                  key="fallback"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <p className="text-muted-foreground mb-4">Invalid selection</p>
                  <Button onClick={handleReset}>Start Over</Button>
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <PitchHistory attempts={pitchAttempts as any} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
