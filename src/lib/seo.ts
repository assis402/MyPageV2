import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { defaultLocale, isValidLocale, locales, type Locale } from "@/lib/i18n/locale";

export const SITE_NAME = "Matheus de Assis Developer";
const OG_IMAGE = "/android-chrome-512x512.png";

type SeoPage = "home" | "projects" | "admin";

const PAGE_PATH: Record<SeoPage, string> = {
  home: "",
  projects: "/projects",
  admin: "/admin",
};

export function getSiteUrl(): URL {
  const fallback = "http://localhost:3000";
  try {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL ?? fallback);
  } catch {
    return new URL(fallback);
  }
}

function pageUrl(locale: Locale, path: string): string {
  return `${getSiteUrl().origin}/${locale}${path}`;
}

function languageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {
    "x-default": pageUrl(defaultLocale, path),
  };
  for (const locale of locales) {
    languages[locale] = pageUrl(locale, path);
  }
  return languages;
}

export async function localePageMetadata(locale: string, page: SeoPage): Promise<Metadata> {
  if (!isValidLocale(locale)) {
    return {};
  }

  const t = await getTranslations({ locale });
  const path = PAGE_PATH[page];
  const title = t("MetaTitle");
  const description =
    page === "projects"
      ? t("MetaDescriptionProjects")
      : page === "admin"
        ? t("MetaDescriptionAdmin")
        : t("MetaDescription");
  const url = pageUrl(locale, path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: locale === "pt-BR" ? "pt_BR" : "en_US",
      alternateLocale: locale === "pt-BR" ? ["en_US"] : ["pt_BR"],
      type: "website",
      images: [{ url: OG_IMAGE, width: 512, height: 512, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [OG_IMAGE],
    },
    robots: page === "admin" ? { index: false, follow: false } : undefined,
  };
}
