import { formatDistanceToNow } from "date-fns";
import { Clock, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

interface HistoryItem {
  id: string;
  prompt: {
    id: string;
    title: string;
    prompt_template: string;
    kid_category: string;
  };
  used_at: string;
  context?: string;
}

interface PromptHistoryProps {
  history: HistoryItem[];
  onUsePrompt: (prompt: string) => void;
}

const categoryIcons: Record<string, string> = {
  design_help: "🎨",
  customer_conversations: "💬",
  content_creation: "📝",
  technical_help: "🛠️",
  business_model: "💰",
  marketing: "📢",
};

export function PromptHistory({ history, onUsePrompt }: PromptHistoryProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (id: string, template: string) => {
    await navigator.clipboard.writeText(template);
    setCopiedId(id);
    toast({ title: "Copied!", description: "Prompt copied to clipboard" });
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (history.length === 0) {
    return (
      <div className="text-center py-12">
        <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">No history yet</h3>
        <p className="text-muted-foreground text-sm">
          Prompts you use will appear here for easy access
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {history.map((item) => (
        <Card key={item.id} className="hover:shadow-sm transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span>{categoryIcons[item.prompt.kid_category] || "📚"}</span>
                  <span className="font-medium">{item.prompt.title}</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1 font-mono">
                  {item.prompt.prompt_template}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {formatDistanceToNow(new Date(item.used_at), { addSuffix: true })}
                  {item.context && (
                    <Badge variant="outline" className="text-xs">
                      {item.context}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(item.id, item.prompt.prompt_template)}
                >
                  {copiedId === item.id ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  size="sm"
                  onClick={() => onUsePrompt(item.prompt.prompt_template)}
                >
                  Use
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}