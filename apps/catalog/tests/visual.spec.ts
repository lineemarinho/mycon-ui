import { expect, test, type Page } from "@playwright/test";
import { navGroups } from "../src/content";

const sectionIds = navGroups.flatMap((group) => group.items.map((item) => item.id));

async function openCatalog(page: Page) {
  await page.goto("/");
  // Espera as fontes do pacote: sem isso o print pode sair com a fonte do sistema.
  await page.evaluate(() => document.fonts.ready);
}

test.describe("prévias do catálogo", () => {
  for (const id of sectionIds) {
    test(id, async ({ page }) => {
      await openCatalog(page);
      const preview = page.locator(`section#${id} .preview`);
      await preview.scrollIntoViewIfNeeded();
      await expect(preview).toHaveScreenshot(`${id}.png`);
    });
  }
});

test.describe("estados abertos", () => {
  for (const id of ["confirmdialog", "modal", "drawer", "filterpanel"]) {
    test(`${id} aberto`, async ({ page }) => {
      await openCatalog(page);
      await page.locator(`[data-open="${id}"]`).click();
      const surface = page.locator(".MuiDialog-paper, .MuiDrawer-paper").last();
      await expect(surface).toBeVisible();
      await page.waitForTimeout(400); // fim da transição de entrada do MUI
      await expect(surface).toHaveScreenshot(`${id}-aberto.png`);
    });
  }

  test("popover aberto", async ({ page }) => {
    await openCatalog(page);
    await page.locator('[data-open="popover"]').click();
    const paper = page.locator(".MuiPopover-paper");
    await expect(paper).toBeVisible();
    await page.waitForTimeout(400);
    await expect(paper).toHaveScreenshot("popover-aberto.png");
  });

  for (const id of ["select", "multiselect", "autocomplete"]) {
    test(`${id} aberto`, async ({ page }) => {
      await openCatalog(page);
      await page.locator(`[data-field="${id}"] input`).click();
      const listbox = page.locator(".MuiAutocomplete-popper");
      await expect(listbox).toBeVisible();
      await page.waitForTimeout(300);
      await expect(listbox).toHaveScreenshot(`${id}-aberto.png`);
    });
  }

  test("menu do ListItemCard aberto", async ({ page }) => {
    await openCatalog(page);
    await page.locator('section#listitemcard button[aria-label="Mais ações"]').click();
    const menu = page.locator(".MuiMenu-paper");
    await expect(menu).toBeVisible();
    await page.waitForTimeout(400);
    await expect(menu).toHaveScreenshot("listitemcard-menu-aberto.png");
  });
});
