# Arquitetura do site

## Fluxo de dados

`Página → propertyService → API pública Sanity → adaptação → componentes`.

React e TypeScript são compilados pelo Vite. O React Router mantém as rotas; a Vercel encaminha URLs para `index.html`. Catálogo, favoritos, detalhes e 404 são carregados sob demanda. A apresentação de Rafael está na home; `/sobre` preserva links antigos por redirecionamento.

`loadProperties` consulta os documentos publicados e deduplica requisições simultâneas enquanto estão pendentes. Não existe cache permanente, sincronização em tempo real ou fallback para anúncios locais. As páginas tratam carregamento, falha e ausência de resultados.

## Regras preservadas

- Filtros de bairro, tipo, preço, quartos mínimos, área e status, além de busca textual por nome/bairro/cidade e ordenação. Estado mantido na URL. O antigo parâmetro `city` é ignorado pelo catálogo.
- Preço filtra a interseção com a faixa disponível; área mínima considera a maior opção.
- Cards usam mínimo de preço, mínimo/máximo de área e máximos das quantidades. Dados gerais anteriores continuam sendo fallback quando não há valor nas opções.
- Detalhes iniciam na opção mais barata. A seleção atualiza características, preço, plantas, fotos específicas e WhatsApp. Quantidades ausentes não são copiadas de outra opção.
- Quartos inclui suítes. A composição usa esse total; um cadastro com mais suítes que quartos tem o total omitido e marcado para confirmação.
- Galeria mostra a imagem completa, miniaturas, teclado e gesto horizontal; pré-carrega somente fotos vizinhas e evita que um carregamento antigo substitua a escolha mais recente.
- Favoritos persistem no navegador e sincronizam entre abas. Não há envio automático de mensagens nem armazenamento de leads.
- Diálogos preservam foco, Escape e navegação por teclado. Banner respeita pausa e movimento reduzido.

## Estilos e imagens

A fonte é Poppins local (400, 500, 600 e 700). `tokens.css` contém valores compartilhados; `global.css` concentra os estilos atuais e breakpoints. Preservar a ordem da cascata ao reorganizar estilos.

Imagens dos imóveis vêm do CDN do Sanity, com parâmetros de tamanho e qualidade. `public/images` contém os recursos de marca/retrato, ícones e imagem neutra necessários ao site. Fotos do catálogo de teste ficam em `tests/assets/images`, servidas por interceptação do Playwright; não entram na pasta publicada.

`npm run images:prepare` gera marca/retrato para `public/images` e fotos de teste para `tests/assets/images`, usando as fontes preservadas em `assets/originals`. Não executar esse script para importar imóveis reais: o cadastro publicado é feito no Sanity.

## Testes

- `src/**/*.test.ts`: adaptação Sanity, filtros, formatação de quartos e contato.
- `tests/*.spec.ts`: fluxos de navegador, fotos, opções, favoritos, orçamento, responsividade e integração publicada.
- `tests/fixtures/`: exemplos e cenário histórico Vernazza. Valores não representam uma oferta atual.
- `tests/fixtures.ts`: intercepta API e imagens para cenários reprodutíveis, sem depender do CMS real.

O teste publicado em `sanity.spec.ts` depende da disponibilidade da API. Erros de rede devem ser diferenciados de regressões. Testes, recursos e exemplos não são importados pelo aplicativo de produção.

## Fontes e decisões históricas

Referência visual inicial: https://www.figma.com/design/GLENjHQbhaXie7nKRDztGP/Rafael-Aguiar--Cat%C3%A1logo-de-Im%C3%B3veis?node-id=0-1. O site evoluiu desde essa referência por decisões do responsável; não há promessa de equivalência visual com os frames antigos.

Marca e retrato foram fornecidos pelo responsável. Materiais do Vernazza permanecem arquivados como perspectivas artísticas/fotomontagens e recursos de teste. As seis fotos ilustrativas antigas têm estas origens; hoje são usadas somente pelos testes:

| Nome | Origem |
| --- | --- |
| interior | https://images.unsplash.com/photo-1600607687939-ce8a6c25118c |
| residencia | https://images.unsplash.com/photo-1600585154340-be6161a56a0c |
| sala | https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3 |
| edificio | https://images.unsplash.com/photo-1460317442991-0ec209397118 |
| apartamento | https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde |
| varanda | https://images.unsplash.com/photo-1600210492486-724fe5c67fb0 |

Licenças dos ícones estão junto dos recursos públicos. Originais e backups foram preservados; não reescrever histórico Git para uma limpeza comum.

## Limites atuais

Metadados de título, descrição e Open Graph são atualizados no navegador. Compartilhadores que não executam JavaScript recebem o HTML inicial; metadados individuais garantidos exigiriam prerenderização ou renderização no servidor.

O site recebe conteúdo público do Sanity sem autenticação. O painel administrativo tem seu próprio login. Não há backend próprio de leads. Otimizar o carregamento do banner e o reaproveitamento de consultas deve ser tratado como melhoria funcional, com política explícita de atualização de preços.
