'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, CheckCircle, AlertTriangle, QrCode, Users, X, Info } from 'lucide-react';

const LEARN_DATA = [
  {
    id: 's1',
    icon: Shield,
    title: "5 Signs of an eSewa Scam",
    preview: "Know the red flags before you send money.",
    color: "from-blue-500 to-cyan-500",
    content: (
      <div className="space-y-4">
        <p>Scammers rely on you acting fast without thinking. If you see any of these 5 signs, you might be dealing with a scammer:</p>
        <ul className="space-y-2 list-disc pl-5">
          <li><strong>Urgency:</strong> They create a false sense of panic (e.g., "Your account will be blocked in 2 hours").</li>
          <li><strong>Too Good to Be True:</strong> Huge cashbacks, free lotteries, or massive referral bonuses for nothing.</li>
          <li><strong>Request for OTP/MPIN:</strong> E-sewa or banks will NEVER ask for your OTP or MPIN.</li>
          <li><strong>Suspicious Links:</strong> URLs that look like "esewa-bonus.xyz" instead of the official "esewa.com.np".</li>
          <li><strong>Payment First:</strong> Being asked to pay a "processing fee" to claim a prize or get a job.</li>
        </ul>
        <p><strong>Remember:</strong> Always stop, think, and verify using official channels before taking action.</p>
      </div>
    )
  },
  {
    id: 's2',
    icon: Lock,
    title: "Why You Should NEVER Share Your MPIN",
    preview: "Your MPIN is your digital signature.",
    color: "from-red-500 to-orange-500",
    content: (
      <div className="space-y-4">
        <p>Your MPIN (Mobile Personal Identification Number) is the final key that authorizes transactions from your eSewa account.</p>
        <p>Scammers will use various stories to get it—they might pretend to be customer support, a bank official, or even a friend in need over WhatsApp.</p>
        <ul className="space-y-2 list-disc pl-5">
          <li><strong>Staff Never Ask:</strong> Official eSewa representatives will never ask for your MPIN, password, or OTP.</li>
          <li><strong>It's Equivalent to a PIN:</strong> Think of it as your ATM PIN. You wouldn't give your ATM PIN to a stranger, right?</li>
        </ul>
        <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 p-4 rounded-xl mt-4">
          <AlertTriangle className="inline mr-2" size={18}/>
          If you've accidentally shared your MPIN, change it immediately in the app and contact support.
        </div>
      </div>
    )
  },
  {
    id: 's3',
    icon: CheckCircle,
    title: "How to Verify Official Messages",
    preview: "Not every SMS from 'eSewa' is actually from eSewa.",
    color: "from-green-500 to-emerald-500",
    content: (
      <div className="space-y-4">
        <p>It's easy for scammers to spoof the sender name on an SMS so it appears as "eSewa" on your phone. Here is how you verify:</p>
        <ul className="space-y-2 list-disc pl-5">
          <li><strong>Check the App First:</strong> Any legitimate promotion, cashback, or account warning will be visible inside the official eSewa app's notification center.</li>
          <li><strong>Look at the URL:</strong> If the message contains a link, inspect it closely. Official links will end in `.com.np` (like esewa.com.np).</li>
          <li><strong>No Personal Numbers:</strong> Official support will never text or call you from standard 10-digit mobile numbers (e.g., 98XXXXXXXX) asking for account actions.</li>
        </ul>
      </div>
    )
  },
  {
    id: 's4',
    icon: AlertTriangle,
    title: "What to Do If You've Been Scammed",
    preview: "Act quickly to minimize the damage.",
    color: "from-purple-500 to-pink-500",
    content: (
      <div className="space-y-4">
        <p>If you realize you have fallen victim to a scam, taking immediate action is crucial:</p>
        <ul className="space-y-2 list-disc pl-5">
          <li><strong>Reset Credentials:</strong> Immediately change your MPIN and eSewa password.</li>
          <li><strong>Contact Support:</strong> Call eSewa via their official toll-free number immediately to report the transaction. They can sometimes block the receiver's account.</li>
          <li><strong>Report to Police:</strong> File an online complaint at the Cyber Bureau of Nepal Police with screenshots of the conversation, transaction IDs, and phone numbers.</li>
          <li><strong>Inform Contacts:</strong> If your account or WhatsApp was hacked, warn your family and friends so they don't send money to the scammer.</li>
        </ul>
      </div>
    )
  },
  {
    id: 's5',
    icon: QrCode,
    title: "Safe QR Code Scanning Practices",
    preview: "A harmless-looking QR code can lead to stolen funds.",
    color: "from-gray-700 to-gray-900",
    content: (
      <div className="space-y-4">
        <p>We scan QR codes for payments, menus, and Wi-Fi every day. Scammers exploit this by pasting fake QR codes over legitimate ones.</p>
        <ul className="space-y-2 list-disc pl-5">
          <li><strong>Verify the Merchant:</strong> When paying, always verify the merchant's name that pops up in your app matches the store you are in.</li>
          <li><strong>Physical Tampering:</strong> Look closely at the physical QR stand. Is there a sticker placed over the original code?</li>
          <li><strong>Unsecured Wi-Fi QRs:</strong> Beware of public "Free Wi-Fi" QR codes. Scanning them might redirect you to a fake login page asking for your eSewa or Facebook credentials.</li>
        </ul>
      </div>
    )
  },
  {
    id: 's6',
    icon: Users,
    title: "Protecting Elderly Family from Scams",
    preview: "Help your parents and grandparents stay safe.",
    color: "from-yellow-400 to-orange-500",
    content: (
      <div className="space-y-4">
        <p>Elderly users often trust authoritative voices easily and might not spot technical red flags. It is our duty to protect them.</p>
        <ul className="space-y-2 list-disc pl-5">
          <li><strong>Establish a "Verify Rule":</strong> Teach them to always call you or another trusted family member before transferring money to anyone they don't know personally.</li>
          <li><strong>Turn Off Unnecessary Features:</strong> If they only use the app for simple tasks, guide them to keep it simple and avoid clicking promotional banners they don't understand.</li>
          <li><strong>The "Mama in Trouble" Scam:</strong> Warn them specifically about the WhatsApp impersonation scam where someone texts claiming to be a relative in an emergency needing urgent money.</li>
        </ul>
      </div>
    )
  }
];

