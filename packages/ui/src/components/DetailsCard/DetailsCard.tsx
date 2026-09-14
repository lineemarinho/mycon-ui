import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { surfaceColors } from "../../tokens/colors";
import { radius } from "../../tokens/radius";

export type DetailRow = {
  label: string;
  value: React.ReactNode;
};

export type DetailsCardProps = {
  rows: DetailRow[];
};

/**
 * Lista vertical de pares label/valor dentro de uma borda, com divisor
 * entre linhas. Unifica o "card de detalhes" reimplementado inline em pelo
 * menos 3 lugares (gerenciar-cotas: dialog de boleto, dialog de boleto
 * mensal, `CardDetalhes` de LanceConfirmacao) — ver AUDITORIA.md §3.
 */
export function DetailsCard({ rows }: DetailsCardProps) {
  return (
    <Box
      sx={{
        border: `1px solid ${surfaceColors.border}`,
        borderRadius: radius.md,
        px: 2.5,
        py: 1,
      }}
    >
      {rows.map((row, index) => (
        <Box
          key={row.label}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            py: 1.25,
            borderTop: index === 0 ? "none" : `1px solid ${surfaceColors.border}`,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {row.label}
          </Typography>
          <Typography variant="body1" fontWeight={600}>
            {row.value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
