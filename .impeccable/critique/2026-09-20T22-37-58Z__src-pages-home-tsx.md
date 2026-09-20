---
target: Home e jornada do catálogo Rafael Aguiar
total_score: 24
max_score: 36
na_heuristics: 10
p0_count: 0
p1_count: 2
target_identity: "file:C:\\Users\\User\\Desktop\\rafael\\src\\pages\\Home.tsx"
target_fingerprint: "sha256:e63d9abde8c3125f3e4cffac04028329ed366761fb0e1c8b902f94712bb53fef"
target_path: "C:\\Users\\User\\Desktop\\rafael\\src\\pages\\Home.tsx"
timestamp: 2026-09-20T22-37-58Z
slug: src-pages-home-tsx
---
Method: dual-agent (A: /root/design_review · B: /root/detector_review)

# Crítica — Rafael Aguiar

Alvo principal: src/pages/Home.tsx. Jornada complementar: catálogo, Vernazza e Sobre. Revisão local; deploy Vercel não avaliado. Nenhuma alteração no site.

## Veredito

O site tem uma identidade consistente e uma apresentação cuidada, mas ainda se parece com um catálogo imobiliário de alto padrão que poderia pertencer a outro corretor. A maior oportunidade é tornar concreto o diferencial confirmado de Rafael: conversar, ouvir e entender quem quer morar ou investir em São Luís.

O detector executado sobre src retornou []: zero ocorrências, regras ou arquivos sinalizados, sem falsos positivos a avaliar. Isso não invalida os problemas de experiência observados no navegador.

## Heurísticas

Escala de 0 a 4, sendo 4 excelente. Avaliação qualitativa, não pesquisa com usuários.

| Heurística | Nota | Evidência |
|---|---:|---|
| Visibilidade do estado | 3 | Seleção, preço e resultados oferecem feedback. |
| Linguagem do mundo real | 3 | Reais e m² claros; título na planta generaliza estágio. |
| Controle e liberdade | 3 | Pausa, fechamento, retorno e limpeza de filtros. |
| Consistência | 3 | Identidade coesa; classificação dos imóveis diverge. |
| Prevenção de erros | 2 | Indisponibilidade de contato só aparece após clique. |
| Reconhecimento | 3 | Características e metragens visíveis. |
| Eficiência | 2 | Filtros úteis, mas excessivos para seis registros. |
| Estética e simplicidade | 3 | Hierarquia boa, textos e seções genéricos alongam a jornada. |
| Recuperação de erros | 2 | Contato indisponível oferece apenas retorno. |
| Ajuda/documentação | n/a | Documentação separada não é necessária neste catálogo. |
| Total | 24/36 | Aceitável; melhorias importantes na jornada. |

## Pontos fortes

- Identidade coesa, boa hierarquia e busca priorizada antes do carrossel no celular.
- Seletor de metragem funciona: 130,49 m² atualiza suítes e preço para R$ 2.508.744,15.
- Retrato real, dados fornecidos do Vernazza e identificação das perspectivas artísticas ajudam a construir confiança.

## Prioridades

1. **P1 — Contato sem continuidade.** Em src/components/ContactCTA.tsx, clicar em Falar com Rafael abre o aviso de WhatsApp indisponível, sem alternativa imediata. Isso interrompe o visitante no momento de maior intenção. Configurar o número quando fornecido e oferecer o Instagram confirmado como alternativa enquanto isso. Comando: $impeccable harden.
2. **P1 — Demonstrações com o mesmo destaque da oferta real.** Home.tsx e PropertyCard.tsx promovem exemplos no carrossel e nos cards; a ressalva é pequena e o nome acessível do link não inclui demonstração. Separar exemplos das ofertas públicas ou reforçar a identificação junto ao título e no nome acessível. Comando: $impeccable clarify.
3. **P2 — Diferencial de Rafael pouco concreto.** Home.tsx e AboutSection.tsx usam uma promessa ampla de estilo de vida. Sobre acrescenta pouco ao resumo da home. Explicar o atendimento baseado em escuta, necessidades e comparação de opções para morar ou investir, sem inventar credenciais. Comando: $impeccable clarify.
4. **P2 — Catálogo mais complexo que o necessário.** Catalog.tsx e PropertyFilters.tsx expõem sete categorias para seis registros; Cidade tem só São Luís. Imóveis na planta também pressupõe um estágio ainda pendente para Vernazza. Usar título neutro, priorizar bairro, orçamento e metragem e recolher filtros adicionais. Comando: $impeccable distill.

## Carga cognitiva e jornada

A home tem foco claro. O catálogo exige mais decisões simultâneas: sete categorias, busca e ordenação; o seletor de bairros tem sete opções incluindo Todos. Isso justifica agrupar controles, não eliminar opções úteis arbitrariamente. A lista de quinze características pode ser agrupada por lazer, serviços e infraestrutura. Seleção de metragem com duas opções é simples.

A jornada começa com aspiração, ganha segurança nos detalhes do Vernazza e termina em frustração ao tentar contato. Melhorar esse encerramento tem mais impacto que adicionar efeitos visuais.

## Perfis e riscos

- Primeiro visitante: pode entender os exemplos como ofertas disponíveis; Sobre não explica suficientemente como Rafael atende.
- Visitante no celular: home e Sobre observados em 390 × 844 sem corte horizontal visível; contato ainda termina em aviso. Fluxos completos de filtros e galeria no celular não foram testados.
- Visitante criterioso: percebe a generalização na planta e a indisponibilidade tardia do contato. Código dos filtros aceita mínimo e máximo contraditórios sem orientação específica.

## Observações menores

A mensagem de WhatsApp não leva a metragem selecionada; aparece 1 vagas em conteúdo de catálogo; a galeria chama perspectivas artísticas de fotos. O mapa não foi validado suficientemente para classificá-lo como defeito. Acessibilidade observada por árvore semântica não equivale a teste completo com leitor de tela.

## Decisões para próxima etapa

Priorizar contato/confiabilidade ou apresentação do atendimento? Manter demonstrações identificadas ou retirá-las da vitrine pública? As respostas devem orientar a próxima implementação; nenhuma correção está autorizada por este relatório sozinho.
