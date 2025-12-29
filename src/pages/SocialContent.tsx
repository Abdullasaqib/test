import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  ArrowRight,
  Instagram,
  Linkedin,
  Twitter,
  MoreHorizontal,
  ThumbsUp,
  MessageCircle,
  Send,
  Share2,
  Globe
} from "lucide-react";

const carouselSlides = [
  {
    id: 1,
    type: "title",
    headline: "HOW WILL WE MEASURE SUCCESS IN 2035?",
    subtext: "5 shifts redefining what it means to win"
  },
  {
    id: 2,
    type: "shift",
    number: "01",
    today: "Position",
    future: "Purpose",
    todayDesc: "Job titles, corner offices, hierarchy climbing",
    futureDesc: "Meaningful impact, aligned work, value creation",
    insight: "Success is measured by the problems you solve, not the title on your door."
  },
  {
    id: 3,
    type: "shift",
    number: "02",
    today: "Income Maximization",
    future: "Time Autonomy",
    todayDesc: "Trading all hours for maximum earnings",
    futureDesc: "Designing schedules around life priorities",
    insight: "The richest currency isn't money—it's control over your own time."
  },
  {
    id: 4,
    type: "shift",
    number: "03",
    today: "Material Accumulation",
    future: "Life Design",
    todayDesc: "Houses, cars, luxury goods as markers",
    futureDesc: "Experiences, flexibility, intentional living",
    insight: "Ownership is becoming access. Experiences over possessions."
  },
  {
    id: 5,
    type: "shift",
    number: "04",
    today: "Busyness",
    future: "Wellbeing",
    todayDesc: "Packed calendars, hustle culture badges",
    futureDesc: "Mental health, sustainable rhythms, presence",
    insight: "Being busy isn't a badge of honor. Being well is."
  },
  {
    id: 6,
    type: "shift",
    number: "05",
    today: "Status Signaling",
    future: "Reputation",
    todayDesc: "Followers, likes, visible consumption",
    futureDesc: "Trust networks, real impact, authentic influence",
    insight: "Your reputation is built on what you do when no one's watching."
  },
  {
    id: 7,
    type: "cta",
    headline: "THE FUTURE BELONGS TO BUILDERS",
    subtext: "Start building your 2035 today"
  }
];

const storySlides = [
  { shift: "Purpose > Position", color: "from-blue-600 to-indigo-700", icon: "🎯" },
  { shift: "Time > Money", color: "from-emerald-500 to-teal-600", icon: "⏰" },
  { shift: "Life > Things", color: "from-amber-500 to-orange-600", icon: "✨" },
  { shift: "Wellbeing > Busyness", color: "from-rose-500 to-pink-600", icon: "🌿" },
  { shift: "Reputation > Status", color: "from-violet-500 to-purple-600", icon: "🌟" }
];

