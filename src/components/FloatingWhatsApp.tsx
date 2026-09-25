import { buildWhatsAppUrl } from "../utils/contact";

export function FloatingWhatsApp() {
  const href = buildWhatsAppUrl();
  if (!href) return null;
  return (
    <a className="floating-whatsapp" href={href} target="_blank" rel="noopener noreferrer"
      aria-label="Conversar com Rafael no WhatsApp (abre em nova aba)">
      <span className="floating-whatsapp-label" aria-hidden="true">Fale com Rafael</span>
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-4.6a8.5 8.5 0 1 1 16.3-3.9Z" />
        <path d="M8.3 7.5c-.6 0-1.1.8-1.1 1.5 0 2.7 3.6 6.3 6.3 6.3.7 0 1.5-.5 1.5-1.1l-2-1.3-.9.8a8 8 0 0 1-3.8-3.8l.8-.9-1.3-2Z" />
      </svg>
    </a>
  );
}
