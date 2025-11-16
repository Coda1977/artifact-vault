'use client';

import { QRCodeDisplay } from './QRCodeDisplay';
import { CopyButton } from './CopyButton';
import { useState } from 'react';

interface ArtifactCardProps {
  id: string;
  name: string;
  category?: { id: string; name: string } | null;
  slug: string;
  code: string;
  onDelete?: () => void;
}

export function ArtifactCard({ id, name, category, slug, code, onDelete }: ArtifactCardProps) {
  const [showCode, setShowCode] = useState(false);
  const shareUrl = `${window.location.origin}/a/${slug}`;

  return (
    <div className="bg-white p-8 rounded-2xl hover:-translate-y-2 hover:shadow-xl transition-all duration-300 mb-8">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-2xl font-bold mb-2 text-[#1A1A1A]">{name}</h3>
          {category && (
            <span className="inline-block bg-[#FFD60A] text-[#1A1A1A] px-4 py-1 rounded-full text-sm font-semibold">
              {category.name}
            </span>
          )}
        </div>
        {onDelete && (
          <button
            onClick={onDelete}
            className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <QRCodeDisplay url={shareUrl} size={96} />
        <div className="flex-1 min-w-[200px]">
          <p className="text-sm text-[#4A4A4A] mb-2">Share URL:</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
            />
            <CopyButton text={shareUrl} />
          </div>
        </div>
      </div>

      <button
        onClick={() => setShowCode(!showCode)}
        className="bg-[#003566] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#002a52] transition-colors mb-4"
      >
        {showCode ? 'Hide Code' : 'Show Code'}
      </button>

      {showCode && (
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
          <pre className="text-sm font-mono whitespace-pre-wrap">{code}</pre>
        </div>
      )}
    </div>
  );
}