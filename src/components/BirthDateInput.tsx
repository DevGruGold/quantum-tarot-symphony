import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import FrequencyGuide from './FrequencyGuide';
import { toast } from '@/components/ui/use-toast';

interface BirthDateInputProps {
  onStart: (dates: { date1?: string; date2?: string }) => void;
}

const BirthDateInput = ({ onStart }: BirthDateInputProps) => {
  const [birthDate1, setBirthDate1] = React.useState('');
  const [birthDate2, setBirthDate2] = React.useState('');
  const [isCouple, setIsCouple] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthDate1 && !birthDate2) {
      toast({
        title: "No Birth Dates Entered",
        description: "Enter at least one birth date to begin your quantum journey",
        variant: "destructive"
      });
      return;
    }
    onStart({
      date1: birthDate1 || undefined,
      date2: birthDate2 || undefined
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-8">
      <div className="quantum-float">
        <div className="text-4xl font-bold text-center mb-2">🌟 Quantum Tarot</div>
        <div className="text-xl text-center text-muted-foreground">
          Enter birth dates to enhance your quantum journey
        </div>
      </div>
      
      <FrequencyGuide />
      
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">First Person's Birth Date (Optional)</label>
            <Input
              type="date"
              value={birthDate1}
              onChange={(e) => setBirthDate1(e.target.value)}
              className="w-full text-center text-lg"
            />
          </div>

          <div className="flex items-center justify-center">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsCouple(!isCouple)}
              className="text-sm"
            >
              {isCouple ? "- Remove Second Person" : "+ Add Second Person"}
            </Button>
          </div>

          {isCouple && (
            <div>
              <label className="block text-sm font-medium mb-2">Second Person's Birth Date (Optional)</label>
              <Input
                type="date"
                value={birthDate2}
                onChange={(e) => setBirthDate2(e.target.value)}
                className="w-full text-center text-lg"
              />
            </div>
          )}
        </div>

        <Button 
          type="submit"
          className="w-full quantum-glow bg-gradient-to-r from-pink-500 via-purple-500 to-teal-500"
        >
          Initialize Quantum Reading
        </Button>
      </form>
    </div>
  );
};

export default BirthDateInput;