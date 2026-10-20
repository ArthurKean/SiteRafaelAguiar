import { useEffect, useRef, useState } from "react";
import type { Property } from "../types/property";
import { Modal } from "./Modal";
import { Icon } from "./Icon";
import { Watermark } from "./Watermark";

function thumbnail(src: string) {
  try {
    const url = new URL(src);
    if (url.hostname === "cdn.sanity.io") {
      url.searchParams.set("w", "160");
      url.searchParams.set("q", "65");
      url.searchParams.set("auto", "format");
      return url.toString();
    }
  } catch { /* Imagens locais mantêm seu endereço original. */ }
  return src;
}

export function GalleryLightbox({ property, index, onSelect, onMove, onClose }: {
  property: Property;
  index: number;
  onSelect: (index: number) => void;
  onMove: (amount: number) => void;
  onClose: () => void;
}) {
  const images = property.images;
  const [displayed, setDisplayed] = useState(index);
  const [loadedSrc, setLoadedSrc] = useState("");
  const [failedSrc, setFailedSrc] = useState("");
  const [attempt, setAttempt] = useState(0);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const strip = useRef<HTMLDivElement>(null);
  const requested = images[index].src;
  const loading = loadedSrc !== requested && failedSrc !== requested;
  const failed = failedSrc === requested;

  useEffect(() => {
    let active = true;
    const image = new Image();
    image.onload = async () => {
      try { await image.decode(); } catch { /* Alguns navegadores já decodificaram no load. */ }
      if (active) { setDisplayed(index); setLoadedSrc(requested); setFailedSrc(""); }
    };
    image.onerror = () => { if (active) setFailedSrc(requested); };
    image.src = requested;
    // Só as vizinhas: evita baixar todas as fotos grandes ao abrir a galeria.
    const neighbors = [...new Set([(index + 1) % images.length, (index - 1 + images.length) % images.length])];
    neighbors.filter(i => i !== index).forEach(i => { const next = new Image(); next.src = images[i].src; });
    return () => { active = false; image.onload = null; image.onerror = null; };
  }, [requested, index, images, attempt]);

  useEffect(() => {
    const row = strip.current;
    const selected = row?.children[index] as HTMLElement | undefined;
    if (row && selected) {
      const item = selected.getBoundingClientRect();
      const bounds = row.getBoundingClientRect();
      if (item.left < bounds.left) row.scrollLeft -= bounds.left - item.left;
      else if (item.right > bounds.right) row.scrollLeft += item.right - bounds.right;
    }
  }, [index]);

  return <Modal title={`${property.name} · ${index + 1} / ${images.length}`}
    className="lightbox gallery-lightbox" onClose={onClose}
    onKeyDown={event => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault(); onMove(event.key === "ArrowLeft" ? -1 : 1);
      }
    }}>
    <div className="gallery-stage" onTouchStart={event => {
      touch.current = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
    }} onTouchCancel={() => { touch.current = null; }} onTouchEnd={event => {
      if (!touch.current) return;
      const dx = event.changedTouches[0].clientX - touch.current.x;
      const dy = event.changedTouches[0].clientY - touch.current.y;
      touch.current = null;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) onMove(dx < 0 ? 1 : -1);
    }}>
      <div className="watermarked-lightbox">
        <img className="lightbox-image" src={images[displayed].src} alt={images[displayed].alt} draggable={false} />
        <Watermark />
      </div>
      {images.length > 1 && <>
        <button className="gallery-arrow previous" type="button" onClick={() => onMove(-1)} aria-label="Foto anterior"><Icon name="arrowLeft" /></button>
        <button className="gallery-arrow next" type="button" onClick={() => onMove(1)} aria-label="Próxima foto"><Icon name="arrowRight" /></button>
      </>}
      <div className="gallery-feedback" role="status" aria-live="polite">
        {loading && <span>Carregando foto {index + 1}…</span>}
        {failed && <span>Não foi possível carregar a foto. <button type="button" onClick={() => { setFailedSrc(""); setAttempt(n => n + 1); }}>Tentar novamente</button></span>}
      </div>
    </div>
    <div className="gallery-caption-row" aria-live="polite">
      <span>{images[displayed].title || `Foto ${displayed + 1}`}</span>
      <span>{displayed + 1} de {images.length}</span>
    </div>
    <div className="gallery-thumbnails" ref={strip} aria-label="Escolher foto">
      {images.map((image, i) => <button type="button" key={`${image.src}-${i}`} aria-label={`Ver foto ${i + 1}`}
        aria-current={index === i ? "true" : undefined} onClick={() => onSelect(i)}>
        <img src={thumbnail(image.src)} alt="" loading="lazy" width="88" height="60" />
      </button>)}
    </div>
    <p className="gallery-hint">Escolha uma miniatura, use as setas ou deslize a foto.</p>
  </Modal>;
}
