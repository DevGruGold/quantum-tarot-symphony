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
  { name: "The Fool", meaning: "New beginnings, spontaneity, faith, apparent folly", reverseChance: 0.5, type: 'major' },
  { name: "The Magician", meaning: "Manifestation, resourcefulness, power, skill", reverseChance: 0.5, type: 'major' },
  { name: "The High Priestess", meaning: "Intuition, mystery, spiritual insight, divine knowledge", reverseChance: 0.5, type: 'major' },
  { name: "The Empress", meaning: "Fertility, nurturing, abundance, nature connection", reverseChance: 0.5, type: 'major' },
  { name: "The Emperor", meaning: "Authority, structure, control, fatherhood", reverseChance: 0.5, type: 'major' },
  { name: "The Hierophant", meaning: "Tradition, conformity, morality, ethics", reverseChance: 0.5, type: 'major' },
  { name: "The Lovers", meaning: "Love, harmony, relationships, choices", reverseChance: 0.5, type: 'major' },
  { name: "The Chariot", meaning: "Control, willpower, determination, success", reverseChance: 0.5, type: 'major' },
  { name: "Strength", meaning: "Courage, patience, control, compassion", reverseChance: 0.5, type: 'major' },
  { name: "The Hermit", meaning: "Soul-searching, introspection, inner guidance", reverseChance: 0.5, type: 'major' },
  { name: "Wheel of Fortune", meaning: "Change, cycles, inevitable fate, turning point", reverseChance: 0.5, type: 'major' },
  { name: "Justice", meaning: "Justice, fairness, truth, cause and effect", reverseChance: 0.5, type: 'major' },
  { name: "The Hanged Man", meaning: "Surrender, letting go, new perspective", reverseChance: 0.5, type: 'major' },
  { name: "Death", meaning: "Endings, change, transformation, transition", reverseChance: 0.5, type: 'major' },
  { name: "Temperance", meaning: "Balance, moderation, patience, purpose", reverseChance: 0.5, type: 'major' },
  { name: "The Devil", meaning: "Shadow self, attachment, addiction, restriction", reverseChance: 0.5, type: 'major' },
  { name: "The Tower", meaning: "Sudden change, upheaval, chaos, revelation", reverseChance: 0.5, type: 'major' },
  { name: "The Star", meaning: "Hope, faith, purpose, renewal, spirituality", reverseChance: 0.5, type: 'major' },
  { name: "The Moon", meaning: "Illusion, fear, anxiety, subconscious, intuition", reverseChance: 0.5, type: 'major' },
  { name: "The Sun", meaning: "Joy, success, celebration, positivity", reverseChance: 0.5, type: 'major' },
  { name: "Judgement", meaning: "Rebirth, inner calling, absolution", reverseChance: 0.5, type: 'major' },
  { name: "The World", meaning: "Completion, integration, accomplishment, travel", reverseChance: 0.5, type: 'major' }
];

// Minor Arcana
const createMinorArcana = (suit: string, element: string): TarotCard[] => {
  const numbers = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];
  const courts = ['Page', 'Knight', 'Queen', 'King'];
  
  const numberCards = numbers.map(num => ({
    name: `${num} of ${suit}`,
    meaning: `${num} energy of ${element}`,
    reverseChance: 0.5,
    type: 'minor' as const,
    suit,
    element
  }));

  const courtCards = courts.map(court => ({
    name: `${court} of ${suit}`,
    meaning: `${court} energy of ${element}`,
    reverseChance: 0.5,
    type: 'minor' as const,
    suit,
    element
  }));

  return [...numberCards, ...courtCards];
};

const minorArcana: TarotCard[] = [
  ...createMinorArcana('Wands', 'Fire'),
  ...createMinorArcana('Cups', 'Water'),
  ...createMinorArcana('Swords', 'Air'),
  ...createMinorArcana('Pentacles', 'Earth')
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
  const baseResonance = Math.sin(frequency * Math.PI) * 0.5 + 0.5;
  const cardInfluence = card.isReversed ? -0.3 : 0.3;
  return Math.max(0, Math.min(1, baseResonance + cardInfluence));
};

export const getCombinedReading = (cards: Record<string, TarotCard>): string => {
  let reading = "🌟 Your Quantum Tarot Reading 🌟\n\n";
  
  const positions = [
    { id: 'past', name: 'Past Influences' },
    { id: 'present', name: 'Present Situation' },
    { id: 'future', name: 'Future Potential' },
    { id: 'above', name: 'Higher Self' },
    { id: 'below', name: 'Subconscious' },
    { id: 'advice', name: 'Guidance' }
  ];

  positions.forEach(({ id, name }) => {
    const card = cards[id];
    if (card) {
      reading += `${name}: ${card.name} ${card.isReversed ? '(Reversed)' : ''}\n`;
      reading += `${card.meaning}\n\n`;
    }
  });

  reading += "\n✨ Holistic Summary ✨\n";
  reading += "The cards are suggesting a journey through time and consciousness. ";
  reading += "Consider how the past influences shown in your reading have shaped your present moment, ";
  reading += "and how your current choices may ripple into the future possibilities revealed. ";
  reading += "Your higher self and subconscious are in dialogue through these cards, ";
  reading += "offering guidance for your path forward.";

  return reading;
};