import { createElement } from "react";
import { alpha, createTheme, type Theme, type ThemeOptions } from "@mui/material/styles";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { brandColors, semanticColors, semanticStrongColors, surfaceColors, textColors } from "../tokens/colors";
import { fontFamilies } from "../tokens/typography";
import { lightMyconPalette, type MyconPalette } from "./palette";
import "./useThemeCheck";

export type MyconThemeMode = "light" | "dark";

/** Como no catálogo: Montserrat só em h1–h3, botões e overline; h4–h6 seguem em Raleway. */
const headingVariants = ["h1", "h2", "h3", "button", "overline"] as const;

const fieldRadius = 10;

/** Cores de cada modo. Todo texto atinge pelo menos 4.5:1 de contraste com o fundo (WCAG AA). */
type ModeTokens = {
  page: string;
  paper: string;
  raised: string;
  line: string;
  ink: string;
  inkSoft: string;
  /** Destaques em texto: links, aba ativa, foco, checkbox marcado. */
  accent: string;
  accentHover: string;
  /** Cor de texto/borda de cada status (helper text, borda de erro, link com tone). */
  status: Record<"success" | "warning" | "error" | "info", string>;
  alert: Record<"success" | "warning" | "error" | "info", { bg: string; text: string }>;
  tooltip: { bg: string; text: string };
  backdrop: string;
  mycon: MyconPalette;
};

const LIGHT: ModeTokens = {
  page: "#FFFFFF",
  paper: "#FFFFFF",
  raised: surfaceColors.raised,
  line: surfaceColors.border,
  ink: textColors.primary,
  inkSoft: textColors.secondary,
  accent: brandColors.primary,
  accentHover: "#001ECC",
  status: {
    success: semanticStrongColors.success,
    warning: semanticStrongColors.warning,
    error: semanticStrongColors.error,
    info: semanticStrongColors.info,
  },
  alert: {
    info: { bg: "#E8F1FC", text: "#176DC2" },
    success: { bg: "#E7FBE8", text: "#0A810F" },
    warning: { bg: "#FFF4E0", text: "#9D6100" },
    error: { bg: "#FFE7DE", text: "#BF3910" },
  },
  tooltip: { bg: textColors.primary, text: "#FFFFFF" },
  backdrop: alpha(textColors.primary, 0.35),
  mycon: lightMyconPalette,
};

const DARK: ModeTokens = {
  page: "#15142A",
  paper: "#1E1D36",
  raised: "#28274A",
  line: "#3A3960",
  ink: "#F1F1F7",
  inkSoft: "#A9A8C6",
  accent: "#7A90FF",
  accentHover: "#9DAEFF",
  // Sobre fundo escuro, os tons vivos já passam de 4.5:1.
  status: {
    success: semanticColors.success,
    warning: semanticColors.warning,
    error: semanticColors.error,
    info: "#4C9AEA",
  },
  alert: {
    info: { bg: alpha("#4C9AEA", 0.16), text: "#8DBFF2" },
    success: { bg: alpha(semanticColors.success, 0.14), text: "#5FE066" },
    warning: { bg: alpha(semanticColors.warning, 0.14), text: "#F8C46E" },
    error: { bg: alpha(semanticColors.error, 0.16), text: "#FF8F6B" },
  },
  tooltip: { bg: "#F1F1F7", text: "#1E1D36" },
  backdrop: "rgba(5, 5, 15, 0.65)",
  mycon: {
    brand: brandColors.primary,
    brandHover: "#2A50FF",
    selectedBg: alpha("#7A90FF", 0.18),
    selectedText: "#B4C1FF",
    statusFill: semanticStrongColors,
    shadow: "#000000",
  },
};

/**
 * Opções de tema do design system para o modo escolhido: paleta, tipografia
 * (Raleway no texto, Montserrat em títulos/botões) e o visual de cada componente.
 */
