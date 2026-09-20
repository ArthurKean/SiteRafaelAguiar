import { Icon } from "../components/Icon";
import { useCarousel } from "../utils/useCarousel";
import { useMediaQuery } from "../utils/useMediaQuery";
import { Link } from "react-router-dom";
import { propertyService } from "../services/propertyService";
import { useAsync, useSeo } from "../utils/hooks";
import {
  PropertyGrid,
  LoadingState,
  ErrorState,
} from "../components/PropertyCard";
import { SearchBar } from "../components/SearchBar";
import { AboutSection } from "../components/AboutSection";
export default function Home() {
  const mobile = useMediaQuery('(max-width: 600px)');
  const search = <section className="quick-search"><div className="container"><h2>Encontre o imóvel ideal para o seu momento</h2><SearchBar /></div></section>;
  useSeo(
    "Curadoria de Imóveis",
    "Conheça a curadoria de imóveis de Rafael Aguiar. Explore lançamentos e encontre opções para o seu momento.",
  );
  const {
    data: properties,
    loading,
    error,
  } = useAsync(() => propertyService.featured(), "featured");
  const { slide, setSlide, paused, setPaused, setHovered } = useCarousel(properties?.length ?? 0);
  const property = properties?.[slide];
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="gold-line" /> Lançamentos selecionados
            </span>
            <h1>
              Viva o<br />
              extraordinário
              <br />
              <em>em cada detalhe.</em>
            </h1>
            <p>
              Um novo endereço começa com uma boa escolha. Encontre o espaço que
              combina com o seu jeito de viver.
            </p>
            <Link className="button button-gold" to="/imoveis">
              Explore os imóveis 
            </Link>

          </div>
          {mobile && search}
          <div className="hero-visual"
            role="region" aria-roledescription="carrossel" aria-label="Imóveis em destaque"
            onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
            onFocusCapture={(event) => {
              if (!(event.target as HTMLElement).closest('.hero-controls')) setPaused(true);
            }}
          >
            <div
              className="hero-controls"
              aria-label="Empreendimentos em destaque"
              onFocusCapture={(event) => {
                if (!(event.target as HTMLElement).closest('.carousel-toggle') && !event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(true);
              }}
            >
              {properties?.map((p, i) => (
                <button
                  key={p.id}
                  aria-label={`Mostrar ${p.name}`}
                  aria-pressed={slide === i}
                  className={slide === i ? "selected" : ""}
                  onClick={() => setSlide(i)}
                >
                  <span />
                </button>
              ))}
              <span className="slide-count">
                0{slide + 1}
                <span> / 0{properties?.length ?? 3}</span>
              </span>
              {(properties?.length ?? 0) > 1 && <button
                className="carousel-toggle"
                onClick={() => setPaused(current => !current)}
                aria-label={paused ? 'Iniciar rotação automática' : 'Pausar rotação automática'}
              ><Icon name={paused ? "play" : "pause"} />{paused ? "Reproduzir" : "Pausar"}</button>}
            </div>
            {property && (
              <>
                <img
                  key={property.id}
                  src={property.images[0].src}
                  alt={property.images[0].alt}
                  fetchPriority="high"
                  width="1400"
                  height="1100"
                />
                <span className="hero-image-label">
                  Curadoria Rafael Aguiar
                </span>
                <Link
                  to={`/imoveis/${property.slug}`}
                  className="hero-property"
                >
                  <div>
                    <small>
                      {property.neighborhood} · {property.city}
                    </small>
                    <strong>{property.name}</strong>
                  </div>
                  
                </Link>
                <span className="hero-demo">
                  {property.isDemo ? "Empreendimento e imagem de demonstração" : "Perspectiva artística do empreendimento"}
                </span>
              </>
            )}
            {loading && <LoadingState />}
            {error && <ErrorState />}
          </div>
        </div>
      </section>
      {!mobile && search}
      <section className="section featured">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Uma seleção para você</span>
              <h2>Imóveis em destaque</h2>
              <p>Conheça os espaços. Imagine as possibilidades.</p>
            </div>
            <Link to="/imoveis" className="text-link">
              Ver todos os imóveis 
            </Link>
          </div>
          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState />
          ) : (
            <PropertyGrid properties={properties ?? []} />
          )}
          <p className="demo-caption">
            Os imóveis de demonstração estão identificados. Consulte disponibilidade e valores dos empreendimentos.
          </p>
        </div>
      </section>
      <AboutSection />
    </>
  );
}
