import { expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { PropertyPlanSelector } from "../components/PropertyDetails";
import { normalizeProperty } from "../services/sanity";
import { entryPlan, entryProperty, publicPlans } from "./propertyPlans";
import type { PropertyPlan } from "../types/property";

const plan = (id: string, area: number, price: number, extras: Partial<PropertyPlan> = {}): PropertyPlan =>
  ({ id, area, price, bedrooms: 3, suites: 2, ...extras });

it("groups equivalent towers and parking offers by lowest price, preserving originals", () => {
  const plans = [plan('a', 110, 1500000, { name: 'Torre 1', unit: '901', parkingSpaces: 3 }),
    plan('b', 110, 1300000, { name: 'Torre 2', unit: '102', parkingSpaces: 2 }), plan('c', 82, 1000000)];
  expect(publicPlans(plans).map(p => p.id)).toEqual(['c', 'b']);
  expect(plans).toHaveLength(3);
  expect(publicPlans(plans)[1]).toBe(plans[1]);
  expect(publicPlans(plans)[1].unit).toBe('102');
});

it("starts with the lowest price even when its area is larger", () => {
  expect(entryPlan([plan('small', 42.4, 715712), plan('cheap', 43.04, 710160)])?.id).toBe('cheap');
  expect(entryPlan([])).toBeUndefined();
});

it("preserves physical differences in pools, duplex and bedroom layouts", () => {
  const plans = [plan('a', 100, 900, { name: 'Sem piscina' }),
    plan('b', 100, 1000, { name: 'Com piscina' }), plan('c', 100, 1100, { name: 'Duplex' }),
    plan('d', 100, 1200, { bedrooms: 4 })];
  expect(publicPlans(plans)).toHaveLength(4);
});

it("shows area without tower/unit references and hides the single-option picker", () => {
  const plans = [plan('a', 100, 900, {name: 'Torre 1', unit: '102'}), plan('b', 110, 1000)];
  const html = renderToStaticMarkup(PropertyPlanSelector({plans, selected:'a', onSelect: () => {}}));
  expect(html).toContain('Escolha a metragem');
  expect(html).toContain('100 m\u00b2');
  expect(html).not.toMatch(/Torre|102/);
  expect(PropertyPlanSelector({plans: [plans[0]], selected:'a', onSelect: () => {}})).toBeNull();
});

it("aligns card features with the advertised entry price without changing filter ranges", () => {
  const property = normalizeProperty({id:'test', slug:'test', name:'Teste', plans: [
    plan('large', 110, 1500000, {bedrooms:4, bathrooms:5, parkingSpaces:3}),
    plan('cheap', 82, 1000000, {bedrooms:3, bathrooms:2, parkingSpaces:2}),
  ]})!;
  expect(entryProperty(property)).toMatchObject({priceFrom:1000000, areaMin:82, areaMax:82, bedrooms:3, bathrooms:2, parkingSpaces:2});
  expect(property.areaMax).toBe(110);
});
