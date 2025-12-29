import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function Typography() {
  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">Typography</h2>
        <p className="text-muted-foreground">Inter font family across all weights</p>
      </div>

      <Card className="glass-card border-border/50">
        <CardContent className="p-6 space-y-8">
          {/* Font Family */}
          <div>
            <h3 className="text-sm font-medium text-primary mb-4 uppercase tracking-wider">Font Family</h3>
            <p className="text-5xl font-bold text-foreground">Inter</p>
            <p className="text-muted-foreground mt-2">
              A clean, modern sans-serif typeface optimized for screen readability
            </p>
          </div>

          {/* Font Weights */}
          <div>
            <h3 className="text-sm font-medium text-primary mb-4 uppercase tracking-wider">Font Weights</h3>
            <div className="space-y-3">
              <div className="flex items-baseline gap-4">
                <span className="w-28 text-sm text-muted-foreground">Regular 400</span>
                <span className="font-normal text-xl text-foreground">The quick brown fox jumps</span>
              </div>
              <div className="flex items-baseline gap-4">
                <span className="w-28 text-sm text-muted-foreground">Medium 500</span>
                <span className="font-medium text-xl text-foreground">The quick brown fox jumps</span>
              </div>
              <div className="flex items-baseline gap-4">
                <span className="w-28 text-sm text-muted-foreground">Semibold 600</span>
                <span className="font-semibold text-xl text-foreground">The quick brown fox jumps</span>
              </div>
              <div className="flex items-baseline gap-4">
                <span className="w-28 text-sm text-muted-foreground">Bold 700</span>
                <span className="font-bold text-xl text-foreground">The quick brown fox jumps</span>
              </div>
            </div>
          </div>

          {/* Type Scale */}
          <div>
            <h3 className="text-sm font-medium text-primary mb-4 uppercase tracking-wider">Type Scale</h3>
            <div className="space-y-4">
              <div className="border-b border-border/50 pb-4">
                <span className="text-xs text-primary block mb-1">Display - 48px / Bold</span>
                <p className="text-5xl font-bold text-foreground">Build the Future</p>
              </div>
              <div className="border-b border-border/50 pb-4">
                <span className="text-xs text-primary block mb-1">H1 - 36px / Bold</span>
                <p className="text-4xl font-bold text-foreground">Next Billion Lab</p>
              </div>
              <div className="border-b border-border/50 pb-4">
                <span className="text-xs text-primary block mb-1">H2 - 30px / Semibold</span>
                <p className="text-3xl font-semibold text-foreground">12-Week Founder Journey</p>
              </div>
              <div className="border-b border-border/50 pb-4">
                <span className="text-xs text-primary block mb-1">H3 - 24px / Semibold</span>
                <p className="text-2xl font-semibold text-foreground">Launch Your Startup</p>
              </div>
              <div className="border-b border-border/50 pb-4">
                <span className="text-xs text-primary block mb-1">Body - 16px / Regular</span>
                <p className="text-base text-foreground">Learn entrepreneurship through hands-on missions, AI tools, and live mentorship.</p>
              </div>
              <div>
                <span className="text-xs text-primary block mb-1">Caption - 14px / Regular</span>
                <p className="text-sm text-muted-foreground">Ages 9-16 • 12 Weeks • Live Classes</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
