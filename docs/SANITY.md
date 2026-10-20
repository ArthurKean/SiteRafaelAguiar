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


## Painel reorganizado (outubro de 2026)

O cadastro agora tem abas: Informações básicas, Valores e opções, Fotos, Localização, Publicação e Dados anteriores / avançados.

- Cadastre uma ou mais opções em `plantas`. Cada opção tem nome, preço, área, quartos totais (incluindo suítes), suítes, banheiros, vagas, unidade e posição solar.
- O card calcula área mínima/máxima, menor preço e os máximos de quartos, suítes, banheiros e vagas a partir dos valores preenchidos nas opções. Sem valor em nenhuma opção para uma característica, usa o valor geral anterior no card.
- O detalhe abre na opção mais barata. Características, preço, plantas e WhatsApp acompanham a seleção. Não se copiam as quantidades máximas para a opção: dados não preenchidos ficam ausentes nos detalhes. Preencha vagas nas opções antigas para voltarem a aparecer nos detalhes da seleção.
- `desenhos` aceita várias imagens por opção, com `titulo` (ex.: Térreo e Superior). A antiga `imagem` continua exibida; imagens repetidas são deduplicadas. Remover a referência antiga não apaga o arquivo do Sanity.
- `fotos` é uma galeria opcional exclusiva da opção, exibida separadamente das fotos gerais.
- `imagemApresentacao` controla a seção Imagine seus dias. Sem ela, continua usando a segunda imagem geral, como antes.
- Os campos gerais antigos foram mantidos e movidos à aba avançada. Documentos sem opções continuam funcionando. Preço e área gerais não são mais obrigatórios quando há opções.
- Links, IDs, favoritos, conteúdos e arquivos remotos não foram migrados nem substituídos.

### Cadastros a conferir (backup de 02/10/2026)

Vernazza e Reserva Rangedor ainda não tinham opções: usam os dados gerais anteriores. Landscape, Dom Manuel e Cidade de Viena tinham opções, porém sem vagas por opção. Landscape tinha uma opção de 103,6 m² com 2 quartos e 3 suítes: confirmar o total de quartos, sem correção automática. Os avisos do painel não bloqueiam a publicação de cadastros antigos.

### Backup e publicação

Backup local em `backups/pre-cms-redesign.tar.gz` (documentos e assets), com histórico Git em `backups/pre-cms-redesign.bundle`. Arquivos ignorados pelo Git. Mantenha uma segunda cópia externa.

Publique primeiro o frontend na Vercel e depois o Studio (`npm --prefix studio-rafaelaguiar run deploy`). Assim os novos campos já terão suporte no site quando forem preenchidos. Atualizações do conteúdo continuam sem exigir deploy.

Não importe um backup em produção sem comparar as alterações posteriores. Para recuperação, prefira inspecionar o arquivo e recuperar apenas os documentos afetados ou validar em um dataset separado, conforme os limites da conta.
