import { expect, test } from "@playwright/test";

const redirects = [
  { from: "/Projects", to: /\/en-US\/projects\/?$/ },
  { from: "/projects", to: /\/en-US\/projects\/?$/ },
  { from: "/Admin", to: /\/en-US\/admin\/?$/ },
  { from: "/admin", to: /\/en-US\/admin\/?$/ },
  { from: "/Courses", to: /\/en-US\/?$/ },
  { from: "/courses", to: /\/en-US\/?$/ },
] as const;

for (const { from, to } of redirects) {
  test(`${from} redirects to the en-US route`, async ({ page }) => {
    await page.goto(from, { waitUntil: "domcontentloaded" });
    await expect(page).toHaveURL(to);
  });
}
