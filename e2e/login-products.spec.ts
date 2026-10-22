import { test, expect } from "@playwright/test";

test("user can log in and view products", async ({ page }) => {  await page.goto("/login"); 

  await page.getByLabel("Email").fill(process.env.E2E_EMAIL ?? "");
  await page.getByLabel("Password").fill(process.env.E2E_PASSWORD ?? "");

  await page.getByRole("button", { name: "Log in" }).click();

  await expect(
    page.getByRole("link", { name: "Produkter", exact: true }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Produkter", exact: true }).click();

  await expect(page.getByRole("heading", { name: "Produkter" })).toBeVisible();

  await expect(page.locator("h2").first()).toBeVisible();
});
