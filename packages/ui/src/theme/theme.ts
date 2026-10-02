import { createElement } from "react";
import { alpha, createTheme, type ThemeOptions } from "@mui/material/styles";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { brandColors, semanticColors, surfaceColors, textColors } from "../tokens/colors";
import { fontFamilies } from "../tokens/typography";
import "./useThemeCheck";

/** Como no catálogo: Montserrat só em h1–h3, botões e overline; h4–h6 seguem em Raleway. */
const headingVariants = ["h1", "h2", "h3", "button", "overline"] as const;

/** Cores e medidas do design system (visual de referência: catálogo em apps/catalog). */
const ink = textColors.primary;
const inkSoft = textColors.secondary;
const line = surfaceColors.border;
const surfaceRaised = surfaceColors.raised;
const accentHover = "#001ECC";
const fieldRadius = 10;
const popupShadow = `0 12px 32px ${alpha(ink, 0.18)}`;
const backdrop = alpha(ink, 0.35);

/**
 * Tema do design system para o `ThemeProvider` do MUI: paleta de marca,
 * tipografia (Raleway no texto, Montserrat em títulos/botões) e o visual de
 * cada componente conforme o catálogo. Use em `createTheme` quando o app já
 * tiver um tema próprio, ou use `myconTheme` diretamente.
 */
