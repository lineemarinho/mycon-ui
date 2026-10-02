import MuiAutocomplete from "@mui/material/Autocomplete";
import MuiTextField, { type TextFieldProps } from "@mui/material/TextField";

export type SelectOption<T> = {
  value: T;
  label: string;
};

export type SelectWidth = "auto" | "full";
export type SelectVariant = "outlined" | "filled" | "underline";
export type SelectSize = "sm" | "md" | "lg";

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
  /** Mostra o "x" para limpar a seleção. Default true (o Autocomplete do MUI já é limpável por padrão). */
  clearable?: boolean;
  width?: SelectWidth;
  /** Estilo do campo de input. Default "outlined". */
  variant?: SelectVariant;
  /** Tamanho do campo. `lg` aplica um ajuste de padding/fonte sobre o "medium" do MUI. Default "md". */
  size?: SelectSize;
};

const VARIANT_TO_MUI: Record<SelectVariant, TextFieldProps["variant"]> = {
  outlined: "outlined",
  filled: "filled",
  underline: "standard",
};
const SIZE_TO_MUI: Record<SelectSize, "small" | "medium"> = { sm: "small", md: "medium", lg: "medium" };
/** `size="lg"` do catálogo: padding 14px 16px e fonte 1.05rem (o label não muda). */
const LG_SIZE_SX = {
  "& .MuiOutlinedInput-root, & .MuiFilledInput-root": { paddingTop: "7px", paddingBottom: "7px", paddingLeft: "11px" },
  "& .MuiInputBase-input": { fontSize: "1.05rem" },
} as const;

/**
 * Select/autocomplete padronizado sobre `Autocomplete` do MUI — a busca já
 * é inerente ao componente (digitar filtra as opções). Cobre tanto o
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
  clearable = true,
  width = "full",
  variant = "outlined",
  size = "md",
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
      disableClearable={!clearable}
      fullWidth={width === "full"}
      size={SIZE_TO_MUI[size]}
      renderInput={(params) => (
        <MuiTextField
          {...params}
          variant={VARIANT_TO_MUI[variant]}
          label={label}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
          sx={size === "lg" ? LG_SIZE_SX : undefined}
        />
      )}
    />
  );
}
