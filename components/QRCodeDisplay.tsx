'use client';

import { QRCodeSVG } from 'qrcode.react';
import { useRef } from 'react';

interface QRCodeDisplayProps {
  url: string;
  size?: number;
}

export function QRCodeDisplay({ url, size = 128 }: QRCodeDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCopyQRCode = () => {
    if (!containerRef.current) return;
    const svg = containerRef.current.querySelector('svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    // Set canvas size to match SVG (or larger for better quality)
    canvas.width = size;
    canvas.height = size;

    img.onload = () => {
      if (ctx) {
        // Fill white background (transparent otherwise)
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          if (blob) {
            navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
              .then(() => alert('QR Code copied to clipboard!'))
              .catch((err) => console.error('Failed to copy QR code:', err));
          }
        });
      }
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div ref={containerRef} className="bg-white p-4 rounded-lg inline-block">
        <QRCodeSVG
          value={url}
          size={size}
          level="H"
          includeMargin={false}
        />
      </div>
      <button
        onClick={handleCopyQRCode}
        className="text-xs font-bold text-[#003566] hover:text-[#002447] hover:underline flex items-center gap-1"
      >
        <span>📋</span> Copy QR Image
      </button>
    </div>
  );
}