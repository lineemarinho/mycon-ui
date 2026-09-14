import MuiCircularProgress from "@mui/material/CircularProgress";

export type SpinnerSize = "xs" | "sm" | "md" | "lg";

const SIZE_PX: Record<SpinnerSize, number> = { xs: 14, sm: 20, md: 28, lg: 40 };

export type SpinnerProps = {
  size?: SpinnerSize;
  color?: "primary" | "inherit";
  label?: string;
};

export function Spinner({ size = "md", color = "primary", label = "Carregando" }: SpinnerProps) {
  return <MuiCircularProgress size={SIZE_PX[size]} color={color} aria-label={label} />;
}
