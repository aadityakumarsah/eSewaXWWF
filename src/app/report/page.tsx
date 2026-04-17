'use client';

import { useState, useEffect, useRef } from 'react';
import { Shield, CheckCircle, Image as ImageIcon, Upload, Clock, Phone, Mail, Link as LinkIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

type Report = {
  id: string;
  type: string;
  title: string;
  description: string;
  contact?: string;
  screenshotBase64?: string;
  timestamp: number;
};

const SCAM_TYPES = [
  { id: 'sms', label: 'SMS / Text Message', icon: '💬' },
  { id: 'call', label: 'Phone Call', icon: '📞' },
  { id: 'email', label: 'Email', icon: '✉️' },
  { id: 'qr', label: 'QR Code', icon: '🔳' },
  { id: 'social_media', label: 'Social Media', icon: '🌐' },
  { id: 'other', label: 'Other', icon: '❓' },
];

export default function ReportPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const wallRef = useRef<HTMLDivElement>(null);

  // Form State
  const [type, setType] = useState('sms');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');
  const [screenshot, setScreenshot] = useState<string | undefined>();

  useEffect(() => {
    const saved = localStorage.getItem('scamshield_reports');
    if (saved) {
      try {
        setReports(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshot(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.length < 50) return;

    const newReport: Report = {
      id: Math.random().toString(36).substring(2, 10),
      type,
      title,
      description,
      contact,
      screenshotBase64: screenshot,
      timestamp: Date.now(),
    };

    const updated = [newReport, ...reports];
    setReports(updated);
    localStorage.setItem('scamshield_reports', JSON.stringify(updated));

    setIsSubmitted(true);
    
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#60BB46', '#2563eb', '#ffffff']
      });
    }, 300);
  };

  const scrollToWall = () => {
    wallRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const timeAgo = (ts: number) => {
    const diffMins = Math.floor((Date.now() - ts) / 60000);
    if (diffMins < 60) return `${diffMins || 1} mins ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${Math.floor(diffHours / 24)} days ago`;
  };

  return (
    <div className="min-h-screen bg-surface dark:bg-black font-sans px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-danger/10 text-danger mb-2">
            <Shield size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black font-heading text-gray-900 dark:text-white tracking-tight">Report a Scam</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Help us build a safer digital Nepal. Your anonymous report directly helps educate others.</p>
        </div>

        {/* Report Block */}
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form 
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onSubmit={handleSubmit}
              className="bg-white dark:bg-gray-900 p-6 md:p-10 rounded-[32px] shadow-xl border border-gray-100 dark:border-gray-800 space-y-6"
            >
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Where did you encounter this scam?</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {SCAM_TYPES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setType(t.id)}
                      className={`py-3 px-4 rounded-xl border text-sm font-bold flex flex-col items-center justify-center space-y-1 transition-all ${
                        type === t.id 
                          ? 'bg-primary/10 border-primary text-primary' 
                          : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-2xl">{t.icon}</span>
                      <span>{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Brief Title <span className="text-danger">*</span></label>
                <input 
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Fake eSewa Whatsapp Lottery"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Detailed Description <span className="text-danger">*</span>
                </label>
                <textarea 
                  required
                  minLength={50}
                  maxLength={500}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="What happened? What were they asking for? (50-500 chars)"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all h-32 resize-none"
                />
                <div className="text-right text-xs text-gray-500 mt-1">{description.length}/500</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Scammer's Contact (Optional)</label>
                  <input 
                    value={contact}
                    onChange={e => setContact(e.target.value)}
                    placeholder="Phone number, email, or profile link"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Screenshot (Optional)</label>
                  <label className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 border-dashed bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors h-[50px]">
                    {screenshot ? (
                       <span className="text-primary font-semibold flex items-center"><CheckCircle size={16} className="mr-2" /> Image Attached</span>
                    ) : (
                       <span className="flex items-center"><Upload size={16} className="mr-2" /> Upload Image</span>
                    )}
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={description.length < 50 || title.length === 0}
                  className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 hover:bg-[#52a63b] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Report Anonymously
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-900 p-10 rounded-[32px] shadow-xl text-center space-y-6 border border-gray-100 dark:border-gray-800"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [-10, 0] }}
                transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
                className="w-24 h-24 bg-green-100 text-primary rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <motion.div
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <CheckCircle size={48} />
                </motion.div>
              </motion.div>
              <h2 className="text-3xl font-bold dark:text-white">Thank You!</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md mx-auto">
                Your report has been received and added to our database. Your contribution actively helps protect others from falling for similar tricks!
              </p>
              <div className="pt-4 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
                <button 
                  onClick={() => {
                    setTitle(''); setDescription(''); setContact(''); setScreenshot(undefined);
                    setIsSubmitted(false);
                  }}
                  className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-bold py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Report Another
                </button>
                <button 
                  onClick={scrollToWall}
                  className="bg-primary hover:bg-[#52a63b] text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all"
                >
                  View Community Wall
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Community Wall */}
        <div ref={wallRef} className="pt-12">
          <h2 className="text-2xl font-bold font-heading mb-8 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-4">Community Reports Wall</h2>
          
          {reports.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-900/50 rounded-3xl border border-gray-200 dark:border-gray-800 space-y-4">
              <Shield className="mx-auto text-gray-400 w-12 h-12" />
              <p className="text-gray-500 font-medium text-lg">No reports yet. Be the first to report!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reports.map((report) => (
                <div key={report.id} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-2">
                       <span className="text-2xl">{SCAM_TYPES.find(t => t.id === report.type)?.icon || '❓'}</span>
                       <div>
                         <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{SCAM_TYPES.find(t => t.id === report.type)?.label}</span>
                         <h3 className="font-bold text-gray-900 dark:text-gray-100 leading-tight">{report.title}</h3>
                       </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4 italic flex-1">
                    "{report.description.length > 100 ? report.description.substring(0, 100) + '...' : report.description}"
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-400 font-medium pt-3 border-t border-gray-100 dark:border-gray-800">
                    <span className="flex items-center"><Clock size={12} className="mr-1"/> {timeAgo(report.timestamp)}</span>
                    <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">ID: #{report.id.toUpperCase()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
