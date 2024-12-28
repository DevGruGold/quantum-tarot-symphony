import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TarotCard as TarotCardType } from '@/utils/tarotData';
import { calculateQuantumResonance } from '@/utils/tarotData';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import QuantumAudio from './QuantumAudio';
import ResonanceProgress from './ResonanceProgress';

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
  const [canReveal, setCanReveal] = useState(false);

  useEffect(() => {
    if (card) {
      const newResonance = calculateQuantumResonance(frequency, card);
      setResonance(newResonance);
      setCanReveal(newResonance >= 1);
    }
  }, [frequency, card]);

  const handleClick = () => {
    if (!isRevealed && !canReveal) {
      toast({
        title: "Resonance Not Achieved",
        description: "Focus your thoughts to achieve 100% resonance before revealing the card.",
        variant: "destructive"
      });
      return;
    }
    onClick();
  };

  const handleHover = () => {
    setIsHovered(true);
    if (!isRevealed) {
      toast({
        title: `${position.charAt(0).toUpperCase() + position.slice(1)} Frequency Guide`,
        description: `Current resonance: ${(resonance * 100).toFixed(1)}%. ${
          resonance < 1 
            ? "Focus your thoughts to align with this timeline's frequency." 
            : "Your thoughts are harmonizing perfectly with this position."
        }`,
        duration: 2000,
      });
    }
  };

  const getCardArtwork = (cardName: string) => {
    // Map card names to their corresponding artwork
    const artworkMap: Record<string, string> = {
      'The Fool': '🃏',
      'The Magician': '🎭',
      'The High Priestess': '👑',
      'The Empress': '👸',
      'The Emperor': '🤴',
      'The Hierophant': '⛪',
      'The Lovers': '💑',
      'The Chariot': '🏃',
      'Strength': '💪',
      'The Hermit': '🧙',
      'Wheel of Fortune': '🎡',
      'Justice': '⚖️',
      'The Hanged Man': '🙃',
      'Death': '💀',
      'Temperance': '🕊️',
      'The Devil': '😈',
      'The Tower': '🗼',
      'The Star': '⭐',
      'The Moon': '🌙',
      'The Sun': '☀️',
      'Judgement': '📯',
      'The World': '🌍',
    };
    
    return artworkMap[cardName] || '🌟';
  };

  return (
    <>
      <QuantumAudio frequency={frequency} isPlaying={isHovered} />
      <motion.div
        className="absolute cursor-pointer"
        style={{ top: y, left: x }}
        whileHover={{ scale: 1.1 }}
        onClick={handleClick}
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
              className={cn(
                "absolute inset-0 rounded-lg flex flex-col items-center justify-center",
                "bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm"
              )}
              style={{ 
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
                  <div className="text-8xl mb-4 quantum-float">
                    {getCardArtwork(card.name)}
                  </div>
                  <div className="text-xl font-bold mb-2 text-center" style={{ 
                    transform: card.isReversed ? 'rotate(180deg)' : 'none' 
                  }}>
                    {card.name}
                  </div>
                  <div className="text-sm text-center mt-2">
                    {position.charAt(0).toUpperCase() + position.slice(1)}
                    <br />
                    Frequency: {frequency.toFixed(3)}φ
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
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <motion.div 
                  className="text-6xl quantum-pulse mb-4"
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
                  ✨
                </motion.div>
                <ResonanceProgress resonance={resonance} color={color} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default TarotCard;