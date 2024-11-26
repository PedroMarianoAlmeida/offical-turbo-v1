import React from 'react';

interface PipeProps {
  x: number;
  height: number;
  gap: number;
}

export const Pipe: React.FC<PipeProps> = ({ x, height, gap }) => {
  return (
    <>
      {/* Top pipe */}
      <div
        className="absolute w-10 bg-gradient-to-r from-green-600 to-green-500"
        style={{
          left: `${x}px`,
          height: `${height}px`,
          top: 0,
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-green-700" />
      </div>
      
      {/* Bottom pipe */}
      <div
        className="absolute w-10 bg-gradient-to-r from-green-600 to-green-500"
        style={{
          left: `${x}px`,
          top: `${height + gap}px`,
          bottom: 0,
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-4 bg-green-700" />
      </div>
    </>
  );
};