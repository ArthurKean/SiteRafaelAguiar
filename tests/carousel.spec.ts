import { test, expect } from '@playwright/test';

test('fundo alterna em cinco segundos e pausa após seleção manual', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.clock.install();
  await page.goto('/');
  const active = page.locator('.immersive-backdrop img.is-active');
  await expect(active).toHaveAttribute('src', /fachada-noturna/);
  await page.clock.runFor(5100);
  await expect(active).toHaveAttribute('src', /entrada-norte/);
  await page.getByRole('button', { name: 'Mostrar imagem 3 de Vernazza Residenziale' }).click();
  await page.clock.runFor(15000);
  await expect(active).toHaveAttribute('src', /aerea-diurna/);
});

test('busca centralizada e bolinhas no celular com movimento reduzido', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.clock.install();
  await page.goto('/');
  await page.clock.runFor(15000);
  await expect(page.locator('.immersive-backdrop img.is-active')).toHaveAttribute('src', /fachada-noturna/);
  await page.getByRole('button', { name: 'Mostrar imagem 2 de Vernazza Residenziale' }).click();
  await expect(page.locator('.immersive-backdrop img.is-active')).toHaveAttribute('src', /entrada-norte/);
  const bounds = await page.locator('.immersive-search').boundingBox();
  expect(Math.abs(bounds!.x - (390 - bounds!.x - bounds!.width))).toBeLessThan(2);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: 'test-results/carousel-mobile.png', fullPage: true });
  await page.getByRole('button', { name: 'Buscar imóvel', exact: true }).click();
  await expect(page).toHaveURL(/imoveis/);
});
