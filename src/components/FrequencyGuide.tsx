import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const FrequencyGuide = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto mb-8"
    >
      <Card className="bg-gray-900/50 backdrop-blur-sm border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-center text-xl text-purple-300">
            🧘‍♀️ Thought Frequency Guide
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-gray-300">
          <div className="space-y-2">
            <h3 className="font-semibold text-pink-400">Past Frequency (1/φ Hz)</h3>
            <p>Close your eyes and breathe slowly. Visualize a moment from your past, letting the memory become clear and vivid. Your thought frequency naturally slows to match past resonances.</p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-purple-400">Present Frequency (1 Hz)</h3>
            <p>Focus on your breath and current sensations. Feel the weight of your body and the air around you. This grounds you in the present moment's base frequency.</p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-teal-400">Future Frequency (φ Hz)</h3>
            <p>Imagine possibilities flowing forward. Let your thoughts accelerate naturally as you consider potential futures. Your frequency will increase to match future timelines.</p>
          </div>

          <div className="mt-4 p-3 bg-purple-900/20 rounded-lg">
            <p className="text-purple-200">💫 Tip: Watch the resonance rings around each card. When they pulse in harmony with your thoughts, you've matched the correct frequency.</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FrequencyGuide;