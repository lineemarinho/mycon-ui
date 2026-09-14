import { forwardRef } from "react";
import MuiTextField, { type TextFieldProps } from "@mui/material/TextField";

export type TextareaProps = Omit<TextFieldProps, "variant" | "multiline">;

/** Área de texto multi-linha, wrapper sobre `TextField` (`multiline`) do MUI. */
export const Textarea = forwardRef<HTMLDivElement, TextareaProps>(function Textarea(
  { minRows = 3, ...rest },
  ref,
) {
  return <MuiTextField ref={ref} variant="outlined" multiline minRows={minRows} fullWidth {...rest} />;
});
