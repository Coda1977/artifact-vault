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
  const [isHovered, setIsHovered] = useState(false);
  const shareUrl = `${window.location.origin}/a/${slug}`;

  return (
    <div 
      className="group border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Notion-style card header - clickable row */}
      <div className="px-4 py-3 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium text-gray-900 truncate">{name}</h3>
            {category && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                {category.name}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowCode(!showCode);
            }}
            className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 hover:bg-gray-100 rounded"
          >
            {showCode ? 'Hide' : 'Code'}
          </button>
          
          {onDelete && isHovered && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="text-xs text-red-600 hover:text-red-700 px-2 py-1 hover:bg-red-50 rounded"
            >
              Delete
            </button>
          )}
        </div>
      </div>

      {/* Expandable content */}
      {showCode && (
        <div className="px-4 pb-4 border-t border-gray-100">
          <div className="pt-4 grid md:grid-cols-[auto_1fr] gap-6">
            {/* QR Code */}
            <div className="flex flex-col items-center">
              <QRCodeDisplay url={shareUrl} size={100} />
              <span className="text-xs text-gray-400 mt-2">Scan to share</span>
            </div>
            
            {/* URL */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2">
                Share URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded bg-gray-50 font-mono"
                  onClick={(e) => e.currentTarget.select()}
                />
                <CopyButton text={shareUrl} />
              </div>
              
              {/* Code preview */}
              <div className="mt-4">
                <div className="text-xs font-medium text-gray-500 mb-2">Code Preview</div>
                <div className="bg-gray-900 rounded p-3 overflow-x-auto max-h-48 overflow-y-auto">
                  <pre className="text-xs font-mono text-gray-100 whitespace-pre-wrap">{code.substring(0, 500)}...</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}