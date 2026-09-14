import FormControlLabel from "@mui/material/FormControlLabel";
import MuiSwitch from "@mui/material/Switch";

export type SwitchFieldProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
};

/**
 * Toggle ativo/inativo com label. Padroniza o `Switch` do MUI usado sem
 * wrapper em `AtivarInativarAction` (cadastro) e nas telas de
 * `blacklist-front`, cada uma reimplementando o par Switch+label à mão.
 */
export function SwitchField({ label, checked, onChange, disabled }: SwitchFieldProps) {
  return (
    <FormControlLabel
      control={<MuiSwitch checked={checked} onChange={(event) => onChange(event.target.checked)} disabled={disabled} />}
      label={label}
    />
  );
}
