import { forwardRef } from "react";
import MuiButton, { type ButtonProps as MuiButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export type ButtonVariant = "primary" | "secondary" | "outline" | "graylight";
export type ButtonSize = "small" | "medium" | "large";

export type ButtonProps = Omit<MuiButtonProps, "variant" | "size" | "color"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
};

const variantToMui: Record<ButtonVariant, MuiButtonProps["variant"]> = {
  primary: "contained",
  secondary: "contained",
  outline: "outlined",
  graylight: "text",
};

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== "ownerVariant",
})<{ ownerVariant: ButtonVariant }>(({ theme, ownerVariant }) => ({
  borderRadius: 8,
  ...(ownerVariant === "graylight" && {
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.text.primary,
  }),
}));

/**
 * Componente de placeholder usado apenas para validar o pipeline de build
 * (tsup ESM+CJS+d.ts) do pacote. A implementação completa, com todas as
 * variantes reais encontradas na auditoria e testes, é feita na Fase 4.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "medium", isLoading, disabled, children, ...rest }, ref) => (
    <StyledButton
      ref={ref}
      ownerVariant={variant}
      variant={variantToMui[variant]}
      size={size}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      aria-disabled={disabled || isLoading || undefined}
      {...rest}
    >
      {children}
    </StyledButton>
  ),
);

Button.displayName = "Button";
