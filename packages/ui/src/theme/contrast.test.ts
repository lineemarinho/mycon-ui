import { decomposeColor, getContrastRatio, recomposeColor, type Theme } from "@mui/material/styles";
import { describe, expect, it } from "vitest";
import { myconDarkTheme, myconTheme } from "./theme";

/** WCAG AA para texto normal. */
const AA = 4.5;

/** Cor final de um fundo semitransparente aplicado sobre `base` (alertas no modo escuro). */
function flatten(color: string, base: string): string {
  const top = decomposeColor(color);
  const alpha = top.values[3] ?? 1;
  if (alpha >= 1) return color;
  const bottom = decomposeColor(base);
  const values = [0, 1, 2].map((i) => Math.round(top.values[i] * alpha + bottom.values[i] * (1 - alpha)));
  return recomposeColor({ type: "rgb", values: values as [number, number, number] });
}

function pairs(theme: Theme): Array<[string, string, string]> {
  const { palette } = theme;
  const paper = palette.background.paper;
  const raised = palette.background.raised;
  const list: Array<[string, string, string]> = [
    ["texto principal / fundo", palette.text.primary, paper],
    ["texto secundário / fundo", palette.text.secondary, paper],
    ["texto secundário / superfície destacada", palette.text.secondary, raised],
    ["texto principal / superfície destacada", palette.text.primary, raised],
    ["link e destaque / fundo", palette.primary.main, paper],
    ["opção selecionada", palette.mycon.selectedText, flatten(palette.mycon.selectedBg, paper)],
    ["botão primário", "#FFFFFF", palette.mycon.brand],
    ["botão secondary", palette.background.paper, palette.text.primary],
  ];
  for (const status of ["success", "warning", "error", "info"] as const) {
    list.push([`texto ${status} / fundo`, palette[status].main, paper]);
  }
  for (const [status, fill] of Object.entries(palette.mycon.statusFill)) {
    list.push([`texto branco / preenchimento ${status}`, "#FFFFFF", fill]);
  }
  const alert = theme.components?.MuiAlert?.styleOverrides as Record<string, { backgroundColor: string; color: string }>;
  for (const key of ["standardInfo", "standardSuccess", "standardWarning", "standardError"]) {
    list.push([`alerta ${key}`, alert[key].color, flatten(alert[key].backgroundColor, paper)]);
  }
  return list;
}

describe.each([
  ["claro", myconTheme],
  ["escuro", myconDarkTheme],
])("contraste no tema %s", (_, theme) => {
  it.each(pairs(theme))("%s ≥ 4.5:1", (_label, foreground, background) => {
    expect(getContrastRatio(foreground, background)).toBeGreaterThanOrEqual(AA);
  });
});
