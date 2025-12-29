import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePricingTiers } from "@/hooks/usePricingTiers";

interface PricingTableProps {
  program: "junior" | "teen" | "senior";
}

export function PricingTable({ program }: PricingTableProps) {
  const navigate = useNavigate();
  const { data: tiers, isLoading, error } = usePricingTiers("b2c");

  if (isLoading) {
    return (
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground mt-4">Loading pricing...</p>
        </div>
      </section>
    );
  }

  if (error || !tiers || tiers.length === 0) {
    return (
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Join the Revolution</h2>
          <p className="text-muted-foreground mb-8">Starting at just $9</p>
          <Button size="lg" onClick={() => navigate("/pricing")}>
            View All Pricing Options
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center">Join the Revolution</h2>
        <p className="text-center text-muted-foreground mb-4 max-w-2xl mx-auto">
          Start for just $19. Prove you're ready. Then go full founder with live classes, mentorship, and the complete journey.
        </p>
        <p className="text-center text-sm text-muted-foreground mb-10">
          12-week cohort • Multiple tiers available • Scholarships available
        </p>

        {/* Tier Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {tiers.slice(0, 3).map((tier) => (
            <Card 
              key={tier.id} 
              className={`p-6 relative ${tier.is_featured ? 'border-2 border-primary ring-2 ring-primary/20' : ''}`}
            >
              {tier.is_featured && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                  {tier.badge_text || 'RECOMMENDED'}
                </Badge>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold">{tier.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {tier.slug === 'revolution' && "Begin your NEXT_ journey"}
                  {tier.slug === 'yearly' && "Full 12-month access"}
                  {tier.slug === 'live' && "Live mentorship included"}
                </p>
                
                <div className="mt-4">
                  {tier.original_price && tier.original_price > (tier.current_price || 0) && (
                    <span className="text-lg text-muted-foreground line-through mr-2">
                      ${tier.original_price}
                    </span>
                  )}
                  <span className="text-3xl font-bold">${tier.current_price}</span>
                  {tier.billing_period === 'yearly' && (
                    <span className="text-muted-foreground">/year</span>
                  )}
                </div>
                
                {tier.monthly_price && tier.billing_period === 'yearly' && (
                  <p className="text-sm text-muted-foreground mt-1">
                    or ${tier.monthly_price}/month
                  </p>
                )}
              </div>

              {/* Key Features */}
              <ul className="space-y-3 mb-6">
                {tier.certificates_included && tier.certificates_included.length > 0 && (
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>LinkedIn-Shareable Certificate</span>
                  </li>
                )}
                {tier.features?.ai_coach_daily > 0 && (
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>AI Coach: {tier.features.ai_coach_daily === 999 ? 'Unlimited' : `${tier.features.ai_coach_daily}/day`}</span>
                  </li>
                )}
                {tier.features?.live_classes && (
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>Live Weekly Classes</span>
                  </li>
                )}
                {tier.features?.tank_weekly > 0 && (
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>THE TANK Pitch Practice 🦈</span>
                  </li>
                )}
                {tier.features?.curriculum_access === 'full' && (
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>Full 12-Week Curriculum</span>
                  </li>
                )}
                {tier.features?.mentor_access && (
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>1:1 Mentor Access</span>
                  </li>
                )}
              </ul>

              <Button 
                className="w-full" 
                variant={tier.is_featured ? "default" : "outline"}
                onClick={() => navigate(`/checkout?tier=${tier.slug}`)}
              >
                {tier.slug === 'revolution' ? `Start for $${tier.current_price}` : 
                 tier.slug === 'live' ? 'Claim Offer' : 'Get NEXT_ CERTIFIED'}
              </Button>
            </Card>
          ))}
        </div>

        {/* View Full Comparison */}
        <div className="text-center">
          <Button variant="link" onClick={() => navigate("/pricing")}>
            View full pricing comparison →
          </Button>
        </div>

        {/* Payment Options Note */}
        <div className="mt-8 text-center">
          <Card className="inline-block p-4 bg-card/50">
            <p className="text-sm text-muted-foreground">
              <strong>Scholarships available</strong> for students who demonstrate need
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}