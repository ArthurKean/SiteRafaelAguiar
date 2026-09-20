import type { PropertyPlan } from "../types/property";
import { area } from "./format";

export type ContactPlan = Pick<PropertyPlan, "area" | "unit" | "orientation">;

// Número confirmado pelo responsável, com código do Brasil e DDD, sem acrescentar dígitos.
export const contactConfig = {
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER?.trim() || "559891588444",
};
export function getContactMessage(propertyName?: string, plan?: ContactPlan) {
  if (!propertyName) return "Olá Rafael, gostaria de conhecer os imóveis da sua curadoria.";
  if (!plan) return `Olá Rafael, vi o ${propertyName} no seu site e gostaria de receber mais informações.`;
  return [
    `Olá Rafael! Vi o ${propertyName} no seu site e tenho interesse na opção de ${area(plan.area)} m².`,
    plan.unit ? `Unidade: ${plan.unit}.` : null,
    plan.orientation ? `Posição: ${plan.orientation}.` : null,
    "Você pode me informar a disponibilidade e as condições de pagamento?",
  ].filter(Boolean).join("\n");
}
export function buildWhatsAppUrl(
  propertyName?: string,
  number = contactConfig.whatsappNumber,
  plan?: ContactPlan,
): string | null {
  return /^\d{10,15}$/.test(number)
    ? `https://wa.me/${number}?text=${encodeURIComponent(getContactMessage(propertyName, plan))}`
    : null;
}
