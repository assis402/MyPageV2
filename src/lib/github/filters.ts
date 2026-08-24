import type { Locale } from "@/lib/i18n/locale";
import type { Project } from "@/types/github";

export function capitalizeTitle(value: string) {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function filterProjectsBySearch(projects: Project[], searchFilter: string) {
  const text = searchFilter.toLowerCase().trim();
  if (!text) return projects;

  return projects.filter(
    (project) =>
      project.title.toLowerCase().includes(text) || project.description.toLowerCase().includes(text),
  );
}

export function selectedTagsFromFilter(tagFilter: string) {
  return tagFilter.split(";").filter(Boolean);
}

export function filterProjectsByTag(projects: Project[], tagFilter: string) {
  const selected = selectedTagsFromFilter(tagFilter);
  if (selected.length === 0) return projects;

  return projects.filter((project) => project.tags.some((tag) => selected.includes(tag)));
}

export function descriptionForLocale(dictionary: Record<string, string> | undefined, locale: Locale) {
  if (!dictionary) return "";

  const keys = locale === "pt-BR" ? ["PT_BR", "pt-BR", "pt_BR"] : ["EN_US", "en-US", "en_US"];

  for (const key of keys) {
    const match = Object.entries(dictionary).find(([name]) => name.toLowerCase() === key.toLowerCase());
    if (match && typeof match[1] === "string") return match[1];
  }

  return Object.values(dictionary)[0] ?? "";
}
