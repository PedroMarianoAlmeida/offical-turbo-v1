import { useEffect, useRef } from 'react';

export const useGameLoop = (callback: () => void) => {
  const frameRef = useRef<number>();

  useEffect(() => {
    const tick = () => {
      callback();
      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [callback]);
};