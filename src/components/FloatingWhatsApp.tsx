import { buildWhatsAppUrl } from "../utils/contact";

export function FloatingWhatsApp() {
  const href = buildWhatsAppUrl();
  if (!href) return null;
  return (
    <a className="floating-whatsapp" href={href} target="_blank" rel="noopener noreferrer"
      aria-label="Conversar com Rafael no WhatsApp (abre em nova aba)">
      <span className="floating-whatsapp-label" aria-hidden="true">Fale com Rafael</span>
      <img src="/images/whatsapp.svg" width="30" height="30" alt="" aria-hidden="true" />
    </a>
  );
}
