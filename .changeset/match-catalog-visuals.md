---
"mycon-ui": minor
---

Visual dos componentes alinhado ao catálogo (docs/catalog.html) — fontes, cores e espaçamentos:

- `myconTheme` agora cobre todos os componentes MUI usados: paleta de marca, campos com label acima, borda 1.5px, cantos de 10px e anel de foco; listas, menus, diálogos, tooltip, tabs, tabela, paginação, alertas e skeleton no padrão do catálogo.
- **Novo** `Logo` (SVG oficial da Mycon; `height`, `color="default" | "brand" | "white"`).
- **Novo** `Button variant="outline"`. **Mudança de padrão:** `shape` agora é `"pill"` (era `"rounded"`), como no catálogo.
- `MultiSelect`: **novo** `display="text"` (rótulos separados por vírgula), agora o padrão; label flutuante sobre a borda e sem "x" de limpar.
- `Button`/`StatusBadge` com `tone`: texto sempre branco, como no catálogo.
- `Tag`: pílula escura em Montserrat (e versão `outline` com borda).
- `Spinner`: anel de 3px com um quarto destacado, igual ao catálogo.
- `Toast`: sem ícone e sem botão de fechar (some sozinho).
- `Card`, `ListItemCard`, `SectionCard`, `DetailsCard`, `EmptyState`, `FileUpload`, `FilterPanel`, `ConfirmDialog`, `IconActionButton`, `Breadcrumb`, `DataTable`, `RadioGroupField`, `SwitchField`, `CheckboxField`: medidas e cores do catálogo.
- Tokens: `surfaceColors` atualizados para os valores do catálogo (`raised` #F5F6FC, `border` #E4E7EC) e novo `textColors`.
- Correção: campos com `success` não mostravam a borda verde; o padding dos campos de seleção cobria a área clicável sob a seta.
