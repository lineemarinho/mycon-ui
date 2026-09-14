import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  it("renders title, description and action", () => {
    render(
      <EmptyState
        title="Nenhuma proposta encontrada"
        description="Ajuste os filtros e tente novamente."
        action={<button>Limpar filtros</button>}
      />,
    );
    expect(screen.getByText("Nenhuma proposta encontrada")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Limpar filtros" })).toBeInTheDocument();
  });
});
