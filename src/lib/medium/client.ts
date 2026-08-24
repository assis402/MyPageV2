import "server-only";

import type { Publication } from "@/types/medium";

export const DEFAULT_MEDIUM_INTEGRATION_URL = "https://medium-posts.assis402.workers.dev/";
const PUBLICATION_LIMIT = 10;

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function readValue(record: Record<string, unknown>, names: string[]) {
  const entries = Object.entries(record);
  for (const name of names) {
    const match = entries.find(([key]) => key.toLowerCase() === name.toLowerCase());
    if (match) return match[1];
  }
  return undefined;
}

function readString(record: Record<string, unknown>, names: string[]) {
  const value = readValue(record, names);
  return typeof value === "string" ? value : "";
}

function parseCreatedAt(value: unknown): string {
  if (typeof value === "number" && Number.isFinite(value)) {
    const ms = value < 1e12 ? value * 1000 : value;
    const date = new Date(ms);
    return Number.isNaN(date.getTime()) ? "" : date.toISOString();
  }

  if (typeof value === "string" && value.trim()) {
    if (/^\d+$/.test(value.trim())) return parseCreatedAt(Number(value.trim()));
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "" : date.toISOString();
  }

  return "";
}

function mapPublication(value: unknown): Publication | null {
  const record = asRecord(value);
  if (!record) return null;

  const url = readString(record, ["url", "link"]);
  const title = readString(record, ["title"]);
  if (!url || !title) return null;

  const id = readString(record, ["id"]) || url;

  return {
    id,
    title,
    description: readString(record, ["description"]),
    imageUrl: readString(record, ["imageUrl", "image_url"]),
    url,
    createdAt: parseCreatedAt(readValue(record, ["createdAt", "created_at"])),
  };
}

export function parsePublications(payload: unknown): Publication[] {
  const root = asRecord(payload);
  if (!root) return [];

  const data = asRecord(readValue(root, ["data"])) ?? root;
  const posts = readValue(data, ["posts"]);
  if (!Array.isArray(posts)) return [];

  return posts
    .map(mapPublication)
    .filter((item): item is Publication => item !== null)
    .sort((a, b) => (Date.parse(b.createdAt) || 0) - (Date.parse(a.createdAt) || 0))
    .slice(0, PUBLICATION_LIMIT);
}

export async function fetchPublications(): Promise<Publication[]> {
  const url = process.env.MEDIUM_INTEGRATION_URL?.trim() || DEFAULT_MEDIUM_INTEGRATION_URL;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "MyPageUI",
      },
      cache: "no-store",
    });

    if (!response.ok) return [];

    return parsePublications(await response.json());
  } catch {
    return [];
  }
}
