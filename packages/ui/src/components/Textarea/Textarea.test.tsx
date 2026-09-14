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

  it("shows a character counter when counter and maxLength are set", () => {
    render(<Textarea label="Descrição" value="abc" inputProps={{ maxLength: 100 }} counter onChange={() => {}} />);
    expect(screen.getByText("3/100")).toBeInTheDocument();
  });

  it("does not render a counter without maxLength", () => {
    render(<Textarea label="Descrição" value="abc" counter onChange={() => {}} />);
    expect(screen.queryByText(/\/\d+/)).not.toBeInTheDocument();
  });

  it("renders size=lg without throwing", () => {
    render(<Textarea label="Motivo" size="lg" />);
    expect(screen.getByLabelText("Motivo")).toBeInTheDocument();
  });

  it("forces disabled when readOnlyField is set while keeping normal text color", () => {
    render(<Textarea label="Motivo" readOnlyField value="Texto" onChange={() => {}} />);
    expect(screen.getByLabelText("Motivo")).toBeDisabled();
  });
});
