import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { blogPosts, blogCategories, getPostsByCategory } from "@/data/blogPosts";
import { BlogCard } from "@/components/blog/BlogCard";
import { SEOHead } from "@/components/seo/SEOHead";

export default function Blog() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredPosts = getPostsByCategory(selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Blog - Insights for Future Founders"
        description="Exploring vibe coding, AI in education, and the future of young entrepreneurship. Ideas and insights to help the next generation of founders."
        canonical="/blog"
        keywords="vibe coding, AI education blog, teen entrepreneurs, kids coding blog, future of work"
      />
      {/* Back Navigation */}
      <div className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => navigate("/academy")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Academy
          </Button>
          <Button size="sm" onClick={() => navigate("/pricing")}>
            <Sparkles className="mr-2 h-4 w-4" />
            Get Started — From $19
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-24 px-4 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            Insights for Future Founders
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            Next Billion Lab Blog
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Exploring vibe coding, AI in education, and the future of young entrepreneurship. 
            Ideas and insights to help the next generation of founders.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 border-b">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {blogCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">
              {selectedCategory === "all" ? "All Posts" : blogCategories.find(c => c.id === selectedCategory)?.label}
            </h2>
            <Badge variant="secondary">{filteredPosts.length} articles</Badge>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No posts found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Building?</h2>
          <p className="text-muted-foreground mb-8">
            Join Next Billion Lab and turn your ideas into real products. 
            Our first cohort launches January 2025.
          </p>
          <Button size="lg" onClick={() => navigate("/pricing")}>
            Get Started — From $19
          </Button>
        </div>
      </section>
    </div>
  );
}
