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

  it("renders only the icon when iconOnly is set", () => {
    render(
      <Button iconOnly icon={<span data-testid="icon">★</span>} aria-label="Favoritar">
        Favoritar
      </Button>,
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.queryByText("Favoritar", { selector: "button *" })).not.toBeInTheDocument();
  });

  it("applies full width when width=full", () => {
    render(<Button width="full">Continuar</Button>);
    expect(screen.getByRole("button")).toHaveStyle({ width: "100%" });
  });

  it("renders every variant without crashing", () => {
    const variants = ["primary", "secondary", "tertiary", "danger", "link"] as const;
    variants.forEach((variant) => {
      render(<Button variant={variant}>{variant}</Button>);
    });
    variants.forEach((variant) => {
      expect(screen.getByRole("button", { name: variant })).toBeInTheDocument();
    });
  });
});
