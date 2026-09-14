import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { MultiSelect } from "./MultiSelect";

const options = [
  { value: "cartao", label: "Cartão" },
  { value: "boleto", label: "Boleto" },
];

describe("MultiSelect", () => {
  it("renders the selected options as chips", () => {
    render(<MultiSelect label="Pagamentos" options={options} value={["cartao"]} onChange={() => {}} />);
    expect(screen.getByText("Cartão")).toBeInTheDocument();
  });

  it("calls onChange with the updated list when an option is added", async () => {
    const onChange = vi.fn();
    render(<MultiSelect label="Pagamentos" options={options} value={["cartao"]} onChange={onChange} />);

    await userEvent.click(screen.getByLabelText("Pagamentos"));
    await userEvent.click(await screen.findByText("Boleto"));

    expect(onChange).toHaveBeenCalledWith(["cartao", "boleto"]);
  });

  it('selects every option when "Selecionar todos" is clicked', async () => {
    const onChange = vi.fn();
    render(<MultiSelect label="Pagamentos" options={options} value={[]} onChange={onChange} />);

    await userEvent.click(screen.getByLabelText("Pagamentos"));
    await userEvent.click(await screen.findByText("Selecionar todos"));

    expect(onChange).toHaveBeenCalledWith(["cartao", "boleto"]);
  });

  it('clears every option when "Selecionar todos" is clicked while all are selected', async () => {
    const onChange = vi.fn();
    render(<MultiSelect label="Pagamentos" options={options} value={["cartao", "boleto"]} onChange={onChange} />);

    await userEvent.click(screen.getByLabelText("Pagamentos"));
    await userEvent.click(await screen.findByText("Selecionar todos"));

    expect(onChange).toHaveBeenCalledWith([]);
  });
});
