/**
 * Cor de marca oficial, confirmada via CSS de produção de mycon.com.br
 * (--mycon-blue / --mycon-promotional-blue: #0131ff). O mesmo hex aparece
 * hardcoded em componentes internos ad hoc (ex.: MultiSelect do
 * backoffice-cupom-front) — não é coincidência, é a cor de marca real.
 */
export const brandColors = {
  primary: "#0131FF",
  darkPrimary: "#363455",
} as const;

/**
 * Cores semânticas consolidadas a partir dos valores hex divergentes
 * encontrados na auditoria (ver AUDITORIA.md §5) — um valor canônico por
 * significado, em vez de repetir o hex em cada componente. Otimizadas para
 * indicadores sólidos de alto contraste (dots/badges em listas densas), não
 * para fundos de alerta/banner (ver `alertTintColors` para esse caso).
 */
export const semanticColors = {
  success: "#0FC718",
  warning: "#F5A623",
  error: "#FF501B",
  neutral: "#9E9E9E",
  info: "#1976D2",
} as const;

/**
 * Tons pastéis oficiais de mycon.com.br para fundo de alerta/banner
 * (--base-color-system--*), distintos dos tons sólidos de `semanticColors`.
 */
export const alertTintColors = {
  successBg: "#CEF5CA",
  successText: "#114E0B",
  warningBg: "#FCF8D8",
  warningText: "#5E5515",
  errorBg: "#F8E4E4",
  errorText: "#3B0B0B",
} as const;

/** Superfícies e bordas do catálogo (docs/catalog.html: --surface-raised, --line). */
export const surfaceColors = {
  raised: "#F5F6FC",
  border: "#E4E7EC",
} as const;

/** Cores de texto do catálogo (docs/catalog.html: --ink, --ink-soft). */
export const textColors = {
  primary: "#363455",
  secondary: "#6B6A8A",
} as const;

export type SemanticColor = keyof typeof semanticColors;
