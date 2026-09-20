# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Pessoas buscando um imóvel para morar e investidores. Ambos são públicos prioritários, conforme confirmado pelo responsável pelo projeto.

## Product Purpose

Apresentar a curadoria de imóveis de Rafael Aguiar, facilitar a comparação das opções e aproximar o visitante do corretor. O visitante deve conseguir encontrar um imóvel, entender suas características e iniciar uma conversa sobre suas necessidades.

## Positioning

O diferencial confirmado é o atendimento próximo: Rafael valoriza conversar, ouvir e entender o cliente. O catálogo apoia esse atendimento, oferecendo informações para uma escolha adequada ao que cada pessoa procura. Não há promessa confirmada de exclusividade ou rentabilidade.

## Operating Context

Catálogo em português brasileiro, com imóveis em São Luís, Maranhão. Valores em reais e áreas em metros quadrados. O site precisa ser prático no celular e no computador.

O fluxo existente permite buscar e filtrar imóveis, consultar detalhes, comparar metragens e preços e entrar em contato. WhatsApp é o canal previsto para conversar com Rafael; Instagram permite acompanhar seu trabalho.

O responsável informou ter realizado um deploy na Vercel; a URL pública não foi fornecida nesta conversa.

## Capabilities and Constraints

- V1 em React, TypeScript e Vite, com dados locais. Não possui backend, banco de dados, autenticação, painel administrativo ou armazenamento de leads.
- Páginas de início, catálogo, detalhes do imóvel e apresentação de Rafael; filtros e ordenação; galeria; seleção de metragem com atualização de preço e características; localização.
- WhatsApp confirmado: (98) 9158-8444, exatamente com oito dígitos após o DDD. Link internacional: `559891588444`. Esse é o padrão do site; `VITE_WHATSAPP_NUMBER` permite sobrescrevê-lo. Os botões dos detalhes enviam o imóvel e a metragem selecionada, incluindo unidade e posição quando cadastradas.
- O Vernazza Residenziale possui informações fornecidas pelo responsável. Os outros cinco imóveis são exemplos e precisam continuar identificados como demonstração.
- No Vernazza, foram confirmadas as opções de 87,98 m² com 2 suítes + 1 reversível e de 130,49 m² com 3 suítes. Os preços e demais dados são mantidos em `src/data/vernazza.ts`; disponibilidade e condições dependem de consulta ao corretor.
- Permanecem pendentes o código da unidade maior, o estágio da obra e o número de banheiros do Vernazza. A divergência entre o bairro informado e a identificação no Maps também precisa de confirmação antes de corrigir o cadastro.
- Desenhos das plantas não foram fornecidos. Não apresentar um desenho fictício como planta real.
- A faixa de logos de construtoras foi discutida apenas como ideia. A lista de empresas e as marcas autorizadas ainda precisam ser confirmadas; sua implementação não foi autorizada.

## Brand Commitments

Nome: Rafael Aguiar — Curadoria de Imóveis. CRECI 8404, informado pelo responsável pelo projeto.

Instagram confirmado: https://www.instagram.com/rafaelaguiar_s/.

Preservar os assets de identidade e retrato fornecidos, além das decisões já aprovadas para o site. A comunicação deve favorecer a conversa e a compreensão das necessidades do cliente, coerente com o atendimento descrito pelo responsável.

## Evidence on Hand

- `assets/originals/brand/`: arquivos originais da identidade.
- `assets/originals/portraits/`: retrato fornecido de Rafael.
- `assets/originals/properties/vernazza/`: materiais do empreendimento fornecidos ou obtidos na pasta compartilhada pelo responsável.
- `public/images/vernazza/`: versões otimizadas para o site.
- `src/data/vernazza.ts`: cadastro real fornecido, com campos pendentes identificados. As imagens são perspectivas artísticas e fotomontagens, não fotografias de uma obra concluída.
- `src/data/properties.ts`: catálogo com imóveis demonstrativos, que não constituem ofertas verificadas.
- Não foram fornecidos depoimentos, resultados de investimento ou comprovação de parcerias para publicação. Não inventar essas evidências.

## Product Principles

1. Ajudar tanto quem pretende morar quanto quem pretende investir a compreender as opções disponíveis.
2. Facilitar uma conversa com Rafael que parta das necessidades do cliente.
3. Manter metragens, características e preços coerentes ao comparar opções.
4. Diferenciar informações fornecidas, demonstrações e dados ainda pendentes.
5. Priorizar clareza e praticidade no celular e no computador.
