import { Icon } from "./Icon";
import { useState } from "react";
import type { Property } from "../types/property";
import { Modal } from "./Modal";
export function PropertyGallery({ property }: { property: Property }) {
  const [index, setIndex] = useState<number | null>(null);
  const images = property.images;
  const move = (amount: number) =>
    setIndex((i) => ((i ?? 0) + amount + images.length) % images.length);
  return (
    <>
      <div className="property-gallery">
        {images.slice(0, 3).map((img, i) => (
          <button
            key={img.src}
            onClick={() => setIndex(i)}
            aria-label={`Abrir foto ${i + 1} de ${property.name}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading={i === 0 ? "eager" : "lazy"}
              width="1000"
              height="700"
            />
            {i === 2 && (
              <span className="gallery-more">
                Ver todas as {images.length} fotos <Icon name="arrowUpRight" />
              </span>
            )}
          </button>
        ))}
      </div>
      <p className="demo-caption gallery-caption">
        {property.isDemo ? "Imagens ilustrativas · Empreendimento de demonstração" : "Perspectivas artísticas e fotomontagens do empreendimento"}
      </p>
      {index !== null && (
        <Modal
          title={`${property.name} · ${index + 1} / ${images.length}`}
          className="lightbox"
          onClose={() => setIndex(null)}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
              e.preventDefault();
              move(e.key === "ArrowLeft" ? -1 : 1);
            }
          }}
        >
          <div>
            <img
              className="lightbox-image"
              src={images[index].src}
              alt={images[index].alt}
            />
            <div className="lightbox-controls">
              <button
                className="button button-outline"
                onClick={() => move(-1)}
                aria-label="Foto anterior"
              >
                <Icon name="arrowLeft" /> Anterior
              </button>
              <span>{property.isDemo ? "Fotografia ilustrativa" : "Perspectiva artística"}</span>
              <button
                className="button button-outline"
                onClick={() => move(1)}
                aria-label="Próxima foto"
              >
                Próxima <Icon name="arrowRight" />
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
