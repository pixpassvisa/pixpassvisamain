import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || '';

  // 1. Enforce canonical domain (redirect non-www to www with 301)
  if (host === 'pixpassvisa.com') {
    const url = req.nextUrl.clone();
    return NextResponse.redirect(`https://www.pixpassvisa.com${url.pathname}${url.search}`, 301);
  }

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
