import React from 'react';
import { motion } from 'framer-motion';

interface MeditationStepProps {
  emoji: string;
  instruction: string;
  isActive: boolean;
}

const MeditationStep = ({ emoji, instruction, isActive }: MeditationStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isActive ? 1 : 0.5, 
        y: isActive ? 0 : 10,
        scale: isActive ? 1.1 : 1
      }}
      className="flex flex-col items-center space-y-4 p-4"
    >
      <motion.div 
        className="text-6xl quantum-float"
        animate={isActive ? {
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0]
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {emoji}
      </motion.div>
      <p className="text-lg text-center font-medium">{instruction}</p>
    </motion.div>
  );
};

export default MeditationStep;