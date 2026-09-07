import { expect, test } from "@playwright/test";

const routes = [
  { path: "/en-US", marker: { role: "heading" as const, name: "Highlights" } },
  { path: "/pt-BR", marker: { role: "heading" as const, name: "Destaques" } },
  { path: "/en-US/projects", marker: { role: "heading" as const, name: "PROJECTS" } },
  { path: "/en-US/admin", marker: { role: "heading" as const, name: "ADMIN" } },
] as const;

test.describe("mobile 375px", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  for (const { path, marker } of routes) {
    test(`${path} renders without horizontal overflow`, async ({ page }) => {
      await page.goto(path, { waitUntil: "domcontentloaded" });
      await expect(page.getByRole(marker.role, { name: marker.name })).toBeVisible();

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(1);
    });
  }
});

test("copy-email shows confirmation without leaving the page", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/en-US", { waitUntil: "domcontentloaded" });

  const email = page.getByRole("button", { name: /contact@matheusassis\.dev/ });
  await email.scrollIntoViewIfNeeded();
  await email.click();

  await expect(page.locator(".copy-popup.fade-animation")).toBeVisible();
  await expect(page).toHaveURL(/\/en-US\/?$/);
});
