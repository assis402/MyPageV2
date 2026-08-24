import { revalidateTag, unstable_cache } from "next/cache";
import "server-only";

import { fetchPublications } from "@/lib/medium/client";

export const PUBLICATIONS_CACHE_TAG = "publications";

function cacheRevalidateSeconds() {
  const parsed = Number(process.env.CACHE_REVALIDATE_SECONDS);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 604800;
}

export const getPublications = unstable_cache(fetchPublications, ["medium-publications"], {
  revalidate: cacheRevalidateSeconds(),
  tags: [PUBLICATIONS_CACHE_TAG],
});

export function revalidatePublicationsCache() {
  revalidateTag(PUBLICATIONS_CACHE_TAG);
}

export { fetchPublications } from "@/lib/medium/client";
export { formatPublicationDate } from "@/lib/medium/format";
