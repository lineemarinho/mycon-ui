# mycon-ui

## 0.1.0

### Minor Changes

- 3fedba8: Tipografia do design system:

  - Novo `myconTheme` (e `myconThemeOptions`) para o `ThemeProvider` do MUI: Raleway no texto, Montserrat em títulos, subtítulos, botões e overline. Sem ele, os componentes caíam na fonte padrão do MUI (Roboto) no app consumidor.
  - Fontes Raleway, Montserrat e IBM Plex Mono embutidas no pacote (dependências `@fontsource/*`), carregadas automaticamente ao importar `mycon-ui` — sem Google Fonts/CDN no app.
  - Novo token `fontFamilies` (`body`, `heading`, `mono`).
  - README do pacote com instruções de instalação e uso do tema.

- 48eda1e: Correções de bugs:

  - **Breaking:** peerDependencies de `@mui/material`/`@mui/icons-material` restritas a `^6` (o pacote já dependia de APIs da v6, como `TextField slotProps`, e quebrava silenciosamente na v5).
  - `Input`: `inputMode="numeric"` agora chega ao `<input>` nas máscaras (teclado numérico no celular); `slotProps` do chamador não descarta mais os adornments internos; `sx` em formato de array funciona; o evento de "limpar" inclui `name` (compatível com `register` do react-hook-form).
  - `Textarea`: `slotProps` era ignorado — agora é repassado ao campo (ex.: `maxLength` passa a limitar a digitação, não só o contador).
  - `MultiSelect`: "Selecionar todos" virou uma opção da lista — acessível por teclado, sem remontar a lista a cada seleção e visível durante a busca.
  - `FileUpload`: revoga a URL de preview anterior (vazamento de memória) e permite escolher o mesmo arquivo de novo após remover.
  - `Button` (`tone`) e `StatusBadge` (`variant="tag"`): cor do texto escolhida pelo maior contraste com o fundo (texto branco sobre success/warning/error/neutral ficava abaixo de 4.5:1).
  - Token `semanticColors.success`: `#0FC718FF` → `#0FC718` (mesmo tom, sem alpha redundante).
