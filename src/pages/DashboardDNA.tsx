import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useFounderDNA } from "@/hooks/useFounderDNA";
import { FounderTypeCard } from "@/components/dna/FounderTypeCard";
import { SuperpowerCards } from "@/components/dna/SuperpowerCards";
import { RoleFitChart } from "@/components/dna/RoleFitChart";
import { StrengthInsights } from "@/components/dna/StrengthInsights";
import { DNARadarChart } from "@/components/dna/DNARadarChart";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCw, Dna, Sparkles } from "lucide-react";

export default function DashboardDNA() {
  const { profile, isLoading, analyzeDNA, getFounderTypeColor } = useFounderDNA();

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-40 w-full" />
          <div className="grid gap-4 md:grid-cols-2">
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Dna className="h-6 w-6 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">Your Founder DNA</h1>
              <p className="text-sm text-muted-foreground">
                Discover your unique strengths and founder style
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => analyzeDNA.mutate()}
            disabled={analyzeDNA.isPending}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${analyzeDNA.isPending ? 'animate-spin' : ''}`} />
            {profile ? 'Refresh DNA' : 'Analyze My DNA'}
          </Button>
        </div>

        {profile ? (
          <div className="space-y-6">
            {/* Founder Type Card */}
            <FounderTypeCard
              founderType={profile.founder_type}
              description={profile.founder_type_description}
              gradient={getFounderTypeColor(profile.founder_type)}
            />

            {/* Main Grid */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Left Column */}
              <div className="space-y-6">
                <SuperpowerCards
                  superpowers={profile.superpowers}
                  growthEdges={profile.growth_edges}
                />
                <StrengthInsights
                  personalizedInsight={profile.personalized_insight}
                  recommendedFocus={profile.recommended_focus}
                />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <RoleFitChart roleFit={profile.role_fit} />
                <DNARadarChart analysisData={profile.analysis_data} />
              </div>
            </div>

            {/* Last Updated */}
            <p className="text-xs text-center text-muted-foreground">
              Last analyzed: {new Date(profile.updated_at).toLocaleDateString()}
            </p>
          </div>
        ) : (
          /* Empty State */
          <Card className="border-dashed">
            <CardContent className="py-16 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Discover Your Founder DNA</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                Based on your missions, pitches, and reflections, our coach will analyze your unique
                strengths and help you understand what kind of founder you are.
              </p>
              <Button onClick={() => analyzeDNA.mutate()} disabled={analyzeDNA.isPending}>
                {analyzeDNA.isPending ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Dna className="h-4 w-4 mr-2" />
                    Analyze My DNA
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
