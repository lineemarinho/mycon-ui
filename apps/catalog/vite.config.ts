import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// O catálogo usa o código-fonte do pacote (não o dist): o que aparece aqui é sempre a versão atual.
export default defineConfig({
  plugins: [react()],
  base: process.env.CATALOG_BASE ?? "/",
  resolve: {
    alias: { "mycon-ui": fileURLToPath(new URL("../../packages/ui/src/index.ts", import.meta.url)) },
  },
});
