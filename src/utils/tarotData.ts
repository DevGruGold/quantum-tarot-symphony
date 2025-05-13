
// Tarot Card Data and Drawing Functions
export interface TarotCard {
  name: string;
  keywords: string[];
  meaning: string;
  isReversed: boolean;
}

// Major Arcana Cards Data
const majorArcana: Omit<TarotCard, 'isReversed'>[] = [
  {
    name: "The Fool",
    keywords: ["beginnings", "innocence", "spontaneity"],
    meaning: "The Fool represents new beginnings, having faith in the future, and being inexperienced."
  },
  {
    name: "The Magician",
    keywords: ["manifestation", "resourcefulness", "power"],
    meaning: "The Magician represents manifestation, resourcefulness, and inspired action."
  },
  {
    name: "The High Priestess",
    keywords: ["intuition", "unconscious", "inner voice"],
    meaning: "The High Priestess represents intuition, unconscious knowledge, and inner voice."
  },
  {
    name: "The Empress",
    keywords: ["femininity", "beauty", "nature"],
    meaning: "The Empress represents femininity, beauty, nature, nurturing, and abundance."
  },
  {
    name: "The Emperor",
    keywords: ["authority", "structure", "control"],
    meaning: "The Emperor represents authority, establishment, structure, and a father figure."
  },
  {
    name: "The Hierophant",
    keywords: ["tradition", "conformity", "morality"],
    meaning: "The Hierophant represents tradition, conformity, and moral/ethical principles."
  },
  {
    name: "The Lovers",
    keywords: ["love", "harmony", "relationships"],
    meaning: "The Lovers represents love, harmony, relationships, values alignment, and choices."
  },
  {
    name: "The Chariot",
    keywords: ["control", "willpower", "success"],
    meaning: "The Chariot represents control, willpower, victory, assertion, and determination."
  },
  {
    name: "Strength",
    keywords: ["courage", "patience", "compassion"],
    meaning: "Strength represents courage, patience, compassion, soft control, and resilience."
  },
  {
    name: "The Hermit",
    keywords: ["soul-searching", "introspection", "guidance"],
    meaning: "The Hermit represents soul-searching, introspection, being alone, inner guidance."
  },
  {
    name: "Wheel of Fortune",
    keywords: ["change", "cycles", "fate"],
    meaning: "The Wheel of Fortune represents good luck, karma, life cycles, destiny, and turning points."
  },
  {
    name: "Justice",
    keywords: ["fairness", "truth", "law"],
    meaning: "Justice represents fairness, truth, cause and effect, and law."
  },
  {
    name: "The Hanged Man",
    keywords: ["surrender", "perspective", "sacrifice"],
    meaning: "The Hanged Man represents surrender, new perspective, suspending action, and sacrifice."
  },
  {
    name: "Death",
    keywords: ["transformation", "endings", "change"],
    meaning: "Death represents endings, change, transformation, and transition."
  },
  {
    name: "Temperance",
    keywords: ["balance", "moderation", "patience"],
    meaning: "Temperance represents balance, moderation, patience, and purpose."
  },
  {
    name: "The Devil",
    keywords: ["shadow", "addiction", "restriction"],
    meaning: "The Devil represents shadow self, attachment, addiction, and restriction."
  },
  {
    name: "The Tower",
    keywords: ["sudden change", "upheaval", "revelation"],
    meaning: "The Tower represents sudden change, upheaval, chaos, revelation, and awakening."
  },
  {
    name: "The Star",
    keywords: ["hope", "spirituality", "renewal"],
    meaning: "The Star represents hope, faith, purpose, renewal, and spirituality."
  },
  {
    name: "The Moon",
    keywords: ["illusion", "fear", "subconscious"],
    meaning: "The Moon represents illusion, fear, anxiety, subconscious, and intuition."
  },
  {
    name: "The Sun",
    keywords: ["joy", "success", "celebration"],
    meaning: "The Sun represents joy, success, celebration, positivity, and vitality."
  },
  {
    name: "Judgement",
    keywords: ["rebirth", "inner calling", "absolution"],
    meaning: "Judgement represents rebirth, inner calling, and absolution."
  },
  {
    name: "The World",
    keywords: ["completion", "accomplishment", "travel"],
    meaning: "The World represents completion, accomplishment, and travel."
  }
];

