import { Link } from "react-router-dom";
import { useFavorites } from "../components/Favorites";
import { PropertyGrid, LoadingState, ErrorState } from "../components/PropertyCard";
import { propertyService } from "../services/propertyService";
import { useAsync, useSeo } from "../utils/hooks";
export default function Favorites() {
  const { ids } = useFavorites();
  const { data, loading, error } = useAsync(() => propertyService.list(), "favorites-list");
  useSeo("Favoritos", "Seus imóveis favoritos para comparar e escolher com calma.");
  const saved = (data ?? []).filter(p => ids.includes(p.id));
  return <div className="container section favorites-page"><h1>Seus favoritos</h1><p className="favorites-intro">Salvos neste navegador para você comparar com calma.</p>{loading ? <LoadingState /> : error ? <ErrorState /> : saved.length ? <PropertyGrid properties={saved} /> : <div className="empty-state"><h2>Você ainda não salvou nenhum imóvel.</h2><p>Toque no coração dos imóveis que chamarem sua atenção.</p><Link className="button" to="/imoveis">Explorar imóveis</Link></div>}</div>;
}
