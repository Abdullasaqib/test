import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  verifyAuth,
  checkRateLimit,
  getCorsHeaders,
  sanitizeString,
} from "../_shared/security.ts";

interface ErrorLogPayload {
  errors: Array<{
    id: string;
    timestamp: string;
    severity: 'info' | 'warning' | 'error' | 'critical';
    category: 'general' | 'module_load' | 'network' | 'render' | 'auth';
    message: string;
    stack?: string;
    route?: string;
    url?: string;
    userAgent?: string;
    userId?: string;
    context?: Record<string, unknown>;
  }>;
}

Deno.serve(async (req) => {
  const origin = req.headers.get("Origin");
  const corsHeaders = getCorsHeaders(origin);

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // SECURITY: Verify authentication (optional but recommended)
    // Allow unauthenticated error logging for critical errors, but rate limit more strictly
    const auth = await verifyAuth(req);
    const isAuthenticated = auth.authenticated && !!auth.userId;
    
    // SECURITY: Rate limiting (stricter for unauthenticated, more lenient for authenticated)
    const rateLimitKey = isAuthenticated 
      ? `error_log_${auth.userId}` 
      : `error_log_anon_${req.headers.get("x-forwarded-for") || "unknown"}`;
    
    const maxRequests = isAuthenticated ? 20 : 5; // More lenient for authenticated users
    const rateLimit = checkRateLimit(rateLimitKey, maxRequests, 60000);
    
    if (!rateLimit.allowed) {
      return new Response(
        JSON.stringify({ 
          error: 'Rate limit exceeded. Please wait before sending more error logs.',
          rateLimitInfo: {
            remaining: rateLimit.remaining,
            resetAt: rateLimit.resetAt,
          }
        }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const payload: ErrorLogPayload = await req.json();
    
    // SECURITY: Validate payload structure
    if (!payload.errors || !Array.isArray(payload.errors)) {
      return new Response(
        JSON.stringify({ error: 'Invalid payload: errors array required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // SECURITY: Limit batch size
    if (payload.errors.length > 50) {
      return new Response(
        JSON.stringify({ error: 'Too many errors in batch (max 50)' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // SECURITY: Validate and sanitize each error
    const sanitizedErrors = payload.errors.map(error => {
      // Use authenticated user ID if available, otherwise use provided or null
      const userId = isAuthenticated && auth.userId ? auth.userId : (error.userId || null);

      return {
        id: sanitizeString(error.id, 100),
        timestamp: error.timestamp || new Date().toISOString(),
        severity: ['info', 'warning', 'error', 'critical'].includes(error.severity) 
          ? error.severity 
          : 'error',
        category: ['general', 'module_load', 'network', 'render', 'auth'].includes(error.category)
          ? error.category
          : 'general',
        message: sanitizeString(error.message, 5000), // Limit message length
        stack: error.stack ? sanitizeString(error.stack, 10000) : null,
        route: error.route ? sanitizeString(error.route, 500) : null,
        url: error.url ? sanitizeString(error.url, 2000) : null,
        user_agent: error.userAgent ? sanitizeString(error.userAgent, 500) : null,
        user_id: userId,
        context: error.context && typeof error.context === "object" ? error.context : {},
      };
    });

    console.log(`Logging ${sanitizedErrors.length} error(s) from ${isAuthenticated ? 'authenticated' : 'anonymous'} user`);

    // Insert errors into the database
    const { error: insertError } = await supabase
      .from('system_error_logs')
      .insert(sanitizedErrors);

    if (insertError) {
      console.error('Failed to insert error logs:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to save error logs', details: insertError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, logged: sanitizedErrors.length }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in log-client-error function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
