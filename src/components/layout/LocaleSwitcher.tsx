"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

import { usePathname } from "@/lib/i18n/navigation";
import { withLocalePrefix } from "@/lib/i18n/switch-locale";
import type { Locale } from "@/lib/i18n/locale";

type LocaleSwitcherProps = {
  variant: "desktop" | "mobile";
};

const flags: { locale: Locale; src: string; labelKey: "ChangeLanguageEn" | "ChangeLanguagePt" }[] = [
  { locale: "en-US", src: "/images/en-us.svg", labelKey: "ChangeLanguageEn" },
  { locale: "pt-BR", src: "/images/pt-br.svg", labelKey: "ChangeLanguagePt" },
];

export function LocaleSwitcher({ variant }: LocaleSwitcherProps) {
  const t = useTranslations();
  const currentLocale = useLocale() as Locale;
  const pathname = usePathname();
  const returnTo = withLocalePrefix(currentLocale, pathname);

  return (
    <div className={variant === "desktop" ? "menu-languages" : "menu-languages-mobile"}>
      {flags.map((flag) => (
        <form key={flag.locale} action="/api/locale" method="post" className="language-switch">
          <input type="hidden" name="locale" value={flag.locale} />
          <input type="hidden" name="returnTo" value={returnTo} />
          <button type="submit" className="language-link" aria-label={t(flag.labelKey)}>
            <Image
              className={`menu-language-flag${currentLocale === flag.locale ? " menu-language-flag-active" : ""}`}
              src={flag.src}
              alt=""
              width={28}
              height={28}
              unoptimized
            />
          </button>
        </form>
      ))}
    </div>
  );
}
