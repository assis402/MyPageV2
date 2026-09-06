import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { connection } from "next/server";
import { notFound } from "next/navigation";

import { clearArticlesCache, clearProjectsCache, loginWithGoogle, logoutAdmin } from "./actions";
import { Card, GradientButton, OutlinedButton, Section, SectionTitle } from "@/components/ui";
import { getAdminSession } from "@/lib/auth/session";
import { isValidLocale } from "@/lib/i18n/locale";
import { localePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return localePageMetadata(locale, "admin");
}

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

  const [query, session, t] = await Promise.all([searchParams, getAdminSession(), getTranslations()]);
  const rejected = query.error === "owner" || query.error === "AccessDenied";
  const feedback =
    session && query.message && query.message in CACHE_FEEDBACK
      ? CACHE_FEEDBACK[query.message as keyof typeof CACHE_FEEDBACK]
      : null;

  return (
    <main id="main-content" className="admin-page">
      <Section className="admin-section">
        <SectionTitle as="h1">{t("AdminTitle")}</SectionTitle>
        <Card className="admin-panel">
          <div className="admin-copy">
            <p className="admin-kicker">{t("AdminEnglishOnly")}</p>
            <p>{t("AdminOwnerOnly")}</p>
            {rejected ? <p className="admin-error">{t("AdminOwnerRejected")}</p> : null}
            {feedback ? (
              <p className={feedback.tone === "ok" ? "admin-success" : "admin-error"}>{t(feedback.key)}</p>
            ) : null}
          </div>
          {session ? (
            <div className="admin-actions">
              <form action={clearProjectsCache}>
                <input type="hidden" name="locale" value={locale} />
                <OutlinedButton
                  type="submit"
                  icon={
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src="/images/clear-cache.svg" alt="" />
                  }
                >
                  {t("AdminClearProjects")}
                </OutlinedButton>
              </form>
              <form action={clearArticlesCache}>
                <input type="hidden" name="locale" value={locale} />
                <OutlinedButton
                  type="submit"
                  icon={
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src="/images/clear-cache.svg" alt="" />
                  }
                >
                  {t("AdminClearArticles")}
                </OutlinedButton>
              </form>
              <form action={logoutAdmin}>
                <input type="hidden" name="locale" value={locale} />
                <OutlinedButton
                  type="submit"
                  icon={
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src="/images/logout.svg" alt="" />
                  }
                >
                  {t("AdminLogout")}
                </OutlinedButton>
              </form>
            </div>
          ) : (
            <form className="admin-login" action={loginWithGoogle}>
              <input type="hidden" name="locale" value={locale} />
              <GradientButton
                type="submit"
                icon={
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src="/images/google.svg" alt="" />
                }
              >
                {t("AdminLoginGoogle")}
              </GradientButton>
            </form>
          )}
        </Card>
      </Section>
    </main>
  );
}
