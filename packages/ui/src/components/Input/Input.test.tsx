import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Input } from "./Input";

describe("Input (sem mask)", () => {
  it("accepts typed input", async () => {
    render(<Input label="Nome" />);
    const field = screen.getByLabelText("Nome");
    await userEvent.type(field, "Fulano");
    expect(field).toHaveValue("Fulano");
  });

  it("forces disabled when readOnlyField is set", () => {
    render(<Input label="CPF" readOnlyField value="000.000.000-00" />);
    expect(screen.getByLabelText("CPF")).toBeDisabled();
  });

  it("shows error and helper text", () => {
    render(<Input label="E-mail" error helperText="E-mail inválido" />);
    expect(screen.getByText("E-mail inválido")).toBeInTheDocument();
  });
});

describe("Input (variant/width/icon/clearable/password)", () => {
  it("applies fullWidth by default and respects width=auto", () => {
    const { rerender } = render(<Input label="Nome" />);
    expect(screen.getByLabelText("Nome").closest(".MuiFormControl-root")).toHaveClass("MuiFormControl-fullWidth");

    rerender(<Input label="Nome" width="auto" />);
    expect(screen.getByLabelText("Nome").closest(".MuiFormControl-root")).not.toHaveClass("MuiFormControl-fullWidth");
  });

  it("renders the icon", () => {
    render(<Input label="Busca" icon={<span data-testid="search-icon" />} />);
    expect(screen.getByTestId("search-icon")).toBeInTheDocument();
  });

  it("shows a clear button when clearable and there is a value, and clears it", async () => {
    const onChange = vi.fn();
    render(<Input label="Busca" clearable value="algo" onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Limpar" }));
    expect(onChange).toHaveBeenCalled();
  });

  it("toggles password visibility", async () => {
    render(<Input label="Senha" type="password" value="segredo" onChange={() => {}} />);
    const field = screen.getByLabelText("Senha");
    expect(field).toHaveAttribute("type", "password");
    await userEvent.click(screen.getByRole("button", { name: "Mostrar senha" }));
    expect(field).toHaveAttribute("type", "text");
  });
});

describe("Input (mask numérica)", () => {
  it("formats the value as currency by default", () => {
    render(<Input label="Valor" mask="currency" value={1240} onChange={() => {}} />);
    expect(screen.getByLabelText("Valor")).toHaveValue("R$ 1.240,00");
  });

  it("formats as percent when mask=percent", () => {
    render(<Input label="Desconto" mask="percent" value={12.5} onChange={() => {}} />);
    expect(screen.getByLabelText("Desconto")).toHaveValue("12,50%");
  });

  it("parses typed digits back into a numeric value", async () => {
    const onChange = vi.fn();
    render(<Input label="Valor" mask="currency" value={0} onChange={onChange} />);
    await userEvent.type(screen.getByLabelText("Valor"), "5");
    expect(onChange).toHaveBeenLastCalledWith(0.05);
  });
});

describe("Input (mask de documento)", () => {
  it("formats CPF", () => {
    render(<Input label="CPF" mask="cpf" value="12345678900" onChange={() => {}} />);
    expect(screen.getByLabelText("CPF")).toHaveValue("123.456.789-00");
  });

  it("formats CNPJ", () => {
    render(<Input label="CNPJ" mask="cnpj" value="12345678000199" onChange={() => {}} />);
    expect(screen.getByLabelText("CNPJ")).toHaveValue("12.345.678/0001-99");
  });

  it("auto-detects CPF vs CNPJ by digit count", () => {
    render(<Input label="Documento" mask="cpfCnpj" value="12345678000199" onChange={() => {}} />);
    expect(screen.getByLabelText("Documento")).toHaveValue("12.345.678/0001-99");
  });

  it("formats landline vs mobile phone by digit count", () => {
    const { rerender } = render(<Input label="Telefone" mask="telefone" value="1122223333" onChange={() => {}} />);
    expect(screen.getByLabelText("Telefone")).toHaveValue("(11) 2222-3333");

    rerender(<Input label="Telefone" mask="telefone" value="11988887777" onChange={() => {}} />);
    expect(screen.getByLabelText("Telefone")).toHaveValue("(11) 98888-7777");
  });

  it("formats CEP", () => {
    render(<Input label="CEP" mask="cep" value="01310100" onChange={() => {}} />);
    expect(screen.getByLabelText("CEP")).toHaveValue("01310-100");
  });

  it("emits only raw digits via onChange", async () => {
    const onChange = vi.fn();
    render(<Input label="CEP" mask="cep" value="" onChange={onChange} />);
    await userEvent.type(screen.getByLabelText("CEP"), "0");
    expect(onChange).toHaveBeenCalledWith("0");
  });

  it("formats a credit card", () => {
    render(<Input label="Cartão" mask="cartaoCredito" value="1234567890123456" onChange={() => {}} />);
    expect(screen.getByLabelText("Cartão")).toHaveValue("1234 5678 9012 3456");
  });

  it("formats a date and a time", () => {
    render(<Input label="Data" mask="data" value="25122024" onChange={() => {}} />);
    expect(screen.getByLabelText("Data")).toHaveValue("25/12/2024");

    render(<Input label="Hora" mask="hora" value="1430" onChange={() => {}} />);
    expect(screen.getByLabelText("Hora")).toHaveValue("14:30");
  });
});

describe("Input (size/success/loading)", () => {
  it("renders size=lg without throwing", () => {
    render(<Input label="Nome" size="lg" />);
    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
  });

  it("uses the MUI small class for size=sm", () => {
    render(<Input label="Nome" size="sm" />);
    expect(screen.getByLabelText("Nome").closest(".MuiFormControl-root")).toHaveClass("MuiTextField-root");
    expect(document.querySelector(".MuiInputBase-sizeSmall")).toBeInTheDocument();
  });

  it("shows a spinner when loading", () => {
    render(<Input label="Nome" loading />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(screen.getByLabelText("Nome")).toBeDisabled();
  });
});

describe("Input (formatOnType/locale/validation)", () => {
  it("shows raw digits while typing when formatOnType=false, then formats on blur", async () => {
    const onChange = vi.fn();
    render(<Input label="CEP" mask="cep" value="01310100" onChange={onChange} formatOnType={false} />);
    const field = screen.getByLabelText("CEP") as HTMLInputElement;
    expect(field).toHaveValue("01310-100");

    await userEvent.click(field);
    expect(field).toHaveValue("01310100");

    await userEvent.tab();
    expect(field).toHaveValue("01310-100");
  });

  it("accepts a valid CPF and rejects an invalid one with validation=digitoVerificador", () => {
    const { rerender } = render(
      <Input label="CPF" mask="cpf" value="52998224725" onChange={() => {}} validation="digitoVerificador" />,
    );
    expect(screen.queryByText("CPF inválido")).not.toBeInTheDocument();

    rerender(<Input label="CPF" mask="cpf" value="11111111111" onChange={() => {}} validation="digitoVerificador" />);
    expect(screen.getByText("CPF inválido")).toBeInTheDocument();
  });
});

describe("Input (regressões)", () => {
  it("puts inputMode=numeric on the <input> itself for masked fields (mobile numeric keyboard)", () => {
    render(<Input label="Valor" mask="currency" value={1} onChange={() => {}} />);
    expect(screen.getByLabelText("Valor")).toHaveAttribute("inputmode", "numeric");

    render(<Input label="CPF" mask="cpf" value="" onChange={() => {}} />);
    expect(screen.getByLabelText("CPF")).toHaveAttribute("inputmode", "numeric");
  });

  it("keeps internal adornments when the caller also passes slotProps", () => {
    render(
      <Input
        label="Valor"
        mask="currency"
        value={1}
        onChange={() => {}}
        clearable
        slotProps={{ htmlInput: { "data-testid": "campo" } }}
      />,
    );
    expect(screen.getByRole("button", { name: "Limpar" })).toBeInTheDocument();
    expect(screen.getByTestId("campo")).toHaveAttribute("inputmode", "numeric");
  });

  it("accepts sx as an array", () => {
    render(<Input label="Nome" size="lg" sx={[{ marginTop: "7px" }]} />);
    expect(screen.getByLabelText("Nome").closest(".MuiFormControl-root")).toHaveStyle({ marginTop: "7px" });
  });

  it("includes the field name in the clear event (react-hook-form register)", async () => {
    const onChange = vi.fn();
    render(<Input label="Busca" name="busca" clearable value="algo" onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Limpar" }));
    expect(onChange.mock.calls[0][0].target).toEqual({ value: "", name: "busca" });
  });
});
