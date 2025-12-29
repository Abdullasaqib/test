import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Instagram, Twitter, Linkedin, Youtube, Facebook } from 'lucide-react';

const SOCIAL_SPECS = [
  {
    platform: 'Instagram',
    icon: Instagram,
    profile: '320x320px',
    cover: 'N/A',
    post: '1080x1080px',
    story: '1080x1920px',
    color: 'bg-gradient-to-br from-purple-500 to-pink-500'
  },
  {
    platform: 'Twitter/X',
    icon: Twitter,
    profile: '400x400px',
    cover: '1500x500px',
    post: '1200x675px',
    story: 'N/A',
    color: 'bg-white'
  },
  {
    platform: 'LinkedIn',
    icon: Linkedin,
    profile: '400x400px',
    cover: '1128x191px',
    post: '1200x627px',
    story: 'N/A',
    color: 'bg-blue-600'
  },
  {
    platform: 'YouTube',
    icon: Youtube,
    profile: '800x800px',
    cover: '2560x1440px',
    post: '1280x720px (thumbnail)',
    story: 'N/A',
    color: 'bg-red-600'
  },
  {
    platform: 'Facebook',
    icon: Facebook,
    profile: '320x320px',
    cover: '820x312px',
    post: '1200x630px',
    story: '1080x1920px',
    color: 'bg-blue-500'
  }
];

const CONTENT_TEMPLATES = [
  {
    type: 'Announcement',
    format: '[Big News] + Hook + CTA',
    example: 'January 2025 cohort is NOW OPEN! Build the future with AI. Only 50 spots. Link in bio.'
  },
  {
    type: 'Inspiration',
    format: 'Quote or statement + Hashtag',
    example: '"Jobs won\'t be taken by AI. They\'ll be taken by people who know AI." #BuildTheFuture'
  },
  {
    type: 'Student Win',
    format: 'Celebrate + Name + Achievement + Praise',
    example: 'Shoutout to Maya (age 12) who just launched her first app! From idea to live in 3 weeks. This is what AI entrepreneurship looks like.'
  },
  {
    type: 'Educational',
    format: 'Hook question + Insight + CTA',
    example: 'What if your kid could build an app before they could drive? With AI, they can. Here\'s how → [link]'
  },
  {
    type: 'Behind the Scenes',
    format: 'Peek + Context + Human element',
    example: 'Sneak peek of our live demo day! These 12-year-olds just pitched to our investor panel. (Yes, they crushed it.)'
  }
];

const HASHTAGS = {
  primary: ['#NextBillionLab', '#BuildTheFuture'],
  secondary: ['#YoungFounders', '#AIEntrepreneurship', '#FutureOfEducation'],
  situational: ['#KidsWhoCode', '#VibeCoding', '#StudentStartup', '#TeenFounder']
};

export function SocialMediaKit() {
  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">Social Media Kit</h2>
        <p className="text-muted-foreground">Specifications, templates, and guidelines for social presence</p>
      </div>

      {/* Platform Specs */}
      <Card className="glass-card border-border/50 overflow-hidden">
        <CardHeader>
          <CardTitle>Platform Specifications</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-card/50 border-b border-border/50">
                <tr>
                  <th className="text-left p-4 font-semibold text-foreground">Platform</th>
                  <th className="text-left p-4 font-semibold text-foreground">Profile</th>
                  <th className="text-left p-4 font-semibold text-foreground">Cover</th>
                  <th className="text-left p-4 font-semibold text-foreground">Post</th>
                  <th className="text-left p-4 font-semibold text-foreground">Story</th>
                </tr>
              </thead>
              <tbody>
                {SOCIAL_SPECS.map((spec) => (
                  <tr key={spec.platform} className="border-b border-border/50 hover:bg-card/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg ${spec.color} flex items-center justify-center`}>
                          <spec.icon className={`w-4 h-4 ${spec.platform === 'Twitter/X' ? 'text-black' : 'text-white'}`} />
                        </div>
                        <span className="font-medium text-foreground">{spec.platform}</span>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground text-sm">{spec.profile}</td>
                    <td className="p-4 text-muted-foreground text-sm">{spec.cover}</td>
                    <td className="p-4 text-muted-foreground text-sm">{spec.post}</td>
                    <td className="p-4 text-muted-foreground text-sm">{spec.story}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Content Templates */}
      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle>Content Templates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {CONTENT_TEMPLATES.map((template) => (
            <div key={template.type} className="p-4 glass-card rounded-lg border border-border/50 space-y-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary/20 text-primary border-primary/30">{template.type}</Badge>
                <span className="text-sm text-muted-foreground">{template.format}</span>
              </div>
              <p className="text-foreground italic">"{template.example}"</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Hashtags */}
      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle>Official Hashtags</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Primary (always use):</p>
            <div className="flex flex-wrap gap-2">
              {HASHTAGS.primary.map((tag) => (
                <Badge key={tag} className="bg-primary text-primary-foreground">{tag}</Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Secondary:</p>
            <div className="flex flex-wrap gap-2">
              {HASHTAGS.secondary.map((tag) => (
                <Badge key={tag} className="bg-gold/20 text-gold border-gold/30">{tag}</Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Situational:</p>
            <div className="flex flex-wrap gap-2">
              {HASHTAGS.situational.map((tag) => (
                <Badge key={tag} variant="outline" className="border-border/50 text-muted-foreground">{tag}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
