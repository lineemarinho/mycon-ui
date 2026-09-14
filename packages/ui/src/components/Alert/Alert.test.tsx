import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Alert } from "./Alert";

describe("Alert", () => {
  it("renders the message with the given severity", () => {
    render(<Alert variant="error">Falha ao salvar</Alert>);
    expect(screen.getByRole("alert")).toHaveTextContent("Falha ao salvar");
  });

  it("calls onClose when dismissed", async () => {
    const onClose = vi.fn();
    render(<Alert onClose={onClose}>Aviso</Alert>);
    await userEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(onClose).toHaveBeenCalledOnce();
  });
});
