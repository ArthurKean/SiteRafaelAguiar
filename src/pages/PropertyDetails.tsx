import { PropertyIcon } from "../components/PropertyIcon";
import { FavoriteButton } from "../components/Favorites";
import { area, areaRange } from "../utils/format";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { propertyService } from "../services/propertyService";
import { useAsync, useSeo } from "../utils/hooks";
import { PropertyGallery } from "../components/PropertyGallery";
import {
  PropertySpecs,
  PropertyPlanSelector,
  PropertyPlanPreview,
  LocationSection,
} from "../components/PropertyDetails";
import { ContactCTA } from "../components/ContactCTA";
import { LoadingState, ErrorState } from "../components/PropertyCard";
import { currency } from "../utils/format";
import { bedroomDetails } from "../utils/bedrooms";
import { publicPlans } from "../utils/propertyPlans";
import NotFound from "./NotFound";
export default function PropertyDetails() {
  const { slug = "" } = useParams();
  const [selection, setSelection] = useState({ slug: "", planId: "" });
  const {
    data: p,
    loading,
    error,
  } = useAsync(() => propertyService.getBySlug(slug), slug);
  useSeo(
    p?.name ?? "Imóvel",
    p?.description ?? "Conheça os detalhes do empreendimento.",
    p?.images[0].src,
  );
  if (loading) return <LoadingState />;
  if (error) return <ErrorState />;
  if (!p) return <NotFound />;
  const options = publicPlans(p.plans);
  const plan =
    options.find(
      (item) => selection.slug === slug && item.id === selection.planId,
    ) ?? options[0];
  const presentation = p.presentationImage ?? p.images[1];
  const selectedProperty = plan ? {...p, areaMin: plan.area, areaMax: plan.area, bedrooms: plan.bedrooms, suites: plan.suites, suiteDescription: plan.suiteDescription, bathrooms: plan.bathrooms, parkingSpaces: plan.parkingSpaces} : p;
  const rooms = bedroomDetails(selectedProperty);
  return (
    <div className="container detail-page">
      <nav className="breadcrumbs" aria-label="Caminho de navegação">
        <Link to="/">Início</Link>
        <span>/</span>
        <Link to="/imoveis">Imóveis</Link>
        <span>/</span>
        <span>{p.name}</span>
      </nav>
      <PropertyGallery property={p} />
      <div className="detail-heading">
        <span className="eyebrow">{p.developer ?? p.status}</span>
        <div className="detail-title-row"><h1>{p.name}</h1><FavoriteButton id={p.id} name={p.name} label /></div>
        <p>
          {p.neighborhood} · {p.city}, MA
        </p>
        <div className="detail-highlights">
          <span>
            <PropertyIcon name="ruler" />{areaRange(selectedProperty.areaMin, selectedProperty.areaMax)}
          </span>
          {rooms.summary && <span><PropertyIcon name="bed-double" />{rooms.summary}</span>}
          {selectedProperty.bathrooms != null && <span><PropertyIcon name="bath" />{selectedProperty.bathrooms} banheiros</span>}
          {selectedProperty.parkingSpaces != null && <span><PropertyIcon name="car-front" />{selectedProperty.parkingSpaces} vagas</span>}
          <span>{p.type}</span>
        </div>
      </div>
      <div className="detail-columns">
        <div>
          <section>
            <h2>Descrição do empreendimento</h2>
            <p className="description">{p.description}</p>
          </section>
          <section className="spec-section">
            <h3>{plan ? "Características da opção selecionada" : "Os detalhes fazem a diferença"}</h3>
            <PropertySpecs property={selectedProperty} />
          </section>
        </div>
        <aside className="detail-sidebar">
        <div className="investment">
          <span className="eyebrow">Investimento</span>
          {plan && (
            <PropertyPlanSelector
              plans={options}
              selected={plan.id}
              onSelect={(planId) => setSelection({ slug, planId })}
            />
          )}
          <div
            className="investment-value"
            aria-live="polite"
            aria-atomic="true"
          >
            {plan && (
              <p className="investment-summary">
                {[`${area(plan.area)} m²`, rooms.summary, plan.bathrooms != null ? `${plan.bathrooms} banheiros` : null, plan.parkingSpaces != null ? `${plan.parkingSpaces} vagas` : null].filter(Boolean).join(" · ")}
              </p>
            )}
            <p>A partir de</p>
            <strong>{currency(plan?.price ?? p.priceFrom)}</strong>
          </div>
          <div className="investment-notice">
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 11v6M12 7v2" />
            </svg>
            <div>
              <strong>Confirme o valor atualizado</strong>
              <p>Preços e disponibilidade podem mudar. Consulte Rafael para confirmar o valor da opção escolhida e as condições de pagamento.</p>
            </div>
          </div>
          {(plan?.image || !!plan?.drawings?.length) && (
            <a href="#planta-selecionada" className="text-link">
              Ver planta 
            </a>
          )}
          <ContactCTA propertyName={p.name} plan={plan ?? {area: p.areaMin}} className="button-whatsapp">
            Consultar valor e disponibilidade
          </ContactCTA>
          <small>Converse pelo WhatsApp</small>
        </div>
        <LocationSection property={p} />
        </aside>
      </div>
      {presentation && <section className="editorial-section">
        <img
          src={presentation.src}
          alt={presentation.alt}
          loading="lazy"
          width="1400"
          height="800"
        />
        <div>
          <h2>
            Conheça os ambientes.
          </h2>
          <p>
            Veja os espaços e converse com Rafael sobre o que você procura.
          </p>
        </div>
      </section>
      }
      {plan && <PropertyPlanPreview plan={plan} />}
      {!!plan?.photos?.length && <section className="option-photos">
        <h2>Fotos da opção selecionada</h2>
        <PropertyGallery key={plan.id} property={{...p, name: `${p.name} · ${plan.name || `${area(plan.area)} m²`}`, images: plan.photos}} />
      </section>}
    </div>
  );
}
