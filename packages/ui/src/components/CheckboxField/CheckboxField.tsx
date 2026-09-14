import MuiCheckbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export type CheckboxFieldSize = "sm" | "md" | "lg";

export type CheckboxFieldProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  indeterminate?: boolean;
  disabled?: boolean;
  /** Posição do label em relação à caixa. Default "end" (label à direita). */
  labelPosition?: "start" | "end";
  /** Tamanho da caixa. `lg` aumenta o ícone além do "medium" nativo do MUI. Default "md". */
  size?: CheckboxFieldSize;
  /** Estiliza a caixa e o label na cor de erro. Combina com `indeterminate`/`disabled`. */
  error?: boolean;
};

const SIZE_TO_MUI: Record<CheckboxFieldSize, "small" | "medium"> = { sm: "small", md: "medium", lg: "medium" };
/** ~20% maior que o ícone padrão (24px) do Checkbox "medium" do MUI, usado quando `size="lg"`. */
const LG_ICON_SX = { "& .MuiSvgIcon-root": { fontSize: "1.75rem" } } as const;

/** Checkbox com label, incluindo estado indeterminado ("selecionar todos"). */
export function CheckboxField({
  label,
  checked,
  onChange,
  indeterminate,
  disabled,
  labelPosition = "end",
  size = "md",
  error,
}: CheckboxFieldProps) {
  const showError = error && !disabled;
  return (
    <FormControlLabel
      labelPlacement={labelPosition === "start" ? "start" : "end"}
      sx={showError ? { color: "error.main" } : undefined}
      control={
        <MuiCheckbox
          checked={checked}
          indeterminate={indeterminate}
          onChange={(event) => onChange(event.target.checked)}
          disabled={disabled}
          size={SIZE_TO_MUI[size]}
          color={showError ? "error" : "primary"}
          sx={size === "lg" ? LG_ICON_SX : undefined}
        />
      }
      label={label}
    />
  );
}
