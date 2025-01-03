import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MeditationStep from './MeditationStep';
import QuantumAudio from '../QuantumAudio';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';

const MEDITATION_STEPS = [
  { emoji: '🧘', instruction: 'Find a comfortable position and take a deep breath...' },
  { emoji: '👁️', instruction: 'Close your eyes and focus on your breathing...' },
  { emoji: '✨', instruction: 'Feel the energy flowing through your body...' },
  { emoji: '🌟', instruction: 'Connect with the quantum field around you...' },
  { emoji: '🎴', instruction: 'Open your mind to receive the cards\' messages...' }
];

interface MeditationGuideProps {
  onComplete: () => void;
}

const MeditationGuide = ({ onComplete }: MeditationGuideProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isSkipped, setIsSkipped] = useState(false);

  useEffect(() => {
    if (isSkipped) return;

    const stepDuration = 10000; // 10 seconds per step
    const interval = 100; // Update progress every 100ms
    const incrementAmount = (100 / MEDITATION_STEPS.length) / (stepDuration / interval);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + incrementAmount;
        if (newProgress >= ((currentStep + 1) * 100) / MEDITATION_STEPS.length) {
          if (currentStep < MEDITATION_STEPS.length - 1) {
            setCurrentStep(prev => prev + 1);
            // Trigger haptic feedback if available
            if (navigator.vibrate) {
              navigator.vibrate(200);
            }
          } else {
            clearInterval(progressInterval);
            onComplete();
          }
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(progressInterval);
  }, [currentStep, onComplete, isSkipped]);

  const handleSkip = () => {
    setIsSkipped(true);
    toast({
      title: "Meditation Skipped",
      description: "Remember, taking time to center yourself can enhance your reading experience.",
    });
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center p-4 z-50"
    >
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Prepare Your Mind</h2>
          <Progress value={progress} className="mb-8" />
        </div>

        <div className="relative h-48">
          {MEDITATION_STEPS.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: currentStep === index ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <MeditationStep
                emoji={step.emoji}
                instruction={step.instruction}
                isActive={currentStep === index}
              />
            </motion.div>
          ))}
        </div>

        <QuantumAudio 
          frequency={432 + (currentStep * 8)} // Base frequency of 432Hz with slight variations
          isPlaying={!isSkipped}
        />

        <Button 
          variant="outline" 
          onClick={handleSkip}
          className="w-full mt-4"
        >
          Skip Meditation
        </Button>
      </div>
    </motion.div>
  );
};

export default MeditationGuide;