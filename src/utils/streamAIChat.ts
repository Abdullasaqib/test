// Streaming utility for AI Coach edge function
// Uses direct fetch for proper SSE streaming support
// SECURITY: Includes authentication, validation, and rate limiting

import { supabase } from "@/integrations/supabase/client";
import {
  checkRateLimit,
  validateMessages,
  sanitizeAIMessage,
  sanitizeInput,
  isValidUUID,
  validateStudentOwnership,
  generateRequestId,
} from "./security";

type Message = { role: string; content: string };

interface StreamAIChatOptions {
  messages: Message[];
  studentId?: string;
  studentContext?: Record<string, unknown> | null;
  currentWeek?: number | null;
  mode?: "general" | "brainstorm" | "homework";
  currentMission?: string;
  currentStep?: string;
  onDelta: (chunk: string) => void;
  onDone: () => void;
  onError: (error: Error) => void;
}

export async function streamAIChat({
  messages,
  studentId,
  studentContext,
  currentWeek,
  mode = "general",
  currentMission,
  currentStep,
  onDelta,
  onDone,
  onError,
}: StreamAIChatOptions): Promise<void> {
  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
  const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    onError(new Error("Supabase configuration missing"));
    return;
  }

  // SECURITY: Check authentication
  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session?.user) {
      onError(new Error("Authentication required. Please log in."));
      return;
    }

    // SECURITY: Validate student ID ownership if provided
    if (studentId) {
      if (!isValidUUID(studentId)) {
        onError(new Error("Invalid student ID format"));
        return;
      }

      const ownsStudent = await validateStudentOwnership(studentId, session.user.id);
      if (!ownsStudent) {
        onError(new Error("Unauthorized: Student ID does not match your account"));
        return;
      }
    }

    // SECURITY: Rate limiting (20 requests per minute per user)
    const rateLimitKey = `ai_coach_${session.user.id}`;
    const rateLimit = checkRateLimit(rateLimitKey, 20);
    if (!rateLimit.allowed) {
      const resetIn = Math.ceil((rateLimit.resetAt - Date.now()) / 1000);
      onError(
        new Error(
          `Rate limit exceeded. Please wait ${resetIn} seconds before trying again.`
        )
      );
      return;
    }

    // SECURITY: Validate and sanitize messages
    const messageValidation = validateMessages(messages);
    if (!messageValidation.valid || !messageValidation.sanitized) {
      onError(new Error(messageValidation.error || "Invalid message format"));
      return;
    }

    // SECURITY: Sanitize optional fields
    const sanitizedMission = currentMission ? sanitizeAIMessage(currentMission) : undefined;
    const sanitizedStep = currentStep ? sanitizeAIMessage(currentStep) : undefined;
    const sanitizedMode = ["general", "brainstorm", "homework"].includes(mode) ? mode : "general";
    const sanitizedWeek = typeof currentWeek === "number" && currentWeek > 0 && currentWeek <= 12 ? currentWeek : null;

    // SECURITY: Validate and sanitize student context
    let sanitizedContext: Record<string, unknown> | null = null;
    if (studentContext && typeof studentContext === "object") {
      sanitizedContext = {};
      if (studentContext.name && typeof studentContext.name === "string") {
        sanitizedContext.name = sanitizeInput(studentContext.name, 100);
      }
      if (studentContext.program && typeof studentContext.program === "string") {
        sanitizedContext.program = sanitizeInput(studentContext.program, 50);
      }
      if (studentContext.age && typeof studentContext.age === "number") {
        sanitizedContext.age = Math.max(9, Math.min(18, studentContext.age));
      }
      if (studentContext.ideaSummary && typeof studentContext.ideaSummary === "string") {
        sanitizedContext.ideaSummary = sanitizeAIMessage(studentContext.ideaSummary);
      }
      if (studentContext.completedWeeks && typeof studentContext.completedWeeks === "number") {
        sanitizedContext.completedWeeks = Math.max(0, Math.min(12, studentContext.completedWeeks));
      }
      if (studentContext.totalWeeks && typeof studentContext.totalWeeks === "number") {
        sanitizedContext.totalWeeks = Math.max(1, Math.min(12, studentContext.totalWeeks));
      }
    }

    const requestId = generateRequestId();

    // Use user's session token for authenticated request
    const response = await fetch(`${SUPABASE_URL}/functions/v1/ai-coach`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`, // Use authenticated session token
        "X-Request-ID": requestId,
      },
      body: JSON.stringify({
        messages: messageValidation.sanitized,
        studentId: studentId || null,
        studentContext: sanitizedContext,
        currentWeek: sanitizedWeek,
        mode: sanitizedMode,
        currentMission: sanitizedMission,
        currentStep: sanitizedStep,
      }),
    });

    // Handle specific error codes
    if (response.status === 401 || response.status === 403) {
      onError(new Error("Authentication failed. Please log in again."));
      return;
    }

    if (response.status === 429) {
      onError(new Error("Rate limit exceeded. Please wait a moment and try again."));
      return;
    }

    if (response.status === 402) {
      onError(new Error("AI credits depleted. Please contact support."));
      return;
    }

    if (!response.ok || !response.body) {
      const errorText = await response.text();
      console.error("AI Coach response error:", response.status, errorText);
      onError(new Error("Failed to connect to AI Coach"));
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      textBuffer += decoder.decode(value, { stream: true });

      // Process line-by-line as data arrives
      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        // Handle CRLF
        if (line.endsWith("\r")) {
          line = line.slice(0, -1);
        }

        // Skip SSE comments and empty lines
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") {
          break;
        }

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) {
            onDelta(content);
          }
        } catch {
          // Incomplete JSON split across chunks - put it back and wait
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }

    // Final flush for any remaining buffered lines
    if (textBuffer.trim()) {
      for (let raw of textBuffer.split("\n")) {
        if (!raw) continue;
        if (raw.endsWith("\r")) raw = raw.slice(0, -1);
        if (raw.startsWith(":") || raw.trim() === "") continue;
        if (!raw.startsWith("data: ")) continue;
        const jsonStr = raw.slice(6).trim();
        if (jsonStr === "[DONE]") continue;
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch {
          // Ignore partial leftovers
        }
      }
    }

    onDone();
  } catch (error) {
    console.error("AI Chat streaming error:", error);
    onError(error instanceof Error ? error : new Error("Unknown streaming error"));
  }
}
