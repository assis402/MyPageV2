import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { isValidLocale, type Locale } from "@/lib/i18n/locale";
import { routing } from "@/lib/i18n/routing";
import { replacePathLocale } from "@/lib/i18n/switch-locale";

const LOCALE_COOKIE = "NEXT_LOCALE";
const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

function safeReturnPath(returnTo: string, locale: Locale) {
  if (!returnTo.startsWith("/") || returnTo.startsWith("//")) {
    return `/${locale}`;
  }

  return replacePathLocale(returnTo, locale);
}

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const locale = String(form.get("locale") ?? "");
  const returnTo = String(form.get("returnTo") ?? `/${routing.defaultLocale}`);

  if (!locale || !isValidLocale(locale)) {
    return NextResponse.redirect(new URL(`/${routing.defaultLocale}`, request.url), 303);
  }

  const cookieStore = await cookies();
  cookieStore.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: LOCALE_COOKIE_MAX_AGE,
  });

  const targetPath = safeReturnPath(returnTo, locale);
  return NextResponse.redirect(new URL(targetPath, request.url), 303);
}
