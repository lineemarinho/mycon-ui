import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { Button } from "../Button/Button";

export type ConfirmDialogProps = {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  error?: string | null;
};

/**
 * Modal de confirmação genérico (título, mensagem, cancelar/confirmar,
 * loading, erro), construído sobre `Dialog` do MUI. Substitui as 4+
 * implementações manuais do shell de modal (via `Modal` posicionado com
 * `transform`) encontradas na auditoria — ver AUDITORIA.md §3 e §5.
 */
export function ConfirmDialog({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  loading = false,
  error,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={onCancel} aria-labelledby="confirm-dialog-title">
      <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
        {error && (
          <Typography color="error" sx={{ mt: 1 }} role="alert">
            {error}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="outline" onClick={onCancel} disabled={loading}>
          {cancelText}
        </Button>
        <Button variant="primary" onClick={onConfirm} isLoading={loading}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
