import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { myconDarkTheme, myconTheme, type MyconThemeMode } from "mycon-ui";
import App from "./App";
import "./catalog.css";

const STORAGE_KEY = "mycon-catalog-tema";

/** `?tema=escuro` na URL tem prioridade (usado nos testes visuais); depois, a última escolha. */
function initialMode(): MyconThemeMode {
  const fromUrl = new URLSearchParams(window.location.search).get("tema");
  if (fromUrl === "escuro") return "dark";
  if (fromUrl === "claro") return "light";
  try {
    return localStorage.getItem(STORAGE_KEY) === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

function Root() {
  const [mode, setMode] = useState<MyconThemeMode>(initialMode);

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // Sem acesso ao armazenamento (aba anônima etc.): o tema só não é lembrado.
    }
  }, [mode]);

  return (
    <ThemeProvider theme={mode === "dark" ? myconDarkTheme : myconTheme}>
      <CssBaseline />
      <App mode={mode} onToggleMode={() => setMode((current) => (current === "dark" ? "light" : "dark"))} />
    </ThemeProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
