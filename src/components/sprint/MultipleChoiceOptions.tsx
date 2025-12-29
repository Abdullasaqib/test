import { useState } from "react";
import { motion } from "framer-motion";
import { Check, HelpCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export interface MCOption {
  id: string;
  text: string;
  reasoning_prompt?: string;
}

interface MultipleChoiceOptionsProps {
  options: MCOption[];
  selectedOption: string | null;
  onSelect: (optionId: string) => void;
  reasoning: string;
  onReasoningChange: (value: string) => void;
  disabled?: boolean;
}

export function MultipleChoiceOptions({
  options,
  selectedOption,
  onSelect,
  reasoning,
  onReasoningChange,
  disabled = false,
}: MultipleChoiceOptionsProps) {
  const selectedOptionData = options.find(o => o.id === selectedOption);

  return (
    <div className="space-y-4">
      {/* Option Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {options.map((option, index) => (
          <motion.button
            key={option.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => !disabled && onSelect(option.id)}
            disabled={disabled}
            className={cn(
              "relative p-4 rounded-xl border-2 text-left transition-all duration-200",
              "hover:border-primary/50 hover:bg-primary/5",
              selectedOption === option.id
                ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                : "border-border bg-background/50",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {/* Option Letter */}
            <div className={cn(
              "absolute -top-2 -left-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
              selectedOption === option.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}>
              {option.id}
            </div>

            {/* Check Mark */}
            {selectedOption === option.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center"
              >
                <Check className="h-4 w-4 text-white" />
              </motion.div>
            )}

            <p className="text-sm font-medium mt-2 leading-relaxed">
              {option.text}
            </p>
          </motion.button>
        ))}
      </div>

      {/* Follow-up Reasoning - Appears after selection */}
      {selectedOption && selectedOptionData && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="space-y-2"
        >
          <div className="flex items-center gap-2 text-sm font-medium text-orange-400">
            <HelpCircle className="h-4 w-4" />
            <span>
              {selectedOptionData.reasoning_prompt || "Nice choice! Why did you pick this? (2-3 sentences)"}
            </span>
          </div>
          <Textarea
            placeholder="Explain your thinking..."
            value={reasoning}
            onChange={(e) => onReasoningChange(e.target.value)}
            className="min-h-[80px] resize-none"
            maxLength={500}
            disabled={disabled}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{reasoning.length}/500 characters</span>
            <span>Write at least 20 characters</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}