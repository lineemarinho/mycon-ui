import { forwardRef } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import MuiButton, { type ButtonProps as MuiButtonProps } from "@mui/material/Button";
import { darken, styled } from "@mui/material/styles";
import { semanticColors } from "../../tokens/colors";

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "danger" | "link";
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
const SHAPE_RADIUS: Record<ButtonShape, string> = { square: "4px", rounded: "8px", pill: "999px" };
const VARIANT_TO_MUI: Record<ButtonVariant, { variant: MuiButtonProps["variant"]; color?: MuiButtonProps["color"] }> = {
  primary: { variant: "contained", color: "primary" },
  secondary: { variant: "contained", color: "secondary" },
  tertiary: { variant: "text" },
  danger: { variant: "contained", color: "error" },
  link: { variant: "text" },
};

const FORWARD_BLOCKLIST = new Set(["ownerVariant", "ownerShape", "ownerWidth", "ownerIconOnly", "ownerTone"]);

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => !FORWARD_BLOCKLIST.has(prop as string),
})<{
  ownerVariant: ButtonVariant;
  ownerShape: ButtonShape;
  ownerWidth: ButtonWidth;
  ownerIconOnly: boolean;
  ownerTone?: ButtonTone;
}>(({ theme, ownerVariant, ownerShape, ownerWidth, ownerIconOnly, ownerTone }) => {
  const isTextLike = ownerVariant === "tertiary" || ownerVariant === "link";
  const toneColor = ownerTone ? semanticColors[ownerTone] : undefined;

  return {
    position: "relative",
    borderRadius: SHAPE_RADIUS[ownerShape],
    width: ownerWidth === "full" ? "100%" : undefined,
    ...(ownerIconOnly && { minWidth: 0, paddingLeft: 8, paddingRight: 8, aspectRatio: "1 / 1" }),
    ...(ownerVariant === "tertiary" && {
      backgroundColor: theme.palette.grey[100],
      color: theme.palette.text.primary,
      "&:hover": { backgroundColor: theme.palette.grey[200] },
    }),
    ...(ownerVariant === "link" && {
      backgroundColor: "transparent",
      color: theme.palette.primary.main,
      textDecoration: "underline",
      textUnderlineOffset: "2px",
      padding: 0,
      minWidth: 0,
      "&:hover": { backgroundColor: "transparent" },
    }),
    ...(toneColor &&
      !isTextLike && {
        backgroundColor: toneColor,
        color: "#fff",
        "&:hover": { backgroundColor: darken(toneColor, 0.15) },
      }),
    ...(toneColor &&
      isTextLike && {
        color: toneColor,
      }),
  };
});

/**
 * Botão de ação. `variant`/`size`/`isLoading`/`disabled` espelham o que já
 * era usado via `MyconButtons` nos 11 repos auditados; `icon`/`iconPosition`/
 * `iconOnly`/`width`/`shape` cobrem o restante do levantamento de props
 * (ver PROPS-SPEC.md) sem exigir um componente `IconButton` à parte para o
 * caso `iconOnly` (que ainda existe como `IconActionButton` para o caso
 * específico de ícone + tooltip embutido). `tone` sobrepõe a cor semântica
 * (info/success/warning/error) por cima de qualquer `variant`, já que cor
 * (o que o botão significa) e estilo (contained/text/link) são dimensões
 * independentes.
 */
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
    shape = "rounded",
    children,
    ...rest
  },
  ref,
) {
  const muiVariant = VARIANT_TO_MUI[variant];
  const isDisabled = disabled || isLoading;

  return (
    <StyledButton
      ref={ref}
      ownerVariant={variant}
      ownerShape={shape}
      ownerWidth={width}
      ownerIconOnly={Boolean(iconOnly)}
      ownerTone={tone}
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
          gap: icon && !iconOnly ? 1 : 0,
          flexDirection: iconPosition === "right" ? "row-reverse" : "row",
          visibility: isLoading ? "hidden" : "visible",
        }}
      >
        {icon}
        {!iconOnly && children}
      </Box>
      {isLoading && (
        <CircularProgress
          size={16}
          color="inherit"
          sx={{ position: "absolute", top: "50%", left: "50%", marginTop: "-8px", marginLeft: "-8px" }}
        />
      )}
    </StyledButton>
  );
});

Button.displayName = "Button";
