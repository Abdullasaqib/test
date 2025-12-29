import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  verifyAuth,
  checkRateLimit,
  getCorsHeaders,
  isValidUUID,
  isValidVideoURL,
  isValidVideoDuration,
  verifyApplicationOwnership,
} from "../_shared/security.ts";

serve(async (req) => {
  const origin = req.headers.get("Origin");
  const corsHeaders = getCorsHeaders(origin);

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // SECURITY: Verify authentication
    const auth = await verifyAuth(req);
    if (!auth.authenticated || !auth.userId) {
      return new Response(
        JSON.stringify({ error: auth.error || "Authentication required" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { application_id, video_url, video_duration } = await req.json();

    // SECURITY: Validate inputs
    if (!application_id || !video_url || !video_duration) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // SECURITY: Validate UUID format
    if (!isValidUUID(application_id)) {
      return new Response(
        JSON.stringify({ error: "Invalid application ID format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // SECURITY: Validate video URL
    if (!isValidVideoURL(video_url)) {
      return new Response(
        JSON.stringify({ error: "Invalid video URL format or domain not allowed" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // SECURITY: Validate video duration
    if (!isValidVideoDuration(video_duration)) {
      return new Response(
        JSON.stringify({ error: "Invalid video duration (must be 1-600 seconds)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // SECURITY: Verify application ownership
    const ownsApplication = await verifyApplicationOwnership(application_id, auth.userId);
    if (!ownsApplication) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: Application does not belong to your account" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // SECURITY: Server-side rate limiting (5 uploads per hour per user)
    const rateLimitKey = `pitch_video_upload_${auth.userId}`;
    const rateLimit = checkRateLimit(rateLimitKey, 5, 3600000); // 1 hour window
    if (!rateLimit.allowed) {
      const resetIn = Math.ceil((rateLimit.resetAt - Date.now()) / 1000 / 60);
      return new Response(
        JSON.stringify({ 
          error: `Rate limit exceeded. Please wait ${resetIn} minutes before uploading again.`,
          rateLimitInfo: {
            remaining: rateLimit.remaining,
            resetAt: rateLimit.resetAt,
          }
        }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // 1. Verify application exists (double-check)
    const { data: app, error: appError } = await supabase
      .from("applications")
      .select("user_id, video_submitted_at")
      .eq("id", application_id)
      .eq("user_id", auth.userId) // SECURITY: Ensure user owns the application
      .maybeSingle();

    if (appError || !app) {
      return new Response(
        JSON.stringify({ error: "Application not found or access denied" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 2. Check if video already submitted
    if (app.video_submitted_at) {
      return new Response(
        JSON.stringify({ error: "Video already submitted" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 3. Update application with video details
    const { error: updateError } = await supabase
      .from("applications")
      .update({
        video_url,
        video_duration,
        video_submitted_at: new Date().toISOString(),
        status: "video_submitted",
      })
      .eq("id", application_id)
      .eq("user_id", auth.userId); // SECURITY: Double-check ownership on update

    if (updateError) {
      console.error("Update error:", updateError);
      return new Response(
        JSON.stringify({ error: updateError.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 4. Trigger AI scoring (async - don't wait for response)
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (supabaseUrl && supabaseServiceKey) {
      fetch(`${supabaseUrl}/functions/v1/score-pitch-ai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${supabaseServiceKey}`, // Use service role for internal call
        },
        body: JSON.stringify({ application_id }),
      }).catch((err) => console.error("Failed to trigger AI scoring:", err));
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Video submitted successfully! AI scoring in progress...",
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
