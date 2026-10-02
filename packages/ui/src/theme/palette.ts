import type { Theme } from "@mui/material/styles";
import { brandColors, semanticStrongColors, surfaceColors, textColors, type SemanticColor } from "../tokens/colors";

/** Cores do design system que não existem na paleta padrão do MUI. */
export type MyconPalette = {
  /** Preenchimento de marca (botão primário, página atual, avatar). */
  brand: string;
  brandHover: string;
  /** Opção selecionada em listas (Select/Autocomplete). */
  selectedBg: string;
  selectedText: string;
  /** Preenchimentos com texto branco em cima — todos com contraste ≥ 4.5:1 (WCAG AA). */
  statusFill: Record<SemanticColor, string>;
  /** Base das sombras. */
  shadow: string;
};

declare module "@mui/material/styles" {
  interface Palette {
    mycon: MyconPalette;
  }
  interface PaletteOptions {
    mycon?: MyconPalette;
  }
  interface TypeBackground {
    /** Superfície levemente destacada (botão tertiary, card filled, hover de linhas). */
    raised: string;
  }
}

/** Cores do modo claro — também usadas como reserva quando o app não usa o `myconTheme`. */
export const lightMyconPalette: MyconPalette = {
  brand: brandColors.primary,
  brandHover: "#001ECC",
  selectedBg: "#EEF1FF",
  selectedText: brandColors.primary,
  statusFill: semanticStrongColors,
  shadow: textColors.primary,
};

/**
 * Cores do design system no tema atual. Sem o `myconTheme` (o `useThemeCheck`
 * já avisa nesse caso), cai nas cores do modo claro em vez de quebrar.
 */
export function myconColors(theme: Theme) {
  return {
    ...(theme.palette.mycon ?? lightMyconPalette),
    raised: theme.palette.background.raised ?? surfaceColors.raised,
  };
}
