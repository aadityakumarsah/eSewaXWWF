'use client';

import React from 'react';
import { 
  Signal, Wifi, Battery, ChevronLeft, MoreVertical, 
  Search, Phone, Video, QrCode, ThumbsUp, MessageCircle, Share2, CornerUpRight,
  User, Image as ImageIcon
} from 'lucide-react';
import { Scenario } from '@/lib/scenarios';
import { RedFlagHighlight } from './RedFlagHighlight';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface PhoneMockupProps {
  scenario: Scenario;
  showFlags: boolean;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({ scenario, showFlags }) => {
  // Extract keywords by finding strings in double quotes inside redFlags
  const keywords = React.useMemo(() => {
    let extracted: string[] = [];
    scenario.redFlags.forEach(flag => {
      const matches = flag.match(/"([^"]+)"/g);
      if (matches) {
        matches.forEach(m => extracted.push(m.replace(/"/g, '')));
      }
    });

    // Explicit hardcoded extractions based on scenario ID
    if (scenario.id === 'sc-002') extracted.push('OTP', 'suspicious activity');
    if (scenario.id === 'sc-004') extracted.push('Rs. 10,000');
    if (scenario.id === 'sc-005') extracted.push('Rs. 200');
    if (scenario.id === 'sc-007') extracted.push('Rs. 500', '20 seats left');
    if (scenario.id === 'sc-011') extracted.push('Rs. 150', 'Ram Bahadur');
    if (scenario.id === 'sc-012') extracted.push('10% DAILY returns', 't.me/esewaInvestNP', 'Rs. 5,000');
    if (scenario.id === 'sc-013') extracted.push('urgent Rs. 15,000', 'mama', 'accident');
    if (scenario.id === 'sc-014') extracted.push('Rs. 3,500', 'ntc-lottery@gmail.com');

    return extracted.filter(Boolean);
  }, [scenario]);

  return (
    <div className="mx-auto w-full max-w-[340px] md:max-w-[380px] drop-shadow-2xl">
      {/* Phone Frame */}
      <div className="relative rounded-[45px] border-[12px] border-gray-900 bg-white dark:bg-gray-950 overflow-hidden aspect-[9/19.5] flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
        
        {/* Hardware details - Notch / Dynamic Island */}
        <div className="absolute top-2 inset-x-0 h-7 flex justify-center z-50 pointer-events-none">
          <div className="w-[120px] h-[30px] bg-black rounded-full flex items-center justify-end px-3 space-x-2">
            <div className="w-2 h-2 rounded-full bg-blue-900/40"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 shadow-[0_0_8px_rgba(74,222,128,0.5)]"></div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="flex justify-between items-center px-8 pt-4 pb-2 text-[13px] font-semibold z-40 relative text-gray-900 dark:text-white mix-blend-difference">
          <span>9:41</span>
          <div className="flex items-center space-x-2">
            <Signal size={14} className="fill-current" />
            <Wifi size={14} />
            <Battery size={16} className="fill-current" />
          </div>
        </div>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto relative z-10 w-full h-full flex flex-col -mt-10">
          <div className="pt-10 h-full flex flex-col">
          {scenario.type === 'sms' && <SMSLayout scenario={scenario} showFlags={showFlags} keywords={keywords} />}
          {scenario.type === 'call' && <CallLayout scenario={scenario} showFlags={showFlags} keywords={keywords} />}
          {scenario.type === 'email' && <EmailLayout scenario={scenario} showFlags={showFlags} keywords={keywords} />}
          {scenario.type === 'qr' && <QRLayout scenario={scenario} showFlags={showFlags} keywords={keywords} />}
          {scenario.type === 'social_media' && <SocialMediaLayout scenario={scenario} showFlags={showFlags} keywords={keywords} />}
          {scenario.type === 'fake_app' && <FakeAppLayout scenario={scenario} showFlags={showFlags} keywords={keywords} />}
          </div>
        </div>
        
        {/* Home Indicator */}
        <div className="absolute bottom-2 inset-x-0 h-4 flex justify-center z-50 pointer-events-none">
          <div className="w-32 h-[5px] bg-gray-300 dark:bg-gray-600 rounded-full mix-blend-difference"></div>
        </div>
      </div>
    </div>
  );
};

// --- LAYOUT SUB-COMPONENTS --- //

const SMSLayout = ({ scenario, showFlags, keywords }: any) => (
  <div className="flex w-full flex-col h-full bg-gray-50 dark:bg-[#000000]">
    <div className="flex items-center justify-between p-3 bg-gray-100/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-20">
      <div className="flex items-center text-blue-500 w-1/4">
        <ChevronLeft size={28} className="-ml-2" />
        <span className="text-base">Back</span>
      </div>
      <div className="flex flex-col items-center flex-1">
        <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-white mb-0.5 mt-1 overflow-hidden">
          <User size={20} />
        </div>
        <span className="text-[11px] font-semibold text-gray-900 dark:text-gray-100 flex items-center">
          {scenario.sender || scenario.senderNumber} <ChevronLeft size={10} className="ml-0.5 -rotate-90 opacity-50" />
        </span>
      </div>
      <div className="flex items-center justify-end text-blue-500 w-1/4 pr-2">
        <Video size={24} />
      </div>
    </div>
    <div className="flex-1 p-4 overflow-y-auto flex flex-col justify-end space-y-4 pb-20">
      <div className="text-center text-[11px] font-semibold text-gray-500 my-4 tracking-wide">Today 10:23 AM</div>
      <div className="relative self-start w-[85%] animate-in fade-in slide-in-from-bottom-2 duration-300">
        <div className="bg-[#E9E9EB] dark:bg-[#1D1D1F] text-black dark:text-white px-3.5 py-2.5 rounded-[20px] rounded-bl-sm text-[15.5px] leading-snug break-words">
          <RedFlagHighlight content={scenario.content} showFlags={showFlags} keywords={keywords} className="whitespace-pre-wrap" />
        </div>
      </div>
    </div>
  </div>
);

const CallLayout = ({ scenario, showFlags, keywords }: any) => (
  <div className="flex w-full flex-col h-full bg-gradient-to-b from-[#2A313C] to-[#12151B] text-white pt-16">
    <div className="flex flex-col items-center flex-1">
      <span className="text-gray-400 text-[17px] font-normal mb-8">incoming call</span>
      <h2 className="text-[34px] font-light mb-16 tracking-wide text-center px-4 leading-tight">
         <RedFlagHighlight content={scenario.sender || scenario.senderNumber} showFlags={showFlags} keywords={keywords} />
      </h2>
      
      {/* Mock Voice Transcription Panel */}
      <div className="mt-4 mb-auto w-10/12 bg-black/30 backdrop-blur-md rounded-2xl p-5 border border-white/10 relative">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#12151B] px-3 border border-white/10 rounded-full text-[10px] uppercase tracking-wider text-gray-400 flex items-center space-x-1">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
          <span>Live Transcript</span>
        </div>
        <p className="text-[15px] text-gray-200 leading-relaxed font-light text-center">
           "<RedFlagHighlight content={scenario.content} showFlags={showFlags} keywords={keywords} />"
        </p>
      </div>

      <div className="w-full px-10 pb-20 pt-8 flex justify-between items-center mt-auto">
        <div className="flex flex-col items-center group cursor-pointer">
          <div className="w-[72px] h-[72px] rounded-full bg-[#EB5545] flex items-center justify-center mb-2">
            <Phone size={32} className="text-white fill-current transform scale-y-[-1] rotate-180" />
          </div>
          <span className="text-[13px] text-gray-200 group-hover:text-white transition-colors">Decline</span>
        </div>
        <div className="flex flex-col items-center group cursor-pointer">
          <div className="w-[72px] h-[72px] rounded-full bg-[#34C759] flex items-center justify-center mb-2 animate-pulse shadow-[0_0_20px_rgba(52,199,89,0.3)]">
            <Phone size={32} className="text-white fill-current" />
          </div>
          <span className="text-[13px] text-gray-200 group-hover:text-white transition-colors">Accept</span>
        </div>
      </div>
    </div>
  </div>
);

const EmailLayout = ({ scenario, showFlags, keywords }: any) => (
  <div className="flex w-full flex-col h-full bg-white dark:bg-gray-950 font-sans">
    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between sticky top-0 bg-white dark:bg-gray-950 z-10">
       <div className="flex flex-col">
         <span className="text-xl font-bold text-gray-900 dark:text-gray-100">Inbox</span>
         <span className="text-xs text-gray-500">1 unread message</span>
       </div>
       <Search size={22} className="text-gray-500" />
    </div>
    
    {/* Email Header */}
    <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 bg-blue-50/50 dark:bg-blue-900/10">
      <div className="flex justify-between items-baseline mb-2">
        <div className="flex items-center space-x-3 truncate pr-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            {scenario.sender?.[0]?.toUpperCase() || 'E'}
          </div>
          <div className="flex flex-col truncate">
            <span className="font-semibold text-[15px] truncate text-gray-900 dark:text-gray-100">
              <RedFlagHighlight content={scenario.sender || ""} showFlags={showFlags} keywords={keywords} />
            </span>
            <span className="text-xs text-gray-500 truncate">to me, via server</span>
          </div>
        </div>
        <span className="text-xs text-gray-400 font-medium">11:20 AM</span>
      </div>
      <h3 className="font-bold text-[17px] mt-3 leading-snug line-clamp-2 text-gray-900 dark:text-gray-100">
         {scenario.title}
      </h3>
    </div>
    
    {/* Email Body */}
    <div className="flex-1 p-5 overflow-y-auto text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-950 text-[15px] leading-relaxed">
       <p className="whitespace-pre-wrap break-words">
          <RedFlagHighlight content={scenario.content} showFlags={showFlags} keywords={keywords} />
       </p>
       
       {/* Fake Reply Area */}
       <div className="mt-8 border border-gray-200 dark:border-gray-800 rounded-xl p-3 flex space-x-3 items-center text-gray-500 cursor-not-allowed">
         <span className="font-semibold text-sm px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg flex-1 text-center">Reply</span>
         <span className="font-semibold text-sm px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg flex-1 text-center">Forward</span>
       </div>
    </div>
  </div>
);

const QRLayout = ({ scenario, showFlags, keywords }: any) => {
  const urlMatch = scenario.content.match(/https?:\/\/[^\s]+/);
  return (
    <div className="flex w-full flex-col h-full bg-gray-100 dark:bg-gray-900 p-6 items-center flex-1 justify-center relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 inset-x-0 h-64 bg-[#60BB46]/20 blur-[80px] rounded-full mix-blend-multiply dark:mix-blend-lighten"></div>
      
      <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl flex flex-col items-center space-y-6 w-full max-w-sm z-10 border border-gray-100 dark:border-gray-700">
        <div className="relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-[#60BB46] to-blue-500 rounded-2xl opacity-20 blur-lg animate-pulse"></div>
          <div className="bg-white p-4 rounded-xl shadow-inner relative border border-gray-200">
            <QrCode size={140} className="text-gray-900 drop-shadow-sm" />
            {/* Scanning line animation */}
            <div className="absolute top-0 inset-x-0 h-1 bg-[#60BB46]/80 rounded-full w-full shadow-[0_0_10px_#60BB46] animate-[scan_2s_ease-in-out_infinite_alternate]"></div>
          </div>
        </div>
        
        <div className="text-center w-full">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-semibold text-gray-600 dark:text-gray-300 mb-3">
            <Search size={12} />
            <span>Scanned Content</span>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-blue-600 dark:text-blue-400 font-semibold break-all text-sm">
              <RedFlagHighlight content={urlMatch ? urlMatch[0] : 'http://esewa-login.com.np.co/auth'} showFlags={showFlags} keywords={keywords} />
            </p>
          </div>
        </div>
        
        <button className="w-full py-3.5 rounded-xl bg-[#60BB46] text-white font-bold text-sm shadow-lg shadow-[#60BB46]/30 hover:opacity-90 transition-opacity">
          Open Link in Browser
        </button>
      </div>
      
      <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/50 p-4 rounded-2xl w-full text-sm text-yellow-800 dark:text-yellow-200/90 shadow-sm z-10 mx-2">
        <p className="font-bold mb-1.5 flex items-center"><CornerUpRight size={14} className="mr-1" /> Real-world Context:</p>
        <p className="leading-relaxed"><RedFlagHighlight content={scenario.content} showFlags={showFlags} keywords={keywords} /></p>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(160px); }
        }
      `}} />
    </div>
  );
};

const SocialMediaLayout = ({ scenario, showFlags, keywords }: any) => {
  const urlMatch = scenario.content.match(/https?:\/\/[^\s]+/);
  return (
    <div className="flex w-full flex-col h-full bg-[#E8EBED] dark:bg-gray-950">
      {/* FB Header */}
      <div className="bg-white dark:bg-[#242526] text-[#1877F2] p-3 pl-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <span className="font-bold text-[28px] tracking-tighter">facebook</span>
        <div className="flex space-x-2 text-gray-800 dark:text-gray-200">
           <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center"><Search size={20} /></div>
           <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center"><MenuIcon /></div>
        </div>
      </div>
      
      {/* Post Card */}
      <div className="bg-white dark:bg-[#242526] mt-2 py-3 flex flex-col shadow-sm pb-1 border-b border-gray-200 dark:border-gray-800">
        
        {/* Post Header */}
        <div className="flex items-center space-x-2.5 px-4 mb-3">
          <div className="w-[42px] h-[42px] rounded-full bg-gray-200 flex-shrink-0 border border-gray-100 dark:border-gray-700 overflow-hidden relative">
             <Image src={`https://api.dicebear.com/7.x/shapes/svg?seed=${scenario.sender}`} alt="Avatar" fill className="object-cover" unoptimized priority />
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex items-center space-x-1 flex-wrap">
              <span className="font-bold text-[15px] leading-tight text-gray-900 dark:text-gray-100">
                <RedFlagHighlight content={scenario.sender || 'Unknown Page'} showFlags={showFlags} keywords={keywords} />
              </span>
              {/* Verified badge */}
              <svg className="w-3.5 h-3.5 text-[#1877F2] fill-current mt-0.5" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.4-1.4 3.6 3.6 7.6-7.6L19 8l-9 9z"/></svg>
            </div>
            <span className="text-[13px] text-gray-500 font-medium flex items-center">
              2 hrs • <span className="mx-1 text-[10px]">🌍</span>
            </span>
          </div>
          <MoreVertical size={20} className="text-gray-500 self-start" />
        </div>
        
        {/* Post Content */}
        <div className="px-4 text-[15px] mb-3 text-gray-900 dark:text-gray-100 leading-[1.4] whitespace-pre-wrap">
          <RedFlagHighlight content={scenario.content} showFlags={showFlags} keywords={keywords} />
        </div>
        
        {/* Link Attachment Preview */}
        {urlMatch && (
          <div className="border-y border-gray-200 dark:border-gray-700 mb-1 bg-[#F0F2F5] dark:bg-[#18191A]">
             <div className="h-[170px] bg-gray-300 dark:bg-gray-800 flex items-center justify-center relative border-b border-gray-200 dark:border-gray-700">
                <ImageIcon size={48} className="text-gray-400 opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-green-500/20 mix-blend-overlay"></div>
             </div>
             <div className="px-4 py-3">
                <p className="text-[12px] text-gray-500 uppercase tracking-wider font-semibold mb-0.5 text-ellipsis overflow-hidden whitespace-nowrap">
                  {urlMatch[0].replace(/https?:\/\//, '').split('/')[0]}
                </p>
                <h4 className="font-semibold text-[15px] text-gray-900 dark:text-gray-100 leading-snug line-clamp-2">
                  <RedFlagHighlight content={scenario.title} showFlags={showFlags} keywords={keywords} />
                </h4>
             </div>
          </div>
        )}
        
        {/* Engagement Stats */}
        <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 text-[13px] py-2.5 px-4">
          <div className="flex items-center space-x-1.5">
             <div className="bg-[#1877F2] rounded-full p-[3px] ring-2 ring-white dark:ring-[#242526] z-10"><ThumbsUp size={10} className="text-white fill-current" /></div>
             <div className="bg-[#F02849] rounded-full p-[3px] ring-2 ring-white dark:ring-[#242526] -ml-2"><HeartIcon /></div>
             <span className="ml-1">4.2K</span>
          </div>
          <div className="flex space-x-3 hover:underline cursor-pointer">
            <span>684 comments</span>
            <span>1.1K shares</span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex px-2 py-1 mx-2 border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-semibold text-[14px]">
          <div className="flex-1 flex justify-center items-center space-x-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-[#3A3B3C] cursor-pointer transition-colors"><ThumbsUp size={20} /><span>Like</span></div>
          <div className="flex-1 flex justify-center items-center space-x-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-[#3A3B3C] cursor-pointer transition-colors"><MessageCircle size={20} /><span>Comment</span></div>
          <div className="flex-1 flex justify-center items-center space-x-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-[#3A3B3C] cursor-pointer transition-colors"><Share2 size={20} /><span>Share</span></div>
        </div>
      </div>
    </div>
  );
};

const FakeAppLayout = ({ scenario, showFlags, keywords }: any) => (
  <div className="flex w-full flex-col h-full bg-[#E5F5E9] dark:bg-[#122A1A] p-6 justify-center items-center relative overflow-hidden">
     {/* App-like background geometric shapes */}
     <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-[#60BB46] rounded-full mix-blend-multiply opacity-20 blur-3xl"></div>
     <div className="absolute bottom-[-10%] left-[-10%] w-48 h-48 bg-[#60BB46] rounded-full mix-blend-multiply opacity-20 blur-3xl"></div>
     
     <div className="z-10 bg-white w-full max-w-[300px] rounded-[28px] shadow-[0_20px_40px_rgba(96,187,70,0.15)] flex flex-col items-center overflow-hidden border border-green-100">
        <div className="bg-[#60BB46] w-full py-6 flex flex-col items-center shadow-inner relative overflow-hidden">
           {/* Fake shimmer */}
           <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-white/20 skew-x-[30deg] animate-[shimmer_3s_infinite]"></div>
           <h2 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-sm">eSewa</h2>
        </div>
        
        <div className="w-full p-6 space-y-6">
           <div className="relative">
             <input type="text" className="peer w-full border-b-2 border-gray-200 px-1 py-2 pt-5 text-gray-900 focus:border-[#60BB46] outline-none transition-colors text-[15px] bg-transparent" placeholder=" " value="98XXXXXXXX" disabled readOnly />
             <label className="absolute left-1 top-2 text-[11px] font-bold tracking-wide text-gray-500 uppercase transition-all peer-placeholder-shown:text-[15px] peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-[#60BB46]">eSewa ID</label>
           </div>
           <div className="relative">
             <input type="password" className="peer w-full border-b-2 border-gray-200 px-1 py-2 pt-5 text-gray-900 focus:border-[#60BB46] outline-none transition-colors text-[24px] tracking-widest bg-transparent" placeholder=" " value="1234" disabled readOnly />
             <label className="absolute left-1 top-2 text-[11px] font-bold tracking-wide text-gray-500 uppercase transition-all peer-placeholder-shown:text-[15px] peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-[#60BB46]">MPIN</label>
           </div>
           
           <div className="flex justify-between items-center text-xs px-1">
              <label className="flex items-center space-x-2 text-gray-600 font-medium cursor-not-allowed">
                <input type="checkbox" className="accent-[#60BB46] w-4 h-4 rounded" disabled />
                <span>Remember me</span>
              </label>
              <span className="text-[#60BB46] font-bold cursor-not-allowed">Forgot MPIN?</span>
           </div>
           
           <button className="w-full bg-[#60BB46] text-white font-bold py-3.5 rounded-[14px] shadow-lg shadow-[#60BB46]/40 hover:bg-[#52a63b] transition-colors mt-2">
              Login
           </button>
        </div>
     </div>

     <div className="z-20 mt-8 w-full max-w-[300px] bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-2xl p-4 text-gray-800 dark:text-gray-200 shadow-xl border border-white/40 dark:border-white/10 animate-fade-in-up">
        <p className="font-bold flex items-center space-x-2 text-[#eab308] mb-2 text-sm">
          <QrCode size={16} /> <span className="uppercase tracking-wider text-[11px]">Context Note</span>
        </p>
        <p className="text-[13px] leading-relaxed"><RedFlagHighlight content={scenario.content} showFlags={showFlags} keywords={keywords} /></p>
     </div>
     <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { left: 200%; }
        }
      `}} />
  </div>
);

// Helpers
const MenuIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;
const HeartIcon = () => <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>;
