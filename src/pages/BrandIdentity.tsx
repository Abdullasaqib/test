// Brand Identity Page - World-class brand guide
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  AIToolShowcase,
  BrandStory, 
  TaglineSystem, 
  BrandVoice, 
  LogoGeneratorSection, 
  ColorPalette, 
  Typography, 
  UsageGuidelines,
  SocialMediaKit,
  BrandGlossary,
  BrandAssets 
} from '@/components/brand';

export default function BrandIdentity() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 glass-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-foreground">Next Billion Lab</h1>
              <p className="text-sm text-muted-foreground">Brand & Identity Guide</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-16">
        {/* Hero */}
        <section className="text-center py-12 relative">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent rounded-3xl" />
          
          <div className="relative">
            {/* 1→1B Symbol */}
            <div className="mb-6">
              <span className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary via-primary to-gold bg-clip-text text-transparent">
                1→1B
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Brand & Identity
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              The complete brand guide for Next Billion Lab. Story, voice, visuals, and assets—everything you need for consistent brand expression.
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="glass-card px-4 py-2 rounded-full border border-border/50">
                <span className="text-muted-foreground">Primary:</span>{' '}
                <span className="text-primary font-semibold">Electric Blue</span>
              </div>
              <div className="glass-card px-4 py-2 rounded-full border border-border/50">
                <span className="text-muted-foreground">Accent:</span>{' '}
                <span className="text-gold font-semibold">Warm Gold</span>
              </div>
              <div className="glass-card px-4 py-2 rounded-full border border-border/50">
                <span className="text-muted-foreground">Font:</span>{' '}
                <span className="text-foreground font-semibold">Inter</span>
              </div>
            </div>
          </div>
        </section>

        {/* AI Tool Showcase */}
        <AIToolShowcase />

        <div className="border-t border-border/50" />

        {/* Brand Story */}
        <BrandStory />

        <div className="border-t border-border/50" />

        {/* Tagline System */}
        <TaglineSystem />

        <div className="border-t border-border/50" />

        {/* Brand Voice */}
        <BrandVoice />

        <div className="border-t border-border/50" />

        {/* Logo Generator */}
        <LogoGeneratorSection />

        <div className="border-t border-border/50" />

        {/* Usage Guidelines */}
        <UsageGuidelines />

        <div className="border-t border-border/50" />

        {/* Color Palette */}
        <ColorPalette />

        <div className="border-t border-border/50" />

        {/* Typography */}
        <Typography />

        <div className="border-t border-border/50" />

        {/* Social Media Kit */}
        <SocialMediaKit />

        <div className="border-t border-border/50" />

        {/* Brand Glossary */}
        <BrandGlossary />

        <div className="border-t border-border/50" />

        {/* Brand Assets */}
        <BrandAssets />
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 mt-12 glass-card">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Next Billion Lab. All rights reserved.</p>
          <p className="mt-2 text-primary font-medium">Build the Future.</p>
        </div>
      </footer>
    </div>
  );
}
