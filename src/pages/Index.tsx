import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BirthDateInput from '@/components/BirthDateInput';
import TarotCard from '@/components/TarotCard';
import QuantumWave from '@/components/QuantumWave';
import { drawMinorArcana, drawMajorArcana, getCombinedReading } from '@/utils/tarotData';
import { toast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent } from '@/components/ui/card';

const PHI = 1.618033988749895;

interface BirthDates {
  date1?: string;
  date2?: string;
}

const POSITIONS = [
  { 
    id: 'foundation', 
    frequency: 1/PHI, 
    x: 100, 
    y: 200, 
    color: '#EC4899',
    description: 'Foundation and current influences'
  },
  { 
    id: 'path', 
    frequency: 1, 
    x: 300, 
    y: 150, 
    color: '#8B5CF6',
    description: 'Path ahead and opportunities'
  },
  { 
    id: 'challenge', 
    frequency: PHI, 
    x: 500, 
    y: 150, 
    color: '#14B8A6',
    description: 'Challenges and obstacles'
  },
  { 
    id: 'outcome', 
    frequency: PHI * PHI, 
    x: 700, 
    y: 200, 
    color: '#F59E0B',
    description: 'Final outcome (Major Arcana)'
  }
];

const Index = () => {
  const [birthDates, setBirthDates] = useState<BirthDates | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [revealedCards, setRevealedCards] = useState<string[]>([]);
  const [drawnCards, setDrawnCards] = useState<Record<string, any>>({});
  const isMobile = useIsMobile();

  // Adjust positions for mobile
  const getMobilePosition = (pos: typeof POSITIONS[0]) => {
    if (!isMobile) return pos;
    const mobilePositions = {
      foundation: { x: 20, y: 150 },
      path: { x: 120, y: 100 },
      challenge: { x: 220, y: 100 },
      outcome: { x: 320, y: 150 }
    };
    return { ...pos, ...mobilePositions[pos.id as keyof typeof mobilePositions] };
  };

  useEffect(() => {
    let frameId: number;
    if (isRunning) {
      const animate = () => {
        setTime(t => (t + 0.02) % (Math.PI * 2));
        frameId = requestAnimationFrame(animate);
      };
      frameId = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(frameId);
  }, [isRunning]);

  const handleStart = (dates: BirthDates) => {
    setBirthDates(dates);
    setIsRunning(true);
    const initialCards: Record<string, any> = {};
    POSITIONS.forEach(pos => {
      initialCards[pos.id] = pos.id === 'outcome' ? drawMajorArcana() : drawMinorArcana();
    });
    setDrawnCards(initialCards);
    
    const peopleCount = Object.values(dates).filter(Boolean).length;
    toast({
      title: "Quantum Entanglement Initiated",
      description: `Reading initialized for ${peopleCount === 0 ? 'general guidance' : 
        peopleCount === 1 ? 'personal guidance' : 'relationship guidance'}. Click each card to reveal your reading.`,
    });
  };

  const handleCardClick = (id: string) => {
    if (!revealedCards.includes(id)) {
      setRevealedCards(prev => [...prev, id]);
      
      toast({
        title: `${id.charAt(0).toUpperCase() + id.slice(1)} Card Revealed`,
        description: `${drawnCards[id].name} - ${drawnCards[id].isReversed ? 'Reversed' : 'Upright'}`,
      });

      // Show combined reading when all cards are revealed
      if (revealedCards.length === POSITIONS.length - 1) {
        setTimeout(() => {
          toast({
            title: "Complete Reading",
            description: getCombinedReading(drawnCards),
            duration: 10000,
          });
        }, 1000);
      }
    }
  };

  if (!birthDates) {
    return <BirthDateInput onStart={handleStart} />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto relative"
      >
        {/* Reality Layer Animations */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 360],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-teal-500/30 quantum-spin" />
        </motion.div>

        <div className="absolute inset-0">
          <svg width="100%" height={isMobile ? "400" : "600"} className="absolute inset-0">
            {/* Quantum Connection Lines */}
            {POSITIONS.map((pos, i) => (
              POSITIONS.slice(i + 1).map((nextPos, j) => {
                const start = getMobilePosition(pos);
                const end = getMobilePosition(nextPos);
                return (
                  <motion.line
                    key={`${pos.id}-${nextPos.id}`}
                    x1={start.x + 30}
                    y1={start.y + 40}
                    x2={end.x + 30}
                    y2={end.y + 40}
                    stroke="#4B5563"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                    opacity="0.3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                );
              })
            ))}

            {/* Quantum Waves */}
            {POSITIONS.map(pos => {
              const adjustedPos = getMobilePosition(pos);
              return (
                <QuantumWave
                  key={`wave-${pos.id}`}
                  startX={adjustedPos.x - 20}
                  startY={adjustedPos.y + 40}
                  frequency={pos.frequency}
                  color={pos.color}
                  time={time}
                />
              );
            })}
          </svg>
        </div>

      {/* Tarot Cards */}
      <div className="relative pt-20">
        {POSITIONS.map((pos) => {
          const adjustedPos = getMobilePosition(pos);
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
              onClick={() => handleCardClick(pos.id)}
            />
          );
        })}
      </div>

      {/* Information Panel */}
      <motion.div 
        className="fixed bottom-4 left-4 right-4 bg-gray-800/80 p-4 rounded-lg backdrop-blur-sm"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="text-sm text-gray-300">
          <div className="font-bold mb-2">Reading Guide:</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {POSITIONS.map(pos => (
              <div key={pos.id} style={{ color: pos.color }}>
                {pos.id.charAt(0).toUpperCase() + pos.id.slice(1)}: {pos.description}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
