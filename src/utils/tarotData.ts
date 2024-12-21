export interface TarotCard {
  name: string;
  meaning: string;
  reverseChance: number;
  isReversed?: boolean;
}

export const tarotDeck: TarotCard[] = [
  {
    name: "The Fool",
    meaning: "New beginnings, innocence, spontaneity",
    reverseChance: 0.5
  },
  {
    name: "The Magician",
    meaning: "Manifestation, resourcefulness, power",
    reverseChance: 0.5
  },
  {
    name: "The High Priestess",
    meaning: "Intuition, sacred knowledge, divine feminine",
    reverseChance: 0.5
  },
  // ... Add more cards as needed
];

export const drawCard = (): TarotCard => {
  const card = { ...tarotDeck[Math.floor(Math.random() * tarotDeck.length)] };
  card.isReversed = Math.random() < card.reverseChance;
  return card;
};

export const calculateQuantumResonance = (frequency: number, card: TarotCard): number => {
  // Simulate quantum entanglement effect
  const baseResonance = Math.sin(frequency * Math.PI) * 0.5 + 0.5;
  const cardInfluence = card.isReversed ? -0.3 : 0.3;
  return Math.max(0, Math.min(1, baseResonance + cardInfluence));
};