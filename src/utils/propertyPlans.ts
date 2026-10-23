import type { Property, PropertyPlan } from "../types/property";

// Commercial references stay on the original plan for Rafael's WhatsApp enquiry.
export function planVariant(plan: PropertyPlan): string {
  const text = [plan.name ?? "", plan.suiteDescription ?? ""].join(" ");
  const labels: string[] = [];
  if (/cobertura/i.test(text)) labels.push("Cobertura");
  if (/duplex/i.test(text)) labels.push("Duplex");
  if (/sem piscina/i.test(text)) labels.push("Sem piscina");
  else if (/com piscina|piscina privativa/i.test(text)) labels.push("Com piscina");
  return labels.join(" · ");
}

export function publicPlans(plans: PropertyPlan[]): PropertyPlan[] {
  const groups = new Map<string, PropertyPlan>();
  for (const plan of plans) {
    // Preserve physically different layouts, but combine equivalent tower/unit offers.
    const key = JSON.stringify([plan.area, planVariant(plan), plan.bedrooms ?? null, plan.suites ?? null]);
    const existing = groups.get(key);
    if (!existing || plan.price < existing.price) groups.set(key, plan);
  }
  return [...groups.values()].sort((a, b) => a.price - b.price || a.area - b.area || a.id.localeCompare(b.id));
}

export function entryPlan(plans: PropertyPlan[]): PropertyPlan | undefined {
  return publicPlans(plans)[0];
}

export function entryProperty(property: Property): Property {
  const plan = entryPlan(property.plans);
  return plan ? {
    ...property, priceFrom: plan.price, areaMin: plan.area, areaMax: plan.area,
    bedrooms: plan.bedrooms, suites: plan.suites, suiteDescription: plan.suiteDescription,
    bathrooms: plan.bathrooms, parkingSpaces: plan.parkingSpaces,
  } : property;
}
