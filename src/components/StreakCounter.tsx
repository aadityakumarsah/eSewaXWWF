'use client';
import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';

export function StreakCounter() {
  const streak = useStore((state) => state.streak);

  return (
    <div className="flex items-center space-x-2 bg-orange-50 dark:bg-orange-950/30 rounded-full px-4 py-2 shadow-sm border border-orange-100 dark:border-orange-900/50">
      <motion.span
        key={streak}
        initial={{ scale: 1 }}
        animate={{ scale: streak > 0 ? [1, 1.5, 1] : 1 }}
        transition={{ duration: 0.4, type: "tween" }}
        className="text-lg inline-block origin-center"
      >
        🔥
      </motion.span>
      <span className="font-bold text-base text-orange-600 dark:text-orange-400">
        {streak}
      </span>
    </div>
  );
}
