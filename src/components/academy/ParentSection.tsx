import { Card } from "@/components/ui/card";
import { Shield, TrendingUp, Users, CheckCircle, Sparkles } from "lucide-react";

export const ParentSection = () => {
  return (
    <section className="py-32 bg-muted/20">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-5xl font-bold text-center mb-4 tracking-tight">
          FOR <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">PARENTS</span>
        </h2>
        <p className="text-center text-xl text-muted-foreground mb-16 max-w-3xl mx-auto">
          Your child will learn skills that matter for the next 50 years
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="p-8">
            <Shield className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-2xl font-bold mb-3">Safe Learning Environment</h3>
            <p className="text-muted-foreground text-lg">
              Supervised online learning with vetted mentors and secure platforms. We prioritize your child's safety and privacy at every step.
            </p>
          </Card>

          <Card className="p-8">
            <TrendingUp className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-2xl font-bold mb-3">Weekly Progress Reports</h3>
            <p className="text-muted-foreground text-lg">
              Stay informed with detailed weekly updates on your child's progress, achievements, and areas of growth.
            </p>
          </Card>

          <Card className="p-8">
            <Users className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-2xl font-bold mb-3">Expert Mentor Support</h3>
            <p className="text-muted-foreground text-lg">
              Access to successful entrepreneurs and educators who guide your child through every challenge.
            </p>
          </Card>

          <Card className="p-8">
            <CheckCircle className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-2xl font-bold mb-3">Flexible Learning</h3>
            <p className="text-muted-foreground text-lg">
              Self-paced modules with weekly live sessions. Your child can learn at their own speed while staying connected with peers.
            </p>
          </Card>
        </div>

        <Card className="p-12 bg-gradient-to-br from-primary/10 to-transparent border-primary/30">
          <div className="max-w-3xl mx-auto text-center">
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4">Our Vision for Your Child</h3>
            <p className="text-xl text-muted-foreground mb-6">
              Imagine your child confidently presenting their first business idea. Picture them solving real problems, 
              asking "what if?", and building skills their peers won't develop for years.
            </p>
            <p className="text-lg text-muted-foreground">
              That's what we're building together at NEXT_. Our first cohort launches January 2025 — 
              be part of the founding class.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};
