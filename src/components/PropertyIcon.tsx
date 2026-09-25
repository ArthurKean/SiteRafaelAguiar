export function PropertyIcon({ name }: { name: "bed-double" | "bath" | "car-front" | "ruler" }) {
  return <img className="property-icon" src={`/images/icons/${name}.svg`} width="18" height="18" alt="" aria-hidden="true" />;
}
