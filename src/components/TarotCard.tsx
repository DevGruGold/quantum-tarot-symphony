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
  const [isPressed, setIsPressed] = useState(false);
  const [canReveal, setCanReveal] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  useEffect(() => {
    let intervalId: number;
    if (isPressed && !isRevealed && !canReveal) {
      intervalId = window.setInterval(() => {
        setResonance(prev => {
          const newValue = Math.min(prev + 0.05, 1);
          if (newValue >= 1) {
            setCanReveal(true);
            toast({
              title: "✨ Resonance Achieved!",
              description: "The card is ready to be revealed. Tap it to see your reading.",
            });
          }
          return newValue;
        });
      }, 100);
    } else if (!isPressed && !isRevealed) {
      intervalId = window.setInterval(() => {
        setResonance(prev => Math.max(prev - 0.03, 0));
      }, 100);
    }
    return () => window.clearInterval(intervalId);
  }, [isPressed, isRevealed, canReveal]);

  const handleClick = () => {
    if (!isRevealed && !canReveal) {
      toast({
        title: "Resonance Not Achieved",
        description: "Hold your finger on the card and focus your thoughts until 100% resonance is achieved.",
        variant: "destructive"
      });
      return;
    }
    onClick();
  };

  const handlePressStart = () => {
    setIsPressed(true);
    setAudioEnabled(true);
  };

  const handlePressEnd = () => {
    setIsPressed(false);
    setAudioEnabled(false);
  };

  const getCardArtwork = (cardName: string) => {
    const artworkMap: Record<string, string> = {
      'The Fool': '🃏', 'The Magician': '🎭', 'The High Priestess': '👑',
      'The Empress': '👸', 'The Emperor': '🤴', 'The Hierophant': '⛪',
      'The Lovers': '💑', 'The Chariot': '🏃', 'Strength': '💪',
      'The Hermit': '🧙', 'Wheel of Fortune': '🎡', 'Justice': '⚖️',
      'The Hanged Man': '🙃', 'Death': '💀', 'Temperance': '🕊️',
      'The Devil': '😈', 'The Tower': '🗼', 'The Star': '⭐',
      'The Moon': '🌙', 'The Sun': '☀️', 'Judgement': '📯',
      'The World': '🌍'
    };
    return artworkMap[cardName] || '🌟';
  };

  return (
    <>
      <QuantumAudio frequency={frequency} isPlaying={audioEnabled && isPressed} />
      <motion.div
        className="absolute touch-none"
        style={{ top: y, left: x }}
        whileTap={{ scale: 1.1 }}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
        onClick={handleClick}
      >
        <AnimatePresence mode="wait">
          <motion.div 
            key={isRevealed ? 'revealed' : 'hidden'}
            initial={{ rotateY: isRevealed ? 180 : 0 }}
            animate={{ rotateY: isRevealed ? 0 : 180 }}
            transition={{ duration: 0.6 }}
            className="w-24 h-36 md:w-32 md:h-48 rounded-lg relative"
            style={{
              transformStyle: 'preserve-3d',
              perspective: '1000px'
            }}
          >
            {/* Front of card (revealed state) */}
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
            >
              {isRevealed && card && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white">
                  <div className="text-4xl mb-2 quantum-float">
                    {getCardArtwork(card.name)}
                  </div>
                  <div className="text-sm font-bold mb-1 text-center" style={{ 
                    transform: card.isReversed ? 'rotate(180deg)' : 'none' 
                  }}>
                    {card.name}
                  </div>
                  <div className="text-xs text-center mt-1">
                    {position.charAt(0).toUpperCase() + position.slice(1)}
                  </div>
                </div>
              )}
            </motion.div>
            
            {/* Back of card (unrevealed state) */}
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
                  className="text-3xl quantum-pulse mb-2"
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
                <ResonanceProgress resonance={resonance} color={color} isActive={isPressed} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default TarotCard;