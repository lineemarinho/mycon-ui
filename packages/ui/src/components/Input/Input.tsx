import { forwardRef, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import MuiTextField, { type TextFieldProps } from "@mui/material/TextField";
import { useThemeCheck } from "../../theme/useThemeCheck";
import { alpha, type Theme } from "@mui/material/styles";

export type NumericMaskType = "currency" | "number" | "percent";
export type DocumentMaskType =
  | "cpf"
  | "cnpj"
  | "cpfCnpj"
  | "telefone"
  | "cep"
  | "cartaoCredito"
  | "data"
  | "hora";
export type InputVariant = "outlined" | "filled" | "underline";
export type InputWidth = "auto" | "full";
export type InputType = "text" | "email" | "tel" | "url" | "number" | "password";
export type InputSize = "sm" | "md" | "lg";

const NUMERIC_DECIMALS: Record<NumericMaskType, number> = { currency: 2, number: 0, percent: 2 };
const DOCUMENT_MAX_DIGITS: Record<DocumentMaskType, number> = {
  cpf: 11,
  cnpj: 14,
  cpfCnpj: 14,
  telefone: 11,
  cep: 8,
  cartaoCredito: 16,
  data: 8,
  hora: 4,
};
const VARIANT_TO_MUI: Record<InputVariant, TextFieldProps["variant"]> = {
  outlined: "outlined",
  filled: "filled",
  underline: "standard",
};
const SIZE_TO_MUI: Record<InputSize, "small" | "medium"> = { sm: "small", md: "medium", lg: "medium" };
const SIZE_TO_PROGRESS: Record<InputSize, number> = { sm: 16, md: 20, lg: 24 };
/** `size="lg"` do catálogo: padding 14px 16px e fonte 1.05rem (o label não muda). */
const LG_SIZE_SX = {
  "& .MuiInputBase-input": { padding: "14px 16px", fontSize: "1.05rem" },
} as const;
const READONLY_SX = { "& .MuiInputBase-input.Mui-disabled": { color: "text.primary", WebkitTextFillColor: "unset" } } as const;
const SUCCESS_SX = (theme: Theme) => ({
  "& .MuiOutlinedInput-notchedOutline": { borderColor: `${theme.palette.success.main} !important` },
  "& .MuiOutlinedInput-root.Mui-focused": { boxShadow: `0 0 0 3px ${alpha(theme.palette.success.main, 0.2)}` },
  "& .MuiFormHelperText-root": { color: theme.palette.success.main },
});

/** Combina os estilos internos com o `sx` do chamador usando a forma de array do MUI (aceita `sx` objeto, array ou função). */
function buildSx(
  sx: TextFieldProps["sx"],
  { readOnly, success, size }: { readOnly?: boolean; success?: boolean; size: InputSize },
): TextFieldProps["sx"] {
  return [
    Boolean(readOnly) && READONLY_SX,
    Boolean(success) && SUCCESS_SX,
    size === "lg" && LG_SIZE_SX,
    ...(Array.isArray(sx) ? sx : [sx]),
  ];
}

/** Mescla props internas num slot do `slotProps` do chamador (objeto ou função de ownerState) sem descartar as dele. */
function mergeSlot(slot: unknown, defaults: object, overrides: object) {
  if (typeof slot === "function") {
    return (ownerState: unknown) => ({ ...defaults, ...slot(ownerState), ...overrides });
  }
  return { ...defaults, ...(slot as object | undefined), ...overrides };
}

function buildSlotProps(
  slotProps: TextFieldProps["slotProps"],
  adornments: { startAdornment?: React.ReactNode; endAdornment?: React.ReactNode },
  htmlInputDefaults: object = {},
): TextFieldProps["slotProps"] {
  const definedAdornments = Object.fromEntries(Object.entries(adornments).filter(([, node]) => node !== undefined));
  return {
    ...slotProps,
    input: mergeSlot(slotProps?.input, {}, definedAdornments),
    htmlInput: mergeSlot(slotProps?.htmlInput, htmlInputDefaults, {}),
  } as TextFieldProps["slotProps"];
}

function formatNumericMask(value: number, mode: NumericMaskType, decimalScale: number, locale: string): string {
  const formatted = new Intl.NumberFormat(locale, {
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
    case "cartaoCredito":
      return "#### #### #### ####";
    case "data":
      return "##/##/####";
    case "hora":
      return "##:##";
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

/** Algoritmo padrão de dígito verificador (mod 11) para CPF. */
function isValidCpf(digits: string): boolean {
  if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) return false;
  const calcDigit = (base: string, weightStart: number) => {
    let sum = 0;
    for (let i = 0; i < base.length; i++) sum += Number(base[i]) * (weightStart - i);
    const rest = (sum * 10) % 11;
    return rest === 10 ? 0 : rest;
  };
  const d1 = calcDigit(digits.slice(0, 9), 10);
  const d2 = calcDigit(digits.slice(0, 9) + d1, 11);
  return digits === digits.slice(0, 9) + String(d1) + String(d2);
}

/** Algoritmo padrão de dígito verificador (mod 11, pesos 5..2/9..2) para CNPJ. */
function isValidCnpj(digits: string): boolean {
  if (digits.length !== 14 || /^(\d)\1{13}$/.test(digits)) return false;
  const calcDigit = (base: string, weights: number[]) => {
    let sum = 0;
    for (let i = 0; i < base.length; i++) sum += Number(base[i]) * weights[i];
    const rest = sum % 11;
    return rest < 2 ? 0 : 11 - rest;
  };
  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const d1 = calcDigit(digits.slice(0, 12), weights1);
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const d2 = calcDigit(digits.slice(0, 12) + d1, weights2);
  return digits === digits.slice(0, 12) + String(d1) + String(d2);
}

type AdornmentArgs = {
  icon?: React.ReactNode;
  iconPosition: "left" | "right";
  clearable?: boolean;
  hasValue: boolean;
  onClear?: () => void;
  isPassword?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  loading?: boolean;
  size: InputSize;
};

function buildAdornments({
  icon,
  iconPosition,
  clearable,
  hasValue,
  onClear,
  isPassword,
  showPassword,
  onTogglePassword,
  loading,
  size,
}: AdornmentArgs) {
  const startAdornment =
    icon && iconPosition === "left" ? <InputAdornment position="start">{icon}</InputAdornment> : undefined;

  const endItems: React.ReactNode[] = [];
  if (icon && iconPosition === "right") endItems.push(<span key="icon">{icon}</span>);
  if (clearable && hasValue && onClear) {
    endItems.push(
      <IconButton key="clear" size="small" aria-label="Limpar" onClick={onClear}>
        <ClearIcon fontSize="small" />
      </IconButton>,
    );
  }
  if (isPassword) {
    endItems.push(
      <IconButton
        key="toggle-password"
        size="small"
        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
        onClick={onTogglePassword}
      >
        {showPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
      </IconButton>,
    );
  }
  if (loading) {
    endItems.push(<CircularProgress key="loading" size={SIZE_TO_PROGRESS[size]} aria-label="Carregando" />);
  }
  const endAdornment = endItems.length > 0 ? <InputAdornment position="end">{endItems}</InputAdornment> : undefined;

  return { startAdornment, endAdornment };
}

type BaseProps = Omit<TextFieldProps, "value" | "onChange" | "variant" | "type" | "size"> & {
  /**
   * Campo somente leitura "legível" — força `disabled`, mas mantém a cor de
   * texto normal (em vez do cinza padrão de `disabled`). Unifica o padrão
   * `ReadonlyTextField`/`LockedTextField` encontrado em 3+ repos auditados.
   */
  readOnlyField?: boolean;
  variant?: InputVariant;
  width?: InputWidth;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  /** Mostra um botão "x" para limpar o campo quando ele tem valor. */
  clearable?: boolean;
  /** Tamanho do campo. `lg` aplica um ajuste de padding/fonte sobre o "medium" do MUI. Default "md". */
  size?: InputSize;
  /** Estilo visual de sucesso (borda/label em `success.main`). Mutuamente exclusivo com `error`. */
  success?: boolean;
  /** Mostra um spinner como adornment final e trata o campo como efetivamente somente leitura. */
  loading?: boolean;
};

export type NumericMaskInputProps = BaseProps & {
  mask: NumericMaskType;
  value: number;
  onChange: (value: number) => void;
  decimalScale?: number;
  /** Quando `false`, exibe os dígitos crus enquanto o usuário digita e só aplica a máscara no `blur`. Default `true`. */
  formatOnType?: boolean;
  /** Locale usado no `Intl.NumberFormat`. Default `"pt-BR"`. */
  locale?: string;
};

export type DocumentMaskInputProps = BaseProps & {
  mask: DocumentMaskType;
  /** Valor em dígitos puros, sem máscara (ex.: "12345678900"). */
  value: string;
  onChange: (digits: string) => void;
  /** Quando `false`, exibe os dígitos crus enquanto o usuário digita e só aplica a máscara no `blur`. Default `true`. */
  formatOnType?: boolean;
  /**
   * Valida o dígito verificador. Só tem efeito para `mask="cpf"` e
   * `mask="cnpj"` — para os demais masks é um no-op em runtime. Quando os
   * dígitos estão completos e inválidos, define `error`/`helperText`
   * automaticamente, a menos que o chamador já tenha passado os seus.
   */
  validation?: "digitoVerificador";
};

export type PlainInputProps = BaseProps & {
  mask?: undefined;
  value?: TextFieldProps["value"];
  onChange?: TextFieldProps["onChange"];
  /** "password" adiciona automaticamente o botão de mostrar/ocultar senha. */
  type?: InputType;
};

export type InputProps = NumericMaskInputProps | DocumentMaskInputProps | PlainInputProps;

/**
 * Wrapper padronizado sobre `TextField` do MUI. Fecha o gap de "input de
 * texto sem componente de design system" encontrado em todos os 11 repos
 * auditados (ver AUDITORIA.md §0 e §1). Cobre o levantamento de props de
 * PROPS-SPEC.md para Input/Input de senha/Input de busca/Input com máscara
 * num único componente: `variant` (outlined/filled/underline), `width`,
 * `icon`+`iconPosition`, `clearable`, `type="password"` (toggle de
 * visibilidade automático) e a prop `mask` (ver abaixo).
 *
 * A prop `mask` unifica os dois padrões de máscara da auditoria — antes
 * cobertos por `MaskedNumberField` (moeda/número/percentual) e
 * `MaskedInput` (CPF/CNPJ/telefone/CEP) separados:
 * `mask="currency"|"number"|"percent"` usa `value: number`;
 * `mask="cpf"|"cnpj"|"cpfCnpj"|"telefone"|"cep"|"cartaoCredito"|"data"|"hora"`
 * usa `value: string` (só dígitos). Sem `mask`, comporta-se como um
 * `TextField` comum.
 *
 * Props adicionais compartilhadas por todas as variantes: `size`
 * ("sm"|"md"|"lg", default "md" — "lg" aplica um ajuste de padding/fonte
 * sobre o "medium" nativo do MUI), `success` (estilo visual de sucesso,
 * mutuamente exclusivo com `error`) e `loading` (spinner como adornment
 * final, campo tratado como efetivamente somente leitura).
 *
 * Para as máscaras numérica e de documento: `formatOnType` (default `true`)
 * — quando `false`, exibe os dígitos crus enquanto o usuário digita e só
 * aplica a máscara no `blur`. A máscara numérica aceita `locale` (default
 * `"pt-BR"`) repassado ao `Intl.NumberFormat`. A máscara de documento aceita
 * `validation="digitoVerificador"` (só para `mask="cpf"|"cnpj"`) que valida
 * o dígito verificador com os algoritmos padrão de CPF/CNPJ e, quando
 * inválido, define `error`/`helperText` automaticamente (a menos que o
 * chamador já tenha passado os seus).
 */
export const Input = forwardRef<HTMLDivElement, InputProps>(function Input(props, ref) {
  useThemeCheck();
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  if (props.mask === "currency" || props.mask === "number" || props.mask === "percent") {
    const {
      mask,
      value,
      onChange,
      decimalScale,
      readOnlyField,
      disabled,
      sx,
      slotProps,
      variant = "outlined",
      width = "full",
      icon,
      iconPosition = "left",
      clearable,
      size = "md",
      success,
      loading,
      formatOnType = true,
      locale = "pt-BR",
      onFocus,
      onBlur,
      error,
      ...fieldRest
    } = props;
    const scale = decimalScale ?? NUMERIC_DECIMALS[mask];
    const maskedDisplay = formatNumericMask(value, mask, scale, locale);
    const rawDigits = value === 0 ? "" : String(Math.round(Math.abs(value) * 10 ** scale));
    const display = !formatOnType && isFocused ? rawDigits : maskedDisplay;
    const effectiveReadOnly = readOnlyField || loading;
    const { startAdornment, endAdornment } = buildAdornments({
      icon,
      iconPosition,
      clearable,
      hasValue: value !== 0,
      onClear: () => onChange(0),
      loading,
      size,
    });
    return (
      <MuiTextField
        ref={ref}
        variant={VARIANT_TO_MUI[variant]}
        size={SIZE_TO_MUI[size]}
        fullWidth={width === "full"}
        disabled={effectiveReadOnly ? true : disabled}
        error={error}
        value={display}
        onFocus={(event) => {
          setIsFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setIsFocused(false);
          onBlur?.(event);
        }}
        onChange={(event) => {
          const digits = event.target.value.replace(/\D/g, "");
          onChange(digits ? Number(digits) / 10 ** scale : 0);
        }}
        slotProps={buildSlotProps(slotProps, { startAdornment, endAdornment }, { inputMode: "numeric" })}
        sx={buildSx(sx, { readOnly: effectiveReadOnly, success: success && !error, size })}
        {...fieldRest}
      />
    );
  }

  if (
    props.mask === "cpf" ||
    props.mask === "cnpj" ||
    props.mask === "cpfCnpj" ||
    props.mask === "telefone" ||
    props.mask === "cep" ||
    props.mask === "cartaoCredito" ||
    props.mask === "data" ||
    props.mask === "hora"
  ) {
    const {
      mask,
      value,
      onChange,
      readOnlyField,
      disabled,
      sx,
      slotProps,
      variant = "outlined",
      width = "full",
      icon,
      iconPosition = "left",
      clearable,
      size = "md",
      success,
      loading,
      formatOnType = true,
      validation,
      onFocus,
      onBlur,
      error,
      helperText,
      ...fieldRest
    } = props;
    const digits = value.replace(/\D/g, "").slice(0, DOCUMENT_MAX_DIGITS[mask]);
    const maskedDisplay = applyDocumentMask(digits, getDocumentPattern(mask, digits.length));
    const display = !formatOnType && isFocused ? digits : maskedDisplay;
    const effectiveReadOnly = readOnlyField || loading;

    // `validation="digitoVerificador"` só é significativo para cpf/cnpj — para os
    // demais masks é um no-op em runtime (não uma restrição de tipo).
    let computedError: boolean | undefined;
    let computedHelperText: string | undefined;
    if (validation === "digitoVerificador" && (mask === "cpf" || mask === "cnpj")) {
      const requiredLength = mask === "cpf" ? 11 : 14;
      if (digits.length === requiredLength) {
        const isValid = mask === "cpf" ? isValidCpf(digits) : isValidCnpj(digits);
        if (!isValid) {
          computedError = true;
          computedHelperText = mask === "cpf" ? "CPF inválido" : "CNPJ inválido";
        }
      }
    }
    const finalError = error ?? computedError;
    const finalHelperText = helperText ?? computedHelperText;

    const { startAdornment, endAdornment } = buildAdornments({
      icon,
      iconPosition,
      clearable,
      hasValue: digits.length > 0,
      onClear: () => onChange(""),
      loading,
      size,
    });
    return (
      <MuiTextField
        ref={ref}
        variant={VARIANT_TO_MUI[variant]}
        size={SIZE_TO_MUI[size]}
        fullWidth={width === "full"}
        disabled={effectiveReadOnly ? true : disabled}
        error={finalError}
        helperText={finalHelperText}
        value={display}
        onFocus={(event) => {
          setIsFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setIsFocused(false);
          onBlur?.(event);
        }}
        onChange={(event) => {
          const nextDigits = event.target.value.replace(/\D/g, "").slice(0, DOCUMENT_MAX_DIGITS[mask]);
          onChange(nextDigits);
        }}
        slotProps={buildSlotProps(slotProps, { startAdornment, endAdornment }, { inputMode: "numeric" })}
        sx={buildSx(sx, { readOnly: effectiveReadOnly, success: success && !finalError, size })}
        {...fieldRest}
      />
    );
  }

  const {
    mask: _mask,
    value,
    onChange,
    readOnlyField,
    disabled,
    sx,
    slotProps,
    variant = "outlined",
    width = "full",
    icon,
    iconPosition = "left",
    clearable,
    type = "text",
    size = "md",
    success,
    loading,
    error,
    ...fieldRest
  } = props as PlainInputProps;
  const isPassword = type === "password";
  const hasValue = typeof value === "string" ? value.length > 0 : Boolean(value);
  const effectiveReadOnly = readOnlyField || loading;
  const { startAdornment, endAdornment } = buildAdornments({
    icon,
    iconPosition,
    clearable,
    hasValue,
    // `name` no target é o que `register` do react-hook-form usa para saber qual campo atualizar.
    onClear: () => {
      const target = { value: "", name: fieldRest.name };
      onChange?.({ target, currentTarget: target } as React.ChangeEvent<HTMLInputElement>);
    },
    isPassword,
    showPassword,
    onTogglePassword: () => setShowPassword((prev) => !prev),
    loading,
    size,
  });

  return (
    <MuiTextField
      ref={ref}
      variant={VARIANT_TO_MUI[variant]}
      size={SIZE_TO_MUI[size]}
      fullWidth={width === "full"}
      type={isPassword ? (showPassword ? "text" : "password") : type}
      disabled={effectiveReadOnly ? true : disabled}
      error={error}
      value={value}
      onChange={onChange}
      slotProps={buildSlotProps(slotProps, { startAdornment, endAdornment })}
      sx={buildSx(sx, { readOnly: effectiveReadOnly, success: success && !error, size })}
      {...fieldRest}
    />
  );
});
