import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import { Button } from "../Button/Button";
import { fontFamilies } from "../../tokens/typography";

export type FilterPanelProps = {
  open: boolean;
  onClose: () => void;
  onApply: () => void;
  onClear: () => void;
  title?: string;
  children: React.ReactNode;
  applyText?: string;
  clearText?: string;
};

/**
 * Painel de filtros (Drawer) com slot de campos + rodapé Limpar/Aplicar
 * padronizado. Unifica a estrutura repetida em pelo menos 7 dos 11 repos
 * auditados (Select/TextField + rodapé com `MyconButtons`), cada um com
 * layout ligeiramente diferente — ver AUDITORIA.md §1 e §3.
 */
export function FilterPanel({
  open,
  onClose,
  onApply,
  onClear,
  title = "Filtros",
  children,
  applyText = "Aplicar",
  clearText = "Limpar",
}: FilterPanelProps) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: "min(320px, 88vw)", p: 3, display: "flex", flexDirection: "column", gap: 2, height: "100%" }}>
        <Typography variant="h6" sx={{ fontFamily: fontFamilies.heading, fontSize: "1.05rem", fontWeight: 700, color: "text.primary" }}>
          {title}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "14px", flex: 1, overflowY: "auto" }}>
          {children}
        </Box>
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Button variant="outline" onClick={onClear} sx={{ flex: 1 }}>
            {clearText}
          </Button>
          <Button variant="primary" onClick={onApply} sx={{ flex: 1 }}>
            {applyText}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
