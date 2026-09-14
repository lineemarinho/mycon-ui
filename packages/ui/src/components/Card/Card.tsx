import Box from "@mui/material/Box";
import { surfaceColors } from "../../tokens/colors";
import { radius } from "../../tokens/radius";

export type CardProps = {
  variant?: "outlined" | "elevated" | "filled";
  children: React.ReactNode;
  onClick?: () => void;
};

/** Container genérico de card — bloco de construção para telas específicas. */
export function Card({ variant = "outlined", children, onClick }: CardProps) {
  return (
    <Box
      onClick={onClick}
      sx={{
        borderRadius: radius.md,
        p: 2.5,
        cursor: onClick ? "pointer" : "default",
        border: variant === "outlined" ? `1px solid ${surfaceColors.border}` : "none",
        backgroundColor: variant === "filled" ? surfaceColors.raised : "background.paper",
        boxShadow: variant === "elevated" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
      }}
    >
      {children}
    </Box>
  );
}
