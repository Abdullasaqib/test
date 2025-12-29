import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Check, X } from 'lucide-react';

const GLOSSARY_TERMS = [
  {
    term: 'Vibe Coding',
    category: 'Core Concept',
    definition: 'AI-assisted app building where students describe what they want to create and use AI tools to generate and refine code. Replaces traditional coding syntax with natural language prompts.',
    usage: '"In Week 5, students learn vibe coding to build their first MVP."',
    avoid: 'Don\'t say "AI coding" or "no-code" when referring to vibe coding specifically.'
  },
  {
    term: 'THE TANK',
    category: 'Feature',
    definition: 'Our Shark Tank-style pitch practice arena where students record pitches and receive AI-powered feedback from different investor personas. Scores on 5 dimensions and awards XP.',
    usage: '"Face THE TANK to practice your pitch before demo day!"',
    avoid: 'Don\'t say "Shark Tank" (trademarked) or "pitch simulator".'
  },
  {
    term: 'Founder DNA',
    category: 'Feature',
    definition: 'Our strength discovery engine that analyzes student work to identify their founder type (e.g., The Creative, The Analyst), superpowers, and growth edges.',
    usage: '"Your Founder DNA shows you\'re a natural problem-spotter!"',
    avoid: 'Don\'t say "personality test" or "assessment"—it\'s a strength discovery.'
  },
  {
    term: 'Mission',
    category: 'Curriculum',
    definition: 'A daily learning activity combining a micro-lesson (2-3 min), hands-on lab execution, and reflection. Each week has 5 missions building toward a tangible artifact.',
    usage: '"Today\'s mission: Interview your first customer."',
    avoid: 'Don\'t say "lesson" or "homework"—missions are action-oriented.'
  },
  {
    term: 'Artifact',
    category: 'Curriculum',
    definition: 'A tangible deliverable students create during their journey: problem cards, customer personas, landing pages, pitch decks, MVPs, etc.',
    usage: '"Your landing page artifact is looking amazing!"',
    avoid: 'Don\'t say "assignment" or "project"—artifacts are portfolio pieces.'
  },
  {
    term: 'Coach',
    category: 'Feature',
    definition: 'Our AI mentor that helps students brainstorm, problem-solve, and get feedback. Available 24/7 and personalized to each student\'s journey.',
    usage: '"Ask the Coach for help with your value proposition."',
    avoid: 'Don\'t say "AI Coach" externally—just "Coach" is more human.'
  },
  {
    term: 'Demo Day',
    category: 'Event',
    definition: 'The culminating event where students pitch their startups to a live audience of investors, mentors, and parents. The ultimate graduation moment.',
    usage: '"Demo Day is your moment to shine!"',
    avoid: 'Don\'t call it "graduation" or "final presentation".'
  },
  {
    term: 'Young Founder',
    category: 'Identity',
    definition: 'How we refer to our students. They\'re not learners or users—they\'re founders building real businesses.',
    usage: '"Every young founder in our program launches a real product."',
    avoid: 'Never say "kids", "students" (in marketing), or "learners".'
  },
  {
    term: 'Build the Future',
    category: 'Tagline',
    definition: 'Our primary brand tagline representing the action-oriented, aspirational nature of the program.',
    usage: 'Hero headlines, CTAs, email signatures.',
    avoid: 'Don\'t modify or add to it—use as is.'
  }
];

const CATEGORIES = ['Core Concept', 'Feature', 'Curriculum', 'Event', 'Identity', 'Tagline'];

const CATEGORY_COLORS: Record<string, string> = {
  'Core Concept': 'bg-primary/20 text-primary border-primary/30',
  'Feature': 'bg-gold/20 text-gold border-gold/30',
  'Curriculum': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Event': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'Identity': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  'Tagline': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
};

export function BrandGlossary() {
  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">Brand Glossary</h2>
        <p className="text-muted-foreground">Official definitions for consistent terminology across all materials</p>
      </div>

      {/* Quick Reference */}
      <Card className="glass-card border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <BookOpen className="w-5 h-5" />
            Quick Reference
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {GLOSSARY_TERMS.map((item) => (
              <Badge 
                key={item.term} 
                className={CATEGORY_COLORS[item.category]}
              >
                {item.term}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Full Glossary */}
      <div className="space-y-6">
        {CATEGORIES.map((category) => {
          const termsInCategory = GLOSSARY_TERMS.filter((t) => t.category === category);
          if (termsInCategory.length === 0) return null;
          
          return (
            <div key={category}>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Badge variant="outline" className="border-border/50">{category}</Badge>
              </h3>
              <div className="space-y-4">
                {termsInCategory.map((item) => (
                  <Card key={item.term} className="glass-card border-border/50 hover:border-primary/30 transition-colors">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl text-primary">{item.term}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-muted-foreground">{item.definition}</p>
                      <div className="p-3 rounded-lg border-l-4 border-green-500 bg-green-500/10">
                        <p className="text-sm text-green-400 flex items-start gap-2">
                          <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span><strong>Use:</strong> {item.usage}</span>
                        </p>
                      </div>
                      <div className="p-3 rounded-lg border-l-4 border-red-500 bg-red-500/10">
                        <p className="text-sm text-red-400 flex items-start gap-2">
                          <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span><strong>Avoid:</strong> {item.avoid}</span>
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
