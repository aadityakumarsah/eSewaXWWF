'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award } from 'lucide-react';
import { useStore } from '@/lib/store';

type LeaderboardEntry = {
  id: string;
  name: string;
  score: number;
  date: string;
  badge: string;
};

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const { playerName } = useStore();

  useEffect(() => {
    const saved = localStorage.getItem('scamshield_leaderboard');
    if (saved) {
      try {
        const parsed: LeaderboardEntry[] = JSON.parse(saved);
        // Sort explicitly by score descending, then slice top 10 just in case
        const sorted = parsed.sort((a, b) => b.score - a.score).slice(0, 10);
        setEntries(sorted);
      } catch (e) {}
    }
  }, []);

  const getRankStyle = (index: number) => {
    switch (index) {
      case 0: return 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700 shadow-[0_0_15px_rgba(234,179,8,0.5)] z-10';
      case 1: return 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 shadow-[0_0_15px_rgba(156,163,175,0.4)] z-10';
      case 2: return 'bg-orange-50 dark:bg-orange-900/20 border-orange-300 dark:border-orange-800 shadow-[0_0_10px_rgba(217,119,6,0.3)] z-10';
      default: return 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/80';
    }
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <Trophy className="text-yellow-500 fill-yellow-500 w-8 h-8 drop-shadow-md" />;
      case 1: return <Medal className="text-gray-400 fill-gray-300 w-7 h-7 drop-shadow-sm" />;
      case 2: return <Award className="text-orange-600 fill-orange-400 w-6 h-6 drop-shadow-sm" />;
      default: return <span className="font-black text-gray-400 dark:text-gray-600 w-6 text-center">{index + 1}</span>;
    }
  };

  return (
    <div className="min-h-[100dvh] bg-surface dark:bg-black font-sans px-4 py-12 flex flex-col items-center">
      <div className="w-full max-w-4xl flex flex-col space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-100 dark:bg-yellow-900/20 text-yellow-500 mb-2">
            <Trophy size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black font-heading text-gray-900 dark:text-white tracking-tight">Hall of Fame</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Top Scam Shield Masters</p>
        </div>

        <div className="w-full relative mt-8">
          {entries.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-white dark:bg-gray-900 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm"
            >
              <Trophy className="mx-auto text-gray-200 dark:text-gray-800 w-24 h-24 mb-4" />
              <p className="text-xl text-gray-500 font-bold">No scores yet. Be the first to conquer the leaderboard!</p>
            </motion.div>
          ) : (
            <div className="flex flex-col space-y-3">
               {/* Table Header */}
               <div className="hidden md:grid grid-cols-[80px_1fr_120px_180px_120px] gap-4 px-6 py-2 text-xs font-bold uppercase tracking-widest text-gray-400">
                  <div className="text-center">Rank</div>
                  <div>Player</div>
                  <div className="text-center">Score</div>
                  <div>Badge</div>
                  <div className="text-right">Date</div>
               </div>
               
               {/* Entries */}
               {entries.map((entry, idx) => {
                 const isCurrentUser = playerName !== '' && entry.name === playerName;
                 
                 return (
                   <motion.div 
                     key={entry.id + idx}
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: idx * 0.1 }}
                     className={`relative border rounded-2xl p-4 md:px-6 transition-all duration-300 md:grid md:grid-cols-[80px_1fr_120px_180px_120px] items-center gap-4 ${getRankStyle(idx)} ${isCurrentUser ? 'ring-2 ring-primary border-primary' : ''}`}
                   >
                      <div className="flex items-center justify-center mb-2 md:mb-0">
                         {getRankIcon(idx)}
                      </div>
                      <div className="text-center md:text-left font-bold text-lg text-gray-900 dark:text-white flex items-center justify-center md:justify-start">
                         {entry.name || 'Anonymous'}
                         {isCurrentUser && <span className="ml-2 text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded uppercase tracking-wider">You</span>}
                      </div>
                      <div className="text-center text-2xl font-black font-heading text-gray-900 dark:text-white tabular-nums">
                         {entry.score}
                      </div>
                      <div className="text-center md:text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                         {entry.badge.split(' ')[0]} {entry.badge.split(' ')[1]} {entry.badge.split(' ')[2]}
                      </div>
                      <div className="text-center md:text-right text-xs text-gray-500 font-medium">
                         {entry.date}
                      </div>
                   </motion.div>
                 );
               })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
