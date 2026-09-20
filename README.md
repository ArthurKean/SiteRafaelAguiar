# Rafael Aguiar — Curadoria de Imóveis

V1 de um catálogo imobiliário em React, TypeScript, Vite e CSS próprio. Sem backend, banco de dados, autenticação ou painel administrativo.

## Executar

Requer Node.js 22.12+ (validado com Node.js 24) e npm.

```sh
npm ci
npm run dev
```

Abra http://127.0.0.1:5173. Para produção: `npm run build`. Para conferir o build: `npm run preview`.

## O que está implementado

- Home com carrossel de destaques a cada 5 segundos, controles manuais e pausa, busca rápida e apresentação do corretor. A rotação pausa sobre a foto, ao focar o conteúdo e em abas ocultas; inicia pausada quando há preferência por movimento reduzido.
- Catálogo com busca por nome/bairro/cidade; filtros de cidade, bairro, tipo, intervalo de preço, quartos mínimos, área mínima e status; chips removíveis; quatro ordenações.
- Filtros persistidos em parâmetros de URL. Preço considera interseção com a faixa das unidades; área mínima considera a maior planta disponível.
- Detalhes com galeria, lightbox, descrição, especificações, características, investimento, apresentação editorial, seletor de plantas e localização.
- Rotas `/`, `/imoveis`, `/imoveis/:slug`, `/sobre` e tratamento de página/imóvel não encontrado.
- Navegação mobile, filtros em diálogo, galeria horizontal, foco visível, labels, skip link, Escape e contenção nativa de foco nos diálogos. Respeita movimento reduzido.
- Fontes locais Manrope e Playfair Display via Fontsource, imagens WebP, versões menores para cards, lazy loading, páginas secundárias carregadas sob demanda.
- Título, descrição e Open Graph atualizados por página.

## Arquivos principais

| Caminho | Responsabilidade |
| --- | --- |
| `src/App.tsx` | Rotas e carregamento das páginas |
| `src/pages/` | Home, catálogo, detalhes, sobre e 404 |
| `src/components/` | Layout, busca, filtros, cards, galeria, contato e informações do imóvel |
| `src/types/property.ts` | Contratos de imóvel, imagem, planta e filtros |
| `src/data/properties.ts` | Seis imóveis explicitamente demonstrativos |
| `src/services/propertyService.ts` | Acesso assíncrono aos dados, filtros e ordenação |
| `src/styles/tokens.css` | Cores, espaçamentos, fontes, radius, motion, sombras e containers |
| `src/styles/global.css` | Componentes e breakpoints responsivos |
| `src/utils/contact.ts` | Configuração, mensagem e URL de WhatsApp |
| `src/utils/hooks.ts` | Consulta assíncrona com estados e metadados SEO |
| `scripts/prepare-images.mjs` | Geração reproduzível das imagens WebP e recorte do monograma |
| `tests/site.spec.ts` | Fluxos reais de navegador desktop/mobile/tablet |

## Dados que precisam ser substituídos

Todos os imóveis, valores, metragens, características, configurações de plantas e associações a bairros são exemplos. As fotos de arquitetura são ilustrativas, não retratam os imóveis. A foto do Rafael e as marcas foram fornecidas na pasta original, que foi preservada.

Não foram publicados telefone, Instagram, endereço, coordenadas, histórico profissional ou prazos de entrega sem confirmação. O Figma contém placeholders e dados genéricos; não foram tratados como informações profissionais verificadas.

As plantas não possuem desenhos fornecidos. O seletor já suporta imagem por planta e atualiza os dados ao trocar de opção; enquanto faltam arquivos, a interface mostra a área selecionada e informa que o desenho não está disponível. A localização indica apenas a região de demonstração, sem simular um endereço preciso.

