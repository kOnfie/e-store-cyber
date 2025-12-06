import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware stub for future use (e.g., auth, redirects)
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
