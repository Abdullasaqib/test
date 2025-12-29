import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Zap, 
  Loader2,
  Target,
  Lightbulb,
  Mic,
  Dna,
  Flame,
  BookOpen
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { streamAIChat } from "@/utils/streamAIChat";
import { useStudent } from "@/hooks/useStudent";
import { useJourney } from "@/hooks/useJourney";
import { sanitizeInput } from "@/utils/security";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// Guided conversation flows - quick actions
const quickActions = [
  { 
    id: "stuck", 
    label: "I'm stuck on my mission", 
    icon: Target, 
    color: "text-red-500",
    prompt: "I'm stuck on my current mission and need help. Can you guide me through it step by step?"
  },
  { 
    id: "brainstorm", 
    label: "Help me brainstorm", 
    icon: Lightbulb, 
    color: "text-yellow-500",
    prompt: "I want to brainstorm new ideas for my startup. Can you help me discover problems worth solving?"
  },
  { 
    id: "tank", 
    label: "Prepare for THE TANK", 
    icon: Mic, 
    color: "text-purple-500",
    prompt: "I want to prepare for THE TANK pitch practice. Can you help me craft a compelling pitch and anticipate what the AI investors might ask?"
  },
  { 
    id: "dna", 
    label: "Explain my Founder DNA", 
    icon: Dna, 
    color: "text-blue-500",
    prompt: "Can you explain my Founder DNA results and how I can leverage my strengths?"
  },
  { 
    id: "pep", 
    label: "Give me a pep talk", 
    icon: Flame, 
    color: "text-orange-500",
    prompt: "I'm feeling discouraged and need motivation. Give me a pep talk to keep going!"
  },
  { 
    id: "week", 
    label: "What's this week about?", 
    icon: BookOpen, 
    color: "text-green-500",
    prompt: "Can you explain what I should focus on this week and what I'll learn?"
  },
];

// Context-aware suggested prompts based on week
const getWeekPrompts = (weekNumber: number) => {
  const prompts: Record<number, string[]> = {
    1: [
      "How do I spot problems around me?",
      "What makes a problem worth solving?",
      "Show me how Emma found her idea",
    ],
    2: [
      "How do I interview potential customers?",
      "What questions should I ask people?",
      "How many people should I talk to?",
    ],
    3: [
      "How do I know if my idea is good?",
      "What's the difference between a want and a need?",
      "How did Marcus validate his idea?",
    ],
    4: [
      "How do I define my target customer?",
      "What's a customer persona?",
      "Who should my first customers be?",
    ],
    5: [
      "How do I use Lovable to build my MVP?",
      "What should my first version include?",
      "Show me how to build like Emma did",
    ],
    6: [
      "How do I get feedback on my MVP?",
      "What should I change based on feedback?",
      "How do I know what to build next?",
    ],
    7: [
      "How do I make my product better?",
      "What features should I add?",
      "How did Sofia iterate on her app?",
    ],
    8: [
      "How do I get my first users?",
      "What's a good launch strategy?",
      "How do I create buzz?",
    ],
    9: [
      "How do I grow my user base?",
      "What's word of mouth marketing?",
      "How did Alex get users for EcoShop?",
    ],
    10: [
      "How do I keep users coming back?",
      "What metrics should I track?",
      "How do I know if I'm succeeding?",
    ],
    11: [
      "How do I create a pitch deck?",
      "What should be in my pitch?",
      "How do I practice for Demo Day?",
    ],
    12: [
      "How do I impress investors?",
      "What questions will they ask?",
      "Help me nail my Demo Day pitch!",
    ],
  };
  
  return prompts[weekNumber] || prompts[1];
};

