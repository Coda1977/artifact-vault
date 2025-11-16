'use client';

import { useState, useEffect } from 'react';
import { AdminDashboard } from '@/components/AdminDashboard';

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  // Check if already authenticated
  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('adminAuthenticated') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuthenticated', 'true');
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  if (isAuthenticated) {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center p-8">
      <div className="bg-white p-12 rounded-2xl shadow-xl max-w-md w-full">
        <h1 className="text-3xl font-black text-[#1A1A1A] mb-6 tracking-tight text-center">
          Admin Login
        </h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
              placeholder="Enter admin password"
              required
            />
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#1A1A1A] text-[#F5F0E8] px-8 py-3 rounded-full font-semibold hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
          >
            Login
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-[#4A4A4A] text-center">
            Protected admin area
          </p>
        </div>
      </div>
    </div>
  );
}