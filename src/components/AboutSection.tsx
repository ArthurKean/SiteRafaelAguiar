import { SocialContacts } from "./SocialContacts";
export function AboutSection() {
  return (
    <section id="sobre" className="about-section" aria-labelledby="sobre-title">
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
            <span>Corretor de imóveis · CRECI 8404</span>
          </div>
        </div>
        <div className="about-copy">
          <span className="eyebrow">Sobre Rafael</span>
          <h2 id="sobre-title">Escolhas certas começam com uma boa curadoria.</h2>
          <p>
            Para Rafael Aguiar, encontrar um imóvel começa com uma boa conversa.
            Seu atendimento parte de ouvir você, entender seu momento e conhecer
            o que importa na escolha de um lugar para morar ou investir em São Luís.
          </p>
          <p>
            A partir disso, ele ajuda você a comparar os imóveis, esclarecer dúvidas
            e avaliar as opções com atenção às suas necessidades.
          </p>
          <SocialContacts />
        </div>
      </div>
    </section>
  );
}
