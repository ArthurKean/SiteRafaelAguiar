# Cadastro e integração Sanity

Projeto `jn7uxitm`, dataset `production`, documento `imovel`. Studio: https://rafaelaguiar.sanity.studio/.

## Publicação

Preencha nome, slug, capa e uma ou mais opções com área e preço. Publique o documento. O slug determina `/imoveis/:slug`; não altere links publicados sem planejar um redirecionamento. Marque Destaque para aparecer na home e Exibir no site para permanecer no catálogo.

O frontend consulta `published`. Rascunhos não aparecem. Cadastros antigos sem o campo `ativo` continuam visíveis; sem nome, slug, área ou preço válidos, não são exibidos. Sem imagem válida, é usado um recurso neutro.

Conteúdo publicado é consultado ao abrir/recarregar as páginas; a aba já aberta não recebe mudanças em tempo real. Editar conteúdo não exige deploy do site.

## Opções, quartos e preços

Em Valores e opções, cadastre cada configuração uma vez. Pavimentos são imagens dentro da opção, não opções separadas sem diferença de preço/metragem.

- `quartos`: total, incluindo suítes. Exemplo: 5 quartos totais com 2 suítes significa 3 quartos sem suíte.
- `suites`: quantidade que faz parte desse total; não somar ao campo quartos.
- `banheiros` e `vagas`: quantidades da opção.
- `descricaoSuites`: detalhe adicional, como suíte master, quarto reversível ou semissuíte.
- `nome`, `unidade` e `orientacao`: identificam a opção e complementam o contato.

Cards mostram a faixa de área, o menor preço e máximos das quantidades preenchidas. Dentro do imóvel, a opção mais barata abre inicialmente e a seleção controla os detalhes. Quando nenhuma opção tem uma determinada quantidade, o card pode usar o campo geral antigo; os detalhes de uma opção não herdam automaticamente esse máximo.

Se suítes exceder quartos, o site não afirma aquele total contraditório e indica que precisa ser confirmado. O schema atual mostra avisos de cadastro; esses avisos não necessariamente bloqueiam publicação. Campos vazios precisam ser preenchidos quando conhecidos.

O aviso de preço informa que valores e disponibilidade podem mudar e o botão leva ao WhatsApp com o imóvel e a opção selecionada.

## Fotos, plantas e mapa

- `imagemPrincipal` e `galeria`: capa e fotos gerais. Repetições são deduplicadas.
- `imagemApresentacao`: imagem horizontal da seção “Conheça os ambientes”. Sem ela, usa a segunda imagem geral.
- `plantas[].desenhos`: vários desenhos, com título/pavimento.
- `plantas[].imagem`: planta no formato anterior, ainda suportada e combinada aos desenhos novos.
- `plantas[].fotos`: fotos específicas de uma opção, opcionais.
- `mapaUrl`: link para abrir o Google Maps.
- `mapaEmbedUrl`: somente a URL entre aspas do atributo `src` obtido em Compartilhar → Incorporar mapa.
- `entorno`: endereço e contexto. Sem mapa incorporado, a página exibe bairro/cidade; `demonstracao` influencia o texto e exclui o imóvel das fotos do banner.

## Campos usados pelo frontend

| Informação | Campo |
| --- | --- |
| Identificação | `_id`, `slug.current`, `_createdAt`, `titulo` |
| Descrição e categoria | `descricao`, `tipo`, `status`, `construtora`, `comodidades` |
| Localização | `cidade`, `bairro`, `entorno`, `mapaUrl`, `mapaEmbedUrl` |
| Publicação | `ativo`, `destaque`, `demonstracao` |
| Opções | `plantas`: área, preço, quartos, suítes, configuração, banheiros, vagas, unidade, posição, desenhos e fotos |
| Fotos gerais | `imagemPrincipal`, `galeria`, `imagemApresentacao`, referências de asset e textos alternativos |
| Compatibilidade | `preco`, `precoMaximo`, `area`, `areaMaxima`, quantidades gerais e `descricaoSuites` |

`descricaoCurta`, `entrega` e `coordenadas` permanecem no CMS, mas não são consultados nem exibidos pelo frontend atual. Sua retirada da consulta não apaga os valores armazenados.

## Compatibilidade conferida em 19/10/2026

Reserva Rangedor ainda dependia dos campos gerais, sem opções. Dom Manuel, Cidade de Viena e Landscape usavam respectivamente 2, 2 e 4 imagens de planta no formato anterior. Não remover esse suporte sem migrar e verificar os documentos.

Landscape tinha uma opção de 103,60 m² com 2 quartos e 3 suítes; o total precisa ser conferido pelo responsável. Reserva Rangedor não tinha o total de quartos preenchido. Essas observações são um registro da auditoria, não alterações automáticas dos cadastros.

## Configuração e deploy

As variáveis públicas opcionais estão em `.env.example`. Nunca inserir token de escrita em `VITE_*`. A API é consultada sem credenciais.

```sh
npm --prefix studio-rafaelaguiar run dev
npm --prefix studio-rafaelaguiar run build
npm --prefix studio-rafaelaguiar run deploy
```

Execute esses comandos na raiz do projeto. Dentro da pasta do Studio, use `npm run dev`, `npm run build` ou `npm run deploy`, sem repetir o prefixo. Mudanças no schema/painel exigem deploy do Studio. O site tem build/deploy separado na Vercel. Ao introduzir novos campos, publique primeiro o suporte no frontend e depois o painel.

Origens registradas anteriormente para a integração: `http://127.0.0.1:5173`, `http://localhost:5173` e `https://site-rafael-aguiar.vercel.app`, sem credenciais. Conferir no painel ao adicionar novos domínios.

Favoritos usam IDs dos documentos e ficam no navegador. Os arquivos em `tests/fixtures` são exclusivos dos testes e nunca substituem a resposta da API no site publicado.

## Backup

Backups locais: `backups/pre-cms-redesign.tar.gz` (conteúdo e assets) e `backups/pre-cms-redesign.bundle` (Git). São ignorados pelo Git; mantenha cópia externa. Não importar sobre produção sem comparar alterações posteriores. Preferir recuperação seletiva ou validação em dataset separado.

A limpeza de código não altera documentos, referências de imagens ou permissões do Sanity.
