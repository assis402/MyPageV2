import type { Locale } from "@/lib/i18n/locale";

export function formatPublicationDate(createdAt: string, locale: Locale = "en-US") {
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return "";

  const formatted = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  }).format(date);

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}
