import MuiLinearProgress from "@mui/material/LinearProgress";

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
    />
  );
}
