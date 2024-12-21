import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import FrequencyGuide from './FrequencyGuide';

interface BirthDateInputProps {
  onStart: (date: string) => void;
}

const BirthDateInput = ({ onStart }: BirthDateInputProps) => {
  const [birthDate, setBirthDate] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (birthDate) {
      onStart(birthDate);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-8">
      <div className="quantum-float">
        <div className="text-4xl font-bold text-center mb-2">🌟 Quantum Tarot</div>
        <div className="text-xl text-center text-muted-foreground">Enter your birth date to begin the quantum journey</div>
      </div>
      
      <FrequencyGuide />
      
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <Input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="w-full text-center text-lg"
          required
        />
        <Button 
          type="submit"
          className="w-full quantum-glow bg-gradient-to-r from-pink-500 via-purple-500 to-teal-500"
          disabled={!birthDate}
        >
          Initialize Quantum Reading
        </Button>
      </form>
    </div>
  );
};

export default BirthDateInput;