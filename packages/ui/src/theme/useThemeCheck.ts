import { useTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    /** Marca que identifica um tema criado a partir de `myconThemeOptions`. */
    mycon?: { version: 1 };
  }
  interface ThemeOptions {
    mycon?: { version: 1 };
  }
}

let warned = false;

/**
 * Avisa uma única vez (só fora de produção) quando um componente é usado sem o
 * `myconTheme` — nesse caso o visual cai no padrão do MUI e não bate com o catálogo.
 */
export function useThemeCheck() {
  const theme = useTheme();
  const isProduction = (globalThis as { process?: { env?: { NODE_ENV?: string } } }).process?.env?.NODE_ENV === "production";
  if (warned || isProduction || theme.mycon) return;
  warned = true;
  console.warn(
    "mycon-ui: componentes renderizados sem o myconTheme — o visual não vai bater com o catálogo. " +
      'Envolva o app com <ThemeProvider theme={myconTheme}> (import { myconTheme } from "mycon-ui").',
  );
}
