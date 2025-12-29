import { useState } from "react";
import { DemoLayout } from "@/components/demo/DemoLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, Sparkles, Lightbulb } from "lucide-react";
import { DEMO_AI_COACH_MESSAGES, DEMO_STUDENT, DEMO_CURRENT_MISSION } from "@/data/demoData";
import { DemoActionBlocker } from "@/components/demo/DemoActionBlocker";
import { motion } from "framer-motion";

export default function DemoCoach() {
  const [messages] = useState(DEMO_AI_COACH_MESSAGES);
  const [inputValue, setInputValue] = useState("");

  const suggestedPrompts = [
    "How do I validate my idea?",
    "Help me write a pitch",
    "I'm stuck on my mission",
    "What should I build first?",
  ];

  return (
    <DemoLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">AI Coach</h1>
            <p className="text-muted-foreground">
              Your personal mentor for Week {DEMO_CURRENT_MISSION.week}
            </p>
          </div>
          <Badge variant="secondary" className="gap-1">
            <Sparkles className="h-3 w-3" />
            Context-Aware
          </Badge>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Chat Area */}
          <Card className="lg:col-span-3">
            <CardContent className="p-0">
              {/* Messages */}
              <div className="h-[500px] overflow-y-auto p-6 space-y-4">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {msg.role === "assistant" && (
                        <div className="flex items-center gap-2 mb-2">
                          <Bot className="h-4 w-4 text-primary" />
                          <span className="text-xs font-medium text-primary">AI Coach</span>
                        </div>
                      )}
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Input Area */}
              <div className="border-t p-4">
                <DemoActionBlocker action="chat with your AI Coach">
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Ask your AI Coach anything..."
                      className="flex-1"
                    />
                    <Button>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </DemoActionBlocker>
              </div>
            </CardContent>
          </Card>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-yellow-500" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {suggestedPrompts.map((prompt, i) => (
                  <DemoActionBlocker key={i} action="use this prompt">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-left h-auto py-2 px-3"
                    >
                      {prompt}
                    </Button>
                  </DemoActionBlocker>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <CardContent className="p-4">
                <p className="text-sm font-medium mb-2">
                  Coaching {DEMO_STUDENT.full_name}
                </p>
                <p className="text-xs text-muted-foreground">
                  Week {DEMO_CURRENT_MISSION.week} • {DEMO_CURRENT_MISSION.title}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DemoLayout>
  );
}
