import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FallingHeart {
  id: number;
  x: number;
  emoji: string;
  speed: number;
  size: number;
}

interface HeartGameProps {
  onComplete: () => void;
}

const HEART_EMOJIS = ["❤️", "💖", "💗", "💕", "💘", "🌹", "💝"];
const GOAL = 15;

const HeartGame = ({ onComplete }: HeartGameProps) => {
  const [hearts, setHearts] = useState<FallingHeart[]>([]);
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [pops, setPops] = useState<{ id: number; x: number; y: number }[]>([]);
  const nextId = useRef(0);
  const gameRef = useRef<HTMLDivElement>(null);

  const spawnHeart = useCallback(() => {
    const heart: FallingHeart = {
      id: nextId.current++,
      x: 5 + Math.random() * 85,
      emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
      speed: 3 + Math.random() * 4,
      size: 32 + Math.random() * 24,
    };
    setHearts((prev) => [...prev, heart]);
  }, []);

  useEffect(() => {
    if (score >= GOAL) {
      setTimeout(onComplete, 600);
      return;
    }
    const interval = setInterval(spawnHeart, 800 - Math.min(score * 20, 400));
    return () => clearInterval(interval);
  }, [spawnHeart, score, onComplete]);

  // Remove hearts that fall off screen
  useEffect(() => {
    const cleanup = setInterval(() => {
      setHearts((prev) => {
        const now = prev.filter((h) => {
          const el = document.getElementById(`heart-${h.id}`);
          if (!el) return true;
          const rect = el.getBoundingClientRect();
          if (rect.top > window.innerHeight + 20) {
            setMisses((m) => m + 1);
            return false;
          }
          return true;
        });
        return now;
      });
    }, 500);
    return () => clearInterval(cleanup);
  }, []);

  const catchHeart = (heart: FallingHeart, e: React.MouseEvent | React.TouchEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setPops((prev) => [...prev, { id: heart.id, x: rect.left + rect.width / 2, y: rect.top }]);
    setTimeout(() => setPops((prev) => prev.filter((p) => p.id !== heart.id)), 600);
    setHearts((prev) => prev.filter((h) => h.id !== heart.id));
    setScore((s) => s + 1);
  };

  const progress = Math.min((score / GOAL) * 100, 100);

  return (
    <div ref={gameRef} className="fixed inset-0 z-10 overflow-hidden select-none" style={{ touchAction: "none" }}>
      {/* HUD */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 flex items-center gap-4">
        <div className="flex-1">
          <div className="h-3 rounded-full bg-secondary overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-primary"
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 100 }}
            />
          </div>
        </div>
        <span className="font-romantic text-2xl text-gold gold-glow min-w-[60px] text-right">
          {score}/{GOAL}
        </span>
      </div>

      {/* Falling Hearts */}
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.button
            id={`heart-${heart.id}`}
            key={heart.id}
            className="absolute cursor-pointer heart-shadow z-10"
            style={{ left: `${heart.x}%`, fontSize: heart.size, top: -60 }}
            animate={{ y: window.innerHeight + 100 }}
            transition={{ duration: heart.speed, ease: "linear" }}
            onClick={(e) => catchHeart(heart, e)}
            onTouchStart={(e) => catchHeart(heart, e)}
            whileHover={{ scale: 1.3 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            {heart.emoji}
          </motion.button>
        ))}
      </AnimatePresence>

      {/* Pop effects */}
      <AnimatePresence>
        {pops.map((pop) => (
          <motion.div
            key={`pop-${pop.id}`}
            className="fixed pointer-events-none z-30 font-romantic text-gold text-2xl"
            style={{ left: pop.x, top: pop.y }}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 2, y: -60 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            +1 💫
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Hint */}
      <motion.p
        className="absolute bottom-8 left-0 right-0 text-center text-muted-foreground text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        Tap the hearts! 💕
      </motion.p>
    </div>
  );
};

export default HeartGame;
