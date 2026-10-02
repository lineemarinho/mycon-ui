import MuiSnackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export type ToastProps = {
  open: boolean;
  onClose: () => void;
  message: string;
  variant?: "default" | "success" | "error" | "warning" | "info";
  autoHideDuration?: number;
};

export function Toast({ open, onClose, message, variant = "default", autoHideDuration = 4000 }: ToastProps) {
  return (
    <MuiSnackbar
      open={open}
      onClose={onClose}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      {variant === "default" ? (
        <MuiAlert severity="info" variant="filled" icon={false}>
          {message}
        </MuiAlert>
      ) : (
        <MuiAlert severity={variant} variant="filled" icon={false}>
          {message}
        </MuiAlert>
      )}
    </MuiSnackbar>
  );
}
