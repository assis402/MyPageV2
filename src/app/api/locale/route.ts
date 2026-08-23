import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { isValidLocale } from "@/lib/i18n/locale";
import { routing } from "@/lib/i18n/routing";
import { replacePathLocale } from "@/lib/i18n/switch-locale";

const LOCALE_COOKIE = "NEXT_LOCALE";
const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export async function GET(request: NextRequest) {
  const locale = request.nextUrl.searchParams.get("locale");
  const returnTo = request.nextUrl.searchParams.get("returnTo") ?? `/${routing.defaultLocale}`;

  if (!locale || !isValidLocale(locale)) {
    return NextResponse.redirect(new URL(`/${routing.defaultLocale}`, request.url));
  }

  const cookieStore = await cookies();
  cookieStore.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: LOCALE_COOKIE_MAX_AGE,
  });

  const targetPath = replacePathLocale(returnTo, locale);
  return NextResponse.redirect(new URL(targetPath, request.url));
}
