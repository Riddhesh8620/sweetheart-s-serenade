import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { DayType } from "./ValentineWeek";

interface DayScreenProps {
  day: DayType;
  onBack: () => void;
}

interface DayContent {
  title: string;
  emoji: string;
  background: string;
  messages: string[];
  activities: string[];
  quote: string;
}

const DAY_CONTENT: Record<DayType, DayContent> = {
  rose: {
    title: "Rose Day",
    emoji: "🌹",
    background: "from-rose-900/50 to-pink-900/50",
    messages: [
      "A single rose can be my garden... a single friend, my world 🌹",
      "Like a rose, love is beautiful but comes with thorns worth enduring 💕",
      "You're the most beautiful bloom in my garden of life ✨",
      "Every petal whispers how much I love you 🌸",
    ],
    activities: ["Gift a red rose 🌹", "Write a love poem 📝", "Create a rose bouquet 💐", "Take romantic photos 📸"],
    quote: "Where flowers bloom, so does hope.",
  },
  propose: {
    title: "Propose Day",
    emoji: "💍",
    background: "from-purple-900/50 to-pink-900/50",
    messages: [
      "Will you be my forever? 💍",
      "Every love story is beautiful, but ours is my favorite 💜",
      "I want to grow old with you, will you let me? ✨",
      "My heart has been searching, and it found you 💕",
    ],
    activities: ["Express your feelings 💌", "Plan a surprise proposal 🎁", "Write a heartfelt letter 📝", "Create a romantic moment 🌙"],
    quote: "The best thing to hold onto in life is each other.",
  },
  chocolate: {
    title: "Chocolate Day",
    emoji: "🍫",
    background: "from-amber-900/50 to-orange-900/50",
    messages: [
      "You're sweeter than the finest chocolate 🍫",
      "Life is like a box of chocolates, but you're my favorite flavor 💝",
      "You melt my heart like chocolate melts on my tongue ✨",
      "Sweet moments with you are my favorite treats 🍬",
    ],
    activities: ["Gift chocolates 🍫", "Bake chocolate treats together 🧁", "Have a chocolate fondue date 🫕", "Create a sweet care package 🎁"],
    quote: "All you need is love and a little chocolate.",
  },
  teddy: {
    title: "Teddy Day",
    emoji: "🧸",
    background: "from-amber-800/50 to-yellow-900/50",
    messages: [
      "You're as huggable as the cutest teddy bear 🧸",
      "Hold this teddy when I'm not there, it carries my love 💕",
      "Soft, warm, and comforting - just like you ✨",
      "My teddy for my teddy bear 🤗",
    ],
    activities: ["Gift a teddy bear 🧸", "Plan a cozy movie night 🎬", "Make a DIY plushie 🪡", "Share childhood memories 📖"],
    quote: "Some things don't need to be perfect; they just need to be cuddly.",
  },
  promise: {
    title: "Promise Day",
    emoji: "🤞",
    background: "from-emerald-900/50 to-teal-900/50",
    messages: [
      "I promise to love you in every version of yourself 💚",
      "My promise: to stand by you through every storm 🌟",
      "I'll love you not just today, but for all our tomorrows ✨",
      "Pinky promise to be your forever partner 🤞",
    ],
    activities: ["Make meaningful promises 💍", "Write a promise letter 📝", "Create a future bucket list 📋", "Exchange promise rings 💫"],
    quote: "A promise made is a debt unpaid.",
  },
  hug: {
    title: "Hug Day",
    emoji: "🤗",
    background: "from-orange-900/50 to-rose-900/50",
    messages: [
      "A hug from you makes everything better 🤗",
      "In your embrace, I find my happy place 💕",
      "Wrapped in your arms is my favorite place to be ✨",
      "Every hug from you heals my soul 💖",
    ],
    activities: ["Give a long warm hug 🤗", "Cuddle while watching movies 📺", "Surprise with a back hug 💕", "Create a hug coupon book 🎟️"],
    quote: "A hug is a handshake from the heart.",
  },
  kiss: {
    title: "Kiss Day",
    emoji: "💋",
    background: "from-red-900/50 to-pink-900/50",
    messages: [
      "Your kisses are my favorite addiction 💋",
      "Every kiss tells a story of how much I love you 💕",
      "Sealed with a kiss, forever in my heart ✨",
      "Your lips have magic that my heart can't resist 💘",
    ],
    activities: ["Steal a sweet kiss 💋", "Try different kiss types 😘", "Watch a romantic movie 🎬", "Create a kissing booth 💕"],
    quote: "A kiss is a lovely trick designed by nature.",
  },
  valentine: {
    title: "Valentine's Day",
    emoji: "💝",
    background: "from-primary/50 to-rose-900/50",
    messages: [
      "You're my today, tomorrow, and forever 💝",
      "Happy Valentine's Day to my whole world 🌍",
      "Every day is Valentine's Day when I'm with you ✨",
      "You're the love story I always wanted to live 💕",
    ],
    activities: ["Exchange heartfelt gifts 🎁", "Go on a romantic date 🍽️", "Renew your vows of love 💍", "Create lasting memories 📸"],
    quote: "You are my Valentine every day of the year.",
  },
};

