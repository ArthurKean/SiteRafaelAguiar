import { describe, expect, it } from "vitest";
import { propertyService } from "./propertyService";
import { buildWhatsAppUrl } from "../utils/contact";
describe("catálogo local", () => {
  it("rejeita intervalos invertidos e números inválidos recebidos pela URL", async () => {
    expect(await propertyService.list({ minPrice: '1700000', maxPrice: '1400000' })).toHaveLength(0);
    expect(await propertyService.list({ minArea: '-1' })).toHaveLength(0);
    expect(await propertyService.list({ minPrice: 'abc' })).toHaveLength(0);
  });
  it("disponibiliza seis imóveis e resolve todos os slugs", async () => {
    const properties = await propertyService.list();
    expect(properties).toHaveLength(6);
    for (const p of properties)
      expect((await propertyService.getBySlug(p.slug))?.id).toBe(p.id);
    expect(await propertyService.getBySlug("inexistente")).toBeUndefined();
  });
  it("combina filtros e ignora acentos na pesquisa", async () => {
    expect(
      await propertyService.list({
        query: "renascenca",
        maxPrice: "700000",
        bedrooms: "2",
        minArea: "80",
        city: "São Luís",
        neighborhood: "Renascença",
        type: "Apartamento",
        status: "Na planta",
      }),
    ).toHaveLength(1);
    expect(
      await propertyService.list({ maxPrice: "100", minArea: "999" }),
    ).toHaveLength(0);
    expect(await propertyService.list({ query: "  PENINSULA  " })).toHaveLength(
      1,
    );
  });
  it("considera a interseção da faixa de preço das unidades", async () => {
    expect(
      (
        await propertyService.list({ minPrice: "700000", maxPrice: "750000" })
      ).some((p) => p.slug === "reserva-renascenca"),
    ).toBe(true);
    expect(
      await propertyService.list({ type: "Cobertura", bedrooms: "4" }),
    ).toHaveLength(2);
  });
  it("ordena preços e áreas e limita os destaques", async () => {
    expect((await propertyService.list({ sort: "price-asc" }))[0].slug).toBe(
      "essenza-do-parque",
    );
    expect((await propertyService.list({ sort: "price-desc" }))[0].slug).toBe(
      "horizonte-do-mar",
    );
    expect((await propertyService.list({ sort: "area-desc" }))[0].areaMax).toBe(
      210,
    );
    expect((await propertyService.featured()).every((p) => p.featured)).toBe(
      true,
    );
  });
  it("não inventa contato e codifica a mensagem corretamente", () => {
    expect(buildWhatsAppUrl("Exemplo", "")).toBeNull();
    expect(buildWhatsAppUrl("Exemplo", "invalid")).toBeNull();
    const url = new URL(buildWhatsAppUrl("Exemplo & Teste", "5500000000000")!);
    expect(url.searchParams.get("text")).toBe(
      "Olá Rafael, vi o Exemplo & Teste no seu site e gostaria de receber mais informações.",
    );
  });
});
