import { test, expect } from "@playwright/test";
test("Sanity publicado: imóvel atual carrega com fotos", async ({page}) => {
 await page.goto('/imoveis');
 const card = page.locator('.property-card').first();
 await expect(card).toBeVisible();
 await expect(card.locator('.card-image > img')).toHaveAttribute('src', /cdn.sanity.io/);
 await card.locator('h3 a').click();
 await expect(page.locator('.detail-heading h1')).toBeVisible();
 await expect(page.locator('.investment-value strong')).toContainText('R$');
 await expect.poll(() => page.locator('.property-gallery button > img').evaluateAll(images => images.length > 0 && images.every(img => (img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth > 0)), {timeout:15000}).toBe(true);
});
const api = "**/data/query/production?**";
test("cadastro com uma foto, plantas e falha da API", async ({page})=> {
 await page.route(api,route=>route.fulfill({json:{result:[{id:"new",slug:"apartamento-jardins",name:"Apartamento Jardins",priceFrom:100,areaMin:50,cover:{src:"https://cdn.sanity.io/images/jn7uxitm/production/missing.jpg"},plans:[{id:"p1",area:50,price:100},{id:"p2",area:80,price:200,unit:"A2"}]}]}}));
 await page.goto("/imoveis/apartamento-jardins");
 await expect(page.getByRole("heading",{name:"Apartamento Jardins",exact:true})).toBeVisible();
 await expect(page.locator(".editorial-section")).toHaveCount(0);
 await page.locator(".investment").getByRole("button",{name:"80 m²",exact:true}).click();
 await expect(page.locator(".investment-value strong")).toContainText("200");
 const href=await page.locator(".investment").getByRole("link",{name:"Falar com Rafael"}).getAttribute("href");
 expect(new URL(href!).searchParams.get("text")).toContain("80 m²");
 await page.unroute(api); await page.route(api,route=>route.fulfill({status:503,body:"unavailable"}));
 await page.goto("/imoveis"); await expect(page.getByText("Não foi possível carregar os imóveis.")).toBeVisible();
});
