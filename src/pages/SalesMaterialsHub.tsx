import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Download, 
  ExternalLink, 
  Calendar, 
  Globe, 
  Building2, 
  GraduationCap,
  Presentation,
  Users,
  Mail,
  Copy,
  Check,
  Play
} from "lucide-react";
import { toast } from "sonner";

interface Material {
  title: string;
  description: string;
  type: "pdf" | "page" | "video";
  url: string;
  downloadUrl?: string;
  category: string;
  audience: string[];
  isNew?: boolean;
  utmSource?: string;
}

const materials: Material[] = [
  // Government Briefings
  {
    title: "UAE Government Briefing",
    description: "Comprehensive pitch aligned with UAE Vision 2031 and National AI Strategy. Includes MOHRE workforce development integration.",
    type: "page",
    url: "/government-pitch",
    downloadUrl: "/UAE-Government-Briefing.html",
    category: "government",
    audience: ["UAE", "GCC"],
    isNew: true,
    utmSource: "uae"
  },
  {
    title: "Qatar Foundation Briefing",
    description: "Tailored for Qatar Foundation and QF member universities. Aligned with Qatar National Vision 2030.",
    type: "pdf",
    url: "/Qatar-Foundation-Briefing.html",
    downloadUrl: "/Qatar-Foundation-Briefing.html",
    category: "government",
    audience: ["Qatar"],
    utmSource: "qatar"
  },
  {
    title: "Sharjah Education Council",
    description: "Specific briefing for SPEA and Sharjah education ecosystem. K-12 focus with Arabic support roadmap.",
    type: "pdf",
    url: "/Sharjah-Education-Council-Briefing.html",
    downloadUrl: "/Sharjah-Education-Council-Briefing.html",
    category: "government",
    audience: ["UAE", "Sharjah"],
    utmSource: "sharjah"
  },
  {
    title: "Rwanda Government Briefing",
    description: "Aligned with Vision 2050 and digital transformation goals. Includes Africa expansion strategy.",
    type: "page",
    url: "/rwanda-pitch",
    downloadUrl: "/Rwanda-Government-Briefing.html",
    category: "government",
    audience: ["Rwanda", "Africa"],
    utmSource: "rwanda"
  },
  // School Materials
  {
    title: "School Pilot One-Pager",
    description: "Quick overview for school administrators. Includes pricing, timeline, and success metrics.",
    type: "pdf",
    url: "/School-Pilot-One-Pager.html",
    downloadUrl: "/School-Pilot-One-Pager.html",
    category: "schools",
    audience: ["Schools", "Principals"],
    utmSource: "school-pilot"
  },
  {
    title: "Schools Curriculum Guide",
    description: "Detailed curriculum breakdown with learning outcomes and standards alignment.",
    type: "page",
    url: "/schools/curriculum",
    category: "schools",
    audience: ["Teachers", "Curriculum Directors"],
    utmSource: "curriculum"
  },
  {
    title: "Schools Pricing",
    description: "Transparent pricing tiers for schools with volume discounts and enterprise options.",
    type: "page",
    url: "/schools/pricing",
    category: "schools",
    audience: ["Schools", "Procurement"],
    utmSource: "schools-pricing"
  },
  // Parent Materials
  {
    title: "Parent Information Sheet",
    description: "Everything parents need to know. Safety, learning outcomes, and time commitment.",
    type: "pdf",
    url: "/Parent-Info-Sheet.html",
    downloadUrl: "/Parent-Info-Sheet.html",
    category: "parents",
    audience: ["Parents", "Guardians"],
    utmSource: "parent-info"
  },
  {
    title: "Parents Page",
    description: "Comprehensive parent resource with FAQs, safety info, and enrollment guide.",
    type: "page",
    url: "/parents",
    category: "parents",
    audience: ["Parents"],
    utmSource: "parents"
  },
  // Investment Materials
  {
    title: "Base44 Investment Proposal",
    description: "Standalone investment deck with market analysis, traction, and financial projections.",
    type: "pdf",
    url: "/Base44-Proposal-Standalone.html",
    downloadUrl: "/Base44-Proposal-Standalone.html",
    category: "investors",
    audience: ["Investors", "VCs"],
    utmSource: "investor-deck"
  },
  {
    title: "Grant Application Narrative",
    description: "Foundation and grant application template with impact metrics and theory of change.",
    type: "pdf",
    url: "/Grant-Application-Narrative.html",
    downloadUrl: "/Grant-Application-Narrative.html",
    category: "investors",
    audience: ["Foundations", "Grant Makers"],
    utmSource: "grant"
  },
  {
    title: "Investor Pitch Page",
    description: "Interactive investor pitch with live demo integration and key metrics.",
    type: "page",
    url: "/investor-pitch",
    category: "investors",
    audience: ["Investors"],
    utmSource: "investor-pitch"
  },
  // Demo & Product
  {
    title: "Product Demo",
    description: "Full interactive demo of the student experience. No login required.",
    type: "page",
    url: "/demo",
    category: "demo",
    audience: ["All"],
    utmSource: "demo"
  },
  {
    title: "How It Works",
    description: "Step-by-step explanation of the learning methodology and AI integration.",
    type: "page",
    url: "/how-it-works",
    category: "demo",
    audience: ["All"],
    utmSource: "how-it-works"
  },
  {
    title: "Case Studies",
    description: "Real student success stories with before/after skill progression.",
    type: "page",
    url: "/case-studies",
    category: "demo",
    audience: ["All"],
    utmSource: "case-studies"
  }
];