export default function SocialContent() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate("/academy")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Academy
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => navigate("/academy/success-2035")}>
                <Globe className="mr-2 h-4 w-4" />
                Full Vision
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate("/blog/success-2035-how-well-measure-achievement")}>
                Read Article
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-6">Content Series</Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Success in 2035
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Shareable visual content exploring how success is being redefined for the next generation of builders.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white border-0">
              <Instagram className="mr-1 h-3 w-3" />
              Instagram
            </Badge>
            <Badge className="bg-[#0A66C2] text-white border-0">
              <Linkedin className="mr-1 h-3 w-3" />
              LinkedIn
            </Badge>
            <Badge className="bg-foreground text-background border-0">
              <Twitter className="mr-1 h-3 w-3" />
              Twitter/X
            </Badge>
          </div>
        </div>
      </section>

      {/* Instagram Carousel Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 flex items-center justify-center">
              <Instagram className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Instagram Carousel</h2>
              <p className="text-muted-foreground text-sm">7 slides • Swipe to preview</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {carouselSlides.map((slide, index) => (
              <CarouselSlideCard key={slide.id} slide={slide} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Stories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center">
              <Instagram className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Instagram Stories</h2>
              <p className="text-muted-foreground text-sm">5 stories • Vertical format</p>
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
            {storySlides.map((story, index) => (
              <StoryCard key={index} story={story} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* LinkedIn Post Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-[#0A66C2] flex items-center justify-center">
              <Linkedin className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">LinkedIn Post</h2>
              <p className="text-muted-foreground text-sm">Professional format • Ready to post</p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <LinkedInPostMockup />
          </div>
        </div>
      </section>

      {/* Quick Stats Infographic */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Share2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Quick Stats Infographic</h2>
              <p className="text-muted-foreground text-sm">Shareable summary • All 5 shifts</p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <InfographicCard />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Build Your 2035?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
            Join the next generation of founders who are redefining success on their own terms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate("/pricing")}
            >
              Get Started — From $19
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => navigate("/academy/success-2035")}
            >
              Explore the Vision
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function CarouselSlideCard({ slide, index }: { slide: typeof carouselSlides[0]; index: number }) {
  if (slide.type === "title") {
    return (
      <Card className="aspect-square overflow-hidden group cursor-pointer hover:shadow-xl transition-all">
        <div className="h-full bg-gradient-to-br from-primary via-primary/90 to-primary/70 p-6 flex flex-col justify-between text-primary-foreground relative">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-32 h-32 border border-current rounded-full" />
            <div className="absolute bottom-8 left-8 w-20 h-20 border border-current rounded-full" />
            <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-current/50 rounded-full" />
            <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-current/30 rounded-full" />
          </div>
          <Badge variant="secondary" className="w-fit text-xs">Slide {index + 1}/7</Badge>
          <div className="space-y-3 relative z-10">
            <h3 className="text-xl md:text-2xl font-bold leading-tight">{slide.headline}</h3>
            <p className="text-sm opacity-80">{slide.subtext}</p>
          </div>
        </div>
      </Card>
    );
  }

  if (slide.type === "cta") {
    return (
      <Card className="aspect-square overflow-hidden group cursor-pointer hover:shadow-xl transition-all">
        <div className="h-full bg-gradient-to-br from-foreground to-foreground/80 p-6 flex flex-col justify-between text-background relative">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }} />
          </div>
          <Badge className="w-fit text-xs bg-background text-foreground">Slide {index + 1}/7</Badge>
          <div className="space-y-4 relative z-10">
            <h3 className="text-xl md:text-2xl font-bold leading-tight">{slide.headline}</h3>
            <p className="text-sm opacity-70">{slide.subtext}</p>
            <div className="flex items-center gap-2 text-xs font-medium">
              <span className="px-3 py-1.5 bg-background text-foreground rounded-full">@nextbillionlab</span>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="aspect-square overflow-hidden group cursor-pointer hover:shadow-xl transition-all">
      <div className="h-full bg-card p-5 flex flex-col relative">
        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline" className="text-xs font-mono">{slide.number}</Badge>
          <Badge variant="secondary" className="text-xs">Slide {index + 1}/7</Badge>
        </div>
        
        <div className="flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-3 rounded-lg bg-muted/50 border border-border">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">Today</span>
              <span className="font-semibold text-sm line-through opacity-60">{slide.today}</span>
            </div>
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
              <span className="text-[10px] uppercase tracking-wider text-primary block mb-1">2035</span>
              <span className="font-semibold text-sm text-primary">{slide.future}</span>
            </div>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground mb-4">
            <p className="line-through opacity-50">{slide.todayDesc}</p>
            <p className="text-foreground">{slide.futureDesc}</p>
          </div>
        </div>

        <div className="pt-3 border-t border-border">
          <p className="text-xs italic text-muted-foreground leading-relaxed">"{slide.insight}"</p>
        </div>
      </div>
    </Card>
  );
}

