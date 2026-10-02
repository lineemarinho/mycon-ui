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

Se o app já tem um tema próprio, combine com `myconThemeOptions`:

```ts
import { createTheme } from "@mui/material/styles";
import { myconThemeOptions } from "mycon-ui";

const theme = createTheme(myconThemeOptions, { /* suas customizações */ });
```

## Uso

```tsx
import { Button, Input, brandColors } from "mycon-ui";

<Button variant="primary">Salvar</Button>
```

## Tokens

- `brandColors`, `semanticColors`, `alertTintColors`, `surfaceColors` — cores
- `radius` — raios de borda
- `fontFamilies` — `body` (Raleway), `heading` (Montserrat), `mono` (IBM Plex Mono)

## Licença

MIT
