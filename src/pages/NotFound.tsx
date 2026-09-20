import { Link } from "react-router-dom";
import { useSeo } from "../utils/hooks";
export default function NotFound() {
  useSeo(
    "Página não encontrada",
    "Este endereço não está disponível. Explore o catálogo de imóveis.",
  );
  return (
    <div className="container empty-state not-found">
      <span className="eyebrow">404 · Endereço não encontrado</span>
      <h1>
        Vamos encontrar
        <br />
        outro caminho.
      </h1>
      <p>Esta página não existe ou o imóvel não está disponível.</p>
      <Link className="button" to="/imoveis">
        Explorar imóveis 
      </Link>
    </div>
  );
}
