import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.81.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { applicationIds, targetRound } = await req.json();

    if (!applicationIds || !Array.isArray(applicationIds) || applicationIds.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Application IDs array is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!targetRound || targetRound < 2 || targetRound > 8) {
      return new Response(
        JSON.stringify({ error: 'Target round must be between 2 and 8' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Advancing ${applicationIds.length} applications to round ${targetRound}`);

    // Get the applications to verify they exist and are in the correct state
    const { data: applications, error: fetchError } = await supabase
      .from('applications')
      .select('id, round, status, rank')
      .in('id', applicationIds);

    if (fetchError) {
      console.error('Error fetching applications:', fetchError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch applications' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify all applications are from the previous round
    const expectedRound = targetRound - 1;
    const invalidApps = applications?.filter(app => app.round !== expectedRound);
    
    if (invalidApps && invalidApps.length > 0) {
      return new Response(
        JSON.stringify({ 
          error: `Some applications are not in round ${expectedRound}`,
          invalidCount: invalidApps.length 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update applications to advance them to the next round
    const updateData: any = {
      round: targetRound,
      status: 'advanced',
    };

    // Set top 20 flag for round 2
    if (targetRound === 2) {
      updateData.is_top_20 = true;
    }

    // Set top 10 flag for round 3+
    if (targetRound === 3) {
      updateData.is_top_10 = true;
    }

    const { data: updatedApps, error: updateError } = await supabase
      .from('applications')
      .update(updateData)
      .in('id', applicationIds)
      .select();

    if (updateError) {
      console.error('Error updating applications:', updateError);
      return new Response(
        JSON.stringify({ error: 'Failed to update applications' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Successfully advanced ${updatedApps?.length || 0} applications to round ${targetRound}`);

    return new Response(
      JSON.stringify({ 
        success: true,
        advancedCount: updatedApps?.length || 0,
        targetRound,
        applications: updatedApps
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error in advance-to-round function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
