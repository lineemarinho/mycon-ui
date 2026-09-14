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

  it('shows a single count chip when display="count"', () => {
    render(<MultiSelect label="Pagamentos" options={options} value={["cartao", "boleto"]} onChange={() => {}} display="count" />);
    expect(screen.getByText("2 selecionado(s)")).toBeInTheDocument();
    expect(screen.queryByText("Cartão")).not.toBeInTheDocument();
  });

  it("prevents selecting beyond maxSelections", async () => {
    const onChange = vi.fn();
    render(<MultiSelect label="Pagamentos" options={options} value={["cartao"]} onChange={onChange} maxSelections={1} />);

    await userEvent.click(screen.getByLabelText("Pagamentos"));
    // A opção fica com `pointer-events: none` por estar desabilitada (limite atingido);
    // desligamos a checagem de pointer-events do user-event para simular o clique mesmo assim.
    await userEvent.click(await screen.findByText("Boleto"), { pointerEventsCheck: 0 });

    expect(onChange).not.toHaveBeenCalled();
  });

  it("hides Selecionar todos when maxSelections is set", async () => {
    render(<MultiSelect label="Pagamentos" options={options} value={[]} onChange={() => {}} maxSelections={1} />);
    await userEvent.click(screen.getByLabelText("Pagamentos"));
    expect(screen.queryByText("Selecionar todos")).not.toBeInTheDocument();
  });

  it("renders size=lg without throwing", () => {
    render(<MultiSelect label="Pagamentos" options={options} value={[]} onChange={() => {}} size="lg" />);
    expect(screen.getByLabelText("Pagamentos")).toBeInTheDocument();
  });

  it("shows the native loading text when loading is set and there are no options yet", async () => {
    render(<MultiSelect label="Pagamentos" options={[]} value={[]} onChange={() => {}} loading />);
    await userEvent.click(screen.getByLabelText("Pagamentos"));
    expect(screen.getByText("Loading…")).toBeInTheDocument();
  });
});
