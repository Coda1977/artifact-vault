'use client';

import { QRCodeDisplay } from './QRCodeDisplay';
import { CopyButton } from './CopyButton';
import { useState } from 'react';

interface ArtifactCardProps {
  id: string;
  name: string;
  category?: { _id: string; name: string } | null;
  slug: string;
  code: string;
  onDelete?: () => void;
}

export function ArtifactCard({ id, name, category, slug, code, onDelete }: ArtifactCardProps) {
  const [showCode, setShowCode] = useState(false);
  const shareUrl = `${window.location.origin}/a/${slug}`;

  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-[#003566] to-[#0066CC] p-6 md:p-8">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight">
              {name}
            </h3>
            {category && (
              <span className="inline-block bg-[#FFD60A] text-[#1A1A1A] px-4 py-2 rounded-full text-sm font-bold">
                📁 {category.name}
              </span>
            )}
          </div>
          {onDelete && (
            <button
              onClick={onDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full text-sm font-bold transition-colors shadow-lg"
              title="Delete artifact"
            >
              🗑️ Delete
            </button>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 md:p-8">
        {/* QR Code and Share Section */}
        <div className="grid md:grid-cols-[auto_1fr] gap-6 mb-6 items-start">
          <div className="flex flex-col items-center gap-3">
            <QRCodeDisplay url={shareUrl} size={120} />
            <span className="text-xs font-semibold text-[#4A4A4A]">Scan to Share</span>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-[#1A1A1A] mb-3">
              🔗 Share URL
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-2xl bg-gray-50 text-sm font-mono focus:ring-2 focus:ring-[#FFD60A] focus:border-[#FFD60A] transition-all"
                onClick={(e) => e.currentTarget.select()}
              />
              <CopyButton text={shareUrl} />
            </div>
            <p className="text-xs text-[#4A4A4A] mt-2">
              Click URL to select • Share this link to view the artifact
            </p>
          </div>
        </div>

        {/* Code Preview Toggle */}
        <button
          onClick={() => setShowCode(!showCode)}
          className="w-full bg-[#F5F0E8] hover:bg-[#003566] text-[#1A1A1A] hover:text-white px-6 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2"
        >
          {showCode ? '👁️ Hide Code' : '👁️ Show Code Preview'}
        </button>

        {/* Code Display */}
        {showCode && (
          <div className="mt-6 bg-[#1A1A1A] rounded-2xl overflow-hidden">
            <div className="bg-[#2A2A2A] px-4 py-2 flex items-center justify-between border-b border-gray-700">
              <span className="text-xs font-bold text-gray-400">CODE PREVIEW</span>
              <span className="text-xs text-gray-500">{code.length} characters</span>
            </div>
            <div className="p-6 overflow-x-auto max-h-96 overflow-y-auto">
              <pre className="text-sm font-mono text-gray-100 whitespace-pre-wrap leading-relaxed">{code}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}