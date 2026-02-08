import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import FloatingHearts from "@/components/FloatingHearts";
import IntroScreen from "@/components/IntroScreen";
import HeartGame from "@/components/HeartGame";
import CompletionScreen from "@/components/CompletionScreen";
import ValentineWeek, { type DayType } from "@/components/ValentineWeek";
import DayScreen from "@/components/DayScreen";

type GameState = "intro" | "week" | "day" | "playing" | "complete";

const Index = () => {
  const [gameState, setGameState] = useState<GameState>("intro");
  const [selectedDay, setSelectedDay] = useState<DayType | null>(null);

  const handleSelectDay = (day: DayType) => {
    setSelectedDay(day);
    setGameState("day");
  };

  const handleBackToWeek = () => {
    setSelectedDay(null);
    setGameState("week");
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingHearts />

      <AnimatePresence mode="wait">
        {gameState === "intro" && (
          <IntroScreen key="intro" onStart={() => setGameState("week")} />
        )}
        {gameState === "week" && (
          <ValentineWeek 
            key="week" 
            onSelectDay={handleSelectDay}
            onPlayGame={() => setGameState("playing")}
          />
        )}
        {gameState === "day" && selectedDay && (
          <DayScreen 
            key="day" 
            day={selectedDay} 
            onBack={handleBackToWeek}
          />
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
