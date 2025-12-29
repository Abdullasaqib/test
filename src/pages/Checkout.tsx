import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Shield, ArrowLeft, Tag, Loader2, Zap, Award, Users, Calendar, Rocket, GraduationCap, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { usePricingTier, PricingTier, PricingTierFeatures } from "@/hooks/usePricingTiers";
import { useAuth } from "@/hooks/useAuth";
import { useStudent } from "@/hooks/useStudent";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CursorWordmark } from "@/components/ui/cursor-wordmark";
import { cn } from "@/lib/utils";

interface ScholarshipCode {
  id: string;
  code: string;
  discount_amount: number;
  discount_type: 'fixed' | 'percentage';
  applicable_tiers: string[];
}

// Tier-specific content and styling
const tierContent: Record<string, {
  tagline: string;
  description: string;
  accentColor: string;
  bgGradient: string;
  icon: React.ReactNode;
  highlights: string[];
  isAdult?: boolean;
}> = {
  'revolution-start': {
    tagline: "Start Your Founder Journey",
    description: "Perfect for curious minds ready to discover the power of AI creation. Get your first certification and start building.",
    accentColor: "text-blue-400",
    bgGradient: "from-blue-500/10 to-blue-600/5",
    icon: <Zap className="w-6 h-6" />,
    highlights: [
      "30-day full platform access",
      "AI Foundations Certificate",
      "AI Coach for guidance",
      "Build your first AI-powered project"
    ]
  },
  'yearly-founder': {
    tagline: "Go Deeper — Master AI Creation",
    description: "For ambitious young founders ready to complete the full curriculum and earn both certifications. Your pace, your journey.",
    accentColor: "text-amber-400",
    bgGradient: "from-amber-500/10 to-amber-600/5",
    icon: <Award className="w-6 h-6" />,
    highlights: [
      "Full year of platform access",
      "Complete 12-week curriculum",
      "Earn AI Foundations + AI Builder Certificates",
      "Unlimited AI Coach & THE TANK access"
    ]
  },
  'live-cohort': {
    tagline: "Launch With Mentors",
    description: "The premium experience with live classes, dedicated mentors, and a real Demo Day. Present to investors and launch your business.",
    accentColor: "text-emerald-400",
    bgGradient: "from-emerald-500/10 to-emerald-600/5",
    icon: <Rocket className="w-6 h-6" />,
    highlights: [
      "6 live sessions over 3 weekends",
      "Dedicated mentor throughout",
      "All 3 certificates (AI Launcher included)",
      "Present at Demo Day to real investors"
    ]
  },
  // Adult tiers
  'professional-builder': {
    tagline: "Ship Your First Product",
    description: "An 8-week intensive for professionals ready to build and launch their first AI-powered product.",
    accentColor: "text-amber-400",
    bgGradient: "from-amber-500/10 to-amber-600/5",
    icon: <Rocket className="w-6 h-6" />,
    highlights: [
      "8-week intensive curriculum",
      "40 professional-focused missions",
      "AI Builder Pro Certificate",
      "Unlimited AI Coach & THE TANK access"
    ],
    isAdult: true
  },
  'college-founders': {
    tagline: "Turn Your Side Project into a Startup",
    description: "A 12-week program for college students ready to build and launch their first startup.",
    accentColor: "text-purple-400",
    bgGradient: "from-purple-500/10 to-purple-600/5",
    icon: <GraduationCap className="w-6 h-6" />,
    highlights: [
      "12-week full curriculum",
      "60 college-focused missions",
      "AI Venture Certificate",
      "Unlimited AI Coach & THE TANK access"
    ],
    isAdult: true
  }
};

// Age track info
const ageTrackInfo: Record<string, { name: string; description: string; ages: string }> = {
  junior: { name: "Junior Track", description: "Fun, visual learning with age-appropriate projects", ages: "9-11" },
  teen: { name: "Teen Track", description: "More complex challenges and real-world scenarios", ages: "12-14" },
  advanced: { name: "Advanced Track", description: "Professional-level projects and investor-ready pitches", ages: "15-16" }
};

