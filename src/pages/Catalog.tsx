import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { propertyService } from "../services/propertyService";
import { useAsync, useSeo } from "../utils/hooks";
import {
  PropertyGrid,
  LoadingState,
  ErrorState,
} from "../components/PropertyCard";
import {
  PropertyFilters,
  FilterChip,
  filterLabels,
} from "../components/PropertyFilters";
import type { PropertyFilters as Filters } from "../types/property";
import { Modal } from "../components/Modal";
import { currency } from "../utils/format";
export default function Catalog() {
  const [params, setParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const filters = Object.fromEntries(params) as Filters;
  // URLs antigas não devem aplicar um filtro de cidade que não existe mais na interface.
  delete filters.city;
  const { data, loading, error } = useAsync(
    () => propertyService.list(filters),
    params.toString(),
  );
  useSeo(
    "Imóveis na planta",
    "Explore o catálogo de imóveis e filtre imóveis por bairro, preço, área e número de quartos.",
  );
  function update(key: keyof Filters, value: string) {
    setParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        if (value) next.set(key, value);
        else next.delete(key);
        return next;
      },
      {
        replace:
          key === "query" ||
          key === "minPrice" ||
          key === "maxPrice" ||
          key === "minArea",
      },
    );
  }
  const clear = () => setParams({});
  const selected = Object.entries(filters).filter(
    ([k, v]) => k in filterLabels && v,
  );
  const filterUI = (
    <PropertyFilters filters={filters} onChange={update} onClear={clear} />
  );
  return (
    <>
      <section className="catalog-intro">
        <div className="container">
          <span className="eyebrow">Encontre seu próximo endereço</span>
          <h1>Imóveis na planta</h1>
          <p>Explore a seleção e descubra o que faz sentido para você.</p>
          <label className="catalog-search">
            <span>Buscar por nome, bairro ou cidade</span>
            <input
              type="search"
              placeholder="O que você está procurando?"
              value={filters.query ?? ""}
              onChange={(e) => update("query", e.target.value)}
            />
          </label>
        </div>
      </section>
      <section className="section catalog-section">
        <div className="container catalog-layout">
          <aside className="desktop-filters" aria-label="Filtros de imóveis">
            {filterUI}
          </aside>
          <div className="catalog-results">
            <div className="results-toolbar">
              <p role="status">
                {loading ? (
                  "Buscando…"
                ) : (
                  <>
                    <strong>{data?.length ?? 0}</strong>{" "}
                    {(data?.length ?? 0) === 1
                      ? "imóvel encontrado"
                      : "imóveis encontrados"}
                  </>
                )}
              </p>
              <button
                className="button mobile-filters"
                onClick={() => setOpen(true)}
              >
                Filtros {selected.length > 0 && `(${selected.length})`}
              </button>
              <label className="sort-label">
                Ordenar por
                <select
                  value={filters.sort ?? "recent"}
                  onChange={(e) => update("sort", e.target.value)}
                >
                  <option value="recent">Mais recentes</option>
                  <option value="price-asc">Menor preço</option>
                  <option value="price-desc">Maior preço</option>
                  <option value="area-desc">Maior área</option>
                </select>
              </label>
            </div>
            {selected.length > 0 && (
              <div className="filter-chips">
                {selected.map(([key, value]) => (
                  <FilterChip
                    key={key}
                    label={`${filterLabels[key]}: ${key.includes("Price") ? currency(Number(value)) : value}${key === "minArea" ? " m²" : ""}`}
                    onRemove={() => update(key as keyof Filters, "")}
                  />
                ))}
                <button className="text-link" onClick={clear}>
                  Limpar todos
                </button>
              </div>
            )}
            {loading ? (
              <LoadingState />
            ) : error ? (
              <ErrorState />
            ) : data?.length ? (
              <PropertyGrid properties={data} />
            ) : (
              <div className="empty-state">
                <span className="eyebrow">Vamos tentar de outro jeito?</span>
                <h2>Nenhum imóvel encontrado.</h2>
                <p>
                  Experimente ampliar a faixa de preço ou escolher outro bairro.
                </p>
                <button className="button" onClick={clear}>
                  Limpar filtros
                </button>
              </div>
            )}
            <p className="demo-caption">
              Imóveis de demonstração estão identificados. Consulte disponibilidade
              e condições dos empreendimentos.
            </p>
          </div>
        </div>
      </section>
      {open && (
        <Modal
          title="Filtrar imóveis"
          onClose={() => setOpen(false)}
          className="filter-modal"
        >
          {filterUI}
          <button className="button button-gold" onClick={() => setOpen(false)}>
            Ver {data?.length ?? 0} {data?.length === 1 ? "imóvel" : "imóveis"}
          </button>
        </Modal>
      )}
    </>
  );
}