const categories = [
  { id: "all", label: "All Materials", icon: FileText },
  { id: "government", label: "Government", icon: Building2 },
  { id: "schools", label: "Schools", icon: GraduationCap },
  { id: "parents", label: "Parents", icon: Users },
  { id: "investors", label: "Investors", icon: Presentation },
  { id: "demo", label: "Demo & Product", icon: Play }
];

const emailTemplates = [
  {
    name: "Cold Outreach - Government",
    subject: "AI Workforce Development Partnership - [Country] Alignment",
    preview: "Dear [Name], I noticed [Organization]'s commitment to...",
    fullText: `Dear [Name],

I noticed [Organization]'s commitment to developing future-ready talent aligned with [Vision/Strategy Name].

We've built NEXT, an AI-powered platform that teaches young people to build real products using AI—the exact skills your workforce will need by 2030.

Quick stats:
• 500+ students across 12 countries
• 85% complete the program (vs 15% industry average)
• Students build real, functional apps in 8 weeks

I'd love 15 minutes to show you how we're preparing the next generation for [Country]'s AI-driven economy.

Would [Date] work for a brief call?

Best regards,
[Your Name]`
  },
  {
    name: "Follow-up - No Response",
    subject: "Re: AI Workforce Development Partnership",
    preview: "Hi [Name], I wanted to follow up on my previous message...",
    fullText: `Hi [Name],

I wanted to follow up on my previous message about NEXT.

Since I last reached out, we've:
• Launched our first government pilot in [Country]
• Achieved [X] student completions
• Been featured in [Publication/Award]

I understand you're busy, but I believe this aligns perfectly with [Organization]'s goals. 

Even a 10-minute call could help determine if there's a fit.

Best,
[Your Name]`
  },
  {
    name: "School Principal Outreach",
    subject: "Preparing Your Students for the AI Economy",
    preview: "Dear [Principal Name], Your students will graduate into a world where...",
    fullText: `Dear [Principal Name],

Your students will graduate into a world where AI skills are as fundamental as reading and writing. The question isn't whether to prepare them—it's how.

NEXT is an AI-powered entrepreneurship program that teaches students to build real products using AI. It's not coding bootcamp. It's not another STEM class. It's practical, project-based learning that develops:

• Critical thinking through real problem-solving
• AI literacy through hands-on building
• Entrepreneurial mindset through launching real projects

We're offering select schools a pilot program with:
✓ Full curriculum materials
✓ Teacher training
✓ Student certifications
✓ No upfront cost for qualifying schools

Would you be open to a 15-minute conversation about bringing NEXT to [School Name]?

Best regards,
[Your Name]`
  }
];

