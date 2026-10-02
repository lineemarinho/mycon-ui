import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import { surfaceColors } from "../../tokens/colors";

export type IconActionButtonProps = {
  /** Usado como aria-label e como texto do tooltip. */
  label: string;
  icon: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  color?: "primary" | "default";
};

/**
 * Botão de ícone com tooltip embutido. Unifica o padrão "IconButton +
 * Tooltip" reimplementado 15+ vezes na auditoria — inclusive o wrapper em
 * `<span>` necessário para o tooltip funcionar quando o botão está
 * `disabled` (ver AUDITORIA.md, item 3.6 de gerenciar-cotas).
 */
export function IconActionButton({ label, icon, onClick, disabled, color = "default" }: IconActionButtonProps) {
  return (
    <Tooltip title={label}>
      <Box component="span" sx={{ display: "inline-block" }}>
        <IconButton
          onClick={onClick}
          disabled={disabled}
          aria-label={label}
          color={color}
          disableRipple
          sx={{
            width: 36,
            height: 36,
            padding: 0,
            borderRadius: "10px",
            backgroundColor: color === "primary" ? "primary.main" : surfaceColors.raised,
            color: color === "primary" ? "primary.contrastText" : "text.primary",
            "& .MuiSvgIcon-root": { fontSize: 20 },
            "&:hover": {
              backgroundColor: color === "primary" ? "primary.dark" : surfaceColors.border,
            },
            "&.Mui-disabled": {
              opacity: 0.4,
              backgroundColor: color === "primary" ? "primary.main" : surfaceColors.raised,
              color: color === "primary" ? "primary.contrastText" : "text.primary",
            },
          }}
        >
          {icon}
        </IconButton>
      </Box>
    </Tooltip>
  );
}
