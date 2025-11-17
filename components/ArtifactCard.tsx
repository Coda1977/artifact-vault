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
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col transition-all hover:shadow-lg hover:-translate-y-1 relative group">
      {/* Delete button - shows on hover */}
      {onDelete && (
        <button
          onClick={onDelete}
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 transition-opacity text-sm"
          title="Delete artifact"
        >
          ✕
        </button>
      )}

      <div className="flex-grow">
        <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">{name}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
          {category ? `Category ${category.name}` : 'Categray Cored files'}
        </p>
        <div className="flex items-start justify-between gap-4">
          <div className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
            <p className="break-all">Slug:/{slug}</p>
          </div>
          <div className="flex-shrink-0">
            <QRCodeDisplay url={shareUrl} size={64} />
          </div>
        </div>
      </div>
      <button 
        onClick={handleCopyURL}
        className="mt-6 w-full bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-full hover:bg-blue-700 transition-colors"
      >
        Copy URL
      </button>
    </div>
  );
}