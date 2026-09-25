import { SocialContacts } from "./SocialContacts";
import { Link } from "react-router-dom";
export function AboutSection({ full = false }: { full?: boolean }) {
  return (
    <section className="about-section">
      <div className="container about-grid">
        <div className="portrait-wrap">
          <img
            src="/images/rafael.webp"
            alt="Rafael Aguiar"
            loading="lazy"
            width="640"
            height="800"
          />
          <div className="portrait-caption">
            <strong>Rafael Aguiar</strong>
            <span>Curadoria de imóveis</span>
          </div>
        </div>
        <div className="about-copy">
          <span className="eyebrow">Um olhar mais próximo</span>
          {full ? (
            <h1>Escolhas certas começam com uma boa curadoria.</h1>
          ) : (
            <h2>Escolhas certas começam com uma boa curadoria.</h2>
          )}
          <p>
            Encontrar um imóvel começa por entender o que faz sentido para você.
            Explore as opções, compare os detalhes e converse com Rafael sobre o
            que procura.
          </p>
          {full && (
            <p>
              Conheça os empreendimentos da curadoria e suas opções de metragem.
            </p>
          )}
          {full ? (
            <SocialContacts />
          ) : (
            <Link to="/sobre" className="text-link">
              Conheça Rafael 
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
