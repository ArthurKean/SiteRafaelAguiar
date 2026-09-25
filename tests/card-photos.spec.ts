import { test, expect } from "@playwright/test";
test("setas alternam fotos sem navegar e marca aparece na galeria", async ({page}) => {
 await page.goto("/");
 const card=page.locator(".property-card").first();
 await expect(card.locator(".card-photo-count")).toHaveText("1/5");
 await card.getByRole("button",{name:"Próxima foto de Vernazza Residenziale"}).click();
 await expect(card.locator(".card-photo-count")).toHaveText("2/5");
 await expect(page).toHaveURL(/\/$/);
 await expect(card.locator(".card-image > img")).toHaveAttribute("src",/entrada-norte/);
 await page.screenshot({path:"test-results/card-watermark.png",fullPage:true});
 await card.getByRole("link",{name:"Conhecer Vernazza Residenziale"}).click();
 await page.getByRole("button",{name:"Abrir foto 1 de Vernazza Residenziale"}).click();
 await expect(page.locator(".watermarked-lightbox .photo-watermark")).toBeVisible();
});
