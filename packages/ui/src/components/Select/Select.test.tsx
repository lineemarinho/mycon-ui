import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Select } from "./Select";

const options = [
  { value: "ativo", label: "Ativo" },
  { value: "pendente", label: "Pendente" },
];

describe("Select", () => {
  it("renders the selected option's label", () => {
    render(<Select label="Status" options={options} value="ativo" onChange={() => {}} />);
    expect(screen.getByLabelText("Status")).toHaveValue("Ativo");
  });

  it("calls onChange when an option is picked", async () => {
    const onChange = vi.fn();
    render(<Select label="Status" options={options} value={null} onChange={onChange} />);

    const field = screen.getByLabelText("Status");
    await userEvent.click(field);
    await userEvent.click(await screen.findByText("Pendente"));

    expect(onChange).toHaveBeenCalledWith("pendente");
  });

  it("shows error and helper text", () => {
    render(
      <Select label="Status" options={options} value={null} onChange={() => {}} error helperText="Campo obrigatório" />,
    );
    expect(screen.getByText("Campo obrigatório")).toBeInTheDocument();
  });
});
