import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SendEmailRequest {
  templateId?: string;
  campaignId?: string;
  recipientEmail: string;
  recipientName?: string;
  recipientType?: string;
  testMode?: boolean;
}

interface BulkSendRequest {
  campaignId: string;
  recipients: Array<{
    email: string;
    name?: string;
    type?: string;
  }>;
}

// Helper function to send email via Resend API
async function sendEmail(to: string, subject: string, html: string): Promise<{ id?: string; error?: string }> {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Next Billion Lab <onboarding@resend.dev>",
        to: [to],
        subject,
        html,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("[send-campaign-email] Resend error:", data);
      return { error: data.message || "Failed to send email" };
    }

    return { id: data.id };
  } catch (error) {
    console.error("[send-campaign-email] Send error:", error);
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body = await req.json();
    const { action } = body;

    console.log(`[send-campaign-email] Action: ${action}`);

    if (action === "send_single") {
      const { templateId, recipientEmail, recipientName, campaignId, testMode } = body as SendEmailRequest;

      // Get template
      const { data: template, error: templateError } = await supabase
        .from("email_templates")
        .select("*")
        .eq("id", templateId)
        .single();

      if (templateError || !template) {
        console.error("[send-campaign-email] Template not found:", templateError);
        return new Response(
          JSON.stringify({ error: "Template not found" }),
          { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Replace placeholders
      let htmlContent = template.html_content;
      htmlContent = htmlContent.replace(/\{\{name\}\}/g, recipientName || "there");

      // Send email
      const result = await sendEmail(recipientEmail, template.subject, htmlContent);

      if (result.error) {
        return new Response(
          JSON.stringify({ error: result.error }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      console.log("[send-campaign-email] Email sent:", result.id);

      // Log to database if not test mode
      if (!testMode && campaignId) {
        await supabase.from("email_sends").insert({
          campaign_id: campaignId,
          template_id: templateId,
          recipient_email: recipientEmail,
          recipient_name: recipientName,
          status: "sent",
          sent_at: new Date().toISOString(),
          resend_id: result.id,
        });

        // Update campaign sent count
        const { data: campaign } = await supabase
          .from("email_campaigns")
          .select("sent_count")
          .eq("id", campaignId)
          .single();
        
        if (campaign) {
          await supabase
            .from("email_campaigns")
            .update({ sent_count: (campaign.sent_count || 0) + 1 })
            .eq("id", campaignId);
        }
      }

      return new Response(
        JSON.stringify({ success: true, id: result.id }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "send_bulk") {
      const { campaignId, recipients, templateId } = body as BulkSendRequest & { templateId: string };

      // Get template
      const { data: template, error: templateError } = await supabase
        .from("email_templates")
        .select("*")
        .eq("id", templateId)
        .single();

      if (templateError || !template) {
        console.error("[send-campaign-email] Template not found:", templateError);
        return new Response(
          JSON.stringify({ error: "Template not found" }),
          { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Update campaign status
      await supabase
        .from("email_campaigns")
        .update({ 
          status: "sending", 
          started_at: new Date().toISOString(),
          total_recipients: recipients.length 
        })
        .eq("id", campaignId);

      let sentCount = 0;
      const errors: string[] = [];

      for (const recipient of recipients) {
        try {
          // Replace placeholders
          let htmlContent = template.html_content;
          htmlContent = htmlContent.replace(/\{\{name\}\}/g, recipient.name || "there");

          const result = await sendEmail(recipient.email, template.subject, htmlContent);

          if (result.error) {
            throw new Error(result.error);
          }

          // Log send
          await supabase.from("email_sends").insert({
            campaign_id: campaignId,
            template_id: template.id,
            recipient_email: recipient.email,
            recipient_name: recipient.name,
            recipient_type: recipient.type,
            status: "sent",
            sent_at: new Date().toISOString(),
            resend_id: result.id,
          });

          sentCount++;
          console.log(`[send-campaign-email] Sent to ${recipient.email}`);
        } catch (err) {
          console.error(`[send-campaign-email] Failed to send to ${recipient.email}:`, err);
          errors.push(recipient.email);

          await supabase.from("email_sends").insert({
            campaign_id: campaignId,
            template_id: template.id,
            recipient_email: recipient.email,
            recipient_name: recipient.name,
            status: "failed",
            error_message: err instanceof Error ? err.message : "Unknown error",
          });
        }

        // Rate limiting: wait 100ms between sends
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Update campaign as completed
      await supabase
        .from("email_campaigns")
        .update({ 
          status: "completed", 
          completed_at: new Date().toISOString(),
          sent_count: sentCount 
        })
        .eq("id", campaignId);

      return new Response(
        JSON.stringify({ 
          success: true, 
          sent: sentCount, 
          failed: errors.length,
          errors 
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "send_test") {
      const { templateId, recipientEmail } = body;

      const { data: template, error: templateError } = await supabase
        .from("email_templates")
        .select("*")
        .eq("id", templateId)
        .single();

      if (templateError || !template) {
        return new Response(
          JSON.stringify({ error: "Template not found" }),
          { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Replace placeholders with test values
      let htmlContent = template.html_content;
      htmlContent = htmlContent.replace(/\{\{name\}\}/g, "Test User");

      const result = await sendEmail(recipientEmail, `[TEST] ${template.subject}`, htmlContent);

      if (result.error) {
        return new Response(
          JSON.stringify({ error: result.error }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      console.log("[send-campaign-email] Test email sent:", result.id);

      return new Response(
        JSON.stringify({ success: true, id: result.id }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Invalid action" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("[send-campaign-email] Error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);
