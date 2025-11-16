'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "bg-gray-900 text-[#F5F0E8] px-6 py-2 rounded-full font-semibold text-sm hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300",
        copied && "bg-green-600",
        className
      )}
    >
      {copied ? 'Copied!' : 'Copy URL'}
    </button>
  );
}