import { revalidateTag, unstable_cache } from "next/cache";
import "server-only";

import { fetchPortfolioRepositories, mapProject } from "@/lib/github/client";
import {
  filterProjectsBySearch,
  filterProjectsByTag,
  selectedTagsFromFilter,
} from "@/lib/github/filters";
import type { Locale } from "@/lib/i18n/locale";
import type { ProjectTag, ProjectsPageData } from "@/types/github";

export const PROJECTS_CACHE_TAG = "projects";

function cacheRevalidateSeconds() {
  const parsed = Number(process.env.CACHE_REVALIDATE_SECONDS);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 604800;
}

const getCachedPortfolioRepositories = unstable_cache(
  fetchPortfolioRepositories,
  ["github-portfolio-repos"],
  {
    revalidate: cacheRevalidateSeconds(),
    tags: [PROJECTS_CACHE_TAG],
  },
);

export async function getProjects(locale: Locale) {
  const repositories = await getCachedPortfolioRepositories();
  return repositories.map((item) => mapProject(item, locale));
}

export async function getProjectTags(locale: Locale): Promise<ProjectTag[]> {
  const projects = await getProjects(locale);
  const tags: ProjectTag[] = [];
  const seen = new Set<string>();

  for (const project of projects) {
    for (const name of project.tags) {
      if (seen.has(name)) continue;
      seen.add(name);
      tags.push({ name, selected: false });
    }
  }

  return tags;
}

export async function getProjectsPageData(
  locale: Locale,
  searchFilter = "",
  tagFilter = "",
): Promise<ProjectsPageData> {
  const projects = await getProjects(locale);
  const selected = selectedTagsFromFilter(tagFilter);
  const selectedSet = new Set(selected);
  const tags = (await getProjectTags(locale)).map((tag) => ({
    ...tag,
    selected: selectedSet.has(tag.name),
  }));

  let filtered = projects;
  if (searchFilter.trim()) filtered = filterProjectsBySearch(filtered, searchFilter);
  if (selected.length > 0) filtered = filterProjectsByTag(filtered, tagFilter);

  return { projects: filtered, tags };
}

export function revalidateProjectsCache() {
  revalidateTag(PROJECTS_CACHE_TAG);
}

export { filterProjectsBySearch, filterProjectsByTag } from "@/lib/github/filters";
export { fetchRepositories } from "@/lib/github/client";
