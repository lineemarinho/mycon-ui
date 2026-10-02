import MuiLinearProgress from "@mui/material/LinearProgress";
import { semanticColors } from "../../tokens/colors";

export type ProgressBarProps = {
  value?: number;
  variant?: "determinate" | "indeterminate";
  color?: "primary" | "success" | "warning" | "error";
};

export function ProgressBar({ value, variant = "determinate", color = "primary" }: ProgressBarProps) {
  return (
    <MuiLinearProgress
      variant={variant}
      value={value}
      color={color}
      aria-valuenow={value}
      // Barra sem texto: mantém os tons vivos de status (o contraste AA vale para texto).
      sx={color === "primary" ? undefined : { "& .MuiLinearProgress-bar": { backgroundColor: semanticColors[color] } }}
    />
  );
}
