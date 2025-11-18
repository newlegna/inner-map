import { Profile } from "@/types";

export function buildLifePurposeDraft(profile: Profile): string {
  const sections: string[] = [];

  sections.push(
    `Hello ${profile.name}, your Inner Map reveals a unique combination of energies and patterns.`
  );

  if (profile.sun_sign) {
    sections.push(
      `\n**Core Solar Energy (${profile.sun_sign}):** Your sun sign illuminates your essential self-expression and vitality.`
    );
  }

  if (profile.hd_type) {
    sections.push(
      `\n**Energy Type (${profile.hd_type}):** Your Human Design shows how you're wired to interact with the world and make decisions.`
    );
  }

  if (profile.mbti_type) {
    sections.push(
      `\n**Cognitive Style (${profile.mbti_type}):** Your MBTI type reveals your natural way of processing information and relating to others.`
    );
  }

  if (profile.enneagram_type) {
    sections.push(
      `\n**Core Motivation (Type ${profile.enneagram_type}):** Your Enneagram type shows your deepest desires and what drives your behavior.`
    );
  }

  sections.push(
    `\n**Your Synthesis:** When we weave these threads together, we see someone who is here to express their authentic self while navigating the dance between inner wisdom and outer action.`
  );

  sections.push(
    `\n**Life Direction Themes:**`,
    `- Honoring your natural rhythms and decision-making style`,
    `- Expressing your gifts in ways that feel authentic`,
    `- Building relationships that respect your energy type`,
    `- Creating work that aligns with your core motivations`
  );

  return sections.join("\n");
}

export function calculateClarityProgress(profile: Profile): number {
  const fields = [
    profile.birth_date,
    profile.sun_sign,
    profile.hd_type,
    profile.mbti_type,
    profile.enneagram_type,
  ];

  const filledFields = fields.filter(field => field !== null && field !== undefined && field !== '').length;
  return Math.round((filledFields / fields.length) * 100);
}
