import MuiAutocomplete from "@mui/material/Autocomplete";
import MuiTextField from "@mui/material/TextField";
import type { SelectOption } from "../Select/Select";

export type MultiSelectProps<T> = {
  label?: string;
  options: SelectOption<T>[];
  value: T[];
  onChange: (value: T[]) => void;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
};

/**
 * Seleção múltipla sobre `Autocomplete` do MUI (`multiple`). Substitui o
 * dropdown 100% reimplementado à mão (`Popper`+`Paper`+`Checkbox` manuais)
 * encontrado em `backoffice-cupom-front` — ver AUDITORIA.md §5.
 */
export function MultiSelect<T>({
  label,
  options,
  value,
  onChange,
  placeholder,
  error,
  helperText,
  disabled,
}: MultiSelectProps<T>) {
  const selected = options.filter((option) => value.includes(option.value));

  return (
    <MuiAutocomplete
      multiple
      options={options}
      value={selected}
      onChange={(_, next) => onChange(next.map((option) => option.value))}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(a, b) => a.value === b.value}
      disabled={disabled}
      renderInput={(params) => (
        <MuiTextField
          {...params}
          label={label}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
        />
      )}
    />
  );
}
