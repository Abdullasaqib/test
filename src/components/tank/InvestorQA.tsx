import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, CheckCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Question {
  question: string;
  category: string;
}

interface InvestorQAProps {
  questions: Question[];
  investorName: string;
  investorEmoji: string;
  onComplete: () => void;
}

export function InvestorQA({ questions, investorName, investorEmoji, onComplete }: InvestorQAProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showQuestion, setShowQuestion] = useState(true);

  const handleSubmitAnswer = () => {
    if (!currentAnswer.trim()) return;
    
    const newAnswers = [...answers, currentAnswer];
    setAnswers(newAnswers);
    setIsTyping(true);
    
    // Simulate investor "thinking"
    setTimeout(() => {
      setIsTyping(false);
      setCurrentAnswer("");
      
      if (currentIndex < questions.length - 1) {
        setShowQuestion(false);
        setTimeout(() => {
          setCurrentIndex(prev => prev + 1);
          setShowQuestion(true);
        }, 300);
      }
    }, 1000);
  };

  const isComplete = answers.length === questions.length;
  const currentQuestion = questions[currentIndex];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Q&A Round</h2>
        <p className="text-muted-foreground">
          {investorEmoji} {investorName} has some follow-up questions...
        </p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 justify-center">
        {questions.map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-10 h-2 rounded-full transition-colors",
              i < answers.length
                ? "bg-primary"
                : i === currentIndex
                ? "bg-primary/50"
                : "bg-muted"
            )}
          />
        ))}
      </div>

      {/* Chat interface */}
      <Card className="min-h-[400px] flex flex-col">
        <CardContent className="flex-1 p-4 flex flex-col">
          {/* Message history */}
          <div className="flex-1 space-y-4 overflow-y-auto mb-4">
            {questions.slice(0, currentIndex + 1).map((q, i) => (
              <div key={i} className="space-y-3">
                {/* Investor question */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl shrink-0">
                    {investorEmoji}
                  </div>
                  <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                    <p className="text-sm">{q.question}</p>
                    <Badge variant="outline" className="mt-2 text-xs">
                      Tests: {q.category}
                    </Badge>
                  </div>
                </motion.div>

                {/* User answer (if exists) */}
                {answers[i] && (
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="flex items-start gap-3 justify-end"
                  >
                    <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                      <p className="text-sm">{answers[i]}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                      👤
                    </div>
                  </motion.div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl">
                    {investorEmoji}
                  </div>
                  <div className="bg-muted rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Input area */}
          {!isComplete ? (
            <div className="flex gap-2">
              <Textarea
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder="Type your answer..."
                className="resize-none"
                rows={2}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmitAnswer();
                  }
                }}
              />
              <Button
                size="icon"
                onClick={handleSubmitAnswer}
                disabled={!currentAnswer.trim() || isTyping}
                className="h-auto"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-center py-4"
            >
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
              <p className="font-semibold mb-1">Q&A Complete!</p>
              <p className="text-sm text-muted-foreground mb-4">
                Great job handling those tough questions!
              </p>
              <Button onClick={onComplete} className="gap-2">
                View Summary
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
