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
