import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

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
          sx={{
            borderRadius: "10px",
            backgroundColor: color === "primary" ? "primary.main" : "action.hover",
            color: color === "primary" ? "primary.contrastText" : "text.primary",
            "&:hover": {
              backgroundColor: color === "primary" ? "primary.dark" : "action.selected",
            },
          }}
        >
          {icon}
        </IconButton>
      </Box>
    </Tooltip>
  );
}
