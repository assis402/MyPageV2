import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

import { routing } from "@/lib/i18n/routing";
import { UX_PREVIEW_COOKIE, UX_PREVIEW_DIRECTION_C } from "@/lib/ux-preview";

const intlMiddleware = createMiddleware(routing);

const PREVIEW_COOKIE = {
  path: "/",
  maxAge: 60 * 60 * 24 * 30,
  sameSite: "lax" as const,
};

export default function middleware(request: NextRequest) {
  const preview = request.nextUrl.searchParams.get("ux_preview");
  if (preview === UX_PREVIEW_DIRECTION_C || preview === "off") {
    const url = request.nextUrl.clone();
    url.searchParams.delete("ux_preview");
    const response = NextResponse.redirect(url);
    response.cookies.set(UX_PREVIEW_COOKIE, preview, PREVIEW_COOKIE);
    return response;
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(en-US|pt-BR)/:path*"],
};
