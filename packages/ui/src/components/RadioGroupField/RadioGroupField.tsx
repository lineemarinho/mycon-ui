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

export type RadioGroupFieldSize = "sm" | "md" | "lg";

export type RadioGroupFieldProps<T extends string> = {
  label?: string;
  options: readonly RadioOption<T>[];
  value: T;
  onChange: (value: T) => void;
  orientation?: "horizontal" | "vertical";
  /** Posição do label em relação ao círculo do radio. Default "end" (label à direita). */
  labelPosition?: "start" | "end";
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  /** Tamanho de cada radio. `lg` aumenta o ícone além do "medium" nativo do MUI. Default "md". */
  size?: RadioGroupFieldSize;
};

const SIZE_TO_MUI: Record<RadioGroupFieldSize, "small" | "medium"> = { sm: "small", md: "medium", lg: "medium" };
/** ~20% maior que o ícone padrão (24px) do Radio "medium" do MUI, usado quando `size="lg"`. */
const LG_ICON_SX = { "& .MuiSvgIcon-root": { fontSize: 26 } } as const;

/** Grupo de radio buttons com label e mensagem de erro/ajuda integradas. */
export function RadioGroupField<T extends string>({
  label,
  options,
  value,
  onChange,
  orientation = "vertical",
  labelPosition = "end",
  disabled,
  error,
  helperText,
  size = "md",
}: RadioGroupFieldProps<T>) {
  return (
    <FormControl error={error} disabled={disabled}>
      {label && <FormLabel sx={{ mb: 1 }}>{label}</FormLabel>}
      <MuiRadioGroup
        row={orientation === "horizontal"}
        sx={{ gap: orientation === "horizontal" ? "20px" : "10px", "& .MuiFormControlLabel-root": { mr: 0 } }}
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio size={SIZE_TO_MUI[size]} sx={size === "lg" ? LG_ICON_SX : undefined} />}
            label={option.label}
            labelPlacement={labelPosition === "start" ? "start" : "end"}
          />
        ))}
      </MuiRadioGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
