import "server-only";

import type { Locale } from "@/lib/i18n/locale";
import { capitalizeTitle, descriptionForLocale } from "@/lib/github/filters";
import type { Project } from "@/types/github";

export type GitHubRepoResponse = {
  html_url: string;
  name: string;
  full_name: string;
  topics?: string[];
  created_at: string;
};

export type GitHubRepoWithProps = {
  repo: GitHubRepoResponse;
  custom: Record<string, unknown>;
};

const DEFAULT_REPOS_URL = "https://api.github.com/users/assis402/repos?per_page=100";
const DEFAULT_TOPIC_NAME = "mypage";
const DEFAULT_RAW_BASE_URL = "https://raw.githubusercontent.com/";
const DEFAULT_CUSTOM_PROPERTIES_PATH = "/master/mypage-props.json";

function githubHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "MyPageUI",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  const token = process.env.GITHUB_TOKEN?.trim();
  if (token) {
    headers.Authorization =
      token.startsWith("Basic ") || token.startsWith("Bearer ") || token.startsWith("token ")
        ? token
        : `Bearer ${token}`;
  }

  return headers;
}

function parseJsonObject(text: string): Record<string, unknown> {
  const sanitized = text.replace(/,\s*([}\]])/g, "$1");
  const parsed: unknown = JSON.parse(sanitized);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("Expected a JSON object");
  }
  return parsed as Record<string, unknown>;
}

function readString(record: Record<string, unknown>, names: string[]) {
  const entries = Object.entries(record);
  for (const name of names) {
    const match = entries.find(([key]) => key.toLowerCase() === name.toLowerCase());
    if (typeof match?.[1] === "string") return match[1];
  }
  return "";
}

function readStringRecord(record: Record<string, unknown>, names: string[]) {
  const entries = Object.entries(record);
  for (const name of names) {
    const match = entries.find(([key]) => key.toLowerCase() === name.toLowerCase());
    if (match?.[1] && typeof match[1] === "object" && !Array.isArray(match[1])) {
      return match[1] as Record<string, string>;
    }
  }
  return undefined;
}

function readStringArray(record: Record<string, unknown>, names: string[]) {
  const entries = Object.entries(record);
  for (const name of names) {
    const match = entries.find(([key]) => key.toLowerCase() === name.toLowerCase());
    if (Array.isArray(match?.[1])) {
      return match[1].filter((item): item is string => typeof item === "string");
    }
  }
  return [];
}

async function fetchCustomProperties(fullName: string) {
  const rawBaseUrl = process.env.GITHUB_RAW_BASE_URL ?? DEFAULT_RAW_BASE_URL;
  const customPropertiesPath = process.env.GITHUB_CUSTOM_PROPERTIES_PATH ?? DEFAULT_CUSTOM_PROPERTIES_PATH;
  const url = `${rawBaseUrl}${fullName}${customPropertiesPath}`;
  const response = await fetch(url, {
    headers: githubHeaders(),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to load mypage-props.json for ${fullName}`);
  }

  return parseJsonObject(await response.text());
}

export async function fetchRepositories(): Promise<GitHubRepoResponse[]> {
  const reposUrl = process.env.GITHUB_REPOS_URL ?? DEFAULT_REPOS_URL;
  const response = await fetch(reposUrl, {
    headers: githubHeaders(),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`GitHub repos request failed: ${response.status}`);
  }

  const payload: unknown = await response.json();
  if (!Array.isArray(payload)) {
    throw new Error("GitHub repos response was not a list");
  }

  return payload as GitHubRepoResponse[];
}

export async function fetchPortfolioRepositories(): Promise<GitHubRepoWithProps[]> {
  const topicName = process.env.GITHUB_TOPIC_NAME ?? DEFAULT_TOPIC_NAME;
  const repositories = (await fetchRepositories())
    .filter((repo) => (repo.topics ?? []).includes(topicName))
    .sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));

  const withProps = await Promise.all(
    repositories.map(async (repo) => {
      try {
        const custom = await fetchCustomProperties(repo.full_name);
        return { repo, custom };
      } catch {
        return null;
      }
    }),
  );

  return withProps.filter((item): item is GitHubRepoWithProps => item !== null);
}

export function mapProject(item: GitHubRepoWithProps, locale: Locale): Project {
  const dictionary = readStringRecord(item.custom, ["descriptionDictonary", "DescriptionDictonary"]);

  return {
    url: item.repo.html_url,
    title: capitalizeTitle(item.repo.name),
    fullName: item.repo.full_name,
    topics: item.repo.topics ?? [],
    createdAt: item.repo.created_at,
    description: descriptionForLocale(dictionary, locale),
    videoUrl: readString(item.custom, ["videoUrl", "VideoUrl"]),
    nuGetUrl: readString(item.custom, ["nuGetUrl", "NuGetUrl"]),
    swaggerUrl: readString(item.custom, ["swaggerUrl", "SwaggerUrl"]),
    tags: readStringArray(item.custom, ["tags", "Tags"]),
  };
}
