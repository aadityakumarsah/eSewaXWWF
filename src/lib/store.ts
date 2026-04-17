import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Answer {
  scenarioId: string;
  correct: boolean;
}

interface ScamShieldState {
  score: number;
  streak: number;
  currentIndex: number;
  answers: Answer[];
  language: 'en' | 'ne';
  soundEnabled: boolean;
  playerName: string;
  
  // Actions
  setScore: (score: number) => void;
  setStreak: (streak: number) => void;
  setCurrentIndex: (index: number) => void;
  addAnswer: (answer: Answer) => void;
  resetGame: () => void;
  setLanguage: (lang: 'en' | 'ne') => void;
  setSoundEnabled: (enabled: boolean) => void;
  setPlayerName: (name: string) => void;
}

export const useStore = create<ScamShieldState>()(
  persist(
    (set) => ({
      score: 0,
      streak: 0,
      currentIndex: 0,
      answers: [],
      language: 'en',
      soundEnabled: true,
      playerName: '',

      setScore: (score) => set({ score }),
      setStreak: (streak) => set({ streak }),
      setCurrentIndex: (currentIndex) => set({ currentIndex }),
      addAnswer: (answer) => set((state) => ({ 
        answers: [...state.answers, answer] 
      })),
      resetGame: () => set({ 
        score: 0, 
        streak: 0, 
        currentIndex: 0, 
        answers: [] 
      }),
      setLanguage: (language) => set({ language }),
      setSoundEnabled: (soundEnabled) => set({ soundEnabled }),
      setPlayerName: (playerName) => set({ playerName }),
    }),
    {
      name: 'scam-shield-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
