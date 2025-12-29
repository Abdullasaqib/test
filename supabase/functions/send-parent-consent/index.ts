import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SendConsentRequest {
  studentId: string;
  studentName: string;
  studentEmail: string;
  parentEmail: string;
  siteUrl: string;
}

async function sendEmail(to: string, subject: string, html: string): Promise<{ id?: string; error?: string }> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "NEXT_ Billion Lab <onboarding@resend.dev>",
      to: [to],
      subject,
      html,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    return { error: data.message || "Failed to send email" };
  }
  return { id: data.id };
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

    const { studentId, studentName, studentEmail, parentEmail, siteUrl }: SendConsentRequest = await req.json();

    // Validate inputs
    if (!studentId || !parentEmail || !siteUrl) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate parent email is different from student email
    if (parentEmail.toLowerCase() === studentEmail?.toLowerCase()) {
      return new Response(
        JSON.stringify({ error: "Parent email must be different from student email" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Generate secure token
    const token = crypto.randomUUID();

    // Store token in database
    const { error: updateError } = await supabase
      .from("students")
      .update({
        parent_email: parentEmail,
        parent_consent_token: token,
        parent_consent_requested_at: new Date().toISOString(),
        parent_consent_verified: false,
      })
      .eq("id", studentId);

    if (updateError) {
      console.error("Error updating student:", updateError);
      return new Response(
        JSON.stringify({ error: "Failed to save consent request" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Build consent link
    const consentLink = `${siteUrl}/verify-consent?token=${token}`;

    // Build email HTML
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #f59e0b; margin: 0;">NEXT_</h1>
          <p style="color: #666; font-size: 12px; margin: 5px 0 0 0;">BILLION LAB</p>
        </div>
        
        <h2 style="color: #1a1a1a;">Parent/Guardian Approval Required</h2>
        
        <p>Hello,</p>
        
        <p><strong>${studentName || "Your child"}</strong> (${studentEmail}) has created an account on NEXT_ Billion Lab, an AI education platform for young learners ages 9-16.</p>
        
        <p>As they are under 13 years old, we require your consent before they can access the platform. This is to comply with the Children's Online Privacy Protection Act (COPPA).</p>
        
        <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin: 25px 0;">
          <h3 style="margin-top: 0; color: #1a1a1a;">What NEXT_ Billion Lab Offers:</h3>
          <ul style="color: #4b5563;">
            <li>AI Foundations Certificate curriculum</li>
            <li>Age-appropriate content for young learners</li>
            <li>Safe, moderated learning environment</li>
            <li>Skills for the future of work</li>
          </ul>
        </div>
        
        <p>To approve this account, please click the button below:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${consentLink}" style="background: #f59e0b; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
            Approve Account
          </a>
        </div>
        
        <p style="color: #666; font-size: 14px;">If you did not expect this email or do not wish to approve this account, you can simply ignore this message. The account will remain inactive.</p>
        
        <p style="color: #666; font-size: 14px;">This link will expire in 24 hours for security purposes.</p>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        
        <p style="color: #9ca3af; font-size: 12px; text-align: center;">
          NEXT_ Billion Lab | AI Education for the Next Generation<br>
          <a href="${siteUrl}/privacy" style="color: #f59e0b;">Privacy Policy</a> | <a href="${siteUrl}/terms" style="color: #f59e0b;">Terms of Service</a>
        </p>
      </body>
      </html>
    `;

    // Send email to parent
    const emailResult = await sendEmail(
      parentEmail,
      `Approve ${studentName || "your child"}'s NEXT_ Billion Lab Account`,
      emailHtml
    );

    if (emailResult.error) {
      console.error("Error sending email:", emailResult.error);
      return new Response(
        JSON.stringify({ error: "Failed to send consent email" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Parent consent email sent:", emailResult.id);

    return new Response(
      JSON.stringify({ success: true, messageId: emailResult.id }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-parent-consent function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
