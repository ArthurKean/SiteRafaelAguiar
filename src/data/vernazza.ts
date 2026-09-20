import type { Property } from "../types/property";

// Informações e materiais fornecidos pelo corretor em 20/09/2026.
// Pendentes: código da unidade maior, estágio da obra e quantidade de banheiros.
export const vernazza: Property = {
  id: "vernazza", slug: "vernazza-residenziale", name: "Vernazza Residenziale",
  developer: "Treviso Engenharia", neighborhood: "Ponta d’Areia", city: "São Luís",
  mapUrl: "https://www.google.com/maps/place/Vernazza+Residenziale/data=!4m2!3m1!1s0x0:0xa3407f99543818e1",
  mapEmbedUrl: "https://maps.google.com/maps?ll=-2.4911101,-44.3017432&q=Vernazza%20Residenziale&z=16&output=embed",
  shortDescription: "Apartamentos de 87,98 a 130,49 m² na Ponta d’Areia.",
  description: "O Vernazza Residenziale, da Treviso Engenharia, está localizado na Ponta d’Areia, uma das regiões mais valorizadas de São Luís, próximo à Lagoa da Jansen, à Península e à Avenida dos Holandeses.\n\nOs apartamentos têm de 87,98 m² a 130,49 m², com varanda e plantas modernas e bem distribuídas. A opção de 87,98 m² oferece 2 suítes + 1 reversível; a de 130,49 m² conta com 3 suítes.\n\nO lazer reúne piscina, academia, salão de festas e gourmet, quadras esportivas, playground, brinquedoteca, sauna, SPA, coworking, espaço mulher, mercado e Pet Place.\n\nCada apartamento conta com 2 vagas. O empreendimento também tem placas fotovoltaicas e infraestrutura para carregamento de veículos elétricos.\n\nValores informados: unidade S-101, com 87,98 m² e posição Norte, por R$ 1.308.744,15; opção de 130,49 m², também com posição Norte, por R$ 2.508.744,15. Consulte disponibilidade e condições de pagamento.",
  surroundings: "Próximo à Lagoa da Jansen, à Península e à Avenida dos Holandeses.",
  priceFrom: 1308744.15, priceTo: 2508744.15, areaMin: 87.98, areaMax: 130.49,
  bedrooms: 3, suiteDescription: "2 suítes + 1 reversível ou 3 suítes", parkingSpaces: 2,
  type: "Apartamento", featured: true, isDemo: false, createdAt: "2026-09-20",
  images: [
    { src: "/images/vernazza/fachada-noturna.webp", alt: "Perspectiva artística da fachada noturna do Vernazza Residenziale" },
    { src: "/images/vernazza/entrada-norte.webp", alt: "Perspectiva artística da entrada da Torre Norte do Vernazza" },
    { src: "/images/vernazza/aerea-diurna.webp", alt: "Fotomontagem diurna do Vernazza na Ponta d’Areia" },
    { src: "/images/vernazza/aerea-noturna.webp", alt: "Fotomontagem noturna das torres do Vernazza" },
    { src: "/images/vernazza/academia.webp", alt: "Perspectiva artística da academia do Vernazza Residenziale" },
  ],
  features: ["Varanda", "Piscina", "Academia", "Salão de festas e gourmet", "Quadras esportivas", "Playground", "Brinquedoteca", "Sauna", "SPA", "Coworking", "Espaço mulher", "Mercado", "Pet Place", "Placas fotovoltaicas", "Infraestrutura para carregamento de veículos elétricos"],
  plans: [
    { id: "vernazza-87", area: 87.98, bedrooms: 3, suites: 2, suiteDescription: "2 suítes + 1 reversível", price: 1308744.15, unit: "S-101", orientation: "Norte" },
    { id: "vernazza-130", area: 130.49, bedrooms: 3, suites: 3, suiteDescription: "3 suítes", price: 2508744.15, orientation: "Norte" },
  ],
};
