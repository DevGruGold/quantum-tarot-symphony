import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MeditationStep from './MeditationStep';
import QuantumAudio from '../QuantumAudio';
import SacredGeometry from './SacredGeometry';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { toast } from '@/hooks/use-toast';

const MEDITATION_STEPS = [
  { 
    instruction: 'Ground yourself and connect with Earth\'s frequency...',
    frequency: 432,
    geometry: 'circle',
    color: '#4CAF50'
  },
  { 
    instruction: 'Allow transformation to flow through you...',
    frequency: 528,
    geometry: 'flower',
    color: '#9C27B0'
  },
  { 
    instruction: 'Open your heart to universal connection...',
    frequency: 639,
    geometry: 'star',
    color: '#E91E63'
  },
  { 
    instruction: 'Activate your inner vision and intuition...',
    frequency: 741,
    geometry: 'merkaba',
    color: '#3F51B5'
  },
  { 
    instruction: 'Connect with higher consciousness...',
    frequency: 852,
    geometry: 'spiral',
    color: '#9C27B0'
  }
];

interface MeditationGuideProps {
  onComplete: () => void;
}

const MeditationGuide = ({ onComplete }: MeditationGuideProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isSkipped, setIsSkipped] = useState(false);
  const [isAudioInitialized, setIsAudioInitialized] = useState(false);

  useEffect(() => {
    if (isSkipped) return;

    const stepDuration = 12000; // 12 seconds per step
    const interval = 100; // Update progress every 100ms
    const incrementAmount = (100 / MEDITATION_STEPS.length) / (stepDuration / interval);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + incrementAmount;
        if (newProgress >= ((currentStep + 1) * 100) / MEDITATION_STEPS.length) {
          if (currentStep < MEDITATION_STEPS.length - 1) {
            setCurrentStep(prev => prev + 1);
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

  const initializeAudio = () => {
    setIsAudioInitialized(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center p-4 z-50"
    >
      <div className="max-w-md w-full space-y-8">
        {!isAudioInitialized && (
          <Button 
            onClick={initializeAudio}
            className="w-full mb-4"
          >
            Begin Sound Journey
          </Button>
        )}

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Sacred Geometry Meditation</h2>
          <Progress value={progress} className="mb-8" />
        </div>

        <div className="relative h-80">
          <SacredGeometry
            type={MEDITATION_STEPS[currentStep].geometry as any}
            color={MEDITATION_STEPS[currentStep].color}
            isActive={!isSkipped && isAudioInitialized}
          />
          
          {MEDITATION_STEPS.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: currentStep === index ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <MeditationStep
                instruction={step.instruction}
                isActive={currentStep === index}
                color={step.color}
              />
            </motion.div>
          ))}
        </div>

        <QuantumAudio 
          frequency={MEDITATION_STEPS[currentStep].frequency}
          isPlaying={!isSkipped && isAudioInitialized}
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