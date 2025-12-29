// Security utilities for frontend validation and protection
import { supabase } from "@/integrations/supabase/client";

// Rate limiting storage keys
const RATE_LIMIT_STORAGE_PREFIX = "rate_limit_";
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * Client-side rate limiting
 */
export function checkRateLimit(key: string, maxRequests: number = MAX_REQUESTS_PER_WINDOW): RateLimitResult {
  const storageKey = `${RATE_LIMIT_STORAGE_PREFIX}${key}`;
  const now = Date.now();
  
  try {
    const stored = localStorage.getItem(storageKey);
    if (!stored) {
      const newLimit = {
        count: 1,
        resetAt: now + RATE_LIMIT_WINDOW_MS,
      };
      localStorage.setItem(storageKey, JSON.stringify(newLimit));
      return {
        allowed: true,
        remaining: maxRequests - 1,
        resetAt: newLimit.resetAt,
      };
    }

    const limit = JSON.parse(stored);
    
    // Reset if window expired
    if (now > limit.resetAt) {
      const newLimit = {
        count: 1,
        resetAt: now + RATE_LIMIT_WINDOW_MS,
      };
      localStorage.setItem(storageKey, JSON.stringify(newLimit));
      return {
        allowed: true,
        remaining: maxRequests - 1,
        resetAt: newLimit.resetAt,
      };
    }

    // Check if limit exceeded
    if (limit.count >= maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetAt: limit.resetAt,
      };
    }

    // Increment count
    limit.count++;
    localStorage.setItem(storageKey, JSON.stringify(limit));
    
    return {
      allowed: true,
      remaining: maxRequests - limit.count,
      resetAt: limit.resetAt,
    };
  } catch (error) {
    console.error("Rate limit check error:", error);
    // Fail open - allow request if storage fails
    return {
      allowed: true,
      remaining: maxRequests,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    };
  }
}

/**
 * Input sanitization - removes potentially dangerous content
 */
export function sanitizeInput(input: string, maxLength: number = 10000): string {
  if (typeof input !== "string") {
    return "";
  }

  // Trim and limit length
  let sanitized = input.trim().slice(0, maxLength);

  // Remove null bytes
  sanitized = sanitized.replace(/\0/g, "");

  // Remove control characters except newlines and tabs
  sanitized = sanitized.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, "");

  return sanitized;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== "string") return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim()) && email.length <= 254;
}

/**
 * Validate UUID format
 */
export function isValidUUID(uuid: string): boolean {
  if (!uuid || typeof uuid !== "string") return false;
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

/**
 * Validate URL format
 */
export function isValidURL(url: string): boolean {
  if (!url || typeof url !== "string") return false;
  try {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol) && url.length <= 2048;
  } catch {
    return false;
  }
}

/**
 * Validate application ID ownership
 */
export async function validateApplicationOwnership(applicationId: string, userId: string): Promise<boolean> {
  if (!isValidUUID(applicationId) || !isValidUUID(userId)) {
    return false;
  }

  try {
    const { data, error } = await supabase
      .from("applications")
      .select("user_id")
      .eq("id", applicationId)
      .maybeSingle();

    if (error || !data) {
      return false;
    }

    return data.user_id === userId;
  } catch (error) {
    console.error("Application ownership validation error:", error);
    return false;
  }
}

/**
 * Validate student ID matches authenticated user
 */
export async function validateStudentOwnership(studentId: string, userId: string): Promise<boolean> {
  if (!isValidUUID(studentId) || !isValidUUID(userId)) {
    return false;
  }

  try {
    const { data, error } = await supabase
      .from("students")
      .select("user_id")
      .eq("id", studentId)
      .eq("user_id", userId)
      .maybeSingle();

    return !error && !!data;
  } catch (error) {
    console.error("Student ownership validation error:", error);
    return false;
  }
}

/**
 * Sanitize message content for AI Coach
 */
export function sanitizeAIMessage(message: string): string {
  let sanitized = sanitizeInput(message, 5000);

  // Remove potential prompt injection patterns
  const dangerousPatterns = [
    /ignore\s+(previous|all|above|prior)\s+(instructions|prompts|rules)/gi,
    /you\s+are\s+now/gi,
    /pretend\s+to\s+be/gi,
    /act\s+as\s+if\s+you/gi,
    /roleplay\s+as/gi,
    /disregard\s+(your|all|previous)\s+(training|guidelines|rules)/gi,
    /jailbreak|bypass|override|hack\s+the\s+system/gi,
  ];

  for (const pattern of dangerousPatterns) {
    sanitized = sanitized.replace(pattern, "[content filtered]");
  }

  return sanitized;
}

/**
 * Validate video URL format
 */
export function validateVideoURL(url: string): boolean {
  if (!isValidURL(url)) {
    return false;
  }

  // Allow common video hosting domains
  const allowedDomains = [
    "youtube.com",
    "youtu.be",
    "vimeo.com",
    "dailymotion.com",
    "cloudinary.com",
    "supabase.co",
    "storage.googleapis.com",
    "amazonaws.com",
  ];

  try {
    const parsed = new URL(url);
    return allowedDomains.some((domain) => parsed.hostname.includes(domain));
  } catch {
    return false;
  }
}

/**
 * Validate video duration (in seconds)
 */
export function validateVideoDuration(duration: number): boolean {
  return (
    typeof duration === "number" &&
    !isNaN(duration) &&
    duration > 0 &&
    duration <= 600 && // Max 10 minutes
    duration % 1 === 0 // Must be integer
  );
}

/**
 * Check if user is authenticated
 */
export function requireAuth(): { authenticated: boolean; userId?: string } {
  try {
    // This will be called from components that have access to useAuth
    // For utility functions, we'll check session directly
    const session = supabase.auth.getSession();
    return { authenticated: false }; // Will be handled by calling component
  } catch {
    return { authenticated: false };
  }
}

/**
 * Validate message array for AI chat
 */
export function validateMessages(messages: Array<{ role: string; content: string }>): {
  valid: boolean;
  sanitized?: Array<{ role: string; content: string }>;
  error?: string;
} {
  if (!Array.isArray(messages)) {
    return { valid: false, error: "Messages must be an array" };
  }

  if (messages.length === 0) {
    return { valid: false, error: "At least one message required" };
  }

  if (messages.length > 50) {
    return { valid: false, error: "Too many messages (max 50)" };
  }

  const sanitized = messages.map((msg, index) => {
    if (!msg || typeof msg !== "object") {
      throw new Error(`Invalid message at index ${index}`);
    }

    const role = typeof msg.role === "string" ? msg.role.trim() : "";
    const content = typeof msg.content === "string" ? sanitizeAIMessage(msg.content) : "";

    if (!["user", "assistant", "system"].includes(role)) {
      throw new Error(`Invalid role at index ${index}: ${role}`);
    }

    if (!content || content.length === 0) {
      throw new Error(`Empty content at index ${index}`);
    }

    return { role, content };
  });

  return { valid: true, sanitized };
}

/**
 * Generate secure request ID for tracking
 */
export function generateRequestId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `req_${timestamp}_${random}`;
}

