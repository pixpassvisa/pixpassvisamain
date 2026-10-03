import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SITE_URL, isPrivatePath } from "./lib/seo";
export function middleware(req: NextRequest) {
  if (req.nextUrl.hostname === "pixpassvisa.com") {
    return NextResponse.redirect(`${SITE_URL}${req.nextUrl.pathname}${req.nextUrl.search}`, 308);
  }
  const response = NextResponse.next();
  if (isPrivatePath(req.nextUrl.pathname)) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    response.headers.set("Cache-Control", "private, no-store");
  }
  return response;
}
export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff2)$).*)"] };
