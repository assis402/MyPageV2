export const DEFAULT_ADMIN_EMAIL = "assis4002@gmail.com";

export function getAdminEmail() {
  return (process.env.ADMIN_EMAIL?.trim() || DEFAULT_ADMIN_EMAIL).toLowerCase();
}

export function isOwnerEmail(email?: string | null) {
  return Boolean(email && email.trim().toLowerCase() === getAdminEmail());
}