export function createMyconThemeOptions(mode: MyconThemeMode = "light"): ThemeOptions {
  const t = mode === "dark" ? DARK : LIGHT;
  const shadow = (opacity: number) => alpha(t.mycon.shadow, mode === "dark" ? Math.min(1, opacity * 3) : opacity);
  const popupShadow = `0 12px 32px ${shadow(0.18)}`;

  return {
    mycon: { version: 1 },
    palette: {
      mode,
      primary: { main: t.accent, dark: t.accentHover, contrastText: "#FFFFFF" },
      secondary: { main: t.ink, contrastText: t.paper },
      success: { main: t.status.success, contrastText: "#FFFFFF" },
      warning: { main: t.status.warning, contrastText: "#FFFFFF" },
      error: { main: t.status.error, contrastText: "#FFFFFF" },
      info: { main: t.status.info, contrastText: "#FFFFFF" },
      text: { primary: t.ink, secondary: t.inkSoft },
      background: { default: t.page, paper: t.paper, raised: t.raised },
      divider: t.line,
      action: { hover: t.raised },
      mycon: t.mycon,
    },
    typography: {
      fontFamily: fontFamilies.body,
      ...Object.fromEntries(headingVariants.map((variant) => [variant, { fontFamily: fontFamilies.heading }])),
      button: { fontFamily: fontFamilies.heading, fontWeight: 700, textTransform: "none" },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: { body: { color: t.ink, backgroundColor: t.page, fontSize: 15, lineHeight: 1.6 } },
      },
      MuiPaper: {
        // O MUI clareia o Paper no modo escuro com um gradiente; o design system usa cores sólidas.
        styleOverrides: { root: { backgroundImage: "none" }, rounded: { borderRadius: 12 } },
      },

      // ---- Campos: label acima do campo, borda 1.5px, cantos de 10px e anel de foco ----
      MuiInputLabel: {
        defaultProps: { shrink: true },
        styleOverrides: {
          root: {
            position: "static",
            transform: "none",
            maxWidth: "100%",
            marginBottom: 6,
            fontFamily: fontFamilies.body,
            fontSize: "0.78rem",
            lineHeight: 1.4,
            color: t.inkSoft,
            "&.Mui-focused, &.Mui-error, &.Mui-disabled": { color: t.inkSoft },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: { fontSize: "0.9rem", color: t.ink, "label + &": { marginTop: 0 } },
          input: {
            "&::placeholder": { color: t.inkSoft, opacity: 1 },
            "&.Mui-disabled": { color: t.ink, WebkitTextFillColor: t.ink },
          },
        },
      },
      MuiOutlinedInput: {
        defaultProps: { notched: false },
        styleOverrides: {
          root: ({ theme }: { theme: Theme }) => ({
            borderRadius: fieldRadius,
            backgroundColor: t.paper,
            "& .MuiOutlinedInput-notchedOutline": { borderWidth: 1.5, borderColor: t.line, top: 0 },
            "& .MuiOutlinedInput-notchedOutline legend": { display: "none" },
            "&:hover:not(.Mui-disabled, .Mui-error, .Mui-focused) .MuiOutlinedInput-notchedOutline": { borderColor: t.line },
            "&.Mui-focused": { boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.2)}` },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderWidth: 1.5 },
            "&.Mui-error .MuiOutlinedInput-notchedOutline": { borderColor: theme.palette.error.main },
            "&.Mui-focused.Mui-error": { boxShadow: `0 0 0 3px ${alpha(theme.palette.error.main, 0.2)}` },
            "&.Mui-disabled": { backgroundColor: t.raised },
            "&.Mui-disabled .MuiOutlinedInput-notchedOutline": { borderColor: t.line },
          }),
          input: { padding: "10px 14px" },
          inputSizeSmall: { padding: "7px 10px", fontSize: "0.82rem" },
          multiline: { padding: "10px 14px" },
          inputMultiline: { padding: 0 },
        },
      },
      MuiFilledInput: {
        defaultProps: { disableUnderline: false },
        styleOverrides: {
          root: {
            borderTopLeftRadius: fieldRadius,
            borderTopRightRadius: fieldRadius,
            backgroundColor: t.raised,
            border: "1.5px solid transparent",
            "&:hover, &.Mui-focused": { backgroundColor: t.raised },
            "&::before": { borderBottom: `1.5px solid ${t.inkSoft}` },
            "&:hover:not(.Mui-disabled, .Mui-error)::before": { borderBottom: `1.5px solid ${t.inkSoft}` },
          },
          input: { padding: "10px 14px" },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            "&::before": { borderBottom: `1.5px solid ${t.inkSoft}` },
            "&:hover:not(.Mui-disabled, .Mui-error)::before": { borderBottom: `1.5px solid ${t.inkSoft}` },
          },
          input: { padding: "10px 0" },
        },
      },
      MuiFormHelperText: {
        styleOverrides: { root: { marginLeft: 0, marginRight: 0, marginTop: 6, fontSize: "0.72rem", color: t.inkSoft } },
      },
      MuiAutocomplete: {
        defaultProps: { popupIcon: createElement(ArrowDropDownIcon) },
        styleOverrides: {
          inputRoot: {
            // Só top/bottom/left: o MUI reserva o padding-right para os ícones (seta/limpar).
            "&.MuiOutlinedInput-root": { paddingTop: 3, paddingBottom: 3, paddingLeft: 9 },
            "&.MuiOutlinedInput-root .MuiAutocomplete-input": { padding: "7px 5px" },
            "&.MuiOutlinedInput-root.MuiInputBase-sizeSmall": { paddingTop: 3, paddingBottom: 3, paddingLeft: 6 },
            "&.MuiOutlinedInput-root.MuiInputBase-sizeSmall .MuiAutocomplete-input": { padding: "4px 4px" },
            "&.MuiFilledInput-root": { paddingTop: 3, paddingBottom: 3, paddingLeft: 9 },
            "&.MuiFilledInput-root .MuiAutocomplete-input": { padding: "7px 5px" },
            "&.MuiInput-root .MuiAutocomplete-input": { padding: "10px 0" },
          },
          paper: {
            marginTop: 6,
            border: `1px solid ${t.line}`,
            borderRadius: fieldRadius,
            boxShadow: `0 8px 24px ${shadow(0.12)}`,
          },
          listbox: {
            padding: 0,
            // Seletor reforçado: o estilo interno do MUI para as opções vence o `option` do tema.
            "&.MuiAutocomplete-listbox .MuiAutocomplete-option": {
              minHeight: 0,
              padding: "9px 14px",
              fontSize: "0.88rem",
              lineHeight: 1.6,
              color: t.ink,
            },
            "&.MuiAutocomplete-listbox .MuiAutocomplete-option.Mui-focused": { backgroundColor: t.raised },
            '&.MuiAutocomplete-listbox .MuiAutocomplete-option[aria-selected="true"]': {
              backgroundColor: t.mycon.selectedBg,
              color: t.mycon.selectedText,
              fontWeight: 600,
            },
          },
          noOptions: { padding: "18px 14px", textAlign: "center", color: t.inkSoft, fontSize: "0.85rem" },
          loading: { padding: "18px 14px", color: t.inkSoft, fontSize: "0.85rem" },
          popupIndicator: { color: t.ink, "& .MuiSvgIcon-root": { fontSize: 18 } },
          clearIndicator: { color: t.inkSoft },
          tag: { margin: 2 },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { borderRadius: 100, backgroundColor: t.raised, color: t.ink, fontSize: "0.8rem" },
          outlined: { backgroundColor: "transparent", borderColor: t.line },
          deleteIcon: { color: t.inkSoft, "&:hover": { color: t.ink } },
        },
      },

      // ---- Seleção ----
      MuiCheckbox: {
        defaultProps: { disableRipple: true },
        styleOverrides: { root: { color: t.inkSoft, padding: 3 } },
      },
      MuiRadio: {
        defaultProps: { disableRipple: true },
        styleOverrides: {
          // Círculo visível de ~18px (sm ~14px), como os radios do catálogo.
          root: { color: t.inkSoft, padding: 3, "& .MuiSvgIcon-root": { fontSize: 21 } },
          sizeSmall: { "& .MuiSvgIcon-root": { fontSize: 17 } },
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          root: { marginLeft: -3, marginRight: 0, gap: 2 },
          label: { fontSize: "0.88rem", color: t.ink, "&.Mui-disabled": { color: t.ink } },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            fontSize: "0.78rem",
            color: t.inkSoft,
            marginBottom: 6,
            "&.Mui-focused": { color: t.inkSoft },
          },
        },
      },
      MuiSwitch: {
        defaultProps: { disableRipple: true },
        styleOverrides: {
          root: { width: 40, height: 22, padding: 0, margin: "0 8px 0 0", overflow: "visible" },
          switchBase: {
            padding: 2,
            color: "#FFFFFF",
            "&.Mui-checked": { transform: "translateX(18px)", color: "#FFFFFF" },
            "&.Mui-checked + .MuiSwitch-track": { opacity: 1 },
            "&.Mui-disabled + .MuiSwitch-track": { opacity: 0.45 },
          },
          thumb: { width: 18, height: 18, boxShadow: "0 1px 2px rgba(0,0,0,0.2)" },
          track: { borderRadius: 100, backgroundColor: t.line, opacity: 1 },
        },
      },

      // ---- Superfícies flutuantes ----
      MuiMenu: {
        styleOverrides: {
          paper: { marginTop: 8, border: `1px solid ${t.line}`, boxShadow: popupShadow, minWidth: 190 },
          list: { padding: 0 },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            padding: "11px 16px",
            fontSize: "0.88rem",
            color: t.ink,
            "& + &": { borderTop: `1px solid ${t.line}` },
            "&:hover": { backgroundColor: t.raised },
          },
        },
      },
      MuiPopover: {
        styleOverrides: {
          paper: {
            marginTop: 8,
            border: `1px solid ${t.line}`,
            boxShadow: popupShadow,
            minWidth: 200,
            fontSize: "0.85rem",
            color: t.inkSoft,
          },
        },
      },
      MuiTooltip: {
        defaultProps: { arrow: false },
        styleOverrides: {
          tooltip: {
            backgroundColor: t.tooltip.bg,
            color: t.tooltip.text,
            fontFamily: fontFamilies.body,
            fontSize: "0.72rem",
            padding: "5px 10px",
            borderRadius: 6,
          },
          tooltipPlacementTop: { marginBottom: "8px !important" },
        },
      },
      MuiBackdrop: {
        styleOverrides: { root: { "&:not(.MuiBackdrop-invisible)": { backgroundColor: t.backdrop } } },
      },
      MuiDialog: {
        styleOverrides: {
          paper: { borderRadius: 20, color: t.ink, boxShadow: `0 20px 60px ${shadow(0.25)}` },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: { padding: "24px 24px 8px", fontFamily: fontFamilies.heading, fontSize: "1.1rem", fontWeight: 700, color: t.ink },
        },
      },
      MuiDialogContent: {
        styleOverrides: { root: { padding: "0 24px 24px", color: t.inkSoft, fontSize: "0.9rem" } },
      },
      MuiDialogActions: {
        styleOverrides: {
          root: { padding: "16px 24px", gap: 8, borderTop: `1px solid ${t.line}`, "& > :not(style) ~ :not(style)": { marginLeft: 0 } },
        },
      },
      MuiDrawer: {
        styleOverrides: { paper: { boxShadow: `-12px 0 40px ${shadow(0.2)}` } },
      },
      MuiSnackbarContent: {
        styleOverrides: { root: { borderRadius: 10 } },
      },

      // ---- Feedback ----
      MuiAlert: {
        styleOverrides: {
          root: { borderRadius: 10, padding: "12px 16px", fontSize: "0.85rem", alignItems: "flex-start", gap: 10 },
          icon: { marginRight: 0, padding: "2px 0 0", opacity: 1, fontSize: 18 },
          message: { padding: 0 },
          action: {
            padding: 0,
            marginRight: 0,
            alignSelf: "center",
            "& .MuiIconButton-root": { opacity: 0.7, padding: 0, color: "inherit" },
            "& .MuiSvgIcon-root": { fontSize: 15 },
          },
          standardInfo: { backgroundColor: t.alert.info.bg, color: t.alert.info.text, "& .MuiAlert-icon": { color: "inherit" } },
          standardSuccess: { backgroundColor: t.alert.success.bg, color: t.alert.success.text, "& .MuiAlert-icon": { color: "inherit" } },
          standardWarning: { backgroundColor: t.alert.warning.bg, color: t.alert.warning.text, "& .MuiAlert-icon": { color: "inherit" } },
          standardError: { backgroundColor: t.alert.error.bg, color: t.alert.error.text, "& .MuiAlert-icon": { color: "inherit" } },
          filled: {
            alignItems: "center",
            padding: "10px 16px",
            color: "#FFFFFF",
            boxShadow: `0 8px 24px ${shadow(0.18)}`,
          },
          // Texto branco: preenchimentos com contraste AA nos dois modos.
          filledInfo: { backgroundColor: t.mycon.statusFill.info },
          filledSuccess: { backgroundColor: t.mycon.statusFill.success },
          filledWarning: { backgroundColor: t.mycon.statusFill.warning },
          filledError: { backgroundColor: t.mycon.statusFill.error },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: { height: 8, borderRadius: 100, backgroundColor: t.line },
          bar: { borderRadius: 100 },
        },
      },
      MuiSkeleton: {
        styleOverrides: { root: { backgroundColor: t.line }, rounded: { borderRadius: 8 }, text: { borderRadius: 8 } },
      },

      // ---- Navegação ----
      MuiTabs: {
        styleOverrides: {
          root: { minHeight: 0, borderBottom: `1px solid ${t.line}` },
          flexContainer: { gap: 24 },
          indicator: { height: 2 },
        },
      },
      MuiTab: {
        defaultProps: { disableRipple: true },
        styleOverrides: {
          root: {
            minWidth: 0,
            minHeight: 0,
            padding: "10px 2px",
            fontFamily: fontFamilies.heading,
            fontSize: "0.85rem",
            fontWeight: 400,
            textTransform: "none",
            color: t.inkSoft,
            "&.Mui-selected": { color: t.accent, fontWeight: 600 },
          },
        },
      },
      MuiBreadcrumbs: {
        styleOverrides: {
          root: { fontSize: "0.85rem", color: t.inkSoft },
          separator: { marginLeft: 8, marginRight: 8 },
        },
      },
      MuiLink: {
        styleOverrides: { root: { color: t.inkSoft } },
      },
      MuiPaginationItem: {
        styleOverrides: {
          root: {
            minWidth: 30,
            height: 30,
            margin: "0 3px",
            borderRadius: 100,
            border: `1px solid ${t.line}`,
            backgroundColor: t.paper,
            color: t.ink,
            fontSize: "0.82rem",
            "&.Mui-selected, &.Mui-selected:hover": {
              backgroundColor: t.mycon.brand,
              borderColor: t.mycon.brand,
              color: "#FFFFFF",
            },
          },
          rounded: { borderRadius: 100 },
          ellipsis: { border: "none", backgroundColor: "transparent" },
        },
      },

      // ---- Dados ----
      MuiTableCell: {
        styleOverrides: {
          root: { padding: "10px 14px", borderBottom: `1px solid ${t.line}`, fontSize: "0.88rem", color: t.ink },
          head: {
            fontFamily: fontFamilies.heading,
            fontSize: "0.72rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            color: t.inkSoft,
          },
        },
      },
      MuiTableRow: {
        styleOverrides: { root: { "tbody &:hover": { backgroundColor: t.raised } } },
      },
      MuiTableSortLabel: {
        styleOverrides: {
          root: { "&.Mui-active": { color: t.inkSoft } },
          icon: { color: `${t.accent} !important`, marginLeft: 4, fontSize: 14 },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: { fontFamily: fontFamilies.heading, fontWeight: 700 },
          colorDefault: { backgroundColor: t.mycon.brand, color: "#FFFFFF" },
        },
      },
      MuiAvatarGroup: {
        styleOverrides: {
          avatar: { border: `2px solid ${t.paper}` },
        },
      },
      MuiDivider: {
        styleOverrides: { root: { borderColor: t.line } },
      },
    },
  };
}

/** Cria o tema do design system. `createMyconTheme("dark")` para o modo escuro. */
export function createMyconTheme(mode: MyconThemeMode = "light"): Theme {
  return createTheme(createMyconThemeOptions(mode));
}

/** Opções do tema claro — para combinar com um tema próprio: `createTheme(myconThemeOptions, {...})`. */
export const myconThemeOptions: ThemeOptions = createMyconThemeOptions("light");
/** Opções do tema escuro. */
export const myconDarkThemeOptions: ThemeOptions = createMyconThemeOptions("dark");

export const myconTheme = createTheme(myconThemeOptions);
export const myconDarkTheme = createTheme(myconDarkThemeOptions);
