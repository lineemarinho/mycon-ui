import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MuiRadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import FormHelperText from "@mui/material/FormHelperText";

export type RadioOption<T extends string> = {
  value: T;
  label: string;
};

export type RadioGroupFieldProps<T extends string> = {
  label?: string;
  options: readonly RadioOption<T>[];
  value: T;
  onChange: (value: T) => void;
  orientation?: "horizontal" | "vertical";
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
};

/** Grupo de radio buttons com label e mensagem de erro/ajuda integradas. */
export function RadioGroupField<T extends string>({
  label,
  options,
  value,
  onChange,
  orientation = "vertical",
  disabled,
  error,
  helperText,
}: RadioGroupFieldProps<T>) {
  return (
    <FormControl error={error} disabled={disabled}>
      {label && <FormLabel>{label}</FormLabel>}
      <MuiRadioGroup
        row={orientation === "horizontal"}
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
      >
        {options.map((option) => (
          <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />
        ))}
      </MuiRadioGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
