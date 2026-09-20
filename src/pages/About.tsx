import { AboutSection } from "../components/AboutSection";
import { useSeo } from "../utils/hooks";
export default function About() {
  useSeo(
    "Sobre Rafael",
    "Conheça a proposta da curadoria de imóveis de Rafael Aguiar.",
  );
  return <AboutSection full />;
}
