import { Watermark } from "./Watermark";
import { useState } from "react";
import type { Property } from "../types/property";
import { GalleryLightbox } from "./GalleryLightbox";
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
            <Watermark />
            {i === 2 && (
              <span className="gallery-more">
                Ver todas as {images.length} fotos 
              </span>
            )}
          </button>
        ))}
      </div>
      {index !== null && (
        <GalleryLightbox property={property} index={index} onSelect={setIndex}
          onMove={move} onClose={() => setIndex(null)} />
      )}
    </>
  );
}
