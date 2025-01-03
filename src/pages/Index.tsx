import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BirthDateInput from '@/components/BirthDateInput';
import TarotSpread from '@/components/TarotSpread';
import ReadingSummary from '@/components/ReadingSummary';
import MeditationGuide from '@/components/meditation/MeditationGuide';
import { drawMinorArcana, drawMajorArcana, TarotCard } from '@/utils/tarotData';
import { toast } from '@/hooks/use-toast';

const PHI = 1.618033988749895;

interface BirthDates {
  date1?: string;
  date2?: string;
}

const POSITIONS = [
  { 
    id: 'past', 
    frequency: 1/PHI, 
    x: 150, 
    y: 200, 
    color: '#EC4899',
    description: 'Past influences and history'
  },
  { 
    id: 'present', 
    frequency: 1, 
    x: 300, 
    y: 150, 
    color: '#8B5CF6',
    description: 'Present situation'
  },
  { 
    id: 'future', 
    frequency: PHI, 
    x: 450, 
    y: 200, 
    color: '#14B8A6',
    description: 'Future potential'
  },
  { 
    id: 'above', 
    frequency: PHI * 1.5, 
    x: 300, 
    y: 50, 
    color: '#F59E0B',
    description: 'Higher self guidance'
  },
  { 
    id: 'below', 
    frequency: 1/PHI * 0.5, 
    x: 300, 
    y: 250, 
    color: '#6366F1',
    description: 'Subconscious influences'
  },
  { 
    id: 'advice', 
    frequency: PHI * 2, 
    x: 600, 
    y: 150, 
    color: '#EF4444',
    description: 'Final guidance (Major Arcana)'
  }
];

const Index = () => {
  const [birthDates, setBirthDates] = useState<BirthDates | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [revealedCards, setRevealedCards] = useState<string[]>([]);
  const [drawnCards, setDrawnCards] = useState<Record<string, TarotCard>>({});
  const [showMeditation, setShowMeditation] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

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
    setShowMeditation(true);
    const initialCards: Record<string, TarotCard> = {};
    POSITIONS.forEach(pos => {
      initialCards[pos.id] = pos.id === 'advice' ? drawMajorArcana() : drawMinorArcana();
    });
    setDrawnCards(initialCards);
  };

  const handleMeditationComplete = () => {
    setShowMeditation(false);
    setIsRunning(true);
    toast({
      title: "Quantum Entanglement Initiated",
      description: "Your cards have been drawn. Click each card to reveal its message and meaning.",
    });
  };

  const handleCardClick = (id: string) => {
    if (!revealedCards.includes(id)) {
      setRevealedCards(prev => [...prev, id]);
      
      toast({
        title: `${id.charAt(0).toUpperCase() + id.slice(1)} Card Revealed`,
        description: `${drawnCards[id].name} - ${drawnCards[id].isReversed ? 'Reversed' : 'Upright'}`,
      });

      if (revealedCards.length === POSITIONS.length - 1) {
        setShowSummary(true);
      }
    }
  };

  if (!birthDates) {
    return <BirthDateInput onStart={handleStart} />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background p-4">
      <AnimatePresence>
        {showMeditation && (
          <MeditationGuide onComplete={handleMeditationComplete} />
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto relative"
      >
        <TarotSpread
          positions={POSITIONS}
          drawnCards={drawnCards}
          revealedCards={revealedCards}
          onCardClick={handleCardClick}
          isRunning={isRunning}
          time={time}
        />

        <ReadingSummary 
          cards={drawnCards}
          isVisible={showSummary}
        />
      </motion.div>
    </div>
  );
};

export default Index;