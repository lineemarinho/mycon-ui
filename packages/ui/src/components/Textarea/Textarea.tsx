import { forwardRef } from "react";
import MuiTextField, { type TextFieldProps } from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export type TextareaVariant = "outlined" | "filled";
export type TextareaResize = "none" | "vertical" | "horizontal" | "both";
export type TextareaWidth = "auto" | "full";
export type TextareaSize = "sm" | "md" | "lg";

export type TextareaProps = Omit<TextFieldProps, "variant" | "multiline" | "size"> & {
  variant?: TextareaVariant;
  resize?: TextareaResize;
  /** `false` fixa a altura em `minRows` (sem crescer com o conteúdo). Default `true`. */
  autoGrow?: boolean;
  /** Mostra um contador "n/max" abaixo do campo (requer `maxLength`). */
  counter?: boolean;
  width?: TextareaWidth;
  /** Tamanho do campo. `lg` aplica um ajuste de padding/fonte sobre o "medium" do MUI. Default "md". */
  size?: TextareaSize;
  /** Estilo visual de sucesso (borda/label em `success.main`). Mutuamente exclusivo com `error`. */
  success?: boolean;
  /**
   * Campo somente leitura "legível" — força `disabled`, mas mantém a cor de
   * texto normal (em vez do cinza padrão de `disabled`). Mesmo padrão do
   * `readOnlyField` do `Input`.
   */
  readOnlyField?: boolean;
};

const VARIANT_TO_MUI: Record<TextareaVariant, TextFieldProps["variant"]> = {
  outlined: "outlined",
  filled: "filled",
};
const SIZE_TO_MUI: Record<TextareaSize, "small" | "medium"> = { sm: "small", md: "medium", lg: "medium" };
/** Bump de ~15-20% sobre o padding/fonte padrão do TextField "medium" do MUI, usado quando `size="lg"`. */
const LG_SIZE_SX = {
  "& .MuiInputBase-input": { padding: "19px 14px", fontSize: "1.05rem" },
  "& .MuiInputLabel-root": { fontSize: "1.05rem" },
} as const;

/** Área de texto multi-linha, wrapper sobre `TextField` (`multiline`) do MUI. */
export const Textarea = forwardRef<HTMLDivElement, TextareaProps>(function Textarea(
  {
    variant = "outlined",
    resize = "vertical",
    autoGrow = true,
    counter = false,
    width = "full",
    size = "md",
    success,
    readOnlyField,
    disabled,
    error,
    minRows = 3,
    maxRows,
    value,
    slotProps,
    sx,
    inputProps,
    ...rest
  },
  ref,
) {
  const maxLength = inputProps?.maxLength ?? (slotProps?.htmlInput as { maxLength?: number } | undefined)?.maxLength;
  const currentLength = typeof value === "string" ? value.length : 0;
  const effectiveReadOnly = readOnlyField;

  return (
    <div>
      <MuiTextField
        ref={ref}
        variant={VARIANT_TO_MUI[variant]}
        size={SIZE_TO_MUI[size]}
        multiline
        minRows={minRows}
        maxRows={autoGrow ? maxRows : minRows}
        fullWidth={width === "full"}
        disabled={effectiveReadOnly ? true : disabled}
        error={error}
        value={value}
        inputProps={inputProps}
        slotProps={slotProps}
        sx={[
          { "& textarea": { resize } },
          Boolean(effectiveReadOnly) && { "& .Mui-disabled": { color: "text.primary", WebkitTextFillColor: "unset" } },
          Boolean(success && !error) && {
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "success.main" },
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "success.main" },
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "success.main" },
            "& .MuiInputLabel-root.Mui-focused": { color: "success.main" },
          },
          size === "lg" && LG_SIZE_SX,
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...rest}
      />
      {counter && maxLength !== undefined && (
        <Typography variant="caption" color="text.secondary" sx={{ display: "block", textAlign: "right", mt: 0.5 }}>
          {currentLength}/{maxLength}
        </Typography>
      )}
    </div>
  );
});
