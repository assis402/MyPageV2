import { expect, test } from "@playwright/test";

test("locale switch keeps the current route", async ({ page }) => {
  await page.goto("/en-US/projects", { waitUntil: "domcontentloaded" });

  await page.locator(".menu-items").getByRole("button", { name: "Change language to Portuguese" }).click();

  await expect(page).toHaveURL(/\/pt-BR\/projects/);
  await expect(page.getByRole("heading", { name: "PROJETOS" })).toBeVisible();
  await expect(page.getByRole("textbox", { name: "pesquise um projeto" })).toBeVisible();

  await page.locator(".menu-items").getByRole("button", { name: "Mudar idioma para inglês" }).click();

  await expect(page).toHaveURL(/\/en-US\/projects/);
  await expect(page.getByRole("heading", { name: "PROJECTS" })).toBeVisible();
});

test("home locale switch updates hero copy", async ({ page }) => {
  await page.goto("/en-US", { waitUntil: "domcontentloaded" });

  await page.locator(".menu-items").getByRole("button", { name: "Change language to Portuguese" }).click();

  await expect(page).toHaveURL(/\/pt-BR\/?$/);
  await expect(page.getByText("Olá, eu sou")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Destaques" })).toBeVisible();
});
