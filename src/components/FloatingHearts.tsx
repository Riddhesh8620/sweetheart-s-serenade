import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Heart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
}

const EMOJIS = ["❤️", "💕", "💗", "💖", "💝", "✨", "🌹", "💘"];

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const generated: Heart[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 16 + Math.random() * 28,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 8,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    }));
    setHearts(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute"
            style={{
              left: `${heart.x}%`,
              fontSize: heart.size,
              bottom: -50,
            }}
            animate={{
              y: [0, -(window.innerHeight + 100)],
              x: [0, Math.sin(heart.id) * 60],
              rotate: [0, 360],
              opacity: [0, 0.7, 0.7, 0],
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {heart.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FloatingHearts;
