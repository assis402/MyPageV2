import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { poppins } from "@/lib/fonts/poppins";
import { isValidLocale, locales } from "@/lib/i18n/locale";
import "@/styles/globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
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

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className={poppins.variable}>
      <body className={poppins.className}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <div className="body-footer-container">
            {children}
            <ScrollToTop />
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
