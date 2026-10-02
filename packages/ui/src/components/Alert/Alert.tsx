import MuiAlert from "@mui/material/Alert";

export type AlertProps = {
  variant?: "info" | "success" | "warning" | "error";
  children: React.ReactNode;
  onClose?: () => void;
};

export function Alert({ variant = "info", children, onClose }: AlertProps) {
  return (
    <MuiAlert severity={variant} onClose={onClose}>
      {children}
    </MuiAlert>
  );
}