Para habilitar o WhatsApp, copie `.env.example` para `.env.local` e preencha `VITE_WHATSAPP_NUMBER` com o número real, incluindo código do país e DDD, apenas dígitos. Reinicie o servidor ou refaça o build. Sem número válido, o CTA apresenta um aviso e a mensagem que seria enviada; não abre um contato fictício. Não há coleta nem armazenamento de leads.

## Referência visual e diferenças

Referência: [Figma fornecido](https://www.figma.com/design/GLENjHQbhaXie7nKRDztGP/Rafael-Aguiar--Cat%C3%A1logo-de-Im%C3%B3veis?node-id=0-1).

Foram consultados os frames de Home e catálogo, além da estrutura das telas desktop e mobile. O plano Starter do Figma atingiu o limite de chamadas antes da extração completa do frame de detalhes; essa página segue a estrutura de nós obtida e o briefing. Não há alegação de equivalência pixel a pixel com todas as telas.

Preservados: azul `#0e131d`, marfim `#f6f2e8`, dourado `#c6a15b`, combinação tipográfica, hero dividido, busca, destaques, apresentação do corretor, sidebar do catálogo e galeria assimétrica de detalhes. A cor dourada foi escurecida em pequenos textos sobre fundo claro para legibilidade.

Adaptações: fotografias ilustrativas no lugar dos blocos genéricos, logo e retrato reais, estados e filtros funcionais, altura fluida das seções, mais opções no catálogo, conteúdo editorial e seletor de plantas. O mapa esquemático foi substituído por uma área de localização explicitamente pendente, pois não foram fornecidos endereços.

A skill Humanizer foi instalada globalmente com o comando solicitado e lida nesta sessão. Foi aplicada apenas à redação para visitantes; está disponível para descoberta automática no próximo turno. Não alterou dados técnicos, preços, nomes ou rotas.

## Testes

```sh
npm test
npm run test:e2e
npm run build
```

Os testes de navegador usam Microsoft Edge instalado e iniciam/reutilizam o servidor Vite local. Cobrem navegação, query strings, filtros, ordenação, estado vazio, galeria, plantas, contato sem número, 404, imagens e ausência de overflow em 390 e 768 pixels. O fluxo desktop também verifica erros JavaScript. Capturas ficam em `test-results/`.

Validação final: 6 testes unitários e 5 testes de navegador aprovados, build de produção aprovado, zero vulnerabilidades no `npm audit`. Revisão visual feita em desktop, tablet e celular. A navegação por teclado inclui retorno e ciclo de foco nos diálogos.

## Preparação para V2

Fluxo atual: **UI → propertyService → dados locais**. As páginas e componentes não importam os mocks. O serviço retorna Promises, permitindo substituir o adaptador por chamadas HTTP e manter os componentes. Preservar os contratos de `Property`, `PropertyPlan` e dos filtros na API; mover filtragem e ordenação para o servidor quando houver paginação.

O backend futuro poderá conectar API, PostgreSQL e `/admin`. Nada disso foi implementado nesta V1. Localização, galeria, plantas e contato têm componentes separados para receber dados reais.

SEO atual é atualizado no cliente. Prerenderização ou renderização no servidor será necessária se compartilhadores sociais precisarem receber metadados individuais no HTML inicial. A hospedagem deve encaminhar rotas da SPA para `index.html`. Não houve publicação externa.

## Origem das fotografias ilustrativas

Arquivos baixados do Unsplash e armazenados localmente; não há dependência das URLs em tempo de execução:

- `interior`: `https://images.unsplash.com/photo-1600607687939-ce8a6c25118c`
- `residencia`: `https://images.unsplash.com/photo-1600585154340-be6161a56a0c`
- `sala`: `https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3`
- `edificio`: `https://images.unsplash.com/photo-1460317442991-0ec209397118`
- `apartamento`: `https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde`
- `varanda`: `https://images.unsplash.com/photo-1600210492486-724fe5c67fb0`

Os nomes locais descrevem referências internas, não características comprovadas de um imóvel.

