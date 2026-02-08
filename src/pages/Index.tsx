import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import FloatingHearts from "@/components/FloatingHearts";
import IntroScreen from "@/components/IntroScreen";
import HeartGame from "@/components/HeartGame";
import CompletionScreen from "@/components/CompletionScreen";

type GameState = "intro" | "playing" | "complete";

const Index = () => {
  const [gameState, setGameState] = useState<GameState>("intro");

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingHearts />

      <AnimatePresence mode="wait">
        {gameState === "intro" && (
          <IntroScreen key="intro" onStart={() => setGameState("playing")} />
        )}
        {gameState === "playing" && (
          <HeartGame key="game" onComplete={() => setGameState("complete")} />
        )}
        {gameState === "complete" && (
          <CompletionScreen key="complete" />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
