import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { MaskedNumberField } from "./MaskedNumberField";

describe("MaskedNumberField", () => {
  it("formats the value as currency by default", () => {
    render(<MaskedNumberField label="Valor" value={1240} onChange={() => {}} />);
    expect(screen.getByLabelText("Valor")).toHaveValue("R$ 1.240,00");
  });

  it("formats as percent when mode=percent", () => {
    render(<MaskedNumberField label="Desconto" value={12.5} mode="percent" onChange={() => {}} />);
    expect(screen.getByLabelText("Desconto")).toHaveValue("12,50%");
  });

  it("parses typed digits back into a numeric value", async () => {
    const onChange = vi.fn();
    render(<MaskedNumberField label="Valor" value={0} onChange={onChange} />);
    await userEvent.type(screen.getByLabelText("Valor"), "5");
    expect(onChange).toHaveBeenLastCalledWith(0.05);
  });
});
