import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { ContactCTA } from "./ContactCTA";
export function Brand() {
  return (
    <Link to="/" className="brand" aria-label="Rafael Aguiar, início">
      <img src="/images/monograma.png" width="42" height="58" alt="" />
      <span>
        RAFAEL AGUIAR<small>CURADORIA DE IMÓVEIS</small>
      </span>
    </Link>
  );
}
export function Layout() {
  const [menu, setMenu] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setMenu(false);
    if (location.hash) {
      requestAnimationFrame(() =>
        document.getElementById(location.hash.slice(1))?.scrollIntoView(),
      );
    } else window.scrollTo({ top: 0 });
  }, [location.pathname, location.hash]);
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className="header">
        <div className="container header-inner">
          <Brand />
          <button
            className="menu-toggle icon-button"
            onClick={() => setMenu(!menu)}
            aria-expanded={menu}
            aria-controls="navigation"
            aria-label={menu ? "Fechar menu" : "Abrir menu"}
          >
            {menu ? "×" : "☰"}
          </button>
          <nav
            id="navigation"
            className={menu ? "navigation open" : "navigation"}
            aria-label="Navegação principal"
            onKeyDown={(e) => {
              if (e.key === "Escape") setMenu(false);
            }}
          >
            <NavLink to="/" end>
              Início
            </NavLink>
            <NavLink to="/imoveis">Imóveis</NavLink>
            <NavLink to="/sobre">Sobre</NavLink>
            <Link to="/#contato">Contato</Link>
            <ContactCTA />
          </nav>
        </div>
      </header>
      <main id="conteudo">
        <Outlet />
      </main>
      <footer id="contato" className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <Link to="/" className="footer-signature" aria-label="Rafael Aguiar, início">
                <span>Rafael Aguiar</span>
                <small>Curadoria de imóveis</small>
              </Link>
              <p>Corretor de imóveis · CRECI 8404</p>
              <p>
                Uma escolha importante.
                <br />
                Um olhar atento a cada detalhe.
              </p>
            </div>
            <div>
              <span className="eyebrow">Explore</span>
              <Link to="/">Início</Link>
              <Link to="/imoveis">Imóveis</Link>
              <Link to="/sobre">Sobre Rafael</Link>
            </div>
            <div>
              <span className="eyebrow">Vamos conversar</span>
              <p>
                Conte o que você procura
                <br />
                para o seu próximo momento.
              </p>
              <ContactCTA className="button-outline" />
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Rafael Aguiar</span>
            <span>
              Consulte disponibilidade e condições. Imóveis de demonstração estão identificados.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
