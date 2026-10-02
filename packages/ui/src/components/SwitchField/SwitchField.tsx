import CircularProgress from "@mui/material/CircularProgress";
import FormControlLabel from "@mui/material/FormControlLabel";
import MuiSwitch from "@mui/material/Switch";

export type SwitchFieldTone = "primary" | "success" | "error";
export type SwitchFieldSize = "sm" | "md" | "lg";

export type SwitchFieldProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  /** Cor do estado "ligado". Default "primary". */
  tone?: SwitchFieldTone;
  /** Mostra um spinner e desabilita o campo enquanto uma mudança está em andamento (ex.: chamada de API). */
  loading?: boolean;
  labelPosition?: "start" | "end";
  /** Tamanho do switch. O MUI não tem um tamanho "large" nativo — `lg` aplica um `transform: scale(...)`. Default "md". */
  size?: SwitchFieldSize;
};

const TONE_TO_MUI: Record<SwitchFieldTone, "primary" | "success" | "error"> = {
  primary: "primary",
  success: "success",
  error: "error",
};
/** Como no catálogo, os tamanhos são o mesmo switch (40×22) em escala. */
const SIZE_SX: Record<SwitchFieldSize, object | undefined> = {
  sm: { transform: "scale(0.82)", transformOrigin: "left center" },
  md: undefined,
  lg: { transform: "scale(1.15)", transformOrigin: "left center" },
};
const SIZE_TO_PROGRESS: Record<SwitchFieldSize, number> = { sm: 16, md: 20, lg: 24 };
/** MUI Switch não tem tamanho "large" nativo — escala o root em ~15%, ancorado à esquerda. */

/**
 * Toggle ativo/inativo com label. Padroniza o `Switch` do MUI usado sem
 * wrapper em `AtivarInativarAction` (cadastro) e nas telas de
 * `blacklist-front`, cada uma reimplementando o par Switch+label à mão.
 */
export function SwitchField({
  label,
  checked,
  onChange,
  disabled,
  tone = "primary",
  loading,
  labelPosition = "end",
  size = "md",
}: SwitchFieldProps) {
  return (
    <FormControlLabel
      sx={{ ml: 0 }}
      labelPlacement={labelPosition === "start" ? "start" : "end"}
      control={
        loading ? (
          <CircularProgress size={SIZE_TO_PROGRESS[size]} sx={{ mx: 1.5 }} />
        ) : (
          <MuiSwitch
            checked={checked}
            onChange={(event) => onChange(event.target.checked)}
            disabled={disabled}
            color={TONE_TO_MUI[tone]}
            sx={SIZE_SX[size]}
          />
        )
      }
      label={label}
    />
  );
}
