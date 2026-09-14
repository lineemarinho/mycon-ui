import MuiChip from "@mui/material/Chip";

export type TagProps = {
  label: string;
  variant?: "filled" | "outline";
  onRemove?: () => void;
  disabled?: boolean;
};

/** Tag/chip de propósito geral (texto livre), sem semântica de status — ver `StatusBadge` para indicadores de status. */
export function Tag({ label, variant = "filled", onRemove, disabled }: TagProps) {
  return (
    <MuiChip
      label={label}
      variant={variant === "outline" ? "outlined" : "filled"}
      onDelete={onRemove}
      disabled={disabled}
      sx={{ borderRadius: "8px" }}
    />
  );
}
