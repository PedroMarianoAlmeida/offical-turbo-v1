import React, { useEffect, useRef, useState } from "react";
import { Bird } from "./Bird";
import { Pipe } from "./Pipe";
import { SpeedControl } from "./SpeedControl";
import { useGameLoop } from "../hooks/useGameLoop";
import { Bird as BirdIcon } from "lucide-react";

const BASE_GRAVITY = 0.1;
const BASE_JUMP_FORCE = -2;
const BASE_PIPE_SPEED = 1.5;
const PIPE_SPAWN_INTERVAL = 3000;
const GAP_SIZE = 150;
const BIRD_SIZE = 32;
const PIPE_WIDTH = 40;
const BIRD_X = 100;

export const Game = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [birdPosition, setBirdPosition] = useState(250);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [pipes, setPipes] = useState<
    Array<{ x: number; height: number; passed: boolean }>
  >([]);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);

  const gameRef = useRef<HTMLDivElement>(null);

  const gravity = BASE_GRAVITY * speedMultiplier;
  const jumpForce = BASE_JUMP_FORCE * speedMultiplier;
  const pipeSpeed = BASE_PIPE_SPEED * speedMultiplier;

  const checkCollision = (
    birdY: number,
    pipe: { x: number; height: number }
  ) => {
    const birdRight = BIRD_X + BIRD_SIZE;
    const birdLeft = BIRD_X;
    const pipeLeft = pipe.x;
    const pipeRight = pipe.x + PIPE_WIDTH;

    if (birdRight > pipeLeft && birdLeft < pipeRight) {
      if (birdY < pipe.height || birdY + BIRD_SIZE > pipe.height + GAP_SIZE) {
        return true;
      }
    }
    return false;
  };

  const resetGame = () => {
    setBirdPosition(250);
    setBirdVelocity(0);
    setPipes([]);
    setScore(0);
    setGameOver(false);
    setGameStarted(false);
  };

  const startGame = () => {
    if (!gameOver) {
      setGameStarted(true);
      setBirdVelocity(jumpForce);
    }
  };

  const jump = () => {
    if (!gameOver && gameStarted) {
      setBirdVelocity(jumpForce);
    }
  };

  const handleSpeedChange = (newSpeed: number) => {
    if (!gameStarted) {
      setSpeedMultiplier(newSpeed);
    }
  };

  const spawnPipe = () => {
    if (!gameStarted || gameOver) return;

    const height = Math.random() * (300 - 100) + 100;
    setPipes((pipes) => [...pipes, { x: 400, height, passed: false }]);
  };

  useEffect(() => {
    const interval = setInterval(
      spawnPipe,
      PIPE_SPAWN_INTERVAL / speedMultiplier
    );
    return () => clearInterval(interval);
  }, [gameStarted, gameOver, speedMultiplier]);

  useGameLoop(() => {
    if (!gameStarted || gameOver) return;

    setBirdPosition((pos) => {
      const newPos = pos + birdVelocity;
      if (newPos < 0 || newPos > 500) {
        setGameOver(true);
        return pos;
      }
      return newPos;
    });
    setBirdVelocity((v) => v + gravity);

    setPipes((pipes) => {
      return pipes
        .map((pipe) => {
          if (!pipe.passed && checkCollision(birdPosition, pipe)) {
            setGameOver(true);
          }

          if (!pipe.passed && pipe.x < BIRD_X - PIPE_WIDTH) {
            setScore((s) => {
              const newScore = s + 1;
              setHighScore((h) => Math.max(h, newScore));
              return newScore;
            });
            return { ...pipe, passed: true };
          }

          return { ...pipe, x: pipe.x - pipeSpeed };
        })
        .filter((pipe) => pipe.x > -PIPE_WIDTH);
    });
  });

  return (
    <div className="relative flex flex-col items-center">
      <div className="mb-4 flex items-center gap-4">
        {!gameStarted && (
          <SpeedControl
            speed={speedMultiplier}
            onSpeedChange={handleSpeedChange}
          />
        )}
        <div className="bg-black/30 rounded-lg px-4 py-2">
          <span className="text-white font-bold">High Score: {highScore}</span>
        </div>
      </div>

      <div
        ref={gameRef}
        className="relative w-[400px] h-[500px] bg-gradient-to-b from-blue-400 to-blue-600 overflow-hidden cursor-pointer"
        onClick={gameStarted ? jump : startGame}
      >
        <Bird position={birdPosition} />

        {pipes.map((pipe, i) => (
          <Pipe key={i} x={pipe.x} height={pipe.height} gap={GAP_SIZE} />
        ))}

        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white">
            <BirdIcon className="w-16 h-16 mb-4 animate-bounce" />
            <p className="text-2xl font-bold">Click to Start</p>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white">
            <p className="text-3xl font-bold mb-4">Game Over!</p>
            <p className="text-xl mb-2">Score: {score}</p>
            <p className="text-xl mb-4">High Score: {highScore}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                resetGame();
              }}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-full font-bold transition-colors"
            >
              Play Again
            </button>
          </div>
        )}

        <div className="absolute top-4 left-4 text-white text-2xl font-bold">
          {score}
        </div>
      </div>
    </div>
  );
};
