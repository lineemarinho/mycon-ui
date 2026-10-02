import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";

export type DrawerProps = {
  open: boolean;
  onClose: () => void;
  anchor?: "left" | "right" | "top" | "bottom";
  children: React.ReactNode;
  width?: number;
};

/** Drawer genérico — base para painéis laterais com conteúdo livre (ver `FilterPanel` para o caso de filtros). */
export function Drawer({ open, onClose, anchor = "right", children, width = 320 }: DrawerProps) {
  const isHorizontal = anchor === "left" || anchor === "right";
  return (
    <MuiDrawer anchor={anchor} open={open} onClose={onClose}>
      <Box sx={{ width: isHorizontal ? `min(${width}px, 88vw)` : "auto", p: 3 }}>{children}</Box>
    </MuiDrawer>
  );
}
