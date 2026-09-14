import { useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { surfaceColors } from "../../tokens/colors";
import { radius } from "../../tokens/radius";

export type SectionCardProps = {
  title: string;
  subtitle?: string;
  /** Exibe borda ao redor da seção. Default true. */
  boxed?: boolean;
  /** Permite colapsar o conteúdo. Default false. */
  collapsible?: boolean;
  defaultExpanded?: boolean;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
};

/**
 * Card de seção com título, borda opcional e colapso opcional. Unifica o
 * `Secao` (gerenciar-cotas, 2 versões com props divergentes — `expandido`
 * vs `boxed`) e o `FormSectionCard` (cupom) — ver AUDITORIA.md §3.
 */
export function SectionCard({
  title,
  subtitle,
  boxed = true,
  collapsible = false,
  defaultExpanded = true,
  headerAction,
  children,
}: SectionCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <Box
      sx={{
        border: boxed ? `1px solid ${surfaceColors.border}` : "none",
        borderRadius: boxed ? radius.md : 0,
        p: boxed ? { xs: 2, sm: 3 } : 0,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
        <Box>
          <Typography variant="h6" fontWeight={700}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {headerAction}
          {collapsible && (
            <IconButton
              size="small"
              onClick={() => setExpanded((prev) => !prev)}
              aria-label={expanded ? "Recolher seção" : "Expandir seção"}
              aria-expanded={expanded}
            >
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          )}
        </Box>
      </Box>
      {collapsible ? (
        <Collapse in={expanded}>
          <Box sx={{ pt: 2 }}>{children}</Box>
        </Collapse>
      ) : (
        <Box sx={{ pt: 2 }}>{children}</Box>
      )}
    </Box>
  );
}
