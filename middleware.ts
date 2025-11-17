import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only process artifact routes
  if (request.nextUrl.pathname.startsWith('/a/')) {
    // Let the route handler process it normally
    return NextResponse.next();
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/a/:path*',
};