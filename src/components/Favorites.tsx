import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { properties } from "../data/properties";
const KEY = "rafael:favorites:v1";
const validIds = new Set(properties.map(p => p.id));
function read(): string[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(value) ? [...new Set(value.filter((id): id is string => typeof id === "string" && validIds.has(id)))] : [];
  } catch { return []; }
}
const FavoritesContext = createContext<{ ids: string[]; toggle: (id: string, name: string) => void }>({ ids: [], toggle: () => {} });
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState(read);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    const sync = (event: StorageEvent) => { if (event.key === KEY || event.key === null) setIds(read()); };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(""), 3500);
    return () => window.clearTimeout(timer);
  }, [notice]);
  function toggle(id: string, name: string) {
    const saved = ids.includes(id);
    const next = saved ? ids.filter(value => value !== id) : [...ids, id];
    setIds(next);
    let message = `${name} ${saved ? "removido dos" : "salvo nos"} favoritos.`;
    try { localStorage.setItem(KEY, JSON.stringify(next)); }
    catch { message += " O navegador não permitiu salvar para próximas visitas."; }
    setNotice(message);
  }
  return <FavoritesContext.Provider value={{ ids, toggle }}>{children}<div className={notice ? "favorite-notice visible" : "favorite-notice"} role="status" aria-live="polite">{notice}</div></FavoritesContext.Provider>;
}
export const useFavorites = () => useContext(FavoritesContext);
export function Heart() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" /></svg>;
}
export function FavoriteButton({ id, name, label = false }: { id: string; name: string; label?: boolean }) {
  const { ids, toggle } = useFavorites();
  const saved = ids.includes(id);
  return <button type="button" className={`favorite-button ${label ? "with-label" : ""}`} aria-pressed={saved} aria-label={`${saved ? "Remover" : "Adicionar"} ${name} ${saved ? "dos" : "aos"} favoritos`} onClick={() => toggle(id, name)}><Heart />{label && <span>{saved ? "Favoritado" : "Favoritar"}</span>}</button>;
}
export function FavoritesLink({ mobile = false }: { mobile?: boolean }) {
  const { ids } = useFavorites();
  return <NavLink to="/favoritos" className={`favorites-link ${mobile ? "favorites-mobile" : "favorites-desktop"}`} aria-label={`Favoritos, ${ids.length} imóveis`}><Heart /><span className="favorites-count">{ids.length}</span></NavLink>;
}
