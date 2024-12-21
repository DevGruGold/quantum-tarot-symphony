import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TarotCard as TarotCardType } from '@/utils/tarotData';
import { calculateQuantumResonance } from '@/utils/tarotData';
import { toast } from '@/hooks/use-toast';

interface TarotCardProps {
  position: string;
  color: string;
  x: number;
  y: number;
  frequency: number;
  isRevealed: boolean;
  card?: TarotCardType;
  onClick: () => void;
}

const TarotCard = ({ position, color, x, y, frequency, isRevealed, card, onClick }: TarotCardProps) => {
  const [resonance, setResonance] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (card) {
      setResonance(calculateQuantumResonance(frequency, card));
    }
  }, [frequency, card]);

  const handleHover = () => {
    setIsHovered(true);
    toast({
      title: `${position.charAt(0).toUpperCase() + position.slice(1)} Frequency Guide`,
      description: `Current resonance: ${(resonance * 100).toFixed(1)}%. ${
        resonance < 0.5 
          ? "Focus your thoughts to align with this timeline's frequency." 
          : "Your thoughts are harmonizing well with this position."
      }`,
      duration: 2000,
    });
  };

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{ top: y, left: x }}
      whileHover={{ scale: 1.1 }}
      onClick={onClick}
      onHoverStart={handleHover}
      onHoverEnd={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div 
          key={isRevealed ? 'revealed' : 'hidden'}
          initial={{ rotateY: isRevealed ? 180 : 0 }}
          animate={{ rotateY: isRevealed ? 0 : 180 }}
          transition={{ duration: 0.6 }}
          className="w-40 h-64 rounded-lg relative"
          style={{
            transformStyle: 'preserve-3d',
            perspective: '1000px'
          }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br rounded-lg"
            style={{ 
              background: `linear-gradient(45deg, ${color}${Math.floor(resonance * 100)}, ${color}99)`,
              border: `2px solid ${color}`,
              boxShadow: `0 0 ${20 + resonance * 20}px ${color}${Math.floor(resonance * 100)}`,
              transform: isRevealed ? 'rotateY(0deg)' : 'rotateY(180deg)',
              backfaceVisibility: 'hidden'
            }}
            animate={isHovered ? {
              boxShadow: [
                `0 0 ${20 + resonance * 20}px ${color}${Math.floor(resonance * 100)}`,
                `0 0 ${40 + resonance * 40}px ${color}${Math.floor(resonance * 100)}`,
                `0 0 ${20 + resonance * 20}px ${color}${Math.floor(resonance * 100)}`
              ]
            } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {isRevealed && card && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white">
                <div className="text-xl font-bold mb-2" style={{ 
                  transform: card.isReversed ? 'rotate(180deg)' : 'none' 
                }}>
                  {card.name}
                </div>
                <div className="text-sm text-center">
                  {position.charAt(0).toUpperCase() + position.slice(1)}
                  <br />
                  Frequency: {frequency.toFixed(3)}φ
                  <br />
                  Resonance: {(resonance * 100).toFixed(1)}%
                </div>
              </div>
            )}
          </motion.div>
          
          <div 
            className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg"
            style={{
              transform: isRevealed ? 'rotateY(180deg)' : 'rotateY(0deg)',
              backfaceVisibility: 'hidden',
              border: `2px solid ${color}40`
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                className="text-4xl quantum-pulse"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🌟
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default TarotCard;