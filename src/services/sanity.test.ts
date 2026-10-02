import { describe, expect, it } from "vitest";
import { normalizeProperty, cardImageSet } from "./sanity";
const base = {id:"abc",name:"Casa",slug:"casa",priceFrom:100,areaMin:40};
describe("adaptação Sanity",()=> {
 it("usa plantas para faixas de preço e metragem",()=>{
  const result=normalizeProperty({...base,plans:[{id:"a",area:90,price:900},{id:"b",area:50,price:500}]});
  expect(result).toMatchObject({priceFrom:500,priceTo:900,areaMin:50,areaMax:90});
  expect(result?.parkingSpaces).toBeUndefined();
 });
 it("deduplica capa e galeria e prepara tamanho remoto",()=>{
  const image={src:"https://cdn.sanity.io/images/jn7uxitm/production/abc.jpg",alt:"Fachada"};
  const result=normalizeProperty({...base,cover:image,images:[image]});
  expect(result?.images).toHaveLength(1);
  expect(cardImageSet(result!.images[0].src)).toContain("w=640");
  expect(cardImageSet(result!.images[0].src)).not.toContain("-640.webp");
 });
 it("trata foto ausente e ignora cadastro sem preço ou área",()=>{
  expect(normalizeProperty(base)?.images[0].src).toContain("placeholder");
  expect(normalizeProperty({...base,priceFrom:undefined})).toBeUndefined();
 });
 it("não incorpora URLs arbitrárias no mapa",()=>{
  expect(normalizeProperty({...base,mapEmbedUrl:"https://example.com"})?.mapEmbedUrl).toBeUndefined();
 });
});

it("calcula máximos independentemente e preserva dados de cada opção", () => {
 const result = normalizeProperty({...base, bedrooms: 9, parkingSpaces: 2, plans: [
  {id:"a",area:80,price:100,bedrooms:2,suites:1,bathrooms:2,parkingSpaces:0},
  {id:"b",area:120,price:300,bedrooms:4,suites:3,bathrooms:5,parkingSpaces:3},
 ]})!;
 expect(result).toMatchObject({bedrooms:4,suites:3,bathrooms:5,parkingSpaces:3,priceFrom:100});
 expect(result.plans[0]).toMatchObject({bedrooms:2,parkingSpaces:0});
});
it("preserva imóveis antigos sem opções e não inventa vagas nas opções", () => {
 expect(normalizeProperty({...base,parkingSpaces:2})).toMatchObject({parkingSpaces:2,priceFrom:100,areaMin:40});
 const result = normalizeProperty({...base,parkingSpaces:2,plans:[{id:"a",area:40,price:100}]})!;
 expect(result.parkingSpaces).toBe(2);
 expect(result.plans[0].parkingSpaces).toBeUndefined();
});
it("combina planta antiga e pavimentos novos e mantém apresentação independente", () => {
 const img = (name:string) => ({src:`https://cdn.sanity.io/images/jn7uxitm/production/${name}.jpg`,alt:name});
 const result = normalizeProperty({...base,presentationImage:img('lazer'),plans:[{id:'a',area:40,price:100,image:img('terreo'),drawings:[img('terreo'),{...img('superior'),title:'Superior'}],photos:[img('sala')]}]})!;
 expect(result.plans[0].drawings).toHaveLength(2);
 expect(result.plans[0].drawings![1].title).toBe('Superior');
 expect(result.plans[0].photos).toHaveLength(1);
 expect(result.presentationImage?.src).toContain('lazer.jpg');
});