export default function SalesMaterialsHub() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);

  const filteredMaterials = activeCategory === "all" 
    ? materials 
    : materials.filter(m => m.category === activeCategory);

  const copyToClipboard = (text: string, templateName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTemplate(templateName);
    toast.success("Template copied to clipboard!");
    setTimeout(() => setCopiedTemplate(null), 2000);
  };

  const getTrackingUrl = (material: Material) => {
    const baseUrl = material.url;
    if (material.utmSource) {
      const separator = baseUrl.includes("?") ? "&" : "?";
      return `${baseUrl}${separator}utm_source=sales-hub&utm_medium=outreach&utm_campaign=${material.utmSource}`;
    }
    return baseUrl;
  };

  return (
    <>
      <Helmet>
        <title>Sales Materials Hub | NEXT</title>
        <meta name="description" content="All sales materials, pitch decks, and resources for NEXT partnerships." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <PublicHeader />

        <main className="pt-24 pb-16">
          {/* Hero */}
          <section className="container max-w-6xl mx-auto px-4 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <Badge variant="outline" className="mb-4 border-gold/50 text-gold">
                Internal Sales Resource
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Sales Materials Hub
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need for partnerships, demos, and outreach. 
                All materials include tracking links.
              </p>
            </motion.div>
          </section>

          {/* Quick Actions */}
          <section className="container max-w-6xl mx-auto px-4 mb-12">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-gold/10 to-transparent border-gold/30">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="p-3 rounded-full bg-gold/20">
                    <Calendar className="h-6 w-6 text-gold" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Book a Demo Call</h3>
                    <p className="text-sm text-muted-foreground">Share with prospects</p>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <a href="https://calendly.com/next-demo" target="_blank" rel="noopener noreferrer">
                      Open Calendly
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/30">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/20">
                    <Play className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Live Product Demo</h3>
                    <p className="text-sm text-muted-foreground">Interactive walkthrough</p>
                  </div>
                  <Button asChild size="sm">
                    <a href="/demo?utm_source=sales-hub">
                      Open Demo
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/10 to-transparent border-green-500/30">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="p-3 rounded-full bg-green-500/20">
                    <Globe className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Main Website</h3>
                    <p className="text-sm text-muted-foreground">Public-facing site</p>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <a href="/">
                      Visit Site
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Materials Library */}
          <section className="container max-w-6xl mx-auto px-4 mb-16">
            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent mb-8">
                {categories.map(cat => (
                  <TabsTrigger 
                    key={cat.id} 
                    value={cat.id}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <cat.icon className="h-4 w-4 mr-2" />
                    {cat.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value={activeCategory} className="mt-0">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredMaterials.map((material, index) => (
                    <motion.div
                      key={material.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="h-full hover:border-primary/50 transition-colors">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              {material.type === "pdf" ? (
                                <FileText className="h-5 w-5 text-red-500" />
                              ) : material.type === "video" ? (
                                <Play className="h-5 w-5 text-blue-500" />
                              ) : (
                                <ExternalLink className="h-5 w-5 text-primary" />
                              )}
                              <CardTitle className="text-base">{material.title}</CardTitle>
                            </div>
                            {material.isNew && (
                              <Badge className="bg-green-500 text-white text-xs">New</Badge>
                            )}
                          </div>
                          <CardDescription className="text-sm">
                            {material.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-1 mb-4">
                            {material.audience.map(aud => (
                              <Badge key={aud} variant="secondary" className="text-xs">
                                {aud}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <Button asChild size="sm" className="flex-1">
                              <a href={getTrackingUrl(material)} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 mr-1" />
                                View
                              </a>
                            </Button>
                            {material.downloadUrl && (
                              <Button asChild variant="outline" size="sm">
                                <a href={material.downloadUrl} download>
                                  <Download className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </section>

          {/* Email Templates */}
          <section className="container max-w-6xl mx-auto px-4 mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Mail className="h-6 w-6 text-primary" />
              Email Templates
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {emailTemplates.map(template => (
                <Card key={template.name} className="h-full">
                  <CardHeader>
                    <CardTitle className="text-base">{template.name}</CardTitle>
                    <CardDescription className="font-mono text-xs">
                      Subject: {template.subject}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {template.preview}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => copyToClipboard(template.fullText, template.name)}
                    >
                      {copiedTemplate === template.name ? (
                        <>
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Template
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Country Quick Links */}
          <section className="container max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Globe className="h-6 w-6 text-primary" />
              Country-Specific Links
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { country: "UAE", flag: "🇦🇪", url: "/government-pitch" },
                { country: "Qatar", flag: "🇶🇦", url: "/Qatar-Foundation-Briefing.html" },
                { country: "Rwanda", flag: "🇷🇼", url: "/rwanda-pitch" },
                { country: "Saudi Arabia", flag: "🇸🇦", url: "/government-pitch" },
                { country: "India", flag: "🇮🇳", url: "/government-pitch" },
                { country: "Sharjah", flag: "🏛️", url: "/Sharjah-Education-Council-Briefing.html" },
              ].map(item => (
                <Card key={item.country} className="hover:border-primary/50 transition-colors">
                  <CardContent className="p-4 flex items-center gap-3">
                    <span className="text-2xl">{item.flag}</span>
                    <div className="flex-1">
                      <p className="font-medium">{item.country}</p>
                    </div>
                    <Button asChild variant="ghost" size="icon">
                      <a href={`${item.url}?utm_source=sales-hub&utm_campaign=${item.country.toLowerCase()}`}>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </main>

        <PublicFooter />
      </div>
    </>
  );
}
