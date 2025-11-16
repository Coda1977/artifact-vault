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
    <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center p-8">
      <div className="bg-white p-12 rounded-2xl shadow-xl max-w-md w-full text-center">
        <h1 className="text-4xl font-black text-[#1A1A1A] mb-4 tracking-tight">
          Artifact Vault
        </h1>
        <p className="text-[#4A4A4A] mb-8">
          Redirecting to admin dashboard...
        </p>
      </div>
    </div>
  );
}