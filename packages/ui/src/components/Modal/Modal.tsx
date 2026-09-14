import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export type ModalSize = "sm" | "md" | "lg" | "xl";

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  size?: ModalSize;
};

/** Modal genérico — base para diálogos com conteúdo livre (ver `ConfirmDialog` para o caso de confirmação). */
export function Modal({ open, onClose, title, children, actions, size = "sm" }: ModalProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth={size} fullWidth>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
}
