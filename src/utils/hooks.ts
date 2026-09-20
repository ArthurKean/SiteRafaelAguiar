import { useEffect, useState } from "react";

export function useAsync<T>(loader: () => Promise<T>, key: string) {
  const [state, setState] = useState<{
    data?: T;
    loading: boolean;
    error: boolean;
  }>({ loading: true, error: false });
  useEffect(() => {
    let active = true;
    setState({ loading: true, error: false });
    loader()
      .then((data) => {
        if (active) setState({ data, loading: false, error: false });
      })
      .catch(() => {
        if (active) setState({ loading: false, error: true });
      });
    return () => {
      active = false;
    };
    // O chamador fornece uma chave estável para identificar a consulta.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return state;
}
export function useSeo(title: string, description: string, image?: string) {
  useEffect(() => {
    document.title = `${title} | Rafael Aguiar`;
    const tags = {
      description,
      "og:title": document.title,
      "og:description": description,
      "og:url": window.location.href,
      "og:image": new URL(image ?? "/images/marca.jpeg", window.location.origin)
        .href,
    };
    Object.entries(tags).forEach(([name, content]) => {
      const attr = name.startsWith("og:") ? "property" : "name";
      let element = document.querySelector<HTMLMetaElement>(
        `meta[${attr}="${name}"]`,
      );
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.content = content;
    });
  }, [title, description, image]);
}
