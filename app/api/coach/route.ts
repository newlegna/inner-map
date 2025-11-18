import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { Profile } from "@/types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const { messages, profile } = await request.json() as {
      messages: Message[];
      profile: Profile;
    };

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    // Build system prompt with user's profile
    const systemPrompt = buildSystemPrompt(profile);

    // Create chat completion
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
      temperature: 0.8,
      max_tokens: 800,
    });

    const responseMessage = completion.choices[0]?.message?.content || "I'm here to help. Could you tell me more?";

    return NextResponse.json({ message: responseMessage });
  } catch (error) {
    console.error("Error in coach API:", error);
    return NextResponse.json(
      { error: "Failed to get response from AI coach" },
      { status: 500 }
    );
  }
}

function buildSystemPrompt(profile: Profile): string {
  const parts = [
    "You are an AI self-insight coach for Inner Map, a platform that combines Astrology, Human Design, MBTI, and Enneagram.",
    "",
    "Your role is to:",
    "- Offer gentle, compassionate, trauma-aware guidance",
    "- Help with purpose, relationships, daily emotional regulation, and decision-making",
    "- Always be validating and non-judgmental",
    "- Encourage self-trust and inner wisdom",
    "- Never be harsh or prescriptive - offer possibilities, not rigid rules",
    "- If type data is missing, work with what you have without making the user feel inadequate",
    "",
    `You are speaking with ${profile.name}.`,
    "",
    "Their profile:",
  ];

  if (profile.sun_sign) {
    parts.push(`- Sun Sign: ${profile.sun_sign} (Astrology)`);
  }

  if (profile.hd_type) {
    parts.push(`- Human Design Type: ${profile.hd_type}`);
  }

  if (profile.mbti_type) {
    parts.push(`- MBTI: ${profile.mbti_type}`);
  }

  if (profile.enneagram_type) {
    parts.push(`- Enneagram: Type ${profile.enneagram_type}`);
  }

  parts.push(
    "",
    "Use their profile to personalize responses when relevant, but don't force it.",
    "Be conversational, warm, and genuinely helpful.",
    "Keep responses concise (2-4 paragraphs max) unless the user asks for more detail.",
    "Remember: you're here to empower, not to fix or diagnose."
  );

  return parts.join("\n");
}
