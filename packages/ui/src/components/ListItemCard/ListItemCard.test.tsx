import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { KeyValueItem, ListItemCard } from "./ListItemCard";

describe("KeyValueItem", () => {
  it("renders title and value", () => {
    render(<KeyValueItem title="CPF" value="000.000.000-00" />);
    expect(screen.getByText("CPF")).toBeInTheDocument();
    expect(screen.getByText("000.000.000-00")).toBeInTheDocument();
  });
});

describe("ListItemCard", () => {
  it("renders children and action", () => {
    render(
      <ListItemCard status="success" action={<button>Editar</button>}>
        <KeyValueItem title="Nome" value="Fulano" />
      </ListItemCard>,
    );
    expect(screen.getByText("Fulano")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Editar" })).toBeInTheDocument();
  });
});
