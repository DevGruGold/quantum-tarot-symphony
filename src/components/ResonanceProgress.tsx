import React from 'react';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

interface ResonanceProgressProps {
  resonance: number;
  color: string;
}

const ResonanceProgress = ({ resonance, color }: ResonanceProgressProps) => {
  const percentage = resonance * 100;
  
  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm">
        <span>Resonance</span>
        <span style={{ color }}>{percentage.toFixed(1)}%</span>
      </div>
      <Progress 
        value={percentage} 
        className="h-2"
        style={{
          '--progress-background': color + '40',
          '--progress-foreground': color
        } as React.CSSProperties}
      />
      {percentage >= 100 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-center"
          style={{ color }}
        >
          ✨ Perfect Resonance Achieved
        </motion.div>
      )}
    </div>
  );
};

export default ResonanceProgress;