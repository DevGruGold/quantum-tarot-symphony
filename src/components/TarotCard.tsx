
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TarotCard as TarotCardType } from '@/utils/tarotData';
import { calculateQuantumResonance } from '@/utils/tarotData';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import QuantumAudio from './QuantumAudio';
import ResonanceProgress from './ResonanceProgress';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sparkle } from 'lucide-react';

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
  const [hasVibrated, setHasVibrated] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    let intervalId: number;
    
    // For mobile, make resonance build faster
    const resonanceIncrement = isMobile ? 0.08 : 0.05;
    const resonanceDecrement = isMobile ? 0.05 : 0.03;
    
    if (isPressed && !isRevealed && !canReveal) {
      intervalId = window.setInterval(() => {
        setResonance(prev => {
          const newValue = Math.min(prev + resonanceIncrement, 1);
          if (newValue >= 1) {
            setCanReveal(true);
            toast({
              title: "✨ Resonance Achieved!",
              description: "The card is ready to be revealed. Tap it to see your reading.",
            });
            // Vibrate for mobile if available
            if (isMobile && 'navigator' in window && 'vibrate' in navigator) {
              navigator.vibrate([100, 50, 100]);
              setHasVibrated(true);
            }
          }
          return newValue;
        });
      }, 100);
    } else if (!isPressed && !isRevealed) {
      intervalId = window.setInterval(() => {
        setResonance(prev => Math.max(prev - resonanceDecrement, 0));
      }, 100);
    }
    return () => window.clearInterval(intervalId);
  }, [isPressed, isRevealed, canReveal, isMobile]);

  // For mobile, tap the card once to start resonance and tap again to reveal
  const handleClick = () => {
    if (isMobile && !isRevealed && resonance === 0) {
      setIsPressed(true);
      setAudioEnabled(true);
      
      // Auto-release after 1.5 seconds
      setTimeout(() => {
        setIsPressed(false);
        setCanReveal(true);
        setAudioEnabled(false);
        
        // Vibrate for mobile if available
        if ('navigator' in window && 'vibrate' in navigator) {
          navigator.vibrate([50, 25, 50]);
        }
        
        toast({
          title: "Card Resonance Complete",
          description: "Tap again to reveal your card.",
        });
      }, 1500);
      
      return;
    }
    
    if (!isRevealed && !canReveal) {
      if (isMobile) {
        setIsPressed(true);
      } else {
        toast({
          title: "Resonance Not Achieved",
          description: "Hold your finger on the card and focus your thoughts until 100% resonance is achieved.",
          variant: "destructive"
        });
      }
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

  // Removed absolute positioning for mobile layout
  const cardContainerClassName = isMobile ? "" : "absolute";
  
  // Generate a card-specific quantum pattern
  const generatePattern = () => {
    if (!card) return '';
    
    // Use the card's name to generate a consistent pattern
    const nameHash = card.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const pattern = (nameHash % 5) + 1;
    
    return `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23${color.substring(1)}' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`;
  };

  return (
    <>
      <QuantumAudio frequency={frequency} isPlaying={audioEnabled && isPressed} />
      <motion.div
        className={cardContainerClassName}
        style={!isMobile ? { top: y, left: x } : {}}
        whileTap={isMobile ? { scale: 0.97 } : { scale: 1.1 }}
        onTouchStart={isMobile ? undefined : handlePressStart}
        onTouchEnd={isMobile ? undefined : handlePressEnd}
        onMouseDown={isMobile ? undefined : handlePressStart}
        onMouseUp={isMobile ? undefined : handlePressEnd}
        onMouseLeave={isMobile ? undefined : handlePressEnd}
        onClick={handleClick}
      >
        <AnimatePresence mode="wait">
          <motion.div 
            key={isRevealed ? 'revealed' : 'hidden'}
            initial={{ rotateY: isRevealed ? 180 : 0 }}
            animate={{ rotateY: isRevealed ? 0 : 180 }}
            transition={{ duration: 0.6 }}
            className={cn(
              "w-24 h-36 md:w-32 md:h-48 rounded-lg relative",
              isMobile && "w-64 h-96"  // Larger cards on mobile
            )}
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
                backfaceVisibility: 'hidden',
                backgroundImage: isRevealed && card ? generatePattern() : 'none',
              }}
            >
              {isRevealed && card && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white">
                  <motion.div 
                    className="text-4xl md:text-5xl mb-4 quantum-float"
                    animate={{
                      y: [0, -10, 0],
                      filter: ['drop-shadow(0 0 8px rgba(255,255,255,0.3))', 'drop-shadow(0 0 16px rgba(255,255,255,0.6))', 'drop-shadow(0 0 8px rgba(255,255,255,0.3))']
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {getCardArtwork(card.name)}
                  </motion.div>
                  <div className={cn(
                    "text-sm md:text-base font-bold mb-1 text-center",
                    isMobile && "text-xl mb-3"
                  )} style={{ 
                    transform: card.isReversed ? 'rotate(180deg)' : 'none' 
                  }}>
                    {card.name}
                  </div>
                  <div className={cn(
                    "text-xs text-center mt-1",
                    isMobile && "text-sm mt-3"
                  )}>
                    {position.charAt(0).toUpperCase() + position.slice(1)}
                  </div>
                  
                  {isMobile && (
                    <div className="mt-5 text-xs px-4 text-center text-white/80">
                      <p>{card.meaning}</p>
                    </div>
                  )}
                  
                  {/* Quantum particles effect for revealed cards */}
                  {isRevealed && (
                    <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-white rounded-full"
                          initial={{ 
                            x: Math.random() * 100 + "%", 
                            y: Math.random() * 100 + "%",
                            opacity: 0
                          }}
                          animate={{ 
                            x: [
                              Math.random() * 100 + "%",
                              Math.random() * 100 + "%", 
                              Math.random() * 100 + "%"
                            ],
                            y: [
                              Math.random() * 100 + "%", 
                              Math.random() * 100 + "%",
                              Math.random() * 100 + "%"
                            ],
                            opacity: [0, 0.8, 0]
                          }}
                          transition={{ 
                            duration: 8 + Math.random() * 4,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />
                      ))}
                    </div>
                  )}
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
                {isMobile ? (
                  <>
                    <motion.div className="text-xs text-white/60 mb-1">
                      Tap to {resonance > 0 ? "reveal" : "focus"}
                    </motion.div>
                    <div className="relative">
                      <motion.div 
                        className="text-4xl quantum-pulse mb-2"
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
                        <Sparkle className="w-8 h-8 text-white/80" />
                      </motion.div>
                      
                      {/* Particle effects */}
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-white rounded-full"
                          style={{
                            top: "50%",
                            left: "50%",
                          }}
                          animate={{
                            x: [0, (Math.random() - 0.5) * 40],
                            y: [0, (Math.random() - 0.5) * 40],
                            opacity: [0, 1, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <>
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
                  </>
                )}
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
