import React from 'react';
import { motion } from 'framer-motion';

interface MeditationStepProps {
  instruction: string;
  isActive: boolean;
  color: string;
}

const MeditationStep = ({ instruction, isActive, color }: MeditationStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isActive ? 1 : 0,
        y: 0
      }}
      className="flex flex-col items-center space-y-4 p-4"
    >
      <motion.p 
        className="text-lg text-center font-medium"
        animate={{
          color: color
        }}
      >
        {instruction}
      </motion.p>
    </motion.div>
  );
};

export default MeditationStep;