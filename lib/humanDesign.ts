import { HUMAN_DESIGN_TYPES } from "@/types";

/**
 * Mock Human Design type calculator
 * In a real implementation, this would use birth data and ephemeris calculations
 * For MVP, we use a simple deterministic approach based on birth date
 */
export function calculateHumanDesignType(birthDate: string): string {
  // Simple hash-like function using birth date to assign a type
  const date = new Date(birthDate);
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000
  );

  // Use modulo to assign one of the 5 types
  const typeIndex = dayOfYear % HUMAN_DESIGN_TYPES.length;
  return HUMAN_DESIGN_TYPES[typeIndex];
}

/**
 * Get description for Human Design type
 */
export function getHumanDesignDescription(type: string): string {
  const descriptions: Record<string, string> = {
    "Manifestor": "Initiators who are here to make things happen. Your strategy is to inform before you act.",
    "Generator": "Builders with sustainable energy. Your strategy is to wait to respond to life.",
    "Manifesting Generator": "Multi-passionate builders who move quickly. Wait to respond, then inform.",
    "Projector": "Guides and leaders who see systems clearly. Wait for invitations to share your wisdom.",
    "Reflector": "Mirrors of the community. Wait a lunar cycle before making major decisions."
  };

  return descriptions[type] || "Your unique energy type guides your life path.";
}

/**
 * Get mock strategy for Human Design type
 */
export function getHumanDesignStrategy(type: string): string {
  const strategies: Record<string, string> = {
    "Manifestor": "Inform before you act",
    "Generator": "Wait to respond",
    "Manifesting Generator": "Wait to respond, then inform",
    "Projector": "Wait for the invitation",
    "Reflector": "Wait a lunar cycle"
  };

  return strategies[type] || "Follow your inner authority";
}
