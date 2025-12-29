import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, variation } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // NEXT_ brand logo prompt
    const basePrompt = `Create a modern, premium logo design for 'NEXT_', an AI entrepreneurship academy for young founders ages 9-16.

Brand Concept: The Underscore (_) represents the moment before creation - the blinking cursor waiting for the next command. It symbolizes infinite possibility and the future being written.

Design requirements:
- Clean, minimal, tech-forward aesthetic inspired by Linear, Stripe, Vercel
- Primary wordmark: "NEXT" in bold sans-serif + "_" underscore as gold/amber accent
- Colors: Electric Blue (#3B82F6) for text, Warm Gold (#F59E0B) for the underscore
- Deep Navy (#0A0F1C) background or transparent/white background
- Modern tech startup aesthetic, premium and aspirational
- Should work at small sizes (favicon) and large (header)
- The underscore (_) is THE core brand element

${prompt || ''}

Variation style: ${variation || 'wordmark with underscore'}

Generate a high-quality, professional logo design.`;

    console.log('Generating NEXT_ logo with variation:', variation);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-image-preview',
        messages: [
          {
            role: 'user',
            content: basePrompt
          }
        ],
        modalities: ['image', 'text']
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'AI credits required. Please add credits to your workspace.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log('AI response received');

    // Extract the image from the response
    const message = data.choices?.[0]?.message;
    const imageData = message?.images?.[0]?.image_url?.url;
    const textContent = message?.content || '';

    if (!imageData) {
      throw new Error('No image generated');
    }

    return new Response(JSON.stringify({ 
      image: imageData,
      description: textContent,
      variation
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    console.error('Error generating logo:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});