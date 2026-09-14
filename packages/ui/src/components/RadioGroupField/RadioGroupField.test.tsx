import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RadioGroupField } from "./RadioGroupField";

const options = [
  { value: "cartao", label: "Cartão" },
  { value: "boleto", label: "Boleto" },
] as const;

describe("RadioGroupField", () => {
  it("marks the selected option", () => {
    render(<RadioGroupField label="Pagamento" options={options} value="boleto" onChange={() => {}} />);
    expect(screen.getByRole("radio", { name: "Boleto" })).toBeChecked();
  });

  it("calls onChange when another option is picked", async () => {
    const onChange = vi.fn();
    render(<RadioGroupField label="Pagamento" options={options} value="boleto" onChange={onChange} />);
    await userEvent.click(screen.getByRole("radio", { name: "Cartão" }));
    expect(onChange).toHaveBeenCalledWith("cartao");
  });
});
