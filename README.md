# mycon-ui

Monorepo do design system compartilhado do backoffice Mycon (`@mycon/ui`).

## Estrutura

```
packages/
  ui/       pacote publicável @mycon/ui (componentes + tokens)
```

## Decisões de arquitetura

Ver `DECISIONS.md` no repositório `backoffice-gerenciar-cotas-front` para o histórico completo das decisões (nomenclatura, estilo, tokens, variantes, acessibilidade) que orientam este pacote.

## Desenvolvimento

```bash
npm install
npm run build --workspace=@mycon/ui
npm run test --workspace=@mycon/ui
```

## Status

Fase 3 (scaffold) concluída: estrutura de monorepo, build (`tsup`, saída ESM+CJS+`.d.ts`), testes (`vitest`) e versionamento (`changesets`) configurados, com um componente `Button` de exemplo validando o pipeline ponta a ponta. Implementação completa dos componentes reais (Fase 4) ainda pendente.
