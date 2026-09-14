import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { IconActionButton } from "./IconActionButton";

describe("IconActionButton", () => {
  it("exposes the label as aria-label and calls onClick", async () => {
    const onClick = vi.fn();
    render(<IconActionButton label="Editar" icon={<span>✎</span>} onClick={onClick} />);
    const button = screen.getByRole("button", { name: "Editar" });
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("stays disabled while still exposing the tooltip label", () => {
    render(<IconActionButton label="Excluir" icon={<span>🗑</span>} disabled />);
    expect(screen.getByRole("button", { name: "Excluir" })).toBeDisabled();
  });
});
