import React, { useEffect, useRef } from 'react';

interface QuantumAudioProps {
  frequency: number;
  isPlaying: boolean;
}

const QuantumAudio = ({ frequency, isPlaying }: QuantumAudioProps) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    const initAudio = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        gainNodeRef.current = audioContextRef.current.createGain();
        gainNodeRef.current.connect(audioContextRef.current.destination);
        gainNodeRef.current.gain.value = 0.1; // Lower volume for comfort
      }
    };

    if (isPlaying) {
      initAudio();
      
      if (audioContextRef.current && gainNodeRef.current) {
        oscillatorRef.current = audioContextRef.current.createOscillator();
        oscillatorRef.current.type = 'sine';
        oscillatorRef.current.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);
        oscillatorRef.current.connect(gainNodeRef.current);
        
        // Smooth start
        gainNodeRef.current.gain.setValueAtTime(0, audioContextRef.current.currentTime);
        gainNodeRef.current.gain.linearRampToValueAtTime(0.1, audioContextRef.current.currentTime + 0.5);
        
        oscillatorRef.current.start();
        
        console.log(`Playing frequency: ${frequency}Hz`);
      }
    }

    return () => {
      if (oscillatorRef.current && gainNodeRef.current && audioContextRef.current) {
        // Smooth stop
        gainNodeRef.current.gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + 0.5);
        
        setTimeout(() => {
          oscillatorRef.current?.stop();
          oscillatorRef.current?.disconnect();
          oscillatorRef.current = null;
        }, 500);
      }
    };
  }, [isPlaying, frequency]);

  return null;
};

export default QuantumAudio;