/**
 * Simple sun sign calculator based on birth date
 * Uses standard zodiac date ranges
 */
export function calculateSunSign(birthDate: string): string {
  const date = new Date(birthDate);
  const month = date.getMonth() + 1; // 1-12
  const day = date.getDate();

  // Zodiac date ranges
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces";

  return "Unknown";
}

/**
 * Get a brief description for a sun sign
 */
export function getSunSignDescription(sign: string): string {
  const descriptions: Record<string, string> = {
    Aries: "Bold, pioneering, and energetic. Natural leaders who embrace challenges.",
    Taurus: "Grounded, patient, and reliable. Values stability and sensory pleasures.",
    Gemini: "Curious, adaptable, and communicative. Thrives on variety and mental stimulation.",
    Cancer: "Nurturing, intuitive, and protective. Deeply connected to emotions and home.",
    Leo: "Confident, creative, and generous. Natural performers who inspire others.",
    Virgo: "Analytical, practical, and detail-oriented. Seeks to serve and improve.",
    Libra: "Diplomatic, harmonious, and fair. Values beauty, balance, and relationships.",
    Scorpio: "Intense, transformative, and perceptive. Seeks depth and authenticity.",
    Sagittarius: "Adventurous, philosophical, and optimistic. Seeks meaning and expansion.",
    Capricorn: "Ambitious, disciplined, and responsible. Builds lasting structures.",
    Aquarius: "Innovative, humanitarian, and independent. Envisions a better future.",
    Pisces: "Compassionate, intuitive, and imaginative. Deeply empathic and artistic."
  };

  return descriptions[sign] || "Unique and special in your own way.";
}
