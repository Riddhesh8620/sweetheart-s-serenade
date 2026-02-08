import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
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

const decodeName = (encoded?: string) => {
  try {
    if (!encoded) return "My Love";
    const decoded = decodeURIComponent(escape(atob(encoded)));
    return decoded.replace(/[^a-zA-Z ]/g, "").slice(0, 20) || "My Love";
  } catch {
    return "My Love";
  }
};

const DAY_CONTENT: Record<DayType, DayContent> = {
  rose: {
    title: "Rose Day",
    emoji: "🌹",
    background: "from-rose-900/50 to-pink-900/50",
    messages: [
      "A single rose can be my garden... a single friend, my world {{name}} 🌹",
      "Like a rose, love is beautiful but comes with thorns worth enduring {{name}} 💕",
      "{{name}}, you're the most beautiful bloom in my garden of life ✨",
      "Every petal whispers how much I love you {{name}} 🌸",
    ],
    activities: ["Gift a red rose 🌹", "Write a love poem 📝", "Create a rose bouquet 💐", "Take romantic photos 📸"],
    quote: "Where flowers bloom, so does hope.",
  },
  propose: {
    title: "Propose Day",
    emoji: "💍",
    background: "from-purple-900/50 to-pink-900/50",
    messages: [
      "{{name}}, will you be my forever? 💍",
      "Every love story is beautiful, but ours is my favorite, {{name}} 💜",
      "I want to grow old with you {{name}}, will you let me? ✨",
      "My heart has been searching, and it found you {{name}} 💕",
    ],
    activities: ["Express your feelings 💌", "Plan a surprise proposal 🎁", "Write a heartfelt letter 📝", "Create a romantic moment 🌙"],
    quote: "The best thing to hold onto in life is each other.",
  },
  chocolate: {
    title: "Chocolate Day",
    emoji: "🍫",
    background: "from-amber-900/50 to-orange-900/50",
    messages: [
      "{{name}}, you're sweeter than the finest chocolate 🍫",
      "Life is like a box of chocolates, but you're my favorite flavor, {{name}} 💝",
      "You melt my heart like chocolate melts on my tongue {{name}} ✨",
      "Sweet moments with you, {{name}}, are my favorite treats 🍬",
    ],
    activities: ["Gift chocolates 🍫", "Bake chocolate treats together 🧁", "Have a chocolate fondue date 🫕", "Create a sweet care package 🎁"],
    quote: "All you need is love and a little chocolate.",
  },
  teddy: {
    title: "Teddy Day",
    emoji: "🧸",
    background: "from-amber-800/50 to-yellow-900/50",
    messages: [
      "{{name}}, you're as huggable as the cutest teddy bear 🧸",
      "Hold this teddy {{name}} when I'm not there, it carries my love 💕",
      "Soft, warm, and comforting {{name}} - just like you ✨",
      "My teddy for my teddy bear {{name}} 🤗",
    ],
    activities: ["Gift a teddy bear 🧸", "Plan a cozy movie night 🎬", "Make a DIY plushie 🪡", "Share childhood memories 📖"],
    quote: "Some things don't need to be perfect; they just need to be cuddly.",
  },
  promise: {
    title: "Promise Day",
    emoji: "🤞",
    background: "from-emerald-900/50 to-teal-900/50",
    messages: [
      "I promise to love you in every version of yourself {{name}} 💚",
      "My promise {{name}}: to stand by you through every storm 🌟",
      "I'll love you not just today, but for all our tomorrows {{name}} ✨",
      "Pinky promise to be your forever partner {{name}} 🤞",
    ],
    activities: ["Make meaningful promises 💍", "Write a promise letter 📝", "Create a future bucket list 📋", "Exchange promise rings 💫"],
    quote: "A promise made is a debt unpaid.",
  },
  hug: {
    title: "Hug Day",
    emoji: "🤗",
    background: "from-orange-900/50 to-rose-900/50",
    messages: [
      "A hug from you, {{name}}, makes everything better 🤗",
      "In your embrace, {{name}}, I find my happy place 💕",
      "Wrapped in your arms is my favorite place to be {{name}} ✨",
      "Every hug from you {{name}} heals my soul 💖",
    ],
    activities: ["Give a long warm hug 🤗", "Cuddle while watching movies 📺", "Surprise with a back hug 💕", "Create a hug coupon book 🎟️"],
    quote: "A hug is a handshake from the heart.",
  },
  kiss: {
    title: "Kiss Day",
    emoji: "💋",
    background: "from-red-900/50 to-pink-900/50",
    messages: [
      "{{name}}, your kisses are my favorite addiction 💋",
      "Every kiss tells a story of how much I love you {{name}} 💕",
      "Sealed with a kiss, forever in my heart {{name}} ✨",
      "Your lips have magic that my heart can't resist {{name}} 💘",
    ],
    activities: ["Steal a sweet kiss 💋", "Try different kiss types 😘", "Watch a romantic movie 🎬", "Create a kissing booth 💕"],
    quote: "A kiss is a lovely trick designed by nature.",
  },
  valentine: {
    title: "Valentine's Day",
    emoji: "💝",
    background: "from-primary/50 to-rose-900/50",
    messages: [
      "You're my today, tomorrow, and forever {{name}} 💝",
      "Happy Valentine's Day to my whole world, {{name}} 🌍",
      "Every day is Valentine's Day when I'm with you {{name}} ✨",
      "{{name}}, you're the love story I always wanted to live 💕",
    ],
    activities: ["Exchange heartfelt gifts 🎁", "Go on a romantic date 🍽️", "Renew your vows of love 💍", "Create lasting memories 📸"],
    quote: "You are my Valentine every day of the year.",
  },
};

