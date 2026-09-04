import { expect, test } from "@playwright/test";

test("projects page exposes search without a preview flag", async ({ page }) => {
  await page.goto("/en-US/projects", { waitUntil: "domcontentloaded" });

  await expect(page.getByRole("heading", { name: "PROJECTS" })).toBeVisible();
  await expect(page.getByRole("textbox", { name: "search a project" })).toBeVisible();
  await expect(page.locator("#main-content")).toBeVisible();
});

test("projects page shows an empty state for unmatched search", async ({ page }) => {
  await page.goto("/en-US/projects?search=__no-such-project__", { waitUntil: "domcontentloaded" });

  await expect(page.getByRole("heading", { name: "PROJECTS" })).toBeVisible();
  await expect(page.getByText("No projects found.")).toBeVisible();
  await expect(page.locator(".project")).toHaveCount(0);
});

test("projects cards lift like Medium on hover", async ({ page }) => {
  await page.goto("/en-US/projects", { waitUntil: "domcontentloaded" });

  const card = page.locator(".project").first();
  test.skip((await page.locator(".project").count()) === 0, "GitHub returned no projects");
  await expect(card).toHaveClass(/ui-card/);
  await card.hover();
  await expect
    .poll(() => card.evaluate((el) => getComputedStyle(el).transform))
    .toBe("matrix(1, 0, 0, 1, 0, -2)");
});

test("projects page title is localized in Portuguese", async ({ page }) => {
  await page.goto("/pt-BR/projects", { waitUntil: "domcontentloaded" });

  await expect(page.getByRole("heading", { name: "PROJETOS" })).toBeVisible();
  await expect(page.getByRole("textbox", { name: "pesquise um projeto" })).toBeVisible();
});
