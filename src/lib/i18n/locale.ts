export const locales = ["en-US", "pt-BR"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en-US";

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
