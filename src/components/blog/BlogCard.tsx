import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BlogPost } from "@/data/blogPosts";

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard = ({ post }: BlogCardProps) => {
  const navigate = useNavigate();

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

  return (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-primary/50 overflow-hidden"
      onClick={() => navigate(`/blog/${post.slug}`)}
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Badge variant="secondary" className="text-xs">
            {categoryLabels[post.category] || post.category}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </div>
        </div>

        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {formatDate(post.date)}
          </span>
          <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
            Read More <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Card>
  );
};
