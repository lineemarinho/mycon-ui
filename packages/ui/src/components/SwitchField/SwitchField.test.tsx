import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SwitchField } from "./SwitchField";

describe("SwitchField", () => {
  it("renders the label and reflects checked state", () => {
    render(<SwitchField label="Ativo" checked onChange={() => {}} />);
    expect(screen.getByRole("checkbox", { name: "Ativo" })).toBeChecked();
  });

  it("calls onChange with the toggled value", async () => {
    const onChange = vi.fn();
    render(<SwitchField label="Ativo" checked={false} onChange={onChange} />);
    await userEvent.click(screen.getByRole("checkbox", { name: "Ativo" }));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("shows a spinner instead of the switch when loading", () => {
    render(<SwitchField label="Ativo" checked loading onChange={() => {}} />);
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("applies the small MUI size by default and medium for size=lg", () => {
    const { rerender } = render(<SwitchField label="Ativo" checked onChange={() => {}} size="sm" />);
    expect(document.querySelector(".MuiSwitch-root")).toHaveClass("MuiSwitch-sizeSmall");

    rerender(<SwitchField label="Ativo" checked onChange={() => {}} size="lg" />);
    expect(document.querySelector(".MuiSwitch-root")).toHaveClass("MuiSwitch-sizeMedium");
  });
});
