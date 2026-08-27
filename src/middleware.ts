import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

import { routing } from "@/lib/i18n/routing";
import {
  UX_PREVIEW_COOKIE,
  UX_PREVIEW_HEADER,
  UX_PREVIEW_OFF,
  UX_PREVIEW_DIRECTION_C,
  normalizeUxPreview,
} from "@/lib/ux-preview";

const intlMiddleware = createMiddleware(routing);

const PREVIEW_COOKIE = {
  path: "/",
  maxAge: 60 * 60 * 24 * 30,
  sameSite: "lax" as const,
};

export default function middleware(request: NextRequest) {
  const queryPreview = normalizeUxPreview(request.nextUrl.searchParams.get("ux_preview"));
  const cookiePreview = normalizeUxPreview(request.cookies.get(UX_PREVIEW_COOKIE)?.value);
  const resolved = queryPreview ?? cookiePreview;

  request.headers.set(UX_PREVIEW_HEADER, resolved ?? "");

  const response = intlMiddleware(request);

  if (queryPreview === UX_PREVIEW_DIRECTION_C || queryPreview === UX_PREVIEW_OFF) {
    response.cookies.set(UX_PREVIEW_COOKIE, queryPreview, PREVIEW_COOKIE);
  }

  return response;
}

export const config = {
  matcher: ["/", "/(en-US|pt-BR)/:path*"],
};
