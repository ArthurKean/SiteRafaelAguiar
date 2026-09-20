// Sem número fictício: a V1 mostra uma mensagem explicativa até configurar o contato real.
export const contactConfig = {
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER?.trim() ?? "",
};
export function getContactMessage(propertyName?: string) {
  return propertyName
    ? `Olá Rafael, vi o ${propertyName} no seu site e gostaria de receber mais informações.`
    : "Olá Rafael, gostaria de conhecer os imóveis da sua curadoria.";
}
export function buildWhatsAppUrl(
  propertyName?: string,
  number = contactConfig.whatsappNumber,
): string | null {
  return /^\d{10,15}$/.test(number)
    ? `https://wa.me/${number}?text=${encodeURIComponent(getContactMessage(propertyName))}`
    : null;
}
