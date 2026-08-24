import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectsSearch } from "@/components/projects/ProjectsSearch";
import { VideoModalProvider } from "@/components/projects/VideoModal";
import { getProjectsPageData } from "@/lib/github";
import { isValidLocale, type Locale } from "@/lib/i18n/locale";
import type { ProjectsPageData } from "@/types/github";

async function loadProjects(locale: Locale, search: string, tag: string): Promise<ProjectsPageData> {
  try {
    return await getProjectsPageData(locale, search, tag);
  } catch {
    return { projects: [], tags: [] };
  }
}

export default async function ProjectsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ search?: string; tag?: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  setRequestLocale(locale);

  const query = await searchParams;
  const search = (query.search ?? "").trim();
  const tag = query.tag ?? "";
  const t = await getTranslations();
  const { projects, tags } = await loadProjects(locale, search, tag);

  return (
    <main>
      <VideoModalProvider>
        <div className="projects-external-container">
          <ProjectsSearch
            locale={locale}
            tags={tags}
            search={search}
            tag={tag}
            placeholder={t("SearchDefaultText")}
            searchLabel={t("SearchDefaultText")}
            clearLabel={t("ClearFilters")}
          />
          {projects.length === 0 ? (
            <p className="projects-empty">{t("ProjectsEmpty")}</p>
          ) : (
            <div className="projects-container">
              {projects.map((project) => (
                <ProjectCard key={project.fullName} project={project} videoLabel={t("VideoText")} />
              ))}
            </div>
          )}
        </div>
      </VideoModalProvider>
    </main>
  );
}
