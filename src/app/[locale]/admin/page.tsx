import { getTranslations, setRequestLocale } from "next-intl/server";
import { connection } from "next/server";
import { notFound } from "next/navigation";

import { loginWithGoogle, logoutAdmin } from "./actions";
import { getAdminSession } from "@/lib/auth/session";
import { isValidLocale } from "@/lib/i18n/locale";

export const dynamic = "force-dynamic";

export default async function AdminPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  setRequestLocale(locale);
  await connection();

  const query = await searchParams;
  const session = await getAdminSession();
  const t = await getTranslations();
  const rejected = query.error === "owner" || query.error === "AccessDenied";

  return (
    <main>
      <div className="admin-external-container">
        <div className="admin-container">
          <div className="admin-gradient-bar" />
          <div className="admin-first-div">
            <span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/admin.svg" alt="" />
              <h1>{t("AdminTitle")}</h1>
            </span>
            <h5>{t("AdminEnglishOnly")}</h5>
            <p>{t("AdminOwnerOnly")}</p>
            {rejected ? <p className="admin-error">{t("AdminOwnerRejected")}</p> : null}
          </div>
          <div className="admin-divisor" />
          {session ? (
            <div className="admin-options">
              <form action={logoutAdmin}>
                <input type="hidden" name="locale" value={locale} />
                <button type="submit" className="option-button">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/logout.svg" alt="" />
                  {t("AdminLogout")}
                </button>
              </form>
            </div>
          ) : (
            <form action={loginWithGoogle}>
              <input type="hidden" name="locale" value={locale} />
              <button type="submit" className="google-button">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/google.svg" alt="" />
                {t("AdminLoginGoogle")}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
