import { useState, useRef, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Send, Copy, Check, Loader2 } from "lucide-react";
import { useStudent } from "@/hooks/useStudent";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { streamAIChat } from "@/utils/streamAIChat";
import { sanitizeInput } from "@/utils/security";

interface AICoachPanelProps {
  isOpen: boolean;
  onClose: () => void;
  missionTitle: string;
  currentStepTitle: string;
  initialPrompt?: string;
  onInsertSuggestion?: (text: string) => void;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function AICoachPanel({
  isOpen,
  onClose,
  missionTitle,
  currentStepTitle,
  initialPrompt,
  onInsertSuggestion,
}: AICoachPanelProps) {
  const { student } = useStudent();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState(initialPrompt || "");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-populate initial prompt when panel opens
  useEffect(() => {
    if (isOpen && initialPrompt && messages.length === 0) {
      setInput(initialPrompt);
    }
  }, [isOpen, initialPrompt]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    // SECURITY: Validate and sanitize input
    const sanitizedInput = sanitizeInput(input.trim(), 5000);
    if (!sanitizedInput || sanitizedInput.length < 1 || isLoading) {
      if (input.trim().length > 5000) {
        toast.error("Message is too long. Please keep it under 5000 characters.");
      }
      return;
    }

    const userMessage: Message = { role: "user", content: sanitizedInput };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Add placeholder for assistant message
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    let assistantMessage = "";

    await streamAIChat({
      messages: [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      })),
      studentContext: student
        ? {
            name: student.full_name,
            program: student.program,
            age: student.age,
            ideaSummary: student.idea_summary,
          }
        : null,
      mode: "homework",
      currentMission: missionTitle,
      currentStep: currentStepTitle,
      onDelta: (chunk) => {
        assistantMessage += chunk;
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            role: "assistant",
            content: assistantMessage,
          };
          return newMessages;
        });
      },
      onDone: () => {
        setIsLoading(false);
      },
      onError: (error) => {
        console.error("AI Coach error:", error);
        toast.error(error.message || "Failed to get response from AI Coach");
        // Remove the empty assistant message
        setMessages((prev) => prev.slice(0, -1));
        setIsLoading(false);
      },
    });
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleInsert = (text: string) => {
    onInsertSuggestion?.(text);
    toast.success("Suggestion inserted!");
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Your Coach
          </SheetTitle>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs">
              {missionTitle}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {currentStepTitle}
            </Badge>
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-sm">
                  Ask me anything about this step! I'm here to help you succeed.
                </p>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col gap-2",
                  message.role === "user" ? "items-end" : "items-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[90%] rounded-lg p-3 text-sm",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>

                {message.role === "assistant" && message.content && (
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => handleCopy(message.content, index)}
                    >
                      {copiedIndex === index ? (
                        <Check className="h-3 w-3 mr-1" />
                      ) : (
                        <Copy className="h-3 w-3 mr-1" />
                      )}
                      Copy
                    </Button>
                    {onInsertSuggestion && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs text-primary"
                        onClick={() => handleInsert(message.content)}
                      >
                        <Sparkles className="h-3 w-3 mr-1" />
                        Insert
                      </Button>
                    )}
                  </div>
                )}
              </div>
            ))}

            {isLoading && messages[messages.length - 1]?.content === "" && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Thinking...</span>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for help with this step..."
              className="min-h-[60px] resize-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              size="icon"
              className="shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Press Enter to send • Shift+Enter for new line
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
