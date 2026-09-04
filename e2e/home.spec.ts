import { expect, test, type Locator } from "@playwright/test";

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

test("home timeline dots are centered on the rail", async ({ page }) => {
  await page.goto("/en-US", { waitUntil: "domcontentloaded" });

  const timeline = page.locator(".timeline");
  await expect(timeline.locator(".timeline-exp")).toHaveCount(3);

  const alignment = () =>
    page.evaluate(() => {
      const pseudoCenterX = (el: Element, pseudo: "::before") => {
        const style = getComputedStyle(el, pseudo);
        const box = el.getBoundingClientRect();
        const left = Number.parseFloat(style.left);
        const width = Number.parseFloat(style.width);
        let translateX = 0;
        const matrix = style.transform.match(/matrix\(([^)]+)\)/);
        if (matrix) {
          translateX = Number.parseFloat(matrix[1].split(",")[4] ?? "0");
        }
        return box.left + left + width / 2 + translateX;
      };

      const root = document.querySelector(".timeline");
      if (!root) return null;
      const railX = pseudoCenterX(root, "::before");
      const entries = [...root.querySelectorAll(".timeline-exp")];
      return {
        railX,
        dots: entries.map((entry) => ({
          x: pseudoCenterX(entry, "::before"),
          top: entry.getBoundingClientRect().top + window.scrollY,
        })),
      };
    });

  const before = await alignment();
  expect(before).not.toBeNull();
  for (const dot of before?.dots ?? []) {
    expect(Math.abs(dot.x - (before?.railX ?? 0))).toBeLessThan(1);
  }

  await timeline.getByRole("button", { name: "see more" }).first().click();
  await expect(timeline.locator(".timeline-exp-details.is-open")).toBeVisible();

  const after = await alignment();
  expect(after).not.toBeNull();
  for (const dot of after?.dots ?? []) {
    expect(Math.abs(dot.x - (after?.railX ?? 0))).toBeLessThan(1);
  }
  expect(Math.abs((after?.dots[0]?.top ?? 0) - (before?.dots[0]?.top ?? 0))).toBeLessThan(1);
});

test("home skills and timeline cards lift like Medium on hover", async ({ page }) => {
  await page.goto("/en-US", { waitUntil: "domcontentloaded" });

  const medium = page.locator(".medium-card").first();
  const skill = page.locator(".stack-tile").first();
  const timelineCard = page.locator(".timeline-card").first();

  await expect(skill).toHaveClass(/ui-card/);
  await expect(timelineCard).toHaveClass(/ui-card/);

  const lift = "matrix(1, 0, 0, 1, 0, -2)";
  const transformOf = (locator: Locator) => locator.evaluate((el) => getComputedStyle(el).transform);

  for (const card of [medium, skill, timelineCard]) {
    await card.hover();
    await expect.poll(() => transformOf(card)).toBe(lift);
  }
});
