'use client';
import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';

export function ScoreBar() {
  const score = useStore((state) => state.score);

  return (
    <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-sm border border-gray-100 dark:border-gray-700">
      <span className="text-lg">🏆</span>
      <motion.span
        key={score}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="font-bold text-base dark:text-gray-100"
      >
        {score}
      </motion.span>
    </div>
  );
}
