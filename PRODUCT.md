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

Site publicado: https://site-rafael-aguiar.vercel.app/. CMS: https://rafaelaguiar.sanity.studio/.

## Capabilities and Constraints

- React, TypeScript e Vite com conteúdo publicado no Sanity. O painel administrativo é separado; não há armazenamento próprio de leads.
- Início, catálogo, favoritos, detalhes, filtros e ordenação, galeria com miniaturas, seleção de opções e localização. A apresentação de Rafael está na home; /sobre redireciona para essa seção.
- Tipografia Poppins em todo o site, com azul, marfim e dourado e atenção ao uso no celular.
- WhatsApp confirmado: (98) 9158-8444, exatamente com oito dígitos após o DDD. Link internacional: `559891588444`. `VITE_WHATSAPP_NUMBER` permite sobrescrevê-lo. O contato dos detalhes inclui imóvel e opção selecionada.
- Rafael tem 17 anos de experiência em vendas, conforme informado pelo responsável. O texto destaca conversa, escuta e agilidade sem prometer disponibilidade ininterrupta.
- O card usa menor preço, faixa de área e máximos das quantidades cadastradas. Quartos inclui suítes; os detalhes explicam a composição da opção selecionada. Valores e disponibilidade exigem confirmação com Rafael.
- Dados e desenhos reais vêm do CMS. Não inventar características ausentes, endereços, plantas ou correções de cadastro. O suporte a campos gerais e plantas anteriores ainda é necessário.
- A faixa de logos de construtoras foi discutida apenas como ideia. A lista de empresas e as marcas autorizadas ainda precisam ser confirmadas; sua implementação não foi autorizada.

## Brand Commitments

Nome: Rafael Aguiar — Curadoria de Imóveis. CRECI 8404, informado pelo responsável pelo projeto.

Instagram confirmado: https://www.instagram.com/rafaelaguiar_s/.

Preservar os assets de identidade e retrato fornecidos, além das decisões já aprovadas para o site. A comunicação deve favorecer a conversa e a compreensão das necessidades do cliente, coerente com o atendimento descrito pelo responsável.

## Evidence on Hand

- `assets/originals/brand/`: arquivos originais da identidade.
- `assets/originals/portraits/`: retrato fornecido de Rafael.
- `assets/originals/properties/vernazza/`: materiais do empreendimento fornecidos ou obtidos na pasta compartilhada pelo responsável.
- `tests/assets/images/`: versões otimizadas usadas exclusivamente nos testes; marca/retrato/ícones ativos ficam em `public/images/`.
- `tests/fixtures/vernazza.ts`: cenário histórico de teste. Os materiais são perspectivas artísticas e fotomontagens, não fotografias de uma obra concluída; valores não são fonte dos anúncios atuais.
- `tests/fixtures/properties.ts`: catálogo demonstrativo para testes, sem participação no site publicado. O Sanity é a fonte dos anúncios atuais.
- Não foram fornecidos depoimentos, resultados de investimento ou comprovação de parcerias para publicação. Não inventar essas evidências.

## Product Principles

1. Ajudar tanto quem pretende morar quanto quem pretende investir a compreender as opções disponíveis.
2. Facilitar uma conversa com Rafael que parta das necessidades do cliente.
3. Manter metragens, características e preços coerentes ao comparar opções.
4. Diferenciar informações fornecidas, demonstrações e dados ainda pendentes.
5. Priorizar clareza e praticidade no celular e no computador.
