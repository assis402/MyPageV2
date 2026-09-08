import { expect, test } from "@playwright/test";

const secretPattern = /GITHUB_TOKEN|GOOGLE_CLIENT_SECRET|AUTH_SECRET|github_pat_|ghp_[A-Za-z0-9]/;

test("admin stays signed out and does not leak secrets in HTML", async ({ page }) => {
  await page.goto("/en-US/admin", { waitUntil: "domcontentloaded" });

  await expect(page.getByRole("button", { name: "Login com Google" })).toBeVisible();
  await expect(page.getByRole("button", { name: "clear projects cache" })).toHaveCount(0);

  const html = await page.content();
  expect(html).not.toMatch(secretPattern);
});

test("home HTML does not embed server secrets", async ({ page }) => {
  await page.goto("/en-US", { waitUntil: "domcontentloaded" });

  const html = await page.content();
  expect(html).not.toMatch(secretPattern);
});
