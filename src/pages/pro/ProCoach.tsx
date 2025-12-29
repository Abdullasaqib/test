import { useState, useRef, useEffect } from "react";
import { ProLayout } from "@/components/pro/ProLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useStudent } from "@/hooks/useStudent";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { 
  MessageSquare, 
  Send, 
  Loader2, 
  Lightbulb,
  Target,
  Users,
  Zap,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const quickPrompts = [
  { icon: Lightbulb, label: "Help me refine my idea", prompt: "I need help refining my startup idea. Here's what I'm thinking..." },
  { icon: Target, label: "Prepare for customer interviews", prompt: "I want to prepare for customer discovery interviews. What questions should I ask?" },
  { icon: Users, label: "Identify my target market", prompt: "Help me identify and narrow down my target market for my product." },
  { icon: Zap, label: "Choose the right AI tools", prompt: "What AI tools should I use to build my MVP quickly?" },
];

export default function ProCoach() {
  const { student } = useStudent();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text || isLoading) return;

    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("ai-coach", {
        body: {
          message: text,
          studentId: student?.id,
          context: {
            audienceType: "professional",
            industry: (student as any)?.industry,
            ideaStage: (student as any)?.idea_stage,
          },
        },
      });

      if (error) throw error;

      const assistantMessage: Message = { 
        role: "assistant", 
        content: data?.response || "I'm here to help you build. What's on your mind?" 
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Coach error:", error);
      toast({
        title: "Couldn't reach AI Coach",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <ProLayout>
      <div className="p-6 md:p-8 max-w-4xl mx-auto h-[calc(100vh-2rem)] flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">AI Coach</h1>
            <p className="text-white/60">Your personal startup advisor</p>
          </div>
        </div>

        {/* Chat Area */}
        <Card className="flex-1 bg-white/5 border-white/10 flex flex-col min-h-0">
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
                  <MessageSquare className="w-10 h-10 text-emerald-400" />
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  Hey {student?.full_name?.split(" ")[0] || "there"}! 👋
                </h2>
                <p className="text-white/60 mb-8 max-w-md">
                  I'm your AI coach, trained to help professionals like you build products. 
                  What would you like to work on today?
                </p>

                {/* Quick prompts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-lg">
                  {quickPrompts.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => sendMessage(item.prompt)}
                      className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-colors text-left"
                    >
                      <item.icon className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <span className="text-sm text-white/80">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl ${
                        message.role === "user"
                          ? "bg-amber-500 text-black rounded-br-md"
                          : "bg-white/10 text-white rounded-bl-md"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white/10 p-4 rounded-2xl rounded-bl-md">
                      <Loader2 className="w-5 h-5 animate-spin text-white/60" />
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 border-t border-white/10">
            <div className="flex gap-3">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything about building your product..."
                className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/40 resize-none min-h-[60px]"
                rows={2}
              />
              <Button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isLoading}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-6"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </ProLayout>
  );
}