export default function DashboardCoach() {
  const location = useLocation();
  const { student } = useStudent();
  const { currentWeek, weekThemes } = useJourney();
  const weekNumber = currentWeek || 1;
  const currentWeekTitle = weekThemes[weekNumber]?.theme || 'Getting Started';
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: `Hey${student?.full_name ? ` ${student.full_name.split(' ')[0]}` : ''}! 🚀

I'm your AI Coach at NEXT_. I know everything about the curriculum, THE TANK investors, and I've studied how real young founders like Emma and Marcus built their startups.

**This week you're on:** ${currentWeekTitle}

What do you need help with? Pick a quick action below or just ask me anything!`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Handle prefillPrompt from navigation state
  useEffect(() => {
    const prefillPrompt = (location.state as any)?.prefillPrompt;
    if (prefillPrompt && input === "") {
      setInput(prefillPrompt);
      // Auto-send after a brief delay
      setTimeout(() => {
        handleSend(prefillPrompt);
      }, 500);
    }
  }, [location.state]);

  const suggestedPrompts = getWeekPrompts(weekNumber);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (messageContent?: string) => {
    // SECURITY: Validate and sanitize input
    const rawContent = messageContent || input.trim();
    const content = sanitizeInput(rawContent, 5000);
    
    if (!content || content.length < 1 || isLoading) {
      if (rawContent.length > 5000) {
        toast({
          title: "Message too long",
          description: "Please keep messages under 5000 characters.",
          variant: "destructive",
        });
      }
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Prepare messages for API
    const apiMessages = messages
      .filter(m => m.id !== "1") // Exclude initial greeting
      .map(m => ({ role: m.role, content: m.content }));
    apiMessages.push({ role: "user", content: userMessage.content });

    // Add placeholder message for streaming
    const assistantMessageId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      {
        id: assistantMessageId,
        role: "assistant",
        content: "",
        timestamp: new Date(),
      },
    ]);

    let fullContent = "";

    await streamAIChat({
      messages: apiMessages,
      studentId: student?.id,
      studentContext: {
        program: student?.program || "teen",
        completedWeeks: 0,
        totalWeeks: 12,
      },
      currentWeek: currentWeek,
      mode: "general",
      onDelta: (chunk) => {
        fullContent += chunk;
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessageId
              ? { ...m, content: fullContent }
              : m
          )
        );
      },
      onDone: () => {
        setIsLoading(false);
      },
      onError: (error) => {
        console.error("AI Coach error:", error);
        toast({
          title: "Error",
          description: error.message || "Failed to get response. Please try again.",
          variant: "destructive",
        });
        
        // Update the placeholder message with error
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessageId
              ? { ...m, content: "Sorry, I encountered an error. Please try again!" }
              : m
          )
        );
        setIsLoading(false);
      },
    });
  };

  const handleQuickAction = (action: typeof quickActions[0]) => {
    handleSend(action.prompt);
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-8rem)] flex flex-col">
        <div className="mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
            <MessageCircle className="h-7 w-7 text-primary" />
            AI Coach
          </h1>
          <p className="text-muted-foreground mt-1">
            Your personal mentor who knows the curriculum, showcase founders, and THE TANK investors
          </p>
        </div>

        <Card className="flex-1 flex flex-col overflow-hidden">
          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.role === "user" ? "flex-row-reverse" : ""
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-gradient-to-br from-primary to-blue-600"
                  )}
                >
                  {message.role === "user" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            
            {isLoading && messages[messages.length - 1]?.content === "" && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-muted rounded-2xl px-4 py-2">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Quick Actions */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2 space-y-3">
              {/* Quick action buttons */}
              <div>
                <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  Quick Actions
                </p>
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <Button
                        key={action.id}
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => handleQuickAction(action)}
                      >
                        <Icon className={cn("h-4 w-4", action.color)} />
                        {action.label}
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Week-specific suggested prompts */}
              <div>
                <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                  <Lightbulb className="h-3 w-3" />
                  Week {weekNumber} Questions
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestedPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => setInput(prompt)}
                      className="text-xs bg-muted hover:bg-muted/80 text-muted-foreground px-3 py-1.5 rounded-full transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Current Week Badge */}
          {currentWeek && (
            <div className="px-4 pb-2">
              <Badge variant="outline" className="text-xs">
                <BookOpen className="h-3 w-3 mr-1" />
                Week {weekNumber}: {currentWeekTitle}
              </Badge>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-border">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about building your startup..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={!input.trim() || isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
