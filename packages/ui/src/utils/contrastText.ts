import { getContrastRatio } from "@mui/material/styles";

const LIGHT_TEXT = "#fff";
const DARK_TEXT = "rgba(0, 0, 0, 0.87)";

/**
 * Cor de texto (branco ou quase-preto) com maior contraste sobre `background`.
 * Necessário porque a maioria das `semanticColors` não atinge WCAG AA (4.5:1)
 * com texto branco — ex.: success #0FC718 dá 2.28:1.
 */
export function contrastTextFor(background: string): string {
  return getContrastRatio(background, LIGHT_TEXT) >= getContrastRatio(background, "#000") ? LIGHT_TEXT : DARK_TEXT;
}
