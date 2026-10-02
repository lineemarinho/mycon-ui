import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { semanticColors, type SemanticColor } from "../../tokens/colors";
import { fontFamilies } from "../../tokens/typography";

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
          borderRadius: "100px",
          backgroundColor: color,
          color: "#FFFFFF",
          fontFamily: fontFamilies.heading,
          fontSize: "0.72rem",
          fontWeight: 700,
          lineHeight: 1.4,
        }}
      >
        {label}
      </Box>
    );
  }

  return (
    <Box sx={{ display: "inline-flex", alignItems: "center", gap: "7px" }}>
      <Box sx={{ width: 11, height: 11, borderRadius: "50%", backgroundColor: color, flexShrink: 0 }} />
      <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
        {label}
      </Typography>
    </Box>
  );
}
