import { expect, it } from "vitest";
import { bedroomDetails } from "./bedrooms";

it("explica quartos totais e suítes sem somar as duas quantidades", () => {
  expect(bedroomDetails({ bedrooms: 5, suites: 2 }).summary)
    .toBe("5 quartos no total · 3 quartos comuns + 2 suítes");
  expect(bedroomDetails({ bedrooms: 3, suites: 3 }).summary)
    .toBe("3 quartos no total · todos são suítes");
  expect(bedroomDetails({ bedrooms: 3, suites: 1, suiteDescription: "1 Suíte" }).summary)
    .toBe("3 quartos no total · 2 quartos comuns + 1 suíte");
});

it("não afirma um total contraditório quando suítes excedem quartos", () => {
  const rooms = bedroomDetails({ bedrooms: 2, suites: 3, suiteDescription: "3 suítes" });
  expect(rooms.total).toBeUndefined();
  expect(rooms.summary).toBe("3 suítes");
  expect(rooms.needsTotal).toBe(true);
});

it("omits commercial unit references from public room descriptions", () => {
  expect(bedroomDetails({suites:4, suiteDescription:"4 su\u00edtes, lavabo; valor de refer\u00eancia da unidade 102"}).summary)
    .toBe("4 su\u00edtes, lavabo");
  expect(bedroomDetails({suiteDescription:"Studio integrado. Refer\u00eancia unidade 806."}).summary)
    .toBe("Studio integrado");
  expect(bedroomDetails({suiteDescription:"Pre\u00e7o de refer\u00eancia da unidade 102."}).summary)
    .toBeUndefined();
});
