import { test as base, expect } from "@playwright/test";
import { properties } from "../src/data/properties";
const image = (p: {src:string;alt:string}) => ({...p,src:`https://cdn.sanity.io/images/fixture/production/${p.src.replace("/images/", "")}`});
export const test = base.extend<{catalogFixture: void}>({
 catalogFixture: [async ({page}, use) => {
   await page.route("https://*.api.sanity.io/**", route => route.fulfill({json:{result:properties.map(p=>({...p,images:p.images.map(image),plans:p.plans.map(plan=>({...plan,image:plan.image?image(plan.image):undefined}))}))}}));
   await page.route("https://cdn.sanity.io/images/fixture/production/**",async route=> {
     const file=new URL(route.request().url()).pathname.replace("/images/fixture/production/","");
     const response=await route.fetch({url:`http://127.0.0.1:5173/images/${file}`});
     await route.fulfill({response});
   });
   await use();
 },{auto:true}],
});
export { expect };
