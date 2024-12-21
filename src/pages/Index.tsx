import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BirthDateInput from '@/components/BirthDateInput';
import QuantumWave from '@/components/QuantumWave';
import TarotCard from '@/components/TarotCard';

const PHI = 1.618033988749895;

const positions = [
  { 
    id: 'past', 
    frequency: 1/PHI, 
    x: 100, 
    y: 200, 
    color: '#EC4899',
  },
  { 
    id: 'present', 
    frequency: 1, 
    x: 400, 
    y: 150, 
    color: '#8B5CF6',
  },
  { 
    id: 'future', 
    frequency: PHI, 
    x: 700, 
    y: 200, 
    color: '#14B8A6',
  }
];

const Index = () => {
  const [birthDate, setBirthDate] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [revealedCards, setRevealedCards] = useState<string[]>([]);

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

  const handleStart = (date: string) => {
    setBirthDate(date);
    setIsRunning(true);
  };

  const handleCardClick = (id: string) => {
    if (!revealedCards.includes(id)) {
      setRevealedCards(prev => [...prev, id]);
    }
  };

  if (!birthDate) {
    return <BirthDateInput onStart={handleStart} />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto relative"
      >
        <div className="absolute inset-0">
          <svg width="100%" height="600" className="absolute inset-0">
            {positions.map(pos => (
              <QuantumWave
                key={pos.id}
                startX={pos.x}
                startY={pos.y + 150}
                frequency={pos.frequency}
                color={pos.color}
                time={time}
              />
            ))}
          </svg>
        </div>

        <div className="relative pt-20">
          {positions.map((pos) => (
            <TarotCard
              key={pos.id}
              position={pos.id}
              color={pos.color}
              x={pos.x}
              y={pos.y}
              frequency={pos.frequency}
              isRevealed={revealedCards.includes(pos.id)}
              onClick={() => handleCardClick(pos.id)}
            />
          ))}
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-sm text-gray-300">
              <div className="font-bold mb-2">Quantum-Tarot Frequencies:</div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-pink-400">Past: 1/φ Hz</div>
                <div className="text-purple-400">Present: 1 Hz</div>
                <div className="text-teal-400">Future: φ Hz</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;