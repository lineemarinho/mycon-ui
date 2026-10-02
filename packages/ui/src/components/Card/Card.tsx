import Box from "@mui/material/Box";
import { radius } from "../../tokens/radius";
import { useThemeCheck } from "../../theme/useThemeCheck";
import { alpha } from "@mui/material/styles";
import { myconColors } from "../../theme/palette";

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
        border: variant === "outlined" ? 1 : 0,
        borderColor: "divider",
        backgroundColor: variant === "filled" ? "background.raised" : "transparent",
        boxShadow: (theme) =>
          variant === "elevated" ? `0 4px 16px ${alpha(myconColors(theme).shadow, theme.palette.mode === "dark" ? 0.4 : 0.14)}` : "none",
      }}
    >
      {children}
    </Box>
  );
}
