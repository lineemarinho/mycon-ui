import Box from "@mui/material/Box";
import { keyframes } from "@mui/material/styles";
import { brandColors, surfaceColors } from "../../tokens/colors";

export type SpinnerSize = "xs" | "sm" | "md" | "lg";

const SIZE_PX: Record<SpinnerSize, number> = { xs: 14, sm: 20, md: 28, lg: 40 };

const spin = keyframes`to { transform: rotate(360deg); }`;

export type SpinnerProps = {
  size?: SpinnerSize;
  color?: "primary" | "inherit";
  label?: string;
};

/** Anel de 3px com um quarto destacado girando — mesmo desenho do catálogo (`.mock-spinner`). */
export function Spinner({ size = "md", color = "primary", label = "Carregando" }: SpinnerProps) {
  const px = SIZE_PX[size];
  const isPrimary = color === "primary";
  return (
    <Box
      component="span"
      role="progressbar"
      aria-label={label}
      sx={{
        display: "inline-block",
        flexShrink: 0,
        width: px,
        height: px,
        boxSizing: "border-box",
        border: "3px solid",
        borderColor: isPrimary ? surfaceColors.border : "rgba(255,255,255,0.4)",
        borderTopColor: isPrimary ? brandColors.primary : "currentColor",
        borderRadius: "50%",
        animation: `${spin} 0.7s linear infinite`,
      }}
    />
  );
}
