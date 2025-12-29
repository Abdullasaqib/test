import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const INDUSTRIES = [
  'Education', 'Health & Wellness', 'Environment', 'Gaming', 
  'Social Impact', 'Local Business', 'Creative Arts', 'Pet Care',
  'Food & Nutrition', 'Sports & Fitness', 'Entertainment', 'Productivity'
];

const TOOLS_BY_PROGRAM = {
  junior: ['Glide', 'ChatGPT', 'Canva', 'Notion'],
  teen: ['Base44', 'ChatGPT', 'Claude', 'Figma', 'Canva'],
  advanced: ['Lovable', 'Cursor', 'Claude', 'Midjourney', 'Vercel']
};

const AGE_RANGES = {
  junior: { min: 9, max: 11 },
  teen: { min: 12, max: 14 },
  advanced: { min: 15, max: 16 }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const { program, industry, seedDetails } = await req.json();
    
    const selectedProgram = program || 'teen';
    const selectedIndustry = industry || INDUSTRIES[Math.floor(Math.random() * INDUSTRIES.length)];
    const ageRange = AGE_RANGES[selectedProgram as keyof typeof AGE_RANGES];
    const tools = TOOLS_BY_PROGRAM[selectedProgram as keyof typeof TOOLS_BY_PROGRAM];
    
    const systemPrompt = `You are an expert at creating inspiring student entrepreneur case studies for NEXT_ Billion Lab, an AI entrepreneurship program for young founders.

Your task is to generate a realistic, inspiring case study about a young student who built a real product during the 12-week program.

Key requirements:
- The student should be realistic with a believable name and age (${ageRange.min}-${ageRange.max} years old)
- The problem should be age-appropriate and relatable
- The solution should use AI tools appropriate for their age level: ${tools.join(', ')}
- Include specific, copy-paste ready prompts they used
- The outcome should be realistic but impressive
- Write in an inspiring, story-like tone

Program: ${selectedProgram} (ages ${ageRange.min}-${ageRange.max})
Industry focus: ${selectedIndustry}
${seedDetails ? `Additional context: ${seedDetails}` : ''}`;

    const userPrompt = `Generate a complete case study with the following JSON structure:

{
  "title": "Short catchy title for the project (e.g., 'PetFinder: Reuniting Lost Pets')",
  "slug": "kebab-case-url-friendly-slug",
  "student_name": "Realistic first name only",
  "student_age": ${ageRange.min + Math.floor(Math.random() * (ageRange.max - ageRange.min + 1))},
  "problem_found": "2-3 sentences about the problem they discovered and why it matters to them personally",
  "design_journey": "3-4 sentences about how they designed their solution, including AI tools used for ideation and wireframing",
  "code_journey": "3-4 sentences about the building process, specific tools used, and any challenges overcome",
  "launch_story": "2-3 sentences about launching, getting first users, and early feedback",
  "key_learnings": "3-4 bullet points (as a paragraph) about what they learned about entrepreneurship, AI, and themselves",
  "tools_used": ["Array", "of", "tools", "used"],
  "prompts_used": [
    {"prompt": "Exact copy-paste prompt they used", "tool": "Tool name"},
    {"prompt": "Another specific prompt", "tool": "Tool name"},
    {"prompt": "A third useful prompt", "tool": "Tool name"}
  ],
  "outcome": "Specific metrics like '127 users in first month, featured in school newsletter'"
}

Return ONLY valid JSON, no markdown or explanation.`;

    console.log('Generating case study for:', selectedProgram, selectedIndustry);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded, please try again later' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'AI credits depleted' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      throw new Error('No content in AI response');
    }

    // Parse the JSON from the response
    let caseStudy;
    try {
      // Remove any markdown code blocks if present
      const jsonStr = content.replace(/```json\n?|\n?```/g, '').trim();
      caseStudy = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error('Failed to parse AI response:', content);
      throw new Error('Failed to parse AI response as JSON');
    }

    // Add program and metadata
    caseStudy.program = selectedProgram;
    caseStudy.is_published = false;
    caseStudy.is_featured = false;
    caseStudy.generated_by_ai = true;

    console.log('Generated case study:', caseStudy.title);

    return new Response(JSON.stringify({ caseStudy }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('Error generating case study:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
