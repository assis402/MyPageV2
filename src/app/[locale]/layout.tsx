import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { RouteBackground } from "@/components/layout/RouteBackground";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { cn } from "@/lib/cn";
import { poppins } from "@/lib/fonts/poppins";
import { isValidLocale, locales } from "@/lib/i18n/locale";
import { localePageMetadata } from "@/lib/seo";
import { isDirectionCPreview } from "@/lib/ux-preview-server";
import "@/styles/globals.css";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return localePageMetadata(locale, "home");
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const [messages, t, previewC] = await Promise.all([
    getMessages(),
    getTranslations(),
    isDirectionCPreview(),
  ]);

  return (
    <html lang={locale} suppressHydrationWarning className={poppins.variable}>
      <body className={cn(poppins.className, previewC && "ux-preview-c")}>
        <NextIntlClientProvider messages={messages}>
          <a href="#main-content" className="skip-link">
            {t("SkipToContent")}
          </a>
          <Header />
          <div className="body-footer-container">
            <RouteBackground nebula={previewC} />
            {children}
            <ScrollToTop />
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