const getAgeTrack = (age: number) => {
  if (age <= 11) return 'junior';
  if (age <= 14) return 'teen';
  return 'advanced';
};

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const tierSlug = searchParams.get("tier") || "revolution-start";
  const ageParam = searchParams.get("age");
  const navigate = useNavigate();
  const { user } = useAuth();
  const { student, refetch: refetchStudent } = useStudent();
  
  const { data: tier, isLoading } = usePricingTier(tierSlug);
  const [billingPeriod, setBillingPeriod] = useState<"yearly" | "monthly">("yearly");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAge, setSelectedAge] = useState<string>(ageParam || "");
  
  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<ScholarshipCode | null>(null);
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);
  const [couponError, setCouponError] = useState("");

  const content = tierContent[tierSlug] || tierContent['revolution-start'];
  const isAdultTier = content.isAdult || false;
  const selectedAgeNum = selectedAge ? parseInt(selectedAge) : null;
  const selectedTrack = selectedAgeNum ? getAgeTrack(selectedAgeNum) : null;

  // Demo/test bypass coupons that skip database validation
  const DEMO_COUPONS: Record<string, ScholarshipCode> = {
    'DEMO100': {
      id: 'demo-100-bypass',
      code: 'DEMO100',
      discount_amount: 100,
      discount_type: 'percentage',
      applicable_tiers: [] // Empty = applies to all tiers
    },
    'TEST-MONDAY': {
      id: 'test-monday-bypass',
      code: 'TEST-MONDAY',
      discount_amount: 100,
      discount_type: 'percentage',
      applicable_tiers: []
    },
    'SCHOOL50': {
      id: 'school-50-bypass',
      code: 'SCHOOL50',
      discount_amount: 50,
      discount_type: 'percentage',
      applicable_tiers: []
    }
  };

  // Validate and apply coupon
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    
    setIsValidatingCoupon(true);
    setCouponError("");
    
    const upperCode = couponCode.trim().toUpperCase();
    
    // Check for demo/test bypass coupons first
    if (DEMO_COUPONS[upperCode]) {
      setAppliedCoupon(DEMO_COUPONS[upperCode]);
      toast.success(`Demo coupon applied! ${DEMO_COUPONS[upperCode].discount_amount}% off`);
      setIsValidatingCoupon(false);
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from("scholarship_codes")
        .select("*")
        .eq("code", upperCode)
        .eq("is_active", true)
        .single();
      
      if (error || !data) {
        setCouponError("Invalid or expired coupon code");
        setAppliedCoupon(null);
        return;
      }
      
      if (data.applicable_tiers && data.applicable_tiers.length > 0 && 
          !data.applicable_tiers.includes(tierSlug)) {
        setCouponError("This coupon doesn't apply to this plan");
        setAppliedCoupon(null);
        return;
      }
      
      if (data.max_uses && data.current_uses >= data.max_uses) {
        setCouponError("This coupon has reached its usage limit");
        setAppliedCoupon(null);
        return;
      }
      
      if (data.expires_at && new Date(data.expires_at) < new Date()) {
        setCouponError("This coupon has expired");
        setAppliedCoupon(null);
        return;
      }
      
      setAppliedCoupon(data as ScholarshipCode);
      toast.success(`Coupon applied! ${data.discount_amount}${data.discount_type === 'percentage' ? '%' : '$'} off`);
    } catch (err) {
      setCouponError("Error validating coupon");
    } finally {
      setIsValidatingCoupon(false);
    }
  };

  const getCurrentPrice = () => {
    if (!tier) return 0;
    if (tier.billing_period === "yearly" && tier.monthly_price) {
      return billingPeriod === "yearly" ? tier.current_price : tier.monthly_price;
    }
    return tier.current_price;
  };

  const getFinalPrice = () => {
    const basePrice = getCurrentPrice();
    if (!appliedCoupon) return basePrice;
    
    if (appliedCoupon.discount_type === 'percentage') {
      return Math.max(0, basePrice - (basePrice * appliedCoupon.discount_amount / 100));
    }
    return Math.max(0, basePrice - appliedCoupon.discount_amount);
  };

  const handleCheckout = async () => {
    if (!user) {
      const returnUrl = `/checkout?tier=${tierSlug}${selectedAge ? `&age=${selectedAge}` : ''}`;
      navigate(`/login?redirect=${encodeURIComponent(returnUrl)}`);
      return;
    }

    setIsProcessing(true);
    
    const finalPrice = getFinalPrice();
    
    if (finalPrice === 0 && appliedCoupon) {
      try {
        await supabase
          .from("scholarship_codes")
          .update({ current_uses: (appliedCoupon as any).current_uses + 1 })
          .eq("id", appliedCoupon.id);
        
        let studentId: string | null = null;
        
        const { data: existingStudent } = await supabase
          .from("students")
          .select("id")
          .eq("user_id", user.id)
          .maybeSingle();
        
        if (existingStudent) {
          studentId = existingStudent.id;
          const updateData: Record<string, any> = {
            updated_at: new Date().toISOString(),
            pricing_tier_id: tier?.id, // Set pricing tier for entitlements
          };
          
          if (isAdultTier) {
            updateData.audience_type = tierSlug === 'professional-builder' ? 'professional' : 'college';
            updateData.program = tierSlug === 'professional-builder' ? 'professional' : 'college';
          } else if (selectedAge) {
            updateData.age = parseInt(selectedAge);
          }
          
          await supabase
            .from("students")
            .update(updateData)
            .eq("id", studentId);
        } else {
          let insertAge: number;
          let insertProgram: string;
          let insertAudienceType: string | undefined;
          
          if (isAdultTier) {
            insertAge = 20; // Default adult age
            insertProgram = tierSlug === 'professional-builder' ? 'professional' : 'college';
            insertAudienceType = tierSlug === 'professional-builder' ? 'professional' : 'college';
          } else {
            insertAge = selectedAge ? parseInt(selectedAge) : 12;
            insertProgram = insertAge <= 11 ? 'junior' : insertAge <= 14 ? 'teen' : 'advanced';
          }
          
          const { data: newStudent, error: createError } = await supabase
            .from("students")
            .insert([{
              user_id: user.id,
              full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Student',
              age: insertAge,
              program: insertProgram,
              pricing_tier_id: tier?.id, // Set pricing tier for entitlements
              ...(insertAudienceType && { audience_type: insertAudienceType }),
            }])
            .select("id")
            .single();
          
          if (createError) throw createError;
          studentId = newStudent?.id;
        }
        
        if (studentId) {
          await supabase
            .from("enrollments")
            .insert({
              user_id: user.id,
              student_id: studentId,
              pricing_tier_id: tier?.id,
              status: "active",
              total_amount: tier?.current_price || 0,
              discount_applied: appliedCoupon.discount_amount,
              amount_paid: 0,
              payment_type: "coupon",
              enrolled_at: new Date().toISOString(),
              starts_at: new Date().toISOString(),
            });
        }
        
        toast.success("Welcome! Your access has been activated.");
        await refetchStudent();
        
        // Redirect based on tier type
        if (isAdultTier) {
          navigate('/pro/onboarding');
        } else {
          navigate(`/dashboard${selectedAge ? `?age=${selectedAge}` : ''}`);
        }
        return;
      } catch (err) {
        console.error("Error processing free enrollment:", err);
        toast.error("Something went wrong. Please try again.");
        setIsProcessing(false);
        return;
      }
    }
    
    toast.info("Stripe integration coming soon! For now, use coupon code DEMO100 to test.");
    setIsProcessing(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!tier) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Choose Your Path</h1>
          <p className="text-muted-foreground mb-6">Select a program to continue</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={() => navigate("/ai-foundations")} variant="outline">
              FIRST STEP — $19
            </Button>
            <Button onClick={() => navigate("/ai-builder")} variant="outline">
              FULL FOUNDATION — $99/year
            </Button>
            <Button onClick={() => navigate("/ai-launcher")}>
              ACCELERATOR — $290
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const tierFeatures = (tier.features || {}) as PricingTierFeatures;
  
  const getBillingLabel = () => {
    if (tier.billing_period === "yearly" && tier.monthly_price) {
      return billingPeriod === "yearly" ? "/year" : "/month";
    }
    if (tier.billing_period === "one-time") return " one-time";
    return `/${tier.billing_period}`;
  };

  const isLiveCohort = tier.slug === 'live-cohort';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1C] via-background to-[#0D1321]">
      {/* Header */}
      <div className="border-b border-border/10 bg-background/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/pricing")}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to pricing
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Tier Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn("rounded-2xl p-8 mb-8 bg-gradient-to-r", content.bgGradient, "border border-border/20")}
        >
          <div className="flex items-start gap-4">
            <div className={cn("p-3 rounded-xl bg-background/50", content.accentColor)}>
              {content.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">{tier.name}</h1>
                {tier.badge_text && (
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    {tier.badge_text}
                  </Badge>
                )}
              </div>
              <p className={cn("text-lg font-medium mb-2", content.accentColor)}>{content.tagline}</p>
              <p className="text-muted-foreground">{content.description}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Column - What You Get */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Key Highlights */}
            <Card className="border-border/20 bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Star className="w-5 h-5 text-amber-400" />
                  What You Get
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-3">
                  {content.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                      <Check className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Live Cohort Special Info */}
            {isLiveCohort && (
              <Card className="border-emerald-500/30 bg-emerald-500/5">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Calendar className="w-8 h-8 text-emerald-400 shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">First Cohort: February 2026</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        6 live sessions over 3 weekends (Feb 21 - Mar 7, 2026).
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">Live Classes</Badge>
                        <Badge variant="outline" className="text-xs">Demo Day</Badge>
                        <Badge variant="outline" className="text-xs">Investor Feedback</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Certificate Progression */}
            <Card className="border-border/20 bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  Certificates You'll Earn
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tier.certificates_included?.includes("prompt-engineering-fundamentals") && (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm">1</div>
                      <div>
                        <p className="font-medium text-foreground">AI Foundations Certificate</p>
                        <p className="text-xs text-muted-foreground">Master prompt engineering & AI basics</p>
                      </div>
                    </div>
                  )}
                  {tier.certificates_included?.includes("ai-founders-certificate") && (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                      <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-sm">2</div>
                      <div>
                        <p className="font-medium text-foreground">AI Builder Certificate</p>
                        <p className="text-xs text-muted-foreground">Complete the full 12-week curriculum</p>
                      </div>
                    </div>
                  )}
                  {tier.certificates_included?.includes("ai-launcher") && (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm">3</div>
                      <div>
                        <p className="font-medium text-foreground">AI Launcher Certificate</p>
                        <p className="text-xs text-muted-foreground">Present at Demo Day & launch your business</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Platform Features */}
            <Card className="border-border/20 bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Zap className="w-5 h-5 text-primary" />
                  Platform Access
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">
                        {tier.trial_days > 0 ? `${tier.trial_days} days access` : tier.includes_yearly_access ? "Full year access" : "Platform access"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">
                        AI Coach: {tierFeatures.ai_coach_daily === -1 ? "Unlimited" : `${tierFeatures.ai_coach_daily}/day`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Rocket className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">
                        THE TANK: {tierFeatures.tank_weekly === -1 ? "Unlimited" : `${tierFeatures.tank_weekly}/week`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">
                        {tierFeatures.curriculum_access === "full" ? "Full curriculum" : "Curriculum preview"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Payment */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <Card className="border-border/20 bg-card/50 backdrop-blur-sm sticky top-24">
              <CardHeader className="pb-4">
                <CardTitle>Complete Purchase</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Price Display */}
                <div className="text-center p-4 rounded-xl bg-background/50">
                  <div className="flex items-baseline justify-center gap-2">
                    {tier.original_price && (
                      <span className="text-lg text-muted-foreground line-through">
                        ${tier.original_price}
                      </span>
                    )}
                    <span className="text-4xl font-bold text-foreground">${getCurrentPrice()}</span>
                    <span className="text-muted-foreground">{getBillingLabel()}</span>
                  </div>
                  {appliedCoupon && (
                    <p className="text-emerald-400 text-sm mt-2">
                      Final price: ${getFinalPrice().toFixed(2)}
                    </p>
                  )}
                </div>

                {/* Billing Period Toggle */}
                {tier.billing_period === "yearly" && tier.monthly_price && (
                  <div className="space-y-3">
                    <Label className="text-sm">Billing Period</Label>
                    <RadioGroup
                      value={billingPeriod}
                      onValueChange={(v) => setBillingPeriod(v as "yearly" | "monthly")}
                      className="grid grid-cols-2 gap-3"
                    >
                      <div>
                        <RadioGroupItem value="yearly" id="yearly" className="peer sr-only" />
                        <Label
                          htmlFor="yearly"
                          className="flex flex-col items-center justify-center rounded-lg border-2 border-border bg-background p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer text-center"
                        >
                          <span className="font-semibold text-sm">${tier.current_price}/year</span>
                          <span className="text-xs text-emerald-400">Save 70%</span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="monthly" id="monthly" className="peer sr-only" />
                        <Label
                          htmlFor="monthly"
                          className="flex flex-col items-center justify-center rounded-lg border-2 border-border bg-background p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer text-center"
                        >
                          <span className="font-semibold text-sm">${tier.monthly_price}/month</span>
                          <span className="text-xs text-muted-foreground">Flexible</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {!user ? (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground mb-4 text-sm">
                      Sign in or create an account to continue
                    </p>
                    <Button 
                      onClick={() => {
                        const returnUrl = `/checkout?tier=${tierSlug}${selectedAge ? `&age=${selectedAge}` : ''}`;
                        navigate(`/login?redirect=${encodeURIComponent(returnUrl)}`);
                      }}
                      className="w-full"
                    >
                      Sign In / Create Account
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="bg-muted/30 rounded-lg p-3 text-center">
                      <p className="text-xs text-muted-foreground">
                        Signed in as <span className="font-medium text-foreground">{user.email}</span>
                      </p>
                    </div>

                    {/* Age Selection - Only for youth tiers */}
                    {!isAdultTier && !ageParam && (
                      <div className="space-y-3">
                        <Label className="text-sm">Student's Age</Label>
                        <div className="grid grid-cols-4 gap-2">
                          {(isLiveCohort ? [12, 13, 14, 15, 16, 17, 18] : [9, 10, 11, 12, 13, 14, 15, 16]).map((age) => (
                            <button
                              key={age}
                              onClick={() => setSelectedAge(age.toString())}
                              className={cn(
                                "p-3 rounded-lg border-2 text-center transition-all",
                                selectedAge === age.toString()
                                  ? "border-primary bg-primary/10 text-foreground"
                                  : "border-border bg-background hover:border-primary/50 text-muted-foreground"
                              )}
                            >
                              <span className="font-semibold">{age}</span>
                            </button>
                          ))}
                        </div>
                        {selectedTrack && (
                          <div className={cn(
                            "p-3 rounded-lg text-center",
                            selectedTrack === 'junior' ? "bg-blue-500/10 text-blue-400" :
                            selectedTrack === 'teen' ? "bg-amber-500/10 text-amber-400" :
                            "bg-emerald-500/10 text-emerald-400"
                          )}>
                            <p className="font-medium text-sm">{ageTrackInfo[selectedTrack].name}</p>
                            <p className="text-xs opacity-80">{ageTrackInfo[selectedTrack].description}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Coupon Code */}
                    <div className="space-y-2">
                      <Label className="text-sm">Promo / Scholarship Code</Label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Enter code"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                            disabled={!!appliedCoupon}
                            className="pl-9 uppercase bg-background"
                          />
                        </div>
                        <Button
                          variant="outline"
                          onClick={handleApplyCoupon}
                          disabled={!couponCode || !!appliedCoupon || isValidatingCoupon}
                          size="sm"
                        >
                          {isValidatingCoupon ? <Loader2 className="h-4 w-4 animate-spin" /> : "Apply"}
                        </Button>
                      </div>
                      {couponError && (
                        <p className="text-destructive text-xs">{couponError}</p>
                      )}
                      {appliedCoupon && (
                        <div className="flex items-center justify-between bg-emerald-500/10 text-emerald-400 px-3 py-2 rounded-lg">
                          <span className="text-sm font-medium">{appliedCoupon.code} applied!</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setAppliedCoupon(null);
                              setCouponCode("");
                            }}
                            className="h-auto p-1 text-emerald-400 hover:text-emerald-300"
                          >
                            Remove
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Complete Purchase Button */}
                    <Button
                      onClick={handleCheckout}
                      disabled={isProcessing || (!isAdultTier && !ageParam && !selectedAge)}
                      className="w-full h-12 text-base font-semibold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Complete Purchase — ${getFinalPrice().toFixed(0)}
                        </>
                      )}
                    </Button>

                    {/* Trust Badges */}
                    <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-2">
                      <span className="flex items-center gap-1">
                        <Shield className="w-3 h-3" /> Secure
                      </span>
                      <span>•</span>
                      <span>Instant Access</span>
                      <span>•</span>
                      <span>Cancel Anytime</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
