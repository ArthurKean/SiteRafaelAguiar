# Rafael Aguiar — Curadoria de Imóveis

Catálogo imobiliário em React, TypeScript e Vite, integrado ao Sanity. O site público consulta somente imóveis publicados; o Studio é um projeto separado na mesma pasta.

- Site: https://site-rafael-aguiar.vercel.app/
- CMS: https://rafaelaguiar.sanity.studio/
- Node.js: 24, conforme `.nvmrc`.

## Executar

```sh
npm ci
npm run dev
```

Site local: http://127.0.0.1:5173/. Para trabalhar no painel:

```sh
npm --prefix studio-rafaelaguiar ci
npm --prefix studio-rafaelaguiar run dev
```

## Comandos do site

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Servidor local |
| `npm run build` | Verificação TypeScript e build em `dist/` |
| `npm run preview` | Visualizar o build |
| `npm test` | Testes unitários |
| `npm run test:e2e` | Testes em Microsoft Edge instalado |
| `npm run images:prepare` | Gerar marca/retrato públicos e fotos exclusivas dos testes |

## Estrutura

| Pasta/arquivo | Responsabilidade |
| --- | --- |
| `src/pages/` | Início, catálogo, favoritos, detalhes e 404 |
| `src/components/` | Navegação, filtros, cards, galerias, contatos e características |
| `src/services/sanity.ts` | Consulta pública e adaptação dos cadastros |
| `src/services/propertyService.ts` | Busca, filtros, ordenação e opções de filtro |
| `src/utils/` | Formatação, composição de quartos, contato e hooks |
| `src/styles/tokens.css` | Valores visuais compartilhados |
| `src/styles/global.css` | Estilos atuais, incluindo Poppins e galeria |
| `public/images/` | Marca, retrato, ícones, fallback e licenças usados pelo site |
| `tests/fixtures/` | Catálogo fixo usado somente nos testes |
| `tests/assets/images/` | Fotos de teste; não são copiadas para `dist/` |
| `assets/originals/` | Fontes das imagens locais, preservadas |
| `studio-rafaelaguiar/` | Configuração e schema do CMS |

## Funcionamento

O conteúdo vem da API do Sanity, projeto `jn7uxitm`, dataset `production`, com perspectiva `published`. A configuração pública pode ser sobrescrita pelas variáveis documentadas em `.env.example`. O frontend não recebe token de escrita.

O card usa o menor preço, a faixa de áreas e as maiores quantidades cadastradas nas opções. Quartos representa o total, incluindo suítes. Nos detalhes, a opção selecionada determina os números, o preço, as plantas e a mensagem de contato. Cadastros antigos sem opções e imagens de planta anteriores continuam suportados.

As rotas são `/`, `/imoveis`, `/imoveis/:slug`, `/favoritos` e `/sobre` (redirecionamento para `/#sobre`). Favoritos são salvos neste navegador. O site não armazena leads. WhatsApp padrão: `559891588444`; Instagram: `rafaelaguiar_s`.

Alterações de conteúdo publicadas no Sanity são consultadas ao abrir/recarregar as páginas. Alterações no código do site exigem deploy na Vercel; alterações no schema/painel exigem deploy do Studio. A integração Git e a branch de produção são configuradas na Vercel.

## Verificação

Antes de publicar código, execute `npm test`, `npm run test:e2e` e `npm run build`. Os testes de navegador iniciam/reutilizam o servidor local. A maioria usa dados fixos; um cenário verifica a API publicada e depende da rede. Capturas são geradas em `test-results/`, ignorado pelo Git.

Leia [a arquitetura](docs/PROJECT.md), [o cadastro no Sanity](docs/SANITY.md) e [as decisões de produto](PRODUCT.md).
