import { motion } from "framer-motion";

interface ValentineWeekProps {
  onSelectDay: (day: DayType) => void;
  onPlayGame: () => void;
}

export type DayType = "rose" | "propose" | "chocolate" | "teddy" | "promise" | "hug" | "kiss" | "valentine";

interface DayInfo {
  id: DayType;
  date: string;
  name: string;
  emoji: string;
  tagline: string;
  color: string;
}

const VALENTINE_DAYS: DayInfo[] = [
  { id: "rose", date: "Feb 7", name: "Rose", emoji: "🌹", tagline: "Express your love with roses", color: "from-rose-500 to-pink-400" },
  { id: "propose", date: "Feb 8", name: "Propose", emoji: "💍", tagline: "Pop the question", color: "from-purple-500 to-pink-500" },
  { id: "chocolate", date: "Feb 9", name: "Choco", emoji: "🍫", tagline: "Sweeten the moment", color: "from-amber-700 to-orange-500" },
  { id: "teddy", date: "Feb 10", name: "Teddy", emoji: "🧸", tagline: "Cuddles & comfort", color: "from-amber-400 to-yellow-300" },
  { id: "promise", date: "Feb 11", name: "Promise", emoji: "🤞", tagline: "Pledge your heart", color: "from-emerald-500 to-teal-400" },
  { id: "hug", date: "Feb 12", name: "Hug", emoji: "🤗", tagline: "Warm embraces", color: "from-orange-400 to-rose-400" },
  { id: "kiss", date: "Feb 13", name: "Kiss", emoji: "💋", tagline: "Sealed with a kiss", color: "from-red-500 to-pink-500" },
  { id: "valentine", date: "Feb 14", name: "Valentine", emoji: "💝", tagline: "Celebrate your love", color: "from-primary to-rose-400" },
];

const ValentineWeek = ({ onSelectDay, onPlayGame }: ValentineWeekProps) => {
  return (
    <motion.div
      // Changed to h-[100dvh] and justify-between for perfect mobile fit
      className="flex flex-col items-center h-[100dvh] relative z-10 px-4 py-6 overflow-hidden justify-between"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header Section */}
      <div className="flex flex-col items-center">
        <motion.div
          className="text-4xl mb-1"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          💕
        </motion.div>

        <motion.h1
          className="font-romantic text-3xl sm:text-6xl text-glow text-primary-foreground mb-1 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Valentine's Week
        </motion.h1>

        <motion.p
          className="text-blush text-xs sm:text-lg text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          7 days of love ✨
        </motion.p>
      </div>

      {/* Grid Section - Using flex-grow to take available space */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 w-full max-w-3xl my-4 flex-grow content-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {VALENTINE_DAYS.map((day, index) => (
          <motion.button
            key={day.id}
            onClick={() => onSelectDay(day.id)}
            className={`relative p-3 sm:p-5 rounded-xl bg-gradient-to-br ${day.color} overflow-hidden group flex flex-col items-center justify-center h-full min-h-[80px] sm:min-h-[120px]`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 * index + 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            <div className="relative z-10 flex flex-col items-center text-white">
              <span className="text-2xl sm:text-4xl">{day.emoji}</span>
              <span className="font-bold text-[10px] sm:text-sm opacity-90">{day.date}</span>
              <span className="font-romantic text-base sm:text-xl leading-none mt-1">{day.name}</span>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Bottom Button */}
      <motion.button
        onClick={onPlayGame}
        className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold text-base shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileTap={{ scale: 0.95 }}
        style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
      >
        <span className="flex items-center justify-center gap-2">
          Play Catch My Love 💝
        </span>
      </motion.button>
    </motion.div>
  );
};

export default ValentineWeek;