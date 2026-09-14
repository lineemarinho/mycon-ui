import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FilterPanel } from "./FilterPanel";

describe("FilterPanel", () => {
  it("renders children when open", () => {
    render(
      <FilterPanel open onClose={() => {}} onApply={() => {}} onClear={() => {}}>
        <p>campo de filtro</p>
      </FilterPanel>,
    );
    expect(screen.getByText("campo de filtro")).toBeInTheDocument();
  });

  it("calls onApply and onClear", async () => {
    const onApply = vi.fn();
    const onClear = vi.fn();
    render(
      <FilterPanel open onClose={() => {}} onApply={onApply} onClear={onClear}>
        <p>campo</p>
      </FilterPanel>,
    );

    await userEvent.click(screen.getByRole("button", { name: "Aplicar" }));
    expect(onApply).toHaveBeenCalledOnce();

    await userEvent.click(screen.getByRole("button", { name: "Limpar" }));
    expect(onClear).toHaveBeenCalledOnce();
  });
});
