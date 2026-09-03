import { expect, test } from "@playwright/test";

test("home shows Direction C hero without a preview flag", async ({ page }) => {
  await page.goto("/en-US", { waitUntil: "domcontentloaded" });

  await expect(page.getByText("Hello, I am")).toBeVisible();
  await expect(page.getByText("Matheus Assis", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "see projects" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Highlights" })).toBeVisible();
});

test("home ignores ux_preview=off", async ({ page }) => {
  await page.goto("/en-US?ux_preview=off", { waitUntil: "domcontentloaded" });

  await expect(page.getByText("Hello, I am")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Highlights" })).toBeVisible();
});

test("home skills section shows library icons", async ({ page }) => {
  await page.goto("/en-US", { waitUntil: "domcontentloaded" });

  const skills = page.locator("#about-skills");
  await expect(skills.getByText("HARD SKILLS")).toBeVisible();
  await expect(skills.locator(".stack-tile")).toHaveCount(10);
  await expect(skills.locator(".stack-tile svg")).toHaveCount(10);
  await expect(skills.getByText("C#", { exact: true })).toBeVisible();
  await expect(skills.getByText(".NET", { exact: true })).toBeVisible();
  await expect(skills.getByText("TypeScript")).toBeVisible();
  await expect(skills.getByText("React Native")).toBeVisible();
});

test("home section titles share the same content gap", async ({ page }) => {
  await page.goto("/en-US", { waitUntil: "domcontentloaded" });

  const gaps = await page.evaluate(() => {
    const gapAfter = (titleName: string, contentSelector: string) => {
      const titles = [...document.querySelectorAll("h2")];
      const title = titles.find((node) => node.textContent?.trim() === titleName);
      const content = document.querySelector(contentSelector);
      if (!title || !content) return null;
      const titleBox = title.getBoundingClientRect();
      const contentBox = content.getBoundingClientRect();
      return contentBox.top - titleBox.bottom;
    };

    return {
      about: gapAfter("ABOUT", "#about-body-container"),
      background: gapAfter("BACKGROUND", ".timeline-body"),
      medium: gapAfter("MEDIUM ARTICLES", ".medium-body"),
    };
  });

  expect(gaps.about).toBeGreaterThanOrEqual(40);
  expect(gaps.background).toBeGreaterThanOrEqual(40);
  expect(gaps.medium).toBeGreaterThanOrEqual(40);
  expect(Math.abs((gaps.about ?? 0) - (gaps.background ?? 0))).toBeLessThan(2);
  expect(Math.abs((gaps.about ?? 0) - (gaps.medium ?? 0))).toBeLessThan(2);
});
