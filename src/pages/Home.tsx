import { useCarousel } from "../utils/useCarousel";
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
  useSeo(
    "Curadoria de Imóveis",
    "Conheça a curadoria de imóveis de Rafael Aguiar. Explore lançamentos e encontre opções para o seu momento.",
  );
  const {
    data: properties,
    loading,
    error,
  } = useAsync(() => propertyService.featured(), "featured");
  const slides = (properties ?? []).filter(p => !p.isDemo).flatMap(p =>
    p.images.slice(0, 3).map(image => ({ ...image, propertyName: p.name }))
  );
  const { slide, setSlide, paused, setPaused, setHovered } = useCarousel(slides.length);
  const active = slides[slide % Math.max(slides.length, 1)];
  return (
    <>
      <section className="immersive-hero" aria-label="Imóveis em destaque"
        aria-roledescription="carrossel"
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        onFocusCapture={() => setPaused(true)}>
        <div className="immersive-backdrop">
          {slides.map((image, i) => (
            <img key={image.src} src={image.src} alt="" aria-hidden="true"
              className={i === slide % slides.length ? "is-active" : ""}
              fetchPriority={i === 0 ? "high" : "auto"} />
          ))}
        </div>
        <div className="container immersive-content">
          {slides.length > 1 && <div className="immersive-dots" aria-label="Selecionar imagem">
            {slides.map((image, i) => <button key={image.src} type="button"
              aria-label={`Mostrar imagem ${i + 1} de ${image.propertyName}`}
              aria-pressed={i === slide % slides.length}
              onClick={() => { setSlide(i); setPaused(true); }}><span /></button>)}
            <button className="carousel-accessible-toggle" type="button"
              onClick={() => setPaused(current => !current)}>
              {paused ? "Iniciar rotação automática" : "Pausar rotação automática"}
            </button>
          </div>}
          <div className="immersive-copy">
            <h1>Seu próximo endereço começa <em>com uma boa conversa.</em></h1>
            <p>Imóveis em São Luís para morar ou investir.</p>
          </div>
          <section className="immersive-search" aria-label="Buscar imóveis">
            <h2>Encontre o imóvel ideal para o seu momento</h2>
            <SearchBar />
          </section>
          {active && <p className="immersive-caption">{active.propertyName}</p>}
        </div>
      </section>
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
        </div>
      </section>
      <AboutSection />
    </>
  );
}
