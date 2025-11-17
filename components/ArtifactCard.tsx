'use client';

import { QRCodeDisplay } from './QRCodeDisplay';

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

  const handleCopyURL = () => {
    navigator.clipboard.writeText(shareUrl);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative">
      {/* Delete button - top right, shows on hover */}
      {onDelete && (
        <button
          onClick={onDelete}
          className="absolute top-3 right-3 opacity-0 hover:opacity-100 group-hover:opacity-100 text-gray-400 hover:text-red-600 transition-opacity text-xs"
          title="Delete artifact"
        >
          ✕
        </button>
      )}

      {/* Artifact Title */}
      <h3 className="text-base font-bold text-gray-900 mb-1">
        {name}
      </h3>

      {/* Category */}
      <p className="text-sm text-gray-500 mb-3">
        {category ? `Category ${category.name}` : 'Uncategorized'}
      </p>

      {/* Slug */}
      <p className="text-xs text-gray-400 mb-4 font-mono">
        Slug: /{slug}
      </p>

      {/* QR Code - centered */}
      <div className="flex justify-center mb-4">
        <QRCodeDisplay url={shareUrl} size={90} />
      </div>

      {/* Copy URL Button */}
      <button
        onClick={handleCopyURL}
        className="w-full px-4 py-2.5 bg-[#1E88E5] text-white rounded-lg font-medium hover:bg-[#1976D2] transition-colors text-sm"
      >
        Copy URL
      </button>
    </div>
  );
}