'use client';

import { QRCodeDisplay } from './QRCodeDisplay';

interface ArtifactCardProps {
  id: string;
  name: string;
  category?: { _id: string; name: string } | null;
  slug: string;
  code: string;
  onDelete?: () => void;
  onEdit?: () => void;
}

export function ArtifactCard({ id, name, category, slug, code, onDelete, onEdit }: ArtifactCardProps) {
  const shareUrl = `${window.location.origin}/a/${slug}`;

  const handleCopyURL = () => {
    navigator.clipboard.writeText(shareUrl);
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-7 shadow-xl border-2 border-white/50 flex flex-col transition-all hover:shadow-2xl hover:scale-105 hover:border-[#FFD60A]/50 relative group overflow-hidden">
      {/* Decorative gradient background */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFD60A] via-[#FFC700] to-[#FFD60A]"></div>

      {/* Action buttons - show on hover */}
      <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all z-10">
        {onEdit && (
          <button
            onClick={onEdit}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all shadow-lg hover:scale-110"
            title="Edit artifact"
          >
            ✏️
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all shadow-lg hover:scale-110"
            title="Delete artifact"
          >
            ✕
          </button>
        )}
      </div>

      <div className="flex-grow space-y-5">
        {/* Header */}
        <div className="pr-8">
          <h3 className="text-xl sm:text-2xl font-black text-[#1A1A1A] mb-2 leading-tight">
            {name}
          </h3>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#003566] text-white">
              {category ? category.name : 'Uncategorized'}
            </span>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 border-2 border-gray-100">
          <div className="flex flex-col items-center space-y-3">
            <div className="text-xs font-bold text-[#4A4A4A] uppercase tracking-wide">
              📱 Scan to View
            </div>
            <div className="bg-white p-3 rounded-xl shadow-md">
              <QRCodeDisplay url={shareUrl} size={120} />
            </div>
            <div className="text-xs text-[#4A4A4A] font-mono bg-gray-100 px-3 py-1.5 rounded-lg break-all max-w-full">
              /a/{slug}
            </div>
          </div>
        </div>
      </div>

      {/* Copy URL Button */}
      <button
        onClick={handleCopyURL}
        className="mt-6 w-full bg-gradient-to-r from-[#003566] to-[#002447] text-white font-bold py-3.5 px-6 rounded-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center space-x-2"
      >
        <span>📋</span>
        <span>Copy Share URL</span>
      </button>
    </div>
  );
}