export const myconThemeOptions: ThemeOptions = {
  mycon: { version: 1 },
  palette: {
    primary: { main: brandColors.primary, dark: accentHover, contrastText: "#FFFFFF" },
    secondary: { main: brandColors.darkPrimary, contrastText: "#FFFFFF" },
    success: { main: semanticColors.success, contrastText: "#FFFFFF" },
    warning: { main: semanticColors.warning, contrastText: "#FFFFFF" },
    error: { main: semanticColors.error, contrastText: "#FFFFFF" },
    info: { main: semanticColors.info, contrastText: "#FFFFFF" },
    text: { primary: ink, secondary: inkSoft },
    divider: line,
    action: { hover: surfaceRaised },
  },
  typography: {
    fontFamily: fontFamilies.body,
    ...Object.fromEntries(headingVariants.map((variant) => [variant, { fontFamily: fontFamilies.heading }])),
    button: { fontFamily: fontFamilies.heading, fontWeight: 700, textTransform: "none" },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: { body: { color: ink, fontSize: 15, lineHeight: 1.6 } },
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
          color: inkSoft,
          "&.Mui-focused, &.Mui-error, &.Mui-disabled": { color: inkSoft },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: { fontSize: "0.9rem", color: ink, "label + &": { marginTop: 0 } },
        input: {
          "&::placeholder": { color: inkSoft, opacity: 1 },
          "&.Mui-disabled": { color: ink, WebkitTextFillColor: ink },
        },
      },
    },
    MuiOutlinedInput: {
      defaultProps: { notched: false },
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: fieldRadius,
          backgroundColor: "#FFFFFF",
          "& .MuiOutlinedInput-notchedOutline": { borderWidth: 1.5, borderColor: line, top: 0 },
          "& .MuiOutlinedInput-notchedOutline legend": { display: "none" },
          "&:hover:not(.Mui-disabled, .Mui-error, .Mui-focused) .MuiOutlinedInput-notchedOutline": { borderColor: line },
          "&.Mui-focused": { boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.15)}` },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderWidth: 1.5 },
          "&.Mui-error .MuiOutlinedInput-notchedOutline": { borderColor: theme.palette.error.main },
          "&.Mui-focused.Mui-error": { boxShadow: `0 0 0 3px ${alpha(theme.palette.error.main, 0.15)}` },
          "&.Mui-disabled": { backgroundColor: surfaceRaised },
          "&.Mui-disabled .MuiOutlinedInput-notchedOutline": { borderColor: line },
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
          backgroundColor: surfaceRaised,
          border: "1.5px solid transparent",
          "&:hover, &.Mui-focused": { backgroundColor: surfaceRaised },
          "&::before": { borderBottom: `1.5px solid ${inkSoft}` },
          "&:hover:not(.Mui-disabled, .Mui-error)::before": { borderBottom: `1.5px solid ${inkSoft}` },
        },
        input: { padding: "10px 14px" },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          "&::before": { borderBottom: `1.5px solid ${inkSoft}` },
          "&:hover:not(.Mui-disabled, .Mui-error)::before": { borderBottom: `1.5px solid ${inkSoft}` },
        },
        input: { padding: "10px 0" },
      },
    },
    MuiFormHelperText: {
      styleOverrides: { root: { marginLeft: 0, marginRight: 0, marginTop: 6, fontSize: "0.72rem", color: inkSoft } },
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
          border: `1px solid ${line}`,
          borderRadius: fieldRadius,
          boxShadow: `0 8px 24px ${alpha(ink, 0.12)}`,
        },
        listbox: {
          padding: 0,
          // Seletor reforçado: o estilo interno do MUI para as opções vence o `option` do tema.
          "&.MuiAutocomplete-listbox .MuiAutocomplete-option": {
            minHeight: 0,
            padding: "9px 14px",
            fontSize: "0.88rem",
            lineHeight: 1.6,
            color: ink,
          },
          "&.MuiAutocomplete-listbox .MuiAutocomplete-option.Mui-focused": { backgroundColor: surfaceRaised },
          '&.MuiAutocomplete-listbox .MuiAutocomplete-option[aria-selected="true"]': {
            backgroundColor: "#EEF1FF",
            color: brandColors.primary,
            fontWeight: 600,
          },
        },
        noOptions: { padding: "18px 14px", textAlign: "center", color: inkSoft, fontSize: "0.85rem" },
        loading: { padding: "18px 14px", color: inkSoft, fontSize: "0.85rem" },
        popupIndicator: { color: ink, "& .MuiSvgIcon-root": { fontSize: 18 } },
        tag: { margin: 2 },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 100, backgroundColor: surfaceRaised, color: ink, fontSize: "0.8rem" },
        outlined: { backgroundColor: "transparent", borderColor: line },
        deleteIcon: { color: inkSoft, "&:hover": { color: ink } },
      },
    },

    // ---- Seleção ----
    MuiCheckbox: {
      defaultProps: { disableRipple: true },
      styleOverrides: { root: { color: inkSoft, padding: 3 } },
    },
    MuiRadio: {
      defaultProps: { disableRipple: true },
      styleOverrides: {
        // Círculo visível de ~18px (sm ~14px), como os radios do catálogo.
        root: { color: inkSoft, padding: 3, "& .MuiSvgIcon-root": { fontSize: 21 } },
        sizeSmall: { "& .MuiSvgIcon-root": { fontSize: 17 } },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: { marginLeft: -3, marginRight: 0, gap: 2 },
        label: { fontSize: "0.88rem", color: ink, "&.Mui-disabled": { color: ink } },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: "0.78rem",
          color: inkSoft,
          marginBottom: 6,
          "&.Mui-focused": { color: inkSoft },
        },
      },
    },
    MuiSwitch: {
      defaultProps: { disableRipple: true },
      styleOverrides: {
        root: { width: 40, height: 22, padding: 0, margin: "0 8px 0 0", overflow: "visible" },
        switchBase: {
          padding: 2,
          "&.Mui-checked": { transform: "translateX(18px)", color: "#FFFFFF" },
          "&.Mui-checked + .MuiSwitch-track": { opacity: 1 },
          "&.Mui-disabled + .MuiSwitch-track": { opacity: 0.45 },
        },
        thumb: { width: 18, height: 18, boxShadow: "0 1px 2px rgba(0,0,0,0.2)" },
        track: { borderRadius: 100, backgroundColor: line, opacity: 1 },
      },
    },

    // ---- Superfícies flutuantes ----
    MuiPaper: {
      styleOverrides: { rounded: { borderRadius: 12 } },
    },
    MuiMenu: {
      styleOverrides: {
        paper: { marginTop: 8, border: `1px solid ${line}`, boxShadow: popupShadow, minWidth: 190 },
        list: { padding: 0 },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          padding: "11px 16px",
          fontSize: "0.88rem",
          color: ink,
          "& + &": { borderTop: `1px solid ${line}` },
          "&:hover": { backgroundColor: surfaceRaised },
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          marginTop: 8,
          border: `1px solid ${line}`,
          boxShadow: popupShadow,
          minWidth: 200,
          fontSize: "0.85rem",
          color: inkSoft,
        },
      },
    },
    MuiTooltip: {
      defaultProps: { arrow: false },
      styleOverrides: {
        tooltip: {
          backgroundColor: ink,
          color: "#FFFFFF",
          fontFamily: fontFamilies.body,
          fontSize: "0.72rem",
          padding: "5px 10px",
          borderRadius: 6,
        },
        tooltipPlacementTop: { marginBottom: "8px !important" },
      },
    },
    MuiBackdrop: {
      styleOverrides: { root: { "&:not(.MuiBackdrop-invisible)": { backgroundColor: backdrop } } },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: 20, color: ink, boxShadow: `0 20px 60px ${alpha(ink, 0.25)}` },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: { padding: "24px 24px 8px", fontFamily: fontFamilies.heading, fontSize: "1.1rem", fontWeight: 700, color: ink },
      },
    },
    MuiDialogContent: {
      styleOverrides: { root: { padding: "0 24px 24px", color: inkSoft, fontSize: "0.9rem" } },
    },
    MuiDialogActions: {
      styleOverrides: { root: { padding: "16px 24px", gap: 8, borderTop: `1px solid ${line}`, "& > :not(style) ~ :not(style)": { marginLeft: 0 } } },
    },
    MuiDrawer: {
      styleOverrides: { paper: { boxShadow: `-12px 0 40px ${alpha(ink, 0.2)}` } },
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
        standardInfo: { backgroundColor: "#E8F1FC", color: semanticColors.info, "& .MuiAlert-icon": { color: "inherit" } },
        standardSuccess: { backgroundColor: "#E7FBE8", color: "#0C9612", "& .MuiAlert-icon": { color: "inherit" } },
        standardWarning: { backgroundColor: "#FFF4E0", color: "#A56600", "& .MuiAlert-icon": { color: "inherit" } },
        standardError: { backgroundColor: "#FFE7DE", color: "#C43A10", "& .MuiAlert-icon": { color: "inherit" } },
        filled: {
          alignItems: "center",
          padding: "10px 16px",
          color: "#FFFFFF",
          boxShadow: `0 8px 24px ${alpha(ink, 0.18)}`,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: { height: 8, borderRadius: 100, backgroundColor: line },
        bar: { borderRadius: 100 },
      },
    },
    MuiSkeleton: {
      styleOverrides: { root: { backgroundColor: line }, rounded: { borderRadius: 8 }, text: { borderRadius: 8 } },
    },

    // ---- Navegação ----
    MuiTabs: {
      styleOverrides: {
        root: { minHeight: 0, borderBottom: `1px solid ${line}` },
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
          color: inkSoft,
          "&.Mui-selected": { color: brandColors.primary, fontWeight: 600 },
        },
      },
    },
    MuiBreadcrumbs: {
      styleOverrides: {
        root: { fontSize: "0.85rem", color: inkSoft },
        separator: { marginLeft: 8, marginRight: 8 },
      },
    },
    MuiLink: {
      styleOverrides: { root: { color: inkSoft } },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          minWidth: 30,
          height: 30,
          margin: "0 3px",
          borderRadius: 100,
          border: `1px solid ${line}`,
          backgroundColor: "#FFFFFF",
          color: ink,
          fontSize: "0.82rem",
          "&.Mui-selected, &.Mui-selected:hover": {
            backgroundColor: brandColors.primary,
            borderColor: brandColors.primary,
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
        root: { padding: "10px 14px", borderBottom: `1px solid ${line}`, fontSize: "0.88rem", color: ink },
        head: {
          fontFamily: fontFamilies.heading,
          fontSize: "0.72rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          color: inkSoft,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: { root: { "tbody &:hover": { backgroundColor: surfaceRaised } } },
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: { "&.Mui-active": { color: inkSoft } },
        icon: { color: `${brandColors.primary} !important`, marginLeft: 4, fontSize: 14 },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: { fontFamily: fontFamilies.heading, fontWeight: 700 },
        colorDefault: { backgroundColor: brandColors.primary, color: "#FFFFFF" },
      },
    },
    MuiAvatarGroup: {
      styleOverrides: {
        avatar: { border: "2px solid #FFFFFF" },
      },
    },
    MuiDivider: {
      styleOverrides: { root: { borderColor: line } },
    },
  },
};

export const myconTheme = createTheme(myconThemeOptions);
