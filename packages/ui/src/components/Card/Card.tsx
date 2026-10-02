import Box from "@mui/material/Box";
import { surfaceColors } from "../../tokens/colors";
import { radius } from "../../tokens/radius";
import { useThemeCheck } from "../../theme/useThemeCheck";

export type CardProps = {
  variant?: "outlined" | "elevated" | "filled";
  children: React.ReactNode;
  onClick?: () => void;
};

/** Container genérico de card — bloco de construção para telas específicas. */
export function Card({ variant = "outlined", children, onClick }: CardProps) {
  useThemeCheck();
  return (
    <Box
      onClick={onClick}
      sx={{
        borderRadius: radius.lg,
        p: 2.5,
        cursor: onClick ? "pointer" : "default",
        fontSize: "0.88rem",
        color: "text.secondary",
        border: variant === "outlined" ? `1px solid ${surfaceColors.border}` : "none",
        backgroundColor: variant === "filled" ? surfaceColors.raised : "transparent",
        boxShadow: variant === "elevated" ? "0 4px 16px rgba(54,52,85,0.14)" : "none",
      }}
    >
      {children}
    </Box>
  );
}
