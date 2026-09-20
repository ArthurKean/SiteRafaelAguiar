import { test, expect } from '@playwright/test';
test('galeria responde às setas ao abrir e mantém o foco ao fechar', async ({page}) => {
 await page.goto('/imoveis/vernazza-residenziale');
 const trigger=page.getByRole('button',{name:'Abrir foto 1 de Vernazza Residenziale'});
 await trigger.click();
 await page.keyboard.press('ArrowRight');
 await expect(page.getByRole('dialog')).toHaveAccessibleName(/2 \/ 5/);
 await page.keyboard.press('ArrowLeft');
 await expect(page.getByRole('dialog')).toHaveAccessibleName(/1 \/ 5/);
 await page.keyboard.press('Escape');
 await expect(trigger).toBeFocused();
});
for(const width of [320,768,1440]) test(`revisão das páginas em ${width}px`, async ({page})=>{
 await page.setViewportSize({width,height:900});
 const errors:string[]=[]; page.on('pageerror',e=>errors.push(e.message));
 for(const path of ['/','/imoveis','/sobre','/imoveis/vernazza-residenziale']){
  await page.goto(path);
  await expect(page.getByRole('heading',{level:1})).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),path).toBe(true);
 }
 await expect(page.locator('.location-section')).toHaveCount(1);
 await expect(page.locator('.detail-sidebar iframe')).toHaveCount(1);
 const box=await page.locator('.detail-sidebar iframe').boundingBox();
 expect(box?.height).toBe(240);
 await page.screenshot({path:`test-results/review-${width}.png`,fullPage:true});
 expect(errors).toEqual([]);
});
