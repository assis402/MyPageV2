import type { MetadataRoute } from "next";

import { locales } from "@/lib/i18n/locale";
import { getSiteUrl } from "@/lib/seo";

const PUBLIC_PATHS = ["", "/projects"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteUrl().origin;

  return PUBLIC_PATHS.flatMap((path) =>
    locales.map((locale) => ({
      url: `${origin}/${locale}${path}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(locales.map((item) => [item, `${origin}/${item}${path}`])),
      },
    })),
  );
}
