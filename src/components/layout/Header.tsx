import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { HeaderChrome } from "@/components/layout/HeaderChrome";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { NavLink } from "@/components/layout/NavLink";
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
          <NavLink href="/">{t("AboutMenu")}</NavLink>
          <NavLink href="/projects">{t("ProjectsMenu")}</NavLink>
          <LocaleSwitcher variant="desktop" />
        </nav>
      }
      mobileNav={
        <nav className="menu-items-mobile" aria-label={t("MainNav")}>
          <NavLink href="/">{t("AboutMenu")}</NavLink>
          <NavLink href="/projects">{t("ProjectsMenu")}</NavLink>
        </nav>
      }
      mobileFlags={<LocaleSwitcher variant="mobile" />}
      menuLabel={t("MobileMenu")}
    />
  );
}
