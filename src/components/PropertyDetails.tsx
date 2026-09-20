import { area } from "../utils/format";
import type { Property, PropertyPlan } from "../types/property";
export function PropertySpecs({ property: p }: { property: Property }) {
  const specs = [
    [`${area(p.areaMin)}–${area(p.areaMax)} m²`, "Área privativa"],
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
export function PropertyPlanSelector({
  plans,
  selected,
  onSelect,
}: {
  plans: PropertyPlan[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <fieldset className="investment-plans">
      <legend>Escolha a metragem</legend>
      <div className="plan-tabs">
        {plans.map((plan) => (
          <button
            key={plan.id}
            type="button"
            className={plan.id === selected ? "selected" : ""}
            aria-pressed={plan.id === selected}
            onClick={() => onSelect(plan.id)}
          >
            {area(plan.area)} m²
          </button>
        ))}
      </div>
    </fieldset>
  );
}
export function PropertyPlanPreview({ plan }: { plan: PropertyPlan }) {
  if (!plan.image) return null;
  return (
    <section className="plan-section" id="planta-selecionada">
      <div>
        <span className="eyebrow">Encontre o seu espaço</span>
        <h2>Conheça a planta selecionada.</h2>
        <div className="plan-info">
          <h3>{area(plan.area)} m² de área privativa</h3>
          <p>
            {plan.bedrooms} quartos · {plan.suites} suítes · {plan.bathrooms}{" "}
            banheiros
          </p>
        </div>
      </div>
      <div className="plan-preview">
        <img src={plan.image.src} alt={plan.image.alt} loading="lazy" />
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
      {property.mapEmbedUrl ? (
        <div className="location-map">
          <iframe
            src={property.mapEmbedUrl}
            title={`Localização de ${property.name} no Google Maps`}
            width="1200"
            height="420"
            loading="eager"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
          <div className="location-map-footer">
            <p>{property.surroundings}</p>
            <a className="text-link" href={property.mapUrl} target="_blank" rel="noopener noreferrer">
              Abrir no Google Maps <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      ) : <div className="location-placeholder">
        <span className="location-marker" aria-hidden="true">
          ⌖
        </span>
        <h3>{property.neighborhood}</h3>
        <p>{property.city}</p>
        <span>{property.isDemo ? "Região de demonstração · Endereço a confirmar" : property.surroundings}</span>
      </div>}
    </section>
  );
}