function StoryCard({ story, index }: { story: typeof storySlides[0]; index: number }) {
  return (
    <Card className="flex-shrink-0 w-[180px] aspect-[9/16] overflow-hidden snap-start cursor-pointer hover:shadow-xl transition-all group">
      <div className={`h-full bg-gradient-to-br ${story.color} p-4 flex flex-col justify-between text-white relative`}>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className={`flex-1 h-0.5 rounded-full ${i === index ? 'bg-white' : 'bg-white/30'}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2 mt-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
            NB
          </div>
          <span className="text-xs font-medium">nextbillionlab</span>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <span className="text-4xl mb-3">{story.icon}</span>
          <h3 className="text-lg font-bold leading-tight">{story.shift}</h3>
          <p className="text-xs opacity-80 mt-2">Success in 2035</p>
        </div>

        <div className="text-center">
          <div className="inline-flex flex-col items-center gap-1 text-xs opacity-80">
            <ArrowRight className="h-4 w-4 rotate-[-90deg] animate-bounce" />
            <span>Swipe up</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

function LinkedInPostMockup() {
  return (
    <Card className="overflow-hidden shadow-lg">
      <div className="p-4 flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
          NB
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Next Billion Lab</span>
            <span className="text-muted-foreground text-sm">• 1st</span>
          </div>
          <p className="text-sm text-muted-foreground">Building the next generation of tech founders | Ages 9-16</p>
          <p className="text-xs text-muted-foreground">1d • 🌐</p>
        </div>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>

      <div className="px-4 pb-3">
        <p className="text-sm leading-relaxed">
          <span className="font-semibold">How will we measure success in 2035?</span>
          <br /><br />
          The metrics are changing:
          <br /><br />
          📍 Purpose {'>'} Position<br />
          ⏰ Time Autonomy {'>'} Income Maximization<br />
          ✨ Life Design {'>'} Material Accumulation<br />
          🌿 Wellbeing {'>'} Busyness<br />
          🌟 Reputation {'>'} Status Signaling
          <br /><br />
          We're preparing young founders for this future—not the past.
          <br /><br />
          <span className="text-primary">#FutureOfWork #NextGenFounders #Success2035</span>
        </p>
      </div>

      <div className="aspect-video bg-gradient-to-br from-primary via-primary/90 to-primary/70 flex items-center justify-center text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-8 right-8 w-40 h-40 border-2 border-current rounded-full" />
          <div className="absolute bottom-12 left-12 w-24 h-24 border-2 border-current rounded-full" />
        </div>
        <div className="text-center relative z-10 px-8">
          <h3 className="text-2xl md:text-3xl font-bold mb-2">SUCCESS IN 2035</h3>
          <p className="text-sm opacity-80">5 shifts redefining what it means to win</p>
        </div>
      </div>

      <div className="px-4 py-2 flex items-center justify-between text-sm text-muted-foreground border-b border-border">
        <div className="flex items-center gap-1">
          <div className="flex -space-x-1">
            <span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-[10px]">👍</span>
            <span className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-[10px]">❤️</span>
            <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-[10px]">💡</span>
          </div>
          <span className="ml-1">247</span>
        </div>
        <span>32 comments • 18 reposts</span>
      </div>

      <div className="px-4 py-2 flex items-center justify-between">
        <Button variant="ghost" size="sm" className="text-muted-foreground flex-1">
          <ThumbsUp className="h-4 w-4 mr-2" />
          Like
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground flex-1">
          <MessageCircle className="h-4 w-4 mr-2" />
          Comment
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground flex-1">
          <Share2 className="h-4 w-4 mr-2" />
          Repost
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground flex-1">
          <Send className="h-4 w-4 mr-2" />
          Send
        </Button>
      </div>
    </Card>
  );
}

function InfographicCard() {
  const shifts = [
    { today: "Position", future: "Purpose", color: "bg-blue-500" },
    { today: "Income Max", future: "Time Autonomy", color: "bg-emerald-500" },
    { today: "Accumulation", future: "Life Design", color: "bg-amber-500" },
    { today: "Busyness", future: "Wellbeing", color: "bg-rose-500" },
    { today: "Status", future: "Reputation", color: "bg-violet-500" },
  ];

  return (
    <Card className="overflow-hidden">
      <div className="bg-foreground text-background p-6 text-center">
        <h3 className="text-2xl font-bold mb-1">THE 5 SHIFTS</h3>
        <p className="text-sm opacity-70">How Success is Being Redefined</p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-3 gap-4 mb-4 text-center">
          <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Today</div>
          <div></div>
          <div className="text-sm font-medium text-primary uppercase tracking-wider">2035</div>
        </div>

        <div className="space-y-3">
          {shifts.map((shift, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 items-center">
              <div className="text-right">
                <span className="text-sm text-muted-foreground line-through">{shift.today}</span>
              </div>
              <div className="flex justify-center">
                <div className={`w-8 h-8 rounded-full ${shift.color} flex items-center justify-center`}>
                  <ArrowRight className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="text-left">
                <span className="text-sm font-semibold text-foreground">{shift.future}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-muted/50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
            NB
          </div>
          <span className="text-sm font-medium">@nextbillionlab</span>
        </div>
        <span className="text-xs text-muted-foreground">nextbillionlab.com</span>
      </div>
    </Card>
  );
}
