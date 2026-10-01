import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import MuiAutocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import MuiTextField from "@mui/material/TextField";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import type { SelectOption } from "../Select/Select";

export type MultiSelectDisplay = "chips" | "count";
export type MultiSelectVariant = "outlined" | "filled" | "underline";
export type MultiSelectSize = "sm" | "md" | "lg";

export type MultiSelectProps<T> = {
  label?: string;
  options: SelectOption<T>[];
  value: T[];
  onChange: (value: T[]) => void;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  /** Exibe a opção "Selecionar todos" no topo da lista. Ignorada quando `maxSelections` é definido. Default true. */
  selectAll?: boolean;
  /** "chips": um chip por item selecionado. "count": um único chip "N selecionados". Default "chips". */
  display?: MultiSelectDisplay;
  /** Limite de opções selecionáveis simultaneamente. */
  maxSelections?: number;
  /** Estilo do campo de input. Default "outlined". */
  variant?: MultiSelectVariant;
  /** Tamanho do campo. `lg` aplica um ajuste de padding/fonte sobre o "medium" do MUI. Default "md". */
  size?: MultiSelectSize;
  /** Repassado ao `loading` nativo do `Autocomplete` do MUI (já renderiza um indicador de carregamento). */
  loading?: boolean;
};

/**
 * Opção sentinela "Selecionar todos", renderizada como item real da lista
 * (navegável por teclado) e interceptada no `onChange`. Comparada por
 * referência — nunca chega ao `value` do chamador.
 */
const SELECT_ALL_OPTION: SelectOption<never> = { value: Symbol("selectAll") as never, label: "Selecionar todos" };
const defaultFilterOptions = createFilterOptions<SelectOption<unknown>>();

const uncheckedIcon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const VARIANT_TO_MUI: Record<MultiSelectVariant, "outlined" | "filled" | "standard"> = {
  outlined: "outlined",
  filled: "filled",
  underline: "standard",
};
const SIZE_TO_MUI: Record<MultiSelectSize, "small" | "medium"> = { sm: "small", md: "medium", lg: "medium" };
/** Bump de ~15-20% sobre o padding/fonte padrão do TextField "medium" do MUI, usado quando `size="lg"`. */
const LG_SIZE_SX = {
  "& .MuiInputBase-input": { padding: "19px 14px", fontSize: "1.05rem" },
  "& .MuiInputLabel-root": { fontSize: "1.05rem" },
} as const;

/**
 * Seleção múltipla com checkbox por opção, busca interna e "Selecionar
 * todos" — sobre `Autocomplete` do MUI (`multiple`). Substitui o dropdown
 * 100% reimplementado à mão (`Popper`+`Paper`+`Checkbox` manuais, com essa
 * mesma combinação de recursos) encontrado em `backoffice-cupom-front` —
 * ver AUDITORIA.md §5.
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
  selectAll = true,
  display = "chips",
  maxSelections,
  variant = "outlined",
  size = "md",
  loading,
}: MultiSelectProps<T>) {
  const selected = options.filter((option) => value.includes(option.value));
  const allSelected = options.length > 0 && selected.length === options.length;
  const someSelected = selected.length > 0 && !allSelected;
  const showSelectAll = selectAll && !maxSelections && options.length > 0;
  const limitReached = maxSelections !== undefined && value.length >= maxSelections;

  return (
    <MuiAutocomplete
      multiple
      disableCloseOnSelect
      options={showSelectAll ? [SELECT_ALL_OPTION, ...options] : options}
      value={selected}
      onChange={(_, next, _reason, details) => {
        if (details?.option === SELECT_ALL_OPTION) {
          onChange(allSelected ? [] : options.map((option) => option.value));
          return;
        }
        if (maxSelections !== undefined && next.length > maxSelections) return;
        onChange(next.map((option) => option.value));
      }}
      filterOptions={(opts, state) => {
        // "Selecionar todos" fica sempre visível, mesmo com texto de busca.
        const filtered = defaultFilterOptions(
          opts.filter((option) => option !== SELECT_ALL_OPTION),
          state as Parameters<typeof defaultFilterOptions>[1],
        ) as SelectOption<T>[];
        return showSelectAll && filtered.length > 0 ? [SELECT_ALL_OPTION, ...filtered] : filtered;
      }}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(a, b) => a.value === b.value}
      getOptionDisabled={(option) =>
        limitReached && option !== SELECT_ALL_OPTION ? !value.includes(option.value) : false
      }
      disabled={disabled}
      loading={loading}
      size={SIZE_TO_MUI[size]}
      renderTags={
        display === "count"
          ? (tagValue) =>
              tagValue.length > 0 ? <Chip size="small" label={`${tagValue.length} selecionado(s)`} /> : null
          : undefined
      }
      renderOption={(props, option, { selected: isSelected }) => {
        const { key, ...optionProps } = props;
        if (option === SELECT_ALL_OPTION) {
          return (
            <Box component="li" key={key} {...optionProps} sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Checkbox
                checked={allSelected}
                indeterminate={someSelected}
                icon={uncheckedIcon}
                checkedIcon={checkedIcon}
                size="small"
                sx={{ mr: 1 }}
              />
              {option.label}
            </Box>
          );
        }
        return (
          <li key={key} {...optionProps}>
            <Checkbox checked={isSelected} icon={uncheckedIcon} checkedIcon={checkedIcon} size="small" sx={{ mr: 1 }} />
            {option.label}
          </li>
        );
      }}
      renderInput={(params) => (
        <MuiTextField
          {...params}
          variant={VARIANT_TO_MUI[variant]}
          label={label}
          placeholder={placeholder}
          error={error}
          helperText={helperText ?? (maxSelections ? `${value.length}/${maxSelections} selecionados` : undefined)}
          sx={size === "lg" ? LG_SIZE_SX : undefined}
        />
      )}
    />
  );
}
