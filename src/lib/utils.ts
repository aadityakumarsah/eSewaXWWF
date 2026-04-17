import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Triggers device vibration pattern if supported
 */
export function vibrate(pattern: number | number[]) {
  if (typeof window !== 'undefined' && 'navigator' in window && navigator.vibrate) {
    try {
      navigator.vibrate(pattern);
    } catch (e) {
      console.warn('Vibration failed:', e);
    }
  }
}

let audioCtx: AudioContext | null = null;

const initAudio = () => {
  if (typeof window !== 'undefined' && !audioCtx) {
    // @ts-ignore
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
};

/**
 * Generates simple synth sounds using Web Audio API so we don't need MP3 files.
 */
export function playSound(type: 'success' | 'error' | 'tap' | 'win') {
  if (typeof window === 'undefined') return;
  
  try {
    initAudio();
    if (!audioCtx) return;
    
    // Resume context if suspended (browser autoplay policy)
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    
    const t = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, t);
      osc.frequency.exponentialRampToValueAtTime(800, t + 0.1);
      gainNode.gain.setValueAtTime(0.1, t);
      gainNode.gain.exponentialRampToValueAtTime(0.01, t + 0.3);
      osc.start(t);
      osc.stop(t + 0.3);
    } else if (type === 'error') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, t);
      osc.frequency.exponentialRampToValueAtTime(100, t + 0.3);
      gainNode.gain.setValueAtTime(0.1, t);
      gainNode.gain.exponentialRampToValueAtTime(0.01, t + 0.3);
      osc.start(t);
      osc.stop(t + 0.3);
    } else if (type === 'tap') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, t);
      gainNode.gain.setValueAtTime(0.05, t);
      gainNode.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
      osc.start(t);
      osc.stop(t + 0.05);
    } else if (type === 'win') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(400, t);
      osc.frequency.setValueAtTime(523.25, t + 0.1); // C5
      osc.frequency.setValueAtTime(659.25, t + 0.2); // E5
      osc.frequency.setValueAtTime(783.99, t + 0.3); // G5
      gainNode.gain.setValueAtTime(0.1, t);
      gainNode.gain.setValueAtTime(0.1, t + 0.3);
      gainNode.gain.exponentialRampToValueAtTime(0.01, t + 0.8);
      osc.start(t);
      osc.stop(t + 0.8);
    }
  } catch (e) {
    console.warn('Audio playback failed:', e);
  }
}
