import type { Property, PropertyImage, PropertyPlan } from "../types/property";

// Public identifiers only. Never put write tokens in VITE_* variables.
const project = import.meta.env.VITE_SANITY_PROJECT_ID || "jn7uxitm";
const dataset = import.meta.env.VITE_SANITY_DATASET || "production";
const query = `*[_type == "imovel" && ativo != false && defined(slug.current)] | order(_createdAt desc) {
  "id": _id, "slug": slug.current, "createdAt": _createdAt,
  "name": titulo, "description": descricao, "shortDescription": descricaoCurta,
  "priceFrom": preco, "priceTo": precoMaximo, "areaMin": area, "areaMax": areaMaxima,
  "bedrooms": quartos, "bathrooms": banheiros, "suites": suites,
  "suiteDescription": descricaoSuites, "parkingSpaces": vagas, "type": tipo,
  status, "developer": construtora, "surroundings": entorno, "deliveryDate": entrega,
  "mapUrl": mapaUrl, "mapEmbedUrl": mapaEmbedUrl,
  "latitude": coordenadas.lat, "longitude": coordenadas.lng,
  "city": cidade, "neighborhood": bairro, "featured": destaque, "isDemo": demonstracao,
  "features": comodidades,
  "presentationImage": imagemApresentacao {"src": asset->url, alt},
  "cover": imagemPrincipal {"src": asset->url, alt},
  "images": galeria[] {"src": asset->url, alt},
  "plans": plantas[] {"id": _key, "name": nome, "parkingSpaces": vagas,
    "drawings": desenhos[] {"src": asset->url, alt, "title": titulo},
    "photos": fotos[] {"src": asset->url, alt, "title": titulo}, "area": area, "price": preco,
    "bedrooms": quartos, "suites": suites, "bathrooms": banheiros,
    "suiteDescription": descricaoSuites, "unit": unidade, "orientation": orientacao,
    "image": imagem {"src": asset->url, alt}}
}`;
type RecordData = Partial<Omit<Property, "images" | "plans">> & {
  cover?: Partial<PropertyImage>; images?: Partial<PropertyImage>[]; plans?: Partial<PropertyPlan>[];
};
const number = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value) && value >= 0;
function picture(value: Partial<PropertyImage> | undefined, name: string): PropertyImage | undefined {
  if (!value?.src || !value.src.startsWith("https://cdn.sanity.io/images/")) return;
  const url = new URL(value.src);
  url.searchParams.set("w", "1400"); url.searchParams.set("fit", "max"); url.searchParams.set("auto", "format"); url.searchParams.set("q", "80");
  return {src: url.toString(), alt: value.alt || value.title || name, title: value.title};
}
export function normalizeProperty(p: RecordData): Property | undefined {
  if (!p.id || !p.slug || !p.name) return;
  const plans = (p.plans ?? []).filter(plan => plan.id && number(plan.area) && number(plan.price)).map(plan => {
    const image = picture(plan.image, `Planta de ${p.name}`);
    const drawings = [image, ...(plan.drawings ?? []).map(img => picture(img, `Planta de ${p.name}`))]
      .filter((img): img is PropertyImage => !!img)
      .filter((img, i, all) => all.findIndex(other => other.src === img.src) === i);
    return {...plan, image, drawings,
      photos: (plan.photos ?? []).map(img => picture(img, p.name!)).filter((img): img is PropertyImage => !!img),
    } as PropertyPlan;
  });
  const maximum = (key: 'bedrooms' | 'suites' | 'bathrooms' | 'parkingSpaces') => {
    const values = plans.map(plan => plan[key]).filter(number);
    return values.length ? Math.max(...values) : p[key];
  };
  const areas = plans.map(plan => plan.area);
  const prices = plans.map(plan => plan.price);
  const areaMin = areas.length ? Math.min(...areas) : p.areaMin;
  const priceFrom = prices.length ? Math.min(...prices) : p.priceFrom;
  if (!number(areaMin) || !number(priceFrom)) return;
  const images = [p.cover, ...(p.images ?? [])].map(img => picture(img, p.name!)).filter((img): img is PropertyImage => !!img);
  const unique = images.filter((img, i) => images.findIndex(other => other.src === img.src) === i);
  return {
    ...p, id:p.id, slug:p.slug, name:p.name, description:p.description || "", shortDescription:p.shortDescription || "",
    areaMin, areaMax:areas.length ? Math.max(...areas) : Math.max(areaMin, p.areaMax ?? areaMin),
    priceFrom, priceTo:prices.length ? Math.max(...prices) : Math.max(priceFrom, p.priceTo ?? priceFrom),
    city:p.city || "São Luís", neighborhood:p.neighborhood || "", type:p.type || "Imóvel",
    featured:p.featured === true, isDemo:p.isDemo === true, createdAt:p.createdAt || "",
    features:p.features ?? [], plans,
    bedrooms: maximum('bedrooms'), suites: maximum('suites'),
    bathrooms: maximum('bathrooms'), parkingSpaces: maximum('parkingSpaces'),
    presentationImage: picture(p.presentationImage, `Apresentação de ${p.name}`),
    images:unique.length ? unique : [{src:"/images/property-placeholder.svg",alt:"Imagem do imóvel ainda não disponível"}],
    mapEmbedUrl:p.mapEmbedUrl && /^https:\/\/(?:(?:www\.)?google\.com\/maps\/embed(?:[/?]|$)|maps\.google\.com\/maps\?)/.test(p.mapEmbedUrl) ? p.mapEmbedUrl : undefined,
  };
}
let pending: Promise<Property[]> | undefined;
export function loadProperties(): Promise<Property[]> {
  // Deduplicate simultaneous catalog/filter requests, without keeping stale listings.
  if (pending) return pending;
  const url = new URL(`https://${project}.api.sanity.io/v2026-09-27/data/query/${dataset}`);
  url.searchParams.set("query", query); url.searchParams.set("perspective", "published");
  pending = fetch(url, {signal: AbortSignal.timeout(15000)}).then(async response => {
    if (!response.ok) throw new Error(`Sanity: ${response.status}`);
    const body = await response.json();
    if (!Array.isArray(body.result)) throw new Error("Resposta inválida do catálogo");
    return (body.result as RecordData[]).map(normalizeProperty).filter((p): p is Property => !!p);
  }).finally(() => { pending = undefined; });
  return pending;
}
export function cardImageSet(src: string): string | undefined {
  if (src.startsWith("https://cdn.sanity.io/images/")) {
    const small = new URL(src); small.searchParams.set("w", "640");
    return `${small} 640w, ${src} 1400w`;
  }
  return src.endsWith(".webp") ? `${src.replace(".webp", "-640.webp")} 640w, ${src} 1400w` : undefined;
}
