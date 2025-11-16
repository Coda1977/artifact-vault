'use client';

import { ConvexProviderWithAuth } from 'convex/react-auth';
import { ConvexReactClient } from 'convex/react';
import { useAuth } from '@convex-dev/auth/react';
import { ReactNode } from 'react';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexProvider({ children }: { children: ReactNode }) {
  return (
    <ConvexProviderWithAuth client={convex}>
      {children}
    </ConvexProviderWithAuth>
  );
}