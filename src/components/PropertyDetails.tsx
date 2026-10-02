import { PropertyIcon } from "./PropertyIcon";
import { Icon } from "./Icon";
import { area, areaRange } from "../utils/format";
import { useState } from "react";
import type { Property, PropertyPlan } from "../types/property";
export function PropertySpecs({ property: p }: { property: Property }) {
  const specs = [
    [areaRange(p.areaMin, p.areaMax), "Área privativa"],
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
              <dt><PropertyIcon name={label === "Área privativa" ? "ruler" : label === "Vagas" ? "car-front" : label === "Banheiros" ? "bath" : "bed-double"} />{label}</dt>
              <dd>{v}</dd>
            </div>
          ))}
      </dl>
      <ul className="features-list">
        {p.features.map((f) => (
          <li key={f}>
            <span aria-hidden="true"><Icon name="check" /></span>
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
      <legend>Escolha a opção</legend>
      <div className="plan-tabs">
        {plans.map((plan) => (
          <button
            key={plan.id}
            type="button"
            className={plan.id === selected ? "selected" : ""}
            aria-pressed={plan.id === selected}
            onClick={() => onSelect(plan.id)}
          >
            {area(plan.area)} m²{plan.name ? ` · ${plan.name}` : plans.filter(p => p.area === plan.area).length > 1 ? ` · ${plan.unit || `Opção ${plans.indexOf(plan) + 1}`}` : ""}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
export function PropertyPlanPreview({ plan }: { plan: PropertyPlan }) {
  const drawings = plan.drawings?.length ? plan.drawings : plan.image ? [plan.image] : [];
  if (!drawings.length) return null;
  return (
    <section className="plan-section" id="planta-selecionada">
      <div>
        <span className="eyebrow">Encontre o seu espaço</span>
        <h2>Conheça a planta selecionada.</h2>
        <div className="plan-info">
          <h3>{area(plan.area)} m² de área privativa</h3>
          <p>
            {[plan.bedrooms != null ? `${plan.bedrooms} quartos` : null, plan.suiteDescription ?? (plan.suites != null ? `${plan.suites} suítes` : null), plan.bathrooms != null ? `${plan.bathrooms} banheiros` : null].filter(Boolean).join(" · ")}
          </p>
        </div>
      </div>
      <div className="plan-drawings">
        {drawings.map((image, index) => <figure className="plan-preview" key={image.src}>
          <a href={image.src} target="_blank" rel="noopener noreferrer" aria-label={`Ampliar ${image.title || `planta ${index + 1}`}`}>
            <img src={image.src} alt={image.alt} loading="lazy" />
          </a>
          <figcaption>{image.title || (drawings.length > 1 ? `Planta ${index + 1}` : 'Planta da opção')} · Toque para ampliar</figcaption>
        </figure>)}
      </div>
    </section>
  );
}
export function LocationSection({ property }: { property: Property }) {
  const [mapVersion, setMapVersion] = useState(0);
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
            key={mapVersion}
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
              Abrir no Google Maps 
            </a>
            <button type="button" className="map-retry" onClick={() => setMapVersion(value => value + 1)}>
              Mapa não apareceu? Recarregar
            </button>
          </div>
        </div>
      ) : <div className="location-placeholder">
        <span className="location-marker" aria-hidden="true">
          <Icon name="location" />
        </span>
        <h3>{property.neighborhood}</h3>
        <p>{property.city}</p>
        <span>{property.isDemo ? "Endereço a confirmar" : property.surroundings}</span>
      </div>}
    </section>
  );
}
