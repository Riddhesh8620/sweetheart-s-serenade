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
const COMBO_TIMEOUT = 1200; // ms to maintain combo

const HeartGame = ({ onComplete }: HeartGameProps) => {
  const [hearts, setHearts] = useState<FallingHeart[]>([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [pops, setPops] = useState<{ id: number; x: number; y: number; points: number }[]>([]);
  const [showCombo, setShowCombo] = useState(false);
  const nextId = useRef(0);
  const gameRef = useRef<HTMLDivElement>(null);
  const comboTimer = useRef<NodeJS.Timeout | null>(null);
  const lastCatchTime = useRef<number>(0);

  const spawnHeart = useCallback(() => {
    const heart: FallingHeart = {
      id: nextId.current++,
      x: 5 + Math.random() * 85,
      emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
      speed: 3 + Math.random() * 4,
      size: 28 + Math.random() * 20,
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
            // Reset combo on miss
            setCombo(0);
            setMultiplier(1);
            setShowCombo(false);
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
    e.preventDefault();
    const now = Date.now();
    const timeSinceLastCatch = now - lastCatchTime.current;
    lastCatchTime.current = now;

    // Clear existing combo timer
    if (comboTimer.current) {
      clearTimeout(comboTimer.current);
    }

    // Calculate combo
    let newCombo = combo;
    let newMultiplier = multiplier;

    if (timeSinceLastCatch < COMBO_TIMEOUT) {
      newCombo = combo + 1;
      newMultiplier = Math.min(1 + Math.floor(newCombo / 2) * 0.5, 3); // Max 3x multiplier
      setShowCombo(true);
    } else {
      newCombo = 1;
      newMultiplier = 1;
    }

    setCombo(newCombo);
    setMultiplier(newMultiplier);

    // Start combo decay timer
    comboTimer.current = setTimeout(() => {
      setCombo(0);
      setMultiplier(1);
      setShowCombo(false);
    }, COMBO_TIMEOUT);

    const points = Math.round(1 * newMultiplier);
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setPops((prev) => [...prev, { id: heart.id, x: rect.left + rect.width / 2, y: rect.top, points }]);
    setTimeout(() => setPops((prev) => prev.filter((p) => p.id !== heart.id)), 600);
    setHearts((prev) => prev.filter((h) => h.id !== heart.id));
    setScore((s) => s + points);
  };

  const progress = Math.min((score / GOAL) * 100, 100);

  return (
    <div ref={gameRef} className="fixed inset-0 z-10 overflow-hidden select-none" style={{ touchAction: "none" }}>
      {/* HUD */}
      <div className="absolute top-0 left-0 right-0 z-20 p-3 sm:p-4 flex items-center gap-2 sm:gap-4">
        <div className="flex-1">
          <div className="h-2 sm:h-3 rounded-full bg-secondary overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-primary"
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 100 }}
            />
          </div>
        </div>
        <span className="font-romantic text-xl sm:text-2xl text-gold gold-glow min-w-[50px] sm:min-w-[60px] text-right">
          {score}/{GOAL}
        </span>
      </div>

      {/* Combo indicator */}
      <AnimatePresence>
        {showCombo && combo > 1 && (
          <motion.div
            className="absolute top-12 sm:top-16 left-1/2 -translate-x-1/2 z-30"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <div className="bg-gradient-to-r from-primary/90 to-accent/90 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-sm">
              <span className="font-romantic text-lg sm:text-2xl text-white drop-shadow-lg">
                🔥 {combo}x Combo! ({multiplier}x)
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Falling Hearts */}
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.button
            id={`heart-${heart.id}`}
            key={heart.id}
            className="absolute cursor-pointer heart-shadow z-10 touch-none"
            style={{ left: `${heart.x}%`, fontSize: heart.size, top: -60 }}
            animate={{ y: window.innerHeight + 100 }}
            transition={{ duration: heart.speed, ease: "linear" }}
            onClick={(e) => catchHeart(heart, e)}
            onTouchStart={(e) => catchHeart(heart, e)}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.8 }}
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
            className="fixed pointer-events-none z-30 font-romantic text-gold text-xl sm:text-2xl"
            style={{ left: pop.x, top: pop.y }}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 2, y: -60 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            +{pop.points} 💫
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Hint */}
      <motion.p
        className="absolute bottom-6 sm:bottom-8 left-0 right-0 text-center text-muted-foreground text-xs sm:text-sm px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        Tap hearts quickly for combo bonus! 💕
      </motion.p>
    </div>
  );
};

export default HeartGame;
