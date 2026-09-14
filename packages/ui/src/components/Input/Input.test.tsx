import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Input } from "./Input";

describe("Input", () => {
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
