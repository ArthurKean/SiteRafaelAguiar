# Cadastro e integração Sanity

Projeto: `jn7uxitm`. Dataset público: `production`. Tipo de documento: `imovel`.

O site consulta a API pública com perspectiva `published`. Não usa token e não mistura imóveis locais. Alterações publicadas são consultadas ao abrir/recarregar as páginas; não é necessário novo deploy para alterar conteúdo. Não há atualização em tempo real da aba já aberta.

## Publicar um imóvel

No Studio, preencha título, gere o slug (ex.: apartamento-jardins), preço em reais, área e foto principal. Publique o documento. A URL será `/imoveis/apartamento-jardins`. Marque Destaque para a página inicial. Desmarque Exibir no site ou retire a publicação para ocultar. Rascunhos não aparecem. Cadastros antigos sem o campo Exibir no site continuam visíveis.

Sem título, slug, preço ou área válidos, o cadastro não entra no catálogo. Campos de características ausentes não são inventados. Imóveis sem foto usam uma imagem neutra. Opções de planta válidas definem automaticamente os limites de preço e metragem.

## Auditoria de campos

| Código do site | Campo no Sanity | Situação |
|---|---|---|
| id, createdAt | _id, _createdAt | Automáticos |
| slug, name | slug.current, titulo | Já existiam |
| description, shortDescription | descricao, descricaoCurta | Curta adicionada |
| priceFrom, priceTo | preco, precoMaximo | Máximo adicionado; derivados das plantas quando cadastradas |
| areaMin, areaMax | area, areaMaxima | Máximo adicionado; derivados das plantas quando cadastradas |
| bedrooms, bathrooms | quartos, banheiros | Já existiam |
| suites, suiteDescription, parkingSpaces | suites, descricaoSuites, vagas | Adicionados |
| type, status, developer | tipo, status, construtora | Adicionados |
| city, neighborhood, featured | cidade, bairro, destaque | Já existiam |
| images | imagemPrincipal, galeria; descrição alt | Fotos já existiam; alt adicionado |
| features | comodidades | Adicionado |
| surroundings, deliveryDate | entorno, entrega | Adicionados |
| mapUrl, mapEmbedUrl | mapaUrl, mapaEmbedUrl | Adicionados |
| latitude, longitude | coordenadas.lat, coordenadas.lng | Adicionados |
| isDemo | demonstracao | Adicionado |
| plans | plantas | Adicionado: area, preco, quartos, suites, descricaoSuites, banheiros, unidade, orientacao, imagem e alt; _key identifica cada opção |
| visibilidade | ativo | Adicionado |

## Configuração e publicação

O frontend já aponta por padrão para este projeto/dataset. `.env.example` documenta as variáveis públicas opcionais. Nunca use token de escrita em variável VITE_.

Studio: `npm --prefix studio-rafaelaguiar run dev`. Campos novos só aparecem no Studio hospedado depois de atualizar seu deploy (`npm --prefix studio-rafaelaguiar run deploy`, login de administrador necessário). O site na Vercel também precisa receber esta versão do código uma vez.

Somente conteúdo público do catálogo deve ficar neste dataset; não cadastrar documentos pessoais. A leitura no navegador foi projetada sem credenciais.

Favoritos usam IDs do Sanity. Favoritos de exemplos antigos não migram automaticamente. Arquivos em src/data permanecem como referência/testes; não alimentam mais o site.

Não houve importação, edição ou exclusão de conteúdo remoto. O registro Teste existente continua com o preço informado no Sanity (120000000 reais).

Origens CORS autorizadas sem credenciais: http://127.0.0.1:5173, http://localhost:5173 e https://site-rafael-aguiar.vercel.app.
