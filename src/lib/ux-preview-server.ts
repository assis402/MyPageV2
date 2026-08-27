import { cookies } from "next/headers";

import { UX_PREVIEW_COOKIE, UX_PREVIEW_DIRECTION_C } from "@/lib/ux-preview";

export async function isDirectionCPreview(): Promise<boolean> {
  const cookie = (await cookies()).get(UX_PREVIEW_COOKIE)?.value;
  if (cookie === UX_PREVIEW_DIRECTION_C) return true;
  if (cookie === "off") return false;
  return process.env.UX_PREVIEW_DIRECTION === UX_PREVIEW_DIRECTION_C;
}
