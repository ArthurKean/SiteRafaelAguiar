# Rafael Aguiar — Curadoria de Imóveis

Catálogo imobiliário responsivo com React, TypeScript, Vite e CSS. V1 com dados locais, organizada para receber uma API futuramente.

## Executar localmente

Use Node.js 24 (versão indicada em `.nvmrc`) e npm.

```sh
npm ci
npm run dev
```

Abra [localhost:5173](http://127.0.0.1:5173/).

## Comandos

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Iniciar o desenvolvimento |
| `npm run build` | Verificar TypeScript e gerar `dist/` |
| `npm run preview` | Visualizar o build local |
| `npm test` | Executar testes unitários |
| `npm run test:e2e` | Executar testes de navegador; requer Microsoft Edge instalado |
| `npm run images:prepare` | Gerar imagens otimizadas a partir dos originais |

## Estrutura

```text
assets/originals/
  brand/               # Logos originais fornecidos
  portraits/           # Foto original do corretor
  properties/          # Fotografias ilustrativas de referência
docs/
  PROJECT.md           # Arquitetura, decisões, limitações e origem das imagens
public/images/         # Imagens otimizadas usadas pelo site
scripts/               # Preparação de imagens
src/
  components/          # Componentes reutilizáveis
  data/                # Dados de demonstração
  pages/               # Páginas e rotas
  services/            # Acesso aos dados e filtros
  styles/              # Tokens e estilos responsivos
  types/               # Contratos TypeScript
  utils/               # Hooks e funções auxiliares
tests/                 # Testes de navegador
.env.example           # Modelo de configuração de contato
```

Os originais ficam fora do código e da pasta pública. As versões de `public/images/` são versionadas para que o site funcione imediatamente após `npm ci`, sem precisar regenerar imagens.

## Funcionalidades

- Home com carrossel automático a cada 5 segundos, pausa e seleção manual.
- Busca, filtros na URL e ordenação de imóveis.
- Páginas individuais com galeria, especificações, plantas e contato.
- Layout para desktop, tablet e celular, navegação por teclado e movimento reduzido.
- Foto e identidade do corretor; CRECI 8404 no rodapé.

## Configuração de contato

Copie `.env.example` para `.env.local` e preencha `VITE_WHATSAPP_NUMBER` com o número real, incluindo país e DDD, apenas dígitos. Reinicie o servidor ou gere um novo build.

Sem número configurado, o site mostra uma mensagem de demonstração. Variáveis com prefixo `VITE_` são públicas no frontend; não use esse prefixo para segredos.

## Dados demonstrativos

O Vernazza contém os dados fornecidos pelo corretor em 20/09/2026, em `src/data/vernazza.ts`, e perspectivas artísticas do empreendimento. Os outros cinco imóveis são exemplos identificados. Ainda faltam o estágio da obra, o código da unidade maior e o número de banheiros do Vernazza. Não há backend, banco de dados, login ou painel administrativo nesta versão.

Leia [a documentação técnica](docs/PROJECT.md) para detalhes da arquitetura, referência no Figma, limitações de SEO e origem dos assets.

## Enviar ao GitHub

O projeto já contém um repositório Git. Na pasta do projeto, revise e registre as alterações:

```sh
git status
git add .
git diff --cached --stat
git commit -m "Organiza estrutura e documentação do projeto"
```

Depois, envie pelo GitHub Desktop ou faça push para o repositório remoto escolhido. Não é necessário executar `git init` novamente.

O `.gitignore` exclui dependências, builds, caches, relatórios de testes e arquivos `.env` locais. `package-lock.json`, `.env.example`, código, documentação e imagens devem acompanhar o repositório. Se enviar pela interface web do GitHub, lembre que ela não aplica automaticamente o `.gitignore`: selecione apenas os arquivos versionáveis, sem `node_modules/`, `dist/`, `.npm-cache/` ou `test-results/`.

Para hospedar o site, use o build gerado em `dist/` e configure o provedor para encaminhar as rotas da SPA para `index.html`.
