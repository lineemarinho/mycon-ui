import { Input, type InputProps } from "../Input/Input";

export type MaskedNumberFieldMode = "currency" | "number" | "percent";

const DEFAULT_DECIMALS: Record<MaskedNumberFieldMode, number> = {
  currency: 2,
  number: 0,
  percent: 2,
};

function formatValue(value: number, mode: MaskedNumberFieldMode, decimalScale: number): string {
  const formatted = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: decimalScale,
    maximumFractionDigits: decimalScale,
  }).format(value);

  if (mode === "currency") return `R$ ${formatted}`;
  if (mode === "percent") return `${formatted}%`;
  return formatted;
}

export type MaskedNumberFieldProps = Omit<InputProps, "value" | "onChange" | "type"> & {
  value: number;
  onChange: (value: number) => void;
  mode?: MaskedNumberFieldMode;
  decimalScale?: number;
};

/**
 * Campo numérico mascarado (moeda/número/percentual). Unifica
 * `CurrencyMask`/`NumberMask`/`DescontoMask` — 3 implementações quase
 * idênticas encontradas em `backoffice-cupom-front`, que inclusive
 * divergiam no separador decimal entre si — ver AUDITORIA.md §5.
 */
export function MaskedNumberField({
  value,
  onChange,
  mode = "currency",
  decimalScale,
  ...rest
}: MaskedNumberFieldProps) {
  const scale = decimalScale ?? DEFAULT_DECIMALS[mode];
  const display = formatValue(value, mode, scale);

  return (
    <Input
      {...rest}
      value={display}
      inputMode="numeric"
      onChange={(event) => {
        const digits = event.target.value.replace(/\D/g, "");
        const numeric = digits ? Number(digits) / 10 ** scale : 0;
        onChange(numeric);
      }}
    />
  );
}
