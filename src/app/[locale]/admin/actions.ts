"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { signIn, signOut } from "@/auth";
import { getAdminSession } from "@/lib/auth/session";
import { revalidateProjectsCache } from "@/lib/github";
import { isValidLocale, locales } from "@/lib/i18n/locale";
import { revalidatePublicationsCache } from "@/lib/medium";

function adminPath(locale: string, query = "") {
  const prefix = `/${isValidLocale(locale) ? locale : "en-US"}/admin`;
  return query ? `${prefix}?${query}` : prefix;
}

function localeFromForm(formData: FormData) {
  return String(formData.get("locale") ?? "en-US");
}

async function requireAdmin(locale: string) {
  const session = await getAdminSession();
  if (!session) redirect(adminPath(locale));
}

function revalidateLocalePaths(paths: (locale: string) => string) {
  for (const locale of locales) {
    revalidatePath(paths(locale));
  }
}

export async function loginWithGoogle(formData: FormData) {
  const locale = localeFromForm(formData);
  await signIn("google", { redirectTo: adminPath(locale) });
}

export async function logoutAdmin(formData: FormData) {
  const locale = localeFromForm(formData);
  await signOut({ redirectTo: adminPath(locale) });
}

export async function clearProjectsCache(formData: FormData) {
  const locale = localeFromForm(formData);
  await requireAdmin(locale);

  try {
    revalidateProjectsCache();
    revalidateLocalePaths((item) => `/${item}/projects`);
  } catch {
    redirect(adminPath(locale, "message=projects-error"));
  }

  redirect(adminPath(locale, "message=projects-ok"));
}

export async function clearArticlesCache(formData: FormData) {
  const locale = localeFromForm(formData);
  await requireAdmin(locale);

  try {
    revalidatePublicationsCache();
    revalidateLocalePaths((item) => `/${item}`);
  } catch {
    redirect(adminPath(locale, "message=articles-error"));
  }

  redirect(adminPath(locale, "message=articles-ok"));
}
