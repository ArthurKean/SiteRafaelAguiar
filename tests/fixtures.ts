import { test as base, expect } from "@playwright/test";
import { resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { properties } from "./fixtures/properties";
const assetRoot = fileURLToPath(new URL("./assets/images/", import.meta.url));
const image = (p: {src:string;alt:string}) => ({...p,src:`https://cdn.sanity.io/images/fixture/production/${p.src.replace("/images/", "")}`});
export const test = base.extend<{catalogFixture: void}>({
 catalogFixture: [async ({page}, use) => {
   await page.route("https://*.api.sanity.io/**", route => route.fulfill({json:{result:properties.map(p=>({...p,images:p.images.map(image),plans:p.plans.map(plan=>({...plan,image:plan.image?image(plan.image):undefined}))}))}}));
   await page.route("https://cdn.sanity.io/images/fixture/production/**",async route=> {
     const file=new URL(route.request().url()).pathname.replace("/images/fixture/production/","");
     const asset = resolve(assetRoot, file);
     if (!asset.startsWith(resolve(assetRoot) + sep)) throw new Error("Imagem de teste fora da pasta de recursos");
     await route.fulfill({path: asset});
   });
   await use();
   await page.unrouteAll({behavior: "ignoreErrors"});
 },{auto:true}],
});
export { expect };
