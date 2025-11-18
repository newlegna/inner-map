// Database types matching Supabase schema

export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  name: string;
  birth_date: string | null;
  birth_time: string | null;
  birth_place: string | null;
  sun_sign: string | null;
  hd_type: string | null;
  mbti_type: string | null;
  enneagram_type: string | null;
  is_premium: boolean;
  created_at: string;
  updated_at: string;
}

export interface CoachMessage {
  id: string;
  user_id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

export const MBTI_TYPES = [
  "INTJ", "INTP", "ENTJ", "ENTP",
  "INFJ", "INFP", "ENFJ", "ENFP",
  "ISTJ", "ISFJ", "ESTJ", "ESFJ",
  "ISTP", "ISFP", "ESTP", "ESFP"
] as const;

export const ENNEAGRAM_TYPES = [
  "1", "2", "3", "4", "5", "6", "7", "8", "9",
  "1w9", "1w2", "2w1", "2w3", "3w2", "3w4",
  "4w3", "4w5", "5w4", "5w6", "6w5", "6w7",
  "7w6", "7w8", "8w7", "8w9", "9w8", "9w1"
] as const;

export const HUMAN_DESIGN_TYPES = [
  "Manifestor",
  "Generator",
  "Manifesting Generator",
  "Projector",
  "Reflector"
] as const;

export const ZODIAC_SIGNS = [
  "Aries", "Taurus", "Gemini", "Cancer",
  "Leo", "Virgo", "Libra", "Scorpio",
  "Sagittarius", "Capricorn", "Aquarius", "Pisces"
] as const;
