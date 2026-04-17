'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useStore } from '@/lib/store';
import { scenarios } from '@/lib/scenarios';
import { Share2, RotateCcw, AlertTriangle, ShieldCheck, HelpCircle, CornerUpRight, ChevronRight } from 'lucide-react';

export default function ResultsPage() {
  const router = useRouter();
  const { score, streak, answers, resetGame, playerName, setPlayerName } = useStore();
  const [displayScore, setDisplayScore] = useState(0);
  const [showNameModal, setShowNameModal] = useState(false);
  const [tempName, setTempName] = useState('');

  // Setup badge logic based on score
  const getBadge = (s: number) => {
    if (s <= 40) return { title: 'Scam Rookie 🐣', color: 'text-gray-500 font-bold bg-gray-100 dark:bg-gray-800' };
    if (s <= 70) return { title: 'Scam Detective 🔍', color: 'text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-900/40 ring-1 ring-blue-500/20' };
    if (s <= 90) return { title: 'Scam Guardian 🛡️', color: 'text-purple-600 dark:text-purple-400 font-bold bg-purple-50 dark:bg-purple-900/40 ring-1 ring-purple-500/20' };
    return { title: 'Scam Shield Master 👑', color: 'text-yellow-600 dark:text-yellow-400 font-bold bg-yellow-50 dark:bg-yellow-900/40 ring-1 ring-yellow-500/20' };
  };
  const badge = getBadge(score);

  const correctAnswers = answers.filter(a => a.correct).length;
  const incorrectAnswers = answers.filter(a => !a.correct);

  useEffect(() => {
    if (answers.length === 0) {
      router.push('/');
      return;
    }

    if (!playerName) {
      setShowNameModal(true);
    } else {
      saveScore(playerName);
    }

    // Trigger celebratory confetti
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#60BB46', '#3b82f6', '#eab308']
      });
    }, 400);

    // Number counting animation
    let start = 0;
    const duration = 1200;
    if (score === 0) return;
    
    const interval = 20; 
    const steps = duration / interval;
    const increment = score / steps;
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= score) {
        clearInterval(timer);
        setDisplayScore(score);
      } else {
        setDisplayScore(Math.floor(start));
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, [answers, router]);

  const saveScore = (name: string) => {
    const saved = localStorage.getItem('scamshield_leaderboard');
    let leaderboard = saved ? JSON.parse(saved) : [];
    
    const newEntry = {
      id: Math.random().toString(36).substring(2, 10),
      name: name || 'Anonymous',
      score,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      badge: getBadge(score).title
    };
    
    leaderboard = [...leaderboard, newEntry];
    localStorage.setItem('scamshield_leaderboard', JSON.stringify(leaderboard));
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = tempName.trim() || 'Anonymous';
    setPlayerName(finalName);
    saveScore(finalName);
    setShowNameModal(false);
  };

  const handleShare = async () => {
    const text = `I scored ${score}/100 and unlocked the ${badge.title.split(' ')[0]} badge on ScamShield! Can you beat me?`;
    const url = window.location.origin;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'ScamShield Result', text, url });
      } catch (err) {
        navigator.clipboard.writeText(`${text} ${url}`);
        alert('Copied to clipboard!');
      }
    } else {
      navigator.clipboard.writeText(`${text} ${url}`);
      alert('Copied to clipboard!');
    }
  };

  const handlePlayAgain = () => {
    resetGame();
    router.push('/play');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, bounce: 0.4 } }
  };

  if (answers.length === 0) return null;

  return (
    <div className="min-h-screen bg-surface dark:bg-black px-4 py-12 flex justify-center font-sans overflow-x-hidden relative">
      
      {/* Name Prompt Modal */}
      <AnimatePresence>
        {showNameModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 dark:bg-black/80 backdrop-blur-sm">
            <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.9, opacity: 0 }}
               className="bg-white dark:bg-gray-900 rounded-[32px] p-8 w-full max-w-sm shadow-2xl"
            >
              <h3 className="text-2xl font-bold font-heading mb-2 dark:text-white">What's your name?</h3>
              <p className="text-sm text-gray-500 mb-6">Enter your name to save your score to the leaderboard.</p>
              <form onSubmit={handleNameSubmit} className="space-y-4">
                <input 
                  autoFocus
                  type="text" 
                  maxLength={15}
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="e.g. Ram" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none dark:text-white font-bold"
                />
                <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-[#52a63b] transition-colors flex justify-center items-center">
                  Save Score <ChevronRight size={18} className="ml-1" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full max-w-2xl flex flex-col space-y-10"
      >
        
        {/* Score & Badge Section */}
        <motion.div variants={itemVariants} className="text-center bg-white dark:bg-gray-900 rounded-[40px] px-6 py-12 shadow-2xl border border-gray-100 dark:border-gray-800">
           <h2 className="text-gray-500 font-black uppercase tracking-[0.2em] text-sm mb-6">Mission Complete</h2>
           
           <div className="flex justify-center mb-8">
             <motion.div 
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, type: 'spring', bounce: 0.6 }}
                className={`text-xl md:text-2xl px-6 py-2 rounded-full inline-block ${badge.color} shadow-sm`}
             >
                {badge.title}
             </motion.div>
           </div>

           <div className="text-8xl md:text-[120px] font-black font-heading text-gray-900 dark:text-white drop-shadow-sm mb-2 tabular-nums tracking-tighter leading-none">
              {displayScore}<span className="text-3xl md:text-5xl text-gray-300 dark:text-gray-700 -ml-2">/100</span>
           </div>
           <p className="text-gray-500 font-semibold uppercase tracking-wider text-sm">Total Score</p>
        </motion.div>

        {/* Breakdown Card */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-xl grid grid-cols-3 gap-2 divide-x divide-gray-100 dark:divide-gray-800 text-center">
            <div className="flex flex-col items-center justify-center p-2">
              <ShieldCheck className="text-safe mb-3 w-8 h-8 opacity-80" />
              <span className="text-3xl font-black dark:text-white mb-1 tabular-nums tracking-tight">{correctAnswers} <span className="text-lg text-gray-400 font-bold">/ {answers.length}</span></span>
              <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Correct</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2">
              <span className="text-4xl mb-2 opacity-90 drop-shadow-sm">🔥</span>
              <span className="text-3xl font-black dark:text-white mb-1 tabular-nums tracking-tight">{streak}</span>
              <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Max Streak</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2">
               <span className="text-4xl mb-2 opacity-90 drop-shadow-sm">⏱️</span>
               <span className="text-3xl font-black dark:text-white mb-1 tabular-nums tracking-tight">2:34</span>
               <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Time</span>
            </div>
        </motion.div>

        {/* Missed Scenarios */}
        {incorrectAnswers.length > 0 && (
          <motion.div variants={itemVariants} className="flex flex-col space-y-4 pt-4">
             <h3 className="text-2xl font-black font-heading dark:text-white flex items-center mb-2">
               <HelpCircle className="mr-3 text-danger stroke-[2.5px]" size={28} /> 
               Which scams tricked you?
             </h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {incorrectAnswers.map((ans, idx) => {
                  const sc = scenarios.find(s => s.id === ans.scenarioId);
                  if (!sc) return null;
                  return (
                    <div key={idx} className="bg-white dark:bg-gray-900 border border-danger/20 dark:border-danger/30 rounded-[24px] p-5 flex flex-col justify-between hover:border-danger/40 transition-colors shadow-sm relative overflow-hidden group">
                       <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-danger to-orange-500 opacity-20"></div>
                       <div>
                         <div className="text-[10px] font-black tracking-widest text-[#dc2626] uppercase mb-2 bg-[#dc2626]/10 px-2 py-1 rounded w-max inline-block">{sc.type.replace('_', ' ')}</div>
                         <h4 className="font-bold text-gray-900 dark:text-gray-100 leading-snug line-clamp-2 mb-3 text-sm">{sc.title}</h4>
                       </div>
                       <button onClick={() => alert("Replay feature mock. You should see ID: " + sc.id)} className="text-[13px] font-bold text-danger flex items-center opacity-80 group-hover:opacity-100 transition-opacity mt-auto">
                         <RotateCcw size={14} className="mr-1.5" /> Replay this round
                       </button>
                    </div>
                  );
                })}
             </div>
          </motion.div>
        )}

        {/* Actions CTA Section */}
        <motion.div variants={itemVariants} className="flex flex-col space-y-4 pt-6 pb-12">
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <button onClick={handleShare} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-[20px] shadow-[0_10px_20px_rgba(37,99,235,0.2)] flex items-center justify-center space-x-2 transition-transform active:scale-95 text-lg">
               <Share2 size={22} />
               <span>Share My Score</span>
             </button>
             <button onClick={handlePlayAgain} className="bg-primary hover:bg-[#52a63b] text-white font-bold py-5 rounded-[20px] shadow-[0_10px_20px_rgba(96,187,70,0.3)] flex items-center justify-center space-x-2 transition-transform active:scale-95 text-lg">
               <RotateCcw size={22} className="-rotate-90" />
               <span>Play Again</span>
             </button>
           </div>

           <div className="flex flex-row justify-center space-x-8 pt-8 text-sm font-bold bg-white dark:bg-gray-900 px-6 py-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
             <button onClick={() => router.push('/report')} className="text-danger flex items-center hover:bg-danger/5 px-4 py-2 rounded-lg transition-colors">
               <AlertTriangle size={18} className="mr-2"/> Report a Real Scam
             </button>
             <button onClick={() => router.push('/learn')} className="text-gray-500 dark:text-gray-400 flex items-center hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-2 rounded-lg transition-colors">
               <CornerUpRight size={18} className="mr-2"/> Learn More
             </button>
           </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
