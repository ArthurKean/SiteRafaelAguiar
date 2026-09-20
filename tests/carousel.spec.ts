import { test, expect } from '@playwright/test';

test('carrossel avança a cada 5 segundos, repete e respeita pausa', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.clock.install();
  await page.goto('/');
  const card = page.locator('.hero-property');
  await expect(card).toContainText('Vernazza');
  await page.clock.runFor(4_000);
  await expect(card).toContainText('Vernazza');
  await page.clock.runFor(1_100);
  await expect(card).toContainText('Jardins');
  await page.clock.runFor(5_000);
  await expect(card).toContainText('Villa');
  await page.clock.runFor(5_000);
  await expect(card).toContainText('Vernazza');
  await page.getByRole('button', { name: 'Pausar rotação automática' }).click();
  await page.clock.runFor(20_000);
  await expect(card).toContainText('Vernazza');
  await page.getByRole('button', { name: 'Iniciar rotação automática' }).click();
  await page.clock.runFor(5_100);
  await expect(card).toContainText('Jardins');
  await page.locator('.hero-visual').hover();
  await page.clock.runFor(20_000);
  await expect(card).toContainText('Jardins');
});

test('movimento reduzido mantém o controle manual e layout mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.clock.install();
  await page.goto('/');
  await expect(page.locator('.hero-property')).toContainText('Vernazza');
  await page.clock.runFor(20_000);
  await expect(page.locator('.hero-property')).toContainText('Vernazza');
  await page.getByRole('button', { name: 'Mostrar Villa Atlântica' }).click();
  await expect(page.locator('.hero-property')).toContainText('Villa');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: 'test-results/carousel-mobile.png' });
});

