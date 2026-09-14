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
});
