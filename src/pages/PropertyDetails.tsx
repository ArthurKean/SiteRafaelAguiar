import { Link, useParams } from "react-router-dom";
import { propertyService } from "../services/propertyService";
import { useAsync, useSeo } from "../utils/hooks";
import { PropertyGallery } from "../components/PropertyGallery";
import {
  PropertySpecs,
  PropertyPlanSelector,
  LocationSection,
} from "../components/PropertyDetails";
import { ContactCTA } from "../components/ContactCTA";
import { LoadingState, ErrorState } from "../components/PropertyCard";
import { currency } from "../utils/format";
import NotFound from "./NotFound";
export default function PropertyDetails() {
  const { slug = "" } = useParams();
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
        <span className="eyebrow">{p.status} · Demonstração</span>
        <h1>{p.name}</h1>
        <p>
          {p.neighborhood} · {p.city}, MA
        </p>
        <div className="detail-highlights">
          <span>
            {p.areaMin}–{p.areaMax} m²
          </span>
          <span>{p.suites} suítes</span>
          <span>{p.parkingSpaces} vagas</span>
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
        <aside className="investment">
          <span className="eyebrow">Investimento</span>
          <p>A partir de</p>
          <strong>{currency(p.priceFrom)}</strong>
          <p className="investment-note">
            Valor ilustrativo. Consulte as informações reais antes de tomar uma
            decisão.
          </p>
          <ContactCTA propertyName={p.name} className="button-whatsapp">
            Falar com Rafael
          </ContactCTA>
          <small>Converse pelo WhatsApp</small>
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
            Fotografia de referência, sem vínculo com o empreendimento.
          </small>
        </div>
      </section>
      <PropertyPlanSelector key={p.id} property={p} />
      <LocationSection property={p} />
      <section className="detail-contact">
        <div>
          <span className="eyebrow">Seu próximo passo</span>
          <h2>Ficou com alguma dúvida?</h2>
          <p>Converse com Rafael sobre este imóvel.</p>
        </div>
        <ContactCTA propertyName={p.name} />
      </section>
    </div>
  );
}
