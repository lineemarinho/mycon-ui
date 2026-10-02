import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatusBadge } from "./StatusBadge";
import { semanticStrongColors } from "../../tokens/colors";

describe("StatusBadge", () => {
  it("renders the label", () => {
    render(<StatusBadge status="success" label="Ativo" />);
    expect(screen.getByText("Ativo")).toBeInTheDocument();
  });

  it("fills the tag with the AA-contrast shade of the status", () => {
    render(<StatusBadge status="error" label="Cancelado" variant="tag" />);
    expect(screen.getByText("Cancelado")).toHaveStyle({ backgroundColor: semanticStrongColors.error });
  });

  it("uses white text on the tag, as in the catalog", () => {
    render(<StatusBadge status="warning" label="Pendente" variant="tag" />);
    expect(screen.getByText("Pendente")).toHaveStyle({ color: "#FFFFFF" });
  });
});
