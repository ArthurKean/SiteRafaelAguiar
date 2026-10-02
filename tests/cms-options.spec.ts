import { test, expect } from '@playwright/test';
for (const width of [390, 1440]) {
 test(`opções, máximos, pavimentos e fotos em ${width}px`, async ({page}) => {
  await page.setViewportSize({width,height:900});
  const img = (name:string) => ({src:`https://cdn.sanity.io/images/jn7uxitm/production/${name}.jpg`,alt:name,title:name});
  await page.route('https://cdn.sanity.io/**', route => route.fulfill({contentType:'image/svg+xml',body:'<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><rect width="800" height="500" fill="#ddd5bf"/></svg>'}));
  await page.route('https://*.api.sanity.io/**',route=>route.fulfill({json:{result:[{
   id:'duplex',slug:'duplex',name:'Duplex',cover:img('Capa'),images:[img('Geral')],presentationImage:img('Apresentação'),features:[],
   plans:[{id:'b',name:'Com piscina',area:189.21,price:2200000,bedrooms:4,suites:4,bathrooms:5,parkingSpaces:3,drawings:[img('Térreo'),img('Superior')],photos:[img('Piscina privativa')]},
   {id:'a',name:'Sem piscina',area:189.21,price:1900000,bedrooms:3,suites:2,bathrooms:3,parkingSpaces:2,image:img('Antiga')}]
  }]}}));
  await page.goto('/imoveis');
  const card=page.locator('.property-card');
  await expect(card).toContainText('4 quartos'); await expect(card).toContainText('5 banheiros');
  await expect(card).toContainText('3 vagas'); await expect(card).toContainText('1.900.000,00');
  await card.locator('h3 a').click();
  await expect(page.getByRole('button',{name:'189,21 m² · Sem piscina',exact:true})).toHaveAttribute('aria-pressed','true');
  await expect(page.locator('.specs')).toContainText('3');
  await expect(page.locator('.investment-value strong')).toContainText('1.900.000,00');
  await expect(page.locator('.plan-drawings img')).toHaveCount(1);
  await expect(page.locator('.option-photos')).toHaveCount(0);
  await expect(page.locator('.editorial-section > img')).toHaveAttribute('alt','Apresentação');
  await page.getByRole('button',{name:'189,21 m² · Com piscina',exact:true}).click();
  await expect(page.locator('.investment-value strong')).toContainText('2.200.000,00');
  await expect(page.locator('.plan-drawings img')).toHaveCount(2);
  await expect(page.locator('.plan-drawings')).toContainText('Superior');
  await expect(page.locator('.option-photos img').first()).toHaveAttribute('alt','Piscina privativa');
  const href=await page.locator('.investment a.button').getAttribute('href');
  expect(new URL(href!).searchParams.get('text')).toContain('Com piscina');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.locator('.plan-section').scrollIntoViewIfNeeded();
  await expect.poll(() => page.locator('.plan-drawings img').evaluateAll(imgs => imgs.every(img => (img as HTMLImageElement).naturalWidth > 0 && img.getBoundingClientRect().width > 0))).toBe(true);
  await page.screenshot({path:`test-results/cms-options-${width}.png`});
 });
}
