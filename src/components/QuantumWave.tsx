import React from 'react';

interface QuantumWaveProps {
  startX: number;
  startY: number;
  frequency: number;
  color: string;
  time: number;
}

const QuantumWave = ({ startX, startY, frequency, color, time }: QuantumWaveProps) => {
  const generateWavePath = () => {
    const points = [];
    const steps = 20;
    for (let i = 0; i < steps; i++) {
      const x = startX + (i * 10);
      const y = startY + Math.sin(time * frequency + i / 2) * 20;
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  };

  return (
    <polyline
      points={generateWavePath()}
      fill="none"
      stroke={color}
      strokeWidth="2"
      opacity="0.5"
      className="quantum-glow"
    />
  );
};

export default QuantumWave;