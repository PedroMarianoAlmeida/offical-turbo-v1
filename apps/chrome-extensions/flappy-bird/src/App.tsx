import React from "react";
import { Game } from "./components/Game";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center ">
      <h1 className="text-4xl font-bold text-white mb-8">Flappy Bird</h1>
      <Game />
      <p className="mt-4 text-gray-400 text-sm">Click or tap to jump</p>
      <p className="text-gray-400 text-sm">
        Developed by{" "}
        <a
          href="https://www.linkedin.com/in/pedroprogrammer/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold"
        >
          Pedro Almeida
        </a>{" "}
        +{" "}
        <a
          href="https://bolt.new/~/sb1-fjt6dm"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold"
        >
          Bolt AI
        </a>
      </p>
    </div>
  );
}

export default App;
