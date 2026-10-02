# mycon-ui

Design system compartilhado do backoffice Mycon, construído sobre MUI v6.

## Instalação

```bash
npm install mycon-ui @mui/material@^6 @mui/icons-material@^6 @emotion/react @emotion/styled
```

## Configuração

As fontes (Raleway, Montserrat e IBM Plex Mono) já vêm no pacote: ao importar `mycon-ui`, o bundler do app (Vite, Next, webpack) inclui os arquivos `.woff2` automaticamente — não é preciso Google Fonts nem CDN.

### Envolva o app com o tema

```tsx
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { myconTheme } from "mycon-ui";

<ThemeProvider theme={myconTheme}>
  <CssBaseline />
  <App />
</ThemeProvider>
```

O tema aplica Raleway no texto e Montserrat em títulos e botões. Sem ele, os componentes usam a fonte padrão do MUI (Roboto).

### Modo escuro

```tsx
import { myconDarkTheme, myconTheme } from "mycon-ui";

<ThemeProvider theme={modoEscuro ? myconDarkTheme : myconTheme}>
```

Os dois temas são testados automaticamente para contraste mínimo de 4.5:1 (WCAG AA) em todo texto.

Se o app já tem um tema próprio, combine com `myconThemeOptions`:

```ts
import { createTheme } from "@mui/material/styles";
import { myconThemeOptions } from "mycon-ui";

const theme = createTheme(myconThemeOptions, { /* suas customizações */ });
```

## Uso

```tsx
import { Button, Input, Logo, brandColors } from "mycon-ui";

<Logo height={36} />
<Button variant="primary">Salvar</Button>
<Button variant="outline">Cancelar</Button>
```

O catálogo com todos os componentes, props e exemplos fica em `apps/catalog` (`npm run catalog` na raiz do repositório). Use o `myconTheme` para que o visual fique idêntico ao catálogo.

## Tokens

- `brandColors`, `semanticColors` (tons vivos, para indicadores), `semanticStrongColors` (tons AA, para texto e fundos com texto branco), `alertTintColors`, `surfaceColors` — cores
- `radius` — raios de borda
- `textColors` — texto principal e secundário
- `fontFamilies` — `body` (Raleway), `heading` (Montserrat), `mono` (IBM Plex Mono)

## Licença

MIT
