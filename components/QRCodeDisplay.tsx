'use client';

import { QRCodeSVG } from 'qrcode.react';

interface QRCodeDisplayProps {
  url: string;
  size?: number;
}

export function QRCodeDisplay({ url, size = 128 }: QRCodeDisplayProps) {
  return (
    <div className="bg-white p-4 rounded-lg inline-block">
      <QRCodeSVG
        value={url}
        size={size}
        level="H"
        includeMargin={false}
      />
    </div>
  );
}