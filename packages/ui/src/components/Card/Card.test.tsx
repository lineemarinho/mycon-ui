import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card } from "./Card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card>conteúdo</Card>);
    expect(screen.getByText("conteúdo")).toBeInTheDocument();
  });
});
