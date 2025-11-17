'use client';

import { QRCodeDisplay } from './QRCodeDisplay';
import { CopyButton } from './CopyButton';

interface ArtifactCardProps {
  id: string;
  name: string;
  category?: { _id: string; name: string } | null;
  slug: string;
  code: string;
  onDelete?: () => void;
}

export function ArtifactCard({ id, name, category, slug, code, onDelete }: ArtifactCardProps) {
  const shareUrl = `${window.location.origin}/a/${slug}`;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative group">
      {/* Delete button - shows on hover */}
      {onDelete && (
        <button
          onClick={onDelete}
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 transition-all text-sm"
        >
          ✕
        </button>
      )}

      {/* Card Title */}
      <h3 className="text-lg font-bold text-gray-900 mb-1">
        {name}
      </h3>

      {/* Category label */}
      <p className="text-sm text-gray-500 mb-4">
        Categray Cored files
      </p>

      {/* Slug */}
      <p className="text-xs text-gray-400 mb-4 font-mono">
        Slug: /{slug}
      </p>

      {/* QR Code */}
      <div className="flex justify-center mb-4">
        <QRCodeDisplay url={shareUrl} size={80} />
      </div>

      {/* Copy URL Button */}
      <button
        onClick={() => {
          navigator.clipboard.writeText(shareUrl);
        }}
        className="w-full px-4 py-2 bg-[#1E88E5] text-white rounded-lg font-medium hover:bg-[#1976D2] transition-colors text-sm"
      >
        Copy URL
      </button>
    </div>
  );
}