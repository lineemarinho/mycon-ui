import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Textarea } from "./Textarea";

describe("Textarea", () => {
  it("accepts multi-line typed input", async () => {
    render(<Textarea label="Motivo" />);
    const field = screen.getByLabelText("Motivo");
    await userEvent.type(field, "Linha 1");
    expect(field).toHaveValue("Linha 1");
  });
});
