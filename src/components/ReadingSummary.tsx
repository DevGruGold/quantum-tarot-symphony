
import React from 'react';
import { TarotCard } from '@/utils/tarotData';
import { motion } from 'framer-motion';
import { Atom, Sparkles } from 'lucide-react';

interface ReadingSummaryProps {
  cards: Record<string, TarotCard>;
  isVisible: boolean;
  quantumEntanglement?: Record<string, number>;
}

const ReadingSummary = ({ cards, isVisible, quantumEntanglement = {} }: ReadingSummaryProps) => {
  if (!isVisible || Object.keys(cards).length === 0) return null;

  const getPositionMeaning = (position: string, card: TarotCard) => {
    const meanings: Record<string, string> = {
      past: "influences from your past",
      present: "current situation",
      future: "potential future outcomes",
      above: "spiritual guidance",
      below: "subconscious influences",
      advice: "guidance for your journey"
    };
    
    return `The ${card.name} in ${position} position represents ${meanings[position]}, suggesting ${card.isReversed ? 'challenges with' : 'an emphasis on'} ${card.keywords.join(' and ')}.`;
  };

  const getSummary = () => {
    const cardReadings = Object.entries(cards).map(([position, card]) => 
      getPositionMeaning(position, card)
    );

    return `${cardReadings.join(' ')} Overall, this reading suggests a journey of ${
      Object.values(cards).some(card => card.isReversed) 
        ? 'transformation through challenges' 
        : 'natural progression and growth'
    }.`;
  };

  const getQuantumInsights = () => {
    // If no quantum entanglement data, return a general insight
    if (Object.keys(quantumEntanglement).length === 0) {
      return "The quantum field remains unobserved, with all possibilities still in superposition.";
    }

    // Find the strongest entanglement
    let strongestPair = '';
    let highestScore = 0;
    
    Object.entries(quantumEntanglement).forEach(([pair, score]) => {
      if (score > highestScore) {
        highestScore = score;
        strongestPair = pair;
      }
    });

    if (strongestPair) {
      const [pos1, pos2] = strongestPair.split('-');
      return `Quantum entanglement analysis reveals a strong connection (${(highestScore * 100).toFixed(0)}%) between your ${pos1} and ${pos2}. This indicates these aspects of your life are deeply interconnected through the quantum field.`;
    }

    return "Quantum analysis shows mild entanglement between the different aspects of your reading.";
  };

  const getCoherenceScore = () => {
    // Calculate a "quantum coherence" score based on card positions, reversals, and entanglement
    let reversalFactor = 0;
    Object.values(cards).forEach(card => {
      if (card.isReversed) reversalFactor += 0.15;
    });
    
    let entanglementFactor = 0;
    Object.values(quantumEntanglement).forEach(score => {
      entanglementFactor += score / 10;
    });
    
    // Score from 0-100
    const coherence = Math.min(100, Math.max(0, 70 + (entanglementFactor * 30) - (reversalFactor * 20)));
    
    let coherenceMessage;
    if (coherence > 80) {
      coherenceMessage = "exceptionally high quantum coherence, indicating a clear path forward and harmonious alignment with your true purpose";
    } else if (coherence > 60) {
      coherenceMessage = "good quantum coherence, suggesting your life energies are generally flowing in alignment";
    } else if (coherence > 40) {
      coherenceMessage = "moderate quantum coherence, indicating some life aspects may need attention to align with your true path";
    } else {
      coherenceMessage = "lower quantum coherence, suggesting you may be experiencing conflicting energies that need resolution";
    }
    
    return `Quantum coherence analysis: ${Math.round(coherence)}% - Your reading shows ${coherenceMessage}.`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-4 left-4 right-4 bg-black/90 text-white p-4 rounded-lg backdrop-blur-sm z-50 max-h-[60vh] overflow-y-auto border border-white/10"
    >
      <div className="flex items-center justify-center mb-3">
        <Sparkles className="w-5 h-5 mr-2 text-purple-400" />
        <h3 className="text-lg font-bold">Quantum Tarot Reading</h3>
        <Atom className="w-5 h-5 ml-2 text-blue-400" />
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-purple-300 mb-1">Traditional Tarot Insights</h4>
          <p className="text-sm leading-relaxed">{getSummary()}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold text-blue-300 mb-1">Quantum Entanglement Analysis</h4>
          <p className="text-sm leading-relaxed">{getQuantumInsights()}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold text-cyan-300 mb-1">Quantum Coherence</h4>
          <p className="text-sm leading-relaxed">{getCoherenceScore()}</p>
        </div>
      </div>
      
      <motion.div 
        className="w-full h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent my-3"
        animate={{ 
          backgroundPosition: ["0% 0%", "100% 0%"],
          opacity: [0.3, 0.8, 0.3] 
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      <p className="text-xs text-center text-white/60 mt-2">
        This holistic analysis combines traditional tarot wisdom with quantum field theory to provide deeper insights.
      </p>
    </motion.div>
  );
};

export default ReadingSummary;
