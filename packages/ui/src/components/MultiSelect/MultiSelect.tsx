import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import MuiAutocomplete from "@mui/material/Autocomplete";
import MuiTextField from "@mui/material/TextField";
import Paper, { type PaperProps } from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
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
  /** Exibe a opção "Selecionar todos" no topo da lista. Default true. */
  selectAll?: boolean;
};

const uncheckedIcon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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
}: MultiSelectProps<T>) {
  const selected = options.filter((option) => value.includes(option.value));
  const allSelected = options.length > 0 && value.length === options.length;
  const someSelected = value.length > 0 && !allSelected;

  const SelectAllPaper = ({ children, ...paperProps }: PaperProps) => (
    <Paper {...paperProps}>
      {selectAll && options.length > 0 && (
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
      onChange={(_, next) => onChange(next.map((option) => option.value))}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(a, b) => a.value === b.value}
      disabled={disabled}
      PaperComponent={SelectAllPaper}
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
          label={label}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
        />
      )}
    />
  );
}
