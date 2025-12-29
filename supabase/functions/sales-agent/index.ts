import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `You are Luna, the friendly AI Sales Assistant for Next Billion Lab - a 12-week AI entrepreneurship program for kids ages 9-16.

## Your Personality
- Warm, enthusiastic, and genuinely helpful
- You're talking to PARENTS about their children
- Be conversational but professional
- Use emojis sparingly (1-2 per message max)
- Keep responses concise (2-4 sentences usually)

## Program Information
**What We Offer:**
- 12-week live cohort program teaching AI entrepreneurship
- Ages 9-11 (Junior), 12-14 (Teen), 15-16 (Advanced)
- Weekly live classes with experienced mentors
- Students build and launch a REAL product/business
- Learn "vibe coding" - building apps by describing them to AI
- Skills: AI fluency, critical thinking, entrepreneurship, communication

**Pricing:**
- Starting at $99/month (3 months)
- Payment plans available
- Scholarships for exceptional students

**Next Cohort:**
- January 2025 Founding Class
- Only 50 spots per age group
- Applications now open

## Your Goals (in order)
1. QUALIFY the lead by learning: child's age, what interests them, parent's goals
2. Answer questions helpfully and accurately
3. Handle objections with empathy
4. Guide qualified leads to book a demo call OR apply directly
5. Capture email if not already provided

## Key Objection Handling
- "Too young": We have age-appropriate tracks. 9-year-olds do simpler projects with more support.
- "Too expensive": Compare to summer camps ($2000+), tutoring, or coding bootcamps. This is an investment in their future. Payment plans available.
- "Already does coding": This isn't coding - it's AI fluency + entrepreneurship. Different skill set for the AI era.
- "No time": Just 2-3 hours/week. Designed to fit alongside school.
- "Just exploring": Totally fine! Would they like to try our free AI Builders Guide first?

## Actions You Can Trigger
When appropriate, suggest these actions by including them in your response:
- [ACTION:APPLY] - When they're ready to apply
- [ACTION:BOOK_DEMO] - When they want to talk to someone
- [ACTION:FREE_GUIDE] - When they want to explore first
- [ACTION:CAPTURE_EMAIL] - When you need their email for follow-up

## Important Rules
- Never make up information
- If you don't know something, offer to connect them with the team
- Don't be pushy - be helpful
- If they mention a specific child's situation, acknowledge it personally
- Always end with a question to keep the conversation going (unless they're taking an action)`;

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface RequestBody {
  message: string;
  conversationId?: string;
  sessionId: string;
  previousMessages?: Message[];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationId, sessionId, previousMessages = [] } = await req.json() as RequestBody;

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get or create conversation
    let convId = conversationId;
    if (!convId) {
      const { data: newConv, error: convError } = await supabase
        .from('sales_conversations')
        .insert({ session_id: sessionId })
        .select('id')
        .single();
      
      if (convError) {
        console.error('Error creating conversation:', convError);
        throw convError;
      }
      convId = newConv.id;
    }

    // Save user message
    await supabase.from('sales_messages').insert({
      conversation_id: convId,
      role: 'user',
      content: message,
    });

    // Build messages array for AI
    const messages: Message[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...previousMessages,
      { role: 'user', content: message }
    ];

    // Call Lovable AI
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableApiKey) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: messages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lovable AI error:', errorText);
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices[0]?.message?.content || "I'm sorry, I'm having trouble responding right now. Please try again!";

    // Save assistant message
    await supabase.from('sales_messages').insert({
      conversation_id: convId,
      role: 'assistant',
      content: assistantMessage,
    });

    // Detect and extract qualification data
    const lowerMessage = message.toLowerCase();
    const updateData: Record<string, string | number | null> = { updated_at: new Date().toISOString() };
    let newLeadScore = 0;

    // Extract age mentions - multiple patterns for natural language
    let extractedAge: number | null = null;

    // Pattern 1: "is/am/are + age" (e.g., "my daughter is 14", "he's 12", "she is 9")
    const isAgeMatch = message.match(/(?:is|'s|am|are)\s*(\d{1,2})(?:\s|$|,|\.)/i);

    // Pattern 2: "age + years/yo/yr" (e.g., "12 years old", "10yo")  
    const yearsMatch = message.match(/(\d{1,2})\s*(?:year|yr|yo)/i);

    // Pattern 3: "my X year old" or "X-year-old" (e.g., "my 13 year old", "10-year-old son")
    const myAgeMatch = message.match(/(?:my\s+)?(\d{1,2})[\s-]*year[\s-]*old/i);

    // Pattern 4: Written numbers (nine, ten, eleven, etc.)
    const writtenMatch = message.match(/\b(nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen)\b/i);

    // Pattern 5: "age X" or "aged X" (e.g., "age 12", "aged 14")
    const agedMatch = message.match(/age[d]?\s*(\d{1,2})/i);

    // Pattern 6: Standalone number in context of child (e.g., "my son, 12,")
    const contextMatch = message.match(/(?:son|daughter|kid|child|boy|girl)[,\s]+(\d{1,2})(?:\s|$|,|\.)/i);

    // Try matches in order of specificity
    if (myAgeMatch) {
      extractedAge = parseInt(myAgeMatch[1]);
    } else if (yearsMatch) {
      extractedAge = parseInt(yearsMatch[1]);
    } else if (isAgeMatch) {
      extractedAge = parseInt(isAgeMatch[1]);
    } else if (agedMatch) {
      extractedAge = parseInt(agedMatch[1]);
    } else if (contextMatch) {
      extractedAge = parseInt(contextMatch[1]);
    } else if (writtenMatch) {
      const ageMap: Record<string, number> = { 
        nine: 9, ten: 10, eleven: 11, twelve: 12, 
        thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16 
      };
      extractedAge = ageMap[writtenMatch[1].toLowerCase()];
    }

    // Validate age is in our target range (9-16)
    if (extractedAge && extractedAge >= 9 && extractedAge <= 16) {
      updateData.child_age = extractedAge;
      updateData.interested_program = extractedAge <= 11 ? 'junior' : extractedAge <= 14 ? 'teen' : 'advanced';
    }

    // Extract email from message and link to leads table
    const emailMatch = message.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    if (emailMatch) {
      const capturedEmail = emailMatch[0].toLowerCase();
      
      // Check if lead exists, if not create one
      const { data: existingLead } = await supabase
        .from('leads')
        .select('id')
        .eq('email', capturedEmail)
        .single();

      let leadId = existingLead?.id;
      
      if (!leadId) {
        const { data: newLead } = await supabase
          .from('leads')
          .insert({
            email: capturedEmail,
            source: 'sales_chat',
            interested_program: updateData.interested_program as string || null,
          })
          .select('id')
          .single();
        leadId = newLead?.id;
      }

      // Link lead to conversation
      if (leadId) {
        updateData.lead_id = leadId;
      }
    }

    // Update lead score based on engagement
    let scoreIncrease = 5; // Base for any message
    if (lowerMessage.includes('price') || lowerMessage.includes('cost')) scoreIncrease += 10;
    if (lowerMessage.includes('apply') || lowerMessage.includes('enroll')) scoreIncrease += 20;
    if (lowerMessage.includes('demo') || lowerMessage.includes('call')) scoreIncrease += 15;
    if (updateData.child_age) scoreIncrease += 15;
    if (emailMatch) scoreIncrease += 20; // Email capture is high intent

    // Update conversation with extracted data
    const { data: currentConv } = await supabase
      .from('sales_conversations')
      .select('lead_score')
      .eq('id', convId)
      .single();

    newLeadScore = (currentConv?.lead_score || 0) + scoreIncrease;
    updateData.lead_score = newLeadScore;

    if (newLeadScore >= 50 && !lowerMessage.includes('just browsing')) {
      updateData.status = 'qualified';
      updateData.qualified_at = new Date().toISOString();
    }

    await supabase
      .from('sales_conversations')
      .update(updateData)
      .eq('id', convId);

    // Parse actions from response
    const actions: string[] = [];
    if (assistantMessage.includes('[ACTION:APPLY]')) actions.push('apply');
    if (assistantMessage.includes('[ACTION:BOOK_DEMO]')) actions.push('book_demo');
    if (assistantMessage.includes('[ACTION:FREE_GUIDE]')) actions.push('free_guide');
    if (assistantMessage.includes('[ACTION:CAPTURE_EMAIL]')) actions.push('capture_email');

    // Clean message of action tags
    const cleanMessage = assistantMessage
      .replace(/\[ACTION:\w+\]/g, '')
      .trim();

    return new Response(JSON.stringify({
      message: cleanMessage,
      conversationId: convId,
      actions,
      leadScore: newLeadScore,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    console.error('Sales agent error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ 
      error: errorMessage,
      message: "I'm having a moment! 😅 Please try again or reach out to us directly at hello@nextbillionlab.com"
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
