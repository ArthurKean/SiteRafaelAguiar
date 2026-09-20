import type { PropertyFilters as Filters } from "../types/property";
import { propertyService } from "../services/propertyService";
import { useAsync } from "../utils/hooks";
export const filterLabels: Record<string, string> = {
  query: "Busca",
  city: "Cidade",
  neighborhood: "Bairro",
  type: "Tipo",
  minPrice: "Preço mínimo",
  maxPrice: "Preço máximo",
  bedrooms: "Quartos a partir de",
  minArea: "Área a partir de",
  status: "Status",
};
export function PropertyFilters({
  filters,
  onChange,
  onClear,
}: {
  filters: Filters;
  onChange: (key: keyof Filters, value: string) => void;
  onClear: () => void;
}) {
  const { data } = useAsync(() => propertyService.options(), "options");
  const select = (key: keyof Filters, options: string[], empty: string) => (
    <label key={key}>
      {filterLabels[key]}
      <select
        value={filters[key] ?? ""}
        onChange={(e) => onChange(key, e.target.value)}
      >
        <option value="">{empty}</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
  return (
    <div className="filter-panel">
      <div className="filter-title">
        <h2>Refine sua busca</h2>
        <span aria-hidden="true">≡</span>
      </div>
      {select("city", data?.cities ?? [], "Todas as cidades")}
      {select("neighborhood", data?.neighborhoods ?? [], "Todos os bairros")}
      {select("type", data?.types ?? [], "Todos os tipos")}
      <fieldset>
        <legend>Investimento</legend>
        <div className="price-inputs">
          <label>
            De (R$)
            <input
              type="number"
              min="0"
              placeholder="Mínimo"
              value={filters.minPrice ?? ""}
              onChange={(e) => onChange("minPrice", e.target.value)}
            />
          </label>
          <label>
            Até (R$)
            <input
              type="number"
              min="0"
              placeholder="Máximo"
              value={filters.maxPrice ?? ""}
              onChange={(e) => onChange("maxPrice", e.target.value)}
            />
          </label>
        </div>
      </fieldset>
      <fieldset>
        <legend>Quartos</legend>
        <div className="segmented">
          {["", "2", "3", "4"].map((v) => (
            <button
              key={v}
              className={
                filters.bedrooms === v || (!filters.bedrooms && !v)
                  ? "selected"
                  : ""
              }
              aria-pressed={(filters.bedrooms ?? "") === v}
              onClick={() => onChange("bedrooms", v)}
            >
              {v ? `${v}+` : "Todos"}
            </button>
          ))}
        </div>
      </fieldset>
      <label>
        Área mínima (m²)
        <input
          type="number"
          min="0"
          placeholder="Qualquer metragem"
          value={filters.minArea ?? ""}
          onChange={(e) => onChange("minArea", e.target.value)}
        />
      </label>
      {select("status", data?.statuses ?? [], "Todos os status")}
      <button className="clear-filters" onClick={onClear}>
        Limpar filtros <span aria-hidden="true">↺</span>
      </button>
    </div>
  );
}
export function FilterChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <button
      className="filter-chip"
      onClick={onRemove}
      aria-label={`Remover filtro ${label}`}
    >
      {label}
      <span aria-hidden="true">×</span>
    </button>
  );
}
