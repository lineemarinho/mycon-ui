import { forwardRef } from "react";
import Box from "@mui/material/Box";
import MuiButton, { type ButtonProps as MuiButtonProps } from "@mui/material/Button";
import { alpha, darken, keyframes, styled } from "@mui/material/styles";
import { brandColors, semanticColors, surfaceColors, textColors } from "../../tokens/colors";
import { fontFamilies } from "../../tokens/typography";
import { useThemeCheck } from "../../theme/useThemeCheck";

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "outline" | "danger" | "link";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonShape = "square" | "rounded" | "pill";
export type ButtonWidth = "auto" | "full";
export type ButtonIconPosition = "left" | "right";
/** Cor semântica que sobrepõe a cor padrão do `variant` (ex.: um botão "secondary" com tone="warning"). */
export type ButtonTone = "info" | "success" | "warning" | "error";

export type ButtonProps = Omit<MuiButtonProps, "variant" | "size" | "color"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Sobrepõe a cor do `variant` com uma cor semântica, independente do estilo (contained/text/link). */
  tone?: ButtonTone;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: ButtonIconPosition;
  /** Mostra só o ícone, sem texto (lembre de passar `aria-label`). */
  iconOnly?: boolean;
  width?: ButtonWidth;
  shape?: ButtonShape;
};

const SIZE_TO_MUI: Record<ButtonSize, MuiButtonProps["size"]> = { sm: "small", md: "medium", lg: "large" };
const SHAPE_RADIUS: Record<ButtonShape, string> = { square: "4px", rounded: "8px", pill: "500rem" };
const VARIANT_TO_MUI: Record<ButtonVariant, { variant: MuiButtonProps["variant"]; color?: MuiButtonProps["color"] }> = {
  primary: { variant: "contained", color: "primary" },
  secondary: { variant: "contained", color: "secondary" },
  tertiary: { variant: "text" },
  outline: { variant: "outlined" },
  danger: { variant: "contained", color: "error" },
  link: { variant: "text" },
};

const FORWARD_BLOCKLIST = new Set(["ownerVariant", "ownerSize", "ownerShape", "ownerWidth", "ownerIconOnly", "ownerTone", "ownerLoading"]);

const spin = keyframes`to { transform: rotate(360deg); }`;

/** Fundo/texto sólidos de cada variante, conforme o catálogo. */
const VARIANT_COLORS: Record<Exclude<ButtonVariant, "link" | "outline">, { bg: string; fg: string; hover: string }> = {
  primary: { bg: brandColors.primary, fg: "#FFFFFF", hover: "#001ECC" },
  secondary: { bg: textColors.primary, fg: "#FFFFFF", hover: darken(textColors.primary, 0.2) },
  tertiary: { bg: surfaceColors.raised, fg: textColors.primary, hover: surfaceColors.border },
  danger: { bg: semanticColors.error, fg: "#FFFFFF", hover: darken(semanticColors.error, 0.15) },
};