export default function LearnHubPage() {
  const [selectedCard, setSelectedCard] = useState<typeof LEARN_DATA[0] | null>(null);

  // Lock body scroll when modal is open
  if (typeof document !== 'undefined') {
    if (selectedCard) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }

  return (
    <div className="min-h-screen bg-surface dark:bg-black font-sans px-4 py-12 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
           <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-500 mb-2 shadow-sm">
             <Info size={40} />
           </div>
           <h1 className="text-4xl md:text-5xl font-black font-heading text-gray-900 dark:text-white tracking-tight">Learn Hub</h1>
           <p className="text-gray-600 dark:text-gray-400 text-lg">Master the tactics of scammers and arm yourself with knowledge.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEARN_DATA.map((card) => (
            <motion.div 
              key={card.id}
              whileHover={{ y: -5, scale: 1.02 }}
              onClick={() => setSelectedCard(card)}
              className="rounded-[32px] overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all h-[280px] flex flex-col group"
            >
              <div className={`h-32 bg-gradient-to-br ${card.color} p-6 flex items-start justify-between relative overflow-hidden`}>
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/4"></div>
                 <card.icon size={48} className="text-white drop-shadow-md relative z-10" />
                 <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md relative z-10 group-hover:bg-white/30 transition-colors">
                    <span className="text-white font-bold">→</span>
                 </div>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 flex-1 flex flex-col border-x border-b border-gray-100 dark:border-gray-800 rounded-b-[32px]">
                 <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white font-heading leading-tight line-clamp-2">{card.title}</h3>
                 <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 flex-1 font-medium">{card.preview}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedCard && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" style={{ margin: 0 }}>
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setSelectedCard(null)}
               className="absolute inset-0 bg-gray-900/40 dark:bg-black/80 backdrop-blur-sm"
             />
             <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 20 }}
               className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-[32px] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
             >
               <div className={`h-24 sm:h-32 bg-gradient-to-r ${selectedCard.color} p-6 flex items-center shrink-0`}>
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mr-4">
                     <selectedCard.icon size={32} className="text-white" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-tight flex-1">{selectedCard.title}</h2>
                  <button 
                    onClick={() => setSelectedCard(null)}
                    className="w-10 h-10 rounded-full bg-black/10 hover:bg-black/20 text-white flex items-center justify-center transition-colors self-start"
                  >
                    <X size={20} />
                  </button>
               </div>
               
               <div className="p-6 sm:p-8 overflow-y-auto text-gray-700 dark:text-gray-300 text-[15px] sm:text-base leading-relaxed">
                 {selectedCard.content}
               </div>

               <div className="p-4 sm:p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 shrink-0 flex justify-end">
                  <button 
                    onClick={() => setSelectedCard(null)}
                    className="px-6 py-3 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white font-bold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                  >
                    Close Lesson
                  </button>
               </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
