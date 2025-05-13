
import React from 'react';
import { motion } from 'framer-motion';
import TarotCard from './TarotCard';
import { TarotCard as TarotCardType } from '@/utils/tarotData';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sparkles } from 'lucide-react';

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

  const getSpreadClassName = () => {
    return isMobile 
      ? "flex flex-col items-center gap-14 pt-6 pb-24 min-h-[100vh] overflow-y-auto snap-y snap-mandatory"
      : "relative pt-20";
  };

  const getCardContainerClassName = (index: number) => {
    return isMobile
      ? "w-full min-h-[80vh] flex flex-col items-center justify-center snap-start snap-always"
      : "absolute";
  };

  return (
    <div className={getSpreadClassName()}>
      {positions.map((pos, index) => {
        if (isMobile) {
          // Mobile layout: vertical scroll with each card in its own section
          return (
            <motion.div 
              key={pos.id}
              className={getCardContainerClassName(index)}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="mb-3 flex items-center justify-center">
                <Sparkles className="w-4 h-4 mr-1 text-white/60" />
                <span className="text-sm font-semibold uppercase tracking-wider text-white/80">
                  {pos.id}
                </span>
                <Sparkles className="w-4 h-4 ml-1 text-white/60" />
              </div>
              
              <TarotCard
                position={pos.id}
                color={pos.color}
                x={0}
                y={0}
                frequency={pos.frequency}
                isRevealed={revealedCards.includes(pos.id)}
                card={drawnCards[pos.id]}
                onClick={() => onCardClick(pos.id)}
              />
              
              <div className="mt-5 max-w-xs text-center text-white/70 text-sm">
                <p>{pos.description}</p>
              </div>

              {index < positions.length - 1 && (
                <motion.div 
                  className="mt-10 text-white/40"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  ↓ Scroll for next card ↓
                </motion.div>
              )}
            </motion.div>
          );
        } else {
          // Desktop layout: original cross layout with absolute positioning
          return (
            <TarotCard
              key={pos.id}
              position={pos.id}
              color={pos.color}
              x={pos.x}
              y={pos.y}
              frequency={pos.frequency}
              isRevealed={revealedCards.includes(pos.id)}
              card={drawnCards[pos.id]}
              onClick={() => onCardClick(pos.id)}
            />
          );
        }
      })}
    </div>
  );
};

export default TarotSpread;
