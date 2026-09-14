import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CheckboxField } from "./CheckboxField";

describe("CheckboxField", () => {
  it("calls onChange with the toggled value", async () => {
    const onChange = vi.fn();
    render(<CheckboxField label="Aceito os termos" checked={false} onChange={onChange} />);
    await userEvent.click(screen.getByRole("checkbox", { name: "Aceito os termos" }));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("shows the indeterminate state", () => {
    render(<CheckboxField label="Selecionar todos" checked={false} indeterminate onChange={() => {}} />);
    expect(screen.getByTestId("IndeterminateCheckBoxIcon")).toBeInTheDocument();
  });
});
