import { loadProperties } from "./sanity";
import type { Property, PropertyFilters } from "../types/property";
import { normalize, neighborhoodKey, neighborhoodLabel } from "../utils/format";

export function filterProperties(
  properties: Property[],
  filters: PropertyFilters = {},
) {
  const numericFilters = [
    filters.minPrice,
    filters.maxPrice,
    filters.bedrooms,
    filters.minArea,
  ];
  if (
    numericFilters.some(
      (value) =>
        value && (!Number.isFinite(Number(value)) || Number(value) < 0),
    )
  )
    return [];
  if (
    filters.minPrice &&
    filters.maxPrice &&
    Number(filters.minPrice) > Number(filters.maxPrice)
  )
    return [];
  const result = properties.filter((p) => {
    const text = normalize(`${p.name} ${p.neighborhood} ${p.city}`);
    return (
      (!filters.query || text.includes(normalize(filters.query.trim()))) &&
      (!filters.city || p.city === filters.city) &&
      (!filters.neighborhood || neighborhoodKey(neighborhoodLabel(p.neighborhood)) === neighborhoodKey(neighborhoodLabel(filters.neighborhood))) &&
      (!filters.type || p.type === filters.type) &&
      (!filters.status || p.status === filters.status) &&
      (!filters.minPrice || p.priceTo >= Number(filters.minPrice)) &&
      (!filters.maxPrice || p.priceFrom <= Number(filters.maxPrice)) &&
      (!filters.bedrooms || (p.bedrooms ?? -1) >= Number(filters.bedrooms)) &&
      (!filters.minArea || p.areaMax >= Number(filters.minArea))
    );
  });
  return result.sort((a, b) =>
    filters.sort === "price-asc"
      ? a.priceFrom - b.priceFrom
      : filters.sort === "price-desc"
        ? b.priceFrom - a.priceFrom
        : filters.sort === "area-desc"
          ? b.areaMax - a.areaMax
          : b.createdAt.localeCompare(a.createdAt),
  );
}
// Catálogo publicado no Sanity, sem dados locais de demonstração.
export const propertyService = {
  async list(filters: PropertyFilters = {}): Promise<Property[]> {
    return filterProperties(await loadProperties(), filters);
  },
  async featured(): Promise<Property[]> {
    return (await loadProperties()).filter((p) => p.featured);
  },
  async getBySlug(slug: string): Promise<Property | undefined> {
    return (await loadProperties()).find((p) => p.slug === slug);
  },
  async options() {
    const properties = await loadProperties();
    return {
      cities: [...new Set(properties.map((p) => p.city))],
      neighborhoods: [...new Map(properties.map((p) => {
        const label = neighborhoodLabel(p.neighborhood);
        return [neighborhoodKey(label), label];
      })).values()],
      types: [...new Set(properties.map((p) => p.type))],
      statuses: [...new Set(properties.flatMap((p) => p.status ? [p.status] : []))],
    };
  },
};