// Minor Arcana Suits
const suits = ["Wands", "Cups", "Swords", "Pentacles"];

// Minor Arcana Cards Data
const minorArcana: Omit<TarotCard, 'isReversed'>[] = [];

// Generate court cards
const courtRanks = ["Page", "Knight", "Queen", "King"];
courtRanks.forEach(rank => {
  suits.forEach(suit => {
    let keywords: string[] = [];
    let meaning = "";
    
    switch(suit) {
      case "Wands":
        keywords = ["passion", "inspiration", "creativity"];
        meaning = `The ${rank} of Wands represents the ${rank}'s approach to passion, creativity, and ambition.`;
        break;
      case "Cups":
        keywords = ["emotion", "intuition", "relationships"];
        meaning = `The ${rank} of Cups represents the ${rank}'s approach to emotions, relationships, and intuition.`;
        break;
      case "Swords":
        keywords = ["intellect", "communication", "truth"];
        meaning = `The ${rank} of Swords represents the ${rank}'s approach to intellect, communication, and truth.`;
        break;
      case "Pentacles":
        keywords = ["resources", "abundance", "practicality"];
        meaning = `The ${rank} of Pentacles represents the ${rank}'s approach to material resources, abundance, and practicality.`;
        break;
    }
    
    minorArcana.push({
      name: `${rank} of ${suit}`,
      keywords,
      meaning
    });
  });
});

// Generate numbered cards
for (let i = 1; i <= 10; i++) {
  suits.forEach(suit => {
    let keywords: string[] = [];
    let meaning = "";
    
    switch(suit) {
      case "Wands":
        keywords = ["passion", "inspiration", "creativity"];
        meaning = `The ${i} of Wands represents level ${i} of passion, creativity, and ambition.`;
        break;
      case "Cups":
        keywords = ["emotion", "intuition", "relationships"];
        meaning = `The ${i} of Cups represents level ${i} of emotions, relationships, and intuition.`;
        break;
      case "Swords":
        keywords = ["intellect", "communication", "truth"];
        meaning = `The ${i} of Swords represents level ${i} of intellect, communication, and truth.`;
        break;
      case "Pentacles":
        keywords = ["resources", "abundance", "practicality"];
        meaning = `The ${i} of Pentacles represents level ${i} of material resources, abundance, and practicality.`;
        break;
    }
    
    minorArcana.push({
      name: `${i} of ${suit}`,
      keywords,
      meaning
    });
  });
}

// Calculate quantum resonance for tarot card selection
export const calculateQuantumResonance = (date1?: string, date2?: string): number => {
  // Convert dates to numbers and create a quantum-inspired seed
  const now = new Date();
  const seed1 = date1 ? new Date(date1).getTime() : now.getTime();
  const seed2 = date2 ? new Date(date2).getTime() : now.getTime() + 86400000; // Add a day if no second date
  
  // Create a pseudo-quantum number by using modular arithmetic and bitwise operations
  const quantumSeed = (seed1 * seed2) % 2147483647;
  const phi = 1.618033988749895;
  
  // Generate a normalized resonance value between 0 and 1
  return ((Math.sin(quantumSeed * phi) + 1) / 2);
};

// Drawing functions with quantum influence capability
export const drawMajorArcana = (quantumInfluence?: number): TarotCard => {
  let index: number;
  
  if (typeof quantumInfluence === 'number') {
    // Use quantum influence to select a card
    index = Math.floor(quantumInfluence * majorArcana.length);
  } else {
    // Use traditional random selection
    index = Math.floor(Math.random() * majorArcana.length);
  }
  
  const isReversed = Math.random() > 0.7; // 30% chance of reversed
  return { ...majorArcana[index], isReversed };
};

export const drawMinorArcana = (quantumInfluence?: number): TarotCard => {
  let index: number;
  
  if (typeof quantumInfluence === 'number') {
    // Use quantum influence to select a card
    index = Math.floor(quantumInfluence * minorArcana.length);
  } else {
    // Use traditional random selection
    index = Math.floor(Math.random() * minorArcana.length);
  }
  
  const isReversed = Math.random() > 0.7; // 30% chance of reversed
  return { ...minorArcana[index], isReversed };
};

