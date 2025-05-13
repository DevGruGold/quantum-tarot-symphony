import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BirthDateInput from '@/components/BirthDateInput';
import TarotSpread from '@/components/TarotSpread';
import ReadingSummary from '@/components/ReadingSummary';
import MeditationGuide from '@/components/meditation/MeditationGuide';
import { drawMinorArcana, drawMajorArcana, TarotCard } from '@/utils/tarotData';
import { toast } from '@/hooks/use-toast';
import { 
  initializeQuantumCircuit, 
  applyEntanglement, 
  performQuantumMeasurement, 
  verifyApiKey 
} from '@/utils/quantumAPI';

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
    description: 'Past influences and history that have shaped your current reality'
  },
  { 
    id: 'present', 
    frequency: 1, 
    x: 300, 
    y: 150, 
    color: '#8B5CF6',
    description: 'The current situation and energies surrounding you now'
  },
  { 
    id: 'future', 
    frequency: PHI, 
    x: 450, 
    y: 200, 
    color: '#14B8A6',
    description: 'Potential outcomes and future possibilities if current path continues'
  },
  { 
    id: 'above', 
    frequency: PHI * 1.5, 
    x: 300, 
    y: 50, 
    color: '#F59E0B',
    description: 'Higher self guidance and spiritual influences affecting you'
  },
  { 
    id: 'below', 
    frequency: 1/PHI * 0.5, 
    x: 300, 
    y: 250, 
    color: '#6366F1',
    description: 'Subconscious influences and hidden factors at work beneath the surface'
  },
  { 
    id: 'advice', 
    frequency: PHI * 2, 
    x: 600, 
    y: 150, 
    color: '#EF4444',
    description: 'Final guidance from a Major Arcana card to navigate your situation'
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
  const [quantumCircuitId, setQuantumCircuitId] = useState<string | null>(null);
  const [quantumEntanglement, setQuantumEntanglement] = useState<Record<string, number>>({});

  useEffect(() => {
    // Verify IBM-Q API key on component mount
    const apiKeyStatus = verifyApiKey();
    if (apiKeyStatus.status === 'verified') {
      console.log('IBM Quantum API key verified successfully');
      toast({
        title: "Quantum API Connected",
        description: "Successfully connected to IBM Quantum Experience.",
      });
    } else {
      console.error('IBM Quantum API key verification failed');
      toast({
        title: "Quantum API Connection Failed",
        description: "Unable to connect to quantum computing services.",
        variant: "destructive"
      });
    }
  }, []);

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

  // Calculate quantum entanglement effects between cards
  useEffect(() => {
    if (revealedCards.length >= 2) {
      const entanglementScores: Record<string, number> = {};
      
      // Calculate entanglement between each pair of revealed cards
      for (let i = 0; i < revealedCards.length; i++) {
        for (let j = i + 1; j < revealedCards.length; j++) {
          const posA = revealedCards[i];
          const posB = revealedCards[j];
          const cardA = drawnCards[posA];
          const cardB = drawnCards[posB];
          
          // Simplified quantum entanglement calculation
          const entanglementScore = Math.abs(
            Math.sin((cardA.isReversed ? -1 : 1) * POSITIONS.find(p => p.id === posA)!.frequency * 
            (cardB.isReversed ? -1 : 1) * POSITIONS.find(p => p.id === posB)!.frequency)
          );
          
          entanglementScores[`${posA}-${posB}`] = entanglementScore;
          
          // If high entanglement, show a toast notification
          if (entanglementScore > 0.8 && !quantumEntanglement[`${posA}-${posB}`]) {
            toast({
              title: "⚛️ Quantum Entanglement Detected!",
              description: `Strong connection between ${posA} and ${posB} cards.`,
            });
          }
        }
      }
      
      setQuantumEntanglement(entanglementScores);
    }
  }, [revealedCards]);

  const handleStart = async (dates: BirthDates) => {
    setBirthDates(dates);
    setShowMeditation(true);
    
    // Initialize quantum circuit for this session
    try {
      const circuit = await initializeQuantumCircuit(6); // 6 qubits for 6 cards
      if (circuit.status === 'initialized') {
        setQuantumCircuitId(circuit.circuitId);
        toast({
          title: "Quantum Circuit Initialized",
          description: "A dedicated quantum circuit has been prepared for your reading.",
        });
      }
    } catch (error) {
      console.error('Error initializing quantum circuit:', error);
    }
  };

  const handleMeditationComplete = async () => {
    setShowMeditation(false);
    setIsRunning(true);
    
    // If we have a quantum circuit, perform entanglement operations
    if (quantumCircuitId) {
      // Create quantum entanglement between positions
      applyEntanglement(quantumCircuitId, 0, 1); // Past and present
      applyEntanglement(quantumCircuitId, 1, 2); // Present and future
      applyEntanglement(quantumCircuitId, 3, 4); // Above and below
      
      // Perform quantum measurement to influence card drawing
      const measurement = performQuantumMeasurement(quantumCircuitId);
      
      if (measurement.status === 'measured') {
        // Use quantum measurements to influence card selection
        const initialCards: Record<string, TarotCard> = {};
        
        POSITIONS.forEach((pos, index) => {
          // Use quantum measurement to influence card selection
          const quantumInfluence = measurement.results[index].value;
          initialCards[pos.id] = pos.id === 'advice' 
            ? drawMajorArcana(quantumInfluence) 
            : drawMinorArcana(quantumInfluence);
        });
        
        setDrawnCards(initialCards);
        
        toast({
          title: "Quantum Entanglement Completed",
          description: "Your cards have been quantumly entangled. Tap each card to reveal its message.",
        });
      }
    } else {
      // Fallback to non-quantum card drawing
      const initialCards: Record<string, TarotCard> = {};
      POSITIONS.forEach(pos => {
        initialCards[pos.id] = pos.id === 'advice' ? drawMajorArcana() : drawMinorArcana();
      });
      setDrawnCards(initialCards);
      
      toast({
        title: "Cards Drawn",
        description: "Your cards have been drawn. Click each card to reveal its message and meaning.",
      });
    }
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
          quantumEntanglement={quantumEntanglement}
        />
      </motion.div>
    </div>
  );
};

export default Index;
