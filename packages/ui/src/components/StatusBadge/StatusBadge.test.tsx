import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatusBadge } from "./StatusBadge";
import { semanticColors } from "../../tokens/colors";

describe("StatusBadge", () => {
  it("renders the label", () => {
    render(<StatusBadge status="success" label="Ativo" />);
    expect(screen.getByText("Ativo")).toBeInTheDocument();
  });

  it("uses the semantic color for the tag variant", () => {
    render(<StatusBadge status="error" label="Cancelado" variant="tag" />);
    expect(screen.getByText("Cancelado")).toHaveStyle({ backgroundColor: semanticColors.error });
  });

  it("uses dark text on light semantic colors for legible contrast", () => {
    render(<StatusBadge status="warning" label="Pendente" variant="tag" />);
    expect(screen.getByText("Pendente")).toHaveStyle({ color: "rgba(0, 0, 0, 0.87)" });
  });
});
