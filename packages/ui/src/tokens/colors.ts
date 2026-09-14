/**
 * Cores semânticas consolidadas a partir dos valores hex divergentes
 * encontrados na auditoria (ver AUDITORIA.md §5) — um valor canônico por
 * significado, em vez de repetir o hex em cada componente.
 */
export const semanticColors = {
  success: "#0FC718FF",
  warning: "#F5A623",
  error: "#FF501B",
  neutral: "#9E9E9E",
  info: "#1976D2",
} as const;

export const surfaceColors = {
  raised: "#F9F9FB",
  border: "#CFD3D4",
} as const;

export type SemanticColor = keyof typeof semanticColors;
