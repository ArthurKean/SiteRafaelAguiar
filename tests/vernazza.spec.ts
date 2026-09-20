import { test, expect } from '@playwright/test';
test('Vernazza real: metragens, centavos, imagens e layout mobile', async ({ page }) => {
 await page.setViewportSize({ width: 390, height: 844 });
 await page.goto('/imoveis/vernazza-residenziale');
 await expect(page.locator('.investment-summary')).toContainText('2 suítes + 1 reversível');
 await expect(page.locator('.investment-value strong')).toContainText('1.308.744,15');
 await page.getByRole('button', { name: '130,49 m²', exact: true }).click();
 await expect(page.locator('.investment-value strong')).toContainText('2.508.744,15');
 await expect(page.locator('.investment-summary')).toContainText('3 suítes');
 await expect(page.locator('.investment-summary')).not.toContainText('S-101');
 await expect(page.locator('.description')).toContainText('Treviso Engenharia');
 await expect(page.locator('.description')).toContainText('Pet Place');
 await expect(page.locator('.detail-heading')).not.toContainText('Demonstração');
 expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
 await page.getByRole('button', { name: 'Abrir foto 1 de Vernazza Residenziale' }).click();
 for (let i=0;i<5;i++) {
  await expect(page.locator('.lightbox-image')).toHaveJSProperty('complete', true);
  expect(await page.locator('.lightbox-image').evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
  await page.getByRole('button', { name: 'Próxima foto' }).click();
 }
 await page.keyboard.press('Escape');
 await page.screenshot({path:'test-results/vernazza-mobile.png', fullPage:true});
});
