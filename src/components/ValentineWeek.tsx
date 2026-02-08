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
  { id: "rose", date: "Feb 7", name: "Rose Day", emoji: "🌹", tagline: "Express your love with roses", color: "from-rose-500 to-pink-400" },
  { id: "propose", date: "Feb 8", name: "Propose Day", emoji: "💍", tagline: "Pop the question", color: "from-purple-500 to-pink-500" },
  { id: "chocolate", date: "Feb 9", name: "Chocolate Day", emoji: "🍫", tagline: "Sweeten the moment", color: "from-amber-700 to-orange-500" },
  { id: "teddy", date: "Feb 10", name: "Teddy Day", emoji: "🧸", tagline: "Cuddles & comfort", color: "from-amber-400 to-yellow-300" },
  { id: "promise", date: "Feb 11", name: "Promise Day", emoji: "🤞", tagline: "Pledge your heart", color: "from-emerald-500 to-teal-400" },
  { id: "hug", date: "Feb 12", name: "Hug Day", emoji: "🤗", tagline: "Warm embraces", color: "from-orange-400 to-rose-400" },
  { id: "kiss", date: "Feb 13", name: "Kiss Day", emoji: "💋", tagline: "Sealed with a kiss", color: "from-red-500 to-pink-500" },
  { id: "valentine", date: "Feb 14", name: "Valentine's Day", emoji: "💝", tagline: "Celebrate your love", color: "from-primary to-rose-400" },
];

const ValentineWeek = ({ onSelectDay, onPlayGame }: ValentineWeekProps) => {
  return (
    <motion.div
      className="flex flex-col items-center min-h-screen relative z-10 px-4 py-8 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="text-5xl sm:text-6xl mb-4"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        💕
      </motion.div>

      <motion.h1
        className="font-romantic text-4xl sm:text-6xl text-glow text-primary-foreground mb-2 text-center"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Valentine's Week
      </motion.h1>

      <motion.p
        className="text-blush text-base sm:text-lg mb-8 text-center max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        7 days of love leading to the most romantic day ✨
      </motion.p>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-3xl mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {VALENTINE_DAYS.map((day, index) => (
          <motion.button
            key={day.id}
            onClick={() => onSelectDay(day.id)}
            className={`relative p-4 sm:p-5 rounded-2xl bg-gradient-to-br ${day.color} overflow-hidden group`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index + 0.5 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            <div className="relative z-10 flex flex-col items-center text-white">
              <span className="text-3xl sm:text-4xl mb-2">{day.emoji}</span>
              <span className="font-semibold text-xs sm:text-sm">{day.date}</span>
              <span className="font-romantic text-lg sm:text-xl mt-1">{day.name}</span>
            </div>
          </motion.button>
        ))}
      </motion.div>

      <motion.button
        onClick={onPlayGame}
        className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.05, boxShadow: "0 0 40px hsl(345 80% 55% / 0.6)" }}
        whileTap={{ scale: 0.95 }}
        transition={{ delay: 1 }}
        style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
      >
        <span className="flex items-center gap-2">
          Play Catch My Love 💝
        </span>
      </motion.button>
    </motion.div>
  );
};

export default ValentineWeek;
