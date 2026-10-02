import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { myconTheme } from "mycon-ui";
import App from "./App";
import "./catalog.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={myconTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
);
