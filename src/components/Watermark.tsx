import { useId } from "react";
export function Watermark() {
  const id = useId();
  return <span className="photo-watermark" aria-hidden="true"><svg width="0" height="0"><filter id={id} colorInterpolationFilters="sRGB"><feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -1 -1 -1 0 3" /></filter></svg><img style={{filter: `url(#${id})`}} src="/images/monograma.png" alt="" /><strong>RAFAEL AGUIAR</strong><small>CORRETOR DE IMÓVEIS</small></span>;
}
