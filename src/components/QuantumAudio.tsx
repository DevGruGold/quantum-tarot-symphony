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
    // Initialize audio context on first interaction
    const initAudio = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
        gainNodeRef.current = audioContextRef.current.createGain();
        gainNodeRef.current.connect(audioContextRef.current.destination);
        gainNodeRef.current.gain.value = 0.1; // Set volume to 10%
        
        // Remove the click event listener after initialization
        document.removeEventListener('click', initAudio);
      }
    };

    document.addEventListener('click', initAudio);
    return () => document.removeEventListener('click', initAudio);
  }, []);

  useEffect(() => {
    if (!audioContextRef.current || !gainNodeRef.current) return;

    if (isPlaying) {
      // Create and configure oscillator
      oscillatorRef.current = audioContextRef.current.createOscillator();
      oscillatorRef.current.type = 'sine';
      oscillatorRef.current.frequency.value = 220 * frequency; // Base frequency * quantum frequency
      oscillatorRef.current.connect(gainNodeRef.current);
      oscillatorRef.current.start();
    } else {
      // Stop and cleanup oscillator
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
        oscillatorRef.current = null;
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

  return null; // Audio component doesn't render anything
};

export default QuantumAudio;