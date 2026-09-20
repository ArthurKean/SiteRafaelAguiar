import { Icon } from "./Icon";
import { area } from "../utils/format";
import { Link } from "react-router-dom";
import type { Property } from "../types/property";
import { currency } from "../utils/format";
export function PropertyCard({ property: p }: { property: Property }) {
  return (
    <article className="property-card">
      <Link
        to={`/imoveis/${p.slug}`}
        className="card-image"
        aria-label={`Conhecer ${p.name}`}
      >
        <img
          src={p.images[0].src}
          srcSet={`${p.images[0].src.replace(".webp", "-640.webp")} 640w, ${p.images[0].src} 1400w`}
          sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw"
          alt={p.images[0].alt}
          loading="lazy"
          width="640"
          height="460"
        />
        <span className="status">{p.isDemo ? `${p.status} · Demonstração` : (p.status ?? p.type)}</span>
        <span className="image-note">{p.isDemo ? "Imagem ilustrativa" : "Perspectiva artística"}</span>
      </Link>
      <div className="card-content">
        <p className="card-location">
          {p.neighborhood} · {p.city}
        </p>
        <h3>
          <Link to={`/imoveis/${p.slug}`}>{p.name}</Link>
        </h3>
        <div className="card-specs">
          <span>
            {area(p.areaMin)}–{area(p.areaMax)} m²
          </span>
          <span>{p.bedrooms} quartos</span>
          <span>{p.parkingSpaces} vagas</span>
        </div>
        <div className="card-bottom">
          <div>
            <small>A partir de</small>
            <strong>{currency(p.priceFrom)}</strong>
          </div>
          <Link
            to={`/imoveis/${p.slug}`}
            className="card-arrow"
            aria-label={`Ver detalhes de ${p.name}`}
          >
            Ver detalhes <span aria-hidden="true"><Icon name="arrowUpRight" /></span>
          </Link>
        </div>
      </div>
    </article>
  );
}
export function PropertyGrid({ properties }: { properties: Property[] }) {
  return (
    <div className="property-grid">
      {properties.map((p) => (
        <PropertyCard key={p.id} property={p} />
      ))}
    </div>
  );
}
export function LoadingState() {
  return (
    <div className="loading" role="status">
      <span />
      Carregando imóveis…
    </div>
  );
}
export function ErrorState() {
  return (
    <div className="empty-state" role="alert">
      <h2>Não foi possível carregar os imóveis.</h2>
      <p>Tente novamente em instantes.</p>
      <button className="button" onClick={() => window.location.reload()}>
        Tentar novamente
      </button>
    </div>
  );
}
