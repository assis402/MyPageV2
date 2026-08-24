import { getTranslations, setRequestLocale } from "next-intl/server";
import { connection } from "next/server";
import { notFound } from "next/navigation";

import { clearArticlesCache, clearProjectsCache, loginWithGoogle, logoutAdmin } from "./actions";
import { getAdminSession } from "@/lib/auth/session";
import { isValidLocale } from "@/lib/i18n/locale";

export const dynamic = "force-dynamic";

const CACHE_FEEDBACK = {
  "projects-ok": { key: "AdminProjectsCacheOk", tone: "ok" },
  "projects-error": { key: "AdminProjectsCacheError", tone: "error" },
  "articles-ok": { key: "AdminArticlesCacheOk", tone: "ok" },
  "articles-error": { key: "AdminArticlesCacheError", tone: "error" },
} as const;

export default async function AdminPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  setRequestLocale(locale);
  await connection();

  const query = await searchParams;
  const session = await getAdminSession();
  const t = await getTranslations();
  const rejected = query.error === "owner" || query.error === "AccessDenied";
  const feedback =
    session && query.message && query.message in CACHE_FEEDBACK
      ? CACHE_FEEDBACK[query.message as keyof typeof CACHE_FEEDBACK]
      : null;

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
            {feedback ? (
              <p className={feedback.tone === "ok" ? "admin-success" : "admin-error"}>{t(feedback.key)}</p>
            ) : null}
          </div>
          <div className="admin-divisor" />
          {session ? (
            <div className="admin-options">
              <form action={clearProjectsCache}>
                <input type="hidden" name="locale" value={locale} />
                <button type="submit" className="option-button">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/clear-cache.svg" alt="" />
                  {t("AdminClearProjects")}
                </button>
              </form>
              <form action={clearArticlesCache}>
                <input type="hidden" name="locale" value={locale} />
                <button type="submit" className="option-button">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/clear-cache.svg" alt="" />
                  {t("AdminClearArticles")}
                </button>
              </form>
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
