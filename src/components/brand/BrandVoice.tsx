import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X, MessageCircle, Megaphone, HeartHandshake } from 'lucide-react';

const VOICE_ATTRIBUTES = [
  {
    title: 'Empowering',
    description: 'We believe in our students. Every message should make them feel capable and confident.',
    example: "You've got this! Your idea is stronger than you think."
  },
  {
    title: 'Aspirational',
    description: 'We paint a picture of what is possible. Dream big, then build bigger.',
    example: 'The next billion-dollar founder could be you.'
  },
  {
    title: 'Human',
    description: 'Warm, approachable, never corporate or robotic. We talk TO kids, not AT them.',
    example: 'Hey there, future founder! Ready to crush it today?'
  }
];

const TONE_CONTEXTS = [
  {
    icon: Megaphone,
    context: 'Marketing',
    tone: 'Bold, punchy, action-oriented',
    examples: [
      "Jobs won't be taken by AI. They'll be taken by people who know AI.",
      "Build the future. Don't just watch it happen.",
      '12 weeks from student to founder.'
    ]
  },
  {
    icon: MessageCircle,
    context: 'Product',
    tone: 'Encouraging, supportive, celebratory',
    examples: [
      'Amazing work! Your pitch is getting sharper every time.',
      "You're on fire! 5-day streak—keep that momentum!",
      "Ready to face the sharks? You've got this!"
    ]
  },
  {
    icon: HeartHandshake,
    context: 'Support',
    tone: 'Warm, patient, understanding',
    examples: [
      "No worries—everyone gets stuck sometimes. Let's figure this out together.",
      "Great question! Here's how we can help...",
      'We hear you. Let me make this right.'
    ]
  }
];

const DOS_AND_DONTS = {
  dos: [
    "Use 'you' and 'your' liberally—it's personal",
    'Celebrate wins with emojis',
    "Use contractions (we're, you've, don't)",
    'Ask questions to engage',
    'Use action verbs (build, launch, create)',
    'Be specific with praise',
    'Make it feel like a conversation'
  ],
  donts: [
    "Say 'users' or 'learners'—they're founders",
    'Be condescending or overly simple',
    'Use corporate jargon (leverage, synergy, optimize)',
    'Sound robotic or formal',
    'Use passive voice when active works',
    'Be vague or generic',
    'Talk down to young people'
  ]
};

export function BrandVoice() {
  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">Brand Voice</h2>
        <p className="text-muted-foreground">How we sound across every touchpoint—consistent, human, empowering</p>
      </div>

      {/* Voice Attributes */}
      <div className="grid md:grid-cols-3 gap-6">
        {VOICE_ATTRIBUTES.map((attr) => (
          <Card key={attr.title} className="glass-card border border-border/50">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">{attr.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{attr.description}</p>
              <div className="bg-primary/10 p-3 rounded-lg border-l-4 border-primary">
                <p className="text-sm italic text-foreground">{attr.example}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tone by Context */}
      <Card className="glass-card border border-border/50">
        <CardHeader>
          <CardTitle className="text-foreground">Tone by Context</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {TONE_CONTEXTS.map((context) => (
              <div key={context.context} className="space-y-4">
                <div className="flex items-center gap-2">
                  <context.icon className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold text-foreground">{context.context}</h4>
                </div>
                <Badge variant="secondary" className="bg-primary/20 text-primary border-0">
                  {context.tone}
                </Badge>
                <div className="space-y-2">
                  {context.examples.map((example, i) => (
                    <p key={i} className="text-sm text-muted-foreground italic border-l-2 border-border pl-3">
                      {example}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dos and Donts */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="glass-card border border-emerald-500/30 bg-emerald-500/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-400">
              <Check className="w-5 h-5" />
              Do This
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {DOS_AND_DONTS.dos.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-emerald-300">
                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="glass-card border border-red-500/30 bg-red-500/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <X className="w-5 h-5" />
              Avoid This
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {DOS_AND_DONTS.donts.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-red-300">
                  <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
