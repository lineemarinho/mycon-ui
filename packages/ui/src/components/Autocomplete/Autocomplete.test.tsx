import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Autocomplete } from "./Autocomplete";

const options = [
  { value: "cartao", label: "Cartão" },
  { value: "boleto", label: "Boleto" },
];

describe("Autocomplete", () => {
  it("renders with options and selects one", async () => {
    const onChange = vi.fn();
    render(<Autocomplete label="Pagamento" options={options} value={null} onChange={onChange} />);

    await userEvent.click(screen.getByLabelText("Pagamento"));
    await userEvent.click(await screen.findByText("Boleto"));

    expect(onChange).toHaveBeenCalledWith("boleto");
  });

  it("debounces and calls onSearch with the typed query", async () => {
    const onSearch = vi.fn().mockResolvedValue(options);
    render(
      <Autocomplete
        label="Pagamento"
        options={[]}
        value={null}
        onChange={() => {}}
        onSearch={onSearch}
        debounceMs={10}
      />,
    );

    const field = screen.getByLabelText("Pagamento");
    await userEvent.click(field);
    await userEvent.type(field, "boleto");

    await waitFor(() => expect(onSearch).toHaveBeenLastCalledWith("boleto"));
  });

  it("shows noOptionsMessage when there are no matches", async () => {
    render(
      <Autocomplete
        label="Pagamento"
        options={options}
        value={null}
        onChange={() => {}}
        noOptionsMessage="Nada encontrado"
      />,
    );

    const field = screen.getByLabelText("Pagamento");
    await userEvent.click(field);
    await userEvent.type(field, "inexistente");

    expect(await screen.findByText("Nada encontrado")).toBeInTheDocument();
  });

  it("hides the clear affordance when clearable is false", () => {
    render(<Autocomplete label="Pagamento" options={options} value="cartao" onChange={() => {}} clearable={false} />);
    expect(screen.queryByRole("button", { name: /clear|limpar/i })).not.toBeInTheDocument();
  });
});
