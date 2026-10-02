import { useEffect, useRef, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import MuiAutocomplete from "@mui/material/Autocomplete";
import MuiTextField, { type TextFieldProps } from "@mui/material/TextField";
import type { SelectOption } from "../Select/Select";

export type AutocompleteWidth = "auto" | "full";
export type AutocompleteVariant = "outlined" | "filled" | "underline";
export type AutocompleteSize = "sm" | "md" | "lg";

export type AutocompleteProps<T> = {
  label?: string;
  options: SelectOption<T>[];
  value: T | null;
  onChange: (value: T | null) => void;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  /** Estilo do campo de input. Default "outlined". */
  variant?: AutocompleteVariant;
  /** Tamanho do campo. `lg` aplica um ajuste de padding/fonte sobre o "medium" do MUI. Default "md". */
  size?: AutocompleteSize;
  width?: AutocompleteWidth;
  /** Mostra o "x" para limpar a seleção. Default true. */
  clearable?: boolean;
  /**
   * Modo assíncrono: quando fornecido, digitar faz debounce e chama
   * `onSearch` em vez de filtrar `options` localmente. O resultado
   * substitui a lista de opções exibida.
   */
  onSearch?: (query: string) => Promise<SelectOption<T>[]>;
  /** Debounce (ms) aplicado antes de chamar `onSearch`. Só relevante quando `onSearch` é fornecido. Default 300. */
  debounceMs?: number;
  /**
   * Habilita o `freeSolo` do MUI, permitindo confirmar um valor digitado
   * que não está entre as opções. Como `onChange` é tipado como
   * `(value: T | null) => void` e `T` pode não ser `string`, esse recurso
   * só é totalmente seguro quando `T = string` (o valor digitado é
   * repassado como está via cast); para outros `T` o valor bruto digitado
   * não corresponde a nenhum `SelectOption<T>.value` real, então use com
   * cautela. Default `false`.
   */
  allowCustomValue?: boolean;
  /** Mensagem exibida quando não há opções correspondentes. */
  noOptionsMessage?: string;
};

const VARIANT_TO_MUI: Record<AutocompleteVariant, TextFieldProps["variant"]> = {
  outlined: "outlined",
  filled: "filled",
  underline: "standard",
};
const SIZE_TO_MUI: Record<AutocompleteSize, "small" | "medium"> = { sm: "small", md: "medium", lg: "medium" };
/** `size="lg"` do catálogo: padding 14px 16px e fonte 1.05rem (o label não muda). */
const LG_SIZE_SX = {
  "& .MuiOutlinedInput-root, & .MuiFilledInput-root": { paddingTop: "7px", paddingBottom: "7px", paddingLeft: "11px" },
  "& .MuiInputBase-input": { fontSize: "1.05rem" },
} as const;

/**
 * Autocomplete padronizado sobre `Autocomplete` do MUI, no mesmo espírito do
 * `Select`, mas com suporte a busca assíncrona (`onSearch`, com debounce e
 * proteção contra respostas fora de ordem) e a valores digitados livremente
 * (`allowCustomValue`, via `freeSolo`).
 */
export function Autocomplete<T>({
  label,
  options,
  value,
  onChange,
  placeholder,
  error,
  helperText,
  disabled,
  variant = "outlined",
  size = "md",
  width = "full",
  clearable = true,
  onSearch,
  debounceMs = 300,
  allowCustomValue = false,
  noOptionsMessage = "Nenhuma opção encontrada",
}: AutocompleteProps<T>) {
  const [localOptions, setLocalOptions] = useState(options);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const requestIdRef = useRef(0);

  // Sem modo assíncrono, a lista exibida acompanha diretamente a prop `options`.
  useEffect(() => {
    if (!onSearch) setLocalOptions(options);
  }, [options, onSearch]);

  useEffect(() => {
    if (!onSearch) return undefined;
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      const requestId = ++requestIdRef.current;
      setLoading(true);
      onSearch(inputValue)
        .then((results) => {
          // Ignora respostas de buscas antigas que resolveram fora de ordem.
          if (requestIdRef.current === requestId) setLocalOptions(results);
        })
        .finally(() => {
          if (requestIdRef.current === requestId) setLoading(false);
        });
    }, debounceMs);
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [inputValue, onSearch, debounceMs]);

  const effectiveOptions = onSearch ? localOptions : options;
  const selected = effectiveOptions.find((option) => option.value === value) ?? null;

  return (
    <MuiAutocomplete
      freeSolo={allowCustomValue}
      options={effectiveOptions}
      value={selected}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
      onChange={(_, newValue) => {
        if (typeof newValue === "string") {
          // freeSolo: só é totalmente type-safe quando T = string (ver comentário em `allowCustomValue`).
          onChange(newValue as unknown as T);
          return;
        }
        onChange(newValue ? newValue.value : null);
      }}
      getOptionLabel={(option) => (typeof option === "string" ? option : option.label)}
      isOptionEqualToValue={(a, b) => (typeof a === "string" || typeof b === "string" ? a === b : a.value === b.value)}
      loading={loading}
      disabled={disabled}
      disableClearable={!clearable}
      fullWidth={width === "full"}
      size={SIZE_TO_MUI[size]}
      noOptionsText={noOptionsMessage}
      renderInput={(params) => (
        <MuiTextField
          {...params}
          variant={VARIANT_TO_MUI[variant]}
          label={label}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
          sx={size === "lg" ? LG_SIZE_SX : undefined}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={16} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