const DayScreen = ({ day, onBack }: DayScreenProps) => {
  const content = DAY_CONTENT[day];
  const [messageIndex, setMessageIndex] = useState(0);
  const [showActivities, setShowActivities] = useState(false);

  const nextMessage = () => {
    setMessageIndex((i) => (i + 1) % content.messages.length);
  };

  return (
    <motion.div
      className={`flex flex-col items-center min-h-screen relative z-10 px-4 py-8 overflow-y-auto bg-gradient-to-b ${content.background}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Back Button */}
      <motion.button
        onClick={onBack}
        className="absolute top-4 left-4 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-primary/20 text-primary-foreground text-sm font-medium"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ← Back
      </motion.button>

      {/* Emoji */}
      <motion.div
        className="text-6xl sm:text-8xl mt-12 mb-6"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        {content.emoji}
      </motion.div>

      {/* Title */}
      <motion.h1
        className="font-romantic text-4xl sm:text-6xl text-glow text-primary-foreground mb-4 text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {content.title}
      </motion.h1>

      {/* Quote */}
      <motion.p
        className="text-blush/80 text-sm sm:text-base italic mb-8 text-center max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        "{content.quote}"
      </motion.p>

      {/* Message Card */}
      <motion.div
        className="max-w-md w-full bg-card/80 backdrop-blur-md border border-primary/20 rounded-2xl p-6 sm:p-8 text-center mb-6"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        style={{ animation: "pulse-glow 3s ease-in-out infinite" }}
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={messageIndex}
            className="font-romantic text-xl sm:text-2xl text-blush leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {content.messages[messageIndex]}
          </motion.p>
        </AnimatePresence>
      </motion.div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <motion.button
          onClick={nextMessage}
          className="px-6 py-3 rounded-full bg-primary/20 border border-primary/40 text-primary-foreground font-medium hover:bg-primary/30 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Another message 💌
        </motion.button>
        <motion.button
          onClick={() => setShowActivities(!showActivities)}
          className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {showActivities ? "Hide Ideas" : "Activity Ideas"} ✨
        </motion.button>
      </div>

      {/* Activities */}
      <AnimatePresence>
        {showActivities && (
          <motion.div
            className="max-w-md w-full bg-card/60 backdrop-blur-md border border-primary/20 rounded-2xl p-5 sm:p-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-romantic text-2xl text-primary-foreground mb-4 text-center">
              Things to Do Today
            </h3>
            <ul className="space-y-3">
              {content.activities.map((activity, index) => (
                <motion.li
                  key={index}
                  className="flex items-center gap-3 text-blush/90"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {activity}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {[...Array(6)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-4xl opacity-20"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {content.emoji}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default DayScreen;
