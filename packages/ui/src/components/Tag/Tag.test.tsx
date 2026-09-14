import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Tag } from "./Tag";

describe("Tag", () => {
  it("renders the label", () => {
    render(<Tag label="Promoção" />);
    expect(screen.getByText("Promoção")).toBeInTheDocument();
  });

  it("calls onRemove when the delete icon is clicked", async () => {
    const onRemove = vi.fn();
    render(<Tag label="Promoção" onRemove={onRemove} />);
    await userEvent.click(screen.getByTestId("CancelIcon"));
    expect(onRemove).toHaveBeenCalledOnce();
  });
});
