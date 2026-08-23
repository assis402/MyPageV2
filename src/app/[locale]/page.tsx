import { getTranslations } from "next-intl/server";

export default async function HomePage() {
  const t = await getTranslations();

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-6 px-6 py-16">
      <p className="text-legacy-muted text-sm uppercase tracking-wide">{t("MainStackTitle")}</p>
      <h1 className="text-3xl font-light">
        {t("AboutTitle_Greeting")} <span className="font-medium">{t("AboutTitle_Name")}</span>
      </h1>
      <p className="text-legacy-muted leading-relaxed">{t("PresentationText")}</p>
      <p className="text-sm">{t("MainStackBody")}</p>
    </main>
  );
}
