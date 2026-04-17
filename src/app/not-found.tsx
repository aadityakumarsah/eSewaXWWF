import Link from 'next/link';
import { AlertOctagon } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface dark:bg-black font-sans flex flex-col items-center justify-center px-4 text-center">
      <AlertOctagon size={80} className="text-danger mb-6 hover:scale-110 transition-transform" />
      <h1 className="text-4xl md:text-5xl font-black font-heading text-gray-900 dark:text-white mb-4">404: Page Not Found</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 max-w-lg mb-8">
        Lost? Don't worry, this isn't a phishing link. The page you're looking for just doesn't exist.
      </p>
      <Link href="/" className="bg-primary text-white font-bold py-4 px-8 rounded-full hover:bg-[#52a63b] transition-colors focus:ring-4 focus:ring-primary/50 outline-none active:scale-95">
        Return to Safety Home
      </Link>
    </div>
  );
}
