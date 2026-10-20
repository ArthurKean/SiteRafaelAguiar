export const currency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
export const area = (value: number) => new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 }).format(value);
export const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export const areaRange = (min: number, max: number) =>
  `${min === max ? area(min) : `${area(min)}–${area(max)}`} m²`;

// Grafias equivalentes devem compartilhar uma opção e o mesmo filtro.
export const neighborhoodKey = (value: string) =>
  normalize(value).replace(/[’‘`´']/g, "").replace(/\s+/g, " ").trim();
export const neighborhoodLabel = (value: string) =>
  neighborhoodKey(value).replace(/ /g, "") === "pontadareia"
    ? "Ponta d’Areia"
    : value.trim().replace(/\s+/g, " ");
