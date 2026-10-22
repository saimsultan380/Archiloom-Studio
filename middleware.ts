import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PRIMARY_HOST = "archiloomstudio.com";

/**
 * Force HTTPS-ready host canonicalization: www (and legacy hosts) → non-www primary.
 * Trailing-slash normalization is handled by Next (`trailingSlash: true`).
 */
export function middleware(request: NextRequest) {
  const host = (request.headers.get("host") || "").toLowerCase().split(":")[0];
  if (!host || host === "localhost" || host.endsWith(".vercel.app")) {
    return NextResponse.next();
  }

  const needsHostRedirect =
    host === `www.${PRIMARY_HOST}` ||
    host === "www.archiloom.studio" ||
    host === "archiloom.studio";

  if (!needsHostRedirect) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.protocol = "https:";
  url.host = PRIMARY_HOST;
  url.port = "";
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: [
    /*
     * Skip Next internals and static assets; still cover HTML routes.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|txt|xml)$).*)",
  ],
};
