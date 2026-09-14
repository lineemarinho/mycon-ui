import MuiCheckbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export type CheckboxFieldProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  indeterminate?: boolean;
  disabled?: boolean;
};

/** Checkbox com label, incluindo estado indeterminado ("selecionar todos"). */
export function CheckboxField({ label, checked, onChange, indeterminate, disabled }: CheckboxFieldProps) {
  return (
    <FormControlLabel
      control={
        <MuiCheckbox
          checked={checked}
          indeterminate={indeterminate}
          onChange={(event) => onChange(event.target.checked)}
          disabled={disabled}
        />
      }
      label={label}
    />
  );
}
