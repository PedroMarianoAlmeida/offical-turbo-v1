import React from 'react';
import { Gauge } from 'lucide-react';

interface SpeedControlProps {
  speed: number;
  onSpeedChange: (speed: number) => void;
}

export const SpeedControl: React.FC<SpeedControlProps> = ({ speed, onSpeedChange }) => {
  return (
    <div className="flex items-center bg-black/30 rounded-lg px-4 py-2">
      <Gauge className="w-5 h-5 text-white mr-2" />
      <input
        type="range"
        min="0.5"
        max="2"
        step="0.1"
        value={speed}
        onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
        className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <span className="text-white font-bold ml-2">{speed.toFixed(1)}x</span>
    </div>
  );
};