import { forwardRef } from "react";
import MuiTextField, { type TextFieldProps } from "@mui/material/TextField";

export type NumericMaskType = "currency" | "number" | "percent";
export type DocumentMaskType = "cpf" | "cnpj" | "cpfCnpj" | "telefone" | "cep";

const NUMERIC_DECIMALS: Record<NumericMaskType, number> = { currency: 2, number: 0, percent: 2 };
const DOCUMENT_MAX_DIGITS: Record<DocumentMaskType, number> = {
  cpf: 11,
  cnpj: 14,
  cpfCnpj: 14,
  telefone: 11,
  cep: 8,
};

function formatNumericMask(value: number, mode: NumericMaskType, decimalScale: number): string {
  const formatted = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: decimalScale,
    maximumFractionDigits: decimalScale,
  }).format(value);
  if (mode === "currency") return `R$ ${formatted}`;
  if (mode === "percent") return `${formatted}%`;
  return formatted;
}

function getDocumentPattern(mask: DocumentMaskType, digitsLength: number): string {
  switch (mask) {
    case "cpf":
      return "###.###.###-##";
    case "cnpj":
      return "##.###.###/####-##";
    case "cpfCnpj":
      return digitsLength > 11 ? "##.###.###/####-##" : "###.###.###-##";
    case "telefone":
      return digitsLength > 10 ? "(##) #####-####" : "(##) ####-####";
    case "cep":
      return "#####-###";
  }
}

function applyDocumentMask(digits: string, pattern: string): string {
  let result = "";
  let digitIndex = 0;
  for (const char of pattern) {
    if (digitIndex >= digits.length) break;
    if (char === "#") {
      result += digits[digitIndex];
      digitIndex++;
    } else {
      result += char;
    }
  }
  return result;
}

type BaseProps = Omit<TextFieldProps, "value" | "onChange" | "variant" | "type"> & {
  /**
   * Campo somente leitura "legível" — força `disabled`, mas mantém a cor de
   * texto normal (em vez do cinza padrão de `disabled`). Unifica o padrão
   * `ReadonlyTextField`/`LockedTextField` encontrado em 3+ repos auditados.
   */
  readOnlyField?: boolean;
};

export type NumericMaskInputProps = BaseProps & {
  mask: NumericMaskType;
  value: number;
  onChange: (value: number) => void;
  decimalScale?: number;
};

export type DocumentMaskInputProps = BaseProps & {
  mask: DocumentMaskType;
  /** Valor em dígitos puros, sem máscara (ex.: "12345678900"). */
  value: string;
  onChange: (digits: string) => void;
};

export type PlainInputProps = BaseProps & {
  mask?: undefined;
  value?: TextFieldProps["value"];
  onChange?: TextFieldProps["onChange"];
};

export type InputProps = NumericMaskInputProps | DocumentMaskInputProps | PlainInputProps;

/**
 * Wrapper padronizado sobre `TextField` do MUI. Fecha o gap de "input de
 * texto sem componente de design system" encontrado em todos os 11 repos
 * auditados (ver AUDITORIA.md §0 e §1).
 *
 * A prop `mask` unifica em um único componente os dois padrões de máscara
 * encontrados na auditoria — antes cobertos por `MaskedNumberField`
 * (moeda/número/percentual) e `MaskedInput` (CPF/CNPJ/telefone/CEP)
 * separados: `mask="currency"|"number"|"percent"` usa `value: number`;
 * `mask="cpf"|"cnpj"|"cpfCnpj"|"telefone"|"cep"` usa `value: string` (só
 * dígitos). Sem `mask`, comporta-se como um `TextField` comum.
 */
export const Input = forwardRef<HTMLDivElement, InputProps>(function Input(props, ref) {
  if (props.mask === "currency" || props.mask === "number" || props.mask === "percent") {
    const { mask, value, onChange, decimalScale, readOnlyField, disabled, sx, ...fieldRest } = props;
    const scale = decimalScale ?? NUMERIC_DECIMALS[mask];
    const display = formatNumericMask(value, mask, scale);
    return (
      <MuiTextField
        ref={ref}
        variant="outlined"
        fullWidth
        inputMode="numeric"
        disabled={readOnlyField ? true : disabled}
        value={display}
        onChange={(event) => {
          const digits = event.target.value.replace(/\D/g, "");
          onChange(digits ? Number(digits) / 10 ** scale : 0);
        }}
        sx={{
          ...(readOnlyField && { "& .Mui-disabled": { color: "text.primary", WebkitTextFillColor: "unset" } }),
          ...sx,
        }}
        {...fieldRest}
      />
    );
  }

  if (
    props.mask === "cpf" ||
    props.mask === "cnpj" ||
    props.mask === "cpfCnpj" ||
    props.mask === "telefone" ||
    props.mask === "cep"
  ) {
    const { mask, value, onChange, readOnlyField, disabled, sx, ...fieldRest } = props;
    const digits = value.replace(/\D/g, "").slice(0, DOCUMENT_MAX_DIGITS[mask]);
    const display = applyDocumentMask(digits, getDocumentPattern(mask, digits.length));
    return (
      <MuiTextField
        ref={ref}
        variant="outlined"
        fullWidth
        inputMode="numeric"
        disabled={readOnlyField ? true : disabled}
        value={display}
        onChange={(event) => {
          const nextDigits = event.target.value.replace(/\D/g, "").slice(0, DOCUMENT_MAX_DIGITS[mask]);
          onChange(nextDigits);
        }}
        sx={{
          ...(readOnlyField && { "& .Mui-disabled": { color: "text.primary", WebkitTextFillColor: "unset" } }),
          ...sx,
        }}
        {...fieldRest}
      />
    );
  }

  const { mask: _mask, value, onChange, readOnlyField, disabled, sx, ...fieldRest } = props as PlainInputProps;
  return (
    <MuiTextField
      ref={ref}
      variant="outlined"
      fullWidth
      disabled={readOnlyField ? true : disabled}
      value={value}
      onChange={onChange}
      sx={{
        ...(readOnlyField && { "& .Mui-disabled": { color: "text.primary", WebkitTextFillColor: "unset" } }),
        ...sx,
      }}
      {...fieldRest}
    />
  );
});
