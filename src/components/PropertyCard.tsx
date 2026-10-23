import { cardImageSet } from "../services/sanity";
import { useRef, useState } from "react";
import { Watermark } from "./Watermark";
import { PropertyIcon } from "./PropertyIcon";
import { FavoriteButton } from "./Favorites";
import { areaRange } from "../utils/format";
import { Link } from "react-router-dom";
import type { Property } from "../types/property";
import { currency } from "../utils/format";
import { entryProperty } from "../utils/propertyPlans";
export function PropertyCard({ property: p }: { property: Property }) {
  const offer = entryProperty(p);
  const [photo, setPhoto] = useState(0);
  const touch = useRef({x: 0, y: 0, moved: false});
  const move = (amount: number) => setPhoto(i => (i + amount + p.images.length) % p.images.length);
  return (
    <article className="property-card">
      <div className="card-visual">
      <Link
        to={`/imoveis/${p.slug}`}
        className="card-image"
        aria-label={`Conhecer ${p.name}`}
        onTouchStart={e => { touch.current = {x:e.touches[0].clientX,y:e.touches[0].clientY,moved:false}; }}
        onTouchEnd={e => { const dx=e.changedTouches[0].clientX-touch.current.x; const dy=e.changedTouches[0].clientY-touch.current.y; if (Math.abs(dx)>45 && Math.abs(dx)>Math.abs(dy)) { touch.current.moved=true; move(dx<0?1:-1); } }}
        onClick={e => { if(touch.current.moved) { e.preventDefault(); touch.current.moved=false; } }}
      >
        <img
          src={p.images[photo].src}
          srcSet={cardImageSet(p.images[photo].src)}
          sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw"
          alt={p.images[photo].alt}
          loading="lazy"
          width="640"
          height="460"
        />
        <Watermark />
        <span className="status">{p.status ?? p.type}</span>
      </Link>
      {p.images.length > 1 && <>
        <button type="button" className="card-photo-nav previous" aria-label={`Foto anterior de ${p.name}`} onClick={() => move(-1)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 6-6 6 6 6" /></svg></button>
        <button type="button" className="card-photo-nav next" aria-label={`Próxima foto de ${p.name}`} onClick={() => move(1)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m10 6 6 6-6 6" /></svg></button>
        <span className="card-photo-count" aria-live="polite">{photo+1}/{p.images.length}</span>
      </>}
      <FavoriteButton id={p.id} name={p.name} />
      </div>
      <div className="card-content">
        <p className="card-location">
          {p.neighborhood} · {p.city}
        </p>
        <h3>
          <Link to={`/imoveis/${p.slug}`}>{p.name}</Link>
        </h3>
        <div className="card-specs">
          <span>
            <PropertyIcon name="ruler" />{areaRange(offer.areaMin, offer.areaMax)}
          </span>
          {offer.bedrooms != null ? (
            <span><PropertyIcon name="bed-double" />{offer.bedrooms} {offer.bedrooms === 1 ? "quarto" : "quartos"}</span>
          ) : null}
          {offer.bathrooms != null && <span><PropertyIcon name="bath" />{offer.bathrooms} banheiros</span>}
          {offer.parkingSpaces != null && <span><PropertyIcon name="car-front" />{offer.parkingSpaces} vagas</span>}
        </div>
        <div className="card-bottom">
          <div>
            <small>A partir de</small>
            <strong>{currency(offer.priceFrom)}</strong>
          </div>
          <Link
            to={`/imoveis/${p.slug}`}
            className="card-arrow"
            aria-label={`Ver detalhes de ${p.name}`}
          >
            Ver imóvel
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
