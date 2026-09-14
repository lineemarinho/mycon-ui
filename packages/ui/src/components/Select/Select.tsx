import MuiAutocomplete from "@mui/material/Autocomplete";
import MuiTextField from "@mui/material/TextField";

export type SelectOption<T> = {
  value: T;
  label: string;
};

export type SelectProps<T> = {
  label?: string;
  options: SelectOption<T>[];
  value: T | null;
  onChange: (value: T | null) => void;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  loading?: boolean;
  disabled?: boolean;
};

/**
 * Select/autocomplete padronizado sobre `Autocomplete` do MUI. Cobre tanto o
 * padrão "select simples" quanto o "autocomplete assíncrono" reimplementados
 * de formas divergentes em todos os 11 repos auditados (nenhum tinha
 * componente de design system para isso) — ver AUDITORIA.md §0 e §1.
 */
export function Select<T>({
  label,
  options,
  value,
  onChange,
  placeholder,
  error,
  helperText,
  loading,
  disabled,
}: SelectProps<T>) {
  const selected = options.find((option) => option.value === value) ?? null;

  return (
    <MuiAutocomplete
      options={options}
      value={selected}
      onChange={(_, option) => onChange(option ? option.value : null)}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(a, b) => a.value === b.value}
      loading={loading}
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
