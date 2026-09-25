import { test, expect } from "@playwright/test";

test("WhatsApp flutuante aparece em todas as páginas no celular", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of ["/", "/imoveis", "/sobre", "/imoveis/vernazza-residenziale", "/nao-existe"]) {
    await page.goto(route);
    const contact = page.getByRole("link", { name: "Conversar com Rafael no WhatsApp (abre em nova aba)", exact: true });
    await expect(contact).toBeVisible();
    await expect(contact).toHaveAttribute("href", /^https:\/\/wa.me\/559891588444\?text=/);
    const bounds = await contact.boundingBox();
    expect(bounds!.width).toBe(56);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(390);
    expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(844);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(contact).toBeInViewport();
  }
});
