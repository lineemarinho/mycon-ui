import MuiChip from "@mui/material/Chip";
import { surfaceColors } from "../../tokens/colors";
import { fontFamilies } from "../../tokens/typography";

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
      sx={{
        height: "auto",
        borderRadius: "100px",
        fontFamily: fontFamilies.heading,
        fontWeight: 700,
        fontSize: "0.72rem",
        lineHeight: 1.4,
        ...(variant === "outline"
          ? { backgroundColor: "transparent", color: "text.primary", border: `1px solid ${surfaceColors.border}` }
          : { backgroundColor: "text.primary", color: "#FFFFFF", border: "1px solid transparent" }),
        "& .MuiChip-label": { padding: "3px 11px" },
        "& .MuiChip-deleteIcon": { fontSize: 16, color: "inherit", opacity: 0.7, mr: "6px", ml: "-6px" },
        "&.Mui-disabled": { opacity: 0.5 },
      }}
    />
  );
}
