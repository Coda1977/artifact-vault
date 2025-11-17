'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to admin page
    router.push('/admin');
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F0E8] to-[#E8DFD0] flex items-center justify-center p-8">
      <div className="bg-white/90 backdrop-blur-md p-16 rounded-3xl shadow-2xl max-w-xl w-full text-center border-2 border-white/50 relative overflow-hidden">
        {/* Decorative gradient border */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#FFD60A] via-[#FFC700] to-[#FFD60A]"></div>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-[#FFD60A] to-[#FFC700] rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
            <span className="text-5xl">🏛️</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-6xl font-black text-[#1A1A1A] mb-3 tracking-tight">
          Artifact Vault
        </h1>
        <p className="text-lg text-[#4A4A4A] font-medium mb-8">
          Your Claude Code Collection
        </p>

        {/* Loading indicator */}
        <div className="flex items-center justify-center space-x-3 text-[#4A4A4A]">
          <div className="w-2 h-2 bg-[#FFD60A] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-[#FFD60A] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-[#FFD60A] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
        <p className="text-sm text-[#4A4A4A] mt-4 font-medium">
          Loading your dashboard...
        </p>
      </div>
    </div>
  );
}