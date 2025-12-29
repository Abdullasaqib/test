import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { BlinkingCursor } from "./blinking-cursor";

interface TypewriterTextProps {
  text: string;
  className?: string;
  cursorClassName?: string;
  speed?: number;
  delay?: number;
  showCursor?: boolean;
  onComplete?: () => void;
}

export const TypewriterText = ({
  text,
  className,
  cursorClassName,
  speed = 50,
  delay = 0,
  showCursor = true,
  onComplete,
}: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setIsTyping(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!isTyping) return;

    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
      onComplete?.();
    }
  }, [displayedText, text, speed, isTyping, onComplete]);

  return (
    <span className={cn("inline-flex items-baseline", className)}>
      <span>{displayedText}</span>
      {showCursor && (isTyping || isComplete) && (
        <BlinkingCursor className={cursorClassName} />
      )}
    </span>
  );
};
