import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("shows the title on hover", async () => {
    render(
      <Tooltip title="Ação de editar">
        <button>Editar</button>
      </Tooltip>,
    );
    await userEvent.hover(screen.getByText("Editar"));
    expect(await screen.findByText("Ação de editar")).toBeInTheDocument();
  });
});
