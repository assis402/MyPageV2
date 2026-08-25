import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { HeaderChrome } from "@/components/layout/HeaderChrome";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { Link } from "@/lib/i18n/navigation";

export async function Header() {
  const t = await getTranslations();

  return (
    <HeaderChrome
      brand={
        <>
          <Link href="/" className="my-photo-wrapper">
            <Image
              className="my-photo"
              src="/images/perfil.webp"
              alt={t("ProfilePhotoAlt")}
              width={80}
              height={80}
              sizes="80px"
            />
          </Link>
          <p>
            <Link href="/" className="site-name">
              matheusassis
            </Link>
          </p>
        </>
      }
      nav={
        <nav className="menu-items" aria-label={t("MainNav")}>
          <Link href="/" className="menu-item">
            {t("AboutMenu")}
          </Link>
          <Link href="/projects" className="menu-item">
            {t("ProjectsMenu")}
          </Link>
          <LocaleSwitcher variant="desktop" />
        </nav>
      }
      mobileNav={
        <nav className="menu-items-mobile" aria-label={t("MainNav")}>
          <Link href="/" className="menu-item">
            {t("AboutMenu")}
          </Link>
          <Link href="/projects" className="menu-item">
            {t("ProjectsMenu")}
          </Link>
        </nav>
      }
      mobileFlags={<LocaleSwitcher variant="mobile" />}
      menuLabel={t("MobileMenu")}
    />
  );
}
