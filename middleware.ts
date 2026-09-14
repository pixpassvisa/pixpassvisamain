import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const acceptHeader = req.headers.get('accept') || '';
  
  // If the request accepts text/markdown and is not already an API route
  if (acceptHeader.includes('text/markdown')) {
    const url = req.nextUrl.clone();
    // Save the original path
    const originalPath = url.pathname + url.search;
    
    // Rewrite to our dedicated markdown conversion API route
    url.pathname = '/api/markdown';
    url.searchParams.set('path', originalPath);
    
    return NextResponse.rewrite(url);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
