import { api } from '@/convex/_generated/api';
import { fetchQuery } from 'convex/nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  
  const artifact = await fetchQuery(api.artifacts.getArtifactBySlug, {
    slug,
  });

  if (!artifact) {
    return new NextResponse('Artifact not found', { status: 404 });
  }

  // Return the raw HTML
  return new NextResponse(artifact.code, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}