// Shared security utilities for Supabase edge functions
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Allowed origins for CORS (update with your actual domain)
const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://nextbillionlab.com",
  "https://www.nextbillionlab.com",
  "https://app.nextbillionlab.com",
];

// Rate limiting storage (in-memory for edge functions)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

interface AuthResult {
  authenticated: boolean;
  userId?: string;
  error?: string;
}

/**
 * Verify JWT token from Authorization header
 */
export async function verifyAuth(req: Request): Promise<AuthResult> {
  const authHeader = req.headers.get("Authorization");
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { authenticated: false, error: "Missing or invalid authorization header" };
  }

  const token = authHeader.substring(7);
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");

  if (!supabaseUrl || !supabaseAnonKey) {
    return { authenticated: false, error: "Server configuration error" };
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return { authenticated: false, error: "Invalid or expired token" };
    }

    return { authenticated: true, userId: user.id };
  } catch (error) {
    console.error("Auth verification error:", error);
    return { authenticated: false, error: "Authentication failed" };
  }
}

/**
 * Check rate limit for a user
 */
export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number = 60000
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const stored = rateLimitStore.get(key);

  if (!stored || now > stored.resetAt) {
    // Reset or create new limit
    const newLimit = {
      count: 1,
      resetAt: now + windowMs,
    };
    rateLimitStore.set(key, newLimit);
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetAt: newLimit.resetAt,
    };
  }

  if (stored.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: stored.resetAt,
    };
  }

  stored.count++;
  rateLimitStore.set(key, stored);

  return {
    allowed: true,
    remaining: maxRequests - stored.count,
    resetAt: stored.resetAt,
  };
}

/**
 * Get CORS headers based on origin
 */
export function getCorsHeaders(origin: string | null): Record<string, string> {
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-request-id",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
  };
}

/**
 * Validate UUID format
 */
export function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

/**
 * Validate URL format
 */
export function isValidURL(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol) && url.length <= 2048;
  } catch {
    return false;
  }
}

/**
 * Validate video URL (allowed domains)
 */
export function isValidVideoURL(url: string): boolean {
  if (!isValidURL(url)) return false;

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
 * Validate video duration
 */
export function isValidVideoDuration(duration: number): boolean {
  return (
    typeof duration === "number" &&
    !isNaN(duration) &&
    duration > 0 &&
    duration <= 600 && // Max 10 minutes
    duration % 1 === 0 // Must be integer
  );
}

/**
 * Sanitize string input
 */
export function sanitizeString(input: unknown, maxLength: number = 10000): string {
  if (typeof input !== "string") return "";
  return input.trim().slice(0, maxLength).replace(/\0/g, "");
}

/**
 * Verify application ownership
 */
export async function verifyApplicationOwnership(
  applicationId: string,
  userId: string
): Promise<boolean> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !supabaseServiceKey) return false;

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { data, error } = await supabase
      .from("applications")
      .select("user_id")
      .eq("id", applicationId)
      .eq("user_id", userId)
      .maybeSingle();

    return !error && !!data;
  } catch {
    return false;
  }
}

/**
 * Verify student ownership
 */
export async function verifyStudentOwnership(
  studentId: string,
  userId: string
): Promise<boolean> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !supabaseServiceKey) return false;

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { data, error } = await supabase
      .from("students")
      .select("user_id")
      .eq("id", studentId)
      .eq("user_id", userId)
      .maybeSingle();

    return !error && !!data;
  } catch {
    return false;
  }
}

