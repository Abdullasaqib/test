import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Clock, User, Calendar, Sparkles } from "lucide-react";
import { getPostBySlug, getFeaturedPosts } from "@/data/blogPosts";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogPostSEO } from "@/components/seo";

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = getPostBySlug(slug || "");

  const categoryLabels: Record<string, string> = {
    "vibe-coding": "Vibe Coding",
    "ai-education": "AI & Education",
    "young-entrepreneurs": "Young Entrepreneurs",
    "future-of-work": "Future of Work"
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/blog")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  const relatedPosts = getFeaturedPosts(3).filter(p => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <BlogPostSEO
        title={post.title}
        description={post.excerpt}
        slug={post.slug}
        author={post.author}
        datePublished={post.date}
        category={categoryLabels[post.category] || post.category}
        readTime={post.readTime}
      />
      {/* Back Navigation */}
      <div className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => navigate("/blog")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
          <Button size="sm" onClick={() => navigate("/pricing")}>
            <Sparkles className="mr-2 h-4 w-4" />
            Get Started — From $19
          </Button>
        </div>
      </div>

      {/* Article Header */}
      <header className="py-16 px-4 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Badge variant="secondary">
              {categoryLabels[post.category] || post.category}
            </Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-muted-foreground mb-8">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {post.author}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {formatDate(post.date)}
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="py-12 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg prose-neutral dark:prose-invert">
          <div 
            className="blog-content"
            dangerouslySetInnerHTML={{ 
              __html: post.content
                .replace(/^## (.+)$/gm, '<h2 class="text-3xl font-bold mt-12 mb-4">$1</h2>')
                .replace(/^### (.+)$/gm, '<h3 class="text-2xl font-semibold mt-8 mb-3">$1</h3>')
                .replace(/^\*\*(.+?)\*\*/gm, '<strong>$1</strong>')
                .replace(/^- (.+)$/gm, '<li class="ml-4 mb-2">$1</li>')
                .replace(/(<li.*<\/li>\n?)+/g, '<ul class="list-disc pl-4 mb-4">$&</ul>')
                .replace(/\n\n/g, '</p><p class="mb-4">')
                .replace(/^(.+)$/gm, (match) => {
                  if (match.startsWith('<')) return match;
                  return `<p class="mb-4">${match}</p>`;
                })
            }}
          />
        </div>
      </article>

      {/* CTA Card */}
      <section className="py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="p-8 bg-primary/5 border-primary/20">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-3">Ready to Start Building?</h3>
              <p className="text-muted-foreground mb-6">
                Join Next Billion Lab and learn to build real products with AI tools. 
                Our first cohort launches January 2025.
              </p>
              <Button size="lg" onClick={() => navigate("/pricing")}>
                Get Started — From $19 <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Continue Reading</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