const DayScreen = ({ day, onBack }: DayScreenProps) => {
  const content: DayContent = DAY_CONTENT[day];
  const [messageIndex, setMessageIndex] = useState(0);
  const [showActivities, setShowActivities] = useState(false);
  const [name, setName] = useState("My Love");

  useEffect(() => {
    const pathParts = window.location.pathname.split("/");
    const possibleCode = pathParts[pathParts.length - 1];
    const queryCode = new URLSearchParams(window.location.search).get("code");
    const encoded = queryCode || possibleCode;

    if (encoded && encoded !== "") {
      setName(decodeName(encoded));
    }
  }, []);

  const nextMessage = () => {
    setMessageIndex((i) => (i + 1) % content.messages.length);
  };

  // Helper function to replace the token with the actual name
  const formatMessage = (msg: string) => {
    return msg.replace(/{{name}}/g, name);
  };

  return (
    <motion.div
      className={`flex flex-col items-center h-screen w-full relative z-10 px-6 py-4 overflow-hidden bg-gradient-to-b ${content.background} justify-between`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.button
        onClick={onBack}
        className="self-start px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-primary/20 text-primary-foreground text-xs font-medium"
        whileTap={{ scale: 0.95 }}
      >
        ← Back
      </motion.button>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm">
        <motion.div
          className="text-7xl mb-2"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          {content.emoji}
        </motion.div>

        <motion.h1
          className="font-romantic text-4xl text-glow text-primary-foreground mb-1 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {content.title}
        </motion.h1>

        <motion.p
          className="text-blush/80 text-xs italic mb-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          "{content.quote}"
        </motion.p>

        <motion.div
          className="w-full bg-card/80 backdrop-blur-md border border-primary/20 rounded-2xl p-6 text-center mb-6 min-h-[140px] flex items-center justify-center"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{ animation: "pulse-glow 3s ease-in-out infinite" }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={messageIndex}
              className="font-romantic text-xl text-blush leading-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Applying the name replacement here */}
              {formatMessage(content.messages[messageIndex])}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        <div className="relative w-full">
          <AnimatePresence>
            {showActivities && (
              <motion.div
                className="absolute bottom-full left-0 right-0 z-20 bg-card/95 backdrop-blur-xl border border-primary/30 rounded-2xl p-4 mb-4 shadow-2xl"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
              >
                <h3 className="font-romantic text-lg text-primary-foreground mb-3 text-center">
                  Things to Do
                </h3>
                <ul className="space-y-2">
                  {content.activities.map((activity, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center gap-2 text-xs text-blush/90"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {activity}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col gap-2 w-full pb-4">
            <motion.button
              onClick={nextMessage}
              className="w-full py-3 rounded-xl bg-primary/20 border border-primary/40 text-primary-foreground text-sm font-medium"
              whileTap={{ scale: 0.98 }}
            >
              Another message 💌
            </motion.button>
            <motion.button
              onClick={() => setShowActivities(!showActivities)}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium shadow-lg shadow-primary/20"
              whileTap={{ scale: 0.98 }}
            >
              {showActivities ? "Close Ideas" : "Activity Ideas"} ✨
            </motion.button>
          </div>
        </div>
      </div>

      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {[...Array(4)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-3xl opacity-10"
            style={{
              left: `${15 + i * 25}%`,
              top: `${20 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 5 + i,
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