'use client';

import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useInView, animate } from 'framer-motion';
import { Shield, Target, Brain, Ribbon, Moon, Sun, Languages } from 'lucide-react';
import { useStore } from '@/lib/store';

// Helper for Animated Number
function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (val) => {
          if (ref.current) {
            const isFloat = value % 1 !== 0;
            ref.current.textContent = isFloat ? val.toFixed(1) : Math.round(val).toLocaleString();
          }
        }
      });
      return controls.stop;
    }
  }, [inView, value]);

  return <span ref={ref}>0</span>;
}

export default function LandingPage() {
  const router = useRouter();
  const { language, setLanguage } = useStore();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleDarkMode = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    setIsDarkMode(isDark);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ne' : 'en');
  };

  const howItWorksRef = useRef<HTMLDivElement>(null);
  const scrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-surface dark:bg-black text-gray-900 dark:text-gray-100 font-sans flex flex-col items-center overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto px-6 py-24 flex flex-col items-center text-center mt-8">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
          className="relative mb-10"
        >
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 empty:hidden"
          ></motion.div>
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Shield size={96} className="text-primary relative z-10 drop-shadow-[0_0_20px_rgba(96,187,70,0.4)]" />
          </motion.div>
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-[44px] md:text-[72px] font-bold font-heading leading-tight tracking-tight mb-6 max-w-4xl text-gray-900 dark:text-white"
        >
          Don't get scammed. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
            Learn to spot them.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl font-medium"
        >
          Nepal lost ₹2.3 billion to digital scams in 2025. <br className="hidden md:block"/>
          Be the one who didn't.
        </motion.p>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto"
        >
          <button 
            onClick={() => router.push('/play')}
            className="bg-primary text-white font-bold text-xl px-10 py-5 rounded-full shadow-[0_10px_30px_rgba(96,187,70,0.3)] hover:shadow-[0_15px_40px_rgba(96,187,70,0.4)] hover:-translate-y-1 transition-all duration-300 active:scale-95"
          >
            Start the Challenge
          </button>
          <button 
            onClick={scrollToHowItWorks}
            className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-xl px-10 py-5 rounded-full border border-gray-200 dark:border-gray-800 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors active:scale-95"
          >
            Learn More
          </button>
        </motion.div>
      </section>

      {/* Animated Stats Ticker */}
      <section className="w-full bg-gray-900 dark:bg-gray-950/50 text-white py-16 px-6 mt-12 border-y border-gray-800">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-800">
          <div className="flex flex-col items-center justify-center p-4">
            <h3 className="text-5xl md:text-6xl font-black font-heading mb-3 text-primary drop-shadow-sm">
              ₹<AnimatedNumber value={2.3} />B
            </h3>
            <p className="text-gray-400 font-bold tracking-wide uppercase text-sm">Lost to scams in 2025</p>
          </div>
          <div className="flex flex-col items-center justify-center p-4">
            <h3 className="text-5xl md:text-6xl font-black font-heading mb-3 drop-shadow-sm">
              <AnimatedNumber value={10} />M+
            </h3>
            <p className="text-gray-400 font-bold tracking-wide uppercase text-sm">eSewa users at risk</p>
          </div>
          <div className="flex flex-col items-center justify-center p-4">
            <h3 className="text-5xl md:text-6xl font-black font-heading mb-3 text-danger drop-shadow-sm">
              <AnimatedNumber value={73} />%
            </h3>
            <p className="text-gray-400 font-bold tracking-wide uppercase text-sm">Of Nepalis targeted</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section ref={howItWorksRef} className="w-full max-w-6xl mx-auto px-6 py-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black font-heading text-gray-900 dark:text-white">How It Works</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Target,
              title: "Face 10 real scenarios",
              desc: "We show you realistic scam scenarios built from real reports spanning SMS, calls, emails, and social media."
            },
            {
              icon: Brain,
              title: "Spot the red flags",
              desc: "Learn what to look out for. Every scenario breaks down the psychology and specifics of the scam."
            },
            {
              icon: Ribbon,
              title: "Build your shield",
              desc: "Earn badges, track your streak, and most importantly: protect yourself and your family."
            }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.2 }}
              className="bg-white dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 rounded-[32px] p-8 shadow-xl flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <item.icon size={40} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="w-full bg-blue-50 dark:bg-blue-950/20 py-24 px-6 border-y border-blue-100 dark:border-blue-900/30">
        <div className="max-w-4xl mx-auto text-center space-y-8 relative">
          <div className="flex justify-center mb-6">
            <span className="text-8xl text-blue-200 dark:text-blue-900/40 leading-none h-10 select-none">"</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-medium text-gray-900 dark:text-white leading-tight max-w-3xl mx-auto relative z-10">
            {language === 'en' 
              ? "Prevention is better than losing your life savings."
              : "आफ्नो जीवनभरको कमाइ गुमाउनु भन्दा रोकथाम गर्नु बेस हो।"}
          </h2>
          <p className="text-gray-500 font-bold tracking-widest uppercase text-sm">— ScamShield Philosophy</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto px-6 py-12 flex flex-col items-center border-t border-gray-200 dark:border-gray-800 mt-auto">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center space-x-6 grayscale opacity-80 dark:opacity-60 mix-blend-multiply dark:mix-blend-screen bg-gray-100 dark:bg-gray-900 px-6 py-4 rounded-xl border border-gray-200 dark:border-gray-800">
            <div className="text-2xl font-black font-heading text-[#60BB46] grayscale-0">eSewa</div>
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-700"></div>
            <div className="text-2xl font-black font-sans uppercase tracking-tighter">WWF</div>
          </div>
        </div>
        <p className="text-gray-500 font-bold mb-8 text-center text-sm md:text-base tracking-wide uppercase">
          Built for eSewa x WWF Hackathon 2026
        </p>
        <div className="flex items-center space-x-4 bg-gray-100 dark:bg-gray-900 p-2 rounded-full border border-gray-200 dark:border-gray-800 shadow-sm">
          <button 
            onClick={toggleLanguage}
            className="flex items-center space-x-2 px-5 py-2 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors text-sm font-bold text-gray-600 dark:text-gray-300 shadow-sm border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
          >
            <Languages size={18} />
            <span>{language === 'en' ? 'EN' : 'नेपाली'}</span>
          </button>
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-700"></div>
          <button 
            onClick={toggleDarkMode}
            className="flex items-center space-x-2 px-5 py-2 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors text-sm font-bold text-gray-600 dark:text-gray-300 shadow-sm border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
          >
             {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
             <span>{isDarkMode ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </footer>
    </main>
  );
}
