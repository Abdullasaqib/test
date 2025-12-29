import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Check, Building2, GraduationCap, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { usePricingTiers } from "@/hooks/usePricingTiers";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function SchoolsPricing() {
  const { data: b2bTiers = [], isLoading } = usePricingTiers("b2b");
  const [studentCount, setStudentCount] = useState(50);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    school: "",
    role: "",
  });

  const getApplicableTier = () => {
    if (studentCount < 10) return b2bTiers.find(t => t.slug === "schools-pilot");
    if (studentCount < 100) return b2bTiers.find(t => t.slug === "schools-standard");
    if (studentCount < 1000) return b2bTiers.find(t => t.slug === "schools-volume");
    return b2bTiers.find(t => t.slug === "schools-enterprise");
  };

  const applicableTier = getApplicableTier();
  const totalCost = applicableTier ? applicableTier.current_price * studentCount : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! We'll be in touch within 24 hours.");
    setContactForm({ name: "", email: "", school: "", role: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />

      <main className="pt-24 pb-20">
        {/* Hero */}
        <section className="container mx-auto px-4 text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="mb-4">For Schools & Organizations</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Bring AI Entrepreneurship to Your School
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Volume pricing starting at $9/student. Train the next generation of founders.
            </p>
          </motion.div>
        </section>

        {/* Calculator */}
        <section className="container mx-auto px-4 mb-16">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Calculate Your Investment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <Label>Number of Students</Label>
                  <span className="font-semibold">{studentCount}</span>
                </div>
                <Slider
                  value={[studentCount]}
                  onValueChange={([value]) => setStudentCount(value)}
                  min={1}
                  max={2000}
                  step={1}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>1</span>
                  <span>500</span>
                  <span>1000</span>
                  <span>2000+</span>
                </div>
              </div>

              {applicableTier && (
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-muted-foreground">Your Tier</span>
                    <Badge>{applicableTier.name}</Badge>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-muted-foreground">Per Student</span>
                    <span className="font-semibold">${applicableTier.current_price}</span>
                  </div>
                  <div className="border-t border-border pt-2 mt-2 flex items-center justify-between">
                    <span className="font-semibold">Total Investment</span>
                    <span className="text-2xl font-bold text-primary">
                      ${totalCost.toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Tier Cards */}
        <section className="container mx-auto px-4 mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Volume Pricing Tiers</h2>
          
          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {b2bTiers.map((tier, index) => (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={cn(
                    "relative h-full",
                    tier.badge_text === "BEST VALUE" && "border-primary ring-2 ring-primary/20"
                  )}>
                    {tier.badge_text && (
                      <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                        {tier.badge_text}
                      </Badge>
                    )}
                    
                    <CardHeader className="text-center pt-8">
                      <CardTitle className="text-lg">{tier.name}</CardTitle>
                      <div className="mt-2">
                        <span className="text-3xl font-bold">${tier.current_price}</span>
                        <span className="text-muted-foreground">/student</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {tier.min_students ? `${tier.min_students}+` : "1-10"} students
                      </p>
                    </CardHeader>

                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          Full curriculum access
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          Both certificates
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          School dashboard
                        </li>
                        {tier.features.priority_support && (
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            Priority support
                          </li>
                        )}
                        {tier.features.custom_implementation && (
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            Custom implementation
                          </li>
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Benefits */}
        <section className="container mx-auto px-4 mb-16">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Curriculum Aligned</h3>
              <p className="text-sm text-muted-foreground">
                Standards-aligned curriculum that integrates with existing programs.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">School Dashboard</h3>
              <p className="text-sm text-muted-foreground">
                Track student progress, identify at-risk students, and generate reports.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Teacher Training</h3>
              <p className="text-sm text-muted-foreground">
                Free training for educators to facilitate the program effectively.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="container mx-auto px-4">
          <Card className="max-w-xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Get in Touch
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="school">School/Organization</Label>
                  <Input
                    id="school"
                    value={contactForm.school}
                    onChange={(e) => setContactForm({ ...contactForm, school: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="role">Your Role</Label>
                  <Input
                    id="role"
                    value={contactForm.role}
                    onChange={(e) => setContactForm({ ...contactForm, role: e.target.value })}
                    placeholder="e.g., Principal, Curriculum Director"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Request Information
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
