import { Icon } from "./Icon";
import { useState } from "react";
import { buildWhatsAppUrl, getContactMessage } from "../utils/contact";
import type { ContactPlan } from "../utils/contact";
import { Modal } from "./Modal";
export function ContactCTA({
  propertyName,
  plan,
  children = "Falar com Rafael",
  className = "",
}: {
  propertyName?: string;
  plan?: ContactPlan;
  children?: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const url = buildWhatsAppUrl(propertyName, undefined, plan);
  return (
    <>
      {url ? (
        <a
          className={`button ${className}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
          <span aria-hidden="true"><Icon name="arrowUpRight" /></span>
        </a>
      ) : (
        <button className={`button ${className}`} onClick={() => setOpen(true)}>
          {children}
          <span aria-hidden="true"><Icon name="arrowUpRight" /></span>
        </button>
      )}
      {open && (
        <Modal title="Contato com Rafael" onClose={() => setOpen(false)}>
          <p>
            O WhatsApp ainda não está disponível nesta versão de demonstração.
          </p>
          <p>
            Assim que o contato for configurado, você poderá enviar esta
            mensagem:
          </p>
          <blockquote>{getContactMessage(propertyName, plan)}</blockquote>
          <button className="button" onClick={() => setOpen(false)}>
            Voltar ao site
          </button>
        </Modal>
      )}
    </>
  );
}
