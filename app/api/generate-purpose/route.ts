import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { Profile } from "@/types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { profile, draft } = await request.json() as {
      profile: Profile;
      draft: string;
    };

    if (!process.env.OPENAI_API_KEY) {
      // If no API key, return the draft as-is
      return NextResponse.json({ content: draft });
    }

    // Create a prompt that asks OpenAI to enhance the draft
    const systemPrompt = `You are a compassionate self-insight guide who specializes in synthesizing Astrology, Human Design, MBTI, and Enneagram.
Your role is to help people understand their unique combination of energies and patterns.
Write in a warm, validating, and empowering tone. Be specific but not prescriptive.
Focus on possibilities, not limitations. Honor the wisdom in each system.`;

    const userPrompt = `Based on this person's profile, enhance and deepen this life purpose draft:

Profile:
- Name: ${profile.name}
- Sun Sign: ${profile.sun_sign || "Unknown"}
- Human Design Type: ${profile.hd_type || "Unknown"}
- MBTI: ${profile.mbti_type || "Unknown"}
- Enneagram: ${profile.enneagram_type || "Unknown"}

Draft:
${draft}

Please rewrite this into a cohesive, inspiring life purpose map (about 3-4 paragraphs) that:
1. Honors the unique combination of their types
2. Identifies core themes and gifts
3. Suggests shadow patterns to be aware of
4. Offers guidance on decision-making and life direction

Keep it warm, personal, and empowering. Write directly to them using "you".`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = completion.choices[0]?.message?.content || draft;

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Error generating purpose map:", error);
    // Return draft on error
    const { draft } = await request.json();
    return NextResponse.json({ content: draft });
  }
}
