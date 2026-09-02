import { expect, test } from "@playwright/test";

test("projects page exposes search without a preview flag", async ({ page }) => {
  await page.goto("/en-US/projects", { waitUntil: "domcontentloaded" });

  await expect(page.getByRole("textbox", { name: "search a project" })).toBeVisible();
  await expect(page.locator("#main-content")).toBeVisible();
});
