import React from 'react';
import { cn } from '@/lib/utils';

interface RedFlagHighlightProps {
  content: string;
  showFlags: boolean;
  keywords?: string[];
  className?: string;
}

export const RedFlagHighlight: React.FC<RedFlagHighlightProps> = ({ 
  content, 
  showFlags, 
  keywords = [],
  className
}) => {
  if (!showFlags || keywords.length === 0) {
    return <span className={className}>{content}</span>;
  }

  // Filter out empty keywords and escape for regex
  const validKeywords = keywords.filter(k => k.trim());
  if (validKeywords.length === 0) return <span className={className}>{content}</span>;

  // Sort by length descending so longer phrases match first
  validKeywords.sort((a, b) => b.length - a.length);

  const escapedKeywords = validKeywords.map(kw => kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`(${escapedKeywords.join('|')})`, 'gi');
  
  const parts = content.split(regex);

  return (
    <span className={className}>
      {parts.map((part, i) => {
        const isKeyword = validKeywords.some(kw => kw.toLowerCase() === part.toLowerCase());
        return isKeyword ? (
          <span
            key={i}
            className={cn(
              "transition-colors duration-500",
              showFlags 
                ? "bg-red-500/20 text-red-600 dark:text-red-400 font-bold underline decoration-red-500/50 underline-offset-2"
                : "text-inherit"
            )}
          >
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        );
      })}
    </span>
  );
};
