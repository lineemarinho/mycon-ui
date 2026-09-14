import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Tabs } from "./Tabs";

const items = [
  { value: "ativas", label: "Ativas" },
  { value: "encerradas", label: "Encerradas" },
];

describe("Tabs", () => {
  it("calls onChange with the selected tab's value", async () => {
    const onChange = vi.fn();
    render(<Tabs items={items} value="ativas" onChange={onChange} />);
    await userEvent.click(screen.getByRole("tab", { name: "Encerradas" }));
    expect(onChange).toHaveBeenCalledWith("encerradas");
  });
});
