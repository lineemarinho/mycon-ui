import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("calls onChange with the selected page", async () => {
    const onChange = vi.fn();
    render(<Pagination page={1} count={5} onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Go to page 2" }));
    expect(onChange).toHaveBeenCalledWith(2);
  });
});
