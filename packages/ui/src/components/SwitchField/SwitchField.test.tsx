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

  it("scales the same switch for sm and lg, as in the catalog", () => {
    const { rerender } = render(<SwitchField label="Ativo" checked onChange={() => {}} size="sm" />);
    expect(document.querySelector(".MuiSwitch-root")).toHaveStyle({ transform: "scale(0.82)" });

    rerender(<SwitchField label="Ativo" checked onChange={() => {}} size="lg" />);
    expect(document.querySelector(".MuiSwitch-root")).toHaveStyle({ transform: "scale(1.15)" });
  });
});
