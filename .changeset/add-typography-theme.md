---
"mycon-ui": minor
---

Tipografia do design system:

- Novo `myconTheme` (e `myconThemeOptions`) para o `ThemeProvider` do MUI: Raleway no texto, Montserrat em títulos, subtítulos, botões e overline. Sem ele, os componentes caíam na fonte padrão do MUI (Roboto) no app consumidor.
- Fontes Raleway, Montserrat e IBM Plex Mono embutidas no pacote (dependências `@fontsource/*`), carregadas automaticamente ao importar `mycon-ui` — sem Google Fonts/CDN no app.
- Novo token `fontFamilies` (`body`, `heading`, `mono`).
- README do pacote com instruções de instalação e uso do tema.
