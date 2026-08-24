"use server";

import { signIn, signOut } from "@/auth";
import { isValidLocale } from "@/lib/i18n/locale";

function adminPath(locale: string) {
  return `/${isValidLocale(locale) ? locale : "en-US"}/admin`;
}

export async function loginWithGoogle(formData: FormData) {
  const locale = String(formData.get("locale") ?? "en-US");
  await signIn("google", { redirectTo: adminPath(locale) });
}

export async function logoutAdmin(formData: FormData) {
  const locale = String(formData.get("locale") ?? "en-US");
  await signOut({ redirectTo: adminPath(locale) });
}
