---
"mycon-ui": minor
---

Modo escuro e contraste acessível (WCAG AA):

- **Novo** `myconDarkTheme` (e `createMyconTheme("dark")`, `myconDarkThemeOptions`): todos os componentes funcionam no modo escuro. `myconTheme` continua sendo o tema claro.
- **Contraste:** todo texto agora tem contraste mínimo de 4.5:1 com o fundo. Botões com `tone`, `StatusBadge variant="tag"`, `Toast`, alertas e textos de status/erro usam tons mais escuros das cores semânticas (novo token `semanticStrongColors`). Os tons vivos (`semanticColors`) seguem nos indicadores sem texto: bolinha do `StatusBadge`, barra lateral do `ListItemCard` e `ProgressBar`.
- `Logo`: `color="default"` acompanha a cor do texto do tema (fica clara no modo escuro).
- O spinner do `Button` em carregamento usa a cor do texto do botão (agora aparece também nos botões claros).
- Novo teste automático de contraste para os dois temas.
