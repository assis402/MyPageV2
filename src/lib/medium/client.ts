import "server-only";

import type { Publication } from "@/types/medium";

export const DEFAULT_MEDIUM_INTEGRATION_URL = "https://medium-posts.assis402.workers.dev/";
export const DEFAULT_MEDIUM_USER_URL = "https://medium.com/@assis4002";
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

  return finalizePublications(posts.map(mapPublication));
}

function decodeXmlText(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function xmlTag(xml: string, tag: string) {
  const match = xml.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, "i"));
  return match ? decodeXmlText(match[1]) : "";
}

function firstImageUrl(html: string) {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match?.[1] ?? "";
}

function firstParagraph(html: string) {
  const match = html.match(/<p\b[^>]*>([\s\S]*?)<\/p>/i);
  if (!match) return "";
  return decodeXmlText(match[1].replace(/<[^>]+>/g, " "));
}

function mapRssItem(itemXml: string): Publication | null {
  const content = xmlTag(itemXml, "content:encoded") || xmlTag(itemXml, "description");
  const url = (xmlTag(itemXml, "link") || "").split("?")[0];
  const title = xmlTag(itemXml, "title");
  if (!url || !title) return null;

  return {
    id: xmlTag(itemXml, "guid") || url,
    title,
    description: firstParagraph(content),
    imageUrl: firstImageUrl(content),
    url,
    createdAt: parseCreatedAt(xmlTag(itemXml, "pubDate") || xmlTag(itemXml, "atom:updated")),
  };
}

export function parseRssPublications(xml: string): Publication[] {
  return finalizePublications(xml.split(/<item>/i).slice(1).map(mapRssItem));
}

function finalizePublications(items: (Publication | null)[]) {
  return items
    .filter((item): item is Publication => item !== null)
    .sort((a, b) => (Date.parse(b.createdAt) || 0) - (Date.parse(a.createdAt) || 0))
    .slice(0, PUBLICATION_LIMIT);
}

function mediumRssUrl(userUrl: string) {
  return userUrl.replace(/\/$/, "").replace("://medium.com/", "://medium.com/feed/");
}

async function fetchFromIntegration(): Promise<Publication[]> {
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

async function fetchFromRss(): Promise<Publication[]> {
  const userUrl = process.env.MEDIUM_USER_URL?.trim() || DEFAULT_MEDIUM_USER_URL;

  try {
    const response = await fetch(mediumRssUrl(userUrl), {
      headers: {
        Accept: "application/rss+xml, application/xml, text/xml",
        "User-Agent": "Mozilla/5.0 (compatible; MyPageUI/1.0)",
      },
      cache: "no-store",
    });

    if (!response.ok) return [];

    return parseRssPublications(await response.text());
  } catch {
    return [];
  }
}

export async function fetchPublications(): Promise<Publication[]> {
  const fromApi = await fetchFromIntegration();
  if (fromApi.length > 0) return fromApi;
  return fetchFromRss();
}
