import { forwardRef } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import MuiButton, { type ButtonProps as MuiButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "danger" | "link";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonShape = "square" | "rounded" | "pill";
export type ButtonWidth = "auto" | "full";
export type ButtonIconPosition = "left" | "right";

export type ButtonProps = Omit<MuiButtonProps, "variant" | "size" | "color"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
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

const FORWARD_BLOCKLIST = new Set(["ownerVariant", "ownerShape", "ownerWidth", "ownerIconOnly"]);

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => !FORWARD_BLOCKLIST.has(prop as string),
})<{ ownerVariant: ButtonVariant; ownerShape: ButtonShape; ownerWidth: ButtonWidth; ownerIconOnly: boolean }>(
  ({ theme, ownerVariant, ownerShape, ownerWidth, ownerIconOnly }) => ({
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
  }),
);

/**
 * Botão de ação. `variant`/`size`/`isLoading`/`disabled` espelham o que já
 * era usado via `MyconButtons` nos 11 repos auditados; `icon`/`iconPosition`/
 * `iconOnly`/`width`/`shape` cobrem o restante do levantamento de props
 * (ver PROPS-SPEC.md) sem exigir um componente `IconButton` à parte para o
 * caso `iconOnly` (que ainda existe como `IconActionButton` para o caso
 * específico de ícone + tooltip embutido).
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
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
