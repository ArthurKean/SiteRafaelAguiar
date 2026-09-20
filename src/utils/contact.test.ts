import { describe, expect, it } from "vitest";
import { buildWhatsAppUrl, getContactMessage } from "./contact";
import { vernazza } from "../data/vernazza";

describe("contato com a metragem selecionada", () => {
  it("inclui imóvel, área, unidade e posição da opção menor", () => {
    const url = new URL(buildWhatsAppUrl(vernazza.name, "5500000000000", vernazza.plans[0])!);
    const message = url.searchParams.get("text")!;
    expect(message).toContain("Vernazza Residenziale");
    expect(message).toContain("87,98 m²");
    expect(message).toContain("Unidade: S-101");
    expect(message).toContain("Posição: Norte");
    expect(message).toContain("disponibilidade e as condições de pagamento");
  });

  it("troca a área sem levar o código da unidade anterior", () => {
    const message = new URL(buildWhatsAppUrl(vernazza.name, "5500000000000", vernazza.plans[1])!).searchParams.get("text")!;
    expect(message).toContain("130,49 m²");
    expect(message).not.toContain("87,98");
    expect(message).not.toContain("S-101");
    expect(message).not.toContain("undefined");
  });

  it("preserva o contato genérico e não cria link sem número", () => {
    expect(getContactMessage()).not.toContain("m²");
    expect(buildWhatsAppUrl(vernazza.name, "", vernazza.plans[0])).toBeNull();
  });
});
