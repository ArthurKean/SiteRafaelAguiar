import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { propertyService } from "../services/propertyService";
import { useAsync } from "../utils/hooks";
export function SearchBar() {
  const navigate = useNavigate();
  const [price, setPrice] = useState("");
  const [priceOpen, setPriceOpen] = useState(false);
  const priceRoot = useRef<HTMLDivElement>(null);
  const priceButton = useRef<HTMLButtonElement>(null);
  const formatted = price ? Number(price).toLocaleString("pt-BR") : "";
  useEffect(() => {
    if (!priceOpen) return;
    const outside = (event: PointerEvent) => {
      if (!priceRoot.current?.contains(event.target as Node)) setPriceOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [priceOpen]);
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
      <div className="price-picker" ref={priceRoot}
        onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPriceOpen(false); }}
        onKeyDown={(event) => {
          if (event.key === "Escape") { event.stopPropagation(); setPriceOpen(false); priceButton.current?.focus(); }
        }}>
        <input type="hidden" name="maxPrice" value={price} />
        <button type="button" className="price-trigger" ref={priceButton}
          aria-expanded={priceOpen} aria-controls="price-options" onClick={() => setPriceOpen(!priceOpen)}>
          <span>Valor máximo</span>
          <strong>{price ? `Até R$ ${formatted}` : "Sem limite"}</strong>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5" /></svg>
        </button>
        {priceOpen && <div id="price-options" className="price-panel">
          <label htmlFor="budget-input">Até quanto deseja investir?</label>
          <div className="price-input-wrap"><span aria-hidden="true">R$</span>
            <input id="budget-input" aria-label="Valor máximo em reais" inputMode="numeric"
              autoComplete="off" placeholder="Ex.: 1.800.000" value={formatted}
              onChange={(event) => {
                const digits = event.target.value.replace(/\D/g, "").slice(0, 10);
                setPrice(digits ? String(Number(digits)) : "");
              }} />
          </div>
          <p>Ou escolha um valor</p>
          <div className="price-suggestions">
            {[[700000, "700 mil"], [1000000, "1 milhão"], [1500000, "1,5 milhão"], [2500000, "2,5 milhões"]].map(([value, label]) =>
              <button type="button" key={value} aria-pressed={price === String(value)}
                onClick={() => setPrice(String(value))}>{label}</button>)}
          </div>
          <div className="price-actions">
            <button type="button" onClick={() => setPrice("")}>Sem limite</button>
            <button type="button" onClick={() => { setPriceOpen(false); priceButton.current?.focus(); }}>Aplicar</button>
          </div>
        </div>}
      </div>
      <button className="button button-gold" type="submit">
        Buscar imóvel 
      </button>
    </form>
  );
}
