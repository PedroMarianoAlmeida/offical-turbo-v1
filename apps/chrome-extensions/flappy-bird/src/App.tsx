import React from 'react';
import { Game } from './components/Game';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-white mb-8">Flappy Bird</h1>
      <Game />
      <p className="mt-4 text-gray-400 text-sm">Click or tap to jump</p>
    </div>
  );
}

export default App;