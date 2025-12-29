import { useState, useRef, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lightbulb, Sparkles, ArrowRight, Send, Bot, User, Loader2, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { streamAIChat } from "@/utils/streamAIChat";
import { useStudent } from "@/hooks/useStudent";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const brainstormSteps = [
  { step: 1, title: "Identify Problems", prompt: "What problems do you notice around you? Think about challenges you, your friends, or your family face daily." },
  { step: 2, title: "Explore Customers", prompt: "Who experiences this problem the most? Describe your target customer." },
  { step: 3, title: "Brainstorm Solutions", prompt: "What if you could solve this problem? What would your solution look like?" },
  { step: 4, title: "Refine Ideas", prompt: "Let's narrow down to your top ideas. Which one excites you the most?" },
  { step: 5, title: "One-Line Pitch", prompt: "Can you describe your idea in one sentence? [Your startup] helps [who] do [what] by [how]." },
];

export default function DashboardBrainstorm() {
  const { student } = useStudent();
  const [isStarted, setIsStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startBrainstorm = () => {
    setIsStarted(true);
    setCurrentStep(1);
    setMessages([
      {
        id: "intro",
        role: "assistant",
        content: `Hey! 🚀 I'm excited to help you discover your billion-dollar startup idea!\n\nWe'll go through 5 steps together:\n1. Identify problems\n2. Explore customers\n3. Brainstorm solutions\n4. Refine ideas\n5. Craft your pitch\n\nLet's start with Step 1: ${brainstormSteps[0].prompt}`,
      },
    ]);
  };

  const resetBrainstorm = () => {
    setIsStarted(false);
    setCurrentStep(0);
    setMessages([]);
    setInput("");
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const apiMessages = messages
      .filter(m => m.id !== "intro")
      .map(m => ({ role: m.role, content: m.content }));
    apiMessages.push({ role: "user", content: userMessage.content });

    const assistantMessageId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      { id: assistantMessageId, role: "assistant", content: "" },
    ]);

    let fullContent = "";

    await streamAIChat({
      messages: apiMessages,
      studentId: student?.id,
      studentContext: {
        program: student?.program || "teen",
        hasIdea: false,
      },
      currentWeek: null,
      mode: "brainstorm",
      onDelta: (chunk) => {
        fullContent += chunk;
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessageId ? { ...m, content: fullContent } : m
          )
        );
      },
      onDone: () => {
        // Auto-advance step based on conversation progress
        if (currentStep < 5 && messages.length > currentStep * 2 + 1) {
          setCurrentStep(prev => Math.min(prev + 1, 5));
        }
        setIsLoading(false);
      },
      onError: (error) => {
        console.error("Brainstorm error:", error);
        toast({
          title: "Error",
          description: error.message || "Failed to get response. Please try again.",
          variant: "destructive",
        });
        // Remove empty assistant message
        setMessages((prev) => prev.filter(m => m.id !== assistantMessageId));
        setIsLoading(false);
      },
    });
  };

  if (!isStarted) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Brainstorm Your Idea</h1>
            <p className="text-muted-foreground mt-1">
              Discover your billion-dollar startup idea
            </p>
          </div>

          <Card className="border-primary/20">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-pillar-amber/20 to-pillar-amber/5 flex items-center justify-center mb-4">
                <Lightbulb className="h-8 w-8 text-pillar-amber" />
              </div>
              <CardTitle className="text-2xl">Start Your Idea Journey</CardTitle>
              <CardDescription className="max-w-md mx-auto">
                I'll guide you through a structured brainstorming process to help 
                you discover problems worth solving and generate innovative solutions.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center pb-8">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 max-w-3xl mx-auto mb-8">
                {brainstormSteps.map((step) => (
                  <div key={step.step} className="p-3 rounded-lg bg-muted/50">
                    <div className="text-lg font-bold text-primary mb-1">{step.step}</div>
                    <p className="text-xs text-muted-foreground">{step.title}</p>
                  </div>
                ))}
              </div>
              
              <Button size="lg" className="gap-2" onClick={startBrainstorm}>
                <Sparkles className="h-4 w-4" />
                Start Brainstorming
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-8rem)] flex flex-col">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
              <Lightbulb className="h-7 w-7 text-pillar-amber" />
              Brainstorm
            </h1>
            <p className="text-muted-foreground mt-1">
              Step {currentStep} of 5: {brainstormSteps[currentStep - 1]?.title}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={resetBrainstorm}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Start Over
          </Button>
        </div>

        {/* Progress Steps */}
        <div className="flex gap-1 mb-4">
          {brainstormSteps.map((step) => (
            <div
              key={step.step}
              className={cn(
                "flex-1 h-2 rounded-full transition-colors",
                step.step <= currentStep ? "bg-primary" : "bg-muted"
              )}
            />
          ))}
        </div>

        {/* Chat */}
        <Card className="flex-1 flex flex-col overflow-hidden">
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
                      : "bg-pillar-amber/20"
                  )}
                >
                  {message.role === "user" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4 text-pillar-amber" />
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
                <div className="w-8 h-8 rounded-full bg-pillar-amber/20 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-pillar-amber" />
                </div>
                <div className="bg-muted rounded-2xl px-4 py-2">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

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
                placeholder="Share your thoughts..."
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
