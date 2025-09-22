import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  console.log(req)
  const token = req.cookies.get("authToken"); // JWT/session token
  const { pathname } = req.nextUrl;

  const publicPaths = ["/", "/login", "/register","/forgot-password"];

  // ✅ Skip Next.js internals & public assets
  if (
    pathname.startsWith("/_next") || // Next.js internals
    pathname.startsWith("/static") || // Static files
    pathname.startsWith("/favicon.ico") || // Favicon
    pathname.startsWith("/logo.png") || // Example public image
    pathname.match(/\.(.*)$/) // ✅ any file with extension (.png, .jpg, .css, .js, etc.)
  ) {
    return NextResponse.next();
  }

  if (!token && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard:path*"],
};
