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
    // Initialize audio context
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.connect(audioContextRef.current.destination);
      gainNodeRef.current.gain.value = 0.15; // Set volume to 15%
    }

    if (isPlaying && audioContextRef.current && gainNodeRef.current) {
      // Create and configure oscillator
      oscillatorRef.current = audioContextRef.current.createOscillator();
      oscillatorRef.current.type = 'sine';
      // Map frequency to audible range (220-880Hz)
      oscillatorRef.current.frequency.value = 220 + (frequency * 220);
      oscillatorRef.current.connect(gainNodeRef.current);
      
      // Smooth start
      gainNodeRef.current.gain.setValueAtTime(0, audioContextRef.current.currentTime);
      gainNodeRef.current.gain.linearRampToValueAtTime(0.15, audioContextRef.current.currentTime + 0.1);
      
      oscillatorRef.current.start();
    } else {
      // Smooth stop and cleanup
      if (oscillatorRef.current && gainNodeRef.current && audioContextRef.current) {
        gainNodeRef.current.gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + 0.1);
        setTimeout(() => {
          if (oscillatorRef.current) {
            oscillatorRef.current.stop();
            oscillatorRef.current.disconnect();
            oscillatorRef.current = null;
          }
        }, 100);
      }
    }

    return () => {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
        oscillatorRef.current = null;
      }
    };
  }, [isPlaying, frequency]);

  return null;
};

export default QuantumAudio;