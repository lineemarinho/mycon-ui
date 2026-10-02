import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ThemeProvider } from "@mui/material/styles";
import { Button } from "./Button";
import { myconTheme } from "../../theme/theme";
import { semanticStrongColors } from "../../tokens/colors";

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

  it("fills the tone with the AA-contrast shade regardless of variant", () => {
    render(
      <Button variant="secondary" tone="success">
        Confirmar
      </Button>,
    );
    expect(screen.getByRole("button", { name: "Confirmar" })).toHaveStyle({ backgroundColor: semanticStrongColors.success });
  });

  it("applies the tone as text color for text-like variants", () => {
    render(
      <ThemeProvider theme={myconTheme}>
        <Button variant="link" tone="warning">
          Atenção
        </Button>
      </ThemeProvider>,
    );
    expect(screen.getByRole("button", { name: "Atenção" })).toHaveStyle({ color: semanticStrongColors.warning });
  });

  it("uses white text on the tone background, as in the catalog", () => {
    render(
      <Button tone="success" variant="primary">
        Aprovar
      </Button>,
    );
    expect(screen.getByRole("button", { name: "Aprovar" })).toHaveStyle({ color: "#FFFFFF" });
  });
});
