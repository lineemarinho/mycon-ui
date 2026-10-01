import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { semanticColors, type SemanticColor } from "../../tokens/colors";
import { radius } from "../../tokens/radius";
import { contrastTextFor } from "../../utils/contrastText";

export type StatusBadgeProps = {
  /** Semântica do status — determina a cor, nunca um hex direto. */
  status: SemanticColor;
  label: string;
  /** `dot`: bolinha colorida + label (legenda/lista). `tag`: pílula sólida (badge compacto). */
  variant?: "dot" | "tag";
};

/**
 * Indicador de status semântico. Substitui os 3 padrões concorrentes
 * encontrados na auditoria (StatusBadge/StatusChip custom, StatusTag via
 * MyconTag, "dot" inline) — ver AUDITORIA.md §1 e §3.
 */
export function StatusBadge({ status, label, variant = "dot" }: StatusBadgeProps) {
  const color = semanticColors[status];

  if (variant === "tag") {
    return (
      <Box
        component="span"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          px: 1.5,
          py: 0.5,
          borderRadius: radius.sm,
          backgroundColor: color,
          color: contrastTextFor(color),
          fontSize: "0.75rem",
          fontWeight: 600,
          lineHeight: 1.4,
        }}
      >
        {label}
      </Box>
    );
  }

  return (
    <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
      <Box sx={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: color, flexShrink: 0 }} />
      <Typography variant="body2">{label}</Typography>
    </Box>
  );
}
