export const UX_PREVIEW_COOKIE = "ux_preview";
export const UX_PREVIEW_DIRECTION_C = "c";
export const UX_PREVIEW_OFF = "off";
export const UX_PREVIEW_HEADER = "x-ux-preview";

export function normalizeUxPreview(value: string | undefined | null): "c" | "off" | undefined {
  const normalized = value?.trim().toLowerCase();
  if (normalized === UX_PREVIEW_DIRECTION_C || normalized === UX_PREVIEW_OFF) {
    return normalized;
  }
  return undefined;
}
