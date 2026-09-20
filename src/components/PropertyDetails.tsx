import { useState } from "react";
import type { Property } from "../types/property";
import { currency } from "../utils/format";
export function PropertySpecs({ property: p }: { property: Property }) {
  const specs = [
    [`${p.areaMin}–${p.areaMax} m²`, "Área privativa"],
    [p.bedrooms, "Quartos"],
    [p.suites, "Suítes"],
    [p.bathrooms, "Banheiros"],
    [p.parkingSpaces, "Vagas"],
  ];
  return (
    <>
      <dl className="specs">
        {specs
          .filter(([v]) => v !== undefined && v !== null)
          .map(([v, label]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{v}</dd>
            </div>
          ))}
      </dl>
      <ul className="features-list">
        {p.features.map((f) => (
          <li key={f}>
            <span aria-hidden="true">✓</span>
            {f}
          </li>
        ))}
      </ul>
    </>
  );
}
export function PropertyPlanSelector({ property }: { property: Property }) {
  const [selected, setSelected] = useState(property.plans[0]?.id);
  const plan = property.plans.find((p) => p.id === selected);
  if (!plan) return null;
  return (
    <section className="plan-section">
      <div>
        <span className="eyebrow">Encontre o seu espaço</span>
        <h2>Uma planta para o seu momento.</h2>
        <p>Compare as configurações disponíveis neste exemplo.</p>
        <div className="plan-tabs" aria-label="Opções de planta">
          {property.plans.map((p) => (
            <button
              className={p.id === selected ? "selected" : ""}
              aria-pressed={p.id === selected}
              key={p.id}
              onClick={() => setSelected(p.id)}
            >
              {p.area} m²
            </button>
          ))}
        </div>
        <div aria-live="polite" className="plan-info">
          <h3>{plan.area} m² de área privativa</h3>
          <p>
            {plan.bedrooms} quartos · {plan.suites} suítes · {plan.bathrooms}{" "}
            banheiros
          </p>
          <p>
            A partir de <strong>{currency(plan.price)}</strong>
          </p>
        </div>
      </div>
      <div className="plan-preview">
        {plan.image ? (
          <img src={plan.image.src} alt={plan.image.alt} loading="lazy" />
        ) : (
          <>
            <span className="plan-area">
              {plan.area}
              <small>m²</small>
            </span>
            <p>Desenho da planta ainda não disponível</p>
            <small>
              Configuração ilustrativa. Aguarda material do empreendimento.
            </small>
          </>
        )}
      </div>
    </section>
  );
}
export function LocationSection({ property }: { property: Property }) {
  return (
    <section className="location-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">O entorno também importa</span>
          <h2>Localização</h2>
        </div>
        <p>
          {property.neighborhood} · {property.city}
        </p>
      </div>
      <div className="location-placeholder">
        <span className="location-marker" aria-hidden="true">
          ⌖
        </span>
        <h3>{property.neighborhood}</h3>
        <p>{property.city}</p>
        <span>Região de demonstração · Endereço a confirmar</span>
      </div>
    </section>
  );
}
