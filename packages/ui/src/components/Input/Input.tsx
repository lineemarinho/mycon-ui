import { forwardRef } from "react";
import MuiTextField, { type TextFieldProps } from "@mui/material/TextField";

export type InputProps = Omit<TextFieldProps, "variant"> & {
  /**
   * Campo somente leitura "legível" — força `disabled`, mas mantém a cor de
   * texto normal (em vez do cinza padrão de `disabled`). Unifica o padrão
   * `ReadonlyTextField`/`LockedTextField` encontrado em 3+ repos auditados.
   */
  readOnlyField?: boolean;
};

/**
 * Wrapper padronizado sobre `TextField` do MUI. Fecha o gap de "input de
 * texto sem componente de design system" encontrado em todos os 11 repos
 * auditados (ver AUDITORIA.md §0 e §1).
 */
export const Input = forwardRef<HTMLDivElement, InputProps>(function Input(
  { readOnlyField, disabled, sx, ...rest },
  ref,
) {
  return (
    <MuiTextField
      ref={ref}
      variant="outlined"
      fullWidth
      disabled={readOnlyField ? true : disabled}
      sx={{
        ...(readOnlyField && {
          "& .Mui-disabled": {
            color: "text.primary",
            WebkitTextFillColor: "unset",
          },
        }),
        ...sx,
      }}
      {...rest}
    />
  );
});
