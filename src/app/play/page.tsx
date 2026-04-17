'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';
import { scenarios, Scenario } from '@/lib/scenarios';
import { translations } from '@/lib/translations';
import { PhoneMockup } from '@/components/PhoneMockup';
import { ScoreBar } from '@/components/ScoreBar';
import { StreakCounter } from '@/components/StreakCounter';
import { RedFlagHighlight } from '@/components/RedFlagHighlight';
import { playSound, vibrate } from '@/lib/utils';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const MAX_SCENARIOS = 10;

// Helper to extract keywords consistently
export const extractKeywords = (scenario: Scenario) => {
  let extracted: string[] = [];
  scenario.redFlags.forEach(flag => {
    const matches = flag.match(/"([^"]+)"/g);
    if (matches) {
      matches.forEach(m => extracted.push(m.replace(/"/g, '')));
    }
  });

  if (scenario.id === 'sc-002') extracted.push('OTP', 'suspicious activity');
  if (scenario.id === 'sc-004') extracted.push('Rs. 10,000');
  if (scenario.id === 'sc-005') extracted.push('Rs. 200');
  if (scenario.id === 'sc-007') extracted.push('Rs. 500', '20 seats left');
  if (scenario.id === 'sc-011') extracted.push('Rs. 150', 'Ram Bahadur');
  if (scenario.id === 'sc-012') extracted.push('10% DAILY returns', 't.me/esewaInvestNP', 'Rs. 5,000');
  if (scenario.id === 'sc-013') extracted.push('urgent Rs. 15,000', 'mama', 'accident');
  if (scenario.id === 'sc-014') extracted.push('Rs. 3,500', 'ntc-lottery@gmail.com');

  return extracted.filter(Boolean);
};

export default function PlayPage() {
  const router = useRouter();
  const { 
    score, streak, setScore, setStreak, 
    addAnswer, language, soundEnabled 
  } = useStore();

  const [gameScenarios, setGameScenarios] = useState<Scenario[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isMounting, setIsMounting] = useState(true);
  const [isAnswering, setIsAnswering] = useState(false);

  const t = translations[language].game;

  // Initialize game on mount
  useEffect(() => {
    // Reset answers
    useStore.setState({ answers: [], score: 0, streak: 0 });
    
    // Pick random scenarios
    const shuffled = [...scenarios].sort(() => 0.5 - Math.random());
    setGameScenarios(shuffled.slice(0, MAX_SCENARIOS));
    setIsMounting(false);
  }, []);

  if (isMounting || gameScenarios.length === 0) {
    return <div className="min-h-screen bg-bg dark:bg-black" />;
  }

  const currentScenario = gameScenarios[currentIndex];
  // Calculate if the user was right based on last answer
  const storeAnswers = useStore.getState().answers;
  const lastAnswer = storeAnswers[storeAnswers.length - 1];
  const isCorrect = lastAnswer?.correct;

  const handleAnswer = (userGuessedScam: boolean) => {
    if (isAnswering) return;
    setIsAnswering(true);
    
    const correct = userGuessedScam === currentScenario.isScam;
    
    // Update store
    addAnswer({ scenarioId: currentScenario.id, correct });
    
    if (correct) {
      setScore(score + 10);
      setStreak(streak + 1);
      if (soundEnabled) playSound('success');
      vibrate(50);
    } else {
      setScore(score > 5 ? score - 5 : 0);
      setStreak(0);
      if (soundEnabled) playSound('error');
      vibrate([50, 50, 50]);
    }

    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIndex + 1 >= MAX_SCENARIOS) {
      router.push('/results');
    } else {
      setShowExplanation(false);
      setIsAnswering(false);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const keywords = extractKeywords(currentScenario);

  return (
    <div className="min-h-[100dvh] bg-surface dark:bg-gray-950 flex flex-col font-sans max-w-lg mx-auto md:border-x md:border-gray-200 dark:md:border-gray-800">
      {/* Top Bar Navigation */}
      <div className="px-4 py-4 flex justify-between items-center sticky top-0 bg-surface/90 dark:bg-gray-950/90 backdrop-blur z-20">
        <div className="text-sm font-semibold text-gray-500 rounded-full border border-gray-200 dark:border-gray-800 px-3 py-1 bg-white dark:bg-gray-900 shadow-sm">
          {t.scenario} {currentIndex + 1} {t.of} {MAX_SCENARIOS}
        </div>
        <div className="flex space-x-2">
          <ScoreBar />
          <StreakCounter />
        </div>
      </div>

      {/* Progress Bar Line */}
      <div className="h-1.5 bg-gray-200 dark:bg-gray-800 w-full mb-4">
        <div 
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${((currentIndex + 1) / MAX_SCENARIOS) * 100}%` }}
        />
      </div>

      <div className="flex-1 relative flex flex-col px-2 md:px-4 pb-8 overflow-x-hidden">
        <AnimatePresence mode="wait">
          {!showExplanation ? (
            <motion.div 
              key={`question-${currentIndex}`}
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ rotateY: 90, scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.15 }}
              className="flex-1 flex flex-col w-full h-full"
            >
              <div className="flex-1 min-h-[500px]">
                 <PhoneMockup scenario={currentScenario} showFlags={false} />
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 px-2 mt-8 pt-4">
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(false)}
                  disabled={isAnswering}
                  className="bg-safe text-white py-5 rounded-[24px] font-bold text-lg shadow-xl shadow-safe/30 flex flex-col items-center border-t border-white/20 hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-3xl mb-1 drop-shadow-md">✅</span>
                  {t.safeButton.replace('✅ ', '')}
                </motion.button>
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(true)}
                  disabled={isAnswering}
                  className="bg-danger text-white py-5 rounded-[24px] font-bold text-lg shadow-xl shadow-danger/30 flex flex-col items-center border-t border-white/20 hover:bg-red-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-3xl mb-1 drop-shadow-md">🚨</span>
                  {t.scamButton.replace('🚨 ', '')}
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key={`explanation-${currentIndex}`}
              initial={{ rotateY: -90, scale: 0.9, opacity: 0 }}
              animate={{ rotateY: 0, scale: 1, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.15 }}
              className="flex-1 flex flex-col px-2 max-w-sm mx-auto w-full h-full"
            >
              <div className="bg-white dark:bg-gray-900 rounded-[32px] p-6 shadow-2xl flex flex-col mb-6 border border-gray-100 dark:border-gray-800">
                <div className="flex flex-col items-center text-center pb-6 border-b border-gray-100 dark:border-gray-800">
                  {isCorrect ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: [0, 15, -15, 0] }} transition={{ duration: 0.4, type: "tween" }}>
                      <CheckCircle className="text-primary w-20 h-20 mb-3" />
                    </motion.div>
                  ) : (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: [0, 15, -15, 0] }} transition={{ duration: 0.4, type: "tween" }}>
                      <XCircle className="text-danger w-20 h-20 mb-3" />
                    </motion.div>
                  )}
                  <h2 className="text-3xl font-heading font-bold dark:text-white mb-2">
                    {isCorrect ? t.correct : "Gotcha!"}
                  </h2>
                  <p className="text-gray-500">
                    {t.youIdentified} <strong className="text-gray-900 dark:text-white mx-1">{isCorrect ? (currentScenario.isScam ? t.aScam : t.legitimate) : (currentScenario.isScam ? t.legitimate : t.aScam)}</strong>.
                    <br/>
                    {t.actuallyWas} <strong className="text-gray-900 dark:text-white mx-1">{currentScenario.isScam ? t.aScam : t.legitimate}</strong>.
                  </p>
                </div>
                
                <div className="py-6 flex-1">
                  <h3 className="font-bold text-lg mb-2 flex items-center">{t.explanation}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl text-[15px] leading-relaxed border border-gray-100 dark:border-gray-800">
                    {currentScenario.explanation}
                  </p>
                  
                  {/* Show Highlighted Content */}
                  <div className="mb-6 bg-gray-100 dark:bg-gray-800 p-4 rounded-xl text-[14px] leading-relaxed italic border-l-4 border-primary">
                    "<RedFlagHighlight content={currentScenario.content} showFlags={true} keywords={keywords} className="" />"
                  </div>

                  {currentScenario.isScam && currentScenario.redFlags.length > 0 && (
                    <>
                      <h3 className="font-bold text-lg mb-3 flex items-center text-danger">
                        <AlertTriangle size={20} className="mr-2" />
                        {t.redFlags}
                      </h3>
                      <ul className="space-y-3">
                        {currentScenario.redFlags.map((flag, i) => (
                          <li key={i} className="flex items-start bg-danger/5 dark:bg-danger/10 p-3 rounded-xl border border-danger/10">
                            <span className="text-danger mr-2 mt-0.5 font-bold">•</span>
                            <span className="text-sm text-gray-700 dark:text-gray-200">{flag}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-4 rounded-2xl text-xl shadow-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors my-2"
              >
                {t.nextButton} →
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
