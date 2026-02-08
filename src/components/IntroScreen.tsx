import { motion } from "framer-motion";

interface IntroScreenProps {
  onStart: () => void;
}

const IntroScreen = ({ onStart }: IntroScreenProps) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen relative z-10 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="text-7xl sm:text-8xl mb-6"
        animate={{ scale: [1, 1.15, 1, 1.1, 1] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      >
        💝
      </motion.div>

      <motion.h1
        className="font-romantic text-5xl sm:text-7xl text-glow text-primary-foreground mb-4 text-center"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Catch My Love
      </motion.h1>

      <motion.p
        className="text-blush text-lg sm:text-xl mb-10 text-center max-w-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        Catch the falling hearts to unlock a special Valentine's message 💌
      </motion.p>

      <motion.button
        onClick={onStart}
        className="relative px-8 sm:px-10 py-3 sm:py-4 rounded-full bg-primary text-primary-foreground font-semibold text-base sm:text-lg tracking-wide overflow-hidden"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        whileHover={{ scale: 1.05, boxShadow: "0 0 40px hsl(345 80% 55% / 0.6)" }}
        whileTap={{ scale: 0.95 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
      >
        <span className="relative z-10">Play Now</span>
      </motion.button>

      <motion.p
        className="text-muted-foreground text-sm mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        Tap or click the hearts before they disappear!
      </motion.p>
    </motion.div>
  );
};

export default IntroScreen;
