import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import MuiAutocomplete from "@mui/material/Autocomplete";
import MuiTextField from "@mui/material/TextField";
import Paper, { type PaperProps } from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
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
  const allSelected = options.length > 0 && value.length === options.length;
  const someSelected = value.length > 0 && !allSelected;
  const showSelectAll = selectAll && !maxSelections;
  const limitReached = maxSelections !== undefined && value.length >= maxSelections;

  const SelectAllPaper = ({ children, ...paperProps }: PaperProps) => (
    <Paper {...paperProps}>
      {showSelectAll && options.length > 0 && (
        <Box
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => onChange(allSelected ? [] : options.map((option) => option.value))}
          sx={{
            display: "flex",
            alignItems: "center",
            px: 2,
            py: 0.5,
            borderBottom: "1px solid",
            borderColor: "divider",
            cursor: "pointer",
          }}
        >
          <Checkbox
            checked={allSelected}
            indeterminate={someSelected}
            icon={uncheckedIcon}
            checkedIcon={checkedIcon}
            size="small"
          />
          <Typography variant="body2">Selecionar todos</Typography>
        </Box>
      )}
      {children}
    </Paper>
  );

  return (
    <MuiAutocomplete
      multiple
      disableCloseOnSelect
      options={options}
      value={selected}
      onChange={(_, next) => {
        if (maxSelections !== undefined && next.length > maxSelections) return;
        onChange(next.map((option) => option.value));
      }}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(a, b) => a.value === b.value}
      getOptionDisabled={(option) => (limitReached ? !value.includes(option.value) : false)}
      disabled={disabled}
      loading={loading}
      size={SIZE_TO_MUI[size]}
      PaperComponent={SelectAllPaper}
      renderTags={
        display === "count"
          ? (tagValue) =>
              tagValue.length > 0 ? <Chip size="small" label={`${tagValue.length} selecionado(s)`} /> : null
          : undefined
      }
      renderOption={(props, option, { selected: isSelected }) => {
        const { key, ...optionProps } = props;
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
