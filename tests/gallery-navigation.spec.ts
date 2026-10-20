import { test, expect } from './fixtures';
import { vernazza } from '../src/data/vernazza';

for (const width of [390, 1440]) test(`galeria com miniaturas e cliques rápidos em ${width}px`, async ({page}) => {
  await page.setViewportSize({width,height:900});
  let release!: () => void;
  let started!: () => void;
  const waiting = new Promise<void>(resolve => { release = resolve; });
  const requested = new Promise<void>(resolve => { started = resolve; });
  const slowPath = vernazza.images[3].src.replace('/images/', '');
  await page.route('https://cdn.sanity.io/images/fixture/production/**', async route => {
    const url = new URL(route.request().url());
    if (url.pathname.endsWith(slowPath) && url.searchParams.get('w') !== '160') {
      started(); await waiting;
    }
    await route.fallback();
  });
  await page.goto('/imoveis/vernazza-residenziale');
  await page.getByRole('button',{name:'Abrir foto 1 de Vernazza Residenziale'}).click();
  await expect(page.locator('.gallery-feedback')).toBeEmpty();
  const original = await page.locator('.lightbox-image').getAttribute('src');
  await page.getByRole('button',{name:'Ver foto 4',exact:true}).click();
  await requested;
  await expect(page.locator('.gallery-feedback')).toContainText('Carregando foto 4');
  await expect(page.locator('.lightbox-image')).toHaveAttribute('src',original!);
  await page.getByRole('button',{name:'Ver foto 3',exact:true}).click();
  await expect(page.locator('.gallery-caption-row')).toContainText('3 de 5');
  release();
  await expect(page.locator('.lightbox-image')).toHaveAttribute('src',new RegExp(vernazza.images[2].src.split('/').pop()!.replace('.', '\\.')));
  await page.getByRole('button',{name:'Próxima foto',exact:true}).click();
  await page.getByRole('button',{name:'Próxima foto',exact:true}).click();
  await expect(page.locator('.gallery-caption-row')).toContainText('5 de 5');
  await expect(page.locator('.gallery-feedback')).toBeEmpty();
  expect(await page.locator('.gallery-lightbox').evaluate(el=>el.scrollWidth<=el.clientWidth)).toBe(true);
  await page.screenshot({path:`test-results/gallery-${width}.png`});
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
});
