import React from 'react';

interface BirdProps {
  position: number;
}

export const Bird: React.FC<BirdProps> = ({ position }) => {
  return (
    <div
      className="absolute w-8 h-8 left-[100px] rounded-full bg-yellow-400 shadow-lg transition-transform"
      style={{
        top: `${position}px`,
        transform: `rotate(${Math.min(position * 0.5, 45)}deg)`,
      }}
    >
      <div className="absolute w-3 h-3 bg-white rounded-full top-1 left-1" />
      <div className="absolute w-2 h-2 bg-black rounded-full top-2 left-2" />
      <div className="absolute w-4 h-4 bg-yellow-500 rounded-full -right-1 top-2 transform rotate-45" />
    </div>
  );
};