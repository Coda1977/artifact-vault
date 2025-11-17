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
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">{name}</h3>
          {category && (
            <span className="inline-block bg-[#FFD60A] text-[#1A1A1A] px-3 py-1 rounded-full text-sm font-semibold">
              {category.name}
            </span>
          )}
        </div>
        {onDelete && (
          <button
            onClick={onDelete}
            className="text-red-600 hover:text-red-700 font-semibold text-sm"
          >
            Delete
          </button>
        )}
      </div>

      {/* QR and URL Section */}
      <div className="grid md:grid-cols-[140px_1fr] gap-6 mb-6 pb-6 border-b border-gray-200">
        <div className="flex justify-center">
          <QRCodeDisplay url={shareUrl} size={120} />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
            Share URL
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm font-mono"
              onClick={(e) => e.currentTarget.select()}
            />
            <CopyButton text={shareUrl} />
          </div>
        </div>
      </div>

      {/* Code Preview */}
      <button
        onClick={() => setShowCode(!showCode)}
        className="text-[#003566] hover:text-[#004477] font-semibold text-sm"
      >
        {showCode ? '▼ Hide Code' : '▶ Show Code'}
      </button>

      {showCode && (
        <div className="mt-4 bg-gray-900 rounded-lg p-4 overflow-x-auto max-h-64 overflow-y-auto">
          <pre className="text-xs font-mono text-gray-100 whitespace-pre-wrap">{code}</pre>
        </div>
      )}
    </div>
  );
}