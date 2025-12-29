import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useSkillIntelligence } from "@/hooks/useSkillIntelligence";
import { useFounderDNA } from "@/hooks/useFounderDNA";
import { SkillsRadarChart } from "@/components/skills/SkillsRadarChart";
import { SkillHeatmap, GrowthAdvisor, WeeklyRecommendations } from "@/components/skills";
import { FounderTypeCard } from "@/components/dna/FounderTypeCard";
import { RoleFitChart } from "@/components/dna/RoleFitChart";
import { SuperpowerCards } from "@/components/dna/SuperpowerCards";
import { StrengthInsights } from "@/components/dna/StrengthInsights";
import { DNARadarChart } from "@/components/dna/DNARadarChart";
import { 
  Brain, 
  RefreshCw, 
  Sparkles, 
  TrendingUp,
  Star,
  Target,
  Zap,
  Dna,
  Lightbulb
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardSkillIntelligence() {
  const { 
    assessments, 
    insights, 
    isLoading: skillsLoading, 
    studentLoading,
    student,
    analyzeIntelligence,
    getHeatmapData,
    getSignatureStrength 
  } = useSkillIntelligence();

  const {
    profile: dnaProfile,
    isLoading: dnaLoading,
    analyzeDNA,
    getFounderTypeColor
  } = useFounderDNA();

  const isLoading = skillsLoading || dnaLoading || studentLoading;
  const heatmapData = getHeatmapData();
  const signatureStrength = getSignatureStrength();

  // Calculate overall score and stats
  const overallScore = assessments?.length 
    ? Math.round(assessments.reduce((sum, a) => sum + a.combined_score, 0) / assessments.length)
    : 0;
  
  const risingSkills = assessments?.filter(a => a.momentum === 'rising') || [];
  const weeklyGrowth = risingSkills.length > 0 
    ? Math.round(risingSkills.reduce((sum, a) => sum + (a.momentum_change || 0), 0) / risingSkills.length)
    : 0;

  const topSkills = heatmapData
    .filter(s => s.score > 50)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  // Prepare radar chart data
  const radarData = heatmapData.map(skill => ({
    name: skill.name.split(' ')[0],
    value: skill.score,
    fullMark: 100
  }));

  const hasSkillData = assessments && assessments.length > 0;
  const hasDNAData = !!dnaProfile;

  // Prepare DNA analysis data for radar chart
  const dnaAnalysisData = dnaProfile?.analysis_data || {};

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <Skeleton className="h-12 w-64" />
          <div className="grid grid-cols-4 gap-4">
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Skeleton className="h-[400px]" />
            <Skeleton className="h-[400px]" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header with NEXT_ Philosophy */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">🧠 Your Readiness for the Unknown</h1>
              <Badge variant="secondary" className="text-xs">NEXT_ Profile</Badge>
            </div>
            <p className="text-muted-foreground text-sm mt-1">
              The founders who changed everything had unique superpowers. Discover yours! ✨
            </p>
          </div>
          <Button 
            onClick={() => {
              if (student) {
                analyzeIntelligence.mutate();
                analyzeDNA.mutate();
              }
            }}
            disabled={analyzeIntelligence.isPending || analyzeDNA.isPending || studentLoading || !student}
            size="sm"
            className="gap-2"
          >
            {studentLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Loading...
              </>
            ) : (analyzeIntelligence.isPending || analyzeDNA.isPending) ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Thinking...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Discover Me!
              </>
            )}
          </Button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Power Level</p>
                  <p className="text-3xl font-bold text-primary">{overallScore}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium">This Week</p>
                  <p className={cn(
                    "text-3xl font-bold",
                    weeklyGrowth > 0 ? "text-green-500" : "text-muted-foreground"
                  )}>
                    {weeklyGrowth > 0 ? `+${weeklyGrowth}%` : '—'}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Energy</p>
                  <p className="text-3xl font-bold">{insights?.engagement_score || 0}%</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-amber-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground font-medium mb-2">Best At</p>
              <div className="flex flex-wrap gap-1">
                {topSkills.length > 0 ? topSkills.map(skill => (
                  <Badge key={skill.category} variant="outline" className="text-xs">
                    {skill.icon} {skill.name.split(' ')[0]}
                  </Badge>
                )) : (
                  <span className="text-sm text-muted-foreground">Keep building to find out!</span>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT COLUMN: Skills Intelligence */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">Your Builder Skills</h2>
            </div>
            <p className="text-sm text-muted-foreground -mt-4">
              The skills that will let you build whatever comes NEXT_ 💪
            </p>

            {!hasSkillData ? (
              <Card className="py-12">
                <CardContent className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Brain className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Let's Find Your Skills!</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto mb-6 text-sm">
                    Complete some missions first, then come back here to see what you're naturally great at!
                  </p>
                  <Button 
                    onClick={() => student && analyzeIntelligence.mutate()}
                    disabled={analyzeIntelligence.isPending || studentLoading || !student}
                    className="gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    {studentLoading ? 'Loading...' : 'Analyze My Skills'}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Skill Radar Chart */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Target className="w-4 h-4 text-primary" />
                      Your Skill Map
                    </CardTitle>
                    <CardDescription className="text-xs">
                      See how your powers are growing! 🚀
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SkillsRadarChart data={radarData} />
                  </CardContent>
                </Card>

                {/* Skill Heatmap */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Skill Progress</CardTitle>
                    <CardDescription className="text-xs">
                      Each mission makes you stronger!
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SkillHeatmap data={heatmapData} />
                  </CardContent>
                </Card>

                {/* Signature Strength */}
                {signatureStrength && (
                  <Card className="bg-gradient-to-br from-amber-500/5 to-amber-500/10 border-amber-500/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        Your Superpower
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-start gap-3">
                        <div className="text-3xl">{signatureStrength.icon}</div>
                        <div>
                          <h3 className="font-semibold text-lg">{signatureStrength.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {insights?.signature_strength_description || 
                              "This is YOUR natural superpower - lean into it! 💫"}
                          </p>
                          <Badge className="mt-3" variant="secondary">
                            {signatureStrength.combined_score}% Mastery
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Growth Advisor */}
                <GrowthAdvisor 
                  tips={insights?.growth_tips || []}
                  learningStyle={insights?.learning_style || null}
                  teamRole={insights?.team_role_suggestion || null}
                />
              </>
            )}
          </div>

          {/* RIGHT COLUMN: Founder DNA */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Dna className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">Your Unique Superpower</h2>
            </div>
            <p className="text-sm text-muted-foreground -mt-4">
              Every founder who changed everything had a unique gift. What's yours? 🧬
            </p>

            {!hasDNAData ? (
              <Card className="py-12">
                <CardContent className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Dna className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Discover Your Founder Type!</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto mb-6 text-sm">
                    Are you The Visionary? The Builder? The Creative? Let's find out what makes YOU special!
                  </p>
                  <Button 
                    onClick={() => student && analyzeDNA.mutate()}
                    disabled={analyzeDNA.isPending || studentLoading || !student}
                    className="gap-2"
                  >
                    <Dna className="w-4 h-4" />
                    {studentLoading ? 'Loading...' : 'Find My DNA'}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Founder Type Card */}
                <FounderTypeCard
                  founderType={dnaProfile.founder_type}
                  description={dnaProfile.founder_type_description}
                  gradient={getFounderTypeColor(dnaProfile.founder_type)}
                />

                {/* DNA Radar Chart - Strength Map */}
                <DNARadarChart analysisData={dnaAnalysisData} />

                {/* Superpowers & Growth Edges */}
                <SuperpowerCards
                  superpowers={dnaProfile.superpowers}
                  growthEdges={dnaProfile.growth_edges}
                />

                {/* Role Fit Chart */}
                <RoleFitChart roleFit={dnaProfile.role_fit} />

                {/* Personalized Insights */}
                <StrengthInsights 
                  personalizedInsight={dnaProfile.personalized_insight}
                  recommendedFocus={dnaProfile.recommended_focus}
                />
              </>
            )}
          </div>
        </div>

        {/* Full Width: Weekly Recommendations */}
        {hasSkillData && (
          <div className="pt-4">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-semibold">This Week's Challenges</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Try these to level up even faster! 🔥
            </p>
            <WeeklyRecommendations 
              recommendations={insights?.weekly_recommendations || []}
            />
          </div>
        )}

        {/* Last Updated */}
        {(insights?.updated_at || dnaProfile?.updated_at) && (
          <p className="text-center text-xs text-muted-foreground pt-4">
            Last analyzed: {new Date(insights?.updated_at || dnaProfile?.updated_at || '').toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        )}
      </div>
    </DashboardLayout>
  );
}
