import { defineConfig, devices } from "@playwright/test";

/**
 * Testes visuais do catálogo. Os prints de referência são gerados e comparados
 * sempre na imagem Docker oficial do Playwright (Linux), para que a renderização
 * de fontes seja idêntica na máquina de quem desenvolve e no CI — ver
 * scripts/visual-tests.sh na raiz.
 */
export default defineConfig({
  testDir: "tests",
  snapshotPathTemplate: "{testDir}/__screenshots__/{arg}{ext}",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  expect: {
    // Rigoroso de propósito: dentro da mesma imagem Docker a renderização é determinística,
    // então qualquer pixel diferente é uma mudança real (cor, raio, espaçamento...).
    toHaveScreenshot: { threshold: 0.01, maxDiffPixels: 0, animations: "disabled", caret: "hide" },
  },
  use: {
    baseURL: "http://localhost:4318",
    ...devices["Desktop Chrome"],
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 1,
  },
  webServer: {
    command: "npm run build && npm run preview",
    url: "http://localhost:4318",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
