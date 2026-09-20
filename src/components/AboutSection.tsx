import { Link } from "react-router-dom";
import { ContactCTA } from "./ContactCTA";
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
              Este catálogo reúne exemplos de como os empreendimentos serão
              apresentados. Os dados reais e as informações profissionais do
              corretor serão incluídos após confirmação.
            </p>
          )}
          {full ? (
            <ContactCTA />
          ) : (
            <Link to="/sobre" className="text-link">
              Conheça Rafael <span aria-hidden="true">↗</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
