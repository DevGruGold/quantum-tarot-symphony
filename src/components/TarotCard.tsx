import React from 'react';
import { motion } from 'framer-motion';

interface TarotCardProps {
  position: string;
  color: string;
  x: number;
  y: number;
  frequency: number;
  isRevealed: boolean;
  onClick: () => void;
}

const TarotCard = ({ position, color, x, y, frequency, isRevealed, onClick }: TarotCardProps) => {
  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{ top: y, left: x }}
      whileHover={{ scale: 1.1 }}
      onClick={onClick}
    >
      <div 
        className={`w-40 h-64 rounded-lg relative overflow-hidden transition-transform duration-1000 transform ${
          isRevealed ? 'rotate-0' : 'rotate-180'
        }`}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        <div 
          className="absolute inset-0 bg-gradient-to-br"
          style={{ 
            background: `linear-gradient(45deg, ${color}33, ${color}66)`,
            border: `2px solid ${color}`,
            boxShadow: `0 0 20px ${color}33`
          }}
        />
        
        {isRevealed && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-xl font-bold mb-2">{position}</div>
              <div className="text-sm">Frequency: {frequency.toFixed(3)}φ</div>
            </div>
          </div>
        )}
        
        {!isRevealed && (
          <div 
            className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"
            style={{
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden'
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl">🌟</div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TarotCard;