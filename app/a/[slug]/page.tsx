'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { use } from 'react';

interface ArtifactPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ArtifactPage({ params }: ArtifactPageProps) {
  const { slug } = use(params);
  const artifact = useQuery(api.artifacts.getArtifactBySlug, {
    slug,
  });

  if (artifact === undefined) {
    return (
      <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center">
        <div className="text-2xl font-bold text-[#1A1A1A]">Loading...</div>
      </div>
    );
  }

  if (artifact === null) {
    return (
      <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center">
        <div className="bg-white p-12 rounded-2xl shadow-xl max-w-md w-full text-center">
          <h1 className="text-3xl font-black text-[#1A1A1A] mb-4">Artifact Not Found</h1>
          <p className="text-[#4A4A4A]">The artifact you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <div className="max-w-4xl mx-auto p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-black text-[#1A1A1A] mb-2 tracking-tight">
            {artifact.name}
          </h1>
          {artifact.category && (
            <span className="inline-block bg-[#FFD60A] text-[#1A1A1A] px-4 py-1 rounded-full text-sm font-semibold">
              {artifact.category.name}
            </span>
          )}
        </header>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div
            dangerouslySetInnerHTML={{ __html: artifact.code }}
            className="p-8"
          />
        </div>
      </div>
    </div>
  );
}