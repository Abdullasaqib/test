import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface VerifyConsentRequest {
  token: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { token }: VerifyConsentRequest = await req.json();

    if (!token) {
      return new Response(
        JSON.stringify({ error: "Token is required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Find student with this token
    const { data: student, error: fetchError } = await supabase
      .from("students")
      .select("id, full_name, parent_consent_requested_at, parent_consent_verified")
      .eq("parent_consent_token", token)
      .single();

    if (fetchError || !student) {
      console.error("Token not found:", fetchError);
      return new Response(
        JSON.stringify({ error: "Invalid or expired token" }),
        { status: 404, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Check if already verified
    if (student.parent_consent_verified) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          alreadyVerified: true,
          studentName: student.full_name 
        }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Check token expiration (24 hours)
    const requestedAt = new Date(student.parent_consent_requested_at);
    const now = new Date();
    const hoursDiff = (now.getTime() - requestedAt.getTime()) / (1000 * 60 * 60);

    if (hoursDiff > 24) {
      return new Response(
        JSON.stringify({ error: "Token has expired. Please request a new consent email." }),
        { status: 410, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Update student record to mark consent as verified
    const { error: updateError } = await supabase
      .from("students")
      .update({
        parent_consent_verified: true,
        parent_consent_at: new Date().toISOString(),
        parent_consent_token: null, // Clear token after use
      })
      .eq("id", student.id);

    if (updateError) {
      console.error("Error updating consent status:", updateError);
      return new Response(
        JSON.stringify({ error: "Failed to verify consent" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Parent consent verified for student:", student.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        studentName: student.full_name,
        alreadyVerified: false
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in verify-parent-consent function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