const SIZE_STYLE: Record<ButtonSize, { padding: string; fontSize: string }> = {
  sm: { padding: "7px 16px", fontSize: "0.74rem" },
  md: { padding: "10px 24px", fontSize: "0.82rem" },
  lg: { padding: "13px 30px", fontSize: "0.9rem" },
};

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => !FORWARD_BLOCKLIST.has(prop as string),
})<{
  ownerVariant: ButtonVariant;
  ownerSize: ButtonSize;
  ownerShape: ButtonShape;
  ownerWidth: ButtonWidth;
  ownerIconOnly: boolean;
  ownerTone?: ButtonTone;
  ownerLoading: boolean;
}>(({ ownerVariant, ownerSize, ownerShape, ownerWidth, ownerIconOnly, ownerTone, ownerLoading }) => {
  const toneColor = ownerTone ? semanticColors[ownerTone] : undefined;
  const isLink = ownerVariant === "link";
  const isOutline = ownerVariant === "outline";
  const solid = isLink || isOutline
    ? undefined
    : toneColor
      ? { bg: toneColor, fg: "#FFFFFF", hover: darken(toneColor, 0.15) }
      : VARIANT_COLORS[ownerVariant];
  const linkColor = toneColor ?? brandColors.primary;
  const sizeStyle = SIZE_STYLE[ownerSize];

  return {
    position: "relative",
    minWidth: 0,
    border: "none",
    boxShadow: "none",
    textTransform: "none",
    fontFamily: fontFamilies.heading,
    fontWeight: 700,
    lineHeight: 1.3,
    letterSpacing: "normal",
    borderRadius: SHAPE_RADIUS[ownerShape],
    width: ownerWidth === "full" ? "100%" : undefined,
    ...sizeStyle,
    "&:hover, &:active": { boxShadow: "none" },
    "&.Mui-focusVisible": { boxShadow: "none", outline: `2px solid ${brandColors.primary}`, outlineOffset: 2 },
    "&.Mui-disabled": { opacity: 0.45 },
    ...(solid && {
      backgroundColor: solid.bg,
      color: solid.fg,
      "&:hover": { backgroundColor: solid.hover, boxShadow: "none" },
      // Carregando: mantém a cor cheia (o spinner já indica o estado), como no catálogo.
      "&.Mui-disabled": { opacity: ownerLoading ? 1 : 0.45, backgroundColor: solid.bg, color: solid.fg },
    }),
    ...(isLink && {
      backgroundColor: "transparent",
      color: linkColor,
      textDecoration: "underline",
      textUnderlineOffset: "2px",
      padding: 0,
      borderRadius: 0,
      "&:hover": { backgroundColor: "transparent", textDecoration: "underline" },
      "&.Mui-disabled": { opacity: 0.45, color: linkColor },
    }),
    ...(isOutline && {
      backgroundColor: "transparent",
      color: linkColor,
      border: `1.5px solid ${linkColor}`,
      // Compensa a borda para manter a mesma altura das variantes sólidas.
      padding: sizeStyle.padding
        .split(" ")
        .map((value) => `calc(${value} - 1.5px)`)
        .join(" "),
      "&:hover": { backgroundColor: alpha(linkColor, 0.06), border: `1.5px solid ${linkColor}` },
      "&.Mui-disabled": { opacity: ownerLoading ? 1 : 0.45, color: linkColor, border: `1.5px solid ${linkColor}` },
    }),
    ...(ownerIconOnly && { padding: 10, aspectRatio: "1 / 1" }),
  };
});

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    tone,
    isLoading,
    disabled,
    icon,
    iconPosition = "left",
    iconOnly,
    width = "auto",
    shape = "pill",
    children,
    ...rest
  },
  ref,
) {
  useThemeCheck();
  const muiVariant = VARIANT_TO_MUI[variant];
  const isDisabled = disabled || isLoading;

  return (
    <StyledButton
      ref={ref}
      disableRipple
      ownerVariant={variant}
      ownerSize={size}
      ownerShape={shape}
      ownerWidth={width}
      ownerIconOnly={Boolean(iconOnly)}
      ownerTone={tone}
      ownerLoading={Boolean(isLoading)}
      variant={muiVariant.variant}
      color={muiVariant.color}
      size={SIZE_TO_MUI[size]}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      aria-disabled={isDisabled || undefined}
      {...rest}
    >
      <Box
        component="span"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: icon && !iconOnly ? 0.75 : 0,
          "& .MuiSvgIcon-root": { fontSize: 16 },
          flexDirection: iconPosition === "right" ? "row-reverse" : "row",
          visibility: isLoading ? "hidden" : "visible",
        }}
      >
        {icon}
        {!iconOnly && children}
      </Box>
      {isLoading && (
        <Box
          component="span"
          role="progressbar"
          aria-label="Carregando"
          sx={{
            position: "absolute",
            inset: 0,
            m: "auto",
            width: 14,
            height: 14,
            border: "2px solid rgba(255,255,255,0.5)",
            borderTopColor: "#FFFFFF",
            borderRadius: "50%",
            animation: `${spin} 0.7s linear infinite`,
          }}
        />
      )}
    </StyledButton>
  );
});

Button.displayName = "Button";
