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
          <h2 id="sobre-title">Conheça Rafael Aguiar</h2>
          <p>
            São 17 anos de experiência em vendas e uma preferência pelo que faz
            diferença no atendimento: conversar e ouvir.
          </p>
          <p>
            Rafael gosta de entender o que você procura, responder às suas dúvidas
            e acompanhar a escolha de perto. Em São Luís, ajuda você a comparar
            imóveis para morar ou investir, com atenção às suas prioridades e
            agilidade no retorno.
          </p>
          <p>Conte ao Rafael o que você está procurando.</p>
          <SocialContacts />
        </div>
      </div>
    </section>
  );
}
