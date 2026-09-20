import { test, expect } from "@playwright/test";
test('teclado, foco e link de contato', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Pular para o conteúdo' })).toBeFocused();
  await page.locator('.header').getByRole('button', { name: 'Falar com Rafael' }).click();
  await expect(page.getByRole('dialog').getByRole('button', { name: 'Fechar' })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(page.getByRole('dialog').getByRole('button', { name: 'Voltar ao site' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.locator('.header').getByRole('button', { name: 'Falar com Rafael' })).toBeFocused();
  await page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('link', { name: 'Contato', exact: true }).click();
  await expect(page).toHaveURL(/#contato$/);
  await expect(page.locator('.footer')).toBeInViewport();
});
test("busca, filtros combinados, ordenação, vazio e navegação", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "extraordinário",
  );
  await expect(page.locator(".property-card")).toHaveCount(3);
  await page.locator("select[name=neighborhood]").selectOption("Renascença");
  await page.locator("select[name=maxPrice]").selectOption("700000");
  await page.getByRole("button", { name: "Buscar imóvel" }).click();
  await expect(page).toHaveURL(/neighborhood=Renasc/);
  await expect(page.locator(".property-card")).toHaveCount(1);
  await expect(page.locator(".property-card h3")).toHaveText(
    "Reserva Renascença",
  );
  await page.getByRole("button", { name: "Limpar todos", exact: true }).click();
  await expect(page.locator(".property-card")).toHaveCount(6);
  await page.getByLabel("Ordenar por").selectOption("price-asc");
  await expect(page.locator(".property-card h3").first()).toHaveText(
    "Essenza do Parque",
  );
  await page
    .getByLabel("Buscar por nome, bairro ou cidade")
    .fill("imóvel inexistente");
  await expect(page.getByText("Nenhum imóvel encontrado.")).toBeVisible();
  await page
    .locator(".empty-state")
    .getByRole("button", { name: "Limpar filtros" })
    .click();
  await expect(page.locator(".property-card")).toHaveCount(6);
  await page.screenshot({
    path: "test-results/catalog-desktop.png",
    fullPage: true,
  });
  await page.locator(".property-card h3 a").first().click();
  await expect(page).toHaveURL(/vernazza-residenziale/);
  await expect(
    page.getByRole("heading", { name: "Descrição do empreendimento" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "130 m²", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "130 m² de área privativa" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Abrir foto 1 de Vernazza Residenziale" })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Próxima foto" }).click();
  await expect(page.getByRole("dialog")).toHaveAccessibleName(/2 \/ 4/);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page
    .locator(".investment")
    .getByRole("button", { name: "Falar com Rafael" })
    .click();
  await expect(page.getByRole("dialog")).toContainText(
    "vi o Vernazza Residenziale",
  );
  await page.keyboard.press("Escape");
  await page.screenshot({
    path: "test-results/detail-desktop.png",
    fullPage: true,
  });
  await page.goto("/imoveis/nao-existe");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "outro caminho",
  );
  await page.goto("/rota-inexistente");
  await expect(page.getByText("404 · Endereço não encontrado")).toBeVisible();
  await page.goto("/sobre");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "curadoria",
  );
  expect(errors).toEqual([]);
});
test("home desktop, assets e galeria de destaques", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page
    .getByRole("button", { name: "Mostrar Jardins da Península" })
    .click();
  await expect(page.locator(".hero-property")).toContainText(
    "Jardins da Península",
  );
  await page
    .getByRole("button", { name: "Mostrar Vernazza Residenziale" })
    .click();
  await page.evaluate(() => document.fonts.ready);
  await page.locator(".footer").scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const broken = await page
    .locator("img")
    .evaluateAll((images) =>
      images.filter((i) => !i.complete || !i.naturalWidth).map((i) => i.src),
    );
  expect(broken).toEqual([]);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: "test-results/home-desktop.png",
    fullPage: true,
  });
});
for (const width of [390, 768]) {
  test(`responsividade e filtros em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");
    await expect(page.locator(".hero-property")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: `test-results/home-${width}.png`,
      fullPage: true,
    });
    await page.getByRole("button", { name: "Abrir menu" }).click();
    await page
      .getByRole("navigation", { name: "Navegação principal" })
      .getByRole("link", { name: "Imóveis", exact: true })
      .click();
    await page.getByRole("button", { name: "Filtros", exact: true }).click();
    await page
      .getByRole("dialog")
      .getByRole("combobox", { name: "Bairro", exact: true })
      .selectOption("Calhau");
    await page.getByRole("button", { name: "Ver 1 imóvel" }).click();
    await expect(page.locator(".property-card")).toHaveCount(1);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await page.locator(".property-card h3 a").click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Villa Atlântica",
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: `test-results/detail-${width}.png`,
      fullPage: true,
    });
  });
}
