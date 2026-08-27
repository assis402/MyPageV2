import { cookies, headers } from "next/headers";

import {
  UX_PREVIEW_COOKIE,
  UX_PREVIEW_DIRECTION_C,
  UX_PREVIEW_HEADER,
  UX_PREVIEW_OFF,
  normalizeUxPreview,
} from "@/lib/ux-preview";

export async function isDirectionCPreview(): Promise<boolean> {
  const header = normalizeUxPreview((await headers()).get(UX_PREVIEW_HEADER));
  if (header === UX_PREVIEW_DIRECTION_C) return true;
  if (header === UX_PREVIEW_OFF) return false;

  const cookie = normalizeUxPreview((await cookies()).get(UX_PREVIEW_COOKIE)?.value);
  if (cookie === UX_PREVIEW_DIRECTION_C) return true;
  if (cookie === UX_PREVIEW_OFF) return false;

  return process.env.UX_PREVIEW_DIRECTION === UX_PREVIEW_DIRECTION_C;
}
