import { expect, test } from "@playwright/test";

test("admin login UI is visible without auth", async ({ page }) => {
  await page.goto("/en-US/admin", { waitUntil: "domcontentloaded" });

  await expect(page.getByRole("heading", { name: "ADMIN" })).toBeVisible();
  await expect(page.getByText("*English page only.")).toBeVisible();
  await expect(page.getByText("Only the owner of this site may use this page.")).toBeVisible();

  const login = page.getByRole("button", { name: "Login com Google" });
  await expect(login).toBeVisible();
  await expect(login).toHaveClass(/gradient-button/);
  await expect(page.locator(".admin-panel")).toHaveClass(/ui-card/);
  await expect(page.getByRole("button", { name: "clear projects cache" })).toHaveCount(0);
});

test("admin login UI stays English on pt-BR", async ({ page }) => {
  await page.goto("/pt-BR/admin", { waitUntil: "domcontentloaded" });

  await expect(page.getByRole("heading", { name: "ADMIN" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Login com Google" })).toBeVisible();
  await expect(page.getByText("*English page only.")).toBeVisible();
});

test("admin page uses the shared content-zone background", async ({ page }) => {
  await page.goto("/en-US/admin", { waitUntil: "domcontentloaded" });

  const bg = await page.locator(".admin-page").evaluate((el) => getComputedStyle(el).backgroundColor);
  expect(bg).toBe("rgb(10, 10, 15)");
});
