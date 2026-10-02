# mycon-ui

Monorepo do design system do backoffice Mycon.

```
packages/
  ui/        pacote publicado no npm como `mycon-ui` (componentes, tema e tokens)
apps/
  catalog/   catálogo com todos os componentes reais, props e exemplos
```

## Desenvolvimento

```bash
npm install
npm run catalog        # catálogo em http://localhost:5173 (usa o código-fonte do pacote, com hot reload)
npm test               # testes unitários do pacote
npm run typecheck      # pacote + catálogo
npm run build          # gera o pacote em packages/ui/dist
```

## Catálogo

O catálogo (`apps/catalog`) é a referência visual do design system: cada prévia é o componente
de verdade, renderizado com o `myconTheme`. Ao criar ou mudar um componente:

1. adicione/atualize a prévia em `apps/catalog/src/demos.tsx`;
2. adicione/atualize a seção (props e exemplo de código) em `apps/catalog/src/content.ts`.

Um teste garante que todo componente em `packages/ui/src/components` tem seção, prévia e tabela de props.

## Testes visuais

Cada seção do catálogo (e os estados abertos de modais, menus e listas) tem um print de referência em
`apps/catalog/tests/__screenshots__`. Os testes comparam o visual atual com esses prints.

```bash
npm run test:visual          # compara com os prints de referência
npm run test:visual:update   # regera os prints depois de uma mudança visual intencional
```

Rodam dentro da imagem Docker oficial do Playwright (precisa do Docker Desktop), a mesma usada no CI,
para que os prints sejam idênticos em qualquer máquina. Quando um teste falha, o relatório com o
antes/depois fica em `apps/catalog/playwright-report`.

## Publicação

O versionamento usa [changesets](https://github.com/changesets/changesets):

1. Ao fazer uma mudança no pacote, rode `npm run changeset` e descreva o que mudou.
2. Faça push na `main`. O GitHub Actions abre o PR **"Versionar pacotes"** com a nova versão e o CHANGELOG.
3. Ao mergear esse PR, o GitHub Actions publica a nova versão no npm.

## CI (GitHub Actions)

- **CI**: typecheck, testes unitários, build do pacote e do catálogo, e testes visuais, em todo push e PR.
- **Release**: versionamento e publicação no npm (ver acima).
- **Catálogo**: publica o catálogo no GitHub Pages a cada push na `main`.
