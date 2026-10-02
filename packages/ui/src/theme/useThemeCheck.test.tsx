import { render } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { afterEach, describe, expect, it, vi } from "vitest";

// `useThemeCheck` avisa só uma vez por carregamento do módulo: cada teste recarrega os módulos.
afterEach(() => {
  vi.restoreAllMocks();
  vi.resetModules();
});

describe("useThemeCheck", () => {
  it("avisa quando o componente é usado sem o myconTheme", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { Button } = await import("../components/Button/Button");
    render(<Button>Salvar</Button>);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("sem o myconTheme"));
  });

  it("não avisa com o myconTheme", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { Button } = await import("../components/Button/Button");
    const { myconTheme } = await import("./theme");
    render(
      <ThemeProvider theme={myconTheme}>
        <Button>Salvar</Button>
      </ThemeProvider>,
    );
    expect(warn).not.toHaveBeenCalled();
  });
});
