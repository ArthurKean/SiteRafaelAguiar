import { test, expect } from "@playwright/test";
test("favoritos persistem, sincronizam e podem ser removidos", async ({ page }) => {
  await page.goto("/imoveis");
  await expect(page.locator(".favorite-button")).toHaveCount(6);
  await page.getByRole("button", { name: "Adicionar Vernazza Residenziale aos favoritos" }).click();
  await expect(page.locator(".favorites-desktop")).toHaveAttribute("aria-label", "Favoritos, 1 imóveis");
  await page.reload();
  await expect(page.getByRole("button", { name: "Remover Vernazza Residenziale dos favoritos" })).toHaveAttribute("aria-pressed", "true");
  await page.goto("/imoveis/vernazza-residenziale");
  await expect(page.getByRole("button", { name: "Remover Vernazza Residenziale dos favoritos" })).toBeVisible();
  await page.locator(".favorites-desktop").click();
  await expect(page.locator(".property-card")).toHaveCount(1);
  await page.screenshot({path:"test-results/favorites-desktop.png", fullPage:true});
  await page.getByRole("button", { name: "Remover Vernazza Residenziale dos favoritos" }).click();
  await expect(page.getByText("Você ainda não salvou nenhum imóvel.")).toBeVisible();
  await page.reload();
  await expect(page.locator(".property-card")).toHaveCount(0);
});
test("favoritos no celular e armazenamento indisponível", async ({ page }) => {
  await page.setViewportSize({width:320,height:800});
  await page.addInitScript(() => { Storage.prototype.setItem = () => { throw new Error("blocked"); }; });
  await page.goto("/");
  await page.getByRole("button", { name: "Adicionar Vernazza Residenziale aos favoritos" }).click();
  await expect(page.getByRole("status")).toContainText("não permitiu salvar");
  await page.locator(".favorites-mobile").click();
  await expect(page.locator(".property-card")).toHaveCount(1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({path:"test-results/favorites-mobile.png",fullPage:true});
});
