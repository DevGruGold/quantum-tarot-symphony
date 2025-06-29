import React from 'react';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

interface ResonanceProgressProps {
  resonance: number;
  color: string;
  isActive: boolean;
}

const ResonanceProgress = ({ resonance, color, isActive }: ResonanceProgressProps) => {
  const percentage = resonance * 100;
  
  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm font-semibold">
        <span>Thought Focus</span>
        <motion.span 
          style={{ color }}
          animate={{ 
            opacity: isActive ? [0.5, 1, 0.5] : 1 
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity 
          }}
        >
          {percentage.toFixed(1)}%
        </motion.span>
      </div>
      <Progress 
        value={percentage} 
        className="h-4 relative overflow-hidden"
        style={{
          background: `${color}20`,
        }}
      >
        <motion.div 
          className="absolute inset-0 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}80, ${color})`,
            width: `${percentage}%`,
          }}
          animate={{
            opacity: isActive ? [0.6, 1, 0.6] : 0.8
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        />
      </Progress>
      {percentage >= 100 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-center font-medium"
          style={{ color }}
        >
          ✨ Ready to Reveal
        </motion.div>
      )}
      {percentage < 100 && (
        <motion.div 
          className="text-sm text-center"
          style={{ color }}
          animate={{ opacity: isActive ? [0.5, 1, 0.5] : 0.8 }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Hold to focus your thoughts...
        </motion.div>
      )}
    </div>
  );
};

export default ResonanceProgress;