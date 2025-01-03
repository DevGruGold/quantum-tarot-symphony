import React from 'react';
import { TarotCard } from '@/utils/tarotData';
import { motion } from 'framer-motion';

interface ReadingSummaryProps {
  cards: Record<string, TarotCard>;
  isVisible: boolean;
}

const ReadingSummary = ({ cards, isVisible }: ReadingSummaryProps) => {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-4 left-4 right-4 bg-black/80 text-white p-4 rounded-lg backdrop-blur-sm z-50 max-h-[30vh] overflow-y-auto"
    >
      <h3 className="text-lg font-bold mb-2">Reading Summary</h3>
      <p className="text-sm leading-relaxed">{getSummary()}</p>
    </motion.div>
  );
};

export default ReadingSummary;