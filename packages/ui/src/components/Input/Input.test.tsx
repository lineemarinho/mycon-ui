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
});
