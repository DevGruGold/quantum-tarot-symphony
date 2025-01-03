import React from 'react';
import { motion } from 'framer-motion';

interface SacredGeometryProps {
  type: 'circle' | 'flower' | 'star' | 'merkaba' | 'spiral';
  color: string;
  isActive: boolean;
}

const SacredGeometry = ({ type, color, isActive }: SacredGeometryProps) => {
  const getGeometryPath = () => {
    switch (type) {
      case 'circle':
        return 'M50,10 A40,40 0 1,1 49.9999,10';
      case 'flower':
        return `M50,50 m-25,0 a25,25 0 1,0 50,0 a25,25 0 1,0 -50,0
               M50,50 m-20,-15 a25,25 0 1,0 40,30 a25,25 0 1,0 -40,-30
               M50,50 m-20,15 a25,25 0 1,0 40,-30 a25,25 0 1,0 -40,30`;
      case 'star':
        return 'M50,10 L61,40 L94,40 L69,60 L79,90 L50,73 L21,90 L31,60 L6,40 L39,40 Z';
      case 'merkaba':
        return `M50,10 L90,70 L10,70 Z M50,90 L10,30 L90,30 Z`;
      case 'spiral':
        return 'M50,50 m0,0 a1,1 0 0,1 10,10 a2,2 0 0,1 -20,-20 a3,3 0 0,1 30,30 a4,4 0 0,1 -40,-40';
      default:
        return '';
    }
  };

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: isActive ? 1 : 0,
        scale: isActive ? [1, 1.1, 1] : 0.8,
        rotate: isActive ? [0, 360] : 0
      }}
      transition={{ 
        duration: 6,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-48 h-48"
      >
        <motion.path
          d={getGeometryPath()}
          fill="none"
          stroke={color}
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ 
            pathLength: isActive ? [0, 1, 0] : 0,
            opacity: isActive ? [0.3, 0.8, 0.3] : 0.3
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </svg>
    </motion.div>
  );
};

export default SacredGeometry;