// Secure API wrapper functions for Supabase edge functions
// Includes authentication, validation, and rate limiting

import { supabase } from "@/integrations/supabase/client";
import {
  checkRateLimit,
  validateApplicationOwnership,
  validateVideoURL,
  validateVideoDuration,
  isValidUUID,
  generateRequestId,
} from "./security";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

/**
 * Securely upload pitch video with validation
 */
export async function uploadPitchVideo(
  applicationId: string,
  videoUrl: string,
  videoDuration: number
): Promise<{ success: boolean; message?: string; error?: string }> {
  // SECURITY: Check authentication
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !session?.user) {
    return { success: false, error: "Authentication required. Please log in." };
  }

  // SECURITY: Validate inputs
  if (!isValidUUID(applicationId)) {
    return { success: false, error: "Invalid application ID format" };
  }

  if (!validateVideoURL(videoUrl)) {
    return { success: false, error: "Invalid video URL format" };
  }

  if (!validateVideoDuration(videoDuration)) {
    return { success: false, error: "Invalid video duration" };
  }

  // SECURITY: Verify application ownership
  const ownsApplication = await validateApplicationOwnership(applicationId, session.user.id);
  if (!ownsApplication) {
    return { success: false, error: "Unauthorized: Application does not belong to your account" };
  }

  // SECURITY: Rate limiting (5 uploads per hour)
  const rateLimitKey = `pitch_video_upload_${session.user.id}`;
  const rateLimit = checkRateLimit(rateLimitKey, 5);
  if (!rateLimit.allowed) {
    const resetIn = Math.ceil((rateLimit.resetAt - Date.now()) / 1000 / 60);
    return {
      success: false,
      error: `Rate limit exceeded. Please wait ${resetIn} minutes before uploading again.`,
    };
  }

  // SECURITY: Call edge function with authenticated session token
  try {
    const requestId = generateRequestId();
    const response = await fetch(`${SUPABASE_URL}/functions/v1/upload-pitch-video`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`, // Use authenticated session token
        "X-Request-ID": requestId,
      },
      body: JSON.stringify({
        application_id: applicationId,
        video_url: videoUrl,
        video_duration: videoDuration,
      }),
    });

    if (response.status === 401 || response.status === 403) {
      return { success: false, error: "Authentication failed. Please log in again." };
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
      return { success: false, error: errorData.error || "Failed to upload video" };
    }

    const data = await response.json();
    return { success: true, message: data.message || "Video uploaded successfully" };
  } catch (error) {
    console.error("Video upload error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to upload video",
    };
  }
}

/**
 * Securely invoke any Supabase edge function with authentication
 */
export async function secureInvokeFunction<T = unknown>(
  functionName: string,
  body: Record<string, unknown>,
  options?: {
    maxRateLimit?: number;
    rateLimitKey?: string;
  }
): Promise<{ data?: T; error?: string }> {
  // SECURITY: Check authentication
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !session?.user) {
    return { error: "Authentication required. Please log in." };
  }

  // SECURITY: Rate limiting
  const rateLimitKey = options?.rateLimitKey || `function_${functionName}_${session.user.id}`;
  const maxRequests = options?.maxRateLimit || 10;
  const rateLimit = checkRateLimit(rateLimitKey, maxRequests);
  
  if (!rateLimit.allowed) {
    const resetIn = Math.ceil((rateLimit.resetAt - Date.now()) / 1000);
    return {
      error: `Rate limit exceeded. Please wait ${resetIn} seconds before trying again.`,
    };
  }

  // SECURITY: Call function with authenticated session token
  try {
    const requestId = generateRequestId();
    const response = await supabase.functions.invoke(functionName, {
      body: {
        ...body,
        _requestId: requestId, // Include request ID for tracking
      },
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        "X-Request-ID": requestId,
      },
    });

    if (response.error) {
      return { error: response.error.message || "Function call failed" };
    }

    return { data: response.data as T };
  } catch (error) {
    console.error(`Function ${functionName} error:`, error);
    return {
      error: error instanceof Error ? error.message : "Function call failed",
    };
  }
}

