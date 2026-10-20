# Sanity Studio — Rafael Aguiar

Painel de imóveis do projeto `jn7uxitm`, dataset `production`. Hospedado em https://rafaelaguiar.sanity.studio/.

Na raiz deste Studio:

```sh
npm ci
npm run dev
npm run build
```

Para publicar mudanças no painel, use `npm run deploy` e a conta autorizada no Sanity. Na raiz do repositório principal, acrescente `--prefix studio-rafaelaguiar` após `npm`.

`schemaTypes/imovel.ts` define o cadastro. `sanity.config.ts` registra o projeto e os plugins de edição/consulta; `sanity.cli.ts` configura a CLI. O frontend é um projeto separado, na pasta superior.

Campos antigos ainda atendem imóveis publicados e devem ser preservados até uma migração conferida. Instruções de cadastro, fotos, plantas, quartos e backup estão em [docs/SANITY.md](../docs/SANITY.md).
