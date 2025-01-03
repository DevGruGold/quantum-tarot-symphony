import React from 'react';
import { motion } from 'framer-motion';
import TarotCard from './TarotCard';
import { TarotCard as TarotCardType } from '@/utils/tarotData';
import { useIsMobile } from '@/hooks/use-mobile';

interface TarotSpreadProps {
  positions: Array<{
    id: string;
    frequency: number;
    color: string;
    description: string;
    x: number;
    y: number;
  }>;
  drawnCards: Record<string, TarotCardType>;
  revealedCards: string[];
  onCardClick: (id: string) => void;
  isRunning: boolean;
  time: number;
}

const TarotSpread = ({ positions, drawnCards, revealedCards, onCardClick, isRunning, time }: TarotSpreadProps) => {
  const isMobile = useIsMobile();

  const getPosition = (pos: typeof positions[0]) => {
    if (!isMobile) return pos;
    const mobilePositions = {
      past: { x: 50, y: 200 },
      present: { x: 150, y: 150 },
      future: { x: 250, y: 200 },
      above: { x: 150, y: 50 },
      below: { x: 150, y: 250 },
      advice: { x: 350, y: 150 }
    };
    return { 
      ...pos, 
      ...mobilePositions[pos.id as keyof typeof mobilePositions] 
    };
  };

  return (
    <div className="relative pt-20">
      {positions.map((pos) => {
        const adjustedPos = getPosition(pos);
        return (
          <TarotCard
            key={pos.id}
            position={pos.id}
            color={pos.color}
            x={adjustedPos.x}
            y={adjustedPos.y}
            frequency={pos.frequency}
            isRevealed={revealedCards.includes(pos.id)}
            card={drawnCards[pos.id]}
            onClick={() => onCardClick(pos.id)}
          />
        );
      })}
    </div>
  );
};

export default TarotSpread;