import { createTheme, type ThemeOptions } from "@mui/material/styles";
import { fontFamilies } from "../tokens/typography";

const headingVariants = ["h1", "h2", "h3", "h4", "h5", "h6", "subtitle1", "subtitle2", "button", "overline"] as const;

/**
 * Tipografia do design system para o tema do MUI: Raleway no texto,
 * Montserrat em títulos/botões. Use em `createTheme` quando o app já tiver
 * um tema próprio, ou use `myconTheme` diretamente.
 */
export const myconThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: fontFamilies.body,
    ...Object.fromEntries(headingVariants.map((variant) => [variant, { fontFamily: fontFamilies.heading }])),
  },
};

export const myconTheme = createTheme(myconThemeOptions);
