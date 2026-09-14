import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SectionCard } from "./SectionCard";

describe("SectionCard", () => {
  it("renders title and children", () => {
    render(
      <SectionCard title="Dados do cliente">
        <p>conteúdo</p>
      </SectionCard>,
    );
    expect(screen.getByText("Dados do cliente")).toBeInTheDocument();
    expect(screen.getByText("conteúdo")).toBeInTheDocument();
  });

  it("toggles content when collapsible", async () => {
    render(
      <SectionCard title="Detalhes" collapsible defaultExpanded>
        <p>conteúdo colapsável</p>
      </SectionCard>,
    );
    const toggle = screen.getByRole("button", { name: "Recolher seção" });
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    await userEvent.click(toggle);
    expect(screen.getByRole("button", { name: "Expandir seção" })).toHaveAttribute("aria-expanded", "false");
  });
});
