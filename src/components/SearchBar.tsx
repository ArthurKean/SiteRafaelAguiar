import { useNavigate } from "react-router-dom";
import { propertyService } from "../services/propertyService";
import { useAsync } from "../utils/hooks";
export function SearchBar() {
  const navigate = useNavigate();
  const { data } = useAsync(() => propertyService.options(), "options");
  return (
    <form
      className="search-bar"
      onSubmit={(e) => {
        e.preventDefault();
        const values = new FormData(e.currentTarget);
        const params = new URLSearchParams();
        values.forEach((v, k) => {
          if (v) params.set(k, String(v));
        });
        navigate(`/imoveis?${params}`);
      }}
    >
      <label>
        Localização
        <select name="neighborhood">
          <option value="">Todos os bairros</option>
          {data?.neighborhoods.map((n) => (
            <option key={n}>{n}</option>
          ))}
        </select>
      </label>
      <label>
        Tipo de imóvel
        <select name="type">
          <option value="">Todos os tipos</option>
          {data?.types.map((n) => (
            <option key={n}>{n}</option>
          ))}
        </select>
      </label>
      <label>
        Faixa de preço
        <select name="maxPrice">
          <option value="">Qualquer valor</option>
          <option value="700000">Até R$ 700 mil</option>
          <option value="1000000">Até R$ 1 milhão</option>
          <option value="1500000">Até R$ 1,5 milhão</option>
          <option value="2500000">Até R$ 2,5 milhões</option>
        </select>
      </label>
      <button className="button button-gold" type="submit">
        Buscar imóvel 
      </button>
    </form>
  );
}
