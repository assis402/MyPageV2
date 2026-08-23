import { getTranslations } from "next-intl/server";

export default async function ProjectsPage() {
  const t = await getTranslations();

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl items-center justify-center px-6 py-16">
      <h1 className="text-legacy-muted text-sm uppercase tracking-wide">{t("ProjectsMenu")}</h1>
    </main>
  );
}
