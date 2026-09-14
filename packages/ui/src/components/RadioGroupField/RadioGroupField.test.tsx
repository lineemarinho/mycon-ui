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

  it("places the label before the radio when labelPosition=start", () => {
    render(<RadioGroupField label="Pagamento" options={options} value="boleto" onChange={() => {}} labelPosition="start" />);
    const label = screen.getByText("Cartão").closest(".MuiFormControlLabel-root");
    expect(label).toHaveClass("MuiFormControlLabel-labelPlacementStart");
  });

  it("applies the small MUI size class when size=sm and drops it for size=lg", () => {
    const { rerender } = render(<RadioGroupField label="Pagamento" options={options} value="boleto" onChange={() => {}} size="sm" />);
    expect(document.querySelector(".MuiRadio-root")).toHaveClass("MuiRadio-sizeSmall");

    rerender(<RadioGroupField label="Pagamento" options={options} value="boleto" onChange={() => {}} size="lg" />);
    expect(document.querySelector(".MuiRadio-root")).not.toHaveClass("MuiRadio-sizeSmall");
  });
});
