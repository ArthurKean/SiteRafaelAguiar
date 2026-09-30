import { test, expect } from "./fixtures";
for (const width of [390, 768, 1440]) {
  test(`orçamento aberto mantém campo compacto em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const trigger = page.locator('.price-trigger');
    await trigger.click();
    await expect(page.locator('.price-panel')).toBeVisible();
    const height = await trigger.evaluate(el => el.getBoundingClientRect().height);
    expect(height).toBeLessThan(90);
    await page.getByLabel('Valor máximo em reais').fill('1800000');
    await expect(page.getByLabel('Valor máximo em reais')).toHaveValue('1.800.000');
    await page.getByRole('button', {name:'Aplicar', exact:true}).click();
    await expect(trigger).toContainText('Até R$ 1.800.000');
    await page.getByRole('button', {name:'Buscar imóvel', exact:true}).click();
    await expect(page).toHaveURL(/maxPrice=1800000/);
  });
}
