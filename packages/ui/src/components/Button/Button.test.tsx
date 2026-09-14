import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Salvar</Button>);
    expect(screen.getByRole("button", { name: "Salvar" })).toBeInTheDocument();
  });

  it("marks aria-busy when isLoading", () => {
    render(<Button isLoading>Salvando</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
  });

  it("disables the button when disabled", () => {
    render(<Button disabled>Salvar</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
