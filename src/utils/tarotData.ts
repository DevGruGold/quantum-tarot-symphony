export interface TarotCard {
  name: string;
  meaning: string;
  reverseChance: number;
  isReversed?: boolean;
  type: 'major' | 'minor';
  suit?: string;
  element?: string;
}

// Major Arcana
const majorArcana: TarotCard[] = [
  {
    name: "The Fool",
    meaning: "New beginnings, innocence, spontaneity, free spirit",
    reverseChance: 0.5,
    type: 'major'
  },
  {
    name: "The Magician",
    meaning: "Manifestation, resourcefulness, power, inspired action",
    reverseChance: 0.5,
    type: 'major'
  },
  {
    name: "The High Priestess",
    meaning: "Intuition, sacred knowledge, divine feminine, the subconscious mind",
    reverseChance: 0.5,
    type: 'major'
  },
  {
    name: "The Empress",
    meaning: "Femininity, beauty, nature, nurturing, abundance",
    reverseChance: 0.5,
    type: 'major'
  },
  {
    name: "The Emperor",
    meaning: "Authority, establishment, structure, a father figure",
    reverseChance: 0.5,
    type: 'major'
  }
];

// Minor Arcana
const minorArcana: TarotCard[] = [
  // Wands (Fire)
  {
    name: "Ace of Wands",
    meaning: "Creation, willpower, inspiration, desire",
    reverseChance: 0.5,
    type: 'minor',
    suit: 'wands',
    element: 'fire'
  },
  {
    name: "Two of Wands",
    meaning: "Future planning, progress, decisions, discovery",
    reverseChance: 0.5,
    type: 'minor',
    suit: 'wands',
    element: 'fire'
  },
  // Cups (Water)
  {
    name: "Ace of Cups",
    meaning: "New feelings, spirituality, intuition",
    reverseChance: 0.5,
    type: 'minor',
    suit: 'cups',
    element: 'water'
  },
  {
    name: "Two of Cups",
    meaning: "Unity, partnership, connection",
    reverseChance: 0.5,
    type: 'minor',
    suit: 'cups',
    element: 'water'
  },
  // Swords (Air)
  {
    name: "Ace of Swords",
    meaning: "Breakthrough, clarity, sharp mind",
    reverseChance: 0.5,
    type: 'minor',
    suit: 'swords',
    element: 'air'
  },
  // Pentacles (Earth)
  {
    name: "Ace of Pentacles",
    meaning: "Opportunity, prosperity, new venture",
    reverseChance: 0.5,
    type: 'minor',
    suit: 'pentacles',
    element: 'earth'
  }
];

export const drawMinorArcana = (): TarotCard => {
  const card = { ...minorArcana[Math.floor(Math.random() * minorArcana.length)] };
  card.isReversed = Math.random() < card.reverseChance;
  return card;
};

export const drawMajorArcana = (): TarotCard => {
  const card = { ...majorArcana[Math.floor(Math.random() * majorArcana.length)] };
  card.isReversed = Math.random() < card.reverseChance;
  return card;
};

export const calculateQuantumResonance = (frequency: number, card: TarotCard): number => {
  // Simulate quantum entanglement effect
  const baseResonance = Math.sin(frequency * Math.PI) * 0.5 + 0.5;
  const cardInfluence = card.isReversed ? -0.3 : 0.3;
  return Math.max(0, Math.min(1, baseResonance + cardInfluence));
};

export const getCombinedReading = (cards: Record<string, TarotCard>): string => {
  const positions = ['foundation', 'path', 'challenge', 'outcome'];
  let reading = '';

  positions.forEach((pos) => {
    const card = cards[pos];
    if (card) {
      reading += `${pos.charAt(0).toUpperCase() + pos.slice(1)}: ${card.name} ${card.isReversed ? '(Reversed)' : ''} - ${card.meaning}\n`;
    }
  });

  return reading;
};
