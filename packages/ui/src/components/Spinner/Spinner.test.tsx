import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
  it("exposes an accessible label", () => {
    render(<Spinner label="Carregando propostas" />);
    expect(screen.getByRole("progressbar", { name: "Carregando propostas" })).toBeInTheDocument();
  });
});
