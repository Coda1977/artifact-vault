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

  // Inject mobile viewport fix for artifacts that use 100vh
  const mobileViewportFix = `
<script>
// Fix for mobile browsers - set actual viewport height
(function() {
  function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
  }
  setVH();
  window.addEventListener('resize', setVH);
  window.addEventListener('orientationchange', setVH);
})();
</script>
<style>
/* Fallback for browsers that support dvh */
.container {
  height: 100dvh !important;
}
/* For browsers that don't support dvh, use CSS variable */
@supports not (height: 100dvh) {
  .container {
    height: calc(var(--vh, 1vh) * 100) !important;
  }
}
</style>`;

  // Inject the fix before </head> or before </body> if no </head>
  let modifiedCode = artifact.code;
  if (modifiedCode.includes('</head>')) {
    modifiedCode = modifiedCode.replace('</head>', mobileViewportFix + '</head>');
  } else if (modifiedCode.includes('</body>')) {
    modifiedCode = modifiedCode.replace('</body>', mobileViewportFix + '</body>');
  } else {
    modifiedCode = modifiedCode + mobileViewportFix;
  }

  // Return the modified HTML
  return new NextResponse(modifiedCode, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}