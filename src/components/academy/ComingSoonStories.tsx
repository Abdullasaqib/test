import { Card } from "@/components/ui/card";
import { GlowingButton } from "@/components/ui/glowing-button";
import { Clock, Bell } from "lucide-react";

export const ComingSoonStories = () => {
  return (
    <section className="py-32 bg-muted/20">
      <div className="container mx-auto max-w-4xl px-4 text-center">
        <Clock className="w-16 h-16 text-[hsl(var(--gold))] mx-auto mb-6" />
        <h2 className="text-4xl font-bold mb-4 tracking-tight">
          SUCCESS STORIES <span className="holographic-text">COMING SOON</span>
        </h2>
        <p className="text-xl text-muted-foreground mb-8">
          Our first cohort launches January 2026. Check back for inspiring student success stories.
        </p>

        <Card className="p-12 bg-gradient-to-br from-background to-muted/50">
          <Bell className="w-12 h-12 text-[hsl(var(--gold))] mx-auto mb-6" />
          <h3 className="text-2xl font-bold mb-4">Be the First to Know</h3>
          <p className="text-muted-foreground mb-6">
            Get notified when our first graduates share their entrepreneurial journeys and revenue milestones.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
            <GlowingButton variant="cyber">
              Notify Me
            </GlowingButton>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            We'll only send you updates about student achievements and program milestones.
          </p>
        </Card>
      </div>
    </section>
  );
};
