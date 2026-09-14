import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { semanticColors, surfaceColors, type SemanticColor } from "../../tokens/colors";
import { radius } from "../../tokens/radius";

export type ListItemCardProps = {
  /** Cor da barra lateral (semântica de status), opcional. */
  status?: SemanticColor;
  children: React.ReactNode;
  /** Ação exibida à direita do card (ex.: botão de ícone). */
  action?: React.ReactNode;
};

export type KeyValueItemProps = {
  title: string;
  value: React.ReactNode;
  /** Borda divisória à direita do item. Default true. */
  showBorder?: boolean;
  minWidth?: number;
  flex?: string;
};

/**
 * Célula "label + valor" usada dentro de um `ListItemCard`. Unifica o
 * `ListInfoItem`/`CardInfoItem`/`DataCell` reimplementado em pelo menos 9
 * dos 11 repos auditados (ver AUDITORIA.md — duplicação #2).
 */
export function KeyValueItem({ title, value, showBorder = true, minWidth = 160, flex = "1 1 160px" }: KeyValueItemProps) {
  return (
    <Box
      sx={{
        flex,
        minWidth,
        borderRight: showBorder ? `1px solid ${surfaceColors.border}` : "none",
        pr: showBorder ? 2 : 0,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="h6" fontWeight={700} noWrap>
        {value}
      </Typography>
    </Box>
  );
}

/**
 * Card de item de lista com barra lateral colorida por status e colunas de
 * informação. Unifica o padrão "row card" (fundo claro, radius, boxShadow)
 * duplicado em pelo menos 7 dos 11 repos auditados (ver AUDITORIA.md §3).
 * Compõe `KeyValueItem` como children.
 */
export function ListItemCard({ status, children, action }: ListItemCardProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        backgroundColor: surfaceColors.raised,
        borderRadius: radius.md,
        borderLeft: status ? `8px solid ${semanticColors[status]}` : "none",
        boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
        p: 2,
      }}
    >
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, flex: 1 }}>{children}</Box>
      {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
    </Box>
  );
}
