import { PropertyIcon } from "../components/PropertyIcon";
import { FavoriteButton } from "../components/Favorites";
import { area } from "../utils/format";
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
  const plan =
    p.plans.find(
      (item) => selection.slug === slug && item.id === selection.planId,
    ) ?? p.plans[0];
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
        <span className="eyebrow">{p.isDemo ? `${p.status} · Demonstração` : p.developer}</span>
        <div className="detail-title-row"><h1>{p.name}</h1><FavoriteButton id={p.id} name={p.name} label /></div>
        <p>
          {p.neighborhood} · {p.city}, MA
        </p>
        <div className="detail-highlights">
          <span>
            <PropertyIcon name="ruler" />{area(p.areaMin)}–{area(p.areaMax)} m²
          </span>
          <span><PropertyIcon name="bed-double" />{p.suiteDescription ?? `${p.suites} suítes`}</span>
          {p.bathrooms != null && <span><PropertyIcon name="bath" />{p.bathrooms} banheiros</span>}
          <span><PropertyIcon name="car-front" />{p.parkingSpaces} vagas</span>
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
            <h3>Os detalhes fazem a diferença</h3>
            <PropertySpecs property={p} />
          </section>
        </div>
        <aside className="detail-sidebar">
        <div className="investment">
          <span className="eyebrow">Investimento</span>
          {plan && (
            <PropertyPlanSelector
              plans={p.plans}
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
                {[`${area(plan.area)} m²`, plan.suiteDescription ?? `${plan.suites} suítes`, plan.bathrooms ? `${plan.bathrooms} banheiros` : null, plan.unit ? `Unidade ${plan.unit}` : null, plan.orientation ? `Posição ${plan.orientation}` : null].filter(Boolean).join(" · ")}
              </p>
            )}
            <p>A partir de</p>
            <strong>{currency(plan?.price ?? p.priceFrom)}</strong>
          </div>
          {plan?.image && (
            <a href="#planta-selecionada" className="text-link">
              Ver planta 
            </a>
          )}
          <p className="investment-note">
            {p.isDemo ? "Valor ilustrativo. Consulte as informações reais antes de tomar uma decisão." : "Consulte disponibilidade e condições de pagamento."}
          </p>
          <ContactCTA propertyName={p.name} plan={plan} className="button-whatsapp">
            Falar com Rafael
          </ContactCTA>
          <small>Converse pelo WhatsApp</small>
        </div>
        <LocationSection property={p} />
        </aside>
      </div>
      <section className="editorial-section">
        <img
          src={p.images[1].src}
          alt={p.images[1].alt}
          loading="lazy"
          width="1400"
          height="800"
        />
        <div>
          <span className="eyebrow">Espaço para o cotidiano</span>
          <h2>
            Imagine os seus dias
            <br />
            em um novo lugar.
          </h2>
          <p>
            Observe os ambientes, compare as opções e reserve um tempo para
            escolher.
          </p>
          <small>
            {p.isDemo ? "Fotografia de referência, sem vínculo com o empreendimento." : "Perspectiva artística do Vernazza Residenziale."}
          </small>
        </div>
      </section>
      {plan && <PropertyPlanPreview plan={plan} />}
      <section className="detail-contact">
        <div>
          <span className="eyebrow">Seu próximo passo</span>
          <h2>Ficou com alguma dúvida?</h2>
          <p>Converse com Rafael sobre este imóvel.</p>
        </div>
        <ContactCTA propertyName={p.name} plan={plan} />
      </section>
    </div>
  );
}
