import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import MuiAutocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import MuiTextField from "@mui/material/TextField";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import type { SelectOption } from "../Select/Select";
import { fontFamilies } from "../../tokens/typography";
import { useThemeCheck } from "../../theme/useThemeCheck";
import { alpha } from "@mui/material/styles";
import { myconColors } from "../../theme/palette";

export type MultiSelectDisplay = "text" | "chips" | "count";
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
  /** "text": rótulos separados por vírgula. "chips": um chip por item. "count": um único chip "N selecionados". Default "text". */
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
const CHECKBOX_SX = { p: 0, "& .MuiSvgIcon-root": { fontSize: 20 } } as const;
/**
 * Label flutuante sobre a borda, como no catálogo —
 * diferente dos demais campos, que usam o label acima do campo (ver tema).
 */
const FLOATING_LABEL_SX = {
  "& .MuiInputLabel-root": {
    position: "absolute",
    top: 0,
    left: 10,
    zIndex: 1,
    transform: "translateY(-50%)",
    m: 0,
    px: "6px",
    backgroundColor: "background.paper",
    fontFamily: fontFamilies.heading,
    fontSize: "0.72rem",
    lineHeight: 1.4,
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "primary.main" },
  "& .MuiInputLabel-root.Mui-error": { color: "error.main" },
  "& .MuiOutlinedInput-root": { paddingTop: "9px", paddingBottom: "9px", paddingLeft: "11px", flexWrap: "nowrap" },
  "& .MuiAutocomplete-popupIndicator": { color: "text.secondary" },
  "& .MuiAutocomplete-popupIndicator .MuiSvgIcon-root": { fontSize: 24 },
  "& .MuiOutlinedInput-root .MuiAutocomplete-input": { padding: "3px 3px" },
} as const;
const VARIANT_TO_MUI: Record<MultiSelectVariant, "outlined" | "filled" | "standard"> = {
  outlined: "outlined",
  filled: "filled",
  underline: "standard",
};
const SIZE_TO_MUI: Record<MultiSelectSize, "small" | "medium"> = { sm: "small", md: "medium", lg: "medium" };
/** `size="lg"` do catálogo: padding 14px 16px e fonte 1.05rem (o label não muda). */
const LG_SIZE_SX = {
  "& .MuiOutlinedInput-root, & .MuiFilledInput-root": { paddingTop: "7px", paddingBottom: "7px", paddingLeft: "11px" },
  "& .MuiInputBase-input": { fontSize: "1.05rem" },
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
  display = "text",
  maxSelections,
  variant = "outlined",
  size = "md",
  loading,
}: MultiSelectProps<T>) {
  useThemeCheck();
  const selected = options.filter((option) => value.includes(option.value));
  const allSelected = options.length > 0 && selected.length === options.length;
  const someSelected = selected.length > 0 && !allSelected;
  const showSelectAll = selectAll && !maxSelections && options.length > 0;
  const limitReached = maxSelections !== undefined && value.length >= maxSelections;

  return (
    <MuiAutocomplete
      multiple
      disableCloseOnSelect
      disableClearable
      popupIcon={<KeyboardArrowDownIcon />}
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
          : display === "text"
            ? (tagValue) => (
                <Box
                  component="span"
                  sx={{ pl: "3px", minWidth: 0, flexShrink: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                >
                  {tagValue.map((option) => option.label).join(", ")}
                </Box>
              )
            : undefined
      }
      slotProps={{
        paper: {
          sx: {
            mt: 1,
            boxShadow: (theme) => `0 12px 32px ${alpha(myconColors(theme).shadow, theme.palette.mode === "dark" ? 0.45 : 0.15)}`,
            "& .MuiAutocomplete-listbox": { maxHeight: 220 },
            // Sem o destaque azul de "selecionado" do Select: aqui o checkbox já indica a seleção.
            "& .MuiAutocomplete-listbox.MuiAutocomplete-listbox .MuiAutocomplete-option.MuiAutocomplete-option": {
              gap: "10px",
              padding: "10px 14px",
              fontWeight: 400,
              color: "text.primary",
              backgroundColor: "transparent",
              "&.Mui-focused": { backgroundColor: "background.raised" },
            },
          },
        },
      }}
      renderOption={(props, option, { selected: isSelected }) => {
        const { key, ...optionProps } = props;
        if (option === SELECT_ALL_OPTION) {
          return (
            <Box
              component="li"
              key={key}
              {...optionProps}
              sx={{ borderBottom: 1, borderColor: "divider", fontWeight: "600 !important" }}
            >
              <Checkbox
                checked={allSelected}
                indeterminate={someSelected}
                icon={uncheckedIcon}
                checkedIcon={checkedIcon}
                size="small"
                sx={CHECKBOX_SX}
              />
              {option.label}
            </Box>
          );
        }
        return (
          <li key={key} {...optionProps}>
            <Checkbox checked={isSelected} icon={uncheckedIcon} checkedIcon={checkedIcon} size="small" sx={CHECKBOX_SX} />
            {option.label}
          </li>
        );
      }}
      renderInput={(params) => (
        <MuiTextField
          {...params}
          variant={VARIANT_TO_MUI[variant]}
          label={label}
          placeholder={value.length === 0 ? placeholder : undefined}
          error={error}
          helperText={helperText ?? (maxSelections ? `${value.length}/${maxSelections} selecionados` : undefined)}
          sx={[variant === "outlined" && FLOATING_LABEL_SX, size === "lg" && LG_SIZE_SX]}
        />
      )}
    />
  );
}
