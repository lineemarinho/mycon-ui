import { existsSync, readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { expect, test } from "@playwright/test";
import { navGroups, sections } from "../src/content";

/**
 * Impede que o catálogo e o pacote se desencontrem: todo componente em
 * packages/ui/src/components precisa ter seção, prévia e tabela de props.
 */
const componentsDir = fileURLToPath(new URL("../../../packages/ui/src/components", import.meta.url));
const components = readdirSync(componentsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && existsSync(`${componentsDir}/${entry.name}/index.ts`))
  .map((entry) => entry.name);
// demos.tsx importa o pacote (com CSS das fontes), então aqui só lemos o mapa de prévias como texto.
const demosSource = readFileSync(fileURLToPath(new URL("../src/demos.tsx", import.meta.url)), "utf8");
const demoIds = new Set([...demosSource.matchAll(/^  (\w+): \w+Demo,$/gm)].map((match) => match[1]));
const navIds = new Set(navGroups.flatMap((group) => group.items.map((item) => item.id)));

test.describe("todo componente está no catálogo", () => {
  for (const name of components) {
    test(name, () => {
      const id = name.toLowerCase();
      expect(navIds.has(id), `"${name}" não aparece no menu do catálogo (src/content.ts)`).toBe(true);
      expect(sections[id], `"${name}" não tem seção em src/content.ts`).toBeDefined();
      expect(sections[id].props.length, `"${name}" não tem tabela de props`).toBeGreaterThan(0);
      expect(demoIds.has(id), `"${name}" não tem prévia em src/demos.tsx`).toBe(true);
    });
  }
});